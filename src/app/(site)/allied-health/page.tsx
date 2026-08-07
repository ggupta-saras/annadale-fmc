import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, HeartHandshake, Stethoscope, ArrowRight, ArrowUpRight } from "lucide-react";
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
        <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-12 md:pt-16 pb-8 grid lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-12 items-center">
          <div>
            <Pill tone="purple" icon={<HeartHandshake size={11} />}>Allied health</Pill>
            <h1 className="font-display text-[44px] md:text-[60px] leading-[1.05] tracking-tight text-ink mt-4">
              Care that goes
              <br /><em className="italic">beyond the GP room.</em>
            </h1>
            <p className="text-charcoal/75 text-[16.5px] mt-5 leading-relaxed">
              Allied health covers the physios, dietitians, psychologists and other practitioners who work
              alongside our GPs on the things medicine alone doesn&apos;t fix — movement, nutrition, mental health
              and more. These services are available right here at Annadale FMC.
            </p>
          </div>

          {/* "How to book" lives here rather than further down the page — it fills
              the empty right half of the hero and puts booking details above the fold. */}
          <div className="bg-white rounded-3xl border border-line p-6 md:p-7 shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.10)]">
            <h2 className="font-display italic text-[22px] text-ink">How to book</h2>
            <p className="text-charcoal/75 text-[14px] mt-2.5 leading-relaxed">
              Most allied health services are booked through reception — call, or ask at your next visit.
              Infusion Avenue and Kosmetika manage their own bookings directly.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2.5 mt-4">
              <a href={siteConfig.phoneHref} className="inline-flex items-center justify-center gap-2 bg-brand-green-deep hover:bg-brand-green-darker text-white font-semibold px-4 py-2.5 rounded-full text-[13px] whitespace-nowrap">
                <Phone size={14} /> Call {siteConfig.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-ink/15 hover:bg-ink/5 text-ink font-semibold px-4 py-2.5 rounded-full text-[13px] whitespace-nowrap">
                Contact reception
              </Link>
            </div>
          </div>
        </div>
      </section>

      {services.length > 0 ? (
        <section className="pt-8 md:pt-10 pb-14 md:pb-20">
          <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {services.map(({ _id, title, description, icon, image, externalBookingUrl }) => {
              const Icon: LucideIcon = (icon && ICON_MAP[icon]) ? ICON_MAP[icon] : HeartHandshake;
              const bookingHref = externalBookingUrl || siteConfig.phoneHref;
              const isExternal = !!externalBookingUrl;
              // Icon/logo is smaller on mobile — at a ~160px card width a 56px
              // tile is a third of the card, which reads as padding, not content.
              return (
                <div key={_id} id={slugify(title)} className="scroll-mt-32 bg-white rounded-3xl p-4 sm:p-5 border border-line hover:shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] transition-shadow group">
                  {image ? (
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl overflow-hidden relative bg-purple-tint">
                      <Image
                        src={urlFor(image).width(112).height(112).fit("crop").url()}
                        alt={title}
                        fill
                        sizes="(min-width: 640px) 56px, 40px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl grid place-items-center bg-purple-tint text-brand-purple-deep">
                      <Icon size={22} />
                    </div>
                  )}
                  <h3 className="font-display text-[17px] sm:text-[19px] text-ink tracking-tight mt-3 sm:mt-4">{title}</h3>
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
            {/* Mobile: horizontal cards (photo left, text right) — a 2-up grid here
                squeezes the bio into a ~126px column for no height saving.
                From sm up: the standard vertical portrait card, 4-up on desktop. */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {practitioners.map((p) => {
                const bookingHref = p.bookingUrl || siteConfig.phoneHref;
                const isExternal = !!p.bookingUrl;
                return (
                  <div key={p._id} className="bg-white rounded-3xl border border-line p-4 flex gap-4 items-start sm:block hover:shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] transition-shadow">
                    <div className="w-24 shrink-0 sm:w-[85%] sm:mx-auto">
                      {/* No badge: the role is already shown as text beside/below the
                          portrait, and the label overflows a card this narrow. */}
                      <PersonPortrait name={p.name} color="#862A90" photo={p.photo} />
                    </div>
                    <div className="flex-1 min-w-0 sm:mt-4">
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

      {/* "How to book" now lives in the hero; this is the Medicare half only,
          laid out horizontally so it costs one short band rather than a tall card.
          No closing CTA section here — the site footer already carries one
          ("Care that's simple to start."), and having both stacked was a duplicate. */}
      <section className="pb-14 md:pb-20 px-5 md:px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-line p-6 md:p-8">
          <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-10 md:items-center">
            <h2 className="font-display italic text-[22px] md:text-[26px] text-ink whitespace-nowrap">
              How to access these services
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3 md:gap-6">
              <li className="flex items-start gap-2.5 text-[14px] text-charcoal/80 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-purple-deep shrink-0" />
                <span><strong className="text-ink">Chronic Disease Management Plan</strong> — up to 5 Medicare-rebated allied health visits a year.</span>
              </li>
              <li className="flex items-start gap-2.5 text-[14px] text-charcoal/80 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-purple-deep shrink-0" />
                <span><strong className="text-ink">Mental Health Care Plan</strong> — Medicare-rebated psychology sessions.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
