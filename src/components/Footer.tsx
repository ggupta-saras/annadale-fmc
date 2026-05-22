import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3">Annadale FMC</h3>
          <p className="text-cyan-200 text-sm leading-relaxed">
            Providing quality, compassionate general practice care to our community.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-cyan-300 mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-cyan-100">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-cyan-300" />
              <span>Annadale, NSW</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-cyan-300" />
              <a href="tel:0000000000" className="hover:text-white transition-colors">
                (02) 0000 0000
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-cyan-300" />
              <a href="mailto:info@annadalefmc.com.au" className="hover:text-white transition-colors">
                info@annadalefmc.com.au
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-cyan-300 mb-3">Hours</h4>
          <ul className="space-y-1 text-sm text-cyan-100">
            <li className="flex items-center gap-2">
              <Clock size={12} className="text-cyan-300" />
              <span>Mon – Fri: 8:00am – 6:00pm</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={12} className="text-cyan-300" />
              <span>Saturday: 9:00am – 1:00pm</span>
            </li>
            <li className="text-xs text-cyan-300 mt-2">
              After hours: 13SICK (13 7425)
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-cyan-300">
          <span>© {new Date().getFullYear()} Annadale Family Medical Centre. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Complaints</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
