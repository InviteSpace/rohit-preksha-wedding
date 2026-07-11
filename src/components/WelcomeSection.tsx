"use client";

import { motion } from "framer-motion";
import GoldBorder from "@/components/ui/GoldBorder";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { WEDDING_CONFIG } from "@/config/wedding";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/motion";

interface WelcomeSectionProps {
  guestName?: string;
}

export default function WelcomeSection({ guestName }: WelcomeSectionProps) {
  const { blessing, families } = WEDDING_CONFIG;

  return (
    <SectionWrapper id="welcome">
      <GoldBorder className="invite-border bg-white/70">
        {guestName && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-center font-body text-lg text-maroon/80"
          >
            Dear <span className="font-semibold text-rose">{guestName}</span>, you are
            cordially invited
          </motion.p>
        )}

        <div className="text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-heading text-3xl text-rose gold-glow md:text-5xl"
          >
            {blessing.hindi}
          </motion.p>

          <div className="section-divider mx-auto my-6 w-48" />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-maroon/80 md:text-xl"
          >
            {blessing.english}
          </motion.p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="font-heading text-xs tracking-[0.3em] text-sage uppercase">
                From the family of
              </p>
              <h3 className="mt-2 font-heading text-2xl text-maroon-dark">
                {families.groom.surname}
              </h3>
              <p className="mt-1 font-body text-maroon/70">{families.groom.parents}</p>
            </motion.div>

            <motion.div
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="font-heading text-xs tracking-[0.3em] text-sage uppercase">
                & the family of
              </p>
              <h3 className="mt-2 font-heading text-2xl text-maroon-dark">
                {families.bride.surname}
              </h3>
              <p className="mt-1 font-body text-maroon/70">{families.bride.parents}</p>
            </motion.div>
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 font-heading text-lg tracking-wider text-gold md:text-xl"
          >
            request the honour of your presence at the wedding of their children
          </motion.p>
        </div>
      </GoldBorder>
    </SectionWrapper>
  );
}
