import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harishlal ME | AI/ML Researcher & Developer",
  description: "Portfolio of Harishlal ME, AI/ML researcher and developer specializing in safety-critical NLP systems and modern web applications.",
};

import { AnimatedCursor } from "@/components/ui/AnimatedCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${outfit.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-neon-cyan selection:text-black`}
      >
        <AnimatedCursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
