
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* custom fonts */

const chromeFont = localFont({
  src: "./fonts/chrome.ttf",
  variable: "--font-chrome",
});

const digitalFont = localFont({
  src: "./fonts/digital.ttf",
  variable: "--font-digital",
});

const pixelFont = localFont({
  src: "./fonts/pixel.ttf",
  variable: "--font-pixel",
});

const grungeFont = localFont({
  src: "./fonts/grunge.ttf",
  variable: "--font-grunge",
});

export const metadata: Metadata = {
  title: "aura.fm",
  description: "emotionally unstable music diagnostics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${chromeFont.variable}
        ${digitalFont.variable}
        ${pixelFont.variable}
        ${grungeFont.variable}
        h-full
        antialiased
      `}
    >
     
  <body>
  {children}
  </body>
    </html>
  );
}