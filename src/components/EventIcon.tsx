"use client";

import {
  Flower2,
  Sun,
  Music2,
  Heart,
  PartyPopper,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const EVENT_ICONS: Record<string, LucideIcon> = {
  mehndi: Flower2,
  haldi: Sun,
  cocktail: Music2,
  wedding: Heart,
  reception: PartyPopper,
};

interface EventIconProps extends Omit<LucideProps, "ref"> {
  eventId: string;
}

export default function EventIcon({ eventId, className, ...props }: EventIconProps) {
  const Icon = EVENT_ICONS[eventId] ?? Heart;
  return <Icon className={className} strokeWidth={1.6} aria-hidden {...props} />;
}
