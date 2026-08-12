import Link from "next/link";
import { Calendar, Phone, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Logo } from "@/components/Logo";

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-cream-100 mt-auto">
      {/* Top CTA strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div>
            <h3 className="font-display italic font-bold text-3xl md:text-4xl text-white leading-tight">
              Care that&apos;s <em className="text-brand-green/90">simple to start.</em>
            </h3>
            <p className="text-cream-100/70 mt-3 max-w-lg">
              New patients welcome. Bulk billed, every visit. Book online in under a minute with {siteConfig.booking.provider} — or give us a call.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a
              href={siteConfig.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-green-deep hover:bg-brand-green text-white font-semibold px-5 py-3 rounded-full"
            >
              {/* "Book a GP appointment", not "Book Online": this links to
                  HealthEngine, which books GP consults only. On the Allied Health
                  page it sat under copy saying those services go via reception. */}
              <Calendar size={16} /> Book a GP appointment
            </a>
            <a href={siteConfig.phoneHref} className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white font-semibold px-5 py-3 rounded-full">
              <Phone size={16} /> {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-12 gap-10">
        <div className="col-span-2 md:col-span-4">
          <Logo variant="light" markSize={40} />
          <p className="text-cream-100/65 text-sm mt-5 leading-relaxed max-w-xs">
            A fully bulk-billed family medical centre serving Mickleham, Beveridge and the wider community of Melbourne&apos;s north.
          </p>
          <div className="flex items-center gap-2.5 mt-5">
            {siteConfig.facebook && (
              <a aria-label="Facebook" href={siteConfig.facebook} className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 grid place-items-center text-cream-100/80">
                <FacebookIcon size={15} />
              </a>
            )}
            <a aria-label="Instagram" href="#" className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 grid place-items-center text-cream-100/80">
              <InstagramIcon size={15} />
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-display italic text-xl text-white mb-4">Visit</h4>
          <ul className="space-y-2.5 text-sm text-cream-100/70">
            <li>{siteConfig.address.street}</li>
            <li>{siteConfig.address.suburb} {siteConfig.address.state} {siteConfig.address.postcode}</li>
            <li>
              <a className="hover:text-white inline-flex items-center gap-1" href={siteConfig.address.mapsUrl} target="_blank" rel="noopener noreferrer">
                Open in Maps <ArrowUpRight size={12} />
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-display italic text-xl text-white mb-4">Hours</h4>
          <ul className="space-y-1.5 text-sm text-cream-100/70">
            {siteConfig.hours.map(({ day, time }) => (
              <li key={day} className="flex justify-between gap-3"><span>{day}</span><span className="text-cream-100/90">{time}</span></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-display italic text-xl text-white mb-4">Practice</h4>
          <ul className="space-y-2 text-sm text-cream-100/70">
            <li><Link href="/about" className="hover:text-white">About us</Link></li>
            <li><Link href="/our-team" className="hover:text-white">Our team</Link></li>
            <li><Link href="/services" className="hover:text-white">Medical services</Link></li>
            <li><Link href="/beveridge-clinic" className="hover:text-white">Beveridge clinic</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-display italic text-xl text-white mb-4">After hours</h4>
          <ul className="space-y-2 text-sm text-cream-100/70">
            <li>Home Doctors<br /><span className="text-white font-semibold">{siteConfig.afterHours.homeDoctors}</span></li>
            <li>Healthdirect<br /><span className="text-white font-semibold">{siteConfig.afterHours.healthdirect}</span></li>
            <li>Emergency<br /><span className="text-white font-semibold">{siteConfig.afterHours.emergency}</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-cream-100/50">
          <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/patient-information" className="hover:text-white">Patient Information</Link>
            <Link href="/contact#feedback" className="hover:text-white">Complaints &amp; Feedback</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
