"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import InvitationFlorals from "@/components/InvitationFlorals";
import { WEDDING_CONFIG } from "@/config/wedding";

type Stage = "closed" | "opening" | "arranged" | "done";

const ease = [0.22, 1, 0.36, 1] as const;
const navy = "#11294d";
const gold = "#d6ad63";

interface EnvelopeIntroProps {
  onComplete: () => void;
}

function MainInvitation() {
  const { groom, bride } = WEDDING_CONFIG.couple;
  const date = WEDDING_CONFIG.weddingDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative h-full overflow-hidden border border-[#d6ad63]/80 bg-[#11294d] text-center text-[#fffdf8] shadow-[0_14px_35px_rgba(17,41,77,0.28)]">
      <InvitationFlorals className="absolute -left-4 -top-3 w-[44%]" />
      <InvitationFlorals className="absolute -bottom-4 -right-4 w-[46%] rotate-180" />
      <div className="absolute inset-3 border border-[#d6ad63]/45" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8">
        <p className="font-heading text-[7px] tracking-[0.34em] uppercase sm:text-[9px]">
          Save the date
        </p>
        <div className="my-2 h-px w-10 bg-[#d6ad63]/80" />
        <h2 className="font-heading text-[clamp(14px,2.5vw,28px)] italic leading-tight">
          {groom.name}
          <span className="mx-2 text-[#d6ad63]">&</span>
          {bride.name}
        </h2>
        <p className="mt-2 font-body text-[7px] tracking-[0.15em] text-[#d6ad63] uppercase sm:text-[9px]">
          {date}
        </p>
        <p className="mt-1 font-body text-[7px] sm:text-[9px]">Together with their families</p>
      </div>
    </div>
  );
}

function ThankYouCard() {
  return (
    <div className="relative h-full overflow-hidden border border-[#d6ad63]/75 bg-[#11294d] px-7 py-5 text-center text-[#fffdf8] shadow-[0_12px_30px_rgba(17,41,77,0.25)]">
      <InvitationFlorals className="absolute -bottom-4 -left-4 w-[48%]" />
      <div className="absolute inset-3 border border-[#d6ad63]/35" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        <p className="font-heading text-[clamp(15px,2.2vw,25px)] italic">Thank you</p>
        <p className="mt-2 max-w-[80%] font-body text-[7px] leading-relaxed text-white/75 sm:text-[9px]">
          Your love and blessings make our celebration complete.
        </p>
        <p className="mt-3 font-heading text-[9px] italic text-[#d6ad63] sm:text-xs">
          Rohit and Preksha
        </p>
      </div>
    </div>
  );
}

function RibbonBand() {
  return (
    <div className="relative h-full overflow-hidden bg-[#dfc183] shadow-[0_10px_26px_rgba(82,63,34,0.18)]">
      <div className="absolute inset-y-0 left-[38%] w-[28%] bg-[#efb288]" />
      <div className="absolute inset-y-0 left-[43%] w-[18%] bg-[#9cb58d]" />
      <div className="absolute inset-y-0 left-[47%] w-[10%] bg-[#d8b36c]" />
      <div className="absolute inset-y-0 left-[48.5%] w-[7%] bg-[#f7d5b7]" />
      <div className="absolute inset-0 border border-[#bd914d]/45" />
    </div>
  );
}

function Envelope({
  stage,
  onOpen,
}: {
  stage: Stage;
  onOpen: () => void;
}) {
  const open = stage !== "closed";

  return (
    <div className="relative h-full w-full perspective-[1000px]">
      <div className="absolute inset-0 overflow-hidden bg-[#dfc183] shadow-[0_16px_34px_rgba(85,65,34,0.22)]">
        <InvitationFlorals className="absolute -left-2 -top-1 z-10 w-[45%]" />
        <InvitationFlorals className="absolute -right-2 -top-1 z-10 w-[42%] -scale-x-100" />
        <div className="absolute inset-0 border border-[#bd914d]/60" />
        <div className="absolute bottom-0 left-0 h-[72%] w-full [clip-path:polygon(0_0,50%_65%,100%_0,100%_100%,0_100%)] bg-[#d7b675]" />
        <div className="absolute bottom-0 left-0 h-[72%] w-1/2 [clip-path:polygon(0_0,100%_65%,100%_100%,0_100%)] bg-[#e6c98e]" />
        <div className="absolute bottom-0 right-0 h-[72%] w-1/2 [clip-path:polygon(0_65%,100%_0,100%_100%,0_100%)] bg-[#d1aa65]" />
      </div>

      <motion.div
        className="absolute inset-x-0 top-0 z-20 h-[58%] origin-top transform-3d"
        animate={open ? { rotateX: -178 } : { rotateX: 0 }}
        transition={{ duration: 0.9, ease }}
      >
        <div className="absolute inset-0 [clip-path:polygon(0_0,100%_0,50%_100%)] bg-[#fffdf8] shadow-[0_4px_9px_rgba(75,55,28,0.16)]">
          <InvitationFlorals className="absolute -left-3 top-0 w-[48%]" />
          <InvitationFlorals className="absolute -right-3 top-0 w-[45%] -scale-x-100" />
          <div className="absolute inset-0 [clip-path:polygon(0_0,100%_0,50%_100%)] border border-[#d6ad63]" />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-y-0 left-[46%] z-30 w-[10%] bg-[#f2c8aa] shadow-[0_0_7px_rgba(90,58,32,0.24)]"
        animate={open ? { y: "118%", rotate: 4, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease }}
      >
        <div className="absolute inset-y-0 left-[25%] w-1/2 bg-[#8faa84]" />
      </motion.div>

      <motion.button
        type="button"
        onClick={onOpen}
        disabled={open}
        className="absolute left-1/2 top-[51%] z-40 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-[#f0d28d] bg-[#11294d] shadow-lg disabled:cursor-default sm:h-16 sm:w-16"
        animate={open ? { scale: 0, opacity: 0 } : { scale: [1, 1.06, 1], opacity: 1 }}
        transition={open ? { duration: 0.25 } : { duration: 2, repeat: Infinity }}
        whileHover={!open ? { scale: 1.1 } : undefined}
        whileTap={!open ? { scale: 0.92 } : undefined}
        aria-label="Open wedding invitation"
      >
        <span className="absolute inset-1 rounded-full border border-[#d6ad63]/70" />
        <span className="font-heading text-sm text-white sm:text-base">R · P</span>
      </motion.button>
    </div>
  );
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [stage, setStage] = useState<Stage>("closed");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const open = stage !== "closed";
  const arranged = stage === "arranged";

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const handleOpen = useCallback(() => {
    if (stage !== "closed") return;
    setStage("opening");
    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.55 },
      colors: ["#11294d", "#d6ad63", "#fffdf8", "#9cb58d", "#efb288"],
    });
    timers.current.push(setTimeout(() => setStage("arranged"), 1750));
  }, [stage]);

  const enterWebsite = useCallback(() => {
    setStage("done");
    timers.current.push(setTimeout(onComplete, 550));
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55 }}
          className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-[#efede9] p-3 sm:p-6"
        >
          <div className="absolute inset-4 rounded-4xl bg-white/65 shadow-inner sm:inset-8" />
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-8 z-50 font-heading text-[10px] tracking-[0.35em] text-[#11294d]/70 uppercase sm:top-10 sm:text-xs"
          >
            {stage === "closed" ? "Tap the monogram to open" : arranged ? "Our invitation suite" : "Unwrapping your invitation"}
          </motion.p>

          <div className="relative aspect-[1.18/1] w-[min(94vw,760px)] sm:aspect-[1.28/1]">
            <motion.div
              className="absolute z-20 aspect-1.5/1 w-[58%]"
              initial={false}
              animate={
                open
                  ? { left: "5%", top: "10%", width: "49%", rotate: -2 }
                  : { left: "21%", top: "27%", width: "58%", rotate: 0 }
              }
              transition={{ duration: 1.1, delay: open ? 0.8 : 0, ease }}
            >
              <Envelope stage={stage} onOpen={handleOpen} />
            </motion.div>

            <motion.div
              className="absolute z-30 aspect-[1.55/1] w-[45%]"
              initial={false}
              animate={
                open
                  ? { left: "52%", top: "23%", rotate: 0, opacity: 1, scale: 1 }
                  : { left: "27%", top: "30%", rotate: 0, opacity: 0, scale: 0.88 }
              }
              transition={{ duration: 1.15, delay: open ? 0.55 : 0, ease }}
            >
              <MainInvitation />
            </motion.div>

            <motion.div
              className="absolute z-10 aspect-[1.55/1] w-[43%]"
              initial={false}
              animate={
                open
                  ? { left: "16%", top: "57%", rotate: 0, opacity: 1, scale: 1 }
                  : { left: "29%", top: "33%", rotate: -3, opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 1.05, delay: open ? 0.95 : 0, ease }}
            >
              <ThankYouCard />
            </motion.div>

            <motion.div
              className="absolute z-0 aspect-[1.55/1] w-[34%]"
              initial={false}
              animate={
                open
                  ? { left: "61%", top: "68%", rotate: 0, opacity: 1, scale: 1 }
                  : { left: "33%", top: "35%", rotate: 2, opacity: 0, scale: 0.75 }
              }
              transition={{ duration: 1, delay: open ? 1.1 : 0, ease }}
            >
              <RibbonBand />
            </motion.div>
          </div>

          <AnimatePresence>
            {arranged && (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.35, duration: 0.55, ease }}
                onClick={enterWebsite}
                className="absolute bottom-7 z-50 cursor-pointer border border-[#d6ad63] bg-[#11294d] px-6 py-3 font-heading text-[10px] tracking-[0.25em] text-white uppercase shadow-lg transition-colors hover:bg-[#1d3b68] sm:bottom-9 sm:text-xs"
              >
                Enter the celebration
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
