"use client";

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import Button from "@/components/ui/Button";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { WEDDING_CONFIG } from "@/config/wedding";
import { getMapEmbedUrl } from "@/lib/qr";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function LocationSection() {
  return (
    <SectionWrapper id="location" blush>
      <div className="text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-heading text-xs tracking-[0.4em] text-sage uppercase"
        >
          Find Us
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-2 font-heading text-3xl text-maroon-dark md:text-4xl"
        >
          Venue & Directions
        </motion.h2>
        <div className="section-divider mx-auto my-6 w-32" />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body text-lg text-maroon/70"
        >
          Maps and QR codes for every celebration
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-12 space-y-8"
      >
        {WEDDING_CONFIG.events.map((event) => (
          <motion.div
            key={event.id}
            id={`location-${event.id}`}
            variants={staggerItem}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="invite-border overflow-hidden bg-white/90 p-6 md:p-8"
          >
            <div className="flex flex-wrap items-start gap-4">
              <span className="text-3xl">{event.icon}</span>
              <div className="flex-1 min-w-[200px]">
                <h3 className="font-heading text-xl text-maroon-dark md:text-2xl">
                  {event.title}
                </h3>
                <p className="mt-1 font-body text-sm text-gold">{formatDate(event.date)}</p>
                <p className="font-body text-sm text-maroon/70">{event.time}</p>
                <p className="mt-3 font-heading text-lg text-maroon">{event.venue}</p>
                <p className="mt-1 font-body text-sm text-maroon/70">{event.address}</p>
                <div className="mt-4">
                  <a href={event.mapUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary">Get Directions</Button>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
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

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-center justify-center rounded-sm border border-gold/30 bg-ivory p-6"
              >
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
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
