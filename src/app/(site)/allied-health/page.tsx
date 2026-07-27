import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Calendar, HeartHandshake, Stethoscope, ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Pill, PersonPortrait } from "@/components/ui";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { slugify } from "@/lib/slugify";
import {
  Heart, Baby, Brain, Activity, Syringe, Users, User, Shield,
  ShieldCheck, Pill as PillIcon, Sun, ScanLine, Video,
  type LucideIcon,
} from "lucide-react";

// Fallback refresh (60s). Publishing a service in Sanity also triggers an
// instant refresh via the /api/revalidate webhook + the "services" cache tag.
export const revalidate = 60;

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any | null;
  externalBookingUrl: string | null;
}

interface AlliedHealthPractitioner {
  _id: string;
  name: string;
  roleOrService: string | null;
  bio: string | null;
  bookingUrl: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo: any | null;
}

export default async function AlliedHealthPage() {
  const [services, practitioners]: [AlliedHealthService[], AlliedHealthPractitioner[]] = await Promise.all([
    client.fetch(
      `*[_type == "service" && category == "Allied Health"] | order(order asc) {
        _id, title, icon, image, externalBookingUrl,
        "description": pt::text(description)
      }`,
      {},
      { next: { tags: ["services"], revalidate: 60 } }
    ),
    client.fetch(
      `*[_type == "alliedHealthPractitioner"] | order(order asc) {
        _id, name, roleOrService, bio, bookingUrl, photo
      }`,
      {},
      { next: { tags: ["alliedHealthPractitioners"], revalidate: 60 } }
    ),
  ]);

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
            Allied health covers the physios, dietitians, psychologists and other practitioners who work
            alongside our GPs on the things medicine alone doesn&apos;t fix — movement, nutrition, mental health
            and more. These services are available right here at Annadale FMC. Ask your doctor for a referral,
            or get in touch with reception to find out what&apos;s currently available.
          </p>
        </div>
      </section>

      {services.length > 0 ? (
        <section className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {services.map(({ _id, title, description, icon, image, externalBookingUrl }) => {
              const Icon: LucideIcon = (icon && ICON_MAP[icon]) ? ICON_MAP[icon] : HeartHandshake;
              const bookingHref = externalBookingUrl || siteConfig.phoneHref;
              const isExternal = !!externalBookingUrl;
              return (
                <div key={_id} id={slugify(title)} className="scroll-mt-32 bg-white rounded-3xl p-5 border border-line hover:shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] transition-shadow group">
                  {image ? (
                    <div className="w-14 h-14 rounded-2xl overflow-hidden relative bg-purple-tint">
                      <Image
                        src={urlFor(image).width(112).height(112).fit("crop").url()}
                        alt={title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl grid place-items-center bg-purple-tint text-brand-purple-deep">
                      <Icon size={22} />
                    </div>
                  )}
                  <h3 className="font-display text-[19px] text-ink tracking-tight mt-4">{title}</h3>
                  {description && (
                    <p className="text-[13.5px] text-charcoal/75 mt-2 leading-relaxed">{description}</p>
                  )}
                  <a
                    href={bookingHref}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink hover:text-brand-green-deep"
                  >
                    {isExternal ? "Book online" : "Book through reception"}
                    {isExternal ? <ArrowUpRight size={13} /> : <ArrowRight size={13} />}
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

      {practitioners.length > 0 && (
        <section className="py-14 md:py-20 bg-cream-100/60">
          <div className="max-w-7xl mx-auto px-5 md:px-6">
            <Pill tone="purple" icon={<HeartHandshake size={11} />}>Our allied health team</Pill>
            <h2 className="font-display text-[34px] md:text-[44px] leading-[1.05] tracking-tight text-ink mt-4 mb-8 max-w-2xl">
              Practitioners you can <em className="italic">book directly.</em>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {practitioners.map((p) => {
                const bookingHref = p.bookingUrl || siteConfig.phoneHref;
                const isExternal = !!p.bookingUrl;
                return (
                  <div key={p._id} className="bg-white rounded-3xl border border-line p-4 hover:shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] transition-shadow">
                    <div className="w-[85%] mx-auto">
                      <PersonPortrait name={p.name} color="#862A90" badge={p.roleOrService || "Allied health"} photo={p.photo} />
                    </div>
                    <div className="mt-4">
                      <p className="font-semibold text-ink text-[16px] leading-tight">{p.name}</p>
                      {p.roleOrService && (
                        <p className="text-[12.5px] text-muted mt-0.5">{p.roleOrService}</p>
                      )}
                      {p.bio && (
                        <p className="text-[13.5px] text-charcoal/80 mt-3 leading-relaxed">{p.bio}</p>
                      )}
                      <a
                        href={bookingHref}
                        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink hover:text-brand-green-deep"
                      >
                        {isExternal ? "Book online" : "Book through reception"}
                        {isExternal ? <ArrowUpRight size={13} /> : <ArrowRight size={13} />}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-14 md:py-20 px-5 md:px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-3xl border border-line p-7 md:p-8">
            <h3 className="font-display italic text-[24px] text-ink">How to book</h3>
            <p className="text-charcoal/75 text-[14.5px] mt-3 leading-relaxed">
              Most allied health services are booked through reception — call, or ask at your next visit.
              Infusion Avenue and Kosmetika manage their own bookings directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 mt-5">
              <a href={siteConfig.phoneHref} className="inline-flex items-center justify-center gap-2 bg-brand-green-deep hover:bg-brand-green-darker text-white font-semibold px-5 py-3 rounded-full text-[13.5px]">
                <Phone size={14} /> Call {siteConfig.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-ink/15 hover:bg-ink/5 text-ink font-semibold px-5 py-3 rounded-full text-[13.5px]">
                Contact reception
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-line p-7 md:p-8">
            <h3 className="font-display italic text-[24px] text-ink">How to access these services</h3>
            <ul className="mt-3 space-y-3">
              <li className="flex items-start gap-2.5 text-[14.5px] text-charcoal/80 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-purple-deep shrink-0" />
                <span><strong className="text-ink">Chronic Disease Management Plan</strong> — up to 5 Medicare-rebated allied health visits a year.</span>
              </li>
              <li className="flex items-start gap-2.5 text-[14.5px] text-charcoal/80 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-purple-deep shrink-0" />
                <span><strong className="text-ink">Mental Health Care Plan</strong> — Medicare-rebated psychology sessions.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-5 md:px-6">
        <div className="max-w-5xl mx-auto bg-ink text-cream-100 rounded-[36px] p-8 md:p-12 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div>
            <h2 className="font-display text-[32px] md:text-[42px] leading-[1.08] text-white">
              Care that&apos;s <em className="italic text-brand-green/90">simple to start.</em>
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
