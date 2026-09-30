#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# NexFund permalink regression (R7, worklog rec: "copied link opens the right
# thing"). Every deep-link hash kind must open the right dialog/state after a
# COLD load. Run whenever a NEW hash kind is added.
#
#   bash qa/permalinks.sh            # against http://localhost:3000
#   BASE=http://localhost:3000 bash qa/permalinks.sh
#
# Uses an isolated agent-browser session (permacheck) — safe to run while a
# manual QA session is open. Exits non-zero on any broken permalink.
#
# NOTE: agent-browser `open` performs a SAME-DOCUMENT navigation when only the
# hash differs — mount-time hash effects never re-run that way. Every case
# therefore opens the URL and then reloads to force a cold load.
# ─────────────────────────────────────────────────────────────────────────────
set -u
BASE="${BASE:-http://localhost:3000}"
S="permacheck"

pass=0
fail=0

cold() { # url → open + full reload (hash-only nav doesn't remount React)
  agent-browser --session "$S" open "$1" >/dev/null 2>&1
  agent-browser --session "$S" reload >/dev/null 2>&1
  agent-browser --session "$S" wait 1800 >/dev/null 2>&1
}

check() { # name, expected-substring, actual
  local name="$1" want="$2" got="$3"
  if [[ "$got" == *"$want"* ]]; then
    echo "  ✓ $name"
    pass=$((pass + 1))
  else
    echo "  ✗ $name — expected '$want' in: $got"
    fail=$((fail + 1))
  fi
}

# force EN so assertions match English copy, and drop any saved shortlist
cold "$BASE/"
agent-browser --session "$S" eval "(() => { localStorage.setItem('nexfund-lang','en'); localStorage.removeItem('nx-compare'); return 'ok'; })()" >/dev/null 2>&1

# ── #insight= → reader dialog with the right article ────────────────────────
cold "$BASE/#insight=sme-due-diligence-checklist"
out=$(agent-browser --session "$S" eval "(() => { const d=document.querySelector('[role=dialog]'); return d ? d.querySelector('h2')?.textContent || 'no-title' : 'no-dialog'; })()" 2>&1 | tail -1)
check "#insight= opens the DD checklist" "How to evaluate an SME" "$out"

# ── #opp= → listing detail dialog with the right code name ──────────────────
cold "$BASE/#opp=rmg-201-denim-knitwear"
out=$(agent-browser --session "$S" eval "(() => { const d=document.querySelector('[role=dialog]'); return d ? d.querySelector('h2')?.textContent || 'no-title' : 'no-dialog'; })()" 2>&1 | tail -1)
check "#opp= opens RMG-201" "RMG-201" "$out"

# ── #cmp= → compare dialog with both columns ────────────────────────────────
cold "$BASE/#cmp=rmg-201-denim-knitwear,agf-105-poultry-eggs"
out=$(agent-browser --session "$S" eval "(() => { const d=document.querySelector('[role=dialog]'); if (!d) return 'no-dialog'; const has=(s)=>d.textContent.includes(s)?s:''; return has('RMG-201')+'|'+has('AGF-105')+'|'+(d.querySelector('h2')?.textContent||''); })()" 2>&1 | tail -1)
check "#cmp= opens compare w/ RMG-201" "RMG-201" "$out"
check "#cmp= opens compare w/ AGF-105" "AGF-105" "$out"

# ── #sim= → sliders hydrated with the shared values (≠ defaults!) ───────────
cold "$BASE/#sim=75,8,6,7"
out=$(agent-browser --session "$S" eval "(() => { const v=Array.from(document.querySelectorAll('[role=slider]')).map(s=>s.getAttribute('aria-valuenow')); return v.join(','); })()" 2>&1 | tail -1)
check "#sim= hydrates sliders 75,8,6,7" "75,8,6,7" "$out"

# ── bad slug degrades honestly (no infinite spinner) ─────────────────────────
cold "$BASE/#opp=does-not-exist"
out=$(agent-browser --session "$S" eval "(() => { const d=document.querySelector('[role=dialog]'); return d ? (d.textContent.includes('Listing not found') ? 'not-found' : d.textContent.slice(0,40)) : 'no-dialog'; })()" 2>&1 | tail -1)
check "#opp=<bad slug> shows not-found" "not-found" "$out"

agent-browser --session "$S" close >/dev/null 2>&1
echo ""
echo "Permalink regression: $pass passed, $fail failed"
[[ "$fail" -eq 0 ]] || exit 1
