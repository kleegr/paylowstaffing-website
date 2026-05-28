'use client';

import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

/**
 * TestimonialCarousel
 *
 * A self-contained, dependency-free testimonial slider built to match the
 * PayLow design system. One review shows at a time on a "stacked paper" card.
 *
 * Why no embla / external slider: the site ships with zero runtime UI deps
 * beyond lucide + clsx, and the interaction here (single card, rAF autoplay
 * with a progress bar, drag-to-change, typewriter, sound) is small enough to
 * own directly. That keeps the bundle lean, avoids a "random plugin" feel, and
 * lets the visual hook cleanly into our tokens.
 *
 * Accessibility / resilience:
 *  - region role + aria-label, aria-roledescription="carousel"
 *  - prev/next/dot buttons all have aria-labels; the live slide uses
 *    aria-live="polite" so screen readers hear each quote
 *  - progress bar is aria-hidden (purely decorative); SR users get the dots
 *  - keyboard: ←/→ change slides when the carousel has focus
 *  - prefers-reduced-motion: no autoplay, no typing, no drag transforms —
 *    the full quote shows instantly
 *  - the swipe sound is created lazily and only after a user gesture, so the
 *    browser autoplay policy never throws; all play() rejections are swallowed
 */

type Review = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const AUTO_MS = 4500;
const TYPE_MS = 25;
const SWIPE_SOUND_URL =
  'https://assets.cdn.filesafe.space/qfbPEd8130ccGKpJuL8j/media/69e7901eda11eeea68d7f19a.mp3';
const DRAG_THRESHOLD = 60; // px to commit a slide change

function initials(name: string): string {
  return name
    .replace(/[^a-zA-Z .]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export default function TestimonialCarousel({ reviews }: { reviews: readonly Review[] }) {
  const count = reviews.length;

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);      // 0..1 for the active slide
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [dragX, setDragX] = useState(0);            // live pointer drag offset
  const [dragging, setDragging] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);

  // Refs mirror state for the rAF loop (avoids stale closures / re-subscribing)
  const pausedRef = useRef(false);
  const inViewRef = useRef(false);
  const reducedRef = useRef(false);
  const draggingRef = useRef(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { inViewRef.current = inView; }, [inView]);
  useEffect(() => { reducedRef.current = reduced; }, [reduced]);
  useEffect(() => { draggingRef.current = dragging; }, [dragging]);

  // ---- Audio (lazy + gesture-unlocked) -----------------------------------
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioReadyRef = useRef(false);

  const ensureAudio = useCallback(() => {
    if (audioRef.current || typeof Audio === 'undefined') return;
    try {
      const a = new Audio(SWIPE_SOUND_URL);
      a.volume = 0.15;
      a.playbackRate = 1.5;
      a.preload = 'auto';
      audioRef.current = a;
    } catch {
      audioRef.current = null;
    }
  }, []);

  // Unlock audio on the first real user interaction anywhere on the page, so
  // the later programmatic play() on slide change isn't blocked and never
  // throws a console error under the autoplay policy.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      audioReadyRef.current = true;
      ensureAudio();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
  }, [ensureAudio]);

  const playSwipe = useCallback(() => {
    if (!audioReadyRef.current) return; // no gesture yet → stay silent, no error
    ensureAudio();
    const a = audioRef.current;
    if (!a) return;
    try {
      a.currentTime = 0;
      const p = a.play();
      if (p && typeof p.catch === 'function') p.catch(() => {/* policy/blocked: ignore */});
    } catch {
      /* ignore */
    }
  }, [ensureAudio]);

  // ---- reduced-motion ----------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // ---- in-view detection (drives autoplay + typing start) ----------------
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ---- slide change ------------------------------------------------------
  const goTo = useCallback((next: number, withSound = true) => {
    setIndex(((next % count) + count) % count);
    elapsedRef.current = 0;
    lastTsRef.current = null;
    setProgress(0);
    if (withSound) playSwipe();
  }, [count, playSwipe]);

  const next = useCallback((withSound = true) => goTo(index + 1, withSound), [goTo, index]);
  const prev = useCallback((withSound = true) => goTo(index - 1, withSound), [goTo, index]);

  // ---- autoplay + progress via requestAnimationFrame ---------------------
  useEffect(() => {
    if (reduced) { setProgress(0); return; } // no auto-motion under reduced-motion

    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      const active = inViewRef.current && !pausedRef.current && !draggingRef.current;
      if (active) {
        elapsedRef.current += dt;
        const p = Math.min(1, elapsedRef.current / AUTO_MS);
        setProgress(p);
        if (p >= 1) {
          elapsedRef.current = 0;
          setIndex((i) => (i + 1) % count);
          playSwipe();
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [reduced, count, playSwipe]);

  // ---- pointer drag / swipe ---------------------------------------------
  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  const dragDecided = useRef<null | 'h' | 'v'>(null);

  function onPointerDown(e: React.PointerEvent) {
    if (reducedRef.current) return;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    dragDecided.current = null;
    setDragging(true);
    setPaused(true);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (dragStartX.current == null) return;
    const dx = e.clientX - dragStartX.current;
    const dy = e.clientY - (dragStartY.current ?? 0);
    // Decide gesture axis once, so vertical scrolls aren't hijacked.
    if (dragDecided.current == null) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      dragDecided.current = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
    }
    if (dragDecided.current === 'h') {
      e.preventDefault?.();
      setDragX(dx);
    }
  }
  function endDrag() {
    if (dragStartX.current == null) return;
    const committed = dragDecided.current === 'h' && Math.abs(dragX) > DRAG_THRESHOLD;
    if (committed) {
      if (dragX < 0) next(); else prev();
    }
    dragStartX.current = null;
    dragStartY.current = null;
    dragDecided.current = null;
    setDragX(0);
    setDragging(false);
    setPaused(false);
  }

  // ---- keyboard ----------------------------------------------------------
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  }

  const active = reviews[index];

  return (
    <div
      ref={sectionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative mx-auto max-w-2xl outline-none"
    >
      {/* ===== Stacked-paper stage ===== */}
      <div className="relative">
        {/* Paper layers behind the active card (decorative) */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 rounded-[1.75rem] bg-white border border-ink-100 shadow-card origin-bottom"
               style={{ transform: 'translateY(26px) scale(0.93)' }} />
          <div className="absolute inset-0 rounded-[1.75rem] bg-white border border-ink-100 shadow-card origin-bottom"
               style={{ transform: 'translateY(16px) scale(0.96)' }} />
          <div className="absolute inset-0 rounded-[1.75rem] bg-white border border-ink-100 shadow-card origin-bottom"
               style={{ transform: 'translateY(7px) scale(0.98)' }} />
          {/* subtle brand edge peeking from the very back */}
          <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-brand opacity-[0.10] origin-bottom"
               style={{ transform: 'translateY(34px) scale(0.91)' }} />
        </div>

        {/* Active card */}
        <article
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={() => { if (draggingRef.current) endDrag(); }}
          aria-live="polite"
          className="relative rounded-[1.75rem] bg-white border border-ink-100 shadow-lift p-7 sm:p-9 select-none touch-pan-y noise"
          style={{
            transform: reduced ? undefined : `translateX(${dragX}px) rotate(${dragX * 0.01}deg)`,
            transition: dragging ? 'none' : 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
            cursor: dragging ? 'grabbing' : 'grab',
          }}
        >
          {/* brand glow */}
          <div aria-hidden className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-gradient-brand opacity-[0.08] blur-3xl" />

          {/* Top row: quote mark + stars */}
          <div className="flex items-center justify-between relative">
            <span className="inline-flex w-11 h-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
              <Quote className="w-5 h-5" strokeWidth={2} />
            </span>
            <div className="flex gap-0.5 text-brand-500" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="w-4 h-4 fill-current" aria-hidden />
              ))}
            </div>
          </div>

          {/* Quote — handwritten + typewriter */}
          <div className="mt-5 relative">
            <TypewriterQuote
              key={index}
              text={active.quote}
              active={inView}
              reduced={reduced}
            />
          </div>

          {/* Attribution */}
          <div className="mt-7 pt-5 border-t border-ink-100 flex items-center gap-3 relative">
            <span
              aria-hidden
              className="inline-flex w-11 h-11 items-center justify-center rounded-full font-display font-bold text-sm shrink-0 bg-brand-50 text-brand-700 border border-brand-100"
            >
              {initials(active.name)}
            </span>
            <div className="min-w-0">
              <div className="font-display font-semibold text-sm text-ink-900">{active.name}</div>
              <div className="text-xs text-ink-500 truncate">{active.role} &middot; {active.company}</div>
            </div>
          </div>
        </article>
      </div>

      {/* ===== Progress bar (decorative) ===== */}
      <div aria-hidden className="mt-8 h-1 w-full max-w-xs mx-auto rounded-full bg-ink-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
          style={{
            width: `${(reduced ? 0 : progress) * 100}%`,
            transition: dragging ? 'none' : 'width 80ms linear',
          }}
        />
      </div>

      {/* ===== Controls ===== */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => prev()}
          aria-label="Previous testimonial"
          className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white border border-ink-200 text-ink-700 hover:border-ink-900 hover:text-ink-900 transition-colors duration-200 shadow-soft"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1} of ${count}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-gradient-brand' : 'w-2 bg-ink-200 hover:bg-ink-300'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => next()}
          aria-label="Next testimonial"
          className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white border border-ink-200 text-ink-700 hover:border-ink-900 hover:text-ink-900 transition-colors duration-200 shadow-soft"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

/**
 * TypewriterQuote — per-character typing on the handwritten quote.
 *
 *  - Reserves the full text height with an invisible ghost (no layout shift).
 *  - Types ~25ms/char when `active` (section in view); restarts on remount
 *    (parent passes key={index} so each slide is a fresh instance).
 *  - reduced || !active → full text shown instantly, no caret.
 */
function TypewriterQuote({
  text, active, reduced,
}: { text: string; active: boolean; reduced: boolean }) {
  const [shown, setShown] = useState(reduced ? text.length : 0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced || !active) {
      setShown(text.length);
      return;
    }
    setShown(0);
    let i = 0;
    const step = () => {
      i += 1;
      setShown(i);
      if (i < text.length) {
        timerRef.current = window.setTimeout(step, TYPE_MS);
      }
    };
    timerRef.current = window.setTimeout(step, TYPE_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [text, active, reduced]);

  const typing = shown > 0 && shown < text.length;

  return (
    <p className="relative font-hand text-ink-800 leading-snug text-2xl sm:text-[1.75rem]">
      {/* Ghost reserves height to prevent layout shift while typing */}
      <span aria-hidden className="invisible block whitespace-pre-wrap">&ldquo;{text}&rdquo;</span>
      {/* Visible typed text overlaid exactly on top of the ghost */}
      <span className="absolute inset-0 block whitespace-pre-wrap">
        &ldquo;{text.slice(0, shown)}
        {typing && !reduced && (
          <span aria-hidden className="inline-block w-[2px] h-[0.9em] align-text-bottom bg-brand-500 ml-0.5 animate-pulse" />
        )}
        {shown >= text.length && '\u201d'}
      </span>
    </p>
  );
}
