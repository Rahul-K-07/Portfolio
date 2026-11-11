import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RAHUL K. — Between Logic & Chaos",
  description:
    "AI & ML Engineer and Software Developer exploring the space between engineering and creativity.",
  keywords: [
    "Rahul K",
    "AI Engineer",
    "Machine Learning",
    "Software Developer",
    "Portfolio",
    "Creative Developer",
  ],
  authors: [{ name: "Rahul K." }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${ibmPlexMono.variable} scroll-smooth`}
    >
      <body className="bg-bg text-cream font-sans antialiased selection:bg-crimson selection:text-cream">
        <div className="film-grain" aria-hidden="true" />
        <SmoothScroll>
          <Header />
          <main id="main-content">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
