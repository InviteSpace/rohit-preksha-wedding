"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { WEDDING_CONFIG } from "@/config/wedding";

const PETALS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${8 + (i * 9) % 84}%`,
  delay: i * 0.5,
  duration: 7 + (i % 3),
  size: 5 + (i % 2) * 2,
}));

export default function AnimatedHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.04] }}
        transition={{ duration: 24, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <Image
          src={WEDDING_CONFIG.hero.background}
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
          aria-hidden
        />
      </motion.div>

      {/* Soft vignette — lighter so couple & arch stay visible */}
      <div className="absolute inset-0 bg-linear-to-t from-ivory/80 via-transparent to-ivory/20" />

      {PETALS.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute rounded-full bg-rose-light/50"
          style={{ left: p.left, width: p.size, height: p.size * 0.6, top: "-4%" }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, (p.id % 2 === 0 ? 1 : -1) * 20],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
