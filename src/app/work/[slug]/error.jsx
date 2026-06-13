"use client";

import Link from "next/link";

export default function WorkError({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h2 className="font-serif text-3xl">Project not found</h2>
      <p className="text-[var(--color-fg-muted)] max-w-sm">{error?.message ?? "This project could not be loaded."}</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 border border-[var(--color-border)] text-sm tracking-wide hover:bg-[var(--color-bg-muted)] transition-colors"
        >
          Try again
        </button>
        <Link
          href="/architecture"
          className="px-6 py-3 bg-[var(--color-fg)] text-white text-sm tracking-wide hover:opacity-80 transition-opacity"
        >
          View all projects
        </Link>
      </div>
    </div>
  );
}
