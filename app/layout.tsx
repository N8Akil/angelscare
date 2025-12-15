import type { Metadata } from "next";
import { Merriweather, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";

const merriweather = Merriweather({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Angel's Care Home Health",
  description: "Where Compassion Comes Home. Skilled nursing and therapy in St. Louis & Florissant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${merriweather.variable} ${inter.variable} ${dancingScript.variable} antialiased font-sans`}
      >
        {children}
        <MobileCtaBar />
      </body>
    </html>
  );
}
