import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, HeartHandshake, ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Pill, PersonPortrait } from "@/components/ui";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { slugify } from "@/lib/slugify";

// Fallback refresh (1h). Publishing a service in Sanity also triggers an
// instant refresh via the /api/revalidate webhook + the "services" cache tag.
// That webhook is the primary mechanism; this timer only covers it being
// misconfigured or down. At 60s the pages regenerated about as fast as
// traffic arrived, and this project spent ~109,500 ISR write units in 30
// days against an account-wide Hobby allowance of 200,000. An hour keeps a
// hard freshness ceiling without paying for a rewrite every minute.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Allied Health",
  description: "Allied health services at Annadale Family Medical Centre in Mickleham.",
};

// No lucide ICON_MAP here (unlike /services, whose GP categories use meaningful
// icons): allied health cards show partner logos or nothing at all.

interface AlliedHealthService {
  _id: string;
  title: string;
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
  const [services, practitioners, page]: [
    AlliedHealthService[],
    AlliedHealthPractitioner[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { heroImage?: any } | null,
  ] = await Promise.all([
    client.fetch(
      `*[_type == "service" && category == "Allied Health"] | order(order asc) {
        _id, title, image, externalBookingUrl,
        "description": pt::text(description)
      }`,
      {},
      { next: { tags: ["services"], revalidate: 3600 } }
    ),
    client.fetch(
      `*[_type == "alliedHealthPractitioner"] | order(order asc) {
        _id, name, roleOrService, bio, bookingUrl, photo
      }`,
      {},
      { next: { tags: ["alliedHealthPractitioners"], revalidate: 3600 } }
    ),
    client.fetch(
      `*[_type == "alliedHealthPage"][0]{ heroImage }`,
      {},
      { next: { tags: ["alliedHealthPage"], revalidate: 3600 } }
    ),
  ]);

  // The hero's right column holds a photo once the clinic uploads one. Until
  // then it keeps the "How to book" card, so the column never sits empty —
  // The hero always shows a photo. The clinic can set their own in Studio
  // ("Allied Health Page" -> Header Photo); until then this falls back to the
  // clinic's own branded signage, which is the only landscape shot in /public
  // and makes no claim about what a given allied health service looks like.
  const heroImageSrc = page?.heroImage
    ? urlFor(page.heroImage).width(1200).height(900).fit("crop").url()
    : "/clinic-interior-2.jpg";

  // These claims are derived, never hardcoded: the page previously said
  // "book directly" and named partner-run services while every card still
  // pointed at reception, because the booking URLs hadn't been supplied yet.
  const anyPractitionerBooksDirect = practitioners.some((p) => p.bookingUrl);
  const partnerRunServices = services.filter((s) => s.externalBookingUrl).map((s) => s.title);

  // Keep the last row full. The client keeps adding practitioners, and a fixed
  // column count strands cards in a near-empty row — which is the exact
  // "blank space" they asked us to remove. Pick whichever of 3/4 leaves fewer gaps.
  const gapsAt = (cols: number) => (cols - (practitioners.length % cols)) % cols;
  const practitionerColsClass =
    gapsAt(3) <= gapsAt(4) ? "lg:grid-cols-3" : "lg:grid-cols-4";

  const howToBookCard = (
    <div className="bg-white rounded-3xl border border-line p-6 md:p-7 shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.10)]">
      <h2 className="font-display italic text-[22px] text-ink">How to book</h2>
      <p className="text-charcoal/75 text-[14px] mt-2.5 leading-relaxed">
        {partnerRunServices.length > 0 ? "Most allied" : "Allied"} health services are booked through
        reception — call, or ask at your next visit.
        {partnerRunServices.length > 0 && (
          <> {partnerRunServices.join(" and ")} manage their own bookings directly.</>
        )}
      </p>
      <div className="flex flex-col sm:flex-row gap-2.5 mt-4">
        <a href={siteConfig.phoneHref} className="inline-flex items-center justify-center gap-2 bg-brand-green-deep hover:bg-brand-green-darker text-white font-semibold px-4 py-2.5 rounded-full text-[13px] whitespace-nowrap">
          <Phone size={14} /> Call {siteConfig.phone}
        </a>
        <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-ink/15 hover:bg-ink/5 text-ink font-semibold px-4 py-2.5 rounded-full text-[13px] whitespace-nowrap">
          Contact reception
        </Link>
      </div>
    </div>
  );

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

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-line shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.10)]">
            {/* Images are served unoptimised site-wide (see next.config.ts).
                The local fallback is pre-sized to 1400x946 / 154KB, and the
                Sanity path already returns a correctly-sized image via urlFor(). */}
            <Image
              src={heroImageSrc}
              alt="Annadale Family Medical Centre"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {services.length > 0 ? (
        <section className="pt-8 md:pt-10 pb-14 md:pb-20">
          <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {services.map(({ _id, title, description, image, externalBookingUrl }) => {
              const bookingHref = externalBookingUrl || siteConfig.phoneHref;
              const isExternal = !!externalBookingUrl;
              return (
                // flex-col + mt-auto on the CTA: descriptions vary in length, so
                // without it the booking links sit at different heights across a row.
                <div key={_id} id={slugify(title)} className="scroll-mt-32 bg-white rounded-3xl p-4 sm:p-5 border border-line flex flex-col hover:shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] transition-shadow group">
                  {/* Only rendered once a real partner logo is uploaded. There is no
                      generic-icon fallback here: with none uploaded, every card showed
                      the same placeholder, which read as noise rather than branding.
                      object-contain (not cover) so logos aren't cropped. */}
                  {image && (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden relative bg-white border border-line mb-3 sm:mb-4 p-1.5">
                      <Image
                        src={urlFor(image).width(160).height(160).fit("max").url()}
                        alt={`${title} logo`}
                        fill
                        sizes="(min-width: 640px) 64px, 48px"
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <h3 className="font-display text-[17px] sm:text-[19px] text-ink tracking-tight">{title}</h3>
                  {description && (
                    <p className="text-[13.5px] text-charcoal/75 mt-2 leading-relaxed">{description}</p>
                  )}
                  <a
                    href={bookingHref}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink hover:text-brand-green-deep self-start"
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
              {anyPractitionerBooksDirect ? (
                <>Practitioners you can <em className="italic">book directly.</em></>
              ) : (
                <>The people <em className="italic">behind these services.</em></>
              )}
            </h2>
            {/* Mobile: horizontal cards (photo left, text right) — a 2-up grid here
                squeezes the bio into a ~126px column for no height saving.
                From sm up: vertical portrait cards; column count picked above. */}
            <div className={`grid sm:grid-cols-2 md:grid-cols-3 ${practitionerColsClass} gap-4 md:gap-5`}>
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

      {/* "How to book" sits here now that a photo permanently holds the hero's
          right column. No closing CTA section: the site footer already carries
          one ("Care that's simple to start."). */}
      <section className="pb-8 px-5 md:px-6">
        <div className="max-w-7xl mx-auto">{howToBookCard}</div>
      </section>

      <section className="pb-14 md:pb-20 px-5 md:px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-line p-6 md:p-8">
          <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-10 md:items-start">
            <h2 className="font-display italic text-[22px] md:text-[26px] text-ink whitespace-nowrap">
              How to access these services
            </h2>
            <div>
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
              {/* The facts alone left the patient without a next step: both plans
                  can only be set up by a GP, so say so and give them the link. */}
              <p className="text-[14px] text-charcoal/80 leading-relaxed mt-4 pt-4 border-t border-line">
                Both plans are set up by your GP — book an appointment to check what you&apos;re eligible for.{" "}
                <a
                  href={siteConfig.booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-green-deep hover:underline whitespace-nowrap"
                >
                  Book a GP appointment <ArrowUpRight size={13} className="inline-block align-[-2px]" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
