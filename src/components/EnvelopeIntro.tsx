"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import confetti from "canvas-confetti";
import InvitationCard from "@/components/InvitationCard";

type Stage = "closed" | "opening" | "revealing" | "done";

const FLORAL_COLORS = ["#F5E6E0", "#C9958A", "#7A9E7E", "#E0B5AB", "#FFFBF7", "#B8956B"];

/** 4:5 card inside proportional envelope (304 × 406) */
const ENV_W = 304;
const ENV_H = 406;
const CARD_W = 272;
const CARD_H = 340;
const PAD_X = (ENV_W - CARD_W) / 2;
const PAD_TOP = 14;
const SEAL_Y = 218;
const HALF_W = ENV_W / 2;

const COLORS = {
  stroke: "#7A6248",
  back: "#BFA48C",
  leftFlap: "#A08870",
  rightFlap: "#967E66",
  bottomFlap: "#856B52",
  topFlap: "#F7F0E8",
} as const;

interface EnvelopeIntroProps {
  onComplete: () => void;
}

function FlapSvg({
  d,
  fill,
  className = "",
}: {
  d: string;
  fill: string;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${ENV_W} ${ENV_H}`}
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    >
      <path
        d={d}
        fill={fill}
        stroke={COLORS.stroke}
        strokeWidth="2"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
    </svg>
  );
}

const leftFlapD = `M 0 ${ENV_H} L 0 ${PAD_TOP} L ${HALF_W} ${SEAL_Y} Z`;
const rightFlapD = `M ${ENV_W} ${ENV_H} L ${ENV_W} ${PAD_TOP} L ${HALF_W} ${SEAL_Y} Z`;
const bottomFlapD = `M 0 ${ENV_H} L ${HALF_W} ${ENV_H - 44} L ${ENV_W} ${ENV_H} Z`;
const topFlapD = `M 0 0 L ${ENV_W} 0 L ${HALF_W} ${SEAL_Y} Z`;

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [stage, setStage] = useState<Stage>("closed");

  const isOpen = stage !== "closed";
  const isRevealing = stage === "revealing";

  const burstConfetti = useCallback(() => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.55 },
      colors: FLORAL_COLORS,
    });
  }, []);

  const handleOpen = () => {
    if (stage !== "closed") return;
    setStage("opening");
    setTimeout(burstConfetti, 350);
    setTimeout(() => setStage("revealing"), 1500);
    setTimeout(() => {
      setStage("done");
      onComplete();
    }, 3600);
  };

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-blush floral-bg px-4"
          style={{ perspective: "1400px" }}
        >
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 font-heading text-xs tracking-[0.35em] text-sage uppercase md:mb-8 md:text-sm"
          >
            {stage === "closed" ? "Tap the seal to open your invitation" : "Opening your invitation..."}
          </motion.p>

          <div
            className="relative w-full max-w-[304px]"
            style={{ aspectRatio: `${ENV_W} / ${ENV_H}`, transformStyle: "preserve-3d" }}
          >
            {/* Card — exact 4:5 ratio, hidden behind envelope when closed */}
            <motion.div
              className={`absolute ${isOpen ? "z-50" : "z-0"}`}
              style={{
                left: `${(PAD_X / ENV_W) * 100}%`,
                top: `${(PAD_TOP / ENV_H) * 100}%`,
                width: `${(CARD_W / ENV_W) * 100}%`,
                height: `${(CARD_H / ENV_H) * 100}%`,
              }}
              animate={
                isRevealing
                  ? { y: 0, opacity: 0 }
                  : isOpen
                    ? { y: "-112%", scale: 1.04 }
                    : { y: 0, scale: 1 }
              }
              transition={{
                duration: isRevealing ? 0.3 : 1.05,
                delay: isOpen && !isRevealing ? 0.45 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <InvitationCard compact className="h-full w-full" />
            </motion.div>

            {/* Envelope */}
            <motion.div
              className="absolute inset-0 z-20"
              animate={isRevealing ? { opacity: 0, y: "6%" } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: isRevealing ? 0.1 : 0 }}
            >
              <svg
                viewBox={`0 0 ${ENV_W} ${ENV_H}`}
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full drop-shadow-[0_14px_36px_rgba(61,43,43,0.2)]"
                aria-hidden
              >
                <rect
                  x="2"
                  y="2"
                  width={ENV_W - 4}
                  height={ENV_H - 4}
                  rx="8"
                  fill={COLORS.back}
                  stroke={COLORS.stroke}
                  strokeWidth="2.5"
                />
              </svg>

              <FlapSvg d={leftFlapD} fill={COLORS.leftFlap} />
              <FlapSvg d={rightFlapD} fill={COLORS.rightFlap} />
              <FlapSvg d={bottomFlapD} fill={COLORS.bottomFlap} />

              <motion.div
                className="absolute inset-0 origin-top"
                style={{ transformStyle: "preserve-3d" }}
                animate={
                  isOpen
                    ? { rotateX: -172, opacity: 0 }
                    : { rotateX: 0, opacity: 1 }
                }
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <FlapSvg d={topFlapD} fill={COLORS.topFlap} />
              </motion.div>
            </motion.div>

            {/* Seal */}
            <motion.button
              onClick={handleOpen}
              disabled={stage !== "closed"}
              className="absolute left-1/2 z-40 -translate-x-1/2 cursor-pointer disabled:cursor-default"
              style={{ top: `${(SEAL_Y / ENV_H) * 100 - 9}%` }}
              animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={stage === "closed" ? { scale: 1.1 } : {}}
              whileTap={stage === "closed" ? { scale: 0.92 } : {}}
              aria-label="Open invitation"
            >
              <motion.div
                animate={stage === "closed" ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="relative flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-linear-to-br from-[#C97890] via-[#A86068] to-[#8B4548] shadow-[0_4px_20px_rgba(139,69,72,0.5)] ring-2 ring-[#D4B896]"
              >
                <div className="absolute inset-2 rounded-full border border-white/50" />
                <div className="flex items-baseline gap-0.5">
                  <span className="font-heading text-xl font-semibold text-white">R</span>
                  <span className="font-heading text-[10px] text-white/80">·</span>
                  <span className="font-heading text-xl font-semibold text-white">P</span>
                </div>
              </motion.div>
            </motion.button>
          </div>

          <AnimatePresence>
            {isRevealing && (
              <motion.div
                initial={{ opacity: 0, y: 70, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-60 flex items-center justify-center px-6"
              >
                <motion.div
                  initial={{ rotateX: 8 }}
                  animate={{ rotateX: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-full max-w-[272px]"
                >
                  <InvitationCard expanded animateText />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p
            className="mt-8 font-body text-sm italic text-rose/80 md:mt-10"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            शुभ विवाह
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
