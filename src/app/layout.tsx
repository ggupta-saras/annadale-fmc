import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Annadale FMC", template: "%s | Annadale FMC" },
  description:
    "Annadale Family Medical Centre — quality, compassionate general practice care in our community.",
  openGraph: {
    siteName: "Annadale FMC",
    locale: "en_AU",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
