import { WEDDING_CONFIG, type WeddingEvent } from "@/config/wedding";
import type { InvitationLanguage, InvitationSide } from "@/lib/invitationSide";

export const KNOWN_EVENT_IDS = WEDDING_CONFIG.events.map((e) => e.id) as readonly string[];

export type EventGroupKey = "mehndi" | "haldi" | "wedding" | "reception";

/** Each checkbox maps to a single event id. */
export const EVENT_GROUPS: Record<EventGroupKey, readonly string[]> = {
  mehndi: ["mehndi"],
  haldi: ["haldi"],
  wedding: ["wedding"],
  reception: ["reception"],
};

export const EVENT_GROUP_LABELS: Record<EventGroupKey, { title: string; detail: string }> = {
  mehndi: { title: "Mehndi", detail: "Mehndi ceremony only" },
  haldi: { title: "Haldi", detail: "Haldi ceremony only" },
  wedding: { title: "Wedding", detail: "Wedding ceremony only" },
  reception: { title: "Reception", detail: "Reception only" },
};

export interface InviteSettings {
  side: InvitationSide;
  lang: InvitationLanguage;
  /** Which event groups are included */
  groups: EventGroupKey[];
  guest?: string;
}

export interface ResolvedInvite {
  side: InvitationSide;
  lang: InvitationLanguage;
  eventIds: string[];
  guest?: string;
}

export const DEFAULT_INVITE: ResolvedInvite = {
  side: "groom",
  lang: "en",
  eventIds: [...KNOWN_EVENT_IDS],
};

export function eventIdsFromGroups(groups: EventGroupKey[]): string[] {
  const ids = new Set<string>();
  for (const group of groups) {
    const list = EVENT_GROUPS[group];
    if (!list) continue;
    for (const id of list) {
      if (KNOWN_EVENT_IDS.includes(id)) ids.add(id);
    }
  }
  return KNOWN_EVENT_IDS.filter((id) => ids.has(id));
}

export function groupsFromEventIds(eventIds: string[]): EventGroupKey[] {
  const set = new Set(eventIds);
  return (Object.keys(EVENT_GROUPS) as EventGroupKey[]).filter((key) =>
    EVENT_GROUPS[key].some((id) => set.has(id)),
  );
}

export function filterEvents(
  events: readonly WeddingEvent[],
  allowedIds?: string[] | null,
): WeddingEvent[] {
  if (!allowedIds || allowedIds.length === 0) return [...events];
  const allow = new Set(allowedIds);
  return events.filter((e) => allow.has(e.id));
}

const GUEST_MAX = 40;
const GUEST_ALLOWED = /^[\p{L}\p{M}\s'.-]+$/u;

/** Strip HTML/control chars; allowlist letters/spaces only. */
export function sanitizeGuestName(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const stripped = value
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, GUEST_MAX);
  if (!stripped || !GUEST_ALLOWED.test(stripped)) return undefined;
  return stripped;
}

export function isInvitationSide(value: unknown): value is InvitationSide {
  return value === "groom" || value === "bride";
}

export function isInvitationLanguage(value: unknown): value is InvitationLanguage {
  return value === "en" || value === "hi";
}

export function sanitizeEventIds(ids: unknown): string[] | null {
  if (!Array.isArray(ids)) return null;
  const cleaned = ids.filter(
    (id): id is string => typeof id === "string" && KNOWN_EVENT_IDS.includes(id),
  );
  if (cleaned.length === 0) return null;
  return KNOWN_EVENT_IDS.filter((id) => cleaned.includes(id));
}
