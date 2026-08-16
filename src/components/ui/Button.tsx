import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex w-full items-center justify-center rounded-full px-5 py-3 font-heading text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto sm:px-6 sm:text-sm sm:tracking-widest";

  const variants = {
    primary:
      "bg-navy text-white hover:bg-navy-deep hover:shadow-lg hover:shadow-navy/25",
    outline:
      "border-2 border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-white",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
