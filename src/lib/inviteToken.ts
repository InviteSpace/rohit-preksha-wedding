import {
  DEFAULT_INVITE,
  isInvitationLanguage,
  isInvitationSide,
  sanitizeEventIds,
  sanitizeGuestName,
  type ResolvedInvite,
} from "@/lib/inviteConfig";

export interface InvitePayload {
  v: 1;
  side: "groom" | "bride";
  lang: "en" | "hi";
  events: string[];
  guest?: string;
}

function getInviteSecret(): string {
  const secret = process.env.NEXT_PUBLIC_INVITE_SECRET?.trim();
  if (!secret) {
    return "dev-only-invite-secret-change-me";
  }
  return secret;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function stablePayloadJson(payload: InvitePayload): string {
  const ordered: InvitePayload = {
    v: 1,
    side: payload.side,
    lang: payload.lang,
    events: [...payload.events],
  };
  if (payload.guest) ordered.guest = payload.guest;
  return JSON.stringify(ordered);
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function hmacSign(message: string, secret: string): Promise<Uint8Array> {
  const key = await importHmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return new Uint8Array(sig);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i]! ^ b[i]!;
  return diff === 0;
}

export function buildInvitePayload(input: {
  side: "groom" | "bride";
  lang: "en" | "hi";
  events: string[];
  guest?: string;
}): InvitePayload | null {
  if (!isInvitationSide(input.side) || !isInvitationLanguage(input.lang)) return null;
  const events = sanitizeEventIds(input.events);
  if (!events) return null;
  const guest = sanitizeGuestName(input.guest);
  const payload: InvitePayload = { v: 1, side: input.side, lang: input.lang, events };
  if (guest) payload.guest = guest;
  return payload;
}

/** Create signed token: base64url(json).base64url(hmac) */
export async function signInviteToken(payload: InvitePayload): Promise<string> {
  const json = stablePayloadJson(payload);
  const payloadB64 = bytesToBase64Url(new TextEncoder().encode(json));
  const sig = await hmacSign(payloadB64, getInviteSecret());
  return `${payloadB64}.${bytesToBase64Url(sig)}`;
}

function parsePayloadJson(json: string): InvitePayload | null {
  try {
    const data = JSON.parse(json) as unknown;
    if (!data || typeof data !== "object") return null;
    const obj = data as Record<string, unknown>;
    if (obj.v !== 1) return null;
    if (!isInvitationSide(obj.side) || !isInvitationLanguage(obj.lang)) return null;
    const events = sanitizeEventIds(obj.events);
    if (!events) return null;
    const guest =
      typeof obj.guest === "string" ? sanitizeGuestName(obj.guest) : undefined;
    const payload: InvitePayload = {
      v: 1,
      side: obj.side,
      lang: obj.lang,
      events,
    };
    if (guest) payload.guest = guest;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Verify signed invite token. Returns resolved invite or null if tampered/invalid.
 */
export async function verifyInviteToken(token: string): Promise<ResolvedInvite | null> {
  if (!token || typeof token !== "string" || token.length > 4000) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sigB64] = parts;
  if (!payloadB64 || !sigB64) return null;
  if (!/^[A-Za-z0-9_-]+$/.test(payloadB64) || !/^[A-Za-z0-9_-]+$/.test(sigB64)) {
    return null;
  }

  try {
    const expected = await hmacSign(payloadB64, getInviteSecret());
    const actual = base64UrlToBytes(sigB64);
    if (!timingSafeEqual(expected, actual)) return null;

    const json = new TextDecoder().decode(base64UrlToBytes(payloadB64));
    const payload = parsePayloadJson(json);
    if (!payload) return null;

    // Re-check stable encoding matches (reject key reordering tricks)
    if (stablePayloadJson(payload) !== json) return null;

    return {
      side: payload.side,
      lang: payload.lang,
      eventIds: payload.events,
      guest: payload.guest,
    };
  } catch {
    return null;
  }
}

export function toResolvedInvite(payload: InvitePayload): ResolvedInvite {
  return {
    side: payload.side,
    lang: payload.lang,
    eventIds: payload.events,
    guest: payload.guest,
  };
}

export { DEFAULT_INVITE };
