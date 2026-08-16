"use client";

import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/wedding";
import { fadeUp } from "@/lib/motion";

export default function ClosingSection() {
  const { closing, couple, hashtag } = WEDDING_CONFIG;

  return (
    <footer className="relative bg-blush px-4 py-16 text-center floral-bg">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-2xl"
      >
        <p className="font-heading text-lg font-medium leading-relaxed text-navy/85 md:text-xl">
          {closing.message}
        </p>

        <p className="mt-8 font-heading text-2xl !font-medium text-royal-gold md:text-3xl">
          {closing.signature}
        </p>

        <p className="mt-4 break-all font-heading text-sm font-semibold tracking-wide text-navy/70 sm:tracking-widest">
          {hashtag}
        </p>

        <div className="mx-auto my-8 h-px w-48 bg-linear-to-r from-transparent via-royal-gold to-transparent" />

        <p className="mt-4 font-heading text-sm font-medium text-navy/70">
          {couple.groom.name} & {couple.bride.name} · {new Date().getFullYear()}
        </p>
      </motion.div>
    </footer>
  );
}
