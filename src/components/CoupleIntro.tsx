"use client";

import { motion } from "framer-motion";
import PublicImage from "@/components/PublicImage";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { WEDDING_CONFIG } from "@/config/wedding";
import { useLanguage } from "@/lib/LanguageContext";
import { getUiCopy } from "@/lib/uiCopy";

function PersonEntrance({
  role,
  name,
  tagline,
  fromLeft,
  isHindi,
}: {
  role: string;
  name: string;
  tagline: string;
  fromLeft: boolean;
  isHindi: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -48 : 48, scale: 0.94 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mb-4 rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5 sm:px-5"
      >
        <span
          className={`inline-flex items-center justify-center font-heading font-semibold leading-snug text-navy ${
            isHindi
              ? "hi-eyebrow text-[14px] tracking-normal normal-case md:text-[15px]"
              : "text-[10px] tracking-[0.22em] uppercase sm:tracking-[0.35em] md:text-xs"
          }`}
        >
          {role}
        </span>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-5 font-heading text-3xl !font-medium text-navy-deep md:text-4xl"
      >
        {name}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="mt-2 max-w-xs font-heading text-base font-medium italic text-navy/80 md:text-lg"
      >
        &ldquo;{tagline}&rdquo;
      </motion.p>
    </motion.div>
  );
}

export default function CoupleIntro() {
  const { language } = useLanguage();
  const t = getUiCopy(language);
  const { illustration } = WEDDING_CONFIG.couple;

  return (
    <SectionWrapper id="couple">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: language === "hi" ? "0em" : "0.1em" }}
          whileInView={{
            opacity: 1,
            letterSpacing: language === "hi" ? "0em" : "0.4em",
          }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`font-heading font-semibold text-royal-gold ${
            language === "hi"
              ? "hi-eyebrow tracking-normal normal-case text-base leading-snug sm:text-lg"
              : "text-xs leading-none uppercase"
          }`}
        >
          {t.theCouple}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`mt-2 font-heading text-3xl !font-medium text-navy-deep md:text-4xl ${
            language === "hi" ? "leading-snug" : ""
          }`}
        >
          {t.twoHearts}
        </motion.h2>
        <div className="section-divider mx-auto my-6 w-32" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-heading text-lg font-medium text-navy/80"
        >
          {t.watchStory}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-10 w-full max-w-[240px] md:max-w-[280px]"
      >
        <PublicImage
          src={illustration}
          alt={`${t.groomName} and ${t.brideName}`}
          width={853}
          height={1024}
          className="mx-auto h-auto w-full max-w-[240px] object-contain drop-shadow-md md:max-w-[280px]"
          sizes="(max-width: 768px) 60vw, 280px"
        />
      </motion.div>

      <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-6 lg:gap-10">
        <PersonEntrance
          role={t.theGroom}
          name={t.groomName}
          tagline={t.groomTagline}
          fromLeft
          isHindi={language === "hi"}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
          className="flex flex-col items-center py-4 md:py-0"
        >
          <motion.span
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-heading text-5xl !font-medium text-royal-gold md:text-6xl"
          >
            {language === "hi" ? "एवं" : "&"}
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-3 h-px w-20 origin-center bg-royal-gold"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-3 font-heading text-sm font-medium italic text-navy/75"
          >
            {t.unitedInLove}
          </motion.p>
        </motion.div>

        <PersonEntrance
          role={t.theBride}
          name={t.brideName}
          tagline={t.brideTagline}
          fromLeft={false}
          isHindi={language === "hi"}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-14 text-center"
      >
        <p className="mx-auto max-w-xl font-heading text-lg font-medium leading-relaxed text-navy/90 md:text-xl">
          {t.coupleJourney}
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
