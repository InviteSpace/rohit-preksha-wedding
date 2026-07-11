"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp } from "@/lib/motion";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  blush?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  blush = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative py-20 px-4 md:px-8 floral-bg ${
        blush ? "bg-blush text-foreground" : "bg-ivory text-foreground"
      } ${className}`}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 mx-auto max-w-5xl"
      >
        {children}
      </motion.div>
    </section>
  );
}
