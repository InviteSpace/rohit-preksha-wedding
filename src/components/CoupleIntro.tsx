"use client";

import { motion } from "framer-motion";
import PublicImage from "@/components/PublicImage";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { WEDDING_CONFIG } from "@/config/wedding";

function PersonEntrance({
  role,
  name,
  tagline,
  fromLeft,
}: {
  role: string;
  name: string;
  tagline: string;
  fromLeft: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -120 : 120, scale: 0.9 }}
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
        className="mb-4 rounded-full border border-gold/40 bg-blush px-5 py-1.5"
      >
        <span className="font-heading text-[10px] tracking-[0.35em] text-sage uppercase md:text-xs">
          {role}
        </span>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-5 font-heading text-3xl text-maroon-dark md:text-4xl"
      >
        {name}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="mt-2 max-w-xs font-body text-base italic text-maroon/70 md:text-lg"
      >
        &ldquo;{tagline}&rdquo;
      </motion.p>
    </motion.div>
  );
}

export default function CoupleIntro() {
  const { groom, bride, illustration } = WEDDING_CONFIG.couple;

  return (
    <SectionWrapper id="couple">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-heading text-xs text-sage uppercase"
        >
          The Couple
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-2 font-heading text-3xl text-maroon-dark md:text-4xl"
        >
          Two Hearts, One Journey
        </motion.h2>
        <div className="section-divider mx-auto my-6 w-32" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-body text-lg text-maroon/70"
        >
          Watch their story unfold
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
          alt={`${groom.name} and ${bride.name}`}
          width={853}
          height={1024}
          className="mx-auto h-auto w-full max-w-[240px] object-contain drop-shadow-md md:max-w-[280px]"
          sizes="(max-width: 768px) 60vw, 280px"
        />
      </motion.div>

      <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-6 lg:gap-10">
        <PersonEntrance
          role="The Groom"
          name={groom.name}
          tagline={groom.tagline}
          fromLeft
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
            className="font-heading text-5xl text-rose md:text-6xl"
          >
            &
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-3 h-px w-20 origin-center bg-gold"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-3 font-body text-sm italic text-sage"
          >
            united in love
          </motion.p>
        </motion.div>

        <PersonEntrance
          role="The Bride"
          name={bride.name}
          tagline={bride.tagline}
          fromLeft={false}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-14 text-center"
      >
        <p className="mx-auto max-w-xl font-body text-lg leading-relaxed text-maroon/80 md:text-xl">
          From a chance meeting to a lifetime of promises — their journey has been
          filled with laughter, love, and countless beautiful moments.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
