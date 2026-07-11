"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PublicImage from "@/components/PublicImage";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { WEDDING_CONFIG } from "@/config/wedding";
import { fadeUp, scaleIn } from "@/lib/motion";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const photos = WEDDING_CONFIG.photos;

  return (
    <SectionWrapper id="gallery" blush>
      <div className="text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-heading text-xs tracking-[0.4em] text-sage uppercase"
        >
          Memories
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-2 font-heading text-3xl text-maroon-dark md:text-4xl"
        >
          Our Gallery
        </motion.h2>
        <div className="section-divider mx-auto my-6 w-32" />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body text-lg text-maroon/70"
        >
          Moments from our journey —{" "}
          <a href="#share-photos" className="text-sage underline-offset-2 hover:text-rose hover:underline">
            share yours too
          </a>
        </motion.p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {photos.map((photo, index) => (
          <motion.button
            key={photo}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-square overflow-hidden rounded-sm border border-gold/30 cursor-pointer shadow-sm"
          >
            <PublicImage
              src={photo}
              alt={`Gallery photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-rose/0 transition-colors group-hover:bg-rose/15" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 flex items-center justify-center bg-maroon-dark/80 p-4 backdrop-blur-sm"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute right-4 top-4 text-3xl text-gold cursor-pointer"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
            >
              ×
            </button>

            {lightboxIndex > 0 && (
              <button
                className="absolute left-4 text-3xl text-gold cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex - 1);
                }}
                aria-label="Previous photo"
              >
                ‹
              </button>
            )}

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="relative h-[70vh] w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <PublicImage
                src={photos[lightboxIndex]}
                alt={`Gallery photo ${lightboxIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>

            {lightboxIndex < photos.length - 1 && (
              <button
                className="absolute right-4 text-3xl text-gold md:right-12 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex + 1);
                }}
                aria-label="Next photo"
              >
                ›
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
