"use client";

import { motion } from "framer-motion";
import { WeddingEvent } from "@/config/wedding";
import { fadeUp } from "@/lib/motion";

interface EventCardProps {
  event: WeddingEvent;
  index: number;
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function scrollToLocation(eventId: string) {
  document.getElementById(`location-${eventId}`)?.scrollIntoView({ behavior: "smooth" });
}

export default function EventCard({ event, index }: EventCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"} flex-col gap-4 md:gap-8`}>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, delay: index * 0.05 }}
        className="absolute left-1/2 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-gold bg-blush md:block"
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.08 }}
        whileHover={{ y: -4 }}
        className={`w-full md:w-[calc(50%-2rem)] ${isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}
      >
        <div className="invite-border bg-white/90 p-6 transition-shadow hover:shadow-lg hover:shadow-gold/10">
          <div className="flex items-start gap-4">
            <span className="text-3xl">{event.icon}</span>
            <div className="flex-1">
              <h3 className="font-heading text-xl text-maroon-dark md:text-2xl">
                {event.title}
              </h3>
              <p className="mt-1 font-body text-sm text-gold">{formatDate(event.date)}</p>
              <p className="font-body text-sm text-maroon/70">{event.time}</p>
              <p className="mt-2 font-body text-base text-maroon/80">{event.description}</p>
              {event.dressCode && (
                <p className="mt-2 font-body text-sm italic text-maroon/60">
                  Dress Code: {event.dressCode}
                </p>
              )}
              <p className="mt-3 font-heading text-base text-maroon">{event.venue}</p>
              <p className="font-body text-sm text-maroon/70">{event.address}</p>
              <button
                type="button"
                onClick={() => scrollToLocation(event.id)}
                className="mt-3 font-heading text-xs tracking-wider text-sage uppercase transition-colors hover:text-rose cursor-pointer"
              >
                View on map ↓
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
