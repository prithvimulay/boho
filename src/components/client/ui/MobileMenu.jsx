"use client";

import { useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Architecture", href: "/architecture" },
  { label: "Interiors", href: "/interior" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Studio", href: "/about#studio" },
  { label: "Services", href: "/about#services" },
  { label: "Team", href: "/about#team" },
];

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-40 bg-[var(--color-bg)] flex flex-col transition-transform duration-500 ease-in-out ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-6 h-[var(--nav-height)] border-b border-[var(--color-border)]">
        <Link href="/" onClick={onClose} className="font-serif text-xl tracking-wider">
          BOHO
        </Link>
        <button onClick={onClose} aria-label="Close menu" className="p-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-col gap-1 px-6 pt-10">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-3xl font-serif py-3 border-b border-[var(--color-border)] hover:text-[var(--color-accent)] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto px-6 pb-10 text-sm text-[var(--color-fg-muted)]">
        © 2026 BOHO Studio. All rights reserved.
      </div>
    </div>
  );
}
