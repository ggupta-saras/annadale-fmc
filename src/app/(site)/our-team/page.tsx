import type { Metadata } from "next";
import Link from "next/link";
import { Stethoscope, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Pill, FinalCTA } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the doctors, nurses and practice team at Annadale Family Medical Centre in Mickleham.",
};

const DOCTORS = [
  {
    name: "Dr. Simon Goode",
    role: "GP",
    bio: "Dr Simon joined Annadale FMC in 2019. He holds a Bachelor of Human Biology and Bachelor of Medicine and Surgery from Auckland School of Medicine (NZ), and has held GP positions across NSW and VIC.",
    langs: ["English"],
    specialties: ["General practice", "Family medicine", "Preventive care"],
    color: "#049EE0",
  },
  {
    name: "Dr. Wasantha Gunathilake",
    role: "GP · MBBS, FRACGP",
    bio: "Dr Wasantha graduated in Sri Lanka with a background in cardiology before moving to Australia. He started his own GP practice in 2011, serving Bendigo and Geelong communities, obtained his RACGP Fellowship in 2014, and has been with our Craigieburn/Mickleham community since 2015.",
    langs: ["English"],
    specialties: ["Chronic disease", "Cardiology", "Care plans"],
    color: "#2e7d3a",
  },
  {
    name: "Dr. Michael Yuen",
    role: "GP",
    bio: "Dr Michael is an experienced general practitioner providing comprehensive care for individuals and families across all stages of life.",
    langs: ["English", "Cantonese", "Mandarin"],
    specialties: ["General practice", "Family medicine", "Community health"],
    color: "#862A90",
  },
];

const STAFF = [
  { name: "Rosalee",            role: "Practice Manager", focus: "Team leadership, patient care & clinic operations" },
  { name: "Emily & Elaine",     role: "Reception Team",   focus: "Appointments, enquiries & patient support" },
  { name: "Kardinia & Manpreet", role: "Nursing Staff",   focus: "Clinical care, health education & patient assistance" },
];

function DoctorPortrait({ d }: { d: typeof DOCTORS[0] }) {
  const initial = d.name.split(" ").slice(-1)[0][0];
  return (
    <div className="aspect-[4/5] rounded-2xl overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${d.color}26, ${d.color}10)` }}>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display italic font-extrabold text-[64px]" style={{ color: d.color, opacity: .55 }}>{initial}</span>
      </div>
      <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 bg-white/95 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ color: d.color }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />
        Accepting
      </span>
    </div>
  );
}

export default function OurTeamPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 right-0 w-[420px] h-[420px] rounded-full bg-blue-tint/60 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-16 md:pt-24 pb-10">
          <Pill tone="blue" icon={<Stethoscope size={11} />}>Our team</Pill>
          <h1 className="font-display text-[48px] md:text-[76px] leading-[1.02] tracking-tight text-ink mt-5 max-w-4xl">
            Doctors and nurses
            <br /><em className="italic">who stick around.</em>
          </h1>
          <p className="text-charcoal/75 text-[17px] mt-6 max-w-2xl leading-relaxed">
            Continuity is at the heart of what we do — most of our team has been with us since we opened.
            See your regular GP, every time.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <h2 className="font-display italic text-3xl text-charcoal mb-6">General Practitioners</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {DOCTORS.map((d, i) => (
              <div key={i} className="bg-white rounded-3xl border border-line p-5 hover:shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] transition-shadow">
                <DoctorPortrait d={d} />
                <div className="mt-5">
                  <p className="font-semibold text-ink text-[16px] leading-tight">{d.name}</p>
                  <p className="text-[12.5px] text-muted mt-0.5">{d.role}</p>
                  <p className="text-[13.5px] text-charcoal/80 mt-3 leading-relaxed">{d.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {d.specialties.map((s, j) => (
                      <span key={j} className="inline-flex items-center px-2.5 py-1 rounded-full bg-cream-100 text-[11px] font-semibold text-charcoal">{s}</span>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-line flex items-center justify-between gap-3">
                    <p className="text-[11.5px] text-muted">Speaks {d.langs.join(" · ")}</p>
                    <a href={siteConfig.booking.url} target="_blank" rel="noopener noreferrer" className="text-[12.5px] font-semibold text-brand-green-deep hover:underline shrink-0">
                      Book →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-cream-100/60">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <h2 className="font-display italic text-3xl text-charcoal mb-6">Nurses &amp; Practice Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {STAFF.map((n, i) => (
              <div key={i} className="bg-white rounded-3xl border border-line p-6 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-tint grid place-items-center text-brand-blue shrink-0">
                  <span className="font-display italic font-bold text-2xl">{n.name[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-ink">{n.name}</p>
                  <p className="text-[12.5px] text-muted">{n.role}</p>
                  <p className="text-[13px] text-charcoal/75 mt-2">{n.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-5 md:px-6">
        <div className="max-w-5xl mx-auto rounded-3xl border border-line p-7 md:p-10 bg-white">
          <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Languages spoken</p>
              <p className="font-display italic text-[28px] md:text-[34px] text-ink mt-1.5">English · Cantonese · Mandarin</p>
            </div>
            <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 border border-ink/15 hover:bg-ink/5 px-5 py-3 rounded-full font-semibold text-ink">
              Get in touch <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
