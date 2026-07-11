# Rohit & Preksha — Wedding Invitation

An interactive digital wedding invitation built with Next.js, Framer Motion, and Tailwind CSS.

## Features

- Cinematic envelope opening with R · P monogram seal
- Professional floral invitation card reveal
- Light floral theme (blush, sage, rose, cream)
- Animated bride & groom introduction
- Live countdown to wedding day
- 5 event timeline: Mehndi, Haldi, Cocktail, Wedding, Reception
- Dedicated location section with embedded maps + QR codes for every venue
- Photo gallery with lightbox
- Guest photo sharing via Google Photos shared album (add-only)
- Background music player
- Personalized guest greeting via URL (`?guest=Name`)
- WhatsApp share & copy link

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customize Your Wedding Details

Edit **one file** — [`src/config/wedding.ts`](src/config/wedding.ts):

| Field | What to update |
|---|---|
| `couple` | Names, taglines, photo paths |
| `weddingDate` | Main wedding date for countdown |
| `families` | Both family surnames and parents' names |
| `events` | Dates, times, venues, addresses, map URLs |
| `photos` | Gallery image paths in `public/images/` |
| `sharedAlbum.url` | Google Photos shared album link for guest uploads |
| `music.src` | Path to your MP3 in `public/music/` |
| `hashtag` | Your wedding hashtag |

### Adding Photos

1. Place images in `public/images/` (JPEG, WebP, or PNG)
2. Update paths in `wedding.ts`:
   ```typescript
   photo: "/images/rohit.jpg",
   photos: ["/images/photo1.jpg", "/images/photo2.jpg"],
   ```

### Guest Photo Sharing (Google Photos)

Set `sharedAlbum.url` in `wedding.ts` to your [Google Photos shared album](https://photos.app.goo.gl/vPQqe1g9Uv35TFE39) link.

In Google Photos, open the album → **Share** → enable **Collaborators can add photos**. Guests upload via the link; they cannot delete photos uploaded by others (only their own, if at all). As album owner, you control these permissions in Google Photos.

### Adding Music

1. Add your MP3 to `public/music/wedding-music.mp3`
2. Or update `music.src` in config to your filename

### Map URLs

For each event, set `mapUrl` to a Google Maps link:
```
https://maps.google.com/?q=Venue+Name+Full+Address+City
```

QR codes are auto-generated from these URLs in the Location section.

### Personalized Invitations

Share links with guest names:
```
https://yoursite.com/?guest=Rahul
```

Shows: *"Dear Rahul, you are cordially invited"*

## Deploy to GitHub Pages (free)

Your site will be live at:

**https://demonsclarohit.github.io/rohit-preksha-wedding/**

### One-time setup on GitHub

1. Open your repo: [github.com/demonsclarohit/rohit-preksha-wedding](https://github.com/demonsclarohit/rohit-preksha-wedding)
2. Go to **Settings → Pages**
3. Under **Build and deployment**, set **Source** to **GitHub Actions**
4. Push your latest code to `main`:

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

5. Go to **Actions** tab — the workflow will build and deploy automatically
6. When it finishes (green check), your site is live

Every push to `main` redeploys the site automatically.

### Personalized invitation links on GitHub Pages

```
https://demonsclarohit.github.io/rohit-preksha-wedding/?guest=Rahul
```

## Deploy to Vercel (alternative)

```bash
npm run build
```

1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Deploy — you'll get a shareable link instantly

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- qrcode.react
- canvas-confetti

---

Made with love for Rohit & Preksha
