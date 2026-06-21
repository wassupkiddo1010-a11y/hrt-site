import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/chat/ChatWidget";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HRT.org | Personalized Hormone Health, Guided by Science",
  description:
    "Provider-guided hormone therapy, at-home testing, and personalized treatment options for men and women.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-bg text-text" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-navy-deep focus:text-white focus:rounded-md"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
