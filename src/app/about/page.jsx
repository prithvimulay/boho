import PageHeader from "@/src/components/server/PageHeader";
import PageTransition from "@/src/components/client/motion/PageTransition";
import FadeIn from "@/src/components/client/motion/FadeIn";
import { ESSENCE, SERVICES, TEAM, CLIENTS } from "@/src/lib/about";

export const metadata = {
  title: "About — BOHO Studio",
  description:
    "Our essence, our team, the services we offer and the clients we work with.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="About"
        title="Achieving the best results through the right people."
      />

      {/* Essence */}
      <section id="essence" className="max-w-[1400px] mx-auto px-6 py-20 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          <FadeIn>
            <p className="text-xs tracking-widest uppercase text-[var(--color-fg-muted)]">
              Essence
            </p>
          </FadeIn>
          <div className="flex flex-col gap-6 max-w-2xl">
            {ESSENCE.map((para, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <p className="text-xl md:text-2xl font-light leading-relaxed">
                  {para}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="bg-[var(--color-bg-muted)] scroll-mt-24"
      >
        <div className="max-w-[1400px] mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
            <FadeIn>
              <p className="text-xs tracking-widest uppercase text-[var(--color-fg-muted)]">
                Services
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {SERVICES.map((s, i) => (
                <FadeIn key={s.title} delay={(i % 2) * 0.08}>
                  <div className="border-t border-[var(--color-border)] pt-6">
                    <h3 className="font-serif text-2xl font-light mb-3">
                      {s.title}
                    </h3>
                    <p className="text-[var(--color-fg-muted)] leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="max-w-[1400px] mx-auto px-6 py-24 scroll-mt-24">
        <FadeIn>
          <p className="text-xs tracking-widest uppercase text-[var(--color-fg-muted)] mb-12">
            Team
          </p>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <FadeIn key={member.name} delay={(i % 4) * 0.08}>
              <div>
                <div className="aspect-square bg-[var(--color-bg-muted)] overflow-hidden mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-[var(--color-fg-muted)]">
                  {member.role}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Clients */}
      <section
        id="clients"
        className="max-w-[1400px] mx-auto px-6 py-24 scroll-mt-24"
      >
        <FadeIn>
          <p className="text-xs tracking-widest uppercase text-[var(--color-fg-muted)] mb-12">
            Clients
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {CLIENTS.map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <blockquote className="border-t border-[var(--color-border)] pt-6">
                <p className="font-serif text-2xl font-light leading-snug mb-4">
                  &ldquo;{c.quote}&rdquo;
                </p>
                <cite className="text-sm text-[var(--color-fg-muted)] not-italic">
                  — {c.project}
                </cite>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
