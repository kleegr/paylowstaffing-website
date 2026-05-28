'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

/**
 * ProcessVideo — premium, self-contained video card for the How It Works hero.
 *
 * Behavior (per brief + browser autoplay rules):
 *  - autoPlay + muted + playsInline + loop. Muted is REQUIRED for autoplay to
 *    work in every modern browser; there is no way around this. The video
 *    therefore starts silent and the user opts into sound.
 *  - "Very low volume": when the user unmutes, volume is set to 0.12 so sound
 *    is gentle rather than blasting. They can raise it via OS / native controls
 *    if they want (the custom controls only toggle mute + play).
 *  - playsInline keeps it from going fullscreen on iOS Safari.
 *  - Custom frosted controls (play/pause + mute) instead of the default browser
 *    chrome — cleaner, on-brand. The mute button carries a "Tap for sound"
 *    label while muted so the unmute path is obvious.
 *
 * Layout-shift safety:
 *  - The video lives inside a fixed `aspect-video` (16:9) box, so the space is
 *    reserved before a single byte of video loads. No reflow on load.
 *  - object-cover fills the frame. (If this specific MP4 turns out NOT to be
 *    16:9, swap `object-cover` → `object-contain` and the frame letterboxes
 *    cleanly instead of cropping. See note in the page.)
 *
 * Performance:
 *  - preload="metadata" — the browser grabs just enough to start, not the whole
 *    file up front. Autoplay still kicks in because the element is muted+inline.
 *  - bg-ink-900 behind the video shows as a brief dark placeholder before the
 *    first frame paints (no white flash).
 */

type Props = {
  src: string;
  label?: string;
};

export default function ProcessVideo({ src, label = 'See how it works' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Gentle default volume for when the user unmutes, and a belt-and-suspenders
  // play() attempt in case a browser is slow to honor the autoPlay attribute.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = 0.12;
    const p = v.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        /* Autoplay blocked (rare for muted inline video). The play button
           in the overlay lets the user start it manually. */
      });
    }
  }, []);

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) {
      v.volume = 0.12; // keep it quiet on unmute
      if (v.paused) v.play().catch(() => {});
    }
    // isMuted state is synced by the onVolumeChange handler below.
  }

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
    // isPlaying state is synced by onPlay / onPause below.
  }

  return (
    <figure className="relative group m-0">
      {/* Soft brand glow behind the frame for a premium lift */}
      <div
        aria-hidden
        className="absolute -inset-3 sm:-inset-4 -z-10 rounded-[2.5rem] bg-gradient-brand opacity-[0.12] blur-2xl"
      />

      <div className="relative rounded-4xl overflow-hidden border border-ink-100 bg-ink-900 shadow-lift">
        {/* Label chip */}
        <figcaption className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-semibold text-ink-800 shadow-soft">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          {label}
        </figcaption>

        {/* Fixed-ratio box reserves space → zero layout shift while loading */}
        <div className="relative aspect-video w-full bg-ink-900">
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onVolumeChange={(e) => setIsMuted(e.currentTarget.muted)}
          />

          {/* Subtle gradient at the bottom so the controls stay legible over
              any bright video content */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900/50 to-transparent pointer-events-none"
          />
        </div>

        {/* Custom controls — bottom-right */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-ink-900/55 backdrop-blur text-white hover:bg-ink-900/80 transition-colors duration-200"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            aria-pressed={!isMuted}
            className="inline-flex items-center gap-2 rounded-full bg-ink-900/55 backdrop-blur text-white hover:bg-ink-900/80 transition-colors duration-200 pl-3 pr-3.5 h-10"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="text-xs font-semibold whitespace-nowrap">
              {isMuted ? 'Tap for sound' : 'Sound on'}
            </span>
          </button>
        </div>
      </div>
    </figure>
  );
}
