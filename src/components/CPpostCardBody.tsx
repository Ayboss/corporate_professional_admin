"use client";
import { TPost } from "@/types/posts";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const videoFormats = [".mp4", ".mov", ".gif"]; // keep your formats

function isVideo(url: string) {
  const lower = url.toLowerCase();
  return videoFormats.some((ext) => lower.endsWith(ext));
}

function CPpostCardBody({ post }: { post: TPost }) {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const openGallery = (idx: number) => {
    setStartIndex(idx);
    setIsOpen(true);
  };

  return (
    <>
      <div className="mb-[36px]">
        {post.title && (
          <h1 className="text-slate-900 text-[20px] mb-3 font-medium">
            {post.title}
          </h1>
        )}
        {post.content && (
          <p className="text-slate-700 text-sm leading-5">{post.content}</p>
        )}

        {post?.media_urls?.length > 0 && (
          <div className="mt-3 relative">
            {/* Primary preview (first media). Clicking opens gallery at index 0 */}
            <button
              type="button"
              onClick={() => openGallery(0)}
              className="relative w-full block text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 rounded-lg overflow-hidden"
            >
              {isVideo(post.media_urls[0]) ? (
                <video
                  key={post.media_urls[0]}
                  src={post.media_urls[0]}
                  controls
                  className="w-full h-auto max-h-60 bg-black"
                />
              ) : (
                <img
                  src={post.media_urls[0]}
                  alt="Preview"
                  className="w-full h-auto max-h-60 object-cover"
                />
              )}

              {post.media_urls.length > 1 && (
                <div className="bottom-2 right-2 px-3 py-1 bg-black/60 text-white text-sm rounded-md absolute">
                  +{post.media_urls.length - 1} more
                </div>
              )}
            </button>

            {/* Optional tiny thumbnails for quick jump (first 4) */}
            {post.media_urls.length > 1 && (
              <div className="mt-2 grid grid-cols-4 gap-2">
                {post.media_urls.slice(0, 4).map((m, i) => (
                  <button
                    key={m + i}
                    type="button"
                    onClick={() => openGallery(i)}
                    className="aspect-square overflow-hidden rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    aria-label={`Open media ${i + 1} of ${
                      post.media_urls.length
                    }`}
                  >
                    {isVideo(m) ? (
                      <div className="w-full h-full bg-black grid place-items-center text-[10px] text-white">
                        ▶︎
                      </div>
                    ) : (
                      <img
                        src={m}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center mt-4">
            {post.tags.map((tag, i) => (
              <div
                className="text-xs py-2 px-3 gap-2 bg-[#F8FAFC] rounded-full w-max flex items-center"
                key={i}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      {isOpen && (
        <PictureGalleryModal
          medias={post.media_urls}
          initialIndex={startIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

function PictureGalleryModal({
  medias,
  initialIndex = 0,
  onClose,
}: {
  medias: string[];
  initialIndex?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(
    Math.min(Math.max(initialIndex, 0), Math.max(medias.length - 1, 0))
  );

  const goNext = useCallback(
    () => setIndex((i) => (i + 1) % medias.length),
    [medias.length]
  );
  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + medias.length) % medias.length),
    [medias.length]
  );

  // close on ESC and navigate with arrows
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, onClose]);

  // prevent background scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // swipe support
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (dx > threshold) goPrev();
    if (dx < -threshold) goNext();
    touchStartX.current = null;
  };

  const current = medias[index];
  const total = medias.length;
  const countLabel = `${index + 1} / ${total}`;

  const mediaNode = useMemo(() => {
    if (isVideo(current)) {
      return (
        <video
          src={current}
          controls
          autoPlay
          className="max-h-[80vh] w-auto max-w-[90vw] bg-black rounded-xl"
        />
      );
    }
    return (
      <img
        src={current}
        alt=""
        className="max-h-[80vh] w-auto max-w-[90vw] object-contain rounded-xl"
        loading="eager"
      />
    );
  }, [current]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Media gallery"
      className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center"
      onClick={(e) => {
        // close only when clicking the backdrop (not children)
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/10 hover:bg-white/20 text-white"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Counter */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-white text-sm px-2 py-1 rounded bg-white/10">
        {countLabel}
      </div>

      {/* Prev */}
      {total > 1 && (
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-3 md:left-6 inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/10 hover:bg-white/20 text-white"
          aria-label="Previous"
        >
          ‹
        </button>
      )}

      {/* Next */}
      {total > 1 && (
        <button
          type="button"
          onClick={goNext}
          className="absolute right-3 md:right-6 inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/10 hover:bg-white/20 text-white"
          aria-label="Next"
        >
          ›
        </button>
      )}

      {/* Media */}
      <div className="flex items-center justify-center px-3">{mediaNode}</div>

      {/* Thumbnails strip */}
      {total > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 max-w-[90vw] overflow-x-auto">
          <div className="flex gap-2">
            {medias.map((m, i) => {
              const selected = i === index;
              return (
                <button
                  key={m + i}
                  onClick={() => setIndex(i)}
                  className={`h-14 w-14 rounded-md overflow-hidden border ${
                    selected ? "border-white" : "border-white/30"
                  } opacity-90 hover:opacity-100`}
                  aria-label={`Go to media ${i + 1}`}
                >
                  {isVideo(m) ? (
                    <div className="w-full h-full bg-black grid place-items-center text-[10px] text-white">
                      ▶︎
                    </div>
                  ) : (
                    <img
                      src={m}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CPpostCardBody;
