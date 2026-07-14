import type { Metadata } from "next";
import { Phone, Calendar, HeartHandshake, Stethoscope, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Pill } from "@/components/ui";
import { client } from "@/sanity/lib/client";
import {
  Heart, Baby, Brain, Activity, Syringe, Users, User, Shield,
  ShieldCheck, Pill as PillIcon, Sun, ScanLine, Video,
  type LucideIcon,
} from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Allied Health",
  description: "Allied health services at Annadale Family Medical Centre in Mickleham.",
};

const ICON_MAP: Record<string, LucideIcon> = {
  Heart, Baby, Brain, Activity, Stethoscope, Syringe, Users, User, Shield,
  ShieldCheck, Pill: PillIcon, Sun, ScanLine, Video, HeartHandshake,
};

interface AlliedHealthService {
  _id: string;
  title: string;
  icon: string | null;
  description: string | null;
}

export default async function AlliedHealthPage() {
  const services: AlliedHealthService[] = await client.fetch(
    `*[_type == "service" && category == "Allied Health"] | order(order asc) {
      _id, title, icon,
      "description": pt::text(description)
    }`
  );

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-10 w-[420px] h-[420px] rounded-full bg-purple-tint/70 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-16 md:pt-24 pb-12">
          <Pill tone="purple" icon={<HeartHandshake size={11} />}>Allied health</Pill>
          <h1 className="font-display text-[48px] md:text-[72px] leading-[1.04] tracking-tight text-ink mt-5 max-w-4xl">
            Care that goes
            <br /><em className="italic">beyond the GP room.</em>
          </h1>
          <p className="text-charcoal/75 text-[17px] mt-6 max-w-2xl leading-relaxed">
            Our GPs work alongside allied health practitioners to look after the whole family — ask your
            doctor for a referral, or get in touch with reception to find out what&apos;s currently available.
          </p>
        </div>
      </section>

      {services.length > 0 ? (
        <section className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-5 md:px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {services.map(({ _id, title, description, icon }) => {
              const Icon: LucideIcon = (icon && ICON_MAP[icon]) ? ICON_MAP[icon] : HeartHandshake;
              return (
                <div key={_id} className="bg-white rounded-3xl p-6 border border-line hover:shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] transition-shadow group">
                  <div className="w-12 h-12 rounded-2xl grid place-items-center bg-purple-tint text-brand-purple-deep">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-[22px] text-ink tracking-tight mt-5">{title}</h3>
                  {description && (
                    <p className="text-[14px] text-charcoal/75 mt-2 leading-relaxed">{description}</p>
                  )}
                  <a
                    href={siteConfig.phoneHref}
                    className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink hover:text-brand-green-deep"
                  >
                    Ask reception <ArrowRight size={13} />
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="py-14 md:py-20 px-5 md:px-6">
          <div className="max-w-3xl mx-auto text-center bg-white rounded-3xl border border-line p-10 md:p-14">
            <div className="w-14 h-14 rounded-2xl grid place-items-center bg-purple-tint text-brand-purple-deep mx-auto">
              <HeartHandshake size={26} />
            </div>
            <h2 className="font-display italic text-[26px] md:text-[32px] text-ink mt-5">
              Details coming soon.
            </h2>
            <p className="text-charcoal/75 text-[15px] mt-3 leading-relaxed">
              Call reception to ask about allied health referrals and availability at Annadale FMC.
            </p>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16 px-5 md:px-6">
        <div className="max-w-5xl mx-auto bg-ink text-cream-100 rounded-[36px] p-8 md:p-12 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div>
            <Pill tone="green" className="!bg-white/10 !text-cream-100">Need a referral?</Pill>
            <h2 className="font-display text-[34px] md:text-[44px] leading-[1.05] text-white mt-4">
              Speak to your GP first — <em className="italic">they&apos;ll organise the right referral for you.</em>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <a href={siteConfig.phoneHref} className="inline-flex items-center justify-center gap-2 bg-brand-green-deep hover:bg-brand-green-darker text-white font-semibold px-5 py-3.5 rounded-full">
              <Phone size={16} /> Call {siteConfig.phone}
            </a>
            <a href={siteConfig.booking.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/25 hover:bg-white/10 text-white font-semibold px-5 py-3.5 rounded-full">
              <Calendar size={16} /> Book a GP appointment
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
