"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  ReactNode,
} from "react";

export type Lang = "bn" | "en";

/** A string that exists in both languages (per blueprint §10 — content parity) */
export type L = { en: string; bn: string };

export function isL(v: unknown): v is L {
  return (
    typeof v === "object" &&
    v !== null &&
    typeof (v as L).en === "string" &&
    typeof (v as L).bn === "string"
  );
}

const STORAGE_KEY = "nexfund-lang";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  // sync across browser tabs
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): Lang {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "bn";
  } catch {
    return "bn";
  }
}

function getServerSnapshot(): Lang {
  return "bn";
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Pick the current language from a localized pair (accepts plain strings) */
  t: (value: L | string) => string;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "bn",
  setLang: () => {},
  t: (v) => (typeof v === "string" ? v : v.en),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // sync <html lang> for screen readers, fonts & SEO (external system — legit effect)
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* private mode etc. */
    }
    emit();
  }, []);

  const t = useCallback(
    (value: L | string) => (typeof value === "string" ? value : value[lang]),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
