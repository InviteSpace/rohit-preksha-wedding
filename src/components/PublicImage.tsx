"use client";

import { type ImgHTMLAttributes } from "react";
import { assetPath } from "@/lib/asset";

type PublicImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  fill?: boolean;
  priority?: boolean;
};

/** Serves /public images with the correct GitHub Pages subpath */
export default function PublicImage({
  src,
  fill,
  priority,
  className = "",
  alt = "",
  ...props
}: PublicImageProps) {
  const resolvedSrc = assetPath(src);

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolvedSrc}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${className}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...props}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...props}
    />
  );
}
