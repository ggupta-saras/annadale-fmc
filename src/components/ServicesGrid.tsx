"use client";

import { useState } from "react";
import {
  Heart, Baby, Brain, Activity, Stethoscope, Syringe, Users, User, Shield,
  ShieldCheck, Pill as PillIcon, Sun, ScanLine, Video, ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

// Map Sanity icon name strings → Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Baby,
  Brain,
  Activity,
  Stethoscope,
  Syringe,
  Users,
  User,
  Shield,
  ShieldCheck,
  Pill: PillIcon,
  Sun,
  ScanLine,
  Video,
};

// Static fallback category for titles not yet tagged in Sanity
const CATEGORY_FALLBACK: Record<string, string> = {
  "General consultations":      "Everyday",
  "Chronic disease management": "Long-term",
  "Mental health":               "Wellbeing",
  "Child & family health":       "Family",
  "Preventive health":           "Prevention",
  "Immunisations":               "Prevention",
  "Women's health":              "Women's",
  "Men's health":                "Men's",
  "Skin checks":                 "Prevention",
  "Medication management":       "Long-term",
  "Aged care":                   "Long-term",
  "Telehealth":                  "Anywhere",
};

type Tone = "green" | "blue" | "purple";

const CATEGORY_TONE: Record<string, Tone> = {
  Everyday:   "green",
  "Long-term": "green",
  Prevention: "green",
  Family:     "blue",
  "Women's":  "purple",
  "Men's":    "blue",
  Wellbeing:  "purple",
  Anywhere:   "blue",
};

const TONE_CLASSES: Record<Tone, { bg: string; text: string }> = {
  green:  { bg: "bg-green-tint",  text: "text-brand-green-deep" },
  blue:   { bg: "bg-blue-tint",   text: "text-brand-blue" },
  purple: { bg: "bg-purple-tint", text: "text-brand-purple-deep" },
};

const CATEGORIES = ["All", "Everyday", "Long-term", "Prevention", "Family", "Women's", "Men's", "Wellbeing", "Anywhere"];

export interface SanityService {
  _id: string;
  title: string;
  icon: string | null;
  description: string | null;
  category: string | null;
}

export function ServicesGrid({ services }: { services: SanityService[] }) {
  const [filter, setFilter] = useState("All");

  const enriched = services.map((s) => {
    const category = s.category ?? CATEGORY_FALLBACK[s.title] ?? "Everyday";
    const tone: Tone = CATEGORY_TONE[category] ?? "green";
    const Icon: LucideIcon = (s.icon && ICON_MAP[s.icon]) ? ICON_MAP[s.icon] : Stethoscope;
    return { ...s, category, tone, Icon };
  });

  const items = filter === "All" ? enriched : enriched.filter((s) => s.category === filter);

  return (
    <>
      <section className="border-y border-line bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-4 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
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
          {items.map(({ _id, title, description, category, tone, Icon }) => {
            const t = TONE_CLASSES[tone];
            return (
              <div key={_id} className="bg-white rounded-3xl p-6 border border-line hover:shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] transition-shadow group">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-2xl grid place-items-center ${t.bg} ${t.text}`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">{category}</span>
                </div>
                <h3 className="font-display text-[22px] text-ink tracking-tight mt-5">{title}</h3>
                {description && (
                  <p className="text-[14px] text-charcoal/75 mt-2 leading-relaxed">{description}</p>
                )}
                <a
                  href={siteConfig.booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink hover:text-brand-green-deep"
                >
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
