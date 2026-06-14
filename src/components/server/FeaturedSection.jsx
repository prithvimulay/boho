import Link from "next/link";
import ProjectCardStatic from "@/src/components/server/ProjectCardStatic";
import FadeIn from "@/src/components/client/motion/FadeIn";
import { getProjectsByCategory } from "@/src/lib/projects";

/**
 * The home-page "Featured / Houses & Villas" block:
 * beige intro card + hero project image + a row of two more projects.
 */
export default function FeaturedSection() {
  const projects = getProjectsByCategory("architecture").filter(
    (p) => p.group === "houses-villas"
  );
  const [hero, ...rest] = projects;
  const pair = rest.slice(0, 2);

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-24">
      {/* Top row: intro card + hero image */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-4 md:gap-6">
        {/* Intro card */}
        <FadeIn className="bg-[var(--color-bg-muted)] p-10 flex flex-col justify-between min-h-[420px]">
          <div>
            <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-8">
              Featured
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-6">
              Houses
              <br />
              &amp; Villas
            </h2>
            <p className="text-[var(--color-fg-muted)] max-w-xs leading-relaxed">
              Enjoy our projects inspired by the Mediterranean lifestyle and a
              contemporary interpretation of luxury.
            </p>
          </div>

          <Link
            href="/architecture"
            className="group inline-flex items-center gap-2 text-sm tracking-wide mt-10 transition-colors hover:text-[var(--color-accent)]"
          >
            View All Houses &amp; Villas
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 13L13 3M13 3H5M13 3v8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </FadeIn>

        {/* Hero project image */}
        {hero && (
          <FadeIn className="relative min-h-[420px]" delay={0.1}>
            <ProjectCardStatic
              project={hero}
              priority
              className="absolute inset-0"
            />
          </FadeIn>
        )}
      </div>

      {/* Second row: two projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
        {pair.map((project, i) => (
          <FadeIn
            key={project.slug}
            delay={i * 0.1}
            className="relative aspect-[4/3]"
          >
            <ProjectCardStatic project={project} className="absolute inset-0" />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
