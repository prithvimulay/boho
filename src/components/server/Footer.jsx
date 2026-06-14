import Link from "next/link";

const FOOTER_COLS = [
  {
    heading: "Projects",
    links: [
      { label: "Architecture", href: "/architecture" },
      { label: "Interiors", href: "/interior" },
      { label: "All projects", href: "/architecture" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Essence", href: "/about#essence" },
      { label: "Team", href: "/about#team" },
      { label: "Services", href: "/about#services" },
      { label: "Clients", href: "/about#clients" },
    ],
  },
  {
    heading: "Follow",
    links: [
      { label: "Instagram ↗", href: "https://instagram.com" },
      { label: "Pinterest ↗", href: "https://pinterest.com" },
      { label: "LinkedIn ↗", href: "https://linkedin.com" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Let's talk ↗", href: "/contact" },
      { label: "WhatsApp ↗", href: "https://wa.me/91XXXXXXXXXX" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white">
      {/* Top CTA row */}
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-white/10">
        <Link
          href="/"
          className="font-serif text-2xl tracking-widest font-light"
        >
          BOHO<sup className="text-xs ml-0.5">®</sup>
        </Link>

        <Link
          id="footer-talk"
          href="/contact"
          className="group flex items-center gap-4 text-4xl sm:text-5xl font-serif font-light transition-colors hover:text-[var(--color-accent)]"
        >
          Let&rsquo;s talk
          <span
            id="footer-talk-arrow"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/40 group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-ink)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 13L13 3M13 3H5M13 3v8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>

      {/* Link columns */}
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-10">
        {FOOTER_COLS.map((col) => (
          <div key={col.heading}>
            <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-5">
              {col.heading}
            </p>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1400px] mx-auto px-6 py-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/40">
        <p>© 2026 BOHO Studio. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
          <Link href="/legal" className="hover:text-white/70 transition-colors">Legal Notice</Link>
          <Link href="/cookies" className="hover:text-white/70 transition-colors">Cookies Policy</Link>
        </div>
      </div>
    </footer>
  );
}
