"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { WEDDING_CONFIG } from "@/config/wedding";
import { fadeUp } from "@/lib/motion";

export default function ClosingSection() {
  const [copied, setCopied] = useState(false);
  const { closing, couple, hashtag } = WEDDING_CONFIG;

  const shareWhatsApp = useCallback(() => {
    const url = window.location.href.split("?")[0];
    const text = `You're invited to the wedding of ${couple.groom.name} & ${couple.bride.name}! ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }, [couple]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.split("?")[0]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, []);

  return (
    <footer className="relative bg-blush py-16 px-4 text-center floral-bg">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-2xl"
      >
        <p className="font-body text-lg leading-relaxed text-maroon/80 md:text-xl">
          {closing.message}
        </p>

        <p className="mt-8 font-heading text-2xl text-rose md:text-3xl">
          {closing.signature}
        </p>

        <p className="mt-4 font-heading text-sm tracking-widest text-sage">
          {hashtag}
        </p>

        <div className="section-divider mx-auto my-8 w-48" />

        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" onClick={shareWhatsApp}>
            Share on WhatsApp
          </Button>
          <Button variant="outline" onClick={copyLink}>
            {copied ? "Link Copied!" : "Copy Link"}
          </Button>
        </div>

        <p className="mt-12 font-body text-sm text-maroon/50">
          {couple.groom.name} & {couple.bride.name} · {new Date().getFullYear()}
        </p>
      </motion.div>
    </footer>
  );
}
