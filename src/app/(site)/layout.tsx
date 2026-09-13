import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { slugify } from "@/lib/slugify";

// Fonts are self-hosted (files in ./fonts) rather than fetched from Google at
// build time. next/font/google downloads the files during every build, so a
// transient failure reaching fonts.gstatic.com fails the whole deploy — that
// happened twice, silently leaving production on an older build. These are the
// same Google-hosted latin-subset woff2 files, just committed to the repo.
const manrope = localFont({
  variable: "--font-manrope",
  display: "swap",
  src: [{ path: "../fonts/Manrope-Variable.woff2", weight: "400 800", style: "normal" }],
});

const playfair = localFont({
  variable: "--font-playfair",
  display: "swap",
  src: [
    { path: "../fonts/PlayfairDisplay-Variable.woff2", weight: "500 900", style: "normal" },
    { path: "../fonts/PlayfairDisplay-Variable-Italic.woff2", weight: "500 900", style: "italic" },
  ],
});

const lobster = localFont({
  variable: "--font-lobster",
  display: "swap",
  src: [{ path: "../fonts/Lobster-Regular.woff2", weight: "400", style: "normal" }],
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

async function getAlliedHealthNavItems() {
  try {
    const services: { title: string }[] = await client.fetch(
      `*[_type == "service" && category == "Allied Health"] | order(order asc) { title }`,
      {},
      { next: { tags: ["services"], revalidate: 3600 } }
    ) ?? [];
    return services.map((s) => ({ label: s.title, href: `/allied-health#${slugify(s.title)}` }));
  } catch {
    return [];
  }
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const alliedHealthItems = await getAlliedHealthNavItems();
  return (
    <div className={`${manrope.variable} ${playfair.variable} ${lobster.variable} min-h-screen flex flex-col bg-cream-50 text-ink font-sans antialiased`}>
      <Navbar alliedHealthItems={alliedHealthItems} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
