"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { WEDDING_CONFIG } from "@/config/wedding";
import type { InvitationSide } from "@/lib/invitationSide";
import { useLanguage } from "@/lib/LanguageContext";
import { getUiCopy } from "@/lib/uiCopy";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/motion";

interface WelcomeSectionProps {
  guestName?: string;
  side?: InvitationSide;
}

function LabelPill({
  children,
  isHindi,
}: {
  children: string;
  isHindi: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border border-royal-gold/35 bg-royal-gold/10 px-2.5 py-1.5 font-heading font-semibold text-royal-gold sm:px-3 ${
        isHindi
          ? "hi-eyebrow tracking-normal normal-case text-[14px] leading-snug md:text-[15px]"
          : "text-[9px] leading-none tracking-[0.14em] uppercase sm:tracking-[0.22em] md:text-[10px]"
      }`}
    >
      {children}
    </span>
  );
}

function NameBlock({ names, ampersand }: { names: readonly string[]; ampersand: string }) {
  if (names.length >= 2) {
    return (
      <div className="mt-2 space-y-0.5">
        <p className="font-heading text-base !font-medium leading-snug text-navy-deep md:text-lg">
          {names[0]}
        </p>
        <p className="font-heading text-sm text-royal-gold">{ampersand}</p>
        <p className="font-heading text-base !font-medium leading-snug text-navy-deep md:text-lg">
          {names[1]}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-2 space-y-1">
      {names.map((name) => (
        <p
          key={name}
          className="font-heading text-base !font-medium leading-snug text-navy-deep md:text-lg"
        >
          {name}
        </p>
      ))}
    </div>
  );
}

function FamilyPanel({
  fromLabel,
  surname,
  parentsLabel,
  parents,
  eldersLabel,
  elders,
  accent,
  variants,
  ampersand,
  isHindi,
}: {
  fromLabel: string;
  surname: string;
  parentsLabel: string;
  parents: readonly string[];
  eldersLabel: string;
  elders: readonly string[];
  accent: "groom" | "bride";
  variants: typeof slideFromLeft;
  ampersand: string;
  isHindi: boolean;
}) {
  const shell =
    accent === "groom"
      ? "border-navy/10 bg-navy/[0.03]"
      : "border-royal-gold/25 bg-royal-gold/[0.06]";

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`rounded-3xl border px-4 py-5 text-center shadow-[0_12px_40px_rgba(17,41,77,0.06)] backdrop-blur-sm sm:px-5 sm:py-6 md:px-6 md:py-7 ${shell}`}
    >
      <p
        className={`font-heading font-semibold text-navy/55 ${
          isHindi
            ? "hi-eyebrow tracking-normal normal-case text-[15px] leading-snug"
            : "text-[10px] leading-none tracking-[0.28em] uppercase"
        }`}
      >
        {fromLabel}
      </p>
      <h3 className="mt-2 font-heading text-2xl !font-medium text-navy-deep md:text-[1.7rem]">
        {surname}
      </h3>
      <div className="mx-auto mt-3 h-px w-12 bg-royal-gold/70" />

      <div className="mt-5">
        <LabelPill isHindi={isHindi}>{parentsLabel}</LabelPill>
        <NameBlock names={parents} ampersand={ampersand} />
      </div>

      <div className="mx-auto my-5 h-px w-full max-w-[9rem] bg-navy/10" />

      <div>
        <LabelPill isHindi={isHindi}>{eldersLabel}</LabelPill>
        <div className="mt-2 space-y-1">
          {elders.map((name) => (
            <p
              key={name}
              className="font-heading text-sm font-medium leading-snug text-navy/75 md:text-[0.95rem]"
            >
              {name}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function WelcomeSection({
  guestName,
  side = "groom",
}: WelcomeSectionProps) {
  const { language } = useLanguage();
  const t = getUiCopy(language);
  const { blessing, invitation } = WEDDING_CONFIG;
  const hi = invitation.hindi;
  const invitingIsGroom = side === "groom";
  const ampersand = language === "hi" ? "एवं" : "&";

  const groomParents = language === "hi" ? hi.groomParents : invitation.groomParents;
  const groomElders = language === "hi" ? hi.groomElders : invitation.groomElders;
  const brideParents = language === "hi" ? hi.brideParents : invitation.brideParents;
  const brideElders =
    language === "hi" ? hi.brideGrandparents : invitation.brideGrandparents;

  const left = invitingIsGroom
    ? {
        surname: t.mauryaFamily,
        parentsLabel: t.parentsOfGroom,
        parents: groomParents,
        eldersLabel: t.grandparentsOfGroom,
        elders: groomElders,
        fromLabel: t.fromFamilyOf,
        accent: "groom" as const,
      }
    : {
        surname: t.singhFamily,
        parentsLabel: t.parentsOfBride,
        parents: brideParents,
        eldersLabel: t.grandparentsOfBride,
        elders: brideElders,
        fromLabel: t.fromFamilyOf,
        accent: "bride" as const,
      };

  const right = invitingIsGroom
    ? {
        surname: t.singhFamily,
        parentsLabel: t.parentsOfBride,
        parents: brideParents,
        eldersLabel: t.grandparentsOfBride,
        elders: brideElders,
        fromLabel: t.andFamilyOf,
        accent: "bride" as const,
      }
    : {
        surname: t.mauryaFamily,
        parentsLabel: t.parentsOfGroom,
        parents: groomParents,
        eldersLabel: t.grandparentsOfGroom,
        elders: groomElders,
        fromLabel: t.andFamilyOf,
        accent: "groom" as const,
      };

  return (
    <SectionWrapper id="welcome">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-navy/10 bg-white/75 px-4 py-7 shadow-[0_24px_60px_rgba(17,41,77,0.08)] backdrop-blur-xl sm:rounded-[2rem] sm:px-8 sm:py-10 md:px-12 md:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-royal-gold/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-navy/5 blur-3xl"
        />

        <div className="relative z-10 text-center">
          {guestName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 font-heading text-lg font-medium text-navy"
            >
              {t.dearGuest}{" "}
              <span className="font-semibold text-royal-gold">{guestName}</span>,{" "}
              {t.cordiallyInvited}
            </motion.p>
          )}

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-heading text-3xl !font-medium text-royal-gold md:text-5xl"
          >
            {blessing.hindi}
          </motion.p>

          <div className="mx-auto my-5 h-px w-40 bg-linear-to-r from-transparent via-royal-gold to-transparent" />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-2xl font-heading text-base font-medium leading-relaxed text-navy/80 md:text-lg"
          >
            {t.blessingEnglish}
          </motion.p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            <FamilyPanel
              fromLabel={left.fromLabel}
              surname={left.surname}
              parentsLabel={left.parentsLabel}
              parents={left.parents}
              eldersLabel={left.eldersLabel}
              elders={left.elders}
              accent={left.accent}
              variants={slideFromLeft}
              ampersand={ampersand}
              isHindi={language === "hi"}
            />
            <FamilyPanel
              fromLabel={right.fromLabel}
              surname={right.surname}
              parentsLabel={right.parentsLabel}
              parents={right.parents}
              eldersLabel={right.eldersLabel}
              elders={right.elders}
              accent={right.accent}
              variants={slideFromRight}
              ampersand={ampersand}
              isHindi={language === "hi"}
            />
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-9 font-heading text-base font-medium tracking-wide text-navy/85 md:text-lg"
          >
            {t.honourPresence}
          </motion.p>
        </div>
      </div>
    </SectionWrapper>
  );
}
