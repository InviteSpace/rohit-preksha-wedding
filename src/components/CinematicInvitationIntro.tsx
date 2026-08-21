"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import InvitationFlorals from "@/components/InvitationFlorals";
import { WEDDING_MUSIC_START_EVENT } from "@/components/MusicPlayer";
import {
  getInvitationContent,
  type InvitationLanguage,
  type InvitationSide,
} from "@/lib/invitationSide";

type Stage =
  | "closed"
  | "opening"
  | "card-front"
  | "card-back"
  | "done";

const ease = [0.22, 1, 0.36, 1] as const;

interface CinematicInvitationIntroProps {
  onComplete: () => void;
  side?: InvitationSide;
  initialLanguage?: InvitationLanguage;
  onLanguageChange?: (language: InvitationLanguage) => void;
}

function WaxSeal({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full border-2 border-[#e3bd72] bg-[#17345d] text-white shadow-[0_5px_16px_rgba(48,26,15,0.38)] ${
        compact ? "h-10 w-10" : "h-14 w-14 sm:h-18 sm:w-18"
      }`}
    >
      <span className="absolute inset-1 rounded-full border border-[#d6ad63]/70" />
      <span className={`font-heading ${compact ? "text-[10px]" : "text-sm sm:text-base"}`}>R · P</span>
    </div>
  );
}

function EnvelopeFront() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[3px] border border-[#bd9659] bg-[#dfc080] shadow-[0_18px_48px_rgba(62,43,24,0.28)] backface-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-[#a8783a]/10" />

      {/* Two narrow, parallel copper ribbons on the right like the reference */}
      <div className="absolute inset-y-0 left-[70%] w-[3.5%] bg-[#b8734f] shadow-[inset_1px_0_0_rgba(255,255,255,0.25),inset_-1px_0_0_rgba(90,42,24,0.16)]" />
      <div className="absolute inset-y-0 left-[77%] w-[3.5%] bg-[#c9835d] shadow-[inset_1px_0_0_rgba(255,255,255,0.25),inset_-1px_0_0_rgba(90,42,24,0.16)]" />
      <div className="absolute left-[75.25%] top-1/2 -translate-x-1/2 -translate-y-1/2">
        <WaxSeal />
      </div>

      <div className="absolute bottom-3 left-4 font-heading text-[7px] tracking-[0.25em] text-[#6f4a31]/70 uppercase sm:text-[9px]">
        Rohit & Preksha
      </div>
    </div>
  );
}

function EnvelopeBack({ open }: { open: boolean }) {
  return (
    <div className="absolute inset-0 transform-[rotateY(180deg)] overflow-visible backface-hidden">
      {/* Tall pointed inner flap stays behind the envelope body */}
      <motion.div
        className="absolute inset-x-0 bottom-[96%] z-0 h-[78%] origin-bottom overflow-hidden bg-[#cfa861] [clip-path:polygon(50%_0,100%_100%,0_100%)] shadow-[0_-7px_16px_rgba(67,45,22,0.16)]"
        initial={false}
        animate={open ? { scaleY: 1, opacity: 1 } : { scaleY: 0.08, opacity: 0 }}
        transition={{ duration: 0.85, delay: open ? 0.72 : 0, ease }}
      >
        {/* Separate white inner lining creates the visible golden-yellow border */}
        <div className="absolute inset-x-[5%] bottom-[4%] top-[7%] overflow-hidden bg-[#fffdf8] [clip-path:polygon(50%_0,100%_100%,0_100%)]">
          <div className="absolute inset-0 bg-linear-to-b from-white via-[#fffdf9] to-[#f5f2eb]" />
          <InvitationFlorals className="absolute -left-3 top-[18%] w-[52%]" />
          <InvitationFlorals className="absolute -right-3 top-[18%] w-[52%] -scale-x-100" />
          <InvitationFlorals className="absolute left-[28%] top-[-3%] w-[44%] rotate-12" />
        </div>
      </motion.div>

      <div className="absolute inset-0 z-10 overflow-hidden rounded-[3px] border border-[#bd9659] bg-[#d9b874] shadow-[0_18px_48px_rgba(62,43,24,0.28)]">
        {/* Hidden while flipping; revealed only when the golden flap opens */}
        <motion.div
          className="absolute inset-x-[3%] top-[3%] h-[76%] bg-[#fffdf8] [clip-path:polygon(0_0,100%_0,100%_24%,50%_100%,0_24%)]"
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.35, delay: open ? 0.9 : 0 }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-white to-[#f4f1e9]" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-[74%] bg-[#dfc080] [clip-path:polygon(0_0,50%_61%,100%_0,100%_100%,0_100%)]" />
        <div className="absolute bottom-0 left-0 h-[72%] w-1/2 bg-[#e7cc92] [clip-path:polygon(0_0,100%_62%,100%_100%,0_100%)]" />
        <div className="absolute bottom-0 right-0 h-[72%] w-1/2 bg-[#d4ad68] [clip-path:polygon(0_62%,100%_0,100%_100%,0_100%)]" />
      </div>

      {/* Closed outer flap folds away to reveal the embroidered liner */}
      <motion.div
        className="absolute inset-x-0 top-0 z-20 h-[65%] origin-top transform-3d"
        animate={open ? { rotateX: 178, opacity: 0 } : { rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.85, delay: open ? 0.68 : 0, ease }}
      >
        <div className="absolute inset-0 bg-[#d8b674] [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-[0_5px_12px_rgba(67,45,22,0.15)]" />
      </motion.div>
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
  const flipped = stage !== "closed";
  const open = stage !== "closed";

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 45 || Math.abs(info.velocity.x) > 350) onOpen();
  };

  return (
    <motion.div
      drag={stage === "closed" ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={handleDragEnd}
      className="relative h-full w-full cursor-pointer perspective-[1400px]"
      onClick={onOpen}
      whileTap={stage === "closed" ? { scale: 0.98 } : undefined}
      aria-label="Open wedding invitation"
      role="button"
      tabIndex={stage === "closed" ? 0 : -1}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpen();
      }}
    >
      <motion.div
        className="relative h-full w-full transform-3d will-change-transform"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.95, ease }}
      >
        <EnvelopeFront />
        <EnvelopeBack open={open} />
      </motion.div>
    </motion.div>
  );
}

function EnvelopePocketOverlay() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[3px]">
      <div className="absolute inset-x-0 bottom-0 h-[74%] bg-[#dfc080] [clip-path:polygon(0_0,50%_61%,100%_0,100%_100%,0_100%)]" />
      <div className="absolute bottom-0 left-0 h-[72%] w-1/2 bg-[#e7cc92] [clip-path:polygon(0_0,100%_62%,100%_100%,0_100%)]" />
      <div className="absolute bottom-0 right-0 h-[72%] w-1/2 bg-[#d4ad68] [clip-path:polygon(0_62%,100%_0,100%_100%,0_100%)]" />
      <div className="absolute inset-0 border border-[#bd9659]/60" />
    </div>
  );
}

/** Front: couple names + inviting-side family (groom or bride). */
function InvitationFrontFace({
  language,
  side,
  contentVisible,
}: {
  language: InvitationLanguage;
  side: InvitationSide;
  contentVisible: boolean;
}) {
  const content = getInvitationContent(side, language);

  return (
    <div className="absolute inset-0 isolate overflow-hidden border border-[#d6ad63]/80 bg-[#11294d] text-center text-white shadow-[0_22px_55px_rgba(17,41,77,0.4)] backface-hidden">
      <InvitationFlorals className="pointer-events-none absolute -left-5 -top-6 z-0 w-[26%] opacity-70 [transform:translateZ(0)] sm:-left-8 sm:-top-10 sm:w-[28%] sm:opacity-80" />
      <InvitationFlorals className="pointer-events-none absolute -bottom-6 -right-5 z-0 w-[28%] opacity-70 [transform:translateZ(0)_rotate(180deg)] sm:-bottom-10 sm:-right-8 sm:w-[30%] sm:opacity-80" />
      <div className="pointer-events-none absolute inset-3.5 z-0 border border-[#d6ad63]/45 sm:inset-4" />

      <motion.div
        initial={false}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: contentVisible ? 0.55 : 0.2, ease, delay: contentVisible ? 0.12 : 0 }}
        className="relative z-20 flex h-full flex-col items-center justify-center gap-3 overflow-y-auto px-6 py-7 text-center [transform:translateZ(1px)] sm:gap-0 sm:overflow-hidden sm:px-16 sm:py-10 md:px-20"
        aria-hidden={!contentVisible}
      >
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0 sm:gap-x-4 md:gap-x-5">
            <h2
              className={
                language === "en"
                  ? "font-script text-[clamp(26px,8vw,58px)] leading-none tracking-normal text-white normal-case"
                  : "font-invite text-[clamp(18px,5.5vw,42px)] italic leading-none tracking-normal text-white"
              }
            >
              {content.primaryName}
            </h2>
            <p
              className={
                language === "en"
                  ? "font-script text-[clamp(18px,5vw,30px)] leading-none tracking-normal text-[#e3bd72] normal-case"
                  : "font-invite text-[clamp(14px,3.5vw,24px)] italic leading-none tracking-normal text-[#e3bd72]"
              }
            >
              {content.unionLine}
            </p>
            <h2
              className={
                language === "en"
                  ? "font-script text-[clamp(26px,8vw,58px)] leading-none tracking-normal text-white normal-case"
                  : "font-invite text-[clamp(18px,5.5vw,42px)] italic leading-none tracking-normal text-white"
              }
            >
              {content.secondaryName}
            </h2>
            {content.partnerConnector && (
              <p className="basis-full font-invite text-[10px] font-semibold text-white/90 sm:basis-auto sm:text-sm">
                {content.partnerConnector}
              </p>
            )}
          </div>

          <div className="my-3 h-px w-12 bg-[#d6ad63]/65 sm:my-3.5 sm:w-14" />
          <div className="grid w-full max-w-[94%] grid-cols-1 gap-3.5 sm:max-w-[88%] sm:grid-cols-2 sm:gap-x-8 sm:gap-y-1">
            <div className="text-center">
              <p className="font-invite text-[10px] font-medium text-[#e3bd72] sm:text-xs lg:text-sm">
                {content.familyIntroduction}
              </p>
              <p className="mt-1 font-invite text-[11px] font-semibold leading-snug text-white sm:text-xs lg:text-sm">
                {content.parents[0]}
              </p>
              <p className="font-invite text-[10px] font-semibold text-[#e3bd72] sm:text-xs lg:text-sm">
                &
              </p>
              <p className="font-invite text-[11px] font-semibold leading-snug text-white sm:text-xs lg:text-sm">
                {content.parents[1]}
              </p>
            </div>
            <div className="text-center">
              <p className="font-invite text-[10px] font-medium text-[#e3bd72] sm:text-xs lg:text-sm">
                {content.grandparentsIntroduction}
              </p>
              <p className="mt-1 font-invite text-[11px] font-semibold leading-snug text-white sm:text-xs lg:text-sm">
                {content.grandparents[0]}
              </p>
              <p className="font-invite text-[10px] font-semibold text-[#e3bd72] sm:text-xs lg:text-sm">
                &
              </p>
              <p className="font-invite text-[11px] font-semibold leading-snug text-white sm:text-xs lg:text-sm">
                {content.grandparents[1]}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-1 flex w-full flex-col items-center sm:mt-0">
          <div className="mb-3 h-px w-12 bg-[#d6ad63]/65 sm:my-3.5 sm:mb-0 sm:w-14" />
          <p className="font-invite text-[10px] font-semibold tracking-[0.16em] text-white uppercase sm:text-sm lg:text-base">
            {content.weekday}
          </p>
          <p className="font-invite text-sm font-semibold text-[#e3bd72] sm:text-base lg:text-lg">
            {content.date}
          </p>
          <p className="mt-1 font-invite text-xs font-semibold text-white sm:text-sm lg:text-base">
            {content.venue}
          </p>
          <p className="mt-3 max-w-[90%] font-invite text-[10px] font-medium leading-relaxed text-white/90 sm:mt-2.5 sm:max-w-[72%] sm:text-xs lg:text-sm">
            {content.closing}
          </p>
          <p className="mt-3 font-invite text-[8px] font-medium tracking-[0.22em] text-white/70 uppercase sm:mt-3 sm:text-[9px]">
            Tap to turn over
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/** Back: short warm invite to the wedding day & reception. */
function WarmInviteBackFace({
  language,
  side,
  contentVisible,
}: {
  language: InvitationLanguage;
  side: InvitationSide;
  contentVisible: boolean;
}) {
  const content = getInvitationContent(side, language);

  return (
    <div className="absolute inset-0 isolate overflow-hidden border border-[#d6ad63]/80 bg-[#11294d] text-center text-white shadow-[0_22px_55px_rgba(17,41,77,0.4)] transform-[rotateY(180deg)] backface-hidden">
      <InvitationFlorals className="pointer-events-none absolute -left-5 -top-6 z-0 w-[24%] opacity-70 [transform:translateZ(0)] sm:-left-8 sm:-top-10 sm:w-[26%] sm:opacity-80" />
      <InvitationFlorals className="pointer-events-none absolute -bottom-6 -right-5 z-0 w-[26%] opacity-70 [transform:translateZ(0)_rotate(180deg)] sm:-bottom-10 sm:-right-8 sm:w-[28%] sm:opacity-80" />
      <div className="pointer-events-none absolute inset-3.5 z-0 border border-[#d6ad63]/45 sm:inset-4" />
      <motion.div
        initial={false}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: contentVisible ? 0.55 : 0.2, ease, delay: contentVisible ? 0.12 : 0 }}
        className="relative z-20 flex h-full flex-col items-center justify-center gap-3 overflow-y-auto px-6 py-7 [transform:translateZ(1px)] sm:gap-0 sm:overflow-hidden sm:px-16 sm:py-8"
        aria-hidden={!contentVisible}
      >
        <p className="shrink-0 font-invite text-[clamp(22px,7vw,44px)] font-semibold italic leading-tight text-[#e3bd72]">
          {content.warmTitle}
        </p>
        <div className="my-2 h-px w-12 shrink-0 bg-[#d6ad63]/65 sm:my-5 sm:w-14" />
        <p className="max-w-[90%] font-invite text-[11px] font-medium leading-relaxed text-white sm:max-w-[78%] sm:text-sm md:text-base lg:text-lg">
          {content.warmMessage}
        </p>
        <p className="mt-3 max-w-[90%] font-invite text-[10px] font-medium leading-relaxed text-white/90 sm:mt-5 sm:max-w-[78%] sm:text-sm md:text-base">
          {content.warmReceptionLine}
        </p>
        <p className="mt-4 shrink-0 font-invite text-sm font-semibold italic text-[#e3bd72] sm:mt-7 sm:text-base">
          {content.signature}
        </p>
      </motion.div>
    </div>
  );
}

function DoubleSidedCard({
  flipped,
  onFlip,
  language,
  side,
  contentVisible,
}: {
  flipped: boolean;
  onFlip: () => void;
  language: InvitationLanguage;
  side: InvitationSide;
  contentVisible: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={contentVisible ? onFlip : undefined}
      disabled={!contentVisible}
      className={`relative h-full w-full perspective-[1400px] ${
        contentVisible ? "cursor-pointer" : "cursor-default"
      }`}
      whileHover={contentVisible ? { scale: 1.015 } : undefined}
      whileTap={contentVisible ? { scale: 0.985 } : undefined}
      aria-label={
        contentVisible
          ? flipped
            ? "Show invitation front"
            : "Show warm invitation message"
          : "Invitation opening"
      }
    >
      <motion.div
        className="relative h-full w-full transform-3d will-change-transform"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.85, ease }}
      >
        <InvitationFrontFace
          language={language}
          side={side}
          contentVisible={contentVisible}
        />
        <WarmInviteBackFace
          language={language}
          side={side}
          contentVisible={contentVisible}
        />
      </motion.div>
    </motion.button>
  );
}

export default function CinematicInvitationIntro({
  onComplete,
  side = "groom",
  initialLanguage = "en",
  onLanguageChange,
}: CinematicInvitationIntroProps) {
  const [stage, setStage] = useState<Stage>("closed");
  const [language, setLanguage] = useState<InvitationLanguage>(initialLanguage);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasOpened = useRef(false);

  const changeLanguage = (next: InvitationLanguage) => {
    setLanguage(next);
    onLanguageChange?.(next);
  };

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => {
    timers.current.push(setTimeout(() => beginOpening(), 4000));
    return clearTimers;
    // beginOpening is stable for the lifetime of the closed screen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beginOpening = useCallback(() => {
    if (hasOpened.current) return;
    hasOpened.current = true;
    clearTimers();
    setStage("opening");
    timers.current.push(setTimeout(() => setStage("card-front"), 3000));
  }, [clearTimers]);

  const flipCard = () => {
    if (stage === "card-front") setStage("card-back");
    if (stage === "card-back") setStage("card-front");
  };

  const enterWebsite = () => {
    clearTimers();
    window.dispatchEvent(new Event(WEDDING_MUSIC_START_EVENT));
    setStage("done");
    timers.current.push(setTimeout(onComplete, 500));
  };

  const envelopeVisible = stage === "closed" || stage === "opening";
  const cardVisible = ["opening", "card-front", "card-back"].includes(stage);
  const focused = ["card-front", "card-back"].includes(stage);

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-[#efede9] px-5 py-6 sm:p-8"
        >
          <div className="absolute inset-5 rounded-4xl bg-white/70 shadow-inner sm:inset-8" />

          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-8 z-50 px-6 text-center font-heading text-[9px] tracking-[0.32em] text-[#11294d]/70 uppercase sm:top-11 sm:text-xs"
          >
            {stage === "closed"
              ? "Tap, swipe, or wait"
              : focused
                ? stage === "card-front"
                  ? "Tap the invitation to turn it over"
                  : "A warm note for our celebration"
                : "Unwrapping your invitation"}
          </motion.p>

          <div className="absolute top-14 z-60 flex items-center rounded-full border border-[#d6ad63]/70 bg-white/90 p-1 shadow-sm sm:top-18">
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              className={`cursor-pointer rounded-full px-3 py-1 font-heading text-[9px] tracking-wider transition-colors sm:text-[10px] ${
                language === "en" ? "bg-[#11294d] text-white" : "text-[#11294d]/65"
              }`}
              aria-pressed={language === "en"}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => changeLanguage("hi")}
              className={`cursor-pointer rounded-full px-3 py-1 font-heading text-[10px] transition-colors sm:text-xs ${
                language === "hi" ? "bg-[#11294d] text-white" : "text-[#11294d]/65"
              }`}
              aria-pressed={language === "hi"}
            >
              हिन्दी
            </button>
          </div>

          <div
            className={`relative ${
              focused
                ? "mt-2 h-[calc(100dvh-14rem)] w-[min(84vw,380px)] max-h-[520px] sm:mt-0 sm:aspect-[1.3/1] sm:h-auto sm:max-h-none sm:w-[min(94vw,1040px,calc(78vh*1.3))]"
                : "aspect-[1.08/1] w-[min(92vw,620px)] sm:aspect-[1.3/1] sm:w-[min(94vw,1040px,calc(78vh*1.3))]"
            }`}
          >
            <AnimatePresence>
              {envelopeVisible && (
                <motion.div
                  className="absolute left-[15%] top-[31%] z-20 aspect-1.5/1 w-[70%] will-change-transform"
                  initial={false}
                  animate={
                    stage === "closed"
                      ? { x: "0%", y: "0%", scale: 1, opacity: 1, zIndex: 20 }
                      : {
                          x: ["0%", "0%", "0%", "7%", "7%"],
                          y: ["0%", "0%", "0%", "34%", "42%"],
                          scale: [1, 0.82, 0.82, 0.72, 0.66],
                          opacity: [1, 1, 1, 0.72, 0],
                          zIndex: [20, 20, 5, 5, 5],
                        }
                  }
                  exit={{ opacity: 0, scale: 0.65, y: 70 }}
                  transition={
                    stage === "closed"
                      ? { duration: 0 }
                      : { duration: 3, times: [0, 0.32, 0.52, 0.78, 1], ease }
                  }
                >
                  <Envelope stage={stage} onOpen={beginOpening} />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {cardVisible && (
                <motion.div
                  className={`absolute z-10 will-change-transform ${
                    focused
                      ? "inset-0 aspect-auto h-full w-full sm:left-[10%] sm:top-[23%] sm:right-auto sm:bottom-auto sm:aspect-[1.55/1] sm:h-auto sm:w-[80%]"
                      : "left-[19%] top-[8%] aspect-4/5 w-[62%] [--card-rise-y:-52%] [--card-tuck-x:0%] [--card-tuck-y:0%] sm:left-[10%] sm:top-[23%] sm:aspect-[1.55/1] sm:w-[80%] sm:[--card-rise-y:-48%]"
                  }`}
                  initial={{
                    x: "var(--card-tuck-x, 0%)",
                    y: "var(--card-tuck-y, 0%)",
                    opacity: 0,
                    scale: 0.55,
                  }}
                  animate={
                    focused
                      ? { x: "0%", y: "0%", opacity: 1, scale: 1 }
                      : {
                          x: [
                            "var(--card-tuck-x)",
                            "var(--card-tuck-x)",
                            "var(--card-tuck-x)",
                            "var(--card-tuck-x)",
                            "-3%",
                            "0%",
                          ],
                          y: [
                            "var(--card-tuck-y)",
                            "var(--card-tuck-y)",
                            "var(--card-tuck-y)",
                            "var(--card-tuck-y)",
                            "var(--card-rise-y)",
                            "0%",
                          ],
                          scale: [0.55, 0.55, 0.55, 0.55, 0.65, 1],
                          opacity: [0, 0, 0, 1, 1, 1],
                          rotateZ: [0, 0, 0, 0, -1.5, 0],
                          rotateX: [0, 0, 0, 0, -3, 0],
                        }
                  }
                  transition={
                    focused
                      ? { duration: 0.15, ease }
                      : { duration: 3, times: [0, 0.52, 0.55, 0.56, 0.8, 1], ease }
                  }
                >
                  <DoubleSidedCard
                    flipped={stage === "card-back"}
                    onFlip={flipCard}
                    language={language}
                    side={side}
                    contentVisible={focused}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Foreground pocket masks the lower card so it visibly slides out */}
            <AnimatePresence>
              {stage === "opening" && (
                <motion.div
                  className="pointer-events-none absolute left-[15%] top-[31%] z-30 aspect-1.5/1 w-[70%] will-change-transform"
                  initial={{ opacity: 0, x: "0%", y: "0%", scale: 1 }}
                  animate={{
                    x: ["0%", "0%", "0%", "7%", "7%"],
                    y: ["0%", "0%", "0%", "34%", "42%"],
                    scale: [1, 0.82, 0.82, 0.72, 0.66],
                    opacity: [0, 0, 1, 1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, times: [0, 0.3, 0.48, 0.82, 1], ease }}
                >
                  <EnvelopePocketOverlay />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {stage !== "closed" && (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: [0, -4, 0] }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  opacity: { delay: 1.55, duration: 0.4, ease },
                  y: { delay: 1.55, duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                }}
                onClick={enterWebsite}
                className="absolute bottom-7 z-50 cursor-pointer border border-[#d6ad63] bg-[#11294d] px-5 py-2.5 font-heading text-[10px] tracking-[0.24em] text-white uppercase shadow-[0_10px_28px_rgba(17,41,77,0.3)] hover:bg-[#1d3b68] sm:bottom-10 sm:px-6 sm:py-3 sm:text-xs"
              >
                Enter the celebration
              </motion.button>
            )}
          </AnimatePresence>

          {stage === "closed" && (
            <motion.div
              className="absolute bottom-7 z-40 h-1 w-28 overflow-hidden rounded-full bg-[#11294d]/10 sm:bottom-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full origin-left bg-[#b8734f] will-change-transform"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4, ease: "linear" }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
