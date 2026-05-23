import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Pill, FinalCTA } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Annadale Family Medical Centre — phone, email, address, or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-green-tint/60 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-16 md:pt-24 pb-10">
          <Pill tone="green">Get in touch</Pill>
          <h1 className="font-display text-[48px] md:text-[76px] leading-[1.02] tracking-tight text-ink mt-5 max-w-4xl">
            Visit, call,
            <br /><em className="italic">or send us a note.</em>
          </h1>
          <p className="text-charcoal/75 text-[17px] mt-6 max-w-xl leading-relaxed">
            For appointments, please use online booking or phone. Use the form below for non-urgent enquiries — we&apos;ll
            reply within one business day.
          </p>
        </div>
      </section>

      <section className="py-8 px-5 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-4 md:gap-5">
          {[
            { Icon: Phone,  label: "Phone",   val: siteConfig.phone,   sub: "Mon–Sun, during opening hours", href: siteConfig.phoneHref },
            { Icon: Mail,   label: "Email",   val: siteConfig.email,   sub: "Non-urgent enquiries only",     href: `mailto:${siteConfig.email}` },
            { Icon: MapPin, label: "Address", val: siteConfig.address.full, sub: "Free parking on-site",    href: siteConfig.address.mapsUrl },
          ].map(({ Icon, label, val, sub, href }, i) => (
            <a key={i} href={href} target={i === 2 ? "_blank" : undefined} rel={i === 2 ? "noopener noreferrer" : undefined} className="group bg-white rounded-3xl border border-line p-6 hover:shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.12)] transition-shadow block">
              <div className="w-11 h-11 rounded-2xl bg-green-tint text-brand-green-deep grid place-items-center"><Icon size={20} /></div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mt-5">{label}</p>
              <p className="font-display italic text-[22px] text-ink mt-1 leading-tight">{val}</p>
              <p className="text-[12.5px] text-muted mt-2">{sub}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16 px-5 md:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-8">
          <ContactForm />

          <div className="space-y-5">
            <div className="bg-ink text-cream-100 rounded-3xl p-7">
              <Pill tone="green" className="!bg-white/10 !text-cream-100" icon={<Clock size={11} />}>Opening hours</Pill>
              <ul className="mt-5 divide-y divide-white/10 text-[14px]">
                {[
                  { day: "Monday – Friday", t: "9:00am – 5:30pm" },
                  { day: "Saturday",        t: "10:00am – 4:00pm" },
                  { day: "Sunday",          t: "9:00am – 4:00pm" },
                  { day: "Public Holidays", t: "Closed" },
                ].map((h, i) => (
                  <li key={i} className="flex justify-between py-3"><span className="text-cream-100/80">{h.day}</span><span className="font-semibold">{h.t}</span></li>
                ))}
              </ul>
            </div>
            <div className="bg-sand-tint/70 border border-[#E5D29B] rounded-3xl p-6">
              <p className="font-display italic text-xl text-ink">Outside our hours?</p>
              <ul className="mt-3 space-y-2 text-[13.5px] text-charcoal/85">
                <li><strong>Home Doctors</strong> · {siteConfig.afterHours.homeDoctors}</li>
                <li><strong>Healthdirect</strong> · {siteConfig.afterHours.healthdirect} (24/7 nurse advice)</li>
                <li><strong>Emergency</strong> · {siteConfig.afterHours.emergency}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
