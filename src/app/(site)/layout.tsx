import type { Metadata } from "next";
import { Manrope, Playfair_Display, Lobster } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Annadale Family Medical Centre", template: "%s | Annadale FMC" },
  description:
    "A fully bulk-billed family medical centre in Mickleham, VIC. Open 7 days, welcoming new patients.",
  openGraph: {
    siteName: "Annadale FMC",
    locale: "en_AU",
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${manrope.variable} ${playfair.variable} ${lobster.variable} min-h-screen flex flex-col bg-cream-50 text-ink font-sans antialiased`}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
