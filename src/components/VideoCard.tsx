'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoCardProps {
  youtubeId: string;
  title: string;
  eyebrow?: string;
  className?: string;
}

/**
 * Lite YouTube embed.
 *
 * Renders only the YouTube thumbnail (i.ytimg.com/.../maxresdefault.jpg with
 * fallback to hqdefault.jpg) + a center play button at first load. On click,
 * swaps in a real <iframe> with autoplay=1 so the video starts immediately.
 *
 * Why: the stock YouTube embed pulls ~1MB of JS + 100+ requests per video.
 * Three videos on a homepage would be ~3MB and dozens of network requests
 * before the page is interactive. This lite pattern defers all of that cost
 * to the moment of user intent — same UX, fraction of the weight.
 *
 * Uses youtube-nocookie.com for the iframe (YouTube's privacy-enhanced
 * embed domain — same player, no third-party cookies until play starts).
 */
export default function VideoCard({
  youtubeId,
  title,
  eyebrow = 'Customer story',
  className = '',
}: VideoCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  // maxresdefault doesn't always exist (some videos only have hq). Fall back.
  const thumbnailUrl = thumbFailed
    ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <article
      className={`group relative aspect-video overflow-hidden rounded-2xl bg-ink-900 shadow-card transition-all duration-500 ease-out ${
        loaded ? '' : 'hover:shadow-lift hover:-translate-y-1'
      } ${className}`}
    >
      {loaded ? (
        // Real iframe — only mounted after a user click.
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 w-full h-full text-left cursor-pointer"
        >
          {/* Thumbnail — next/image lazy-loaded, fills the card */}
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            onError={() => {
              if (!thumbFailed) setThumbFailed(true);
            }}
          />

          {/* Soft dark gradient so play button + title pop */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-ink-900/30"
          />

          {/* Center play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              aria-hidden="true"
              className="inline-flex h-16 w-16 sm:h-[72px] sm:w-[72px] items-center justify-center rounded-full bg-white/95 text-ink-900 shadow-lift transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-white"
            >
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" strokeWidth={0} />
            </span>
          </div>

          {/* Title pinned to the bottom */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-300 mb-1.5">
              {eyebrow}
            </p>
            <h3 className="font-display font-bold text-white text-base sm:text-lg leading-snug">
              {title}
            </h3>
          </div>
        </button>
      )}
    </article>
  );
}
