"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavDropdown from "@/src/components/client/ui/NavDropdown";
import MobileMenu from "@/src/components/client/ui/MobileMenu";

const ABOUT_ITEMS = [
  { label: "Essence", href: "/about#essence" },
  { label: "Team", href: "/about#team" },
  { label: "Services", href: "/about#services" },
  { label: "Clients", href: "/about#clients" },
];

const GROUP_ITEMS = [
  { label: "Studio", href: "/about#studio" },
  { label: "Architecture", href: "/architecture" },
  { label: "Interiors", href: "/interior" },
];

/* Pages that have a full-screen dark hero — nav starts white/transparent */
const HERO_PAGES = ["/"];

export default function NavigationBar() {
  const pathname = usePathname();
  const hasHero = HERO_PAGES.includes(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = hasHero && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 h-[var(--nav-height)] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-[var(--color-border)]"
            : isLight
            ? "bg-transparent"
            : "bg-white border-b border-[var(--color-border)]"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`font-serif text-xl tracking-widest font-light transition-colors ${
              isLight ? "text-white" : "text-[var(--color-fg)]"
            }`}
          >
            BOHO<sup className="text-xs ml-0.5">®</sup>
          </Link>

          {/* Desktop nav */}
          <ul
            className={`hidden md:flex items-center gap-8 text-sm tracking-wide transition-colors ${
              isLight ? "text-white" : "text-[var(--color-fg)]"
            }`}
          >
            <li>
              <Link href="/architecture" className="hover:opacity-60 transition-opacity">
                Architecture
              </Link>
            </li>
            <li>
              <Link href="/interior" className="hover:opacity-60 transition-opacity">
                Interiors
              </Link>
            </li>
            <li>
              <NavDropdown label="About" items={ABOUT_ITEMS} />
            </li>
            <li>
              <NavDropdown label="Group" items={GROUP_ITEMS} />
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 transition-colors ${isLight ? "text-white" : "text-[var(--color-fg)]"}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <path d="M0 1h22M0 8h22M0 15h22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
