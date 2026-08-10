"use client";

import { useCallback, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import CinematicInvitationIntro from "@/components/CinematicInvitationIntro";
import HeroBanner from "@/components/HeroBanner";
import FloatingNav from "@/components/FloatingNav";
import WelcomeSection from "@/components/WelcomeSection";
import CoupleIntro from "@/components/CoupleIntro";
import Countdown from "@/components/Countdown";
import EventTimeline from "@/components/EventTimeline";
import Gallery from "@/components/Gallery";
import SharePhotosSection from "@/components/SharePhotosSection";
import ClosingSection from "@/components/ClosingSection";
import MusicPlayer from "@/components/MusicPlayer";
import ParticleEffects from "@/components/ParticleEffects";

function HomeContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("guest") ?? undefined;
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousRestoration = window.history.scrollRestoration;

    if (!introComplete) {
      window.history.scrollRestoration = "manual";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.history.scrollRestoration = previousRestoration;
    };
  }, [introComplete]);

  const finishIntro = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setIntroComplete(true);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, []);

  if (!introComplete) {
    return <CinematicInvitationIntro onComplete={finishIntro} />;
  }

  return (
    <>
      <ParticleEffects />
      <MusicPlayer autoPrompt />
      <FloatingNav />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-2"
      >
        <HeroBanner />
        <WelcomeSection guestName={guestName} />
        <CoupleIntro />
        <Countdown />
        <EventTimeline />
        <Gallery />
        <SharePhotosSection />
        <ClosingSection />
      </motion.main>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-blush text-sage">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
