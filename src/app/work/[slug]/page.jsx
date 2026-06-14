import { notFound } from "next/navigation";
import Link from "next/link";
import PageTransition from "@/src/components/client/motion/PageTransition";
import FadeIn from "@/src/components/client/motion/FadeIn";
import { PROJECTS, getProjectBySlug, GROUP_LABELS } from "@/src/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found — BOHO Studio" };
  return {
    title: `${project.title} — BOHO Studio`,
    description: project.excerpt,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const backHref =
    project.category === "interior" ? "/interior" : "/architecture";

  return (
    <PageTransition>
      {/* Hero image */}
      <div className="relative w-full h-[70vh] min-h-[420px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Meta */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <FadeIn>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] transition-colors mb-12"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to {GROUP_LABELS[project.group] ?? "projects"}
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          <div>
            <FadeIn>
              <h1 className="font-serif text-5xl md:text-6xl font-light mb-6">
                {project.title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.05}>
              <p className="text-xl text-[var(--color-fg-muted)] max-w-2xl leading-relaxed">
                {project.excerpt}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <dl className="flex flex-col gap-6 text-sm">
              <div className="border-t border-[var(--color-border)] pt-4">
                <dt className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-2">Location</dt>
                <dd>{project.location}</dd>
              </div>
              {project.client && (
                <div className="border-t border-[var(--color-border)] pt-4">
                  <dt className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-2">Client</dt>
                  <dd>{project.client}</dd>
                </div>
              )}
              <div className="border-t border-[var(--color-border)] pt-4">
                <dt className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-2">Discipline</dt>
                <dd>
                  {project.category === "interior"
                    ? "Interior Design"
                    : "Architecture"}
                </dd>
              </div>
            </dl>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative max-w-[1400px] mx-auto px-6 pb-32">
        <div className="relative aspect-[16/7] overflow-hidden bg-[var(--color-bg-muted)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnail}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </PageTransition>
  );
}
