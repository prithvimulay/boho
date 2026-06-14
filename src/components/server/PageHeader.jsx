import FadeIn from "@/src/components/client/motion/FadeIn";

/**
 * Large serif page header: small uppercase eyebrow + display title,
 * with the top padding needed to clear the fixed nav.
 */
export default function PageHeader({ eyebrow, title, description }) {
  return (
    <header className="max-w-[1400px] mx-auto px-6 pt-40 pb-16 md:pb-24">
      {eyebrow && (
        <FadeIn>
          <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-8">
            {eyebrow}
          </p>
        </FadeIn>
      )}
      <FadeIn delay={0.05}>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] max-w-5xl">
          {title}
        </h1>
      </FadeIn>
      {description && (
        <FadeIn delay={0.1}>
          <p className="mt-8 text-lg text-[var(--color-fg-muted)] max-w-xl leading-relaxed">
            {description}
          </p>
        </FadeIn>
      )}
    </header>
  );
}
