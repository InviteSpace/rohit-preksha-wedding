"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { WEDDING_CONFIG } from "@/config/wedding";

export default function CoupleScene() {
  const { groom, bride } = WEDDING_CONFIG.couple;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-lg md:max-w-xl"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative aspect-[4/5] w-full"
      >
        <Image
          src={WEDDING_CONFIG.hero.couple}
          alt={`${groom.name} and ${bride.name}`}
          fill
          priority
          className="object-contain drop-shadow-2xl"
          sizes="(max-width: 768px) 95vw, 560px"
        />
      </motion.div>

      <div className="absolute -inset-6 -z-10 rounded-full bg-rose/20 blur-3xl" />
    </motion.div>
  );
}
