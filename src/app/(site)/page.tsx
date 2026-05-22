import Link from "next/link";
import { CalendarDays, Phone, MapPin, Clock, Heart, Users, Stethoscope, Baby, Wallet, Video } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-3">
            Fully Bulk Billed · Mickleham VIC
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Your Health. Your Family.<br />
            <span className="text-blue-300">Your Community.</span>
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            A community-focused, fully bulk billed general practice delivering high-quality,
            compassionate healthcare for individuals and families of all ages in Mickleham
            and surrounding areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={siteConfig.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <CalendarDays size={18} />
              Book an Appointment
            </a>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 border border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <Phone size={18} />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Quick info bar */}
      <section className="bg-navy-dark text-white py-4 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-2 justify-center">
            <Wallet size={15} />
            <span className="font-medium">Fully Bulk Billed</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Clock size={15} />
            <span>Mon–Sun · Open 7 Days</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Phone size={15} />
            <a href={siteConfig.phoneHref} className="hover:underline">{siteConfig.phone}</a>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <MapPin size={15} />
            <a href={siteConfig.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {siteConfig.address.suburb}, {siteConfig.address.state}
            </a>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-navy mb-3">
            Comprehensive Care Under One Roof
          </h2>
          <p className="text-center text-slate-500 text-sm mb-10 max-w-xl mx-auto">
            Our experienced doctors, nurses, and allied health professionals work together to
            deliver care tailored to your needs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Chronic Disease Management", desc: "Personalised care plans for diabetes, hypertension, asthma, and more." },
              { icon: Baby, title: "Child & Family Health", desc: "Childhood immunisations, growth checks, and care for every age." },
              { icon: Stethoscope, title: "Preventive Health", desc: "Health assessments, cancer screening, and lifestyle risk reduction." },
              { icon: Users, title: "Mental Health", desc: "GP Mental Health Care Plans, referrals, and compassionate ongoing support." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <div className="w-10 h-10 bg-teal-light rounded-full flex items-center justify-center mb-4">
                  <Icon size={20} className="text-teal" />
                </div>
                <h3 className="font-semibold text-navy mb-2">{title}</h3>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="inline-flex items-center text-teal font-semibold hover:underline">
              View all services →
            </Link>
          </div>
        </div>
      </section>

      {/* Beveridge Pop-Up Clinic callout */}
      <section className="py-10 px-4 bg-navy text-white">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-2">Outreach Service</p>
            <h3 className="font-bold text-xl mb-2">Beveridge Pop-Up GP Clinic</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Annadale FMC runs a weekly outreach GP clinic in Beveridge — bringing local
              healthcare closer to you. General consultations, prescriptions, referrals,
              chronic disease reviews, and mental health care plans. Medicare rebates available.
            </p>
          </div>
          <Link
            href="/beveridge-clinic"
            className="shrink-0 inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm"
          >
            Learn more →
          </Link>
        </div>
      </section>

      {/* After hours callout */}
      <section className="py-10 px-4 bg-amber-50 border-y border-amber-100">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-bold text-amber-900 mb-2">Need Care Outside Opening Hours?</h3>
          <p className="text-amber-800 text-sm mb-2">
            Call <strong>{siteConfig.afterHours.homeDoctors}</strong> for a home visit service,
            or <strong>Healthdirect {siteConfig.afterHours.healthdirect}</strong> for free 24-hour health advice.
          </p>
          <p className="text-xs text-amber-700">Life-threatening emergency? Call <strong>000</strong> immediately.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-surface text-center">
        <h2 className="text-2xl font-bold text-navy mb-3">Ready to book?</h2>
        <p className="text-slate-500 mb-6 max-w-xl mx-auto text-sm">
          We welcome new patients. All consultations are fully bulk billed — no out-of-pocket costs.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={siteConfig.booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            <CalendarDays size={18} />
            Book via {siteConfig.booking.provider}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-navy text-navy hover:bg-navy hover:text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            <MapPin size={18} />
            Find Us
          </Link>
          <a
            href="tel:0390388342"
            className="inline-flex items-center gap-2 border border-navy text-navy hover:bg-navy hover:text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            <Video size={18} />
            Telehealth Available
          </a>
        </div>
      </section>
    </>
  );
}
