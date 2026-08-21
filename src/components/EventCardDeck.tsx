"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import EventIcon from "@/components/EventIcon";
import QrShareDownload from "@/components/QrShareDownload";
import { WEDDING_CONFIG, type WeddingEvent } from "@/config/wedding";
import { filterEvents } from "@/lib/inviteConfig";
import { getMapEmbedUrl } from "@/lib/qr";
import { fadeUp, gentleSpring } from "@/lib/motion";

const CARD_ACCENTS: Record<string, string> = {
  mehndi: "from-[#f4f7f4] via-white to-[#e8efe9]",
  haldi: "from-[#fbf7ef] via-white to-[#f3ead8]",
  cocktail: "from-[#faf4f2] via-white to-[#f0e4e0]",
  wedding: "from-[#f3f0f6] via-white to-[#e8e4ef]",
  reception: "from-[#f7f3ea] via-white to-[#efe6d4]",
};

const SHUFFLE_MS = 10000;

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatShortDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
}

type DeckSpread = {
  xGap: number;
  rotate: number;
  yArc: number;
  selectedScale: number;
  sideScale: number;
};

function getDeckSpread(width: number, eventCount = 4): DeckSpread {
  const cardW = width < 640 ? 142 : width < 1024 ? 165 : 195;
  const usableHalf = width * 0.44;
  // Spread for ±2 cards so neighbors stay visible; clamp to viewport
  const maxSteps = Math.min(Math.max(eventCount - 1, 1), 2);
  const computedGap = Math.floor((usableHalf - cardW * 0.42) / maxSteps);

  if (width < 640) {
    return {
      xGap: Math.max(46, Math.min(62, computedGap)),
      rotate: 15,
      yArc: 16,
      selectedScale: 1.06,
      sideScale: 0.92,
    };
  }
  if (width < 1024) {
    return {
      xGap: Math.max(60, Math.min(78, computedGap || 68)),
      rotate: 14,
      yArc: 14,
      selectedScale: 1.1,
      sideScale: 0.95,
    };
  }
  return {
    xGap: 92,
    rotate: 16,
    yArc: 16,
    selectedScale: 1.12,
    sideScale: 0.96,
  };
}

function getCardTransform(index: number, selectedIndex: number, spread: DeckSpread) {
  const offset = index - selectedIndex;
  const isSelected = offset === 0;
  const distance = Math.abs(offset);

  return {
    rotate: offset * spread.rotate,
    x: offset * spread.xGap,
    y: isSelected ? -24 : distance * spread.yArc,
    scale: isSelected
      ? spread.selectedScale
      : spread.sideScale - distance * 0.03,
    zIndex: isSelected ? 30 : 20 - distance,
    opacity: distance > 2 ? 0.72 : 1,
  };
}

function EventTabs({
  events,
  selectedIndex,
  onSelect,
}: {
  events: WeddingEvent[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Wedding events"
      className="-mx-1 flex max-w-3xl items-center gap-2 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-auto sm:flex-wrap sm:justify-center sm:overflow-visible"
    >
      {events.map((event, index) => {
        const active = index === selectedIndex;
        return (
          <button
            key={event.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(index)}
            className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-2 font-heading text-[11px] font-semibold tracking-wide transition-colors sm:gap-2 sm:px-3.5 sm:text-xs md:text-sm ${
              active
                ? "border-navy bg-navy text-white shadow-sm"
                : "border-navy/12 bg-white/80 text-navy/75 hover:border-navy/30 hover:text-navy"
            }`}
          >
            <EventIcon
              eventId={event.id}
              className={`size-3.5 md:size-4 ${active ? "text-royal-gold" : "text-royal-gold/80"}`}
            />
            <span>{event.title.replace(" Ceremony", "")}</span>
          </button>
        );
      })}
    </div>
  );
}

function PlayingCardFace({
  event,
  index,
  selectedIndex,
  spread,
  onSelect,
}: {
  event: WeddingEvent;
  index: number;
  selectedIndex: number;
  spread: DeckSpread;
  onSelect: (index: number) => void;
}) {
  const transform = getCardTransform(index, selectedIndex, spread);
  const isSelected = index === selectedIndex;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(index)}
      animate={{
        rotate: transform.rotate,
        x: transform.x,
        y: transform.y,
        scale: transform.scale,
        zIndex: transform.zIndex,
        opacity: transform.opacity,
      }}
      whileHover={!isSelected ? { y: transform.y - 12, scale: transform.scale + 0.04 } : { y: -38 }}
      whileTap={{ scale: transform.scale * 0.97 }}
      transition={gentleSpring}
      className={`absolute left-1/2 top-[46%] h-[220px] w-[142px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl sm:h-[250px] sm:w-[165px] md:h-[290px] md:w-[195px] ${
        isSelected ? "shadow-[0_18px_40px_rgba(17,41,77,0.22)]" : "shadow-[0_12px_28px_rgba(17,41,77,0.14)]"
      }`}
      style={{ transformOrigin: "center center" }}
      aria-pressed={isSelected}
      aria-label={`${event.title} — ${formatShortDate(event.date)}`}
    >
      <div
        className={`relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-linear-to-br ${
          CARD_ACCENTS[event.id] ?? "from-white to-[#f5f2ec]"
        } text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]`}
      >
        <div className="pointer-events-none absolute inset-[7px] rounded-[14px] border border-royal-gold/25 sm:inset-2.5 sm:rounded-xl md:inset-3" />

        <div className="relative z-10 flex h-full flex-col px-4 py-4 sm:px-4.5 sm:py-5 md:px-5 md:py-5">
          <div className="flex items-center justify-between">
            <EventIcon eventId={event.id} className="size-4 text-royal-gold sm:size-5 md:size-6" />
            <EventIcon
              eventId={event.id}
              className="size-4 rotate-180 text-royal-gold sm:size-5 md:size-6"
            />
          </div>

          <div className="mt-3 flex flex-1 flex-col items-center justify-center px-1 text-center sm:mt-4">
            <p className="font-heading text-[9px] font-semibold tracking-[0.28em] text-royal-gold uppercase sm:text-[10px] sm:tracking-[0.35em] md:text-xs">
              Celebration
            </p>
            <h3 className="mt-2 font-heading text-sm !font-medium leading-snug text-navy-deep sm:text-base md:text-lg">
              {event.title}
            </h3>
            <p className="mt-2 font-heading text-sm font-semibold text-royal-gold">
              {formatShortDate(event.date)}
            </p>
            <p className="mt-1 font-heading text-xs font-medium text-navy/70">{event.time}</p>
          </div>

          <div className="mt-3 flex justify-center sm:mt-4">
            <span
              className={`rounded-full px-3 py-1.5 font-heading text-[9px] font-semibold tracking-wider uppercase ${
                isSelected
                  ? "bg-navy text-white"
                  : "bg-white/80 text-navy/70 ring-1 ring-navy/10"
              }`}
            >
              {isSelected ? "Selected" : "Pick card"}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function EventDetailReveal({ event }: { event: WeddingEvent }) {
  return (
    <motion.div
      id={`location-${event.id}`}
      key={event.id}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.98 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white/85 shadow-[0_24px_60px_rgba(17,41,77,0.08)] backdrop-blur-xl"
    >
      <div className="px-5 pt-6 pb-5 sm:px-6 sm:pt-7 md:px-8 md:pt-8">
        <div className="flex items-start gap-3 sm:gap-4">
          <motion.span
            initial={{ rotate: -8, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={gentleSpring}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-white sm:h-14 sm:w-14"
          >
            <EventIcon eventId={event.id} className="size-6 sm:size-7" />
          </motion.span>

          <div className="min-w-0 flex-1 pt-0.5">
            <p className="font-heading text-[10px] font-semibold tracking-[0.28em] text-royal-gold uppercase sm:tracking-[0.35em]">
              Event Details
            </p>
            <h3 className="mt-1 font-heading text-xl !font-medium leading-snug text-navy-deep sm:text-2xl md:text-3xl">
              {event.title}
            </h3>
          </div>
        </div>

        <p className="mt-4 w-full font-heading text-sm font-semibold text-royal-gold">
          {formatDate(event.date)}
        </p>
        <p className="w-full font-heading text-sm font-medium text-navy/70">{event.time}</p>

        <p className="mt-5 w-full font-heading text-base font-medium leading-relaxed text-navy/80">
          {event.description}
        </p>
        {event.dressCode && (
          <p className="mt-3 w-full font-heading text-sm font-medium italic text-navy/70">
            Dress Code: {event.dressCode}
          </p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="w-full border-t border-navy/8 bg-navy/[0.03] px-5 py-5 sm:px-6 sm:py-6 md:px-8"
      >
        <p className="font-heading text-[10px] font-semibold tracking-[0.28em] text-royal-gold uppercase sm:tracking-[0.35em]">
          Venue & Location
        </p>
        <p className="mt-2 font-heading text-xl !font-medium text-navy-deep">{event.venue}</p>
        <p className="mt-1 w-full font-heading text-sm font-medium leading-relaxed break-words text-navy/75">
          {event.address}
        </p>
        <div className="mt-4">
          <a href={event.mapUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primary">Get Directions</Button>
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="grid w-full items-stretch gap-5 px-5 py-5 sm:px-6 sm:py-6 md:grid-cols-2 md:gap-6 md:px-8 md:pb-8"
      >
        <div className="h-full min-h-[240px] overflow-hidden rounded-2xl border border-navy/10 shadow-sm sm:min-h-[280px]">
          <iframe
            src={getMapEmbedUrl(event.mapUrl, `${event.venue}, ${event.address}`)}
            className="h-full min-h-[240px] w-full sm:min-h-[280px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map for ${event.title}`}
          />
        </div>

        <QrShareDownload
          value={event.mapUrl}
          title={`${event.title} — ${event.venue}`}
          filename={`${event.id}-directions-qr`}
        />
      </motion.div>
    </motion.div>
  );
}

export default function EventCardDeck({ eventIds }: { eventIds?: string[] }) {
  const events = filterEvents(WEDDING_CONFIG.events, eventIds);
  const weddingIndex = Math.max(
    0,
    events.findIndex((e) => e.id === "wedding"),
  );
  const [selectedIndex, setSelectedIndex] = useState(
    weddingIndex >= 0 ? weddingIndex : 0,
  );
  const [deckInView, setDeckInView] = useState(true);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [detailIndex, setDetailIndex] = useState(
    weddingIndex >= 0 ? weddingIndex : 0,
  );
  const [spread, setSpread] = useState<DeckSpread>(() =>
    getDeckSpread(typeof window !== "undefined" ? window.innerWidth : 1024, 4),
  );
  const deckRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateSpread = () => setSpread(getDeckSpread(window.innerWidth, events.length));
    updateSpread();
    window.addEventListener("resize", updateSpread);
    return () => window.removeEventListener("resize", updateSpread);
  }, [events.length]);

  useEffect(() => {
    setSelectedIndex((prev) =>
      events.length === 0 ? 0 : Math.min(prev, events.length - 1),
    );
  }, [events.length]);

  useEffect(() => {
    const deck = deckRef.current;
    const detail = detailRef.current;
    if (!deck || !detail) return;

    const updateViewMode = () => {
      const deckRect = deck.getBoundingClientRect();
      const detailRect = detail.getBoundingClientRect();
      const viewportH = window.innerHeight;

      const deckVisible =
        deckRect.top < viewportH * 0.7 && deckRect.bottom > viewportH * 0.2;
      const detailDominant =
        detailRect.top < viewportH * 0.45 && detailRect.bottom > viewportH * 0.35;

      setDeckInView(deckVisible && !detailDominant);
    };

    updateViewMode();
    window.addEventListener("scroll", updateViewMode, { passive: true });
    window.addEventListener("resize", updateViewMode);
    return () => {
      window.removeEventListener("scroll", updateViewMode);
      window.removeEventListener("resize", updateViewMode);
    };
  }, [selectedIndex, events.length]);

  useEffect(() => {
    if (!deckInView || events.length === 0) return;

    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % events.length);
    }, SHUFFLE_MS);

    return () => clearInterval(interval);
  }, [deckInView, events.length]);

  // Wait for the front-card pull animation to settle before showing details
  useEffect(() => {
    setDetailsVisible(false);
    const timer = window.setTimeout(() => {
      setDetailIndex(selectedIndex);
      setDetailsVisible(true);
    }, 520);
    return () => window.clearTimeout(timer);
  }, [selectedIndex]);

  const selectCard = (index: number) => {
    setSelectedIndex(index);
  };

  const goPrev = () => {
    if (events.length === 0) return;
    setSelectedIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goNext = () => {
    if (events.length === 0) return;
    setSelectedIndex((prev) => (prev + 1) % events.length);
  };

  const selectedEvent = events[selectedIndex];
  const detailEvent = events[detailIndex] ?? selectedEvent;

  if (events.length === 0 || !selectedEvent || !detailEvent) {
    return (
      <p className="mt-12 text-center font-heading font-medium text-navy/75">
        No events are included in this invitation.
      </p>
    );
  }

  return (
    <div className="mt-12">
      <div className="sticky top-16 z-40 mb-8 md:top-[4.5rem]">
        <div className="rounded-2xl border border-navy/10 bg-ivory/90 px-3 py-3 shadow-[0_10px_30px_rgba(17,41,77,0.08)] backdrop-blur-md md:px-4">
          <EventTabs
            events={events}
            selectedIndex={selectedIndex}
            onSelect={selectCard}
          />
        </div>
      </div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center font-heading text-sm font-medium text-navy/75 md:text-base"
      >
        Tap a card to reveal venue, map &amp; directions
      </motion.p>

      <div
        ref={deckRef}
        className="relative mx-auto mt-8 max-w-6xl overflow-visible px-2 pb-8"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="card-deck-perspective relative mx-auto h-[340px] w-full overflow-visible pt-6 pb-10 sm:h-[380px] sm:pb-10 md:h-[460px] md:pb-12"
        >
          {events.map((event, index) => (
            <PlayingCardFace
              key={event.id}
              event={event}
              index={index}
              selectedIndex={selectedIndex}
              spread={spread}
              onSelect={selectCard}
            />
          ))}
        </motion.div>

        <div className="mt-6 flex h-10 items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-navy/15 bg-white/90 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            aria-label="Previous event"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex h-10 items-center justify-center gap-2">
            {events.map((event, index) => (
              <button
                key={event.id}
                type="button"
                onClick={() => selectCard(index)}
                className={`block h-2.5 shrink-0 cursor-pointer rounded-full transition-[width,background-color] duration-200 ${
                  index === selectedIndex
                    ? "w-8 bg-navy"
                    : "w-2.5 bg-royal-gold/40 hover:bg-royal-gold/70"
                }`}
                aria-label={`Select ${event.title}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-navy/15 bg-white/90 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            aria-label="Next event"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div ref={detailRef} className="min-h-[12rem]">
        <AnimatePresence mode="wait">
          {detailsVisible ? (
            <EventDetailReveal key={detailEvent.id} event={detailEvent} />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
