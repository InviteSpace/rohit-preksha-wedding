"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { getUiCopy } from "@/lib/uiCopy";

const NAV_IDS = ["welcome", "couple", "events", "share-photos"] as const;

export default function FloatingNav() {
  const { language, setLanguage } = useLanguage();
  const t = getUiCopy(language);
  const isHindi = language === "hi";
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState("welcome");

  const navItems = [
    { id: "welcome", label: t.navWelcome },
    { id: "couple", label: t.navCouple },
    { id: "events", label: t.navEvents },
    { id: "share-photos", label: t.navShare },
  ];

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    NAV_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-gold/20 bg-ivory/95 backdrop-blur-sm shadow-sm"
        >
          <div className="mx-auto flex h-12 max-w-5xl items-center gap-1.5 px-2 sm:h-[3.25rem] sm:gap-3 sm:px-4">
            <span className="hidden shrink-0 font-heading text-sm leading-none text-rose sm:inline md:text-base">
              R · P
            </span>

            <div className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-1">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`relative flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-sm px-2.5 font-heading leading-none transition-colors sm:px-3 ${
                    isHindi
                      ? "text-[12px] normal-case tracking-normal sm:text-[13px]"
                      : "text-[10px] tracking-wide uppercase sm:text-[11px] md:text-xs"
                  } ${
                    activeId === id ? "text-sage" : "text-maroon/90 hover:text-rose"
                  }`}
                >
                  {label}
                  {activeId === id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0.5 left-2 right-2 h-0.5 bg-sage sm:left-3 sm:right-3"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="lang-switch flex h-8 shrink-0 items-center rounded-full border border-[#d6ad63]/70 bg-white/90 p-0.5 shadow-sm">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`flex h-7 min-w-[2rem] cursor-pointer items-center justify-center rounded-full px-2.5 font-heading text-[10px] leading-none tracking-wider transition-colors ${
                  language === "en" ? "bg-[#11294d] text-white" : "text-[#11294d]/65"
                }`}
                aria-pressed={language === "en"}
                aria-label="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("hi")}
                className={`flex h-7 min-w-[2rem] cursor-pointer items-center justify-center rounded-full px-2.5 font-heading text-[11px] leading-none transition-colors ${
                  language === "hi" ? "bg-[#11294d] text-white" : "text-[#11294d]/65"
                }`}
                aria-pressed={language === "hi"}
                aria-label="हिन्दी"
              >
                हिं
              </button>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
