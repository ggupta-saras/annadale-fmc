import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Calendar, Phone, ArrowRight, ArrowUpRight, Stethoscope, Brain, Baby, Activity, Check } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Pill, FinalCTA } from "@/components/ui";

// HouseHeart is available in lucide-react 1.16.0
import { HouseHeart } from "lucide-react";
// Pill icon from lucide (aliased to avoid conflict with ui Pill)
import { Pill as PillIcon, Wallet } from "lucide-react";

export const metadata: Metadata = {
  title: "Beveridge Clinic",
  description: "Annadale FMC's weekly pop-up GP clinic in Beveridge, VIC — general consultations, chronic disease care, mental health plans and more.",
};

export default function BeveridgePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-purple-tint/60 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-16 md:pt-24 pb-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-end">
          <div>
            <Pill tone="purple" icon={<MapPin size={11} />}>Outreach clinic · Beveridge</Pill>
            <h1 className="font-display text-[48px] md:text-[76px] leading-[1.02] tracking-tight text-ink mt-5">
              The Beveridge
              <br /><em className="italic text-brand-purple-deep">pop-up clinic.</em>
            </h1>
            <p className="text-charcoal/75 text-[17px] mt-6 max-w-xl leading-relaxed">
              We bring our Mickleham GPs to Beveridge twice a week — so families on the northern edge of the growth corridor
              can see their doctor without the drive. Fully bulk billed for all Medicare cardholders, same as our Mickleham practice.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={siteConfig.booking.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple-deep text-white font-semibold px-5 py-3 rounded-full">
                <Calendar size={15} /> Book a Beveridge appointment
              </a>
              <a href={siteConfig.phoneHref} className="inline-flex items-center gap-2 border border-ink/15 hover:bg-ink/5 text-ink font-semibold px-5 py-3 rounded-full">
                <Phone size={15} /> Call to ask
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] border border-line p-6 md:p-7">
            <div className="pb-4 border-b border-line">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Beveridge sessions</p>
              <p className="font-display italic text-2xl text-ink mt-1">Weekly outreach clinic</p>
            </div>
            <div className="py-5 space-y-3 text-[14px] text-charcoal/80">
              <p>Our Mickleham GPs rotate through the Beveridge clinic on a weekly basis.</p>
              <p>To confirm this week&apos;s session times and available doctors, please call us or check online booking.</p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <a href={siteConfig.booking.url} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-ink hover:bg-ink/85 text-white font-semibold px-4 py-3 rounded-full text-[14px]">
                Check availability <ArrowRight size={14} />
              </a>
              <a href={siteConfig.phoneHref} className="w-full inline-flex items-center justify-center gap-2 border border-ink/15 hover:bg-ink/5 text-ink font-semibold px-4 py-3 rounded-full text-[14px]">
                Call {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-5 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-8">What&apos;s available at the Beveridge clinic</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[
              { Icon: Stethoscope, title: "General consultations",     desc: "Acute illness, injuries, scripts and referrals." },
              { Icon: HouseHeart,  title: "Chronic disease reviews",   desc: "Follow-up management plans without travelling to Mickleham." },
              { Icon: Brain,       title: "Mental health plans",       desc: "Mental Health Care Plans and review consultations." },
              { Icon: Baby,        title: "Child & family health",     desc: "Vaccinations, growth checks and general family care." },
              { Icon: Activity,    title: "Women's health",            desc: "Cervical screening, contraception, antenatal shared care." },
              { Icon: PillIcon,    title: "Prescriptions & referrals", desc: "Repeat scripts, specialist referrals and care coordination." },
            ].map(({ Icon, title, desc }, i) => (
              <div key={i} className="bg-white rounded-3xl border border-line p-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-tint text-brand-purple-deep grid place-items-center"><Icon size={22} /></div>
                <h3 className="font-display text-xl mt-4">{title}</h3>
                <p className="text-[13.5px] text-charcoal/75 mt-1.5 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-5 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-purple-tint rounded-3xl p-7 md:p-9">
            <Pill tone="white" icon={<MapPin size={11} />}>Location</Pill>
            <h3 className="font-display italic text-3xl text-brand-purple-deep mt-4">Beveridge Community Hub</h3>
            <p className="text-charcoal/80 mt-3">Beveridge VIC 3753</p>
            <p className="text-[13.5px] text-charcoal/75 mt-4 leading-relaxed">
              Look for the Annadale signage in the community hub. Free on-site parking. Wheelchair accessible.
              Confirm the exact room when you book — we sometimes move between consult rooms.
            </p>
            <a href="https://maps.google.com/?q=Beveridge+Community+Hub+VIC+3753" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple-deep text-white font-semibold px-5 py-3 rounded-full">
              Open in Maps <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="bg-white border border-line rounded-3xl p-7 md:p-9">
            <Pill tone="green" icon={<Wallet size={11} />}>Billing at Beveridge</Pill>
            <h3 className="font-display italic text-3xl text-ink mt-4">Fully bulk billed</h3>
            <p className="text-[14px] text-charcoal/80 mt-4 leading-relaxed">
              The Beveridge outreach clinic is fully bulk billed for all patients with a valid Medicare card —
              the same as our Mickleham practice. No out-of-pocket cost for standard consultations. All you need is your Medicare card.
            </p>
            <ul className="mt-4 space-y-2 text-[13.5px] text-charcoal/80">
              <li className="flex items-start gap-2"><Check size={14} className="text-brand-green-deep mt-1 shrink-0" strokeWidth={3} /> No gap fee for Medicare cardholders</li>
              <li className="flex items-start gap-2"><Check size={14} className="text-brand-green-deep mt-1 shrink-0" strokeWidth={3} /> Same bulk-billing policy as Mickleham</li>
              <li className="flex items-start gap-2"><Check size={14} className="text-brand-green-deep mt-1 shrink-0" strokeWidth={3} /> Standard &amp; long consults, care plans, referrals</li>
            </ul>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
