"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EnvelopeIntro from "@/components/EnvelopeIntro";
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

  return (
    <>
      {!introComplete && <EnvelopeIntro onComplete={() => setIntroComplete(true)} />}

      {introComplete && (
        <>
          <ParticleEffects />
          <MusicPlayer autoPrompt />
          <FloatingNav />
        </>
      )}

      <main className={`relative z-2 ${!introComplete ? "overflow-hidden h-screen" : ""}`}>
        {introComplete && <HeroBanner />}
        <WelcomeSection guestName={guestName} />
        <CoupleIntro />
        <Countdown />
        <EventTimeline />
        <Gallery />
        <SharePhotosSection />
        <ClosingSection />
      </main>
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
