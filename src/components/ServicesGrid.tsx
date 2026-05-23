"use client";

import { useState } from "react";
import {
  Heart, Baby, Brain, Activity, Stethoscope, Syringe, Users, Shield,
  Pill as PillIcon, Sun, Video, ArrowRight, type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

type Tone = "green" | "blue" | "purple";
interface ServiceItem {
  Icon: LucideIcon;
  title: string;
  desc: string;
  tone: Tone;
  tag: string;
}

const ALL_SERVICES: ServiceItem[] = [
  { Icon: Stethoscope, title: "General consultations",      desc: "Acute illness, injuries, scripts, referrals — all your day-to-day medical needs.",                              tone: "green",  tag: "Everyday" },
  { Icon: Heart,       title: "Chronic disease management", desc: "GP Management Plans and Team Care for diabetes, hypertension, asthma, COPD, heart disease and more.",           tone: "green",  tag: "Long-term" },
  { Icon: Brain,       title: "Mental health",               desc: "GP Mental Health Treatment Plans, brief counselling and referrals to psychologists or psychiatrists.",           tone: "purple", tag: "Wellbeing" },
  { Icon: Baby,        title: "Child & family health",       desc: "Childhood immunisations, growth & development checks, school health and care for the whole family.",            tone: "blue",   tag: "Family" },
  { Icon: Shield,      title: "Preventive health",           desc: "Annual health assessments, cancer screening (cervical, bowel, skin) and lifestyle risk reduction.",             tone: "green",  tag: "Prevention" },
  { Icon: Syringe,     title: "Immunisations",               desc: "All National Immunisation Program (NIP) vaccines for children and adults, plus flu and travel vaccines.",       tone: "blue",   tag: "Prevention" },
  { Icon: Activity,    title: "Women's health",              desc: "Cervical screening, contraception, menopause management, breast checks and antenatal shared care.",             tone: "purple", tag: "Women's" },
  { Icon: Users,       title: "Men's health",                desc: "Prostate and testicular health, cardiovascular risk, mental health and occupational health.",                   tone: "blue",   tag: "Men's" },
  { Icon: Sun,         title: "Skin checks",                  desc: "Full-body skin cancer checks, mole mapping and minor surgical procedures.",                                     tone: "green",  tag: "Prevention" },
  { Icon: PillIcon,    title: "Medication management",        desc: "Repeat scripts, medication reviews and chronic pain management.",                                               tone: "green",  tag: "Long-term" },
  { Icon: Heart,       title: "Aged care",                    desc: "Comprehensive aged care assessments, care coordination and home medicine reviews.",                             tone: "purple", tag: "Long-term" },
  { Icon: Video,       title: "Telehealth",                   desc: "Phone or video consults from home for scripts, results review, mental health follow-ups and simple referrals.", tone: "blue",   tag: "Anywhere" },
];

const CATEGORIES = ["All","Everyday","Long-term","Prevention","Family","Women's","Men's","Wellbeing","Anywhere"];

const TONE_CLASSES: Record<Tone, { bg: string; text: string }> = {
  green:  { bg: "bg-green-tint",  text: "text-brand-green-deep" },
  blue:   { bg: "bg-blue-tint",   text: "text-brand-blue" },
  purple: { bg: "bg-purple-tint", text: "text-brand-purple-deep" },
};

export function ServicesGrid() {
  const [filter, setFilter] = useState("All");
  const items = filter === "All" ? ALL_SERVICES : ALL_SERVICES.filter((s) => s.tag === filter);

  return (
    <>
      <section className="border-y border-line bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-4 flex gap-2 overflow-x-auto" style={{scrollbarWidth:"none"}}>
          {CATEGORIES.map((cat) => {
            const active = cat === filter;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-[13.5px] font-semibold border transition-colors ${
                  active ? "bg-ink text-white border-ink" : "bg-white text-ink border-line hover:border-ink/30"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map(({ Icon, title, desc, tone, tag }, i) => {
            const t = TONE_CLASSES[tone];
            return (
              <div key={`${title}-${i}`} className="bg-white rounded-3xl p-6 border border-line hover:shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] transition-shadow group">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-2xl grid place-items-center ${t.bg} ${t.text}`}><Icon size={22} /></div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">{tag}</span>
                </div>
                <h3 className="font-display text-[22px] text-ink tracking-tight mt-5">{title}</h3>
                <p className="text-[14px] text-charcoal/75 mt-2 leading-relaxed">{desc}</p>
                <a href={siteConfig.booking.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink hover:text-brand-green-deep">
                  Book this <ArrowRight size={13} />
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
