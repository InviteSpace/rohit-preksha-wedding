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
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://invitespace.github.io/rohit-preksha-wedding";
const ogImagePath = "/og-cover.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rohit & Preksha | Wedding Invitation",
  description:
    "You are cordially invited to celebrate the wedding of Rohit and Preksha. Join us for Mehndi, Haldi, Cocktail, Wedding & Reception.",
  openGraph: {
    title: "Rohit & Preksha | Wedding Invitation",
    description: "Join us in celebrating our special day!",
    type: "website",
    url: siteUrl,
    siteName: "Rohit & Preksha Wedding",
    locale: "en_IN",
    images: [
      {
        url: ogImagePath,
        width: 1024,
        height: 938,
        alt: "Rohit & Preksha — Save the Date, Saturday 21 November 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit & Preksha | Wedding Invitation",
    description: "Join us in celebrating our special day!",
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
