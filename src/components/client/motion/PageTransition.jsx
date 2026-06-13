"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Fades + lifts page content in on each route change.
 * Wrap page content with this in individual pages.
 */
export default function PageTransition({ children, className = "" }) {
  const ref = useRef(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
    },
    { dependencies: [pathname], scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
