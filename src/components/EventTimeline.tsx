"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import EventCardDeck from "@/components/EventCardDeck";
import { fadeUp } from "@/lib/motion";

export default function EventTimeline({ eventIds }: { eventIds?: string[] }) {
  return (
    <SectionWrapper id="events">
      <div className="text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-2 font-heading text-[10px] font-semibold tracking-[0.28em] text-royal-gold uppercase sm:text-xs sm:tracking-[0.4em]"
        >
          Celebrations
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-2 font-heading text-2xl !font-medium text-navy-deep sm:text-3xl md:text-4xl"
        >
          Wedding Events
        </motion.h2>
        <div className="mx-auto my-5 h-px w-28 bg-linear-to-r from-transparent via-royal-gold to-transparent sm:my-6 sm:w-32" />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-2 font-heading text-base font-medium text-navy/80 sm:text-lg"
        >
          Pick a celebration card to reveal every detail
        </motion.p>
      </div>

      <EventCardDeck eventIds={eventIds} />
    </SectionWrapper>
  );
}
