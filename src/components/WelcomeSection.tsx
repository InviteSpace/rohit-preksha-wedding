"use client";

import { motion } from "framer-motion";
import GoldBorder from "@/components/ui/GoldBorder";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { WEDDING_CONFIG } from "@/config/wedding";
import type { InvitationSide } from "@/lib/invitationSide";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/motion";

interface WelcomeSectionProps {
  guestName?: string;
  side?: InvitationSide;
}

export default function WelcomeSection({
  guestName,
  side = "groom",
}: WelcomeSectionProps) {
  const { blessing, families, invitation } = WEDDING_CONFIG;
  const invitingIsGroom = side === "groom";

  const inviting = invitingIsGroom
    ? {
        surname: families.groom.surname,
        eldersLabel: "Grandparents of the groom",
        elders: invitation.groomElders,
        parentsLabel: "Parents of the groom",
        parents: invitation.groomParents,
        fromLabel: "From the family of",
      }
    : {
        surname: families.bride.surname,
        eldersLabel: "Grandparents of the bride",
        elders: invitation.brideGrandparents,
        parentsLabel: "Parents of the bride",
        parents: invitation.brideParents,
        fromLabel: "From the family of",
      };

  const partner = invitingIsGroom
    ? {
        surname: families.bride.surname,
        eldersLabel: "Grandparents of the bride",
        elders: invitation.brideGrandparents,
        parentsLabel: "Parents of the bride",
        parents: invitation.brideParents,
        fromLabel: "& the family of",
      }
    : {
        surname: families.groom.surname,
        eldersLabel: "Grandparents of the groom",
        elders: invitation.groomElders,
        parentsLabel: "Parents of the groom",
        parents: invitation.groomParents,
        fromLabel: "& the family of",
      };

  return (
    <SectionWrapper id="welcome">
      <GoldBorder className="invite-border bg-white/70">
        {guestName && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-center font-body text-lg text-maroon/90"
          >
            Dear <span className="font-semibold text-rose">{guestName}</span>, you are
            cordially invited
          </motion.p>
        )}

        <div className="text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-heading text-3xl text-rose gold-glow md:text-5xl"
          >
            {blessing.hindi}
          </motion.p>

          <div className="section-divider mx-auto my-6 w-48" />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-maroon/90 md:text-xl"
          >
            {blessing.english}
          </motion.p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="font-heading text-xs tracking-[0.3em] text-sage uppercase">
                {inviting.fromLabel}
              </p>
              <h3 className="mt-2 font-heading text-2xl text-maroon-dark">
                {inviting.surname}
              </h3>
              <p className="mt-3 font-heading text-xs tracking-wider text-gold uppercase">
                {inviting.eldersLabel}
              </p>
              <div className="mt-1 font-body text-sm leading-relaxed text-maroon/85">
                {inviting.elders.map((name) => (
                  <p key={name}>{name}</p>
                ))}
              </div>
              <p className="mt-3 font-heading text-xs tracking-wider text-gold uppercase">
                {inviting.parentsLabel}
              </p>
              <div className="mt-1 font-body leading-relaxed text-maroon/85">
                <p>{inviting.parents[0]}</p>
                <p className="text-gold">&</p>
                <p>{inviting.parents[1]}</p>
              </div>
            </motion.div>

            <motion.div
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="font-heading text-xs tracking-[0.3em] text-sage uppercase">
                {partner.fromLabel}
              </p>
              <h3 className="mt-2 font-heading text-2xl text-maroon-dark">
                {partner.surname}
              </h3>
              <p className="mt-3 font-heading text-xs tracking-wider text-gold uppercase">
                {partner.parentsLabel}
              </p>
              <div className="mt-1 font-body leading-relaxed text-maroon/85">
                <p>{partner.parents[0]}</p>
                <p className="text-gold">&</p>
                <p>{partner.parents[1]}</p>
              </div>
              <p className="mt-3 font-heading text-xs tracking-wider text-gold uppercase">
                {partner.eldersLabel}
              </p>
              <div className="mt-1 font-body text-sm leading-relaxed text-maroon/85">
                {partner.elders.map((name) => (
                  <p key={name}>{name}</p>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 font-heading text-lg tracking-wider text-gold md:text-xl"
          >
            request the honour of your presence at the wedding of their children
          </motion.p>
        </div>
      </GoldBorder>
    </SectionWrapper>
  );
}
