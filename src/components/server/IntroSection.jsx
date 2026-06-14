import FadeIn from "@/src/components/client/motion/FadeIn";

/**
 * Bold tagline block beneath the hero — who we are, in large type.
 */
export default function IntroSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-28 md:py-40">
      <FadeIn>
        <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-10">
          Boho Studio
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-[1.15] max-w-4xl">
          We help the most discerning individuals and brands cut through
          complexity, enhance lifestyles, and exceed their goals.
        </h2>
      </FadeIn>
    </section>
  );
}
