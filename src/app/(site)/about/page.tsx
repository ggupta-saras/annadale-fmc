import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Compass, Sparkles, Users, Quote, Check } from "lucide-react";
import { BulkBilledBadge, Pill, FinalCTA } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description: "Annadale Family Medical Centre — an independent, fully bulk-billed family practice in Mickleham, VIC.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-purple-tint/60 blur-3xl" />
          <div className="absolute top-40 right-0 w-[420px] h-[420px] rounded-full bg-green-tint/60 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-16 md:pt-24 pb-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-end">
          <div>
            <Pill tone="cream">Our practice</Pill>
            <h1 className="font-display text-[48px] md:text-[76px] leading-[1.02] tracking-tight text-ink mt-5">
              Where expert medicine
              <br /><em className="italic">meets genuine human care.</em>
            </h1>
            <p className="text-charcoal/75 text-[17px] mt-6 max-w-xl leading-relaxed">
              Annadale Family Medical Centre is an independent, fully bulk-billed practice in Mickleham. We were founded
              on a simple belief: in a growing community, families deserve a doctor who can be there for the long haul.
            </p>
          </div>
          <div>
            <div className="rounded-[28px] overflow-hidden shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] border border-line aspect-[5/4]">
              <Image src="/clinic-welcome.jpg" alt="The Annadale FMC team" width={900} height={720} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-5 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { kpi: "100%", label: "Bulk billed", sub: "Every visit, every patient" },
            { kpi: "7",    label: "Days open",   sub: "Including weekends" },
            { kpi: "3",    label: "Languages",    sub: "English, Cantonese, Mandarin" },
            { kpi: "2",    label: "Locations",   sub: "Mickleham + Beveridge" },
          ].map((k, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-line">
              <p className="font-display italic text-[44px] md:text-[56px] text-ink leading-none">{k.kpi}</p>
              <p className="font-semibold text-ink mt-3">{k.label}</p>
              <p className="text-[12.5px] text-muted mt-1">{k.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[1fr_3fr] gap-8 mb-12">
            <h2 className="font-display italic text-[28px] md:text-[34px] text-brand-green-deep leading-tight">Our story</h2>
            <div className="text-charcoal/80 text-[17px] leading-[1.75] space-y-5">
              <p className="first-letter:font-display first-letter:font-bold first-letter:italic first-letter:text-[64px] first-letter:leading-[0.8] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-brand-green-deep">
                Mickleham is growing fast. New families arrive every month — and they need a doctor who already feels like home. Annadale Family
                Medical Centre exists for them.
              </p>
              <p>
                We&apos;re proudly independent and proudly bulk billed. That means no out-of-pocket cost for your consultation,
                no surprises at the desk, and the freedom to see your doctor as often as you genuinely need to.
              </p>
              <p>
                Our team speaks English, Cantonese and Mandarin. Our GPs care for newborns and great-grandparents, sometimes
                in the same morning. We also run a weekly outreach clinic in Beveridge — because not every family can drive into Mickleham.
              </p>
            </div>
          </div>

          <figure className="relative bg-purple-tint rounded-[28px] p-8 md:p-12 my-12">
            <Quote size={40} className="text-brand-purple-deep/30 absolute -top-5 left-8 bg-cream-50 rounded-full p-1.5" />
            <blockquote className="font-display italic text-[26px] md:text-[34px] text-brand-purple-deep leading-[1.25]">
              &ldquo;We started Annadale because the families of Mickleham deserved a GP they could grow with — not a clinic
              that just moved them through.&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-[13.5px] text-charcoal/80">— Annadale Family Medical Centre</figcaption>
          </figure>
        </div>
      </section>

      <section className="py-16 md:py-20 px-5 md:px-6 bg-cream-100/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Pill tone="green">What we value</Pill>
            <h2 className="font-display text-[40px] md:text-[54px] leading-[1.05] tracking-tight text-ink mt-4">
              Four ideas that shape <em className="italic">every appointment.</em>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              { label: "Compassion", sub: "Unhurried, patient-centred care — listening first.",       color: "#2e7d3a", tint: "bg-green-tint",  Icon: Heart    },
              { label: "Continuity", sub: "See your regular GP. Care that builds on what we know.", color: "#049EE0", tint: "bg-blue-tint",   Icon: Compass  },
              { label: "Quality",    sub: "Evidence-based medicine and ongoing professional learning.", color: "#862A90", tint: "bg-purple-tint", Icon: Sparkles },
              { label: "Community",  sub: "We live here too. Your neighbourhood is personal to us.",   color: "#1B1A17", tint: "bg-cream-200",   Icon: Users    },
            ].map(({ label, sub, color, tint, Icon }, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-line">
                <div className={`w-12 h-12 rounded-2xl grid place-items-center ${tint}`} style={{ color }}><Icon size={22} /></div>
                <h3 className="font-display italic text-[28px] text-ink mt-5">{label}</h3>
                <p className="text-[14px] text-charcoal/75 mt-2 leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="max-w-5xl mx-auto bg-ink text-cream-100 rounded-[36px] p-8 md:p-12 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <BulkBilledBadge size="lg" />
            <h2 className="font-display text-[34px] md:text-[46px] text-white leading-[1.06] mt-5">
              No out-of-pocket cost. <em className="italic text-brand-green/90">For anyone, anytime.</em>
            </h2>
            <p className="text-cream-100/75 mt-5 text-[15.5px] leading-relaxed">
              Every consultation at Annadale is bulk billed to Medicare — including standard visits, long consults, mental health plans,
              chronic disease reviews, immunisations and telehealth. All you need is your Medicare card.
            </p>
          </div>
          <ul className="space-y-3 text-cream-100/85 text-[14.5px]">
            {[
              "Standard & long GP consultations",
              "Children, concession & full-fee patients alike",
              "Mental health care plans",
              "Chronic disease management plans",
              "Telehealth (phone & video)",
              "Beveridge outreach clinic",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 grid place-items-center w-5 h-5 rounded-full bg-brand-green-deep text-white shrink-0">
                  <Check size={11} strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
