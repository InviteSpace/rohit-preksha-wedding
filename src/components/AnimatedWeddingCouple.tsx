"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { WEDDING_CONFIG } from "@/config/wedding";

export default function AnimatedWeddingCouple() {
  const { groom, bride } = WEDDING_CONFIG.couple;
  const src = WEDDING_CONFIG.hero.couple;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[300px] md:max-w-[360px]"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full"
      >
        <Image
          src={src}
          alt={`${groom.name} and ${bride.name}`}
          width={853}
          height={1024}
          priority
          unoptimized
          className="h-auto w-full object-contain drop-shadow-[0_8px_24px_rgba(61,43,43,0.15)]"
          sizes="(max-width: 768px) 90vw, 360px"
        />
      </motion.div>

      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-rose/15 blur-2xl" />
    </motion.div>
  );
}
