"use client";

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import Button from "@/components/ui/Button";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { WEDDING_CONFIG } from "@/config/wedding";
import { useLanguage } from "@/lib/LanguageContext";
import { eyebrowClass, getUiCopy } from "@/lib/uiCopy";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

export default function SharePhotosSection() {
  const { language } = useLanguage();
  const t = getUiCopy(language);
  const { sharedAlbum, hashtag } = WEDDING_CONFIG;

  const steps = [
    { number: "01", title: t.step1Title, detail: t.step1Detail },
    { number: "02", title: t.step2Title, detail: t.step2Detail },
    { number: "03", title: t.step3Title, detail: t.step3Detail },
  ];

  return (
    <SectionWrapper id="share-photos">
      <div className="text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`px-2 font-heading font-semibold text-royal-gold ${eyebrowClass(language)}`}
        >
          {t.captureMoment}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-2 font-heading text-3xl !font-medium text-navy-deep md:text-4xl"
        >
          {t.sharePhotos}
        </motion.h2>
        <div className="mx-auto my-6 h-px w-32 bg-linear-to-r from-transparent via-royal-gold to-transparent" />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl px-1 font-heading text-base font-medium text-navy/80 sm:text-lg"
        >
          {t.albumDescription}
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6"
      >
        <motion.div
          variants={staggerItem}
          className="overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white/80 p-6 shadow-[0_20px_50px_rgba(17,41,77,0.08)] backdrop-blur-xl md:p-8"
        >
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-navy text-base text-white sm:h-12 sm:w-12 sm:text-lg"
              aria-hidden
            >
              📸
            </span>
            <div className="min-w-0">
              <p
                className={`font-heading font-semibold text-royal-gold ${eyebrowClass(language, "sm")}`}
              >
                {t.albumEyebrow}
              </p>
              <h3 className="mt-1 font-heading text-xl !font-medium text-navy-deep sm:text-2xl">
                {t.albumTitle}
              </h3>
              <p className="mt-3 font-heading text-sm font-medium leading-relaxed text-navy/80 sm:text-base">
                {t.albumBody}
              </p>
            </div>
          </div>

          <motion.ol variants={staggerContainer} className="mt-8 space-y-3">
            {steps.map((step) => (
              <motion.li
                key={step.number}
                variants={staggerItem}
                className="flex gap-4 rounded-2xl border border-navy/8 bg-navy/[0.03] p-4"
              >
                <span className="font-heading text-sm font-semibold text-royal-gold">
                  {step.number}
                </span>
                <div>
                  <p className="font-heading text-base !font-medium text-navy-deep">
                    {step.title}
                  </p>
                  <p className="mt-1 font-heading text-sm font-medium text-navy/70">
                    {step.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={sharedAlbum.url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="primary">{t.addPhotos}</Button>
            </a>
            <a href={sharedAlbum.url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="outline">{t.viewAlbum}</Button>
            </a>
          </div>

          <p className="mt-5 font-heading text-sm font-medium italic text-navy/70">
            {t.hashtagHint.replace("{hashtag}", hashtag)}
          </p>
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="flex flex-col items-center justify-center rounded-[1.75rem] border border-white/10 bg-navy p-6 text-center shadow-[0_20px_50px_rgba(17,41,77,0.2)] md:p-8"
        >
          <p
            className={`font-heading font-semibold text-royal-gold-bright ${eyebrowClass(language)}`}
          >
            {t.scanUpload}
          </p>
          <p className="mt-2 max-w-xs font-heading text-sm font-medium text-white/80">
            {t.scanUploadHint}
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-6 rounded-2xl border border-white/15 bg-white p-3 shadow-lg sm:p-4"
          >
            <QRCodeSVG
              value={sharedAlbum.url}
              size={160}
              bgColor="#FFFFFF"
              fgColor="#11294d"
              level="M"
              className="h-auto w-[min(160px,60vw)]"
            />
          </motion.div>

          <p className="mt-5 max-w-xs font-heading text-xs font-medium text-white/65">
            {t.albumUploadNote}
          </p>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
