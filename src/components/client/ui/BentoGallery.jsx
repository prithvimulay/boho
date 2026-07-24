"use client";

import { useState } from "react";

/**
 * Base grid is 10 columns wide on desktop so widths can be expressed as a
 * rough percentage: col-span-3 ≈ 30%, col-span-7 ≈ 70%, etc.
 *
 * Images are grouped in pairs: within a pair the two column-spans always
 * add up to the full 10 columns (e.g. 4 + 6, 3 + 7, 5 + 5), so every row is
 * completely filled — never a gap, never an overflow. If the project has an
 * odd number of images, the final leftover image spans the full row on its
 * own instead of being paired.
 */
const ROW_SPLITS = [
  [3, 7], // 30 / 70
  [4, 6], // 40 / 60
  [5, 5], // 50 / 50
  [6, 4], // 60 / 40
  [7, 3], // 70 / 30
];

/** Small deterministic hash so the "random" pick is stable per image URL —
 * the layout won't reshuffle on every reload, but still looks arbitrary
 * across the set of images. */
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick(options, seed) {
  return options[hashCode(seed) % options.length];
}

/** Precompute { src, colSpan } for every image: paired two-by-two with
 * complementary widths, odd one out (if any) gets the full row. */
function buildLayout(images) {
  const layout = [];
  const total = images.length;

  for (let i = 0; i < total; i += 2) {
    const isFinalOdd = total % 2 !== 0 && i === total - 1;

    if (isFinalOdd) {
      layout.push({ src: images[i], colSpan: 10 });
      continue;
    }

    const a = images[i];
    const b = images[i + 1];
    const [wa, wb] = pick(ROW_SPLITS, a);
    layout.push({ src: a, colSpan: wa });
    layout.push({ src: b, colSpan: wb });
  }

  return layout;
}

function colSpanClass(colSpan) {
  // static map so Tailwind's scanner can find every literal class name
  switch (colSpan) {
    case 3:
      return "md:col-span-3";
    case 4:
      return "md:col-span-4";
    case 5:
      return "md:col-span-5";
    case 6:
      return "md:col-span-6";
    case 7:
      return "md:col-span-7";
    case 10:
      return "md:col-span-10";
    default:
      return "md:col-span-5";
  }
}

export default function BentoGallery({ images, title }) {
  const [ratios, setRatios] = useState({});
  const [loaded, setLoaded] = useState({});

  function handleLoad(src, e) {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (!naturalWidth || !naturalHeight) return;
    setRatios((prev) =>
      prev[src] ? prev : { ...prev, [src]: naturalWidth / naturalHeight }
    );
    setLoaded((prev) => ({ ...prev, [src]: true }));
  }

  if (!images?.length) return null;

  const layout = buildLayout(images);

  return (
    <div className="grid grid-cols-2 md:grid-cols-10 grid-flow-row-dense auto-rows-[minmax(260px,48vh)] md:auto-rows-[minmax(340px,60vh)] gap-3 md:gap-4">
      {layout.map(({ src, colSpan }, i) => {
        const ratio = ratios[src];
        const isPortrait = ratio && ratio < 0.85;
        const rowSpanClass = isPortrait ? "row-span-2" : "row-span-1";

        return (
          <div
            key={src}
            className={`relative overflow-hidden bg-[var(--color-bg-muted)] col-span-2 ${rowSpanClass} ${colSpanClass(
              colSpan
            )}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} — image ${i + 1}`}
              loading="lazy"
              onLoad={(e) => handleLoad(src, e)}
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                loaded[src] ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}