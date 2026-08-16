"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { WEDDING_CONFIG } from "@/config/wedding";
import type { InvitationSide } from "@/lib/invitationSide";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/motion";

interface WelcomeSectionProps {
  guestName?: string;
  side?: InvitationSide;
}

function LabelPill({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-full border border-royal-gold/35 bg-royal-gold/10 px-2.5 py-1 font-heading text-[9px] font-semibold tracking-[0.14em] text-royal-gold uppercase sm:px-3 sm:tracking-[0.22em] md:text-[10px]">
      {children}
    </span>
  );
}

function NameBlock({ names }: { names: readonly string[] }) {
  if (names.length >= 2) {
    return (
      <div className="mt-2 space-y-0.5">
        <p className="font-heading text-base !font-medium leading-snug text-navy-deep md:text-lg">
          {names[0]}
        </p>
        <p className="font-heading text-sm text-royal-gold">&</p>
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
}: {
  fromLabel: string;
  surname: string;
  parentsLabel: string;
  parents: readonly string[];
  eldersLabel: string;
  elders: readonly string[];
  accent: "groom" | "bride";
  variants: typeof slideFromLeft;
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
      <p className="font-heading text-[10px] font-semibold tracking-[0.28em] text-navy/55 uppercase">
        {fromLabel}
      </p>
      <h3 className="mt-2 font-heading text-2xl !font-medium text-navy-deep md:text-[1.7rem]">
        {surname}
      </h3>
      <div className="mx-auto mt-3 h-px w-12 bg-royal-gold/70" />

      <div className="mt-5">
        <LabelPill>{parentsLabel}</LabelPill>
        <NameBlock names={parents} />
      </div>

      <div className="mx-auto my-5 h-px w-full max-w-[9rem] bg-navy/10" />

      <div>
        <LabelPill>{eldersLabel}</LabelPill>
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
  const { blessing, families, invitation } = WEDDING_CONFIG;
  const invitingIsGroom = side === "groom";

  const left = invitingIsGroom
    ? {
        surname: families.groom.surname,
        parentsLabel: "Parents of the groom",
        parents: invitation.groomParents,
        eldersLabel: "Grandparents of the groom",
        elders: invitation.groomElders,
        fromLabel: "From the family of",
        accent: "groom" as const,
      }
    : {
        surname: families.bride.surname,
        parentsLabel: "Parents of the bride",
        parents: invitation.brideParents,
        eldersLabel: "Grandparents of the bride",
        elders: invitation.brideGrandparents,
        fromLabel: "From the family of",
        accent: "bride" as const,
      };

  const right = invitingIsGroom
    ? {
        surname: families.bride.surname,
        parentsLabel: "Parents of the bride",
        parents: invitation.brideParents,
        eldersLabel: "Grandparents of the bride",
        elders: invitation.brideGrandparents,
        fromLabel: "& the family of",
        accent: "bride" as const,
      }
    : {
        surname: families.groom.surname,
        parentsLabel: "Parents of the groom",
        parents: invitation.groomParents,
        eldersLabel: "Grandparents of the groom",
        elders: invitation.groomElders,
        fromLabel: "& the family of",
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
              Dear{" "}
              <span className="font-semibold text-royal-gold">{guestName}</span>,
              you are cordially invited
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
            {blessing.english}
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
            />
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-9 font-heading text-base font-medium tracking-wide text-navy/85 md:text-lg"
          >
            request the honour of your presence at the wedding of their children
          </motion.p>
        </div>
      </div>
    </SectionWrapper>
  );
}
