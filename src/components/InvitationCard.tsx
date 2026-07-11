"use client";

import { motion } from "framer-motion";
import FloralCorner from "@/components/FloralCorner";
import { WEDDING_CONFIG } from "@/config/wedding";
import { staggerContainer, staggerItem } from "@/lib/motion";

interface InvitationCardProps {
  expanded?: boolean;
  compact?: boolean;
  animateText?: boolean;
  className?: string;
}

export default function InvitationCard({
  expanded = false,
  compact = false,
  animateText = false,
  className = "",
}: InvitationCardProps) {
  const { groom, bride } = WEDDING_CONFIG.couple;
  const weddingDate = WEDDING_CONFIG.weddingDate.toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const Wrapper = animateText ? motion.div : "div";
  const Item = animateText ? motion.p : "p";
  const ItemH = animateText ? motion.h2 : "h2";
  const ItemDiv = animateText ? motion.div : "div";

  const wrapperProps = animateText
    ? {
        variants: staggerContainer,
        initial: "hidden" as const,
        animate: "visible" as const,
      }
    : {};

  const itemProps = animateText ? { variants: staggerItem } : {};

  return (
    <div
      className={`paper-texture invite-border relative overflow-hidden bg-ivory ${
        expanded
          ? "w-full max-w-md p-8 md:max-w-lg md:p-10"
          : compact
            ? "aspect-[4/5] h-full w-full p-4 md:p-5"
            : "h-full w-full p-5 md:p-6"
      } ${className}`}
    >
      <FloralCorner className="absolute left-2 top-2 opacity-80" />
      <FloralCorner className="absolute right-2 top-2 opacity-80" flip="x" />
      <FloralCorner className="absolute bottom-2 left-2 opacity-80" flip="y" />
      <FloralCorner className="absolute bottom-2 right-2 opacity-80" flip="both" />

      <Wrapper
        {...wrapperProps}
        className="relative z-10 flex h-full flex-col items-center justify-center text-center"
      >
        <Item
          {...itemProps}
          className="font-heading text-[10px] tracking-[0.45em] text-gold uppercase md:text-xs"
        >
          Wedding Invitation
        </Item>

        <ItemDiv {...itemProps} className="my-3 h-px w-20 bg-gold/60 md:my-4 md:w-28" />

        <ItemH
          {...itemProps}
          className={`font-heading text-maroon-dark gold-glow ${
            expanded ? "text-3xl md:text-4xl" : compact ? "text-lg md:text-xl" : "text-xl md:text-2xl"
          }`}
        >
          {groom.name}
          <span className="mx-2 text-rose font-light">&</span>
          {bride.name}
        </ItemH>

        <ItemDiv {...itemProps} className="my-3 h-px w-16 bg-gold/40 md:my-4" />

        <Item
          {...itemProps}
          className={`font-body italic text-maroon/70 ${
            expanded ? "text-base md:text-lg" : compact ? "text-[10px] md:text-xs" : "text-xs md:text-sm"
          }`}
        >
          Together with their families
        </Item>

        <Item
          {...itemProps}
          className={`mt-3 font-heading tracking-wide text-sage ${
            expanded ? "text-sm md:text-base" : "text-[10px] md:text-xs"
          }`}
        >
          {weddingDate}
        </Item>

        {expanded && (
          <Item
            {...itemProps}
            className="mt-4 font-heading text-lg text-rose md:text-xl"
          >
            {WEDDING_CONFIG.blessing.hindi}
          </Item>
        )}
      </Wrapper>
    </div>
  );
}
