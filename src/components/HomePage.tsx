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
import SharePhotosSection from "@/components/SharePhotosSection";
import ClosingSection from "@/components/ClosingSection";
import MusicPlayer from "@/components/MusicPlayer";
import ParticleEffects from "@/components/ParticleEffects";
import {
  DEFAULT_INVITE,
  KNOWN_EVENT_IDS,
  sanitizeGuestName,
  type ResolvedInvite,
} from "@/lib/inviteConfig";
import { verifyInviteToken } from "@/lib/inviteToken";
import { parseInvitationSide, type InvitationLanguage } from "@/lib/invitationSide";
import { LanguageProvider, useLanguage } from "@/lib/LanguageContext";
import { getUiCopy } from "@/lib/uiCopy";

function HomeContent() {
  const searchParams = useSearchParams();
  const { language, setLanguage } = useLanguage();
  const t = getUiCopy(language);
  const [invite, setInvite] = useState<ResolvedInvite | null>(null);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function resolveInvite() {
      const token = searchParams.get("i");
      if (token) {
        const verified = await verifyInviteToken(token);
        if (!cancelled) {
          const resolved = verified ?? { ...DEFAULT_INVITE };
          setInvite(resolved);
          setLanguage(resolved.lang);
        }
        return;
      }

      const langParam = searchParams.get("lang");
      const lang: InvitationLanguage =
        langParam === "hi" || langParam === "en" ? langParam : "en";

      if (!cancelled) {
        const resolved = {
          side: parseInvitationSide(searchParams.get("side")),
          lang,
          eventIds: [...KNOWN_EVENT_IDS],
          guest: sanitizeGuestName(searchParams.get("guest")),
        };
        setInvite(resolved);
        setLanguage(resolved.lang);
      }
    }

    void resolveInvite();
    return () => {
      cancelled = true;
    };
  }, [searchParams, setLanguage]);

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

  if (!invite) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blush text-sage">
        {t.loading}
      </div>
    );
  }

  return (
    <>
      <MusicPlayer
        language={language}
        hidden={!introComplete}
        autoStart={introComplete}
        autoPrompt={introComplete}
      />

      {!introComplete ? (
        <CinematicInvitationIntro
          onComplete={finishIntro}
          side={invite.side}
          initialLanguage={language}
          onLanguageChange={setLanguage}
        />
      ) : (
        <>
          <ParticleEffects />
          <FloatingNav />

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-2"
          >
            <HeroBanner />
            <WelcomeSection guestName={invite.guest} side={invite.side} />
            <CoupleIntro />
            <Countdown />
            <EventTimeline eventIds={invite.eventIds} />
            <SharePhotosSection />
            <ClosingSection />
          </motion.main>
        </>
      )}
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-blush text-sage">
          Loading...
        </div>
      }
    >
      <LanguageProvider>
        <HomeContent />
      </LanguageProvider>
    </Suspense>
  );
}
