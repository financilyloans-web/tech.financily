import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Preloader from "@/components/motion/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import ProgressBar from "@/components/ProgressBar";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Tech. Financily",
  description:
    "Financily Technologies builds the financial core for a networked world — payments, AI risk engines, real-time analytics, secure infrastructure and APIs. The future of finance, powered by technology.",
  applicationName: "Tech. Financily",
  keywords: [
    "fintech", "payments", "AI risk engines", "real-time analytics",
    "secure infrastructure", "open banking", "APIs",
  ],
  openGraph: {
    title: "Tech. Financily",
    description: "The future of finance, powered by technology.",
    type: "website",
    siteName: "Tech. Financily",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="grain relative bg-ink text-paper antialiased">
        <SmoothScroll />
        <ProgressBar />
        <PageTransition />
        <CustomCursor />
        <Preloader />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
