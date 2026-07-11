import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rohit & Preksha | Wedding Invitation",
  description:
    "You are cordially invited to celebrate the wedding of Rohit and Preksha. Join us for Mehndi, Haldi, Cocktail, Wedding & Reception.",
  openGraph: {
    title: "Rohit & Preksha | Wedding Invitation",
    description: "Join us in celebrating our special day!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} scroll-smooth`}>
      <head>
        {basePath ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__BASE_PATH__=${JSON.stringify(basePath)};`,
            }}
          />
        ) : null}
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
