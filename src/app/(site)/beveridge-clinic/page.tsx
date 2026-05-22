import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin, Stethoscope, Heart, Brain, Pill, ClipboardList } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Beveridge Pop-Up Clinic",
  description: "Annadale FMC operates a weekly outreach GP clinic in Beveridge. General consultations, prescriptions, referrals, and more. Medicare rebates available.",
};

const services = [
  { icon: Stethoscope, label: "General consultations" },
  { icon: Pill, label: "Prescriptions" },
  { icon: ClipboardList, label: "Specialist referrals" },
  { icon: Heart, label: "Chronic disease reviews" },
  { icon: Brain, label: "Mental health care plans" },
];

export default function BeveridgeClinicPage() {
  return (
    <>
      <section className="bg-navy text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-2">
            Outreach Service
          </p>
          <h1 className="text-3xl font-bold mb-3">Beveridge Pop-Up GP Clinic</h1>
          <p className="text-blue-200">
            Bringing quality, bulk-billed general practice care closer to Beveridge residents.
          </p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-bold text-navy text-lg mb-4">About This Clinic</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Annadale Family Medical Centre operates a weekly outreach GP clinic in Beveridge,
              providing accessible healthcare to the local community. The clinic runs one day
              per week, by appointment only.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              All services are bulk billed — Medicare rebates are available for eligible patients,
              meaning no out-of-pocket costs.
            </p>

            <h3 className="font-semibold text-navy mb-3">Services Available</h3>
            <ul className="space-y-2">
              {services.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-8 h-8 bg-teal-light rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-teal" />
                  </div>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <div className="bg-navy text-white rounded-xl p-6">
              <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
                <CalendarDays size={18} className="text-blue-300" />
                Book an Appointment
              </h2>
              <p className="text-blue-200 text-sm mb-4">
                Appointments are required — walk-ins are not available at this location.
                Book online or call our main clinic.
              </p>
              <a
                href={siteConfig.booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm"
              >
                Book via {siteConfig.booking.provider}
              </a>
              <p className="text-xs text-blue-300 mt-3">
                Or call <a href={siteConfig.phoneHref} className="underline">{siteConfig.phone}</a>
              </p>
            </div>

            <div className="bg-surface border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-navy text-sm mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-teal" />
                Location
              </h3>
              <p className="text-sm text-slate-600 mb-2">Beveridge, VIC</p>
              <p className="text-xs text-slate-500">
                Exact address provided upon booking. <br />
                <strong>Schedule:</strong> 1 day per week — by appointment only.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-green-800 mb-1">✓ Fully Bulk Billed</p>
              <p className="text-xs text-green-700">
                Medicare rebates available for all eligible services. No gap payments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-surface border-t border-slate-100 text-center">
        <p className="text-slate-500 text-sm mb-3">
          For general enquiries about the Beveridge clinic, contact our main practice:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={siteConfig.phoneHref} className="text-teal font-semibold hover:underline text-sm">
            {siteConfig.phone}
          </a>
          <span className="text-slate-300 hidden sm:block">·</span>
          <a href={`mailto:${siteConfig.email}`} className="text-teal font-semibold hover:underline text-sm">
            {siteConfig.email}
          </a>
          <span className="text-slate-300 hidden sm:block">·</span>
          <Link href="/contact" className="text-teal font-semibold hover:underline text-sm">
            Contact page →
          </Link>
        </div>
      </section>
    </>
  );
}
