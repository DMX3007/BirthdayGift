"use client";

import { useState } from "react";
import { COMMENT_PHOTOS } from "@/lib/data";

export default function CommentPhotos() {
  const [failed, setFailed] = useState<Set<number>>(new Set());

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 flex justify-center overflow-hidden"
    >
      {/* Constrained to a centered column so the collage stays close to the
          text on wide screens instead of spreading out to the viewport
          edges (positions below are percentages of this box, not the
          full window). */}
      <div className="relative h-full w-full max-w-3xl">
        {COMMENT_PHOTOS.map((photo, i) =>
          failed.has(i) ? null : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={photo.src}
              src={photo.src}
              alt=""
              style={{
                top: photo.top,
                left: photo.left,
                width: photo.width,
                transform: `rotate(${photo.rotate}deg)`,
              }}
              className="absolute rounded-lg border-2 border-white/10 opacity-40 shadow-2xl select-none [-webkit-touch-callout:none]"
              onError={() => setFailed((prev) => new Set(prev).add(i))}
            />
          )
        )}
      </div>
    </div>
  );
}
