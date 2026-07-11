interface FloralCornerProps {
  className?: string;
  flip?: "none" | "x" | "y" | "both";
}

export default function FloralCorner({ className = "", flip = "none" }: FloralCornerProps) {
  const flipStyle =
    flip === "x"
      ? "scaleX(-1)"
      : flip === "y"
        ? "scaleY(-1)"
        : flip === "both"
          ? "scale(-1)"
          : undefined;

  return (
    <svg
      viewBox="0 0 64 64"
      className={`h-12 w-12 md:h-16 md:w-16 ${className}`}
      style={flipStyle ? { transform: flipStyle } : undefined}
      aria-hidden
    >
      <path
        d="M8 8 C8 8 16 4 24 12 C20 8 12 12 8 8Z"
        fill="#c9958a"
        opacity="0.5"
      />
      <path
        d="M4 20 C4 20 8 28 16 24 C8 22 4 14 4 20Z"
        fill="#7a9e7e"
        opacity="0.45"
      />
      <circle cx="20" cy="16" r="5" fill="#e0b5ab" opacity="0.6" />
      <circle cx="14" cy="22" r="3.5" fill="#c9958a" opacity="0.45" />
      <path
        d="M28 6 C32 10 36 8 40 12"
        stroke="#7a9e7e"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M6 32 C10 28 14 32 18 28"
        stroke="#b8956b"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}
