"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import Button from "@/components/ui/Button";
import { WEDDING_CONFIG, type WeddingEvent } from "@/config/wedding";
import { getMapEmbedUrl } from "@/lib/qr";
import { fadeUp, gentleSpring, snappySpring } from "@/lib/motion";

const EVENTS = WEDDING_CONFIG.events;

const CARD_ACCENTS: Record<string, string> = {
  mehndi: "from-[#eef4ef] via-ivory to-[#dce8dd]",
  haldi: "from-[#faf3e8] via-ivory to-[#f0e2c8]",
  cocktail: "from-[#faf0ed] via-ivory to-[#f2ddd8]",
  wedding: "from-[#f5ecec] via-ivory to-[#ecd5cc]",
  reception: "from-blush via-ivory to-[#f5e6c8]",
};

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

type DeckSpread = { xGap: number; rotate: number; yArc: number };

function getDeckSpread(width: number): DeckSpread {
  if (width < 640) return { xGap: 46, rotate: 11, yArc: 12 };
  if (width < 1024) return { xGap: 68, rotate: 13, yArc: 14 };
  return { xGap: 92, rotate: 16, yArc: 16 };
}

function getCardTransform(index: number, selectedIndex: number, spread: DeckSpread) {
  const offset = index - selectedIndex;
  const isSelected = offset === 0;
  const distance = Math.abs(offset);

  return {
    rotate: offset * spread.rotate,
    x: offset * spread.xGap,
    y: isSelected ? -28 : distance * spread.yArc,
    scale: isSelected ? 1.12 : 0.96 - distance * 0.02,
    zIndex: isSelected ? 30 : 20 - distance,
    opacity: 1,
  };
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
      transition={snappySpring}
      className={`absolute left-1/2 top-1/2 h-[220px] w-[155px] -translate-x-1/2 -translate-y-1/2 cursor-pointer md:h-[260px] md:w-[185px] ${
        isSelected ? "shadow-2xl shadow-gold/25" : "shadow-lg shadow-maroon/10"
      }`}
      style={{ transformOrigin: "center bottom" }}
      aria-pressed={isSelected}
      aria-label={`${event.title} — ${formatShortDate(event.date)}`}
    >
      <div
        className={`paper-texture relative flex h-full w-full flex-col overflow-hidden rounded-xl border-2 border-gold bg-linear-to-br ${
          CARD_ACCENTS[event.id] ?? "from-blush to-ivory"
        } p-4 text-left shadow-[inset_0_0_0_1px_rgba(255,251,247,0.8)]`}
      >
        <div className="pointer-events-none absolute inset-2 rounded-lg border border-gold/40" />
        <div className="pointer-events-none absolute inset-4 rounded-md border border-gold/30" />

        <div className="relative z-10 flex items-start justify-between">
          <span className="text-xl md:text-2xl">{event.icon}</span>
          <span className="rotate-180 text-xl md:text-2xl">{event.icon}</span>
        </div>

        <div className="relative z-10 mt-auto flex flex-col items-center text-center">
          <p className="font-heading text-[10px] tracking-[0.35em] text-sage uppercase md:text-xs">
            Celebration
          </p>
          <h3 className="mt-2 font-heading text-base leading-tight text-maroon-dark md:text-lg">
            {event.title}
          </h3>
          <p className="mt-2 font-body text-sm text-gold">{formatShortDate(event.date)}</p>
          <p className="font-body text-xs text-maroon/65">{event.time}</p>
        </div>

        <div className="relative z-10 mt-3 flex justify-center">
          <span
            className={`rounded-full px-3 py-1 font-heading text-[9px] tracking-wider uppercase ${
              isSelected ? "bg-sage text-white" : "bg-ivory text-sage ring-1 ring-gold/40"
            }`}
          >
            {isSelected ? "Selected" : "Pick card"}
          </span>
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
      className="invite-border mt-10 overflow-hidden bg-ivory p-6 md:p-8"
    >
      <div className="flex flex-wrap items-start gap-4">
        <motion.span
          initial={{ rotate: -8, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={gentleSpring}
          className="text-4xl"
        >
          {event.icon}
        </motion.span>
        <div className="min-w-[200px] flex-1">
          <p className="font-heading text-xs tracking-[0.35em] text-sage uppercase">Event Details</p>
          <h3 className="mt-1 font-heading text-2xl text-maroon-dark md:text-3xl">{event.title}</h3>
          <p className="mt-2 font-body text-sm text-gold">{formatDate(event.date)}</p>
          <p className="font-body text-sm text-maroon/70">{event.time}</p>
          <p className="mt-4 font-body text-base leading-relaxed text-maroon/85">{event.description}</p>
          {event.dressCode && (
            <p className="mt-3 font-body text-sm italic text-maroon/60">
              Dress Code: {event.dressCode}
            </p>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mt-6 rounded-lg border border-gold/40 bg-blush p-5 md:p-6"
      >
        <p className="font-heading text-xs tracking-[0.35em] text-sage uppercase">Venue & Location</p>
        <p className="mt-2 font-heading text-xl text-maroon">{event.venue}</p>
        <p className="mt-1 font-body text-sm text-maroon/75">{event.address}</p>
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
        className="mt-6 grid gap-6 md:grid-cols-2"
      >
        <div className="overflow-hidden rounded-sm border border-gold/30 shadow-sm">
          <iframe
            src={getMapEmbedUrl(event.mapUrl)}
            width="100%"
            height="220"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map for ${event.title}`}
          />
        </div>

        <div className="flex flex-col items-center justify-center rounded-sm border border-gold/30 bg-ivory p-6">
          <p className="mb-4 font-heading text-xs tracking-wider text-sage uppercase">
            Scan for Directions
          </p>
          <QRCodeSVG
            value={event.mapUrl}
            size={150}
            bgColor="#FFFBF7"
            fgColor="#3D2B2B"
            level="M"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function EventCardDeck() {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [userPicked, setUserPicked] = useState(false);
  const [spread, setSpread] = useState<DeckSpread>({ xGap: 92, rotate: 16, yArc: 16 });

  useEffect(() => {
    const updateSpread = () => setSpread(getDeckSpread(window.innerWidth));
    updateSpread();
    window.addEventListener("resize", updateSpread);
    return () => window.removeEventListener("resize", updateSpread);
  }, []);

  useEffect(() => {
    if (userPicked) return;

    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % EVENTS.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [userPicked]);

  const selectCard = (index: number) => {
    setUserPicked(true);
    setSelectedIndex(index);
  };

  const goPrev = () => {
    setUserPicked(true);
    setSelectedIndex((prev) => (prev - 1 + EVENTS.length) % EVENTS.length);
  };

  const goNext = () => {
    setUserPicked(true);
    setSelectedIndex((prev) => (prev + 1) % EVENTS.length);
  };

  const selectedEvent = EVENTS[selectedIndex];

  return (
    <div className="mt-12">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center font-body text-sm text-maroon/60 md:text-base"
      >
        Tap a card to reveal venue, map &amp; directions
      </motion.p>

      <div className="relative mx-auto mt-8 max-w-6xl overflow-visible px-2">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="card-deck-perspective relative mx-auto h-[320px] w-full overflow-visible md:h-[400px]"
        >
          {EVENTS.map((event, index) => (
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

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-white/80 font-heading text-lg text-sage transition-colors hover:border-sage hover:bg-sage hover:text-white cursor-pointer"
            aria-label="Previous event"
          >
            ‹
          </button>

          <div className="flex gap-2">
            {EVENTS.map((event, index) => (
              <button
                key={event.id}
                type="button"
                onClick={() => selectCard(index)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  index === selectedIndex ? "w-8 bg-sage" : "w-2.5 bg-gold/40 hover:bg-gold/70"
                }`}
                aria-label={`Select ${event.title}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-white/80 font-heading text-lg text-sage transition-colors hover:border-sage hover:bg-sage hover:text-white cursor-pointer"
            aria-label="Next event"
          >
            ›
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <EventDetailReveal key={selectedEvent.id} event={selectedEvent} />
      </AnimatePresence>
    </div>
  );
}
