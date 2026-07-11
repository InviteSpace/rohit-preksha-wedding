"use client";

import { useEffect, useState } from "react";

const PETAL_COUNT = 18;
const COLORS = ["#F5E6E0", "#C9958A", "#E0B5AB", "#7A9E7E", "#D4B896"];

export default function ParticleEffects() {
  const [petals, setPetals] = useState<
    Array<{ id: number; left: number; delay: number; duration: number; color: string; size: number }>
  >([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: PETAL_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 12 + Math.random() * 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-1 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 10 10"
            fill={petal.color}
            opacity={0.65}
          >
            <ellipse cx="5" cy="5" rx="4" ry="2.5" transform="rotate(45 5 5)" />
          </svg>
        </div>
      ))}
    </div>
  );
}
