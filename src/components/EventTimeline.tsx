"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import EventCardDeck from "@/components/EventCardDeck";
import { fadeUp } from "@/lib/motion";

export default function EventTimeline() {
  return (
    <SectionWrapper id="events">
      <div className="text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-heading text-xs tracking-[0.4em] text-sage uppercase"
        >
          Celebrations
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-2 font-heading text-3xl text-maroon-dark md:text-4xl"
        >
          Wedding Events
        </motion.h2>
        <div className="section-divider mx-auto my-6 w-32" />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body text-lg text-maroon/70"
        >
          Pick a celebration card to reveal every detail
        </motion.p>
      </div>

      <EventCardDeck />
    </SectionWrapper>
  );
}
