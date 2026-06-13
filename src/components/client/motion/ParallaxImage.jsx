"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/src/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * An image that drifts vertically as the page scrolls, creating depth.
 */
export default function ParallaxImage({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  strength = 80,
}) {
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -strength / 10 },
        {
          yPercent: strength / 10,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className={cn("overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover scale-110", imgClassName)}
      />
    </div>
  );
}
