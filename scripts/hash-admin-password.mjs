#!/usr/bin/env node
/**
 * Usage: npm run hash-admin-password -- "your-password"
 * Prints SHA-256 hex to set as NEXT_PUBLIC_ADMIN_PASSWORD_HASH / GitHub secret ADMIN_PASSWORD_HASH.
 */
import { createHash } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash-admin-password -- "your-password"');
  process.exit(1);
}

if (password.length > 200) {
  console.error("Password is too long (max 200 characters).");
  process.exit(1);
}

const hash = createHash("sha256").update(password, "utf8").digest("hex");
console.log(hash);
console.error("\nSet this as NEXT_PUBLIC_ADMIN_PASSWORD_HASH in .env.local");
console.error("and as GitHub Actions secret ADMIN_PASSWORD_HASH for deploy.");
