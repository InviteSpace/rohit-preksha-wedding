import fs from "node:fs";
import path from "node:path";

const OUT_DIR = "out";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://invitespace.github.io/rohit-preksha-wedding"
).replace(/\/$/, "");

const ogImageUrl =
  process.env.OG_IMAGE_URL ?? `${siteUrl}/og-whatsapp.jpg`;

const ogBlock = [
  `<meta charset="utf-8">`,
  `<meta name="viewport" content="width=device-width, initial-scale=1">`,
  `<meta property="og:title" content="Rohit &amp; Preksha | Wedding Invitation">`,
  `<meta property="og:description" content="Join us in celebrating our special day!">`,
  `<meta property="og:url" content="${siteUrl}/">`,
  `<meta property="og:type" content="website">`,
  `<meta property="og:image" content="${ogImageUrl}">`,
  `<meta name="description" content="You are cordially invited to celebrate the wedding of Rohit and Preksha.">`,
  `<meta name="twitter:card" content="summary_large_image">`,
  `<meta name="twitter:image" content="${ogImageUrl}">`,
  `<link rel="canonical" href="${siteUrl}/">`,
].join("");

const stripPatterns = [
  /<meta\s+charset="utf-8"\s*\/?>/gi,
  /<meta\s+charSet="utf-8"\s*\/?>/gi,
  /<meta\s+name="viewport"[^>]*\/?>/gi,
  /<meta\s+property="og:[^"]*"[^>]*\/?>/gi,
  /<meta\s+name="twitter:(?:card|image|title|description)"[^>]*\/?>/gi,
  /<link\s+rel="canonical"[^>]*\/?>/gi,
];

function injectOgTags(htmlPath) {
  let html = fs.readFileSync(htmlPath, "utf8");
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/);
  if (!headMatch) return;

  let headContent = headMatch[1];
  for (const pattern of stripPatterns) {
    headContent = headContent.replace(pattern, "");
  }

  const nextHead = `<head>${ogBlock}${headContent}</head>`;
  html = html.replace(headMatch[0], nextHead);
  fs.writeFileSync(htmlPath, html);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.name.endsWith(".html")) injectOgTags(fullPath);
  }
}

if (!fs.existsSync(OUT_DIR)) {
  process.exit(0);
}

walk(OUT_DIR);
console.log(`Injected WhatsApp OG tags (image: ${ogImageUrl})`);
