import Link from "next/link";
import { cn } from "@/src/lib/utils";

/**
 * A single project tile. Image with an overlaid title + location,
 * linking to the project detail page. Optional hover video.
 */
export default function ProjectCardStatic({ project, className = "", priority = false }) {
  const { slug, title, location, thumbnail, hoverVideo } = project;

  return (
    <Link
      href={`/work/${slug}`}
      className={cn(
        "group relative block overflow-hidden bg-[var(--color-bg-muted)]",
        className
      )}
    >
      <div className="relative w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={title}
          loading={priority ? "eager" : "lazy"}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {hoverVideo && (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            src={hoverVideo}
            muted
            loop
            playsInline
            preload="none"
          />
        )}

        {/* gradient for label legibility */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

        {/* label */}
        <div className="absolute top-5 left-5 right-5 flex items-center gap-2 text-white">
          <span className="text-sm font-medium tracking-wide drop-shadow">
            {title}
          </span>
          {location && (
            <span className="text-xs text-white/80 drop-shadow flex items-center gap-1">
              <span className="opacity-60">|</span>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="inline">
                <path
                  d="M6 1C4 1 2.5 2.5 2.5 4.5C2.5 7 6 11 6 11C6 11 9.5 7 9.5 4.5C9.5 2.5 8 1 6 1Z"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle cx="6" cy="4.5" r="1" stroke="currentColor" strokeWidth="1" />
              </svg>
              {location}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
