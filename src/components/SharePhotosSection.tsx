"use client";

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import Button from "@/components/ui/Button";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { WEDDING_CONFIG } from "@/config/wedding";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

const STEPS = [
  {
    number: "01",
    title: "Open the album",
    detail: "Tap the button below or scan the QR code on your phone.",
  },
  {
    number: "02",
    title: "Add your photos",
    detail: "Choose photos from your gallery and upload them to Shared Memories.",
  },
  {
    number: "03",
    title: "Spread the joy",
    detail: "Your moments become part of our wedding story for everyone to enjoy.",
  },
];

export default function SharePhotosSection() {
  const { sharedAlbum, hashtag } = WEDDING_CONFIG;

  return (
    <SectionWrapper id="share-photos">
      <div className="text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-heading text-xs tracking-[0.4em] text-sage uppercase"
        >
          Capture the Moment
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-2 font-heading text-3xl text-maroon-dark md:text-4xl"
        >
          Share Your Photos
        </motion.h2>
        <div className="section-divider mx-auto my-6 w-32" />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body text-lg text-maroon/70"
        >
          {sharedAlbum.description}
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <motion.div
          variants={staggerItem}
          className="invite-border overflow-hidden bg-ivory p-6 md:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="text-4xl" aria-hidden>
              📸
            </span>
            <div>
              <p className="font-heading text-xs tracking-[0.35em] text-sage uppercase">
                Google Photos Album
              </p>
              <h3 className="mt-1 font-heading text-2xl text-maroon-dark">{sharedAlbum.title}</h3>
              <p className="mt-3 font-body text-base leading-relaxed text-maroon/80">
                Everyone is welcome to upload photos from our wedding celebrations. Please add
                your memories — and kindly do not remove photos shared by others.
              </p>
            </div>
          </div>

          <motion.ol
            variants={staggerContainer}
            className="mt-8 space-y-4"
          >
            {STEPS.map((step) => (
              <motion.li
                key={step.number}
                variants={staggerItem}
                className="flex gap-4 rounded-lg border border-gold/30 bg-blush p-4"
              >
                <span className="font-heading text-sm text-gold">{step.number}</span>
                <div>
                  <p className="font-heading text-base text-maroon-dark">{step.title}</p>
                  <p className="mt-1 font-body text-sm text-maroon/70">{step.detail}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={sharedAlbum.url} target="_blank" rel="noopener noreferrer">
              <Button variant="primary">Add Photos to Album</Button>
            </a>
            <a href={sharedAlbum.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">View Shared Album</Button>
            </a>
          </div>

          <p className="mt-5 font-body text-sm italic text-maroon/55">
            Use {hashtag} when posting on social media so we can find your posts too.
          </p>
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="invite-border flex flex-col items-center justify-center bg-blush p-6 md:p-8"
        >
          <p className="font-heading text-xs tracking-[0.35em] text-sage uppercase">
            Scan to Upload
          </p>
          <p className="mt-2 text-center font-body text-sm text-maroon/70">
            Opens our shared Google Photos album on your phone
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-6 rounded-sm border border-gold/40 bg-ivory p-5 shadow-sm"
          >
            <QRCodeSVG
              value={sharedAlbum.url}
              size={180}
              bgColor="#FFFBF7"
              fgColor="#3D2B2B"
              level="M"
            />
          </motion.div>

          <p className="mt-5 text-center font-body text-xs text-maroon/55">
            Uploads go directly to Google Photos — add only, please keep everyone&apos;s
            memories safe.
          </p>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
