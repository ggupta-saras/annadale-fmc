import type { Metadata } from "next";
import {
  Heart, Baby, Brain, Activity, Stethoscope, Syringe,
  Users, Shield, Pill, Eye, Clipboard, Sun, Video,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the full range of general practice services available at Annadale FMC.",
};

const services = [
  { icon: Stethoscope, title: "General Consultations", desc: "Acute illness, injuries, referrals, and all day-to-day medical needs." },
  { icon: Heart, title: "Chronic Disease Management", desc: "Personalised care plans for diabetes, hypertension, asthma, COPD, and more. Includes GP Management Plans and Team Care Arrangements." },
  { icon: Brain, title: "Mental Health", desc: "GP Mental Health Treatment Plans, brief counselling, and referrals to psychologists and psychiatrists." },
  { icon: Baby, title: "Child & Family Health", desc: "Vaccinations, growth and development checks, school health, and care for the whole family." },
  { icon: Shield, title: "Preventive Health", desc: "Annual health assessments, cancer screening (cervical, bowel, skin), and lifestyle risk reduction." },
  { icon: Syringe, title: "Immunisations", desc: "All National Immunisation Program (NIP) vaccines for children and adults, including flu and travel vaccines." },
  { icon: Activity, title: "Women's Health", desc: "Pap smears, contraception, menopause management, breast checks, and antenatal shared care." },
  { icon: Users, title: "Men's Health", desc: "Prostate and testicular health, cardiovascular risk, mental health, and occupational health." },
  { icon: Sun, title: "Skin Checks", desc: "Skin cancer checks, mole mapping, and minor surgical procedures." },
  { icon: Pill, title: "Medication Management", desc: "Medication reviews, repeat prescriptions, and chronic pain management." },
  { icon: Eye, title: "Aged Care", desc: "Comprehensive aged care assessments, care coordination, and home medicine reviews." },
  { icon: Clipboard, title: "Care Plans & Referrals", desc: "Specialist referrals, allied health referrals, and care plan coordination." },
  { icon: Video, title: "Telehealth Consultations", desc: "Consult your GP from home — ideal for script renewals, results review, mental health follow-ups, and simple referrals. Some consultations require an in-person visit." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-3">What We Treat</h1>
          <p className="text-cyan-200">
            From everyday illness to complex chronic conditions — everything under one roof, with doctors who know you.
          </p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-teal-light rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-teal" />
                  </div>
                  <h3 className="font-semibold text-navy text-sm">{title}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-teal-light rounded-xl p-6 border border-cyan-100">
            <h2 className="font-bold text-navy mb-2">Something else on your mind?</h2>
            <p className="text-sm text-slate-500 mb-3">
              Our GPs provide broad general practice care. If you&apos;re unsure whether we can
              help, call us and our friendly reception team will assist you.
            </p>
            <a
              href="tel:0200000000"
              className="inline-flex items-center text-sm font-semibold text-teal hover:underline"
            >
              Call (02) 0000 0000 →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
