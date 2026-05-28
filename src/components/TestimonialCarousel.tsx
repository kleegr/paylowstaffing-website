'use client';

import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

/**
 * TestimonialCarousel — a pile of handwritten review cards you flip through.
 *
 * The interaction model is a physical card stack, not a fading slider:
 *  - 3 cards are rendered at once: the active card on top, plus two peeking
 *    from underneath at smaller scale + downward offset + slight rotation, so
 *    it reads as a real pile.
 *  - Advancing flicks the top card up-and-away (translate + rotate + fade)
 *    while the cards beneath shift forward into place. Going back drops a card
 *    down onto the top of the pile. Driven by a short phase state machine with
 *    CSS transforms — no animation library.
 *  - Live pointer drag tilts + slides the top card; releasing past a threshold
 *    commits the flick in that direction (works on mouse + touch).
 *  - Each card uses a different handwriting treatment (font family, size,
 *    slant, spacing, weight) so every quote feels like a different person.
 *  - The active quote types out; auto-advance is tied to that — it only moves
 *    on AFTER the typing finishes plus a short reading pause (a subtle line
 *    shows that pause), so it never feels like a blind timer. Hover / touch /
 *    drag / manual nav all override it.
 *
 * Dependency-free to match the design system. Accessible: labelled region,
 * aria-labelled controls, aria-live quote, keyboard arrows, and a full
 * reduced-motion path (no flicking, no typing, instant text).
 */

type Review = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const TYPE_MS = 28;          // per-character typing speed (gentle)
const READ_PAUSE_MS = 2600;  // pause AFTER typing finishes before auto-advancing
const FLICK_MS = 460;        // card flick-away animation duration
const DRAG_THRESHOLD = 70;   // px to commit a flick
const SWIPE_SOUND_URL =
  'https://assets.cdn.filesafe.space/qfbPEd8130ccGKpJuL8j/media/69e7901eda11eeea68d7f19a.mp3';

function initials(name: string): string {
  return name
    .replace(/[^a-zA-Z .]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

/**
 * Per-card handwriting treatments. Two self-hosted handwritten faces
 * (Shadows Into Light Two = var(--font-hand); Caveat = var(--font-script))
 * combined with size / slant / spacing / weight variation so each card reads
 * like a different hand. Kept readable + premium — small rotations only.
 */
type Hand = {
  fontFamily: string;
  fontSize: string;        // responsive via clamp
  fontWeight: number;
  letterSpacing: string;
  fontStyle?: 'normal' | 'italic';
  rotate: number;          // whole-card paper tilt (deg)
};
const HANDS: Hand[] = [
  { fontFamily: 'var(--font-hand)',   fontSize: 'clamp(1.5rem, 4.4vw, 1.9rem)',  fontWeight: 400, letterSpacing: '0.01em',  rotate: -1.4 },
  { fontFamily: 'var(--font-script)', fontSize: 'clamp(1.75rem, 5vw, 2.3rem)',   fontWeight: 700, letterSpacing: '0',       rotate: 1.6 },
  { fontFamily: 'var(--font-hand)',   fontSize: 'clamp(1.45rem, 4.2vw, 1.8rem)', fontWeight: 400, letterSpacing: '0.02em',  fontStyle: 'italic', rotate: 0.8 },
  { fontFamily: 'var(--font-script)', fontSize: 'clamp(1.7rem, 4.8vw, 2.15rem)', fontWeight: 500, letterSpacing: '0.005em', rotate: -2.1 },
  { fontFamily: 'var(--font-hand)',   fontSize: 'clamp(1.55rem, 4.6vw, 2rem)',   fontWeight: 400, letterSpacing: '0',       rotate: 1.1 },
  { fontFamily: 'var(--font-script)', fontSize: 'clamp(1.8rem, 5.2vw, 2.4rem)',  fontWeight: 700, letterSpacing: '0.005em', rotate: -0.7 },
];
const handFor = (i: number): Hand => HANDS[i % HANDS.length];

// Ink color per card — all dark and readable, just subtly different so the
// pens feel different too.
const INKS = ['#2A2620', '#1A1816', '#3F3A30', '#222', '#2A2620', '#1A1816'];
const inkFor = (i: number) => INKS[i % INKS.length];

export default function TestimonialCarousel({ reviews }: { reviews: readonly Review[] }) {
  const count = reviews.length;

  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [typed, setTyped] = useState(false);      // active card finished typing
  const [readProgress, setReadProgress] = useState(0); // 0..1 reading-pause fill

  // Flick animation state
  const [phase, setPhase] = useState<'idle' | 'out'>('idle');
  const [dir, setDir] = useState<1 | -1>(1);       // 1 = next, -1 = prev
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // mirrors for the rAF reading-pause loop
  const pausedRef = useRef(false);
  const inViewRef = useRef(false);
  const reducedRef = useRef(false);
  const typedRef = useRef(false);
  const draggingRef = useRef(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { inViewRef.current = inView; }, [inView]);
  useEffect(() => { reducedRef.current = reduced; }, [reduced]);
  useEffect(() => { typedRef.current = typed; }, [typed]);
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
    } catch { audioRef.current = null; }
  }, []);
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
    if (!audioReadyRef.current) return;
    ensureAudio();
    const a = audioRef.current;
    if (!a) return;
    try {
      a.currentTime = 0;
      const p = a.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch { /* ignore */ }
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

  // ---- in-view detection -------------------------------------------------
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ---- advance with a flick ---------------------------------------------
  const flickTimer = useRef<number | null>(null);
  const advance = useCallback((direction: 1 | -1) => {
    if (phase === 'out') return; // already animating
    setTyped(false);
    setReadProgress(0);
    playSwipe();

    if (reducedRef.current) {
      setIndex((i) => (((i + direction) % count) + count) % count);
      return;
    }
    setDir(direction);
    setPhase('out');
    if (flickTimer.current) window.clearTimeout(flickTimer.current);
    flickTimer.current = window.setTimeout(() => {
      setIndex((i) => (((i + direction) % count) + count) % count);
      setDragX(0);
      setDragY(0);
      setPhase('idle');
    }, FLICK_MS);
  }, [phase, count, playSwipe]);

  const next = useCallback(() => advance(1), [advance]);
  const prev = useCallback(() => advance(-1), [advance]);
  const goTo = useCallback((target: number) => {
    if (target === index) return;
    advance(target > index ? 1 : -1);
  }, [advance, index]);

  useEffect(() => () => { if (flickTimer.current) window.clearTimeout(flickTimer.current); }, []);

  // ---- auto-advance tied to typing completion + reading pause ------------
  useEffect(() => {
    if (reduced) return;            // no auto-motion under reduced-motion
    let raf = 0;
    let last: number | null = null;
    let elapsed = 0;

    const tick = (ts: number) => {
      if (last == null) last = ts;
      const dt = ts - last;
      last = ts;
      // Only count down once the card has finished typing, is on screen, and
      // the user isn't interacting. This makes the advance feel like the card
      // is "done being read", not a blind timer.
      const counting =
        typedRef.current && inViewRef.current && !pausedRef.current && !draggingRef.current;
      if (counting) {
        elapsed += dt;
        const p = Math.min(1, elapsed / READ_PAUSE_MS);
        setReadProgress(p);
        if (p >= 1) { elapsed = 0; setReadProgress(0); next(); }
      } else if (!typedRef.current) {
        // still typing → keep the indicator empty
        elapsed = 0;
        setReadProgress((prevP) => (prevP !== 0 ? 0 : prevP));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // re-arm whenever the active card changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, next, index]);

  // ---- pointer drag / swipe ---------------------------------------------
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const axis = useRef<null | 'h' | 'v'>(null);

  function onPointerDown(e: React.PointerEvent) {
    if (reducedRef.current || phase === 'out') return;
    startX.current = e.clientX;
    startY.current = e.clientY;
    axis.current = null;
    setDragging(true);
    setPaused(true);
    try { (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId); } catch { /* noop */ }
  }
  function onPointerMove(e: React.PointerEvent) {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - (startY.current ?? 0);
    if (axis.current == null) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      axis.current = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
    }
    if (axis.current === 'h') {
      e.preventDefault?.();
      setDragX(dx);
      setDragY(Math.abs(dx) * -0.12); // slight lift as you pull it off the pile
    }
  }
  function endDrag() {
    if (startX.current == null) return;
    const committed = axis.current === 'h' && Math.abs(dragX) > DRAG_THRESHOLD;
    const dx = dragX;
    startX.current = null;
    startY.current = null;
    axis.current = null;
    setDragging(false);
    if (committed) {
      advance(dx < 0 ? 1 : -1);
    } else {
      // snap back
      setDragX(0);
      setDragY(0);
      setPaused(false);
    }
  }

  // ---- keyboard ----------------------------------------------------------
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  }

  // The three cards currently in the pile (active + two behind).
  const stack = [0, 1, 2].map((d) => {
    const i = (index + d) % count;
    return { depth: d, i, review: reviews[i] };
  });

  const counter = (n: number) => String(n + 1).padStart(2, '0');

  return (
    <div
      ref={sectionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { if (!draggingRef.current) setPaused(false); }}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative mx-auto max-w-2xl outline-none"
    >
      {/* ===== Card pile ===== */}
      {/* Height is reserved by an invisible sizer so the absolutely-positioned
          stack never collapses the layout or shifts as cards animate. */}
      <div className="relative">
        <CardSizer reviews={reviews} />

        {/* Render back-to-front: deepest first, active last (on top). */}
        {stack.slice().reverse().map(({ depth, i, review }) => {
          const isActive = depth === 0;
          const hand = handFor(i);

          // Resting transform for each depth in the pile.
          const restRotate = [hand.rotate, hand.rotate + 2.4, hand.rotate - 3][depth] ?? 0;
          const restScale = [1, 0.955, 0.91][depth] ?? 0.9;
          const restY = [0, 18, 34][depth] ?? 40;
          const restOpacity = [1, 1, 0.92][depth] ?? 0;

          let transform = `translate3d(0, ${restY}px, 0) scale(${restScale}) rotate(${restRotate}deg)`;
          let opacity = restOpacity;
          let transition =
            'transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s cubic-bezier(0.22,1,0.36,1)';
          let zIndex = 30 - depth;

          if (isActive) {
            if (dragging) {
              transform = `translate3d(${dragX}px, ${dragY}px, 0) rotate(${dragX * 0.04}deg)`;
              transition = 'none';
            } else if (phase === 'out') {
              // Flick the top card off the pile in the drag/nav direction.
              const offX = dir === 1 ? -520 : 520;
              const offRot = dir === 1 ? -18 : 18;
              transform = `translate3d(${offX}px, -120px, 0) rotate(${offRot}deg) scale(0.92)`;
              opacity = 0;
              transition = `transform ${FLICK_MS}ms cubic-bezier(0.55,0,0.6,1), opacity ${FLICK_MS}ms ease-in`;
              zIndex = 40;
            }
          } else if (phase === 'out') {
            // Cards underneath rise toward the front as the top one leaves.
            const promoteRotate = [0, hand.rotate, hand.rotate + 2.4][depth] ?? 0;
            const promoteScale = [1, 1, 0.955][depth] ?? 0.95;
            const promoteY = [0, 0, 18][depth] ?? 30;
            transform = `translate3d(0, ${promoteY}px, 0) scale(${promoteScale}) rotate(${promoteRotate}deg)`;
            opacity = 1;
          }

          return (
            <article
              key={`${i}-${depth}`}
              aria-hidden={!isActive}
              aria-live={isActive ? 'polite' : undefined}
              onPointerDown={isActive ? onPointerDown : undefined}
              onPointerMove={isActive ? onPointerMove : undefined}
              onPointerUp={isActive ? endDrag : undefined}
              onPointerCancel={isActive ? endDrag : undefined}
              className={`absolute inset-x-0 top-0 rounded-[1.75rem] bg-white border border-ink-100 p-7 sm:p-9 noise ${
                isActive ? 'shadow-lift select-none touch-pan-y' : 'shadow-card pointer-events-none'
              }`}
              style={{
                transform,
                opacity,
                transition,
                zIndex,
                cursor: isActive ? (dragging ? 'grabbing' : 'grab') : undefined,
                willChange: 'transform, opacity',
              }}
            >
              {/* dog-eared corner fold — small paper detail */}
              <span
                aria-hidden
                className="absolute top-0 right-0 w-7 h-7 rounded-bl-xl rounded-tr-[1.75rem]"
                style={{
                  background: 'linear-gradient(135deg, rgba(242,108,42,0.16), rgba(242,108,42,0.04))',
                  boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.6)',
                }}
              />
              {isActive && (
                <div aria-hidden className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-gradient-brand opacity-[0.07] blur-3xl" />
              )}

              {/* Top row: quote mark + stars */}
              <div className="flex items-center justify-between relative">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
                  <Quote className="w-5 h-5" strokeWidth={2} />
                </span>
                <div className="flex gap-0.5 text-brand-500" aria-label={isActive ? '5 out of 5 stars' : undefined}>
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="w-3.5 h-3.5 fill-current" aria-hidden />
                  ))}
                </div>
              </div>

              {/* Quote — per-card handwriting; active card types out */}
              <div className="mt-5 relative">
                <HandQuote
                  key={isActive ? `active-${i}` : `bg-${i}`}
                  text={review.quote}
                  hand={hand}
                  ink={inkFor(i)}
                  typing={isActive}
                  active={isActive && inView}
                  reduced={reduced}
                  onDone={isActive ? () => setTyped(true) : undefined}
                />
              </div>

              {/* Attribution */}
              <div className="mt-7 pt-5 border-t border-ink-100 flex items-center gap-3 relative">
                <span
                  aria-hidden
                  className="inline-flex w-11 h-11 items-center justify-center rounded-full font-display font-bold text-sm shrink-0 bg-brand-50 text-brand-700 border border-brand-100"
                >
                  {initials(review.name)}
                </span>
                <div className="min-w-0">
                  <div className="font-display font-semibold text-sm text-ink-900">{review.name}</div>
                  <div className="text-xs text-ink-500 truncate">{review.role} &middot; {review.company}</div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ===== Controls row: prev · counter+progress · next ===== */}
      <div className="mt-9 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-white border border-ink-200 text-ink-700 hover:border-brand-500 hover:text-brand-600 active:scale-95 transition-all duration-200 shadow-soft"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center gap-2 min-w-[8rem]">
          {/* card counter — "02 / 06" */}
          <div className="font-display font-bold text-sm text-ink-900 tabular-nums tracking-wide">
            <span className="text-brand-600">{counter(index)}</span>
            <span className="text-ink-300"> / {counter(count - 1)}</span>
          </div>
          {/* subtle reading-pause indicator (only fills after typing finishes) */}
          <div aria-hidden className="h-[3px] w-28 rounded-full bg-ink-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
              style={{
                width: `${(reduced ? 0 : readProgress) * 100}%`,
                transition: 'width 90ms linear',
              }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-white border border-ink-200 text-ink-700 hover:border-brand-500 hover:text-brand-600 active:scale-95 transition-all duration-200 shadow-soft"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ===== Dots ===== */}
      <div className="mt-5 flex items-center justify-center gap-2">
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

      {/* ===== "swipe to read more" hint ===== */}
      <div className="mt-6 flex items-center justify-center gap-2 text-ink-400">
        <span className="handwritten-accent text-lg text-brand-500">swipe to read more</span>
        <ArrowRight aria-hidden className="w-4 h-4 text-brand-400 animate-pulse" />
      </div>
    </div>
  );
}

/**
 * Invisible sizer — renders the longest quote in the tallest handwriting
 * treatment so the pile's container reserves enough height for the biggest
 * card. Keeps the absolutely-positioned stack from collapsing and prevents
 * layout shift as cards swap. Never visible to users or screen readers.
 */
function CardSizer({ reviews }: { reviews: readonly Review[] }) {
  const longest = reviews.reduce((a, b) => (a.quote.length >= b.quote.length ? a : b), reviews[0]);
  return (
    <article aria-hidden className="invisible rounded-[1.75rem] border p-7 sm:p-9" style={{ pointerEvents: 'none' }}>
      <div className="flex items-center justify-between">
        <span className="inline-flex w-10 h-10" />
        <span className="inline-flex w-20 h-4" />
      </div>
      <p
        className="mt-5 whitespace-pre-wrap leading-snug"
        style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.8rem, 5.2vw, 2.4rem)', fontWeight: 700, lineHeight: 1.35 }}
      >
        &ldquo;{longest.quote}&rdquo;
      </p>
      <div className="mt-7 pt-5 border-t flex items-center gap-3">
        <span className="inline-flex w-11 h-11" />
        <div>
          <div className="font-display font-semibold text-sm">Placeholder Name</div>
          <div className="text-xs">Role &middot; Company</div>
        </div>
      </div>
    </article>
  );
}

/**
 * HandQuote — renders the quote in a given handwriting treatment.
 * On the active card it types out per character; background cards show full
 * text immediately. Height is reserved by an invisible ghost so there is no
 * layout jump while typing. reduced || !active → full text instantly, no caret.
 */
function HandQuote({
  text, hand, ink, typing, active, reduced, onDone,
}: {
  text: string;
  hand: Hand;
  ink: string;
  typing: boolean;
  active: boolean;
  reduced: boolean;
  onDone?: () => void;
}) {
  const initialShown = !typing || reduced || !active ? text.length : 0;
  const [shown, setShown] = useState(initialShown);
  const timerRef = useRef<number | null>(null);
  const doneRef = useRef(onDone);
  useEffect(() => { doneRef.current = onDone; }, [onDone]);

  useEffect(() => {
    if (!typing || reduced || !active) {
      setShown(text.length);
      if (typing) doneRef.current?.();   // instantly "done" so auto-advance can arm
      return;
    }
    setShown(0);
    let i = 0;
    const step = () => {
      i += 1;
      setShown(i);
      if (i < text.length) {
        timerRef.current = window.setTimeout(step, TYPE_MS);
      } else {
        doneRef.current?.();
      }
    };
    timerRef.current = window.setTimeout(step, TYPE_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [text, typing, active, reduced]);

  const isTyping = typing && shown > 0 && shown < text.length;

  const style: React.CSSProperties = {
    fontFamily: hand.fontFamily,
    fontSize: hand.fontSize,
    fontWeight: hand.fontWeight,
    letterSpacing: hand.letterSpacing,
    fontStyle: hand.fontStyle ?? 'normal',
    color: ink,
    lineHeight: 1.35,
  };

  return (
    <p className="relative" style={style}>
      {/* Ghost reserves height for the full quote (no layout shift). */}
      <span aria-hidden className="invisible block whitespace-pre-wrap">&ldquo;{text}&rdquo;</span>
      {/* Visible (typed) text overlaid on the ghost. */}
      <span className="absolute inset-0 block whitespace-pre-wrap">
        &ldquo;{text.slice(0, shown)}
        {isTyping && !reduced && (
          <span aria-hidden className="inline-block w-[2px] h-[0.85em] align-text-bottom bg-brand-500 ml-0.5 animate-pulse" />
        )}
        {shown >= text.length && '\u201d'}
      </span>
    </p>
  );
}
