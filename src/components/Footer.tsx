import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="mb-3">
            <Image
              src="/logo-white.svg"
              alt="Annadale Family Medical Centre"
              width={200}
              height={36}
              className="h-9 w-auto"
            />
          </div>
          <p className="text-blue-200 text-sm leading-relaxed">
            {siteConfig.tagline}
          </p>
          <p className="text-green-300 text-xs mt-2 font-medium">✓ New patients welcome</p>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-blue-300 mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-blue-300" />
              <a
                href={siteConfig.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {siteConfig.address.full}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-blue-300" />
              <a href={siteConfig.phoneHref} className="hover:text-white transition-colors">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-blue-300" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-blue-300 mb-3">Hours</h4>
          <ul className="space-y-1 text-sm text-blue-100">
            {siteConfig.hours.slice(0, 2).map(({ day, time }) => (
              <li key={day} className="flex items-center gap-2">
                <Clock size={12} className="text-blue-300 shrink-0" />
                <span>{day}: {time}</span>
              </li>
            ))}
            <li className="text-xs text-amber-300 mt-2 font-medium">
              After hours: {siteConfig.afterHours.homeDoctors}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-blue-300">
          <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact#feedback" className="hover:text-white transition-colors">Complaints</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
