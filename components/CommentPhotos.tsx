"use client";

import { useState } from "react";
import { COMMENT_PHOTOS } from "@/lib/data";

export default function CommentPhotos() {
  const [failed, setFailed] = useState<Set<number>>(new Set());

  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
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
            className="absolute rounded-lg border-2 border-white/10 opacity-40 shadow-2xl"
            onError={() =>
              setFailed((prev) => new Set(prev).add(i))
            }
          />
        )
      )}
    </div>
  );
}
