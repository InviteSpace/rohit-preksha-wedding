import { ReactNode } from "react";

interface GoldBorderProps {
  children: ReactNode;
  className?: string;
}

export default function GoldBorder({ children, className = "" }: GoldBorderProps) {
  return (
    <div className={`relative p-6 md:p-10 ${className}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-gold" />
        <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-gold" />
        <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-gold" />
        <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-gold" />
      </div>
      {children}
    </div>
  );
}
