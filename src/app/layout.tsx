import type { Metadata } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Great_Vibes,
  Noto_Serif_Devanagari,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://invitespace.github.io/rohit-preksha-wedding";
const ogTitle = "Rohit & Preksha | Wedding Invitation";
const ogDescription = "Join us in celebrating our special day!";
const ogImagePath = "/og-whatsapp.jpg";
const ogImageWidth = 1200;
const ogImageHeight = 630;
const ogImageUrl = `${siteUrl.replace(/\/$/, "")}${ogImagePath}`;
const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: ogTitle,
  description:
    "You are cordially invited to celebrate the wedding of Rohit and Preksha. Join us for Mehndi, Haldi, Cocktail, Wedding & Reception.",
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    type: "website",
    url: siteUrl,
    siteName: "Rohit & Preksha Wedding",
    locale: "en_IN",
    images: [
      {
        url: ogImagePath,
        width: ogImageWidth,
        height: ogImageHeight,
        type: "image/jpeg",
        alt: "Rohit & Preksha — Save the Date, Saturday 21 November 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [ogImagePath],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} ${notoDevanagari.variable} scroll-smooth`}
    >
      <head>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content={String(ogImageWidth)} />
        <meta property="og:image:height" content={String(ogImageHeight)} />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta name="twitter:image" content={ogImageUrl} />
        {facebookAppId ? (
          <meta property="fb:app_id" content={facebookAppId} />
        ) : null}
        {basePath ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__BASE_PATH__=${JSON.stringify(basePath)};`,
            }}
          />
        ) : null}
      </head>
      <body className="font-body font-medium antialiased">{children}</body>
    </html>
  );
}
