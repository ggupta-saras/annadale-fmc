"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Calendar, ArrowUpRight, MapPin, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Logo } from "@/components/Logo";

interface NavChild {
  label: string;
  href: string;
}

interface NavbarProps {
  alliedHealthItems?: NavChild[];
}

export function Navbar({ alliedHealthItems = [] }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileAlliedOpen, setMobileAlliedOpen] = useState(false);

  const navLinks: { label: string; href: string; children?: NavChild[] }[] = [
    { label: "Home",             href: "/" },
    { label: "Medical Services", href: "/services" },
    { label: "Allied Health",    href: "/allied-health", children: alliedHealthItems.length > 0 ? alliedHealthItems : undefined },
    { label: "Beveridge Clinic", href: "/beveridge-clinic" },
    { label: "Our Team",         href: "/our-team" },
    { label: "About",            href: "/about" },
    { label: "Contact",          href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // The target page's content is server-fetched from Sanity and can
    // stream in after the initial shell, so the browser's native jump to
    // a #anchor can fire before the element exists and silently no-op.
    // Poll briefly for it instead of relying on that native behaviour.
    function scrollToHash(hash: string, behavior: ScrollBehavior, reassertUntil = 0) {
      const id = hash.slice(1);
      if (!id) return;
      let attempts = 0;
      const start = Date.now();
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior, block: "start" });
          // On hard loads, something can reset scroll shortly after hydration —
          // keep re-asserting position for a bit rather than trusting one shot.
          if (Date.now() - start < reassertUntil) setTimeout(tryScroll, 100);
        } else if (attempts++ < 20) {
          setTimeout(tryScroll, 50);
        }
      };
      tryScroll();
    }
    scrollToHash(window.location.hash, "auto", 1000);
    const onHashChange = () => scrollToHash(window.location.hash, "smooth");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  return (
    <>
      {/* Pre-header strip */}
      <div className="hidden md:block bg-ink text-cream-100 text-[12.5px] font-medium">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-4 whitespace-nowrap">
          <div className="flex items-center gap-5 text-cream-100/80 min-w-0">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green inline-block" />
              Open today · 9:00am – 5:30pm
            </span>
            <span className="hidden xl:inline-flex items-center gap-1.5 opacity-80">
              <MapPin size={13} /> {siteConfig.address.full}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href={siteConfig.phoneHref} className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={13} /> {siteConfig.phone}
            </a>
            <span className="opacity-60 hidden lg:inline">|</span>
            <span className="opacity-80 hidden lg:inline">
              After hours: {siteConfig.afterHours.homeDoctors} · {siteConfig.afterHours.healthdirect}
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-cream-50/90 backdrop-blur border-b border-line/70 shadow-[0_1px_2px_rgba(27,26,23,.04),0_6px_24px_-8px_rgba(27,26,23,.08)]"
            : "bg-cream-50/0 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center -ml-1 shrink-0">
            <Logo variant="dark" markSize={42} />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));

              if (l.children) {
                return (
                  <div key={l.href} className="relative group">
                    <Link
                      href={l.href}
                      className={`relative flex items-center gap-1 px-2 xl:px-3 py-2 text-[13px] xl:text-[13.5px] font-semibold rounded-full whitespace-nowrap transition-colors ${
                        active ? "text-ink" : "text-charcoal hover:text-ink"
                      }`}
                    >
                      {l.label}
                      <ChevronDown size={14} className="opacity-60 transition-transform group-hover:rotate-180" />
                      {active && (
                        <span className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-brand-green" />
                      )}
                    </Link>
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-150 z-50">
                      <div className="bg-white rounded-2xl border border-line shadow-[0_1px_2px_rgba(27,26,23,.04),0_12px_36px_-12px_rgba(27,26,23,.16)] py-2 min-w-[240px]">
                        {l.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="block px-4 py-2.5 text-[13.5px] font-medium text-charcoal hover:bg-cream-100 hover:text-ink whitespace-nowrap"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-2 xl:px-3 py-2 text-[13px] xl:text-[13.5px] font-semibold rounded-full whitespace-nowrap transition-colors ${
                    active ? "text-ink" : "text-charcoal hover:text-ink"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-brand-green" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <a href={siteConfig.phoneHref} className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold text-ink hover:text-brand-green-deep whitespace-nowrap">
              <Phone size={14} /> {siteConfig.phone}
            </a>
            <a
              href={siteConfig.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-green-deep hover:bg-brand-green-darker text-white font-semibold text-[13.5px] px-4 py-2.5 rounded-full shadow-[0_1px_2px_rgba(27,26,23,.04),0_6px_24px_-8px_rgba(27,26,23,.08)] transition-colors whitespace-nowrap"
            >
              <Calendar size={14} />
              Book Online
              <ArrowUpRight size={13} className="opacity-80" />
            </a>
          </div>

          <button
            className="lg:hidden p-2 rounded-full hover:bg-cream-200 text-ink"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-line bg-cream-50">
            <nav className="px-5 py-4 grid gap-1">
              {navLinks.map((l) => {
                const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));

                if (l.children) {
                  return (
                    <div key={l.href}>
                      <div className="flex items-center">
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className={`flex-1 text-left px-3 py-3 rounded-xl text-[15px] font-semibold ${
                            active ? "bg-green-tint text-brand-green-deep" : "text-ink hover:bg-cream-100"
                          }`}
                        >
                          {l.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileAlliedOpen((v) => !v)}
                          aria-label="Toggle Allied Health submenu"
                          aria-expanded={mobileAlliedOpen}
                          className="p-3 text-ink"
                        >
                          <ChevronDown size={18} className={`transition-transform ${mobileAlliedOpen ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                      {mobileAlliedOpen && (
                        <div className="ml-4 pl-3 border-l border-line grid gap-0.5 mb-1">
                          {l.children.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              onClick={() => setOpen(false)}
                              className="px-3 py-2 rounded-lg text-[14px] font-medium text-charcoal hover:bg-cream-100"
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`text-left px-3 py-3 rounded-xl text-[15px] font-semibold ${
                      active ? "bg-green-tint text-brand-green-deep" : "text-ink hover:bg-cream-100"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <div className="grid grid-cols-2 gap-2 pt-3">
                <a href={siteConfig.phoneHref} className="flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-ink/15 text-ink font-semibold text-sm">
                  <Phone size={15} /> Call
                </a>
                <a href={siteConfig.booking.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-brand-green-deep text-white font-semibold text-sm">
                  <Calendar size={15} /> Book
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
