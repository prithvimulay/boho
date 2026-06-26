"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavDropdown from "@/src/components/client/ui/NavDropdown";
import MobileMenu from "@/src/components/client/ui/MobileMenu";

const ABOUT_ITEMS = [
  { label: "Essence", href: "/about#essence" },
  { label: "Team", href: "/about#team" },
  { label: "Services", href: "/about#services" },
  { label: "Clients", href: "/about#clients" },
];

export default function NavigationBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 h-[var(--nav-height)] bg-[var(--color-ink)] ">
        <nav className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/color.jpg"
              alt="BOHO Logo"
              width={120}
              height={40}
              className="h-18 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 text-sm tracking-wide text-white">
            <li>
              <Link href="/architecture" className="hover:text-[var(--color-accent)] transition-colors">
                Architecture
              </Link>
            </li>
            <li>
              <Link href="/interior" className="hover:text-[var(--color-accent)] transition-colors">
                Interiors
              </Link>
            </li>
            <li>
              <NavDropdown label="About" items={ABOUT_ITEMS} />
            </li>
            <li>
              <Link href="/contact" className="hover:text-[var(--color-accent)] transition-colors">
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white transition-colors"
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