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
          className="font-heading text-xs font-semibold tracking-[0.4em] text-royal-gold uppercase"
        >
          Capture the Moment
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-2 font-heading text-3xl !font-medium text-navy-deep md:text-4xl"
        >
          Share Your Photos
        </motion.h2>
        <div className="mx-auto my-6 h-px w-32 bg-linear-to-r from-transparent via-royal-gold to-transparent" />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl font-heading text-lg font-medium text-navy/80"
        >
          {sharedAlbum.description}
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6"
      >
        <motion.div
          variants={staggerItem}
          className="overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white/80 p-6 shadow-[0_20px_50px_rgba(17,41,77,0.08)] backdrop-blur-xl md:p-8"
        >
          <div className="flex items-start gap-4">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-lg text-white"
              aria-hidden
            >
              📸
            </span>
            <div>
              <p className="font-heading text-[10px] font-semibold tracking-[0.35em] text-royal-gold uppercase">
                Google Photos Album
              </p>
              <h3 className="mt-1 font-heading text-2xl !font-medium text-navy-deep">
                {sharedAlbum.title}
              </h3>
              <p className="mt-3 font-heading text-base font-medium leading-relaxed text-navy/80">
                Everyone is welcome to upload photos from our wedding celebrations. Please add
                your memories — and kindly do not remove photos shared by others.
              </p>
            </div>
          </div>

          <motion.ol variants={staggerContainer} className="mt-8 space-y-3">
            {STEPS.map((step) => (
              <motion.li
                key={step.number}
                variants={staggerItem}
                className="flex gap-4 rounded-2xl border border-navy/8 bg-navy/[0.03] p-4"
              >
                <span className="font-heading text-sm font-semibold text-royal-gold">
                  {step.number}
                </span>
                <div>
                  <p className="font-heading text-base !font-medium text-navy-deep">
                    {step.title}
                  </p>
                  <p className="mt-1 font-heading text-sm font-medium text-navy/70">
                    {step.detail}
                  </p>
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

          <p className="mt-5 font-heading text-sm font-medium italic text-navy/70">
            Use {hashtag} when posting on social media so we can find your posts too.
          </p>
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="flex flex-col items-center justify-center rounded-[1.75rem] border border-white/10 bg-navy p-6 text-center shadow-[0_20px_50px_rgba(17,41,77,0.2)] md:p-8"
        >
          <p className="font-heading text-[10px] font-semibold tracking-[0.35em] text-royal-gold-bright uppercase">
            Scan to Upload
          </p>
          <p className="mt-2 max-w-xs font-heading text-sm font-medium text-white/80">
            Opens our shared Google Photos album on your phone
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-6 rounded-2xl border border-white/15 bg-white p-4 shadow-lg"
          >
            <QRCodeSVG
              value={sharedAlbum.url}
              size={180}
              bgColor="#FFFFFF"
              fgColor="#11294d"
              level="M"
            />
          </motion.div>

          <p className="mt-5 max-w-xs font-heading text-xs font-medium text-white/65">
            Uploads go directly to Google Photos — add only, please keep everyone&apos;s
            memories safe.
          </p>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
