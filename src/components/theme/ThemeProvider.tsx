"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  useState,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  consent: boolean;
  acceptConsent: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "wiw.theme";
const CONSENT_KEY = "wiw.consent";

const themeListeners = new Set<() => void>();

function emitThemeChange() {
  themeListeners.forEach((listener) => listener());
}

function subscribeTheme(onStoreChange: () => void) {
  themeListeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    themeListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function readClientState() {
  return {
    consent: localStorage.getItem(CONSENT_KEY) === "1",
    theme: readStoredTheme() ?? getSystemTheme(),
  };
}

function readServerState() {
  return { consent: false, theme: "light" as Theme };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const clientState = useSyncExternalStore(
    subscribeTheme,
    readClientState,
    readServerState,
  );
  const [themeOverride, setThemeOverride] = useState<Theme | null>(null);
  const theme = themeOverride ?? clientState.theme;
  const consent = clientState.consent;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", theme === "dark" ? "#07121F" : "#FFFFFF");
  }, [theme]);

  const applyTheme = useCallback((t: Theme) => {
    setThemeOverride(t);
    document.documentElement.dataset.theme = t;
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", t === "dark" ? "#07121F" : "#FFFFFF");
  }, []);

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    if (consent) {
      try {
        localStorage.setItem(STORAGE_KEY, next);
        emitThemeChange();
      } catch {
        /* ignore */
      }
    }
  }, [theme, consent, applyTheme]);

  const acceptConsent = useCallback(() => {
    try {
      localStorage.setItem(CONSENT_KEY, "1");
      localStorage.setItem(STORAGE_KEY, theme);
      emitThemeChange();
    } catch {
      /* ignore */
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle, consent, acceptConsent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      theme: "light" as Theme,
      toggle: () => {},
      consent: false,
      acceptConsent: () => {},
    };
  }
  return ctx;
}
