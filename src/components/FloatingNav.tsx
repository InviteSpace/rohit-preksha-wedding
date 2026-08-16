"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "welcome", label: "Welcome" },
  { id: "couple", label: "Couple" },
  { id: "events", label: "Events" },
  { id: "share-photos", label: "Share" },
];

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState("welcome");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    NAV_ITEMS.forEach(({ id }) => {
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
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
            <span className="hidden shrink-0 font-heading text-sm text-rose sm:inline md:text-base">
              R · P
            </span>
            <div className="flex min-w-0 flex-1 justify-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-end md:gap-2">
              {NAV_ITEMS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`relative min-h-10 shrink-0 rounded-sm px-3 py-2 font-heading text-[11px] tracking-wide uppercase transition-colors md:px-3 md:text-xs cursor-pointer ${
                    activeId === id ? "text-sage" : "text-maroon/90 hover:text-rose"
                  }`}
                >
                  {label}
                  {activeId === id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-3 right-3 h-0.5 bg-sage"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
