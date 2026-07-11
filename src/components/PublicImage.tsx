"use client";

import Image, { type ImageProps } from "next/image";
import { assetPath } from "@/lib/asset";

/** Image for files in /public — applies GitHub Pages basePath automatically */
export default function PublicImage({ src, ...props }: ImageProps) {
  const resolvedSrc = typeof src === "string" ? assetPath(src) : src;
  return <Image src={resolvedSrc} unoptimized {...props} />;
}
