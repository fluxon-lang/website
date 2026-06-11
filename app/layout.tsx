import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fluxon-lang.com"),
  title: "Fluxon — the backend language AI agents write well",
  description:
    "Fluxon is an AI-native backend language: one way to do each task, every battery built in, and LLM calls as a language primitive. The full spec fits in one context window.",
  openGraph: {
    title: "Fluxon — the backend language AI agents write well",
    description:
      "The language adapts to the AI, not the AI to the language. One task = one way, batteries included, ~2,700-token spec.",
    url: "https://fluxon-lang.com",
    siteName: "Fluxon",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrument.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
