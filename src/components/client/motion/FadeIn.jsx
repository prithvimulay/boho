"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Reveals its children with an upward fade as it scrolls into view.
 * Content is visible by default (no FOUC / stuck-invisible state); the
 * animation only plays as a progressive enhancement.
 */
export default function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 32,
  duration = 0.9,
  as: Tag = "div",
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Respect reduced-motion: leave content as-is.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            el,
            { opacity: 0, y },
            { opacity: 1, y: 0, duration, delay, ease: "power3.out", overwrite: "auto" }
          );
        },
      });

      // If it's already in view on mount (above the fold), animate immediately.
      if (trigger.isActive || el.getBoundingClientRect().top < window.innerHeight) {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          { opacity: 1, y: 0, duration, delay, ease: "power3.out", overwrite: "auto" }
        );
      }
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
