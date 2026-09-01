import fs from "node:fs";
import path from "node:path";

const OUT_DIR = "out";
const OG_TAG =
  /<meta\s+(?:property="og:[^"]+"|name="twitter:(?:card|image)")[^>]*\/>/g;

function hoistOgTags(htmlPath) {
  const html = fs.readFileSync(htmlPath, "utf8");
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/);
  if (!headMatch) return;

  const ogTags = headMatch[1].match(OG_TAG);
  if (!ogTags?.length) return;

  let headContent = headMatch[1];
  for (const tag of ogTags) {
    headContent = headContent.replace(tag, "");
  }

  const hoistedHead = `<head>${ogTags.join("")}${headContent}</head>`;
  const nextHtml = html.replace(headMatch[0], hoistedHead);
  fs.writeFileSync(htmlPath, nextHtml);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.name.endsWith(".html")) hoistOgTags(fullPath);
  }
}

if (!fs.existsSync(OUT_DIR)) {
  process.exit(0);
}

walk(OUT_DIR);
