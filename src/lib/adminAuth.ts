const SESSION_KEY = "wedding-admin-auth";
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 30_000;

let failedAttempts = 0;
let lockUntil = 0;

function getExpectedHash(): string {
  return (process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH ?? "").trim().toLowerCase();
}

export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function isAdminConfigured(): boolean {
  return /^[a-f0-9]{64}$/.test(getExpectedHash());
}

export function isAdminSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function setAdminSession(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* private mode */
  }
}

export function clearAdminSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* private mode */
  }
}

export function getLockRemainingMs(): number {
  return Math.max(0, lockUntil - Date.now());
}

export type AdminLoginResult =
  | { ok: true }
  | { ok: false; error: string; lockMs?: number };

/**
 * Verify admin password against baked-in SHA-256 hash.
 * Rate-limited: 5 failures → 30s lockout.
 */
export async function loginAdmin(password: string): Promise<AdminLoginResult> {
  const remaining = getLockRemainingMs();
  if (remaining > 0) {
    return {
      ok: false,
      error: "Too many attempts. Please wait before trying again.",
      lockMs: remaining,
    };
  }

  if (!isAdminConfigured()) {
    return {
      ok: false,
      error: "Admin password is not configured. Set NEXT_PUBLIC_ADMIN_PASSWORD_HASH.",
    };
  }

  if (typeof password !== "string" || password.length === 0 || password.length > 200) {
    return { ok: false, error: "Invalid password." };
  }

  const hash = await hashPassword(password);
  const expected = getExpectedHash();

  if (timingSafeEqualHex(hash, expected)) {
    failedAttempts = 0;
    lockUntil = 0;
    setAdminSession();
    return { ok: true };
  }

  failedAttempts += 1;
  if (failedAttempts >= MAX_ATTEMPTS) {
    lockUntil = Date.now() + LOCKOUT_MS;
    failedAttempts = 0;
    return {
      ok: false,
      error: "Too many attempts. Please wait before trying again.",
      lockMs: LOCKOUT_MS,
    };
  }

  return { ok: false, error: "Incorrect password." };
}

export function logoutAdmin(): void {
  clearAdminSession();
}
