"use client";

import Link from "next/link";
import Image from "next/image";
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
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-white.svg"
            alt="Annadale Family Medical Centre"
            width={240}
            height={44}
            className="h-10 w-auto"
            priority
          />
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
                  : "text-blue-100 hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteConfig.booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 flex items-center gap-1.5 bg-cta hover:bg-cta-hover text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
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
                pathname === link.href ? "text-blue-300" : "text-blue-100"
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
