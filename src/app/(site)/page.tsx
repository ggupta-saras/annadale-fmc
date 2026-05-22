import Link from "next/link";
import { CalendarDays, Phone, MapPin, Clock, Heart, Users, Stethoscope, Baby } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Your Family Doctor,<br />
            <span className="text-cyan-300">Right in Your Community</span>
          </h1>
          <p className="text-lg text-cyan-100 mb-8 max-w-2xl mx-auto">
            Annadale Family Medical Centre provides comprehensive, compassionate general
            practice care for patients of all ages — from newborns to seniors.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://www.hotdoc.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <CalendarDays size={18} />
              Book an Appointment
            </a>
            <a
              href="tel:0200000000"
              className="inline-flex items-center gap-2 border border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <Phone size={18} />
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Quick info bar */}
      <section className="bg-teal text-white py-4 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2 justify-center">
            <Clock size={16} />
            <span>Mon–Fri 8am–6pm · Sat 9am–1pm</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Phone size={16} />
            <a href="tel:0200000000" className="hover:underline">(02) 0000 0000</a>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <MapPin size={16} />
            <span>Annadale, NSW</span>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-navy mb-10">
            How We Can Help
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Chronic Disease Management", desc: "Personalised care plans for diabetes, heart disease, and more." },
              { icon: Baby, title: "Child & Family Health", desc: "Vaccinations, growth checks, and care for every age." },
              { icon: Stethoscope, title: "Preventive Health", desc: "Health assessments, cancer screening, and wellness checks." },
              { icon: Users, title: "Mental Health", desc: "GP Mental Health Plans, referrals, and ongoing support." },
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
            <Link
              href="/services"
              className="inline-flex items-center text-teal font-semibold hover:underline"
            >
              View all services →
            </Link>
          </div>
        </div>
      </section>

      {/* After hours callout */}
      <section className="py-10 px-4 bg-amber-50 border-y border-amber-100">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-bold text-amber-900 mb-2">After Hours & Urgent Care</h3>
          <p className="text-amber-800 text-sm mb-3">
            If you need medical care outside our opening hours, please call{" "}
            <strong>13SICK (13 7425)</strong> for a home visit service, or in an emergency
            call <strong>000</strong>.
          </p>
          <p className="text-xs text-amber-700">
            For non-urgent after-hours advice, the{" "}
            <strong>Healthdirect helpline is 1800 022 222</strong> (24 hours, free).
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-navy text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to become a patient?</h2>
        <p className="text-cyan-200 mb-6 max-w-xl mx-auto text-sm">
          We welcome new patients. Book online or call us to make your first appointment.
        </p>
        <a
          href="https://www.hotdoc.com.au"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-teal hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          <CalendarDays size={18} />
          Book Online
        </a>
      </section>
    </>
  );
}
