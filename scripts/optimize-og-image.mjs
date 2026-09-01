import fs from "node:fs";
import sharp from "sharp";

const input = "public/og-whatsapp.jpg";
const output = "public/og-whatsapp.jpg";

if (!fs.existsSync(input)) {
  process.exit(0);
}

await sharp(input)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 72, mozjpeg: true })
  .toFile(`${output}.tmp`);

fs.renameSync(`${output}.tmp`, output);

const { size } = fs.statSync(output);
console.log(`Optimized ${output} (${Math.round(size / 1024)} KB)`);
