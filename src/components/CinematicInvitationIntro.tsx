"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import InvitationFlorals from "@/components/InvitationFlorals";
import { WEDDING_CONFIG } from "@/config/wedding";

type Stage =
  | "closed"
  | "opening"
  | "card-front"
  | "card-back"
  | "done";

const ease = [0.22, 1, 0.36, 1] as const;

interface CinematicInvitationIntroProps {
  onComplete: () => void;
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

type InvitationLanguage = "en" | "hi";

function InvitationFace({ language }: { language: InvitationLanguage }) {
  const { groom, bride } = WEDDING_CONFIG.couple;
  const invitation = WEDDING_CONFIG.invitation;
  const weekday = WEDDING_CONFIG.weddingDate.toLocaleDateString("en-IN", {
    weekday: "long",
  });
  const date = WEDDING_CONFIG.weddingDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const hindi = invitation.hindi;
  const content =
    language === "hi"
      ? {
          invocation: hindi.invocation,
          title: hindi.title,
          blessing: hindi.blessing,
          groomElders: hindi.groomElders,
          groomParents: hindi.groomParents,
          invitationLine: hindi.invitationLine,
          groomName: hindi.groomName,
          unionLine: hindi.unionLine,
          brideName: hindi.brideName,
          brideConnector: hindi.brideConnector,
          brideIntroduction: hindi.brideIntroduction,
          brideParents: hindi.brideParents,
          brideGrandparentsIntroduction: hindi.brideGrandparentsIntroduction,
          brideGrandparents: hindi.brideGrandparents,
          weekday: hindi.weekday,
          date: hindi.date,
          venue: hindi.venue,
          closing: hindi.closing,
        }
      : {
          invocation: invitation.invocation,
          title: invitation.title,
          blessing: invitation.blessing,
          groomElders: invitation.groomElders,
          groomParents: invitation.groomParents,
          invitationLine: invitation.invitationLine,
          groomName: groom.fullName,
          unionLine: "weds",
          brideName: bride.fullName,
          brideConnector: "",
          brideIntroduction: invitation.brideIntroduction,
          brideParents: invitation.brideParents,
          brideGrandparentsIntroduction: invitation.brideGrandparentsIntroduction,
          brideGrandparents: invitation.brideGrandparents,
          weekday,
          date,
          venue: invitation.venue,
          closing: invitation.closing,
        };

  return (
    <div className="absolute inset-0 overflow-hidden border border-[#d6ad63]/80 bg-[#11294d] text-center text-white shadow-[0_22px_55px_rgba(17,41,77,0.4)] backface-hidden">
      <InvitationFlorals className="absolute -left-5 -top-4 w-[44%]" />
      <InvitationFlorals className="absolute -bottom-5 -right-5 w-[46%] rotate-180" />
      <div className="absolute inset-3 border border-[#d6ad63]/45 sm:inset-4" />

      {/* Portrait mobile invitation */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-5 text-center sm:hidden">
        <h2 className="font-heading text-[clamp(12px,4vw,16px)] tracking-[0.08em] uppercase">
          {content.groomName}
        </h2>
        <p className="my-1 font-heading text-[7px] italic text-[#d6ad63]">{content.unionLine}</p>
        <h2 className="font-heading text-[clamp(12px,4vw,16px)] tracking-[0.08em] uppercase">
          {content.brideName}
        </h2>
        {content.brideConnector && (
          <p className="font-body text-[5.5px] text-white/65">{content.brideConnector}</p>
        )}

        <div className="my-3 h-px w-12 bg-[#d6ad63]/65" />
        <p className="font-body text-[6px] text-white/65">{content.brideIntroduction}</p>
        <p className="font-body text-[6.5px] leading-tight">
          {content.brideParents[0]} <span className="text-[#d6ad63]">&</span>{" "}
          {content.brideParents[1]}
        </p>
        <p className="mt-2 font-body text-[6px] text-white/65">
          {content.brideGrandparentsIntroduction}
        </p>
        <p className="font-body text-[6.5px] leading-tight">
          {content.brideGrandparents[0]} <span className="text-[#d6ad63]">&</span>{" "}
          {content.brideGrandparents[1]}
        </p>

        <div className="my-3 h-px w-12 bg-[#d6ad63]/65" />
        <p className="font-heading text-[7px] tracking-[0.16em] uppercase">{content.weekday}</p>
        <p className="font-heading text-[10px] text-[#d6ad63]">{content.date}</p>
        <p className="mt-1 font-heading text-[9px]">{content.venue}</p>
        <p className="mt-2 max-w-[82%] font-body text-[6px] leading-tight text-white/65">
          {content.closing}
        </p>
      </div>

      {/* Main invitation details on the landscape front */}
      <div className="relative z-10 hidden h-full flex-col items-center justify-center px-14 py-10 text-center sm:flex">
          <h2 className="font-heading text-xl tracking-wide uppercase md:text-2xl lg:text-3xl xl:text-4xl">{content.groomName}</h2>
          <p className="my-1 font-heading text-[9px] italic text-[#d6ad63] md:text-[10px] lg:text-xs xl:text-sm">{content.unionLine}</p>
          <h2 className="font-heading text-xl tracking-wide uppercase md:text-2xl lg:text-3xl xl:text-4xl">{content.brideName}</h2>
          {content.brideConnector && (
            <p className="font-body text-[8px] text-white/65 md:text-[10px] lg:text-xs">{content.brideConnector}</p>
          )}
          <p className="mt-2 font-body text-[8px] text-white/65 md:text-[10px] lg:text-xs">{content.brideIntroduction}</p>
          <p className="font-body text-[8px] md:text-[10px] lg:text-xs">
            {content.brideParents[0]} <span className="text-[#d6ad63]">&</span>{" "}
            {content.brideParents[1]}
          </p>
          <p className="mt-1 font-body text-[8px] text-white/65 md:text-[10px] lg:text-xs">
            {content.brideGrandparentsIntroduction}
          </p>
          <p className="font-body text-[8px] md:text-[10px] lg:text-xs">
            {content.brideGrandparents[0]} <span className="text-[#d6ad63]">&</span>{" "}
            {content.brideGrandparents[1]}
          </p>
          <div className="my-2 h-px w-12 bg-[#d6ad63]/65" />
          <p className="font-heading text-[9px] tracking-[0.18em] uppercase md:text-[11px] lg:text-sm">{content.weekday}</p>
          <p className="font-heading text-xs text-[#d6ad63] md:text-sm lg:text-base">{content.date}</p>
          <p className="font-heading text-[10px] md:text-xs lg:text-sm">{content.venue}</p>
          <p className="mt-2 max-w-[80%] font-body text-[8px] leading-snug text-white/65 md:text-[10px] lg:text-xs">
            {content.closing}
          </p>
      </div>

      <p className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 font-heading text-[7px] tracking-[0.22em] text-white/45 uppercase sm:block">
        Tap to turn over
      </p>
    </div>
  );
}

function ThankYouFace({ language }: { language: InvitationLanguage }) {
  const isHindi = language === "hi";
  const invitation = WEDDING_CONFIG.invitation;
  const family = isHindi
    ? {
        invocation: invitation.hindi.invocation,
        title: invitation.hindi.title,
        blessing: invitation.hindi.blessing,
        elders: invitation.hindi.groomElders,
        parents: invitation.hindi.groomParents,
        invitationLine: invitation.hindi.invitationLine,
      }
    : {
        invocation: invitation.invocation,
        title: invitation.title,
        blessing: invitation.blessing,
        elders: invitation.groomElders,
        parents: invitation.groomParents,
        invitationLine: invitation.invitationLine,
      };

  return (
    <div className="absolute inset-0 overflow-hidden border border-[#d6ad63]/80 bg-[#11294d] text-center text-white shadow-[0_22px_55px_rgba(17,41,77,0.4)] transform-[rotateY(180deg)] backface-hidden">
      {/* Match the front: flowers stay in opposite corners, clear of the message */}
      <InvitationFlorals className="absolute -left-5 -top-4 w-[38%] sm:w-[42%]" />
      <InvitationFlorals className="absolute -bottom-5 -right-5 w-[40%] rotate-180 sm:w-[44%]" />
      <div className="absolute inset-3 border border-[#d6ad63]/45 sm:inset-4" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 py-5">
        <p className="font-heading text-[7px] text-[#d6ad63] sm:text-[9px] md:text-[11px] lg:text-sm">{family.invocation}</p>
        <p className="mt-1 font-heading text-[9px] tracking-[0.22em] uppercase sm:text-xs md:text-sm lg:text-base">
          {family.title}
        </p>
        <p className="mt-1 max-w-[78%] font-body text-[6px] leading-tight text-white/75 sm:text-[9px] md:text-[11px] lg:text-sm">
          {family.blessing}
        </p>
        <div className="my-1.5 h-px w-10 bg-[#d6ad63]/65 sm:my-2" />
        <div className="font-body text-[5.5px] leading-tight text-white/70 sm:text-[8px] md:text-[10px] lg:text-xs">
          {family.elders.map((name) => (
            <p key={name}>{name}</p>
          ))}
        </div>
        <div className="mt-1 font-body text-[6px] leading-tight sm:text-[9px] md:text-[11px] lg:text-sm">
          <p>{family.parents[0]}</p>
          <p className="text-[#d6ad63]">&</p>
          <p>{family.parents[1]}</p>
        </div>
        <p className="mt-1 max-w-[78%] font-body text-[5.5px] leading-tight text-white/70 sm:mt-2 sm:text-[8px] md:text-[10px] lg:text-xs">
          {family.invitationLine}
        </p>

        {/* Thank-you section follows the moved family column */}
        <div className="my-2 h-px w-14 bg-[#d6ad63]/65" />
        <p className="font-heading text-[clamp(14px,3vw,34px)] italic">
          {isHindi ? "धन्यवाद" : "Thank you"}
        </p>
        <p className="mt-1 max-w-[64%] font-body text-[6px] leading-tight text-white/75 sm:max-w-[70%] sm:text-[9px] md:text-[11px] lg:text-sm">
          {isHindi
            ? WEDDING_CONFIG.invitation.hindi.closing
            : "Your presence, love and blessings will make our wedding celebration truly complete."}
        </p>
        <p className="mt-2 font-heading text-[7px] italic text-[#d6ad63] sm:text-[10px] md:text-xs lg:text-sm">
          {isHindi ? "सप्रेम, रोहित एवं प्रेक्षा" : "With love, Rohit & Preksha"}
        </p>
      </div>
    </div>
  );
}

function DoubleSidedCard({
  flipped,
  onFlip,
  language,
}: {
  flipped: boolean;
  onFlip: () => void;
  language: InvitationLanguage;
}) {
  return (
    <motion.button
      type="button"
      onClick={onFlip}
      className="relative h-full w-full cursor-pointer perspective-[1400px]"
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      aria-label={flipped ? "Show invitation" : "Show thank-you message"}
    >
      <motion.div
        className="relative h-full w-full transform-3d will-change-transform"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.85, ease }}
      >
        <InvitationFace language={language} />
        <ThankYouFace language={language} />
      </motion.div>
    </motion.button>
  );
}

export default function CinematicInvitationIntro({
  onComplete,
}: CinematicInvitationIntroProps) {
  const [stage, setStage] = useState<Stage>("closed");
  const [language, setLanguage] = useState<InvitationLanguage>("en");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasOpened = useRef(false);

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
          className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-[#efede9] p-4"
        >
          <div className="absolute inset-4 rounded-4xl bg-white/70 shadow-inner sm:inset-8" />

          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-8 z-50 px-4 text-center font-heading text-[9px] tracking-[0.32em] text-[#11294d]/70 uppercase sm:top-11 sm:text-xs"
          >
            {stage === "closed"
              ? "Tap, swipe, or wait a moment"
              : focused
                ? stage === "card-front"
                  ? "Tap the invitation to turn it over"
                  : "A note from our hearts"
                : "Unwrapping your invitation"}
          </motion.p>

          <div className="absolute top-14 z-60 flex items-center rounded-full border border-[#d6ad63]/70 bg-white/90 p-1 shadow-sm sm:top-18">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`cursor-pointer rounded-full px-3 py-1 font-heading text-[9px] tracking-wider transition-colors sm:text-[10px] ${
                language === "en" ? "bg-[#11294d] text-white" : "text-[#11294d]/65"
              }`}
              aria-pressed={language === "en"}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`cursor-pointer rounded-full px-3 py-1 font-heading text-[10px] transition-colors sm:text-xs ${
                language === "hi" ? "bg-[#11294d] text-white" : "text-[#11294d]/65"
              }`}
              aria-pressed={language === "hi"}
            >
              हिन्दी
            </button>
          </div>

          <div className="relative aspect-[1.08/1] w-[min(92vw,620px)] sm:aspect-[1.3/1] sm:w-[min(94vw,1040px,calc(78vh*1.3))]">
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
                  className="absolute left-[19%] top-[8%] z-10 aspect-4/5 w-[62%] [--card-rise-y:-52%] [--card-tuck-x:0%] [--card-tuck-y:0%] will-change-transform sm:left-[10%] sm:top-[23%] sm:aspect-[1.55/1] sm:w-[80%] sm:[--card-rise-y:-48%]"
                  initial={{
                    x: "var(--card-tuck-x)",
                    y: "var(--card-tuck-y)",
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
                className="absolute bottom-7 z-50 cursor-pointer border border-[#d6ad63] bg-[#11294d] px-6 py-3 font-heading text-[10px] tracking-[0.24em] text-white uppercase shadow-[0_10px_28px_rgba(17,41,77,0.3)] hover:bg-[#1d3b68] sm:bottom-10 sm:text-xs"
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
