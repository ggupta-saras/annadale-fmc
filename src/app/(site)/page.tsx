import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar, Phone, ArrowRight, ArrowUpRight, MapPin, Clock,
  Heart, Baby, Shield, Brain, Activity, Stethoscope,
  Video, CheckCircle, Check, Star, Sparkles, Compass,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { BulkBilledBadge, Pill, CTAGroup, TrustStrip, AfterHoursStrip, FinalCTA, PersonPortrait } from "@/components/ui";
import { client } from "@/sanity/lib/client";

// Fallback time-based refresh (60s). Publishing in Sanity also triggers an
// instant refresh via the /api/revalidate webhook + cache tags.
export const revalidate = 60;

// Colours assigned by display order — kept in sync with our-team/page.tsx
// so the same doctor shows the same accent colour on both pages.
const DOCTOR_COLORS = ["#049EE0", "#2e7d3a", "#862A90", "#C8521A", "#1B1A17"];

interface DoctorTeaser {
  _id: string;
  name: string;
  qualifications: string | null;
  specialInterests: string[] | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo: any | null;
}

async function getDoctorTeasers(): Promise<DoctorTeaser[]> {
  try {
    return await client.fetch(
      `*[_type == "doctor"] | order(order asc) [0...3] {
        _id, name, qualifications, specialInterests, photo
      }`,
      {},
      { next: { tags: ["doctors"], revalidate: 60 } }
    ) ?? [];
  } catch {
    return [];
  }
}

interface HomepageCMS {
  metaTitle?: string;
  metaDescription?: string;
  announcementText?: string;
  heroHeading?: string;
  heroSubheading?: string;
}

async function getHomepage(): Promise<HomepageCMS> {
  try {
    return await client.fetch(
      `*[_type == "homepage"][0]{
        metaTitle, metaDescription, announcementText, heroHeading, heroSubheading
      }`,
      {},
      { next: { tags: ["homepage"], revalidate: 60 } }
    ) ?? {};
  } catch {
    return {};
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getHomepage();
  return {
    title: { absolute: cms.metaTitle ?? "Annadale Family Medical Centre — Fully bulk-billed GP in Mickleham" },
    description: cms.metaDescription ?? "A fully bulk-billed family medical centre in Mickleham, VIC. Open 7 days, welcoming new patients. Book online with HealthEngine.",
  };
}

function AnnouncementBar({ text }: { text?: string }) {
  return (
    <div className="bg-brand-green-deep text-white text-[13px] font-semibold">
      <div className="max-w-7xl mx-auto px-5 py-2.5 flex items-center justify-center gap-2 text-center whitespace-nowrap overflow-hidden">
        <Sparkles size={14} className="opacity-80 shrink-0" />
        <span className="opacity-95 truncate">
          {text ?? `Fully bulk billed · New patients welcome · Book online with ${siteConfig.booking.provider}`}
        </span>
      </div>
    </div>
  );
}

function Hero({ heading, subheading }: { heading?: string; subheading?: string }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-green-tint/70 blur-3xl" />
        <div className="absolute top-40 -right-40 w-[480px] h-[480px] rounded-full bg-purple-tint/60 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-12 md:pt-20 pb-16 md:pb-24 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-7">
            <BulkBilledBadge size="lg" />
            <Pill tone="cream" icon={<MapPin size={12} />}>Mickleham · Beveridge</Pill>
          </div>

          <h1 className="font-display text-[44px] md:text-[64px] xl:text-[76px] leading-[1.02] text-ink tracking-tight">
            {heading ?? (
              <>
                Family medicine,
                <br />
                <em className="italic font-extrabold">made personal</em>
                <span className="text-brand-green">.</span>
              </>
            )}
          </h1>

          <p className="mt-7 text-[17px] md:text-[18.5px] text-charcoal/80 leading-relaxed max-w-[560px]">
            {subheading ?? "A neighbourhood practice in Mickleham — open seven days, fully bulk billed, with doctors who take the time to know your whole family. Whether it’s a routine check, a child’s first visit, or ongoing care for a chronic condition, we’re here."}
          </p>

          <div className="mt-9">
            <CTAGroup />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13.5px] text-charcoal/70">
            <span className="inline-flex items-center gap-2"><CheckCircle size={15} className="text-brand-green-deep" /> No out-of-pocket cost</span>
            <span className="inline-flex items-center gap-2"><CheckCircle size={15} className="text-brand-green-deep" /> Open 7 days</span>
            <span className="inline-flex items-center gap-2"><CheckCircle size={15} className="text-brand-green-deep" /> Walk-ins &amp; telehealth</span>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] md:aspect-[5/6] rounded-[28px] overflow-hidden shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] bg-cream-200">
            <Image
              src="/clinic-welcome.jpg"
              alt="The Annadale FMC team at reception in Mickleham"
              width={900}
              height={1100}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute bottom-5 left-5 right-5 md:left-auto md:right-5 md:max-w-[260px] bg-white/95 backdrop-blur rounded-2xl p-4 shadow-[0_1px_2px_rgba(27,26,23,.04),0_6px_24px_-8px_rgba(27,26,23,.08)] border border-white">
              <div className="flex items-center gap-1 text-brand-green-deep">
                {[1,2,3,4,5].map(i => <Star key={i} size={13} className="fill-current" />)}
                <span className="ml-1.5 text-ink text-[12px] font-semibold">Loved locally</span>
              </div>
              <p className="text-[12.5px] text-charcoal/80 mt-2 leading-snug">
                &ldquo;Felt heard, not rushed. The reception team are wonderful with our toddler.&rdquo;
              </p>
              <p className="text-[11px] text-muted mt-1.5">— Patient family, Mickleham</p>
            </div>
          </div>

          <div className="hidden md:flex absolute -top-4 -left-4 items-center gap-3 bg-white rounded-2xl pl-3 pr-4 py-2.5 shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] border border-line whitespace-nowrap z-10">
            <span className="relative grid place-items-center w-9 h-9 rounded-full bg-green-tint shrink-0">
              <span className="absolute inset-0 rounded-full bg-brand-green-deep/20 animate-ping" />
              <Calendar size={16} className="text-brand-green-deep relative" />
            </span>
            <div className="leading-tight">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Accepting patients</p>
              <p className="text-[13.5px] font-bold text-ink mt-0.5">Book online today</p>
            </div>
          </div>

          <div className="hidden md:flex absolute -bottom-6 -right-2 items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] border border-line">
            <div className="flex -space-x-2">
              {[
                {bg:'#E5F6FD', tx:'SG', col:'#049EE0'},
                {bg:'#E6F4E8', tx:'WG', col:'#2e7d3a'},
                {bg:'#F5EAF6', tx:'MY', col:'#862A90'},
              ].map((a,i) => (
                <div key={i} className="w-8 h-8 rounded-full grid place-items-center text-[11px] font-bold border-2 border-white" style={{background:a.bg, color:a.col}}>{a.tx}</div>
              ))}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-ink leading-tight">GPs &amp; nursing team</p>
              <p className="text-[11px] text-muted">English, Cantonese, Mandarin</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { Icon: Heart,       title: "Chronic disease",      desc: "GP management plans for diabetes, hypertension, asthma, COPD and more.",      tone: "green"  as const },
  { Icon: Baby,        title: "Child & family health", desc: "Childhood vaccinations, development checks and care from baby to teen.",       tone: "blue"   as const },
  { Icon: Shield,      title: "Preventive health",    desc: "Annual checks, cancer screening, and lifestyle risk reduction.",               tone: "green"  as const },
  { Icon: Brain,       title: "Mental health",         desc: "GP Mental Health Care Plans, brief counselling and compassionate referrals.", tone: "purple" as const },
  { Icon: Activity,    title: "Women's health",        desc: "Cervical screening, contraception, menopause and antenatal shared care.",     tone: "purple" as const },
  { Icon: Video,       title: "Telehealth",            desc: "Phone or video consults for scripts, results, and follow-ups.",              tone: "blue"   as const },
];

const TONE_CLASSES = {
  green:  { bg: "bg-green-tint",  text: "text-brand-green-deep", ring: "ring-brand-green-deep/15" },
  blue:   { bg: "bg-blue-tint",   text: "text-brand-blue",       ring: "ring-brand-blue/15" },
  purple: { bg: "bg-purple-tint", text: "text-brand-purple-deep",ring: "ring-brand-purple-deep/15" },
};

function ServicesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <Pill tone="green" icon={<Heart size={11} />}>What we do</Pill>
            <h2 className="font-display text-[40px] md:text-[54px] leading-[1.05] tracking-tight text-ink mt-4 max-w-2xl">
              Comprehensive care, <em className="italic">all under one roof.</em>
            </h2>
          </div>
          <p className="text-charcoal/75 max-w-md text-[15.5px] leading-relaxed">
            From your child&apos;s first vaccination to managing a long-term condition — our doctors, nurses and allied health partners look after the whole family.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {SERVICES.map(({ Icon, title, desc, tone }, i) => {
            const t = TONE_CLASSES[tone];
            return (
              <Link key={i} href="/services" className="group text-left bg-white rounded-3xl p-6 border border-line hover:border-ink/15 hover:shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] transition-all block">
                <div className={`w-12 h-12 rounded-2xl grid place-items-center ${t.bg} ${t.text} mb-5 ring-1 ${t.ring}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-[22px] text-ink tracking-tight">{title}</h3>
                <p className="text-[14px] text-charcoal/75 mt-2 leading-relaxed">{desc}</p>
                <div className="flex items-center gap-1.5 mt-5 text-[13px] font-semibold text-ink/70 group-hover:text-brand-green-deep transition-colors">
                  Learn more <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 px-1">
          <p className="text-charcoal/75 text-[14.5px]">Plus immunisations, skin checks, aged care, men&apos;s health, care plans, and minor procedures.</p>
          <Link href="/services" className="inline-flex items-center gap-2 text-brand-green-deep font-semibold hover:gap-3 transition-all">
            View all services <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="relative py-20 md:py-28 bg-ink text-cream-100 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{backgroundImage:"radial-gradient(rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize:"4px 4px"}} />
      <div className="relative max-w-7xl mx-auto px-5 md:px-6 grid lg:grid-cols-[1fr_1fr] gap-14 items-start">
        <div>
          <Pill tone="green" className="!bg-white/10 !text-cream-100" icon={<Compass size={11} />}>Why Annadale</Pill>
          <h2 className="font-display text-[42px] md:text-[58px] leading-[1.04] tracking-tight text-white mt-5">
            Not a clinic where
            <br />you&apos;re just a file —
            <br /><em className="italic text-brand-green/95">a practice that knows you.</em>
          </h2>
          <p className="text-cream-100/70 mt-6 text-[16px] leading-relaxed max-w-lg">
            We started Annadale because Mickleham&apos;s growing families deserved a GP who could be there for the long haul — birthdays, immunisations,
            mental health, the difficult diagnoses. Continuity of care, without a price tag.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/our-team" className="inline-flex items-center gap-2 bg-brand-green-deep hover:bg-brand-green-darker text-white font-semibold px-5 py-3 rounded-full">
              <Heart size={15} /> Meet our doctors
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2 border border-white/25 hover:bg-white/10 text-white font-semibold px-5 py-3 rounded-full">
              Our practice story <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { tag:"Compassion",  body:"Unhurried consults. We listen first — diagnose second.", accent:"#4EB749" },
            { tag:"Continuity",  body:"See your regular GP. Care that builds on what we already know about you.", accent:"#049EE0" },
            { tag:"Community",   body:"We live here too. Our team includes English, Cantonese and Mandarin speakers.", accent:"#862A90" },
            { tag:"Cost",        body:"Every consultation is bulk billed. No surprises at reception.", accent:"#EAB343" },
          ].map((v,i) => (
            <div key={i} className="rounded-3xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{background:v.accent}} />
                <p className="font-display italic text-[22px] text-white">{v.tag}</p>
              </div>
              <p className="text-cream-100/70 text-[14px] leading-relaxed mt-2.5">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeveridgeSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="relative bg-purple-tint rounded-[36px] overflow-hidden p-8 md:p-14 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <svg className="absolute -top-10 -right-10 opacity-30" width={320} height={320} viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#862A90" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#862A90" strokeWidth="1" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="#862A90" strokeWidth="1" />
          </svg>

          <div className="relative">
            <Pill tone="purple" icon={<MapPin size={11} />}>Outreach service · Beveridge</Pill>
            <h2 className="font-display text-[36px] md:text-[50px] leading-[1.05] tracking-tight text-brand-purple-deep mt-5">
              Bringing the practice <em className="italic">closer to you.</em>
            </h2>
            <p className="text-charcoal/80 mt-5 text-[15.5px] leading-relaxed max-w-lg">
              We run a weekly pop-up GP clinic in Beveridge for general consultations, prescriptions, referrals,
              chronic disease reviews and mental health care plans. Same doctors, same standards — Medicare rebates apply.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/beveridge-clinic" className="inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple-deep text-white font-semibold px-5 py-3 rounded-full">
                Beveridge clinic details <ArrowRight size={15} />
              </Link>
              <a href={siteConfig.booking.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-brand-purple/30 hover:bg-white text-brand-purple-deep font-semibold px-5 py-3 rounded-full">
                Book a Beveridge appointment
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-6 shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] border border-white">
              <div className="flex items-center gap-3 pb-4 border-b border-line">
                <div className="w-10 h-10 rounded-2xl bg-purple-tint grid place-items-center text-brand-purple-deep"><Calendar size={18} /></div>
                <div>
                  <p className="font-display italic text-xl text-ink">This week</p>
                  <p className="text-[12px] text-muted">Beveridge pop-up roster</p>
                </div>
              </div>
              <div className="py-4 space-y-2 text-[14px] text-charcoal/80">
                <p>Our GPs rotate through Beveridge on a weekly basis.</p>
                <p className="text-[13px] text-muted">Call us or book online to confirm this week&apos;s sessions.</p>
              </div>
              <a href={siteConfig.booking.url} target="_blank" rel="noopener noreferrer" className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-ink hover:bg-ink/85 text-white font-semibold px-4 py-3 rounded-full text-[14px]">
                Check availability <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DoctorsSection({ doctors }: { doctors: DoctorTeaser[] }) {
  if (doctors.length === 0) return null;

  return (
    <section className="py-20 md:py-24 bg-cream-100/60">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <Pill tone="blue" icon={<Stethoscope size={11} />}>Our doctors</Pill>
            <h2 className="font-display text-[40px] md:text-[54px] leading-[1.05] tracking-tight text-ink mt-4 max-w-2xl">
              Doctors who <em className="italic">stick around.</em>
            </h2>
          </div>
          <Link href="/our-team" className="self-start md:self-end inline-flex items-center gap-2 text-ink hover:text-brand-green-deep font-semibold">
            See full team <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {doctors.map((d, i) => {
            const color = DOCTOR_COLORS[i % DOCTOR_COLORS.length];
            const roleLabel = d.qualifications ? `GP · ${d.qualifications}` : "GP";
            return (
              <div key={d._id} className="bg-white rounded-3xl p-5 border border-line hover:shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] transition-shadow">
                <div className="mb-4">
                  <PersonPortrait name={d.name} color={color} badge="Accepting" photo={d.photo} />
                </div>
                <p className="font-semibold text-ink text-[15px] leading-tight">{d.name}</p>
                <p className="text-[12.5px] text-muted mt-0.5">{roleLabel}</p>
                {d.specialInterests && d.specialInterests.length > 0 && (
                  <p className="text-[12.5px] text-charcoal/75 mt-2 leading-snug">{d.specialInterests.join(", ")}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HoursMap() {
  const today = new Date().getDay();
  const hours = [
    { day: "Mon", range: "9:00 – 5:30",  i: 1 },
    { day: "Tue", range: "9:00 – 5:30",  i: 2 },
    { day: "Wed", range: "9:00 – 5:30",  i: 3 },
    { day: "Thu", range: "9:00 – 5:30",  i: 4 },
    { day: "Fri", range: "9:00 – 5:30",  i: 5 },
    { day: "Sat", range: "10:00 – 4:00", i: 6 },
    { day: "Sun", range: "9:00 – 4:00",  i: 0 },
  ];
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-6 grid lg:grid-cols-[1fr_1.1fr] gap-8">
        <div className="bg-white rounded-3xl p-7 md:p-9 border border-line shadow-[0_1px_2px_rgba(27,26,23,.04),0_6px_24px_-8px_rgba(27,26,23,.08)]">
          <Pill tone="cream" icon={<Clock size={11} />}>Opening hours</Pill>
          <h2 className="font-display text-[34px] md:text-[42px] leading-[1.08] mt-4">
            Open <em className="italic">seven days</em> a week.
          </h2>
          <ul className="mt-7 divide-y divide-line">
            {hours.map((h) => {
              const isToday = h.i === today;
              return (
                <li key={h.day} className={`flex items-center justify-between py-3 ${isToday ? "font-semibold" : ""}`}>
                  <span className={`inline-flex items-center gap-2.5 ${isToday ? "text-ink" : "text-charcoal"}`}>
                    {isToday && <span className="w-2 h-2 rounded-full bg-brand-green-deep inline-block" />}
                    {h.day}
                  </span>
                  <span className={isToday ? "text-brand-green-deep" : "text-charcoal/75"}>{h.range}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 p-4 rounded-2xl bg-cream-100 text-[13px] text-charcoal/80">
            <span className="font-semibold text-ink">Public holidays:</span> Closed. For urgent care call{" "}
            <span className="font-semibold">{siteConfig.afterHours.homeDoctors}</span> or{" "}
            <span className="font-semibold">{siteConfig.afterHours.emergency}</span> in emergencies.
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-line bg-cream-200">
          <svg viewBox="0 0 600 420" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-label="Map of Mickleham">
            <defs>
              <pattern id="grid" width={40} height={40} patternUnits="userSpaceOnUse">
                <path d="M40 0 L0 0 0 40" fill="none" stroke="#E5D8BC" strokeWidth={0.5} />
              </pattern>
            </defs>
            <rect width={600} height={420} fill="#F6F0E4" />
            <rect width={600} height={420} fill="url(#grid)" />
            <path d="M0 240 C 100 200, 280 280, 450 220 S 600 180, 600 180" stroke="#E5D8BC" strokeWidth={22} fill="none" strokeLinecap="round" />
            <path d="M0 240 C 100 200, 280 280, 450 220 S 600 180, 600 180" stroke="#FBF8F2" strokeWidth={14} fill="none" strokeLinecap="round" />
            <path d="M280 0 L 320 420" stroke="#E5D8BC" strokeWidth={18} fill="none" />
            <path d="M280 0 L 320 420" stroke="#FBF8F2" strokeWidth={10} fill="none" />
            <ellipse cx={450} cy={320} rx={120} ry={70} fill="#E6F4E8" opacity={0.8} />
            <g transform="translate(300, 215)">
              <circle r={28} fill="#2e7d3a" opacity={0.15} />
              <circle r={18} fill="#2e7d3a" opacity={0.25} />
              <g transform="translate(0,-22)">
                <path d="M0 0 C -12 0, -20 8, -20 20 C -20 32, -8 44, 0 56 C 8 44, 20 32, 20 20 C 20 8, 12 0, 0 0 Z" fill="#2e7d3a" />
                <circle cy={20} r={7} fill="#FBF8F2" />
              </g>
            </g>
          </svg>

          <div className="absolute bottom-5 left-5 right-5 md:right-auto md:max-w-[300px] bg-white rounded-2xl p-4 shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] border border-white">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Visit us</p>
            <p className="font-display italic text-[22px] text-ink leading-tight mt-1">{siteConfig.address.street}</p>
            <p className="text-[13px] text-charcoal/80">{siteConfig.address.suburb} {siteConfig.address.state} {siteConfig.address.postcode}</p>
            <div className="flex gap-2 mt-3">
              <a href={siteConfig.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 bg-ink text-white rounded-full px-3 py-2 text-[12.5px] font-semibold">
                <MapPin size={13} /> Directions
              </a>
              <a href={siteConfig.phoneHref} className="flex-1 inline-flex items-center justify-center gap-1.5 border border-ink/15 rounded-full px-3 py-2 text-[12.5px] font-semibold text-ink">
                <Phone size={13} /> Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [cms, doctors] = await Promise.all([getHomepage(), getDoctorTeasers()]);
  return (
    <>
      <AnnouncementBar text={cms.announcementText} />
      <Hero heading={cms.heroHeading} subheading={cms.heroSubheading} />
      <TrustStrip />
      <ServicesSection />
      <WhyUs />
      <BeveridgeSection />
      <DoctorsSection doctors={doctors} />
      <HoursMap />
      <AfterHoursStrip />
      <FinalCTA />
    </>
  );
}
