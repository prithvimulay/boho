"use client";

import { useEffect, useRef } from "react";

/**
 * An invisible sentinel that fires `onLoadMore` when scrolled near.
 * Render it at the bottom of a paginated list while `hasMore` is true.
 */
export default function InfiniteScrollTrigger({ onLoadMore, hasMore, rootMargin = "300px" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!hasMore) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore();
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, rootMargin]);

  if (!hasMore) return null;

  return (
    <div ref={ref} className="flex items-center justify-center py-12">
      <span className="text-xs tracking-widest uppercase text-[var(--color-fg-muted)] animate-pulse">
        Loading more
      </span>
    </div>
  );
}
