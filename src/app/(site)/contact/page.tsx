import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, CalendarDays, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Annadale Family Medical Centre — phone, address, opening hours, and online booking.",
};

const hours = [
  { day: "Monday – Friday", time: "8:00am – 6:00pm" },
  { day: "Saturday", time: "9:00am – 1:00pm" },
  { day: "Sunday", time: "Closed" },
  { day: "Public Holidays", time: "Closed" },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-3">Contact Us</h1>
          <p className="text-cyan-200">We&apos;d love to hear from you. Find us below.</p>
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
                    <a href="tel:0200000000" className="text-teal hover:underline text-sm">
                      (02) 0000 0000
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail size={18} className="text-teal shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-navy">Email</p>
                    <a href="mailto:info@annadalefmc.com.au" className="text-teal hover:underline text-sm">
                      info@annadalefmc.com.au
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MapPin size={18} className="text-teal shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-navy">Address</p>
                    <p className="text-slate-500 text-sm">
                      [Street Address]<br />
                      Annadale NSW [Postcode]
                    </p>
                    <a
                      href="https://maps.google.com"
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
                  {hours.map(({ day, time }) => (
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
                <CalendarDays size={18} className="text-cyan-300" />
                Book an Appointment
              </h2>
              <p className="text-cyan-200 text-sm mb-4">
                Book online via our patient portal — available 24/7.
              </p>
              <a
                href="https://www.hotdoc.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-teal hover:bg-cyan-600 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm"
              >
                Book Online
              </a>
              <p className="text-xs text-cyan-300 mt-3">
                Prefer to call? Ring us on (02) 0000 0000 during business hours.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h2 className="font-bold text-red-800 mb-2 flex items-center gap-2 text-sm">
                <AlertTriangle size={16} />
                Emergencies
              </h2>
              <p className="text-red-700 text-sm">
                For life-threatening emergencies, call <strong>000</strong> immediately.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h2 className="font-bold text-amber-900 mb-2 text-sm">After Hours Care</h2>
              <ul className="text-amber-800 text-sm space-y-1">
                <li><strong>13SICK:</strong> 13 7425 — Home visit service</li>
                <li><strong>Healthdirect:</strong> 1800 022 222 — Free health advice line (24hrs)</li>
                <li>
                  <strong>Nearest ED:</strong>{" "}
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="underline">
                    [Local Hospital Emergency]
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-surface border border-slate-200 rounded-xl p-5 text-sm">
              <h2 className="font-bold text-navy mb-2">Feedback & Complaints</h2>
              <p className="text-slate-500 mb-2">
                We welcome feedback to help us improve. Please speak with our Practice Manager
                or email us.
              </p>
              <a
                href="mailto:info@annadalefmc.com.au"
                className="text-teal hover:underline font-medium"
              >
                Send feedback →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-64 bg-slate-200 flex items-center justify-center text-slate-400 text-sm">
        <div className="text-center">
          <MapPin size={32} className="mx-auto mb-2 opacity-40" />
          <p>Google Maps embed — add your clinic address to enable</p>
        </div>
      </section>
    </>
  );
}
