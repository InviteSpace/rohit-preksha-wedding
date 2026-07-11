"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "welcome", label: "Welcome" },
  { id: "couple", label: "Couple" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
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
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <span className="font-heading text-sm text-rose md:text-base">R · P</span>
            <div className="flex gap-1 overflow-x-auto md:gap-2">
              {NAV_ITEMS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`relative shrink-0 rounded-sm px-2 py-1 font-heading text-[10px] tracking-wider uppercase transition-colors md:px-3 md:text-xs cursor-pointer ${
                    activeId === id ? "text-sage" : "text-maroon/60 hover:text-rose"
                  }`}
                >
                  {label}
                  {activeId === id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-sage md:left-3 md:right-3"
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
