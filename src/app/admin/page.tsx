"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  clearAdminSession,
  getLockRemainingMs,
  isAdminConfigured,
  isAdminSession,
  loginAdmin,
  logoutAdmin,
} from "@/lib/adminAuth";
import {
  EVENT_GROUP_LABELS,
  EVENT_GROUPS,
  eventIdsFromGroups,
  filterEvents,
  sanitizeGuestName,
  type EventGroupKey,
} from "@/lib/inviteConfig";
import { buildInvitePayload, signInviteToken } from "@/lib/inviteToken";
import { WEDDING_CONFIG } from "@/config/wedding";
import { SITE_CONFIG } from "@/config/site";
import type { InvitationLanguage, InvitationSide } from "@/lib/invitationSide";

function publicSiteOrigin(): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (typeof window !== "undefined") {
    return `${window.location.origin}${basePath}`;
  }
  return SITE_CONFIG.publicUrl.replace(/\/$/, "");
}

function buildShareUrl(token: string): string {
  const base = publicSiteOrigin().replace(/\/$/, "");
  return `${base}/?i=${encodeURIComponent(token)}`;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [lockMs, setLockMs] = useState(0);
  const [busy, setBusy] = useState(false);

  const [side, setSide] = useState<InvitationSide>("groom");
  const [lang, setLang] = useState<InvitationLanguage>("en");
  const [eventChecks, setEventChecks] = useState<Record<EventGroupKey, boolean>>({
    mehndi: true,
    haldi: true,
    wedding: true,
    reception: true,
  });
  const [guestInput, setGuestInput] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [genError, setGenError] = useState("");

  useEffect(() => {
    setAuthed(isAdminSession());
  }, []);

  useEffect(() => {
    if (lockMs <= 0) return;
    const id = window.setInterval(() => {
      const left = getLockRemainingMs();
      setLockMs(left);
      if (left <= 0) window.clearInterval(id);
    }, 500);
    return () => window.clearInterval(id);
  }, [lockMs]);

  const selectedGroups = useMemo((): EventGroupKey[] => {
    return (Object.keys(EVENT_GROUPS) as EventGroupKey[]).filter(
      (key) => eventChecks[key],
    );
  }, [eventChecks]);

  const previewEvents = useMemo(() => {
    const ids = eventIdsFromGroups(selectedGroups);
    return filterEvents(WEDDING_CONFIG.events, ids);
  }, [selectedGroups]);

  const toggleEvent = (key: EventGroupKey) => {
    setEventChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogin = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setLoginError("");
      setBusy(true);
      try {
        const result = await loginAdmin(password);
        setPassword("");
        if (result.ok) {
          setAuthed(true);
          return;
        }
        setLoginError(result.error);
        if (result.lockMs) setLockMs(result.lockMs);
      } finally {
        setBusy(false);
      }
    },
    [password],
  );

  const handleLogout = () => {
    logoutAdmin();
    clearAdminSession();
    setAuthed(false);
    setShareUrl("");
    setCopyStatus("");
  };

  const handleGenerate = async (event: FormEvent) => {
    event.preventDefault();
    setGenError("");
    setCopyStatus("");

    if (selectedGroups.length === 0) {
      setGenError("Select at least one event (Mehndi, Haldi, Wedding, or Reception).");
      return;
    }

    const events = eventIdsFromGroups(selectedGroups);
    const guest = sanitizeGuestName(guestInput);
    const payload = buildInvitePayload({ side, lang, events, guest });
    if (!payload) {
      setGenError("Invalid invite settings.");
      return;
    }

    setBusy(true);
    try {
      const token = await signInviteToken(payload);
      setShareUrl(buildShareUrl(token));
    } catch {
      setGenError("Could not sign invitation URL.");
    } finally {
      setBusy(false);
    }
  };

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus("Copied to clipboard.");
    } catch {
      setCopyStatus("Could not copy — select the URL and copy manually.");
    }
  };

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#efede9] px-4 py-12">
        <div className="w-full max-w-md border border-[#d6ad63]/50 bg-white/90 p-8 shadow-sm">
          <p className="font-heading text-xs tracking-[0.3em] text-[#11294d]/60 uppercase">
            Private
          </p>
          <h1 className="mt-2 font-heading text-2xl text-[#11294d]">Admin login</h1>
          <p className="mt-2 font-body text-sm text-[#11294d]/70">
            Enter the admin password to create signed invitation links.
          </p>

          {!isAdminConfigured() && (
            <p className="mt-4 border border-rose/40 bg-blush/50 p-3 font-body text-sm text-maroon">
              Password hash not configured. Run{" "}
              <code className="font-mono text-xs">npm run hash-admin-password -- &quot;…&quot;</code>{" "}
              and set <code className="font-mono text-xs">NEXT_PUBLIC_ADMIN_PASSWORD_HASH</code>.
            </p>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4" autoComplete="off">
            <label className="block">
              <span className="font-heading text-xs tracking-wider text-[#11294d]/70 uppercase">
                Password
              </span>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value.slice(0, 200))}
                className="mt-1 w-full border border-[#d6ad63]/60 bg-white px-3 py-2 font-body text-[#11294d] outline-none focus:border-[#11294d]"
                autoComplete="current-password"
                disabled={busy || lockMs > 0}
                maxLength={200}
              />
            </label>
            {loginError && (
              <p className="font-body text-sm text-rose" role="alert">
                {loginError}
                {lockMs > 0 ? ` (${Math.ceil(lockMs / 1000)}s)` : ""}
              </p>
            )}
            <button
              type="submit"
              disabled={busy || lockMs > 0 || !isAdminConfigured()}
              className="w-full cursor-pointer bg-[#11294d] px-4 py-3 font-heading text-xs tracking-[0.2em] text-white uppercase disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Checking…" : "Sign in"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#efede9] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl border border-[#d6ad63]/50 bg-white/90 p-6 shadow-sm sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-heading text-xs tracking-[0.3em] text-[#11294d]/60 uppercase">
              Admin
            </p>
            <h1 className="mt-1 font-heading text-2xl text-[#11294d]">Invitation links</h1>
            <p className="mt-2 font-body text-sm text-[#11294d]/70">
              Choose language, family side, and which events guests see. The link is signed so
              settings cannot be casually edited in the URL.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="shrink-0 cursor-pointer border border-[#11294d]/30 px-3 py-2 font-heading text-[10px] tracking-wider text-[#11294d] uppercase"
          >
            Log out
          </button>
        </div>

        <form onSubmit={handleGenerate} className="mt-8 space-y-6" autoComplete="off">
          <fieldset>
            <legend className="font-heading text-xs tracking-wider text-[#11294d]/70 uppercase">
              Default language
            </legend>
            <div className="mt-2 flex gap-2">
              {(
                [
                  ["en", "English"],
                  ["hi", "Hindi"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLang(value)}
                  className={`cursor-pointer rounded-full px-4 py-2 font-heading text-xs ${
                    lang === value
                      ? "bg-[#11294d] text-white"
                      : "border border-[#d6ad63]/60 text-[#11294d]/70"
                  }`}
                  aria-pressed={lang === value}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-heading text-xs tracking-wider text-[#11294d]/70 uppercase">
              Invitation side
            </legend>
            <div className="mt-2 flex gap-2">
              {(
                [
                  ["groom", "Groom (Maurya)"],
                  ["bride", "Bride (Singh)"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSide(value)}
                  className={`cursor-pointer rounded-full px-4 py-2 font-heading text-xs ${
                    side === value
                      ? "bg-[#11294d] text-white"
                      : "border border-[#d6ad63]/60 text-[#11294d]/70"
                  }`}
                  aria-pressed={side === value}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-heading text-xs tracking-wider text-[#11294d]/70 uppercase">
              Events to show
            </legend>
            <div className="mt-3 space-y-3">
              {(Object.keys(EVENT_GROUPS) as EventGroupKey[]).map((key) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-start gap-3 font-body text-sm text-[#11294d]"
                >
                  <input
                    type="checkbox"
                    checked={eventChecks[key]}
                    onChange={() => toggleEvent(key)}
                    className="mt-1"
                  />
                  <span>
                    <span className="font-heading">{EVENT_GROUP_LABELS[key].title}</span>
                    <span className="mt-0.5 block text-[#11294d]/60">
                      {EVENT_GROUP_LABELS[key].detail}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="font-heading text-xs tracking-wider text-[#11294d]/70 uppercase">
              Guest name (optional)
            </span>
            <input
              type="text"
              value={guestInput}
              onChange={(e) => setGuestInput(e.target.value.slice(0, 40))}
              placeholder="e.g. Auntie Sharma"
              className="mt-1 w-full border border-[#d6ad63]/60 bg-white px-3 py-2 font-body text-[#11294d] outline-none focus:border-[#11294d]"
              maxLength={40}
              autoComplete="off"
            />
          </label>

          <div className="border border-[#d6ad63]/40 bg-[#f7f5f1] p-4">
            <p className="font-heading text-xs tracking-wider text-[#11294d]/70 uppercase">
              Event preview
            </p>
            {previewEvents.length === 0 ? (
              <p className="mt-2 font-body text-sm text-rose">No events selected.</p>
            ) : (
              <ul className="mt-2 list-inside list-disc font-body text-sm text-[#11294d]/80">
                {previewEvents.map((ev) => (
                  <li key={ev.id}>
                    {ev.title} — {ev.date}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {genError && (
            <p className="font-body text-sm text-rose" role="alert">
              {genError}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full cursor-pointer bg-[#11294d] px-4 py-3 font-heading text-xs tracking-[0.2em] text-white uppercase disabled:opacity-50 sm:w-auto"
          >
            {busy ? "Generating…" : "Generate signed URL"}
          </button>
        </form>

        {shareUrl && (
          <div className="mt-8 border-t border-[#d6ad63]/40 pt-6">
            <p className="font-heading text-xs tracking-wider text-[#11294d]/70 uppercase">
              Share this link
            </p>
            <textarea
              readOnly
              value={shareUrl}
              rows={4}
              className="mt-2 w-full border border-[#d6ad63]/60 bg-white px-3 py-2 font-mono text-xs text-[#11294d]"
              onFocus={(e) => e.target.select()}
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="cursor-pointer border border-[#11294d] bg-[#11294d] px-4 py-2 font-heading text-[10px] tracking-wider text-white uppercase"
              >
                Copy URL
              </button>
              {copyStatus && (
                <p className="font-body text-sm text-sage" aria-live="polite">
                  {copyStatus}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
