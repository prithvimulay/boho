"use client";

import Link from "next/link";
import MagneticButton from "@/src/components/client/ui/MagneticButton";
import { cn } from "@/src/lib/utils";

/**
 * The floating "Let's talk" pill with a circular arrow, as seen
 * over project imagery. Magnetically follows the cursor.
 */
export default function LetsTalkPill({ className = "", href = "/contact" }) {
  return (
    <MagneticButton className={cn("z-10", className)} strength={0.5}>
      <Link
        href={href}
        className="group flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full pl-7 pr-2 py-2 shadow-lg hover:bg-white transition-colors"
      >
        <span className="font-serif text-lg">Let&rsquo;s talk</span>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-fg)] text-white group-hover:scale-105 transition-transform">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
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
    </MagneticButton>
  );
}
