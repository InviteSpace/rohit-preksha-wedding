"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { InvitationLanguage } from "@/lib/invitationSide";

interface LanguageContextValue {
  language: InvitationLanguage;
  setLanguage: (language: InvitationLanguage) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  initialLanguage = "en",
  children,
}: {
  initialLanguage?: InvitationLanguage;
  children: ReactNode;
}) {
  const [language, setLanguageState] = useState<InvitationLanguage>(initialLanguage);

  useEffect(() => {
    setLanguageState(initialLanguage);
  }, [initialLanguage]);

  const setLanguage = useCallback((next: InvitationLanguage) => {
    setLanguageState(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next === "hi" ? "hi" : "en";
      document.documentElement.classList.toggle("lang-hi", next === "hi");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "hi" ? "hi" : "en";
    document.documentElement.classList.toggle("lang-hi", language === "hi");
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
