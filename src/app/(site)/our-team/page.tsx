import type { Metadata } from "next";
import Link from "next/link";
import { Stethoscope, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Pill, FinalCTA, PersonPortrait } from "@/components/ui";
import { client } from "@/sanity/lib/client";

// Fallback refresh (60s). Publishing a doctor/staff member in Sanity also
// triggers an instant refresh via the /api/revalidate webhook + cache tags.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the doctors, nurses and practice team at Annadale Family Medical Centre in Mickleham.",
};

// Colours assigned by display order — no colour field needed in Sanity
const DOCTOR_COLORS = ["#049EE0", "#2e7d3a", "#862A90", "#C8521A", "#1B1A17"];

// Role → accent colour for staff portrait placeholders
const ROLE_COLORS: Record<string, string> = {
  "Practice Manager": "#C8521A",
  "Receptionist":     "#049EE0",
  "Practice Nurse":   "#2e7d3a",
  "Nurse":            "#2e7d3a",
  "Administration":   "#862A90",
};

interface Doctor {
  _id: string;
  name: string;
  qualifications: string | null;
  bio: string | null;
  specialInterests: string[] | null;
  languages: string[] | null;
  acceptingNewPatients: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo: any | null;
}

interface StaffMember {
  _id: string;
  name: string;
  role: string;
  bio: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo: any | null;
}

export default async function OurTeamPage() {
  const [doctors, staff]: [Doctor[], StaffMember[]] = await Promise.all([
    client.fetch(
      `*[_type == "doctor"] | order(order asc) {
        _id, name, qualifications, photo,
        "bio": pt::text(bio),
        specialInterests, languages, acceptingNewPatients
      }`,
      {},
      { next: { tags: ["doctors"], revalidate: 60 } }
    ),
    client.fetch(
      `*[_type == "staffMember"] | order(order asc) { _id, name, role, bio, photo }`,
      {},
      { next: { tags: ["staff"], revalidate: 60 } }
    ),
  ]);

  // Derive spoken languages across all doctors for the footer strip
  const allLanguages = Array.from(
    new Set(doctors.flatMap((d) => d.languages ?? []))
  );

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
            {doctors.map((d, i) => {
              const color = DOCTOR_COLORS[i % DOCTOR_COLORS.length];
              const roleLabel = d.qualifications ? `GP · ${d.qualifications}` : "GP";
              return (
                <div key={d._id} className="bg-white rounded-3xl border border-line p-5 hover:shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] transition-shadow">
                  <PersonPortrait name={d.name} color={color} badge="Accepting" photo={d.photo} />
                  <div className="mt-5">
                    <p className="font-semibold text-ink text-[16px] leading-tight">{d.name}</p>
                    <p className="text-[12.5px] text-muted mt-0.5">{roleLabel}</p>
                    {d.bio && (
                      <p className="text-[13.5px] text-charcoal/80 mt-3 leading-relaxed">{d.bio}</p>
                    )}
                    {d.specialInterests && d.specialInterests.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {d.specialInterests.map((s, j) => (
                          <span key={j} className="inline-flex items-center px-2.5 py-1 rounded-full bg-cream-100 text-[11px] font-semibold text-charcoal">{s}</span>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 pt-4 border-t border-line flex items-center justify-between gap-3">
                      <p className="text-[11.5px] text-muted">
                        Speaks {(d.languages ?? ["English"]).join(" · ")}
                      </p>
                      <a href={siteConfig.booking.url} target="_blank" rel="noopener noreferrer" className="text-[12.5px] font-semibold text-brand-green-deep hover:underline shrink-0">
                        Book →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-cream-100/60">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <h2 className="font-display italic text-3xl text-charcoal mb-6">Nurses &amp; Practice Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {staff.map((n) => (
              <div key={n._id} className="bg-white rounded-3xl border border-line p-4 hover:shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] transition-shadow">
                <div className="w-[85%] mx-auto">
                  <PersonPortrait name={n.name} color={ROLE_COLORS[n.role] ?? "#049EE0"} badge={n.role} photo={n.photo} />
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-ink text-[16px] leading-tight">{n.name}</p>
                  <p className="text-[12.5px] text-muted mt-0.5">{n.role}</p>
                  {n.bio && (
                    <p className="text-[13.5px] text-charcoal/80 mt-3 leading-relaxed">{n.bio}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {allLanguages.length > 0 && (
        <section className="py-12 px-5 md:px-6">
          <div className="max-w-5xl mx-auto rounded-3xl border border-line p-7 md:p-10 bg-white">
            <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Languages spoken</p>
                <p className="font-display italic text-[28px] md:text-[34px] text-ink mt-1.5">
                  {allLanguages.join(" · ")}
                </p>
              </div>
              <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 border border-ink/15 hover:bg-ink/5 px-5 py-3 rounded-full font-semibold text-ink">
                Get in touch <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
