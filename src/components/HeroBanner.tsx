"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
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
        className="relative z-10 font-heading text-xs tracking-[0.5em] text-maroon-dark/90 uppercase md:text-sm"
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
            <Image
              src={WEDDING_CONFIG.hero.couple}
              alt={`${groom.name} and ${bride.name}`}
              width={853}
              height={1024}
              priority
              unoptimized
              className="h-auto w-full object-contain drop-shadow-[0_12px_28px_rgba(61,43,43,0.2)]"
              sizes="(max-width: 768px) 72vw, 300px"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="my-3 h-px w-28 origin-center bg-linear-to-r from-transparent via-gold to-transparent md:w-40"
        />

        <div className="flex flex-col items-center gap-0.5 md:flex-row md:gap-4">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-3xl text-maroon-dark md:text-5xl lg:text-6xl"
          >
            {groom.name}
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
            className="font-heading text-2xl text-rose md:text-3xl"
          >
            &
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-3xl text-maroon-dark md:text-5xl lg:text-6xl"
          >
            {bride.name}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-2 font-body text-base italic text-maroon/75 md:text-lg"
        >
          are getting married
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mt-1 font-heading text-sm tracking-wide text-sage md:text-base"
        >
          {weddingDate}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
          className="mt-5 flex flex-col items-center gap-1"
        >
          <span className="font-body text-xs text-maroon/50">Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-rose"
          >
            ↓
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
