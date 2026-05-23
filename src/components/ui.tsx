import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Check, Calendar, Phone, ArrowRight, ArrowUpRight, MapPin, Wallet, Clock, Heart, Video } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

// ── Bulk-billed badge — the single most important brand element on the page
export function BulkBilledBadge({
  size = "md",
  className = "",
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  const isLg = size === "lg";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-brand-green-deep text-white font-semibold whitespace-nowrap ${
        isLg ? "px-4 py-2 text-[13.5px]" : "px-3 py-1.5 text-[12.5px]"
      } ${className}`}
    >
      <span className="grid place-items-center w-5 h-5 rounded-full bg-white/20">
        <Check size={12} strokeWidth={3} />
      </span>
      <span className="uppercase tracking-wider">Fully Bulk Billed</span>
    </span>
  );
}

// ── Generic pill chip
type PillTone = "ink" | "green" | "blue" | "purple" | "white" | "cream";
type PillSize = "xs" | "sm" | "md";
const PILL_TONES: Record<PillTone, string> = {
  ink:    "bg-ink/5 text-ink",
  green:  "bg-green-tint text-brand-green-deep",
  blue:   "bg-blue-tint text-brand-blue",
  purple: "bg-purple-tint text-brand-purple-deep",
  white:  "bg-white text-ink border border-line",
  cream:  "bg-cream-100 text-charcoal",
};
const PILL_SIZES: Record<PillSize, string> = {
  xs: "px-2.5 py-1 text-[11px]",
  sm: "px-3 py-1.5 text-[12px]",
  md: "px-3.5 py-2 text-[13px]",
};
export function Pill({
  children,
  tone = "ink",
  size = "sm",
  icon,
  className = "",
}: {
  children: React.ReactNode;
  tone?: PillTone;
  size?: PillSize;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wider whitespace-nowrap ${PILL_TONES[tone]} ${PILL_SIZES[size]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}

// ── Primary CTA pair (Book Online + Phone)
export function CTAGroup({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={siteConfig.booking.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 bg-brand-green-deep hover:bg-brand-green-darker text-white font-semibold px-6 py-3.5 rounded-full shadow-[0_1px_2px_rgba(27,26,23,.04),0_6px_24px_-8px_rgba(27,26,23,.08)] transition-all hover:-translate-y-px"
      >
        <Calendar size={17} />
        Book Online — {siteConfig.booking.provider}
        <ArrowRight size={15} className="opacity-80" />
      </a>
      <a
        href={siteConfig.phoneHref}
        className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-semibold border ${
          variant === "dark"
            ? "border-white/25 text-white hover:bg-white/10"
            : "border-ink/15 text-ink hover:bg-ink/5"
        }`}
      >
        <Phone size={16} /> {siteConfig.phone}
      </a>
    </div>
  );
}

// ── Trust strip (4 facts) — used on home page
export function TrustStrip() {
  const items: { Icon: LucideIcon; title: string; sub: string }[] = [
    { Icon: Wallet, title: "Fully bulk billed",   sub: "No out-of-pocket cost" },
    { Icon: Clock,  title: "Open 7 days",          sub: "Including weekends" },
    { Icon: Heart,  title: "New patients welcome", sub: "Families & individuals" },
    { Icon: Video,  title: "Telehealth available", sub: "Consult from home" },
  ];
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="bg-white border border-line rounded-3xl shadow-[0_1px_2px_rgba(27,26,23,.04),0_6px_24px_-8px_rgba(27,26,23,.08)] grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-line overflow-hidden">
          {items.map(({ Icon, title, sub }, i) => (
            <div key={i} className="flex items-center gap-4 p-5 md:p-6">
              <div className="w-11 h-11 grid place-items-center rounded-2xl bg-green-tint text-brand-green-deep shrink-0">
                <Icon size={20} />
              </div>
              <div>
                <p className="font-semibold text-ink text-[14.5px] leading-tight">{title}</p>
                <p className="text-[12.5px] text-muted mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── After-hours warning strip
export function AfterHoursStrip() {
  return (
    <section className="py-12 px-5 md:px-6">
      <div className="max-w-7xl mx-auto rounded-3xl bg-sand-tint/70 border border-[#E5D29B] p-6 md:p-8 grid md:grid-cols-[1fr_auto_auto] gap-4 md:gap-8 items-center">
        <div>
          <p className="font-display italic font-bold text-[22px] md:text-[26px] text-ink leading-tight">Need care outside our hours?</p>
          <p className="text-[13.5px] text-charcoal/80 mt-1">Home visits via Home Doctors, or free 24-hr nurse advice via Healthdirect.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2.5 md:gap-3">
          <a href="tel:137425" className="inline-flex items-center gap-2 bg-white border border-ink/10 rounded-full px-4 py-2.5 text-[13.5px] font-semibold text-ink hover:bg-cream-100">
            <Phone size={14} /> Home Doctors · 13 74 25
          </a>
          <a href="tel:1800022222" className="inline-flex items-center gap-2 bg-white border border-ink/10 rounded-full px-4 py-2.5 text-[13.5px] font-semibold text-ink hover:bg-cream-100">
            <Phone size={14} /> Healthdirect · 1800 022 222
          </a>
        </div>
        <div className="md:border-l md:border-[#E5D29B]/80 md:pl-6">
          <p className="text-[11px] uppercase tracking-wider text-[#9C7821] font-bold">Emergency</p>
          <p className="font-display italic text-2xl text-[#76571A]">Call 000</p>
        </div>
      </div>
    </section>
  );
}

// ── Final centred CTA used on most pages
export function FinalCTA() {
  return (
    <section className="py-20 md:py-28 px-5 md:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <BulkBilledBadge size="lg" />
        <h2 className="font-display text-[48px] md:text-[72px] leading-[1.02] tracking-tight text-ink mt-6">
          A doctor who knows you.
          <br />
          <em className="italic text-brand-green-deep">Just down the road.</em>
        </h2>
        <p className="text-charcoal/75 text-[16.5px] mt-5 max-w-xl mx-auto leading-relaxed">
          We can usually see new patients within a few days. Book online with {siteConfig.booking.provider}, or call us — we&apos;ll find a time that suits.
        </p>
        <div className="flex justify-center mt-9">
          <CTAGroup />
        </div>
      </div>
    </section>
  );
}
