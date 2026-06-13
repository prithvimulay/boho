"use client";

import { useEffect, useRef, useState } from "react";

/*
  Place your hero videos in /public/videos/ named:
    hero-1.webm, hero-2.webm, … (add as many as you like)
  Update the VIDEOS array below to match.
*/
const VIDEOS = [
  "/videos/hero-1.webm",
  "/videos/hero-2.webm",
  "/videos/hero-3.webm",
  "/videos/hero-4.webm",
];

function pickStartIndex() {
  return Math.floor(Math.random() * VIDEOS.length);
}

export default function HeroSection() {
  const [current, setCurrent] = useState(() => pickStartIndex());
  const [next, setNext] = useState(null);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);
  const nextVideoRef = useRef(null);

  function advanceTo(idx) {
    setNext(idx);
    setFading(true);
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      const nextIdx = (current + 1) % VIDEOS.length;
      advanceTo(nextIdx);
    }, 6000);
    return () => clearTimeout(timerRef.current);
  }, [current]);

  function handleNextEnded() {
    if (fading && next !== null) {
      setCurrent(next);
      setNext(null);
      setFading(false);
    }
  }

  function handleTransitionEnd() {
    if (fading && next !== null) {
      setCurrent(next);
      setNext(null);
      setFading(false);
    }
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Current video */}
      <video
        key={`current-${current}`}
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEOS[current]}
        autoPlay
        muted
        loop={false}
        playsInline
      />

      {/* Next video fading in */}
      {next !== null && (
        <video
          ref={nextVideoRef}
          key={`next-${next}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: fading ? 1 : 0 }}
          src={VIDEOS[next]}
          autoPlay
          muted
          loop={false}
          playsInline
          onEnded={handleNextEnded}
          onTransitionEnd={handleTransitionEnd}
        />
      )}

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-24 pointer-events-none">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-5">
            Architecture &amp; Interiors
          </p>
          <h1 className="text-white font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.02] max-w-3xl">
            Beyond design.
            <br />
            Precision in every detail.
          </h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-6 flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs tracking-widest uppercase rotate-90 origin-center mb-4">
          Scroll
        </span>
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-white/80 animate-[scrollbar_1.5s_ease-in-out_infinite]" style={{ height: "40%" }} />
        </div>
      </div>
    </section>
  );
}
