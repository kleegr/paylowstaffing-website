'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Volume2, VolumeX, Play, Pause, RotateCcw, RotateCw,
} from 'lucide-react';

/**
 * ProcessVideo — premium custom video player for the How It Works hero.
 *
 * Full custom control bar (no default browser chrome):
 *  - Play / pause (button + click-surface + center affordance when paused)
 *  - Skip back 10s / forward 10s
 *  - Scrubbable progress bar (pointer + touch + keyboard), with a buffered
 *    indicator and a draggable thumb
 *  - Current time / total duration
 *  - Mute / unmute, plus a persistent "Tap for sound" pill while muted so the
 *    unmute path is ALWAYS one tap away
 *  - Controls auto-hide while playing and reveal on hover / tap / pause
 *    (high-end player feel), and never fully trap the user.
 *
 * Autoplay rules (unchanged, and unavoidable):
 *  - autoPlay + muted + playsInline + loop. Muted is REQUIRED for autoplay in
 *    every modern browser. The video starts silent; the user opts into sound.
 *  - On unmute, volume is set to a gentle 0.12 ("very low volume").
 *  - playsInline keeps it inline on iOS (no forced fullscreen).
 *
 * Click-to-unmute (the headline interaction):
 *  - A direct click/tap on the video body unmutes it (at low volume) and makes
 *    sure it's playing. This is the natural "I want to hear this" gesture.
 *  - While still muted, a tap NEVER pauses — it always unmutes + plays, even if
 *    the controls were hidden (the first tap opts into sound instead of just
 *    revealing the bar). This matches what the user asked for.
 *  - Once unmuted, the video surface goes back to normal play/pause toggling,
 *    so the gesture isn't sticky or surprising.
 *  - The mute/speaker button keeps working independently and can re-mute.
 *
 * Layout-shift safety:
 *  - Fixed `aspect-video` (16:9) box reserves the space before any bytes load.
 *  - object-cover fills the frame. (If this MP4 isn't 16:9, swap to
 *    object-contain to letterbox instead of crop.)
 *
 * Performance:
 *  - preload="metadata" — enough to start + know the duration, not the whole
 *    file up front. Autoplay still fires (muted + inline).
 */

type Props = {
  src: string;
  label?: string;
};

const UNMUTE_VOLUME = 0.12; // gentle, not full blast

function formatTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function ProcessVideo({ src, label = 'See how it works' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  // Refs mirror state so the auto-hide timer never reads stale values.
  const playingRef = useRef(true);
  const mutedRef = useRef(true);
  const scrubbingRef = useRef(false);
  const controlsVisibleRef = useRef(true);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => { playingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { mutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { controlsVisibleRef.current = controlsVisible; }, [controlsVisible]);

  const clearHide = useCallback(() => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearHide();
    hideTimer.current = window.setTimeout(() => {
      if (playingRef.current && !scrubbingRef.current) setControlsVisible(false);
    }, 2800);
  }, [clearHide]);

  const revealControls = useCallback(() => {
    setControlsVisible(true);
    clearHide();
    if (playingRef.current && !scrubbingRef.current) scheduleHide();
  }, [clearHide, scheduleHide]);

  // Gentle unmute volume + belt-and-suspenders autoplay kick.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = UNMUTE_VOLUME;
    const p = v.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {/* autoplay blocked; center play button covers it */});
    }
    return () => clearHide();
  }, [clearHide]);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  // Unmute at a gentle volume and make sure playback is running. Used by both
  // the video-surface click and (implicitly) keeps the speaker button logic DRY.
  function unmuteWithSound() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = UNMUTE_VOLUME;
    if (v.paused) v.play().catch(() => {});
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) {
      v.volume = UNMUTE_VOLUME;
      if (v.paused) v.play().catch(() => {});
    }
  }

  function skip(delta: number) {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration)) return;
    v.currentTime = Math.min(v.duration, Math.max(0, v.currentTime + delta));
    revealControls();
  }

  function seekToClientX(clientX: number) {
    const track = trackRef.current;
    const v = videoRef.current;
    if (!track || !v || !duration) return;
    const rect = track.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const t = frac * duration;
    v.currentTime = t;
    setCurrentTime(t);
  }

  function onTrackPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    el.setPointerCapture?.(e.pointerId);
    scrubbingRef.current = true;
    setScrubbing(true);
    clearHide();
    setControlsVisible(true);
    seekToClientX(e.clientX);
  }
  function onTrackPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!scrubbingRef.current) return;
    seekToClientX(e.clientX);
  }
  function onTrackPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    el.releasePointerCapture?.(e.pointerId);
    scrubbingRef.current = false;
    setScrubbing(false);
    revealControls();
  }
  function onTrackKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowRight') { skip(5); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { skip(-5); e.preventDefault(); }
    else if (e.key === ' ' || e.key === 'Enter') { togglePlay(); e.preventDefault(); }
  }

  // Click anywhere on the video body.
  //
  // Priority 1 — if the video is still muted, the click is an "I want sound"
  // gesture: unmute at low volume and ensure it's playing. We do this FIRST,
  // before the controls-hidden check, so even the very first tap (when the bar
  // has auto-hidden) turns sound on instead of merely revealing the bar. A
  // muted tap never pauses.
  //
  // Priority 2 — once unmuted, behave like a normal player surface: if the
  // controls are hidden, the first tap just reveals them; otherwise toggle
  // play/pause.
  function onSurfaceClick() {
    const v = videoRef.current;
    if (v && v.muted) {
      unmuteWithSound();
      revealControls();
      return;
    }
    if (!controlsVisibleRef.current) { revealControls(); return; }
    togglePlay();
    revealControls();
  }

  const progress = duration ? currentTime / duration : 0;

  return (
    <figure
      className="relative group m-0"
      onMouseMove={revealControls}
      onMouseLeave={() => {
        if (playingRef.current && !scrubbingRef.current) setControlsVisible(false);
      }}
      onTouchStart={revealControls}
    >
      {/* Soft brand glow behind the frame */}
      <div
        aria-hidden
        className="absolute -inset-3 sm:-inset-4 -z-10 rounded-[2.5rem] bg-gradient-brand opacity-[0.12] blur-2xl"
      />

      <div className="relative rounded-4xl overflow-hidden border border-ink-100 bg-ink-900 shadow-lift">
        {/* Label chip — fades with the controls for an immersive view */}
        <figcaption
          className={`absolute top-4 left-4 z-30 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-semibold text-ink-800 shadow-soft transition-opacity duration-300 ${
            controlsVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          {label}
        </figcaption>

        {/* Persistent "Tap for sound" pill — always available while muted,
            independent of the auto-hiding control bar */}
        {isMuted && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); toggleMute(); }}
            className="absolute top-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-brand-500/95 hover:bg-brand-600 text-white px-3.5 py-1.5 text-xs font-semibold shadow-glow-sm transition-colors duration-200"
          >
            <VolumeX className="w-3.5 h-3.5" />
            Tap for sound
          </button>
        )}

        {/* Fixed-ratio box reserves space → zero layout shift while loading */}
        <div className="relative aspect-video w-full bg-ink-900">
          {/* Click-surface for unmute + play/pause (sits under the control bar) */}
          <button
            type="button"
            aria-label={isMuted ? 'Unmute and play with sound' : (isPlaying ? 'Pause video' : 'Play video')}
            onClick={onSurfaceClick}
            className="absolute inset-0 z-10 w-full h-full cursor-pointer"
            tabIndex={-1}
          />
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onDurationChange={(e) => setDuration(e.currentTarget.duration)}
            onTimeUpdate={(e) => { if (!scrubbingRef.current) setCurrentTime(e.currentTarget.currentTime); }}
            onProgress={(e) => {
              const v = e.currentTarget;
              if (v.buffered.length && v.duration) {
                setBuffered(v.buffered.end(v.buffered.length - 1) / v.duration);
              }
            }}
            onPlay={() => { setIsPlaying(true); playingRef.current = true; scheduleHide(); }}
            onPause={() => { setIsPlaying(false); playingRef.current = false; clearHide(); setControlsVisible(true); }}
            onVolumeChange={(e) => setIsMuted(e.currentTarget.muted)}
          />

          {/* Bottom gradient scrim for control legibility */}
          <div
            aria-hidden
            className={`absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-900/70 via-ink-900/20 to-transparent pointer-events-none transition-opacity duration-300 ${
              controlsVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Center play affordance when paused */}
          {!isPlaying && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); unmuteWithSound(); revealControls(); }}
              aria-label="Play video with sound"
              className="absolute inset-0 z-20 m-auto w-16 h-16 sm:w-20 sm:h-20 inline-flex items-center justify-center rounded-full bg-white/95 text-ink-900 shadow-lift hover:scale-105 transition-transform duration-200"
            >
              <Play className="w-7 h-7 sm:w-8 sm:h-8 translate-x-0.5" fill="currentColor" />
            </button>
          )}
        </div>

        {/* ===== Custom control bar ===== */}
        <div
          className={`absolute inset-x-0 bottom-0 z-30 px-3 sm:px-4 pb-3 sm:pb-4 pt-2 transition-all duration-300 ${
            controlsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress / scrub bar */}
          <div
            ref={trackRef}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.floor(duration) || 0}
            aria-valuenow={Math.floor(currentTime) || 0}
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
            tabIndex={0}
            onPointerDown={onTrackPointerDown}
            onPointerMove={onTrackPointerMove}
            onPointerUp={onTrackPointerUp}
            onKeyDown={onTrackKeyDown}
            className="group/track relative flex items-center h-4 cursor-pointer touch-none select-none"
          >
            <div className="relative w-full h-1 group-hover/track:h-1.5 rounded-full bg-white/25 overflow-hidden transition-[height] duration-150">
              {/* Buffered */}
              <div
                className="absolute inset-y-0 left-0 bg-white/30"
                style={{ width: `${Math.max(0, Math.min(1, buffered)) * 100}%` }}
              />
              {/* Played */}
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-400 to-brand-600"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            {/* Thumb */}
            <div
              aria-hidden
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-transform duration-150 ${
                scrubbing ? 'scale-110' : 'scale-0 group-hover/track:scale-100'
              }`}
              style={{ left: `${progress * 100}%` }}
            />
          </div>

          {/* Button row */}
          <div className="mt-2 flex items-center gap-1.5 sm:gap-2 text-white">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="inline-flex w-9 h-9 items-center justify-center rounded-full hover:bg-white/15 transition-colors duration-200"
            >
              {isPlaying ? <Pause className="w-4 h-4" fill="currentColor" /> : <Play className="w-4 h-4" fill="currentColor" />}
            </button>

            <button
              type="button"
              onClick={() => skip(-10)}
              aria-label="Back 10 seconds"
              className="hidden sm:inline-flex w-9 h-9 items-center justify-center rounded-full hover:bg-white/15 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => skip(10)}
              aria-label="Forward 10 seconds"
              className="hidden sm:inline-flex w-9 h-9 items-center justify-center rounded-full hover:bg-white/15 transition-colors duration-200"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <div className="ml-1 text-[11px] sm:text-xs font-medium tabular-nums text-white/90 whitespace-nowrap">
              {formatTime(currentTime)} <span className="text-white/45">/ {formatTime(duration)}</span>
            </div>

            <div className="flex-1" />

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              aria-pressed={!isMuted}
              className="inline-flex w-9 h-9 items-center justify-center rounded-full hover:bg-white/15 transition-colors duration-200"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </figure>
  );
}
