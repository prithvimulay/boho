"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * A globally-fixed "Let's talk" pill anchored to the bottom-right corner.
 *
 * As the footer CTA scrolls into view it performs a shared-element ("FLIP")
 * merge: the pill's text + white chrome fade out and its white arrow circle
 * travels to land exactly on the footer's arrow circle — so the floating
 * button reads as merging into the single footer "Let's talk" line.
 *
 * `progress` (0 → 1) is derived from scroll position, so the motion is smooth
 * and fully reversible rather than a hard fade on/off.
 */
export default function StickyTalkButton({ href = "/contact" }) {
  const [progress, setProgress] = useState(0); // 0 = corner, 1 = merged
  const arrowRef = useRef(null);
  const baseCenter = useRef(null); // arrow's resting center, measured once

  useEffect(() => {
    let raf = 0;

    function measureBase() {
      const el = arrowRef.current;
      if (!el) return;
      const prev = el.style.transform;
      el.style.transform = "none";
      const r = el.getBoundingClientRect();
      el.style.transform = prev;
      baseCenter.current = { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width };
    }

    function update() {
      raf = 0;
      const footerArrow = document.getElementById("footer-talk-arrow");
      const arrow = arrowRef.current;
      const base = baseCenter.current;
      if (!footerArrow || !arrow || !base) return;

      const vh = window.innerHeight;
      const fr = footerArrow.getBoundingClientRect();
      const footerCenterY = fr.top + fr.height / 2;

      // Merge window: starts as the footer arrow enters from the bottom,
      // completes once it has risen ~60% up the viewport.
      const p = clamp((vh - footerCenterY) / (vh - vh * 0.6), 0, 1);

      const dx = (fr.left + fr.width / 2 - base.x) * p;
      const dy = (footerCenterY - base.y) * p;
      const scale = 1 + (fr.width / base.w - 1) * p;
      arrow.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;

      // Hand-off: while the arrow is travelling we hide the footer's own arrow
      // so only one shows. Once fully merged we restore the footer arrow (it
      // owns the gold hover) and let the travelling one fade out.
      footerArrow.style.opacity = p > 0.6 && p <= 0.98 ? "0" : "1";

      setProgress(p);
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    function onResize() {
      measureBase();
      onScroll();
    }

    measureBase();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      const footerArrow = document.getElementById("footer-talk-arrow");
      if (footerArrow) footerArrow.style.opacity = "";
    };
  }, []);

  const merged = progress > 0.98;

  return (
    <div
      className="fixed bottom-6 right-6 z-40"
      style={{ pointerEvents: merged ? "none" : "auto" }}
      aria-hidden={merged}
    >
      <Link
        href={href}
        tabIndex={merged ? -1 : 0}
        className="group flex items-center gap-3 rounded-full pl-7 pr-2 py-2"
        style={{
          backgroundColor: `rgba(255,255,255,${0.95 * (1 - progress)})`,
          boxShadow: progress > 0.05 ? "none" : "0 10px 25px -5px rgba(0,0,0,0.15)",
          backdropFilter: progress > 0.05 ? "none" : "blur(4px)",
        }}
      >
        <span
          className="font-serif text-lg whitespace-nowrap"
          style={{ opacity: 1 - Math.min(1, progress * 2) }}
        >
          Let&rsquo;s talk
        </span>
        <span
          ref={arrowRef}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full ring-1 ring-black/5"
          style={{
            transformOrigin: "center",
            willChange: "transform",
            // Circle: navy in the corner → white as it merges into the footer.
            backgroundColor: mix("#020129", "#ffffff", progress),
            // Icon: white on navy → navy on white.
            color: mix("#ffffff", "#020129", progress),
            // Footer's own arrow (with the gold hover) takes over once merged.
            opacity: merged ? 0 : 1,
          }}
        >
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
    </div>
  );
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/** Linearly interpolate between two #rrggbb colors. t in [0,1]. */
function mix(from, to, t) {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
