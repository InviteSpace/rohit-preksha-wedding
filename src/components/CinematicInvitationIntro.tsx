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
  const isHi = language === "hi";

  return (
    <div className="absolute inset-0 isolate overflow-hidden border border-[#d6ad63]/80 bg-[#11294d] text-center text-white shadow-[0_22px_55px_rgba(17,41,77,0.4)] backface-hidden">
      <InvitationFlorals className="pointer-events-none absolute -left-5 -top-6 z-0 w-[24%] opacity-70 [transform:translateZ(0)] md:-left-7 md:-top-9 md:w-[26%] md:opacity-80 lg:-left-8 lg:-top-10 lg:w-[28%]" />
      <InvitationFlorals className="pointer-events-none absolute -bottom-6 -right-5 z-0 w-[26%] opacity-70 [transform:translateZ(0)_rotate(180deg)] md:-bottom-9 md:-right-7 md:w-[28%] md:opacity-80 lg:-bottom-10 lg:-right-8 lg:w-[30%]" />
      <div className="pointer-events-none absolute inset-2.5 z-0 border border-[#d6ad63]/45 md:inset-3.5 lg:inset-4" />

      <motion.div
        initial={false}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: contentVisible ? 0.55 : 0.2, ease, delay: contentVisible ? 0.12 : 0 }}
        className={`relative z-20 flex h-full flex-col items-center justify-center overflow-y-auto text-center [transform:translateZ(1px)] md:overflow-hidden ${
          isHi
            ? "gap-1 px-3.5 py-3.5 md:gap-1 md:px-8 md:py-5 lg:gap-1.5 lg:px-14 lg:py-8"
            : "gap-2 px-5 py-5 md:gap-1 md:px-12 md:py-8 lg:gap-0 lg:px-16 lg:py-10"
        }`}
        aria-hidden={!contentVisible}
      >
        <div className="flex w-full flex-col items-center">
          <div
            className={
              isHi
                ? "flex w-full flex-col items-center gap-0.5 md:gap-1"
                : "flex flex-wrap items-center justify-center gap-x-2 gap-y-0 md:gap-x-3 lg:gap-x-5"
            }
          >
            <h2
              className={
                isHi
                  ? "font-invite text-[15px] italic leading-tight tracking-normal text-white md:text-[22px] lg:text-[32px]"
                  : "font-script text-[clamp(22px,7vw,36px)] leading-none tracking-normal text-white normal-case md:text-[clamp(28px,5vw,44px)] lg:text-[clamp(36px,4.5vw,58px)]"
              }
            >
              {content.primaryName}
            </h2>
            <p
              className={
                isHi
                  ? "font-invite max-w-[96%] text-[11px] italic leading-tight tracking-normal text-[#e3bd72] md:text-[14px] lg:text-[18px]"
                  : "font-script text-[clamp(14px,4.5vw,22px)] leading-none tracking-normal text-[#e3bd72] normal-case md:text-[clamp(18px,3.5vw,26px)] lg:text-[clamp(22px,3vw,30px)]"
              }
            >
              {content.unionLine}
            </p>
            <h2
              className={
                isHi
                  ? "font-invite text-[15px] italic leading-tight tracking-normal text-white md:text-[22px] lg:text-[32px]"
                  : "font-script text-[clamp(22px,7vw,36px)] leading-none tracking-normal text-white normal-case md:text-[clamp(28px,5vw,44px)] lg:text-[clamp(36px,4.5vw,58px)]"
              }
            >
              {content.secondaryName}
            </h2>
            {content.partnerConnector && (
              <p
                className={
                  isHi
                    ? "font-invite text-[9px] font-semibold leading-tight text-white/90 md:text-[11px] lg:text-sm"
                    : "basis-full font-invite text-[9px] font-semibold text-white/90 md:basis-auto md:text-xs lg:text-sm"
                }
              >
                {content.partnerConnector}
              </p>
            )}
          </div>

          <div
            className={`bg-[#d6ad63]/65 ${
              isHi
                ? "my-1.5 h-px w-9 md:my-2 md:w-11 lg:my-3 lg:w-14"
                : "my-2.5 h-px w-10 md:my-3 md:w-12 lg:my-3.5 lg:w-14"
            }`}
          />

          <div
            className={
              isHi
                ? "grid w-full max-w-[98%] grid-cols-2 gap-x-2 md:max-w-[94%] md:gap-x-5 lg:max-w-[88%] lg:gap-x-8"
                : "grid w-full max-w-[96%] grid-cols-2 gap-x-3 md:max-w-[90%] md:gap-x-6 lg:max-w-[88%] lg:gap-x-8"
            }
          >
            <div className="min-w-0 text-center">
              <p
                className={`font-invite font-medium leading-tight text-[#e3bd72] ${
                  isHi
                    ? "text-[8px] md:text-[10px] lg:text-xs"
                    : "text-[9px] md:text-[11px] lg:text-sm"
                }`}
              >
                {content.familyIntroduction}
              </p>
              <p
                className={`font-invite font-semibold text-white ${
                  isHi
                    ? "mt-0.5 text-[9px] leading-snug md:text-[11px] lg:text-[13px]"
                    : "mt-0.5 text-[10px] leading-snug md:text-xs lg:text-sm"
                }`}
              >
                {content.parents[0]}
              </p>
              <p
                className={`font-invite font-semibold leading-none text-[#e3bd72] ${
                  isHi ? "text-[8px] md:text-[10px]" : "text-[9px] md:text-[11px] lg:text-sm"
                }`}
              >
                {isHi ? "एवं" : "&"}
              </p>
              <p
                className={`font-invite font-semibold text-white ${
                  isHi
                    ? "text-[9px] leading-snug md:text-[11px] lg:text-[13px]"
                    : "text-[10px] leading-snug md:text-xs lg:text-sm"
                }`}
              >
                {content.parents[1]}
              </p>
            </div>
            <div className="min-w-0 text-center">
              <p
                className={`font-invite font-medium leading-tight text-[#e3bd72] ${
                  isHi
                    ? "text-[8px] md:text-[10px] lg:text-xs"
                    : "text-[9px] md:text-[11px] lg:text-sm"
                }`}
              >
                {content.grandparentsIntroduction}
              </p>
              <p
                className={`font-invite font-semibold text-white ${
                  isHi
                    ? "mt-0.5 text-[9px] leading-snug md:text-[11px] lg:text-[13px]"
                    : "mt-0.5 text-[10px] leading-snug md:text-xs lg:text-sm"
                }`}
              >
                {content.grandparents[0]}
              </p>
              <p
                className={`font-invite font-semibold leading-none text-[#e3bd72] ${
                  isHi ? "text-[8px] md:text-[10px]" : "text-[9px] md:text-[11px] lg:text-sm"
                }`}
              >
                {isHi ? "एवं" : "&"}
              </p>
              <p
                className={`font-invite font-semibold text-white ${
                  isHi
                    ? "text-[9px] leading-snug md:text-[11px] lg:text-[13px]"
                    : "text-[10px] leading-snug md:text-xs lg:text-sm"
                }`}
              >
                {content.grandparents[1]}
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center">
          <div
            className={`bg-[#d6ad63]/65 ${
              isHi
                ? "mb-1.5 h-px w-9 md:my-2 md:w-11 lg:my-3 lg:w-14"
                : "mb-2.5 h-px w-10 md:my-3 md:w-12 lg:mb-0 lg:w-14"
            }`}
          />
          <p
            className={`font-invite font-semibold text-white ${
              isHi
                ? "text-[9px] leading-tight tracking-normal md:text-[11px] lg:text-sm"
                : "text-[9px] tracking-[0.14em] uppercase md:text-xs lg:text-base"
            }`}
          >
            {content.weekday}
          </p>
          <p
            className={`font-invite font-semibold text-[#e3bd72] ${
              isHi
                ? "text-[11px] leading-tight md:text-sm lg:text-lg"
                : "text-xs md:text-sm lg:text-lg"
            }`}
          >
            {content.date}
          </p>
          <p
            className={`font-invite font-semibold text-white ${
              isHi
                ? "text-[10px] leading-tight md:text-xs lg:text-base"
                : "mt-0.5 text-[11px] md:text-sm lg:text-base"
            }`}
          >
            {content.venue}
          </p>
          <p
            className={`font-invite font-medium text-white/90 ${
              isHi
                ? "mt-1 max-w-[95%] text-[8px] leading-snug md:mt-1.5 md:max-w-[85%] md:text-[10px] lg:mt-2.5 lg:max-w-[75%] lg:text-sm"
                : "mt-2 max-w-[92%] text-[9px] leading-snug md:mt-2.5 md:max-w-[80%] md:text-xs lg:max-w-[72%] lg:text-sm"
            }`}
          >
            {content.closing}
          </p>
          <p
            className={`font-invite font-medium text-white/70 ${
              isHi
                ? "mt-1 text-[7px] leading-tight tracking-normal md:mt-1.5 md:text-[8px] lg:text-[10px]"
                : "mt-2 text-[7px] tracking-[0.18em] uppercase md:mt-2.5 md:text-[8px] lg:text-[9px]"
            }`}
          >
            {isHi ? "पलटने के लिए टैप करें" : "Tap to turn over"}
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
  const isHi = language === "hi";

  return (
    <div className="absolute inset-0 isolate overflow-hidden border border-[#d6ad63]/80 bg-[#11294d] text-center text-white shadow-[0_22px_55px_rgba(17,41,77,0.4)] transform-[rotateY(180deg)] backface-hidden">
      <InvitationFlorals className="pointer-events-none absolute -left-5 -top-6 z-0 w-[22%] opacity-70 [transform:translateZ(0)] md:w-[24%] lg:-left-8 lg:-top-10 lg:w-[26%]" />
      <InvitationFlorals className="pointer-events-none absolute -bottom-6 -right-5 z-0 w-[24%] opacity-70 [transform:translateZ(0)_rotate(180deg)] md:w-[26%] lg:-bottom-10 lg:-right-8 lg:w-[28%]" />
      <div className="pointer-events-none absolute inset-2.5 z-0 border border-[#d6ad63]/45 md:inset-3.5 lg:inset-4" />
      <motion.div
        initial={false}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: contentVisible ? 0.55 : 0.2, ease, delay: contentVisible ? 0.12 : 0 }}
        className={`relative z-20 flex h-full flex-col items-center justify-center overflow-y-auto [transform:translateZ(1px)] md:overflow-hidden ${
          isHi
            ? "gap-1.5 px-4 py-4 md:gap-2 md:px-10 md:py-6 lg:gap-3 lg:px-16 lg:py-8"
            : "gap-2 px-5 py-5 md:gap-2 md:px-12 md:py-7 lg:gap-0 lg:px-16 lg:py-8"
        }`}
        aria-hidden={!contentVisible}
      >
        <p
          className={`shrink-0 font-invite font-semibold italic leading-tight text-[#e3bd72] ${
            isHi
              ? "text-[18px] md:text-[28px] lg:text-[40px]"
              : "text-[20px] md:text-[32px] lg:text-[44px]"
          }`}
        >
          {content.warmTitle}
        </p>
        <div
          className={`shrink-0 bg-[#d6ad63]/65 ${
            isHi ? "my-1 h-px w-9 md:my-2.5 md:w-12 lg:my-4 lg:w-14" : "my-1.5 h-px w-10 md:my-3 md:w-12 lg:my-5 lg:w-14"
          }`}
        />
        <p
          className={`font-invite font-medium text-white ${
            isHi
              ? "max-w-[94%] text-[10px] leading-snug md:max-w-[84%] md:text-sm lg:max-w-[78%] lg:text-base"
              : "max-w-[92%] text-[11px] leading-relaxed md:max-w-[82%] md:text-sm lg:max-w-[78%] lg:text-lg"
          }`}
        >
          {content.warmMessage}
        </p>
        <p
          className={`font-invite font-medium text-white/90 ${
            isHi
              ? "mt-1.5 max-w-[94%] text-[9px] leading-snug md:mt-3 md:max-w-[84%] md:text-xs lg:mt-4 lg:max-w-[78%] lg:text-base"
              : "mt-2 max-w-[92%] text-[10px] leading-relaxed md:mt-4 md:max-w-[82%] md:text-sm lg:mt-5 lg:max-w-[78%] lg:text-base"
          }`}
        >
          {content.warmReceptionLine}
        </p>
        <p
          className={`shrink-0 font-invite font-semibold italic text-[#e3bd72] ${
            isHi
              ? "mt-2 text-[11px] md:mt-4 md:text-sm lg:mt-6 lg:text-base"
              : "mt-3 text-xs md:mt-5 md:text-sm lg:mt-7 lg:text-base"
          }`}
        >
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

  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);

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
          className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden bg-[#efede9] px-5 py-6 sm:p-8"
        >
          <div className="absolute inset-5 rounded-4xl bg-white/70 shadow-inner sm:inset-8" />

          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`absolute top-7 z-50 px-4 text-center font-heading text-[9px] text-[#11294d]/70 md:top-10 md:px-6 md:text-[11px] lg:top-11 lg:text-xs ${
              language === "hi"
                ? "tracking-normal normal-case leading-snug"
                : "tracking-[0.32em] uppercase"
            }`}
          >
            {stage === "closed"
              ? language === "hi"
                ? "टैप करें, स्वाइप करें, या प्रतीक्षा करें"
                : "Tap, swipe, or wait"
              : focused
                ? stage === "card-front"
                  ? language === "hi"
                    ? "निमंत्रण पलटने के लिए टैप करें"
                    : "Tap the invitation to turn it over"
                  : language === "hi"
                    ? "हमारे उत्सव के लिए एक स्नेह भरा संदेश"
                    : "A warm note for our celebration"
                : language === "hi"
                  ? "आपका निमंत्रण खुल रहा है"
                  : "Unwrapping your invitation"}
          </motion.p>

          <div
            className="lang-switch absolute top-12 right-1/2 z-60 flex h-9 w-[11.5rem] translate-x-1/2 items-center rounded-full border border-[#d6ad63]/70 bg-white/95 p-1 shadow-sm md:top-16 md:h-10 md:w-[13rem] lg:top-18"
            role="group"
            aria-label="Language"
          >
            <div className="relative grid h-full w-full grid-cols-2">
              <motion.span
                aria-hidden
                animate={{ left: language === "en" ? "0%" : "50%" }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="absolute inset-y-0 w-1/2 rounded-full bg-[#11294d] shadow-sm"
              />
              <button
                type="button"
                onClick={() => changeLanguage("en")}
                className={`relative z-10 flex h-full cursor-pointer items-center justify-center rounded-full px-2 transition-colors ${
                  language === "en" ? "text-white" : "text-[#11294d]/65"
                }`}
                aria-pressed={language === "en"}
              >
                <span
                  className="lang-switch-label font-heading text-[10px] tracking-[0.08em] md:text-[11px]"
                  data-script="en"
                >
                  English
                </span>
              </button>
              <button
                type="button"
                onClick={() => changeLanguage("hi")}
                className={`relative z-10 flex h-full cursor-pointer items-center justify-center rounded-full px-2 transition-colors ${
                  language === "hi" ? "text-white" : "text-[#11294d]/65"
                }`}
                aria-pressed={language === "hi"}
              >
                <span
                  className={`lang-switch-label font-heading ${language === "hi" ? "mt-1" : ""} text-[10px] md:text-[11px]`}                  data-script="hi"
                >
                  हिन्दी
                </span>
              </button>
            </div>
          </div>

          <div
            className={`relative ${
              focused
                ? "mt-2 h-[calc(100dvh-12.5rem)] w-[min(88vw,360px)] max-h-[560px] md:mt-0 md:h-auto md:max-h-none md:aspect-[1.35/1] md:w-[min(90vw,720px)] lg:aspect-[1.3/1] lg:w-[min(94vw,1040px,calc(78vh*1.3))]"
                : "aspect-[1.08/1] w-[min(92vw,420px)] md:aspect-[1.25/1] md:w-[min(90vw,680px)] lg:aspect-[1.3/1] lg:w-[min(94vw,1040px,calc(78vh*1.3))]"
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
                      ? "inset-0 aspect-auto h-full w-full md:left-[8%] md:top-[18%] md:right-auto md:bottom-auto md:aspect-[1.55/1] md:h-auto md:w-[84%] lg:left-[10%] lg:top-[23%] lg:w-[80%]"
                      : "left-[19%] top-[8%] aspect-4/5 w-[62%] [--card-rise-y:-52%] [--card-tuck-x:0%] [--card-tuck-y:0%] md:left-[12%] md:top-[20%] md:aspect-[1.55/1] md:w-[76%] md:[--card-rise-y:-48%] lg:left-[10%] lg:top-[23%] lg:w-[80%]"
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
                className={`absolute bottom-6 z-50 cursor-pointer border border-[#d6ad63] bg-[#11294d] px-4 py-2 font-heading text-[10px] text-white shadow-[0_10px_28px_rgba(17,41,77,0.3)] hover:bg-[#1d3b68] md:bottom-8 md:px-5 md:py-2.5 md:text-[11px] lg:bottom-10 lg:px-6 lg:py-3 lg:text-xs ${
                  language === "hi"
                    ? "tracking-normal normal-case"
                    : "tracking-[0.24em] uppercase"
                }`}
              >
                {language === "hi" ? "उत्सव में प्रवेश करें" : "Enter the celebration"}
              </motion.button>
            )}
          </AnimatePresence>

          {stage === "closed" && (
            <motion.div
              className="absolute bottom-6 z-40 h-1 w-28 overflow-hidden rounded-full bg-[#11294d]/10 md:bottom-8 lg:bottom-10"
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
