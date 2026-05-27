'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** Final value the counter animates to. */
  value: number;
  /** Starting value of the animation. Defaults to 0 (count up). Set higher
   *  than `value` for a countdown (e.g. price drop from 55 → 7). */
  from?: number;
  duration?: number;
  format?: (n: number) => string;
  /** Extra classes for the inner span. Used to apply text-gradient since
   *  background-clip:text on the parent does not propagate to children. */
  className?: string;
}

/**
 * Counts from `from` (default 0) → `value` once the element scrolls into view.
 *
 * Initial state matches the SSR-rendered value (`from`) so hydration is clean.
 * IntersectionObserver triggers the rAF animation when the element is ~25%
 * visible, then disconnects itself — off-screen counters cost nothing.
 *
 * Respects prefers-reduced-motion: jumps straight to `value` with no
 * animation, no rAF, no layout shift.
 *
 * Works for both directions: from < value (count up) and from > value
 * (count down). The eased delta is computed once per frame.
 */
export default function CountUp({
  value,
  from = 0,
  duration = 1400,
  format = (n: number) => Math.round(n).toLocaleString('en-US'),
  className,
}: CountUpProps) {
  const [current, setCurrent] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Reduced motion → jump straight to the final value. No animation,
    // no observer, no layout shift.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    const delta = value - from;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            // easeOutCubic — decelerates toward the final value
            const eased = 1 - Math.pow(1 - t, 3);
            setCurrent(from + delta * eased);
            if (t < 1) rafId = requestAnimationFrame(tick);
          };
          rafId = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [value, from, duration]);

  const classes = ['tabular-nums', className].filter(Boolean).join(' ');

  return (
    <span ref={ref} className={classes}>
      {format(current)}
    </span>
  );
}
