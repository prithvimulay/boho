import ContactForm from "@/src/components/client/ui/ContactForm";
import PageTransition from "@/src/components/client/motion/PageTransition";
import FadeIn from "@/src/components/client/motion/FadeIn";
import Link from "next/link";

export const metadata = {
  title: "Contact — BOHO Studio",
  description: "Let's talk. Book an appointment to discuss your next project.",
};

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="max-w-[1400px] mx-auto px-6 pt-40 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16">
          {/* Intro */}
          <div>
            <FadeIn>
              <p className="text-xs tracking-widest uppercase text-[var(--color-fg-muted)] mb-8">
                Contact
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="font-serif text-6xl md:text-7xl font-light mb-10">
                Let&rsquo;s talk
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="space-y-5 text-[var(--color-fg-muted)] max-w-md leading-relaxed">
                <p>Looking for a trusted partner for your next project?</p>
                <p>
                  Book an appointment with us to discuss your ideas, your goals,
                  and how we can help make them a reality.
                </p>
                <p>We&rsquo;d be delighted to welcome you to our studio.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-12">
                <p className="text-xs tracking-widest uppercase text-[var(--color-fg-muted)] mb-4">
                  Follow
                </p>
                <ul className="flex gap-6">
                  {SOCIALS.map((s) => (
                    <li key={s.label}>
                      <Link
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:opacity-60 transition-opacity"
                      >
                        {s.label} ↗
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Form */}
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
