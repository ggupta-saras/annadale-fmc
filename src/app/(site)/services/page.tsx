import type { Metadata } from "next";
import { Phone, Calendar } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { BulkBilledBadge, Pill } from "@/components/ui";
import { ServicesGrid, type SanityService } from "@/components/ServicesGrid";
import { client } from "@/sanity/lib/client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Services",
  description: "From everyday illness to complex chronic conditions — full GP care, fully bulk billed, in Mickleham and Beveridge.",
};

export default async function ServicesPage() {
  const services: SanityService[] = await client.fetch(
    `*[_type == "service" && category != "Allied Health"] | order(order asc) {
      _id, title, icon, category,
      "description": pt::text(description)
    }`
  );
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-10 w-[420px] h-[420px] rounded-full bg-green-tint/70 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-16 md:pt-24 pb-12">
          <BulkBilledBadge />
          <h1 className="font-display text-[48px] md:text-[72px] leading-[1.04] tracking-tight text-ink mt-5 max-w-4xl">
            What we treat —
            <br /><em className="italic">everything under one roof.</em>
          </h1>
          <p className="text-charcoal/75 text-[17px] mt-6 max-w-2xl leading-relaxed">
            From everyday illness to complex chronic conditions. Our GPs and nurses provide the full breadth of general practice care, and we&apos;ll refer
            you to trusted specialists when you need them. Every appointment is fully bulk billed.
          </p>
        </div>
      </section>

      <ServicesGrid services={services} />

      <section className="py-12 md:py-16 px-5 md:px-6">
        <div className="max-w-5xl mx-auto bg-ink text-cream-100 rounded-[36px] p-8 md:p-12 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div>
            <Pill tone="green" className="!bg-white/10 !text-cream-100">Not sure where to start?</Pill>
            <h2 className="font-display text-[34px] md:text-[44px] leading-[1.05] text-white mt-4">
              Tell our reception team what&apos;s going on — <em className="italic">they&apos;ll point you to the right doctor.</em>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <a href={siteConfig.phoneHref} className="inline-flex items-center justify-center gap-2 bg-brand-green-deep hover:bg-brand-green-darker text-white font-semibold px-5 py-3.5 rounded-full">
              <Phone size={16} /> Call {siteConfig.phone}
            </a>
            <a href={siteConfig.booking.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/25 hover:bg-white/10 text-white font-semibold px-5 py-3.5 rounded-full">
              <Calendar size={16} /> Book online instead
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
