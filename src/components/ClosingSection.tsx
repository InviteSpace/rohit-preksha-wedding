"use client";

import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/wedding";
import { useLanguage } from "@/lib/LanguageContext";
import { getUiCopy } from "@/lib/uiCopy";
import { fadeUp } from "@/lib/motion";

export default function ClosingSection() {
  const { language } = useLanguage();
  const t = getUiCopy(language);
  const { hashtag } = WEDDING_CONFIG;

  return (
    <footer className="relative bg-blush px-4 py-14 text-center floral-bg sm:px-6 sm:py-16">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-2xl"
      >
        <p className="font-heading text-lg font-medium leading-relaxed text-navy/85 md:text-xl">
          {t.closingMessage}
        </p>

        <p className="mt-8 font-heading text-2xl !font-medium text-royal-gold md:text-3xl">
          {t.closingSignature}
        </p>

        <p className="mt-4 break-all font-heading text-sm font-semibold tracking-wide text-navy/70 sm:tracking-widest">
          {hashtag}
        </p>

        <div className="mx-auto my-8 h-px w-48 bg-linear-to-r from-transparent via-royal-gold to-transparent" />

        <p className="mt-4 font-heading text-sm font-medium text-navy/70">
          {t.groomName} {language === "hi" ? "एवं" : "&"} {t.brideName} ·{" "}
          {new Date().getFullYear()}
        </p>
      </motion.div>
    </footer>
  );
}
