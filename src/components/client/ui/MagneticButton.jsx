"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/src/lib/utils";

/**
 * A button/element that magnetically follows the cursor on hover.
 * Wrap any content; pass `strength` to tune the pull.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  ...props
}) {
  const ref = useRef(null);

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.6,
      ease: "power3.out",
    });
  }

  function handleLeave() {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("inline-flex", className)}
      {...props}
    >
      {children}
    </div>
  );
}
