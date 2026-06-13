"use client";

export default function GlobalError({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h2 className="font-serif text-3xl">Something went wrong</h2>
      <p className="text-[var(--color-fg-muted)] max-w-sm">{error?.message ?? "An unexpected error occurred."}</p>
      <button
        onClick={reset}
        className="px-6 py-3 border border-[var(--color-border)] text-sm tracking-wide hover:bg-[var(--color-bg-muted)] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
