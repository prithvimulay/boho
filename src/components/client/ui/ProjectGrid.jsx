"use client";

import { useState, useCallback, useMemo } from "react";
import ProjectCardStatic from "@/src/components/server/ProjectCardStatic";
import InfiniteScrollTrigger from "@/src/components/client/ui/InfiniteScrollTrigger";
import FadeIn from "@/src/components/client/motion/FadeIn";
import { GROUP_LABELS } from "@/src/lib/projects";

const PAGE_SIZE = 6;

/**
 * Renders a category's projects grouped by `group`, with infinite scroll.
 * `projects` is the full list for one category (architecture | interior).
 */
export default function ProjectGrid({ projects }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  const loadMore = useCallback(() => {
    setVisible((v) => Math.min(v + PAGE_SIZE, projects.length));
  }, [projects.length]);

  const shown = useMemo(() => projects.slice(0, visible), [projects, visible]);

  // group the currently-visible projects by their `group`
  const grouped = useMemo(() => {
    const map = new Map();
    for (const p of shown) {
      if (!map.has(p.group)) map.set(p.group, []);
      map.get(p.group).push(p);
    }
    return [...map.entries()];
  }, [shown]);

  return (
    <div className="flex flex-col gap-20">
      {grouped.map(([group, items]) => (
        <section key={group}>
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-8">
              {GROUP_LABELS[group] ?? group}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {items.map((project, i) => (
              <FadeIn key={project.slug} delay={(i % 2) * 0.1}>
                <ProjectCardStatic
                  project={project}
                  className="aspect-[4/3] w-full"
                />
              </FadeIn>
            ))}
          </div>
        </section>
      ))}

      <InfiniteScrollTrigger
        onLoadMore={loadMore}
        hasMore={visible < projects.length}
      />
    </div>
  );
}
