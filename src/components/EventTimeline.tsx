"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import EventCardDeck from "@/components/EventCardDeck";
import { useLanguage } from "@/lib/LanguageContext";
import { eyebrowClass, getUiCopy } from "@/lib/uiCopy";
import { fadeUp } from "@/lib/motion";

export default function EventTimeline({ eventIds }: { eventIds?: string[] }) {
  const { language } = useLanguage();
  const t = getUiCopy(language);

  return (
    <SectionWrapper id="events">
      <div className="text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`px-2 font-heading font-semibold text-royal-gold ${eyebrowClass(language)}`}
        >
          {t.celebrations}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-2 font-heading text-2xl !font-medium text-navy-deep sm:text-3xl md:text-4xl"
        >
          {t.weddingEvents}
        </motion.h2>
        <div className="mx-auto my-5 h-px w-28 bg-linear-to-r from-transparent via-royal-gold to-transparent sm:my-6 sm:w-32" />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-2 font-heading text-base font-medium text-navy/80 sm:text-lg"
        >
          {t.pickCardHint}
        </motion.p>
      </div>

      <EventCardDeck eventIds={eventIds} />
    </SectionWrapper>
  );
}
