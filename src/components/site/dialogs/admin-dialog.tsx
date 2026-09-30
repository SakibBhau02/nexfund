"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CircleCheck,
  CircleX,
  Inbox,
  LockKeyhole,
  LockKeyholeOpen,
  RefreshCw,
  ThumbsUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type L } from "@/lib/i18n";
import { useDialogStore } from "@/lib/dialog-store";
import { ADMIN } from "@/lib/content";
import { Logo } from "@/components/site/brand";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

/* ── R8: hidden admin review workspace (#admin= — NexFund advisors only).
   Closes worklog R7 recommendation #1: OpportunityInterest rows and FAQ
   feedback votes were reviewable DB-only until now. The passphrase gate is
   server-side (ADMIN_PASSPHRASE env, POST/PATCH body only — never a query
   string, never a GET). The passphrase lives in component memory only: it
   is NOT persisted to localStorage, and because this whole workspace sits
   inside DialogContent it unmounts (and forgets everything) whenever the
   dialog closes or "lock again" is pressed. All state changes happen in
   event handlers (unlock / refresh / status change) — no effect-driven
   setState, per the react-hooks/set-state-in-effect lint rule. */

const STATUSES = ["new", "reviewed", "introduced", "declined"] as const;
type Status = (typeof STATUSES)[number];

interface InterestRow {
  id: string;
  opportunitySlug: string;
  codeName: string;
  email: string;
  name: string | null;
  note: string | null;
  language: string;
  status: Status;
  createdAt: string;
}

interface FeedbackRow {
  id: number;
  questionId: string;
  helpful: boolean;
  language: string;
  createdAt: string;
}

interface FeedbackAgg {
  questionId: string;
  yes: number;
  no: number;
  q: L | null;
}

interface OverviewData {
  interests: InterestRow[];
  feedback: FeedbackRow[];
  feedbackAgg: FeedbackAgg[];
}

/** pill button shared by the workspace header actions (share-pill pattern) */
const pillBtn =
  "inline-flex items-center gap-1.5 rounded-full border border-nx-navy-200 bg-white px-2.5 py-1 text-[11px] font-bold text-nx-navy-700 transition-colors hover:border-nx-cyan-400 hover:text-nx-cyan-700 disabled:cursor-not-allowed disabled:opacity-60";

const STATUS_TEXT: Record<Status, string> = {
  new: "text-nx-navy-800",
  reviewed: "text-nx-cyan-700",
  introduced: "text-nx-verified-700",
  declined: "text-nx-danger-700",
};

function AdminWorkspace() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();

  /* the passphrase lives here, in memory, for this open session only */
  const [pass, setPass] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [data, setData] = useState<OverviewData | null>(null);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<"interests" | "feedback">("interests");
  /** gate error kind — wrong passphrase / locked server / load failure */
  const [gateErr, setGateErr] = useState<"wrong" | "locked" | "load" | null>(null);
  /** id of the interest whose status just changed (flash message) */
  const [flash, setFlash] = useState<string | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* timer cleanup only — no setState in effects (lint rule) */
  useEffect(
    () => () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
    },
    []
  );

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  /** POST /api/admin/overview — used by both unlock and refresh (handlers only) */
  const load = async (passphrase: string) => {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/overview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase }),
      });
      if (res.status === 503 || res.status === 401) {
        // locked server or wrong passphrase → back to (or stay on) the gate
        setGateErr(res.status === 503 ? "locked" : "wrong");
        setUnlocked(false);
        setData(null);
        return;
      }
      if (!res.ok) {
        setGateErr("load");
        return;
      }
      const json = (await res.json()) as OverviewData;
      setData(json);
      setUnlocked(true);
      setGateErr(null);
    } catch {
      setGateErr("load");
    } finally {
      setBusy(false);
    }
  };

  const unlock = (e: FormEvent) => {
    e.preventDefault();
    if (busy || !pass.trim()) return;
    void load(pass);
  };

  const lockAgain = () => {
    if (flashTimer.current) clearTimeout(flashTimer.current);
    setPass("");
    setUnlocked(false);
    setData(null);
    setGateErr(null);
    setFlash(null);
    setTab("interests");
  };

  /** optimistic status PATCH — flashes ADMIN.statusChanged, reverts on failure */
  const changeStatus = async (row: InterestRow, next: Status) => {
    const prev = row.status;
    if (next === prev || !data) return;
    setData({
      ...data,
      interests: data.interests.map((r) => (r.id === row.id ? { ...r, status: next } : r)),
    });
    setFlash(row.id);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 2500);
    try {
      const res = await fetch(`/api/admin/interests/${encodeURIComponent(row.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase: pass, status: next }),
      });
      if (!res.ok) throw new Error("status patch failed");
    } catch {
      if (flashTimer.current) clearTimeout(flashTimer.current);
      setFlash(null);
      setData((d) =>
        d
          ? {
              ...d,
              interests: d.interests.map((r) => (r.id === row.id ? { ...r, status: prev } : r)),
            }
          : d
      );
    }
  };

  /* ── locked view ─────────────────────────────────────────────── */
  if (!unlocked) {
    return (
      <>
        <DialogHeader className="border-b border-nx-navy-100 px-6 pb-5 pt-7 text-center sm:text-center">
          <p className="flex justify-center">
            <Logo className="text-[1.55rem]" />
          </p>
          <DialogTitle className="pt-1 text-xl font-extrabold text-nx-navy-900">
            {t(ADMIN.title)}
          </DialogTitle>
          <DialogDescription className="mx-auto max-w-md leading-relaxed">
            {t(ADMIN.sub)}
          </DialogDescription>
        </DialogHeader>

        <motion.form
          onSubmit={unlock}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26 }}
          className="mx-auto w-full max-w-sm px-6 pb-8 pt-6"
        >
          <div>
            <Label htmlFor="admin-pass" className="text-[13px] font-bold text-nx-navy-800">
              {t(ADMIN.passLabel)}
            </Label>
            <Input
              id="admin-pass"
              type="password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                if (gateErr) setGateErr(null);
              }}
              placeholder={t(ADMIN.passPlaceholder)}
              autoFocus
              autoComplete="off"
              dir="ltr"
              aria-invalid={gateErr === "wrong" || undefined}
              className="mt-1.5 h-11 rounded-xl border-nx-navy-200 bg-white px-4 text-[15px] font-semibold text-nx-navy-900 placeholder:font-normal placeholder:text-slate-500 focus-visible:border-nx-cyan-400 focus-visible:ring-[3px] focus-visible:ring-nx-cyan-100"
            />
          </div>

          <button
            type="submit"
            disabled={busy || !pass.trim()}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-nx-navy-700 px-5 py-3 font-bold text-white transition-colors hover:bg-nx-navy-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? (
              <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <LockKeyholeOpen className="h-4 w-4" aria-hidden="true" />
            )}
            {t(ADMIN.unlock)}
          </button>

          {gateErr && (
            <p
              role="alert"
              className="mt-3 text-center text-[13px] font-semibold leading-relaxed text-nx-danger-700"
            >
              {gateErr === "wrong"
                ? t(ADMIN.wrongPass)
                : gateErr === "locked"
                  ? t(ADMIN.locked)
                  : t(ADMIN.loadErr)}
            </p>
          )}
        </motion.form>
      </>
    );
  }

  /* ── unlocked workspace ──────────────────────────────────────── */
  const tabs = [
    { key: "interests" as const, label: ADMIN.interestsTab, Icon: Inbox },
    { key: "feedback" as const, label: ADMIN.feedbackTab, Icon: ThumbsUp },
  ];

  const thClass =
    "border-b-2 border-nx-navy-200 bg-white px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-wide text-slate-500";
  const tdClass = "border-b border-nx-navy-100 px-3 py-3 align-top text-[13px] leading-snug";

  const interestsPanel = () => {
    if (!data) {
      return (
        <div className="space-y-2.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="nx-shimmer h-14 w-full rounded-2xl" />
          ))}
        </div>
      );
    }
    if (gateErr === "load") {
      return (
        <div className="rounded-2xl bg-nx-warn-bg p-4">
          <p role="alert" className="text-sm font-bold leading-relaxed text-nx-warn-700">
            {t(ADMIN.loadErr)}
          </p>
          <button type="button" onClick={() => void load(pass)} className={cn(pillBtn, "mt-3")}>
            <RefreshCw className={cn("h-3 w-3", busy && "animate-spin")} aria-hidden="true" />
            {t(ADMIN.refresh)}
          </button>
        </div>
      );
    }
    if (data.interests.length === 0) {
      return (
        <p className="rounded-2xl border border-dashed border-nx-navy-200 bg-nx-mist px-4 py-8 text-center text-sm font-semibold text-slate-600">
          {t(ADMIN.empty)}
        </p>
      );
    }
    return (
      <>
        {/* optimistic status-change flash — polite live region */}
        <div aria-live="polite" role="status" className="flex min-h-[20px] items-center">
          {flash && (
            <p className="text-[12px] font-bold text-nx-verified-700">{t(ADMIN.statusChanged)}</p>
          )}
        </div>

        <div className="nx-scroll overflow-x-auto rounded-2xl border border-nx-navy-100">
          <table className="w-full min-w-[780px] border-separate border-spacing-0">
            <caption className="sr-only">{t(ADMIN.interestsTab)}</caption>
            <thead>
              <tr>
                <th scope="col" className={thClass}>
                  {t(ADMIN.colListing)}
                </th>
                <th scope="col" className={thClass}>
                  {t(ADMIN.colEmail)}
                </th>
                <th scope="col" className={thClass}>
                  {t(ADMIN.colName)}
                </th>
                <th scope="col" className={thClass}>
                  {t(ADMIN.colNote)}
                </th>
                <th scope="col" className={thClass}>
                  {t(ADMIN.colLang)}
                </th>
                <th scope="col" className={thClass}>
                  {t(ADMIN.colDate)}
                </th>
                <th scope="col" className={thClass}>
                  {t(ADMIN.colStatus)}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.interests.map((row, i) => (
                <tr key={row.id}>
                  <td className={cn(tdClass, i % 2 === 1 ? "bg-nx-mist" : "bg-white")}>
                    <p className="nx-num font-extrabold text-nx-navy-900">{row.codeName}</p>
                    <p
                      className="mt-0.5 truncate text-[11px] text-slate-600"
                      title={row.opportunitySlug}
                    >
                      {row.opportunitySlug}
                    </p>
                  </td>
                  <td className={cn(tdClass, i % 2 === 1 ? "bg-nx-mist" : "bg-white")}>
                    <p dir="ltr" className="break-all text-slate-600">
                      {row.email}
                    </p>
                  </td>
                  <td className={cn(tdClass, i % 2 === 1 ? "bg-nx-mist" : "bg-white")}>
                    <p className="text-nx-ink/90">{row.name || "—"}</p>
                  </td>
                  <td
                    className={cn(tdClass, "max-w-[220px]", i % 2 === 1 ? "bg-nx-mist" : "bg-white")}
                  >
                    <p className="truncate text-nx-ink/85" title={row.note ?? undefined}>
                      {row.note || "—"}
                    </p>
                  </td>
                  <td className={cn(tdClass, i % 2 === 1 ? "bg-nx-mist" : "bg-white")}>
                    <span className="rounded-full bg-nx-navy-100 px-2 py-0.5 text-[11px] font-bold uppercase text-nx-navy-800">
                      {row.language}
                    </span>
                  </td>
                  <td className={cn(tdClass, i % 2 === 1 ? "bg-nx-mist" : "bg-white")}>
                    <p className="nx-num whitespace-nowrap text-slate-600">
                      {fmtDate(row.createdAt)}
                    </p>
                  </td>
                  <td className={cn(tdClass, i % 2 === 1 ? "bg-nx-mist" : "bg-white")}>
                    <select
                      value={row.status}
                      onChange={(e) => void changeStatus(row, e.target.value as Status)}
                      aria-label={`${t(ADMIN.colStatus)} — ${row.codeName}`}
                      className={cn(
                        "cursor-pointer rounded-full border border-nx-navy-200 bg-white px-2.5 py-1.5 text-[12px] font-bold outline-none transition-colors focus-visible:border-nx-cyan-400 focus-visible:ring-2 focus-visible:ring-nx-cyan-100",
                        STATUS_TEXT[row.status]
                      )}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {t(ADMIN.statusLabels[s])}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const feedbackPanel = () => {
    if (!data) {
      return (
        <div className="space-y-2.5">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="nx-shimmer h-16 w-full rounded-2xl" />
          ))}
        </div>
      );
    }
    if (gateErr === "load") {
      return (
        <div className="rounded-2xl bg-nx-warn-bg p-4">
          <p role="alert" className="text-sm font-bold leading-relaxed text-nx-warn-700">
            {t(ADMIN.loadErr)}
          </p>
          <button type="button" onClick={() => void load(pass)} className={cn(pillBtn, "mt-3")}>
            <RefreshCw className={cn("h-3 w-3", busy && "animate-spin")} aria-hidden="true" />
            {t(ADMIN.refresh)}
          </button>
        </div>
      );
    }
    if (data.feedbackAgg.length === 0) {
      return (
        <p className="rounded-2xl border border-dashed border-nx-navy-200 bg-nx-mist px-4 py-8 text-center text-sm font-semibold text-slate-600">
          {t(ADMIN.empty)}
        </p>
      );
    }
    return (
      <>
        {/* per-question aggregates */}
        <div className="space-y-2.5">
          {data.feedbackAgg.map((agg) => {
            const total = agg.yes + agg.no;
            const yesPct = total > 0 ? Math.round((agg.yes / total) * 100) : 0;
            return (
              <div
                key={agg.questionId}
                className="rounded-2xl border border-nx-navy-100 bg-white p-4 transition-colors hover:border-nx-cyan-200"
              >
                <p className="text-sm font-bold leading-snug text-nx-navy-900">
                  {agg.q ? agg.q[lang] : agg.questionId}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full border border-nx-cyan-200 bg-nx-cyan-50 px-3 py-1 text-[11px] font-bold text-nx-cyan-700">
                    {t(ADMIN.feedbackSummary(agg.yes, agg.no))}
                  </span>
                  {total > 0 && (
                    <div
                      className="flex h-1.5 w-full max-w-[200px] overflow-hidden rounded-full bg-nx-navy-100"
                      role="img"
                      aria-label={t(ADMIN.feedbackSummary(agg.yes, agg.no))}
                    >
                      <div className="h-full bg-nx-verified" style={{ width: `${yesPct}%` }} />
                      <div className="h-full bg-nx-danger" style={{ width: `${100 - yesPct}%` }} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* recent individual votes */}
        <ul className="mt-5 divide-y divide-nx-navy-100 rounded-2xl border border-nx-navy-100">
          {data.feedback.map((f, i) => (
            <li
              key={f.id}
              className={cn(
                "flex flex-wrap items-center gap-x-3 gap-y-1 px-3.5 py-2.5",
                i % 2 === 1 ? "bg-nx-mist" : "bg-white"
              )}
            >
              {f.helpful ? (
                <CircleCheck
                  className="h-4 w-4 shrink-0 text-nx-verified-700"
                  aria-label={t(ADMIN.feedbackSummary(1, 0))}
                />
              ) : (
                <CircleX
                  className="h-4 w-4 shrink-0 text-nx-danger-700"
                  aria-label={t(ADMIN.feedbackSummary(0, 1))}
                />
              )}
              <span
                dir="ltr"
                title={f.questionId}
                className="max-w-[300px] truncate text-[12px] font-semibold text-nx-ink/85"
              >
                {f.questionId}
              </span>
              <span className="rounded-full bg-nx-navy-100 px-2 py-0.5 text-[10px] font-bold uppercase text-nx-navy-800">
                {f.language}
              </span>
              <span className="nx-num ml-auto whitespace-nowrap text-[11px] text-slate-600">
                {fmtDate(f.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <>
      <DialogHeader className="border-b border-nx-navy-100 px-6 pb-4 pt-6">
        <DialogTitle className="flex items-center gap-2.5 pr-8 text-xl font-extrabold text-nx-navy-900">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-nx-navy-900 text-nx-cyan-400">
            <LockKeyholeOpen className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          {t(ADMIN.title)}
        </DialogTitle>
        <DialogDescription className="leading-relaxed">{t(ADMIN.sub)}</DialogDescription>
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="inline-flex items-center rounded-full border border-nx-cyan-200 bg-nx-cyan-50 px-3 py-1 text-[11px] font-bold text-nx-cyan-700">
            {t(ADMIN.entryHint)}
          </span>
          <span className="ml-auto flex gap-1.5">
            <button
              type="button"
              onClick={() => void load(pass)}
              disabled={busy}
              aria-busy={busy || undefined}
              className={pillBtn}
            >
              <RefreshCw
                className={cn("h-3 w-3", busy && "animate-spin")}
                aria-hidden="true"
              />
              {t(ADMIN.refresh)}
            </button>
            <button type="button" onClick={lockAgain} className={pillBtn}>
              <LockKeyhole className="h-3 w-3" aria-hidden="true" />
              {t(ADMIN.logout)}
            </button>
          </span>
        </div>
      </DialogHeader>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26 }}
        className="min-w-0"
      >
        {/* tab strip — opportunity-dialog tablist pattern (axe-clean ARIA tabs) */}
        <div
          role="tablist"
          aria-label={t(ADMIN.title)}
          className="nx-scroll flex gap-1 overflow-x-auto border-b border-nx-navy-100 px-4 pt-4 sm:px-6"
        >
          {tabs.map(({ key, label, Icon }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                id={`admin-tab-${key}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`admin-panel-${key}`}
                onClick={() => setTab(key)}
                className={cn(
                  "relative flex shrink-0 items-center gap-1.5 rounded-t-xl px-3.5 py-2.5 text-[13px] font-bold transition-colors",
                  active
                    ? "text-nx-navy-900"
                    : "text-slate-500 hover:bg-nx-mist hover:text-nx-navy-700"
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {t(label)}
                {active && (
                  <span className="absolute inset-x-2 -bottom-px h-[2.5px] rounded-full bg-nx-cyan-500" />
                )}
              </button>
            );
          })}
        </div>

        <div className="min-w-0 px-4 pb-6 pt-4 sm:px-6">
          <div
            role="tabpanel"
            id="admin-panel-interests"
            aria-labelledby="admin-tab-interests"
            className={tab === "interests" ? undefined : "hidden"}
          >
            {interestsPanel()}
          </div>
          <div
            role="tabpanel"
            id="admin-panel-feedback"
            aria-labelledby="admin-tab-feedback"
            className={tab === "feedback" ? undefined : "hidden"}
          >
            {feedbackPanel()}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function AdminDialog() {
  const isOpen = useDialogStore((s) => s.dialog === "admin");
  const close = useDialogStore((s) => s.close);
  const openAdmin = useDialogStore((s) => s.openAdmin);

  /* hidden entry — #admin= on cold load opens the workspace (advisor-only
     deep link; same rAF mount pattern as #insight= so hydration markup
     stays consistent and the store flip happens post-hydration) */
  useEffect(() => {
    const m = /^#admin=?$/i.exec(window.location.hash);
    if (!m) return;
    const raf = requestAnimationFrame(() => openAdmin());
    return () => cancelAnimationFrame(raf);
  }, [openAdmin]);

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
      <DialogContent className="nx-scroll max-h-[88vh] gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-[880px]">
        <AdminWorkspace />
      </DialogContent>
    </Dialog>
  );
}
