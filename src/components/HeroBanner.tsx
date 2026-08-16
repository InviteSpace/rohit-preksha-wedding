"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PublicImage from "@/components/PublicImage";
import AnimatedHeroBackground from "@/components/AnimatedHeroBackground";
import { WEDDING_CONFIG } from "@/config/wedding";
import { fadeUp } from "@/lib/motion";

export default function HeroBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const { groom, bride } = WEDDING_CONFIG.couple;
  const weddingDate = WEDDING_CONFIG.weddingDate.toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden px-4 pb-8 pt-12 text-center md:pb-12"
    >
      <AnimatedHeroBackground />

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{ opacity: contentOpacity }}
        className="relative z-10 rounded-full bg-ivory/35 px-5 py-2 font-heading text-xs font-bold tracking-[0.5em] text-navy uppercase shadow-[0_4px_24px_rgba(17,41,77,0.06)] backdrop-blur-md md:text-sm"
      >
        Save the Date
      </motion.p>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex w-full max-w-lg flex-col items-center md:max-w-xl"
      >
        {/* Couple — sits on the arch platform in the background */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative -mb-2 w-[min(72vw,260px)] md:w-[300px]"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <PublicImage
              src={WEDDING_CONFIG.hero.couple}
              alt={`${groom.name} and ${bride.name}`}
              width={853}
              height={1024}
              priority
              className="h-auto w-full object-contain drop-shadow-[0_12px_28px_rgba(61,43,43,0.2)]"
              sizes="(max-width: 768px) 72vw, 300px"
            />
          </motion.div>
        </motion.div>

        <div className="relative mt-[20px] w-[min(92%,22rem)] rounded-xl border border-navy/10 bg-ivory/35 px-4 py-3 shadow-[0_6px_28px_rgba(17,41,77,0.08)] backdrop-blur-xl md:w-[min(92%,26rem)] md:px-6 md:py-3.5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-b from-white/15 to-ivory/5"
          />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="mb-2 h-px w-20 origin-center bg-linear-to-r from-transparent via-royal-gold to-transparent md:w-28"
            />

            <div className="flex flex-col items-center gap-0 md:flex-row md:items-baseline md:gap-2.5 lg:gap-3">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-2xl !font-medium leading-tight text-navy-deep md:text-4xl lg:text-5xl"
              >
                {groom.name}
              </motion.h1>

              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                className="font-heading text-2xl !font-medium leading-tight text-royal-gold md:text-3xl lg:text-4xl"
                aria-hidden="true"
              >
                &
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-2xl !font-medium leading-tight text-navy-deep md:text-4xl lg:text-5xl"
              >
                {bride.name}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-1 font-heading text-sm font-semibold italic text-navy md:text-base"
            >
              are getting married
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="mt-0.5 font-heading text-xs font-bold tracking-wide text-royal-gold md:text-sm"
            >
              {weddingDate}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
              className="mt-2.5 flex flex-col items-center gap-0.5"
            >
              <span className="font-heading text-[10px] font-semibold text-navy/80 md:text-xs">
                Scroll to explore
              </span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-sm font-bold text-royal-gold"
              >
                ↓
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
