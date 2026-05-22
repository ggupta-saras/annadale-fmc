"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, CalendarDays, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/our-team" },
  { label: "Services", href: "/services" },
  { label: "Beveridge Clinic", href: "/beveridge-clinic" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-navy text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-tight">Annadale FMC</span>
          <span className="text-xs text-cyan-200 font-medium">Family Medical Centre</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-teal text-white"
                  : "text-cyan-100 hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteConfig.booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 flex items-center gap-1.5 bg-teal hover:bg-cyan-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            <CalendarDays size={14} />
            Book Online
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded hover:bg-white/10"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-navy-dark border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block py-2.5 text-sm font-medium border-b border-white/10 ${
                pathname === link.href ? "text-cyan-300" : "text-cyan-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteConfig.phoneHref}
            className="mt-3 flex items-center gap-2 text-sm font-semibold text-teal"
          >
            <Phone size={14} />
            Call the clinic
          </a>
        </nav>
      )}
    </header>
  );
}
