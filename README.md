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

### Admin page & signed invitation URLs

Open **`/admin`** (not linked from the public site) to log in and generate signed links.

1. Create a password hash:
   ```bash
   npm run hash-admin-password -- "your-strong-password"
   ```
2. Put values in `.env.local` (see [`.env.example`](.env.example)):
   - `NEXT_PUBLIC_ADMIN_PASSWORD_HASH` — the hex hash from step 1  
   - `NEXT_PUBLIC_INVITE_SECRET` — a long random string (HMAC key for invite tokens)
3. For GitHub Pages deploy, add repository secrets with the **same** values:
   - `ADMIN_PASSWORD_HASH`
   - `INVITE_SECRET`  
   The workflow passes them into the static build.

In admin you can set default language, groom/bride side, Wedding and/or Reception events, optional guest name, then **Generate signed URL** and copy it. Guests open `/?i=…`; if the token is tampered with, the site falls back to safe defaults.

**Note:** This is a static GitHub Pages site — the hash and HMAC secret are baked into client JS. That stops casual URL editing; it is not as strong as a real server login.

## Your public URL

You want guests to see **warmwelcome** instead of **demonsclarohit**.  
Note: `https://warmwelcome/rohit-preksha-wedding` is not a valid web address — you need one of these:

### Option A — Free: GitHub organization (recommended)

Create a GitHub org named **`warmwelcome`** and move your repo there.

**Your link becomes:**  
**https://warmwelcome.github.io/rohit-preksha-wedding/**

Steps:

1. Log into GitHub → click your profile → **Your organizations** → **New organization**
2. Name it **`warmwelcome`** (free plan is fine)
3. Open your repo **Settings → General** → **Transfer ownership** → transfer to `warmwelcome`
4. Re-enable Pages on the transferred repo: **Settings → Pages** → branch `gh-pages` → `/ (root)`
5. Share: `https://warmwelcome.github.io/rohit-preksha-wedding/?guest=Name`

No code changes needed — the URL updates automatically after transfer.

### Option B — Custom domain: warmwelcome.com

Buy the domain **warmwelcome.com** (GoDaddy, Namecheap, Google Domains, etc. ~₹800/year).

**Your link becomes:**  
**https://warmwelcome.com**

Steps:

1. Buy **warmwelcome.com**
2. In your domain DNS, add these records (GitHub Pages):
   - `A` → `185.199.108.153`
   - `A` → `185.199.109.153`
   - `A` → `185.199.110.153`
   - `A` → `185.199.111.153`
   - `CNAME` for `www` → `warmwelcome.github.io` (optional)
3. In GitHub repo → **Settings → Secrets and variables → Actions → Variables**
4. Add variable: `CUSTOM_DOMAIN` = `warmwelcome.com`
5. In **Settings → Pages** → Custom domain → enter `warmwelcome.com` → Save
6. Push code — workflow rebuilds with the custom domain

Update `src/config/site.ts` → set `publicUrl: "https://warmwelcome.com"`

## Deploy to GitHub Pages (free)

Default URL after org transfer:

**https://warmwelcome.github.io/rohit-preksha-wedding/**

### ⚠️ Repo must be Public

GitHub Pages is **free only for public repositories**. If your repo is private, you will always see a 404 until you either:

- **Option A (recommended):** Make the repo public — fine for a wedding invite meant to be shared
- **Option B:** Use [Vercel](https://vercel.com) instead (free, works with private repos)

To make the repo public:

1. [Settings → General](https://github.com/warmwelcome/rohit-preksha-wedding/settings) → scroll to **Danger Zone**
2. **Change repository visibility** → **Public**

### One-time Pages setup

1. Push the latest code and wait for **Actions** to finish (green check):

```bash
git add .
git commit -m "Fix GitHub Pages deployment"
git push origin main
```

2. Confirm a `gh-pages` branch exists: **Code** tab → branch dropdown → look for `gh-pages`

3. Open [Settings → Pages](https://github.com/warmwelcome/rohit-preksha-wedding/settings/pages)
4. **Source:** Deploy from a branch
5. **Branch:** `gh-pages` → folder **`/ (root)`** → **Save**

6. Wait 1–3 minutes, then open:  
   **https://warmwelcome.github.io/rohit-preksha-wedding/**

### Still 404?

| Check | Fix |
|---|---|
| Repo is private | Make it public (see above) |
| No `gh-pages` branch | Re-run failed workflow in **Actions** |
| Pages source wrong | Must be `gh-pages` branch, not `main` |
| Wrong URL | Use full URL with repo name (not just `github.io`) |

Every push to `main` redeploys the site automatically.

### Personalized invitation links on GitHub Pages

```
https://warmwelcome.github.io/rohit-preksha-wedding/?guest=Rahul
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
