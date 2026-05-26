'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Mounts a global IntersectionObserver that toggles `.is-visible`
 * on any element marked with `data-reveal` once it enters the viewport.
 *
 * IMPORTANT: this component sits at the body root (in layout.tsx) and never
 * unmounts between client-side navigations. To make the observer re-run on
 * every new page, we depend on `usePathname()` — App Router updates this
 * hook synchronously when the route changes, so our effect re-fires.
 *
 * Resilience layers:
 *  - rAF before querying so React has committed the new page's DOM
 *  - Only observe elements that don't already have `.is-visible`
 *    (cheap re-runs; previously-revealed nodes stay revealed)
 *  - Safety fallback: after 700ms, force-reveal anything still hidden, so
 *    a new page never stays blank even if the observer misses (covers tiny
 *    viewports, elements already above the fold at navigation time,
 *    IO race conditions, prefers-reduced-motion edge cases).
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Browsers without IntersectionObserver → just reveal everything.
    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)')
        .forEach((el) => el.classList.add('is-visible'));
      return;
    }

    let io: IntersectionObserver | null = null;
    let safetyTimeout: number | null = null;

    // Wait for React commit so the new page's elements are in the DOM.
    const rafId = requestAnimationFrame(() => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)')
      );
      if (nodes.length === 0) return;

      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              const delay = el.dataset.revealDelay;
              if (delay) el.style.transitionDelay = `${delay}ms`;
              el.classList.add('is-visible');
              io?.unobserve(el);
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
      );

      nodes.forEach((n) => io!.observe(n));

      // Safety net: if anything is still hidden after 700ms, force-reveal it.
      safetyTimeout = window.setTimeout(() => {
        document
          .querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)')
          .forEach((el) => el.classList.add('is-visible'));
      }, 700);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (io) io.disconnect();
      if (safetyTimeout) window.clearTimeout(safetyTimeout);
    };
  }, [pathname]);

  return null;
}
