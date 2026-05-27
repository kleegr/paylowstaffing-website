'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /**
   * String enum (not a function) because this is a Client Component
   * called by Server Components — functions cannot cross the RSC boundary.
   *  - 'comma' (default): en-US locale with commas, e.g. 3000 → "3,000"
   *  - 'int': plain integer, e.g. 80 → "80", 7 → "7"
   */
  format?: 'comma' | 'int';
  className?: string;
}

const formatters = {
  comma: (n: number) => Math.round(n).toLocaleString('en-US'),
  int: (n: number) => Math.round(n).toString(),
};

/**
 * Counts from `from` (default 0) → `value` once the element scrolls into view.
 *
 * Initial state = `from` so SSR markup matches first client paint (no
 * hydration mismatch). IntersectionObserver triggers a rAF animation when
 * ~25% visible, then disconnects — off-screen counters cost nothing.
 *
 * Respects prefers-reduced-motion: jumps straight to `value`, zero shift.
 * Works in both directions: count up (from < value) and count down
 * (from > value, e.g. price drop $55 → $7).
 */
export default function CountUp({
  value,
  from = 0,
  duration = 1400,
  prefix = '',
  suffix = '',
  format = 'comma',
  className,
}: CountUpProps) {
  const [current, setCurrent] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
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

  const fmt = formatters[format];
  const classes = ['tabular-nums', className].filter(Boolean).join(' ');

  return (
    <span ref={ref} className={classes}>
      {prefix}{fmt(current)}{suffix}
    </span>
  );
}
