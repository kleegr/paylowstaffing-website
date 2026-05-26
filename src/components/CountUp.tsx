'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: number;
  duration?: number;
  format?: (n: number) => string;
}

/**
 * Counts up from 0 → `value` once the element scrolls into view.
 *
 * Why IntersectionObserver: off-screen counters cost nothing until
 * they actually appear. The rAF loop only runs once per stat, then
 * the observer disconnects — no lingering listeners, no perf debt.
 *
 * Why useRef for `started`: prevents double-firing if React re-renders
 * during the animation (state changes trigger the parent's reconciliation,
 * but we want the count to keep running).
 *
 * Respects prefers-reduced-motion: jumps straight to the final value.
 */
export default function CountUp({
  value,
  duration = 1400,
  format = (n: number) => Math.round(n).toLocaleString('en-US'),
}: CountUpProps) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Reduced motion → jump straight to the final value
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            setCurrent(value * eased);
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
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(current)}
    </span>
  );
}
