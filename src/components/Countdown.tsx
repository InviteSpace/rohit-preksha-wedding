"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/wedding";
import { fadeUp } from "@/lib/motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[4.25rem] flex-col items-center md:min-w-[5.5rem]">
      <div className="relative flex h-16 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md md:h-20">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.22 }}
            className="font-heading text-2xl !font-medium tabular-nums text-white md:text-3xl"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2.5 font-heading text-[9px] font-semibold tracking-[0.22em] text-royal-gold-bright uppercase md:text-[10px]">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span
      aria-hidden
      className="mb-6 self-center font-heading text-xl font-medium text-royal-gold-bright/80 md:mb-7 md:text-2xl"
    >
      :
    </span>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(WEDDING_CONFIG.weddingDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(WEDDING_CONFIG.weddingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-navy px-4 py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(166,124,45,0.18),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-royal-gold/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/3 h-48 w-48 rounded-full bg-white/5 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-heading text-xs font-semibold tracking-[0.4em] text-royal-gold-bright uppercase"
        >
          Counting Down To Our Big Day
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mx-auto mt-8 flex max-w-xl items-end justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl md:gap-3 md:px-6 md:py-6"
        >
          <TimeUnit value={timeLeft.days} label="Days" />
          <Colon />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <Colon />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <Colon />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </motion.div>
      </div>
    </section>
  );
}
