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
          className="font-heading text-xs font-semibold tracking-[0.4em] text-royal-gold uppercase"
        >
          Celebrations
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-2 font-heading text-3xl !font-medium text-navy-deep md:text-4xl"
        >
          Wedding Events
        </motion.h2>
        <div className="mx-auto my-6 h-px w-32 bg-linear-to-r from-transparent via-royal-gold to-transparent" />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-heading text-lg font-medium text-navy/80"
        >
          Pick a celebration card to reveal every detail
        </motion.p>
      </div>

      <EventCardDeck eventIds={eventIds} />
    </SectionWrapper>
  );
}
