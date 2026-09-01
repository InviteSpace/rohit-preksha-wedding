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

const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID?.trim();

export const metadata: Metadata = {
  title: "Rohit & Preksha | Wedding Invitation",
  description:
    "You are cordially invited to celebrate the wedding of Rohit and Preksha. Join us for Mehndi, Haldi, Cocktail, Wedding & Reception.",
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
