import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, CalendarDays, AlertTriangle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
// Hours now come from siteConfig — updated to reflect Mon–Sun schedule

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Annadale Family Medical Centre — phone, address, opening hours, and online booking.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-3">Contact Us</h1>
          <p className="text-blue-200">Our team is ready to help. Call, email, or book online — whatever works for you.</p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-bold text-navy text-lg mb-4">Get in Touch</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Phone size={18} className="text-teal shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-navy">Phone</p>
                    <a href={siteConfig.phoneHref} className="text-teal hover:underline text-sm">
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail size={18} className="text-teal shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-navy">Email</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-teal hover:underline text-sm">
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MapPin size={18} className="text-teal shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-navy">Address</p>
                    <p className="text-slate-500 text-sm">
                      {siteConfig.address.street}<br />
                      {siteConfig.address.suburb} {siteConfig.address.state} {siteConfig.address.postcode}
                    </p>
                    <a
                      href={siteConfig.address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-teal hover:underline mt-1 inline-block"
                    >
                      Get directions →
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-navy text-lg mb-4 flex items-center gap-2">
                <Clock size={18} className="text-teal" />
                Opening Hours
              </h2>
              <table className="w-full text-sm">
                <tbody>
                  {siteConfig.hours.map(({ day, time }) => (
                    <tr key={day} className="border-b border-slate-100">
                      <td className="py-2 font-medium text-navy">{day}</td>
                      <td className="py-2 text-right text-slate-500">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Booking + urgent */}
          <div className="space-y-6">
            <div className="bg-navy text-white rounded-xl p-6">
              <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
                <CalendarDays size={18} className="text-blue-300" />
                Book an Appointment
              </h2>
              <p className="text-blue-200 text-sm mb-4">
                Our online booking is open around the clock. Choose a time that suits you.
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
                Prefer to call? Ring us on {siteConfig.phone} during business hours.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h2 className="font-bold text-red-800 mb-2 flex items-center gap-2 text-sm">
                <AlertTriangle size={16} />
                Emergencies
              </h2>
              <p className="text-red-700 text-sm">
                For life-threatening emergencies, call <strong>{siteConfig.afterHours.emergency}</strong> immediately.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h2 className="font-bold text-amber-900 mb-2 text-sm">After Hours Care</h2>
              <ul className="text-amber-800 text-sm space-y-1">
                <li><strong>13SICK:</strong> {siteConfig.afterHours.homeDoctors} — Home visit service</li>
                <li><strong>Healthdirect:</strong> {siteConfig.afterHours.healthdirect} — Free health advice line (24hrs)</li>
                <li>
                  <strong>Nearest ED:</strong>{" "}
                  <a
                    href="https://maps.google.com/?q=Northern+Hospital+Epping+VIC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Northern Hospital, Epping
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-surface border border-slate-200 rounded-xl p-5 text-sm">
              <h2 className="font-bold text-navy mb-2">Feedback &amp; Complaints</h2>
              <p className="text-slate-500 mb-2">
                We welcome feedback to help us improve. Please speak with our Practice Manager
                or email us.
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-teal hover:underline font-medium"
              >
                Send feedback →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-64 bg-slate-200 flex items-center justify-center text-slate-400 text-sm">
        <div className="text-center">
          <MapPin size={32} className="mx-auto mb-2 opacity-40" />
          <p>2/3 Enderby Dr, Mickleham VIC 3064</p>
          <a
            href={siteConfig.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:underline text-xs mt-1 inline-block"
          >
            Open in Google Maps →
          </a>
        </div>
      </section>
    </>
  );
}
