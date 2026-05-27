'use client';

import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import SectionHeading from './SectionHeading';

/**
 * Homepage FAQ — typewriter reveal (v2).
 *
 * Click + on a question → answer types in character-by-character. Once
 * fully typed, holds for 5s, then auto-collapses. The + icon resets.
 *
 * v2 changes vs v1 (which had a rendering bug where the answer never
 * appeared):
 *  - Replaced the CSS-grid overlay (two <p> in the same grid cell) with
 *    `position:absolute inset-0` over a `position:relative` parent. The
 *    grid stack was fragile; the absolute overlay is the standard pattern
 *    and works deterministically across browsers.
 *  - Slowed timing from 18ms/char to 80ms/char so typing is clearly
 *    visible at premium pace (~12s for a 150-char answer, then 5s hold).
 *  - Switched reduced-motion detection to useState so SSR/hydration is
 *    deterministic.
 */

const faqs = [
  {
    q: 'How fast can I actually hire?',
    a: 'Most clients meet their 4 or 5 picks within five business days. Compare them side by side and hire on the call. The 15-minute scoping call is the longest part.',
  },
  {
    q: 'What does $7/hour really include?',
    a: 'Everything. Their pay, our placement, ongoing account management, and the tools we provide. No payroll tax, no setup fees, no surprise markups.',
  },
  {
    q: 'How do you screen candidates?',
    a: 'Multiple rounds. Skills tests, English review, background and reference checks, then a culture-fit interview. About one in fifty applicants makes your shortlist.',
  },
  {
    q: 'What time zones do they work?',
    a: 'Yours. Matched to your business hours, with at least six hours of overlap with US Eastern. Round-the-clock coverage on request.',
  },
  {
    q: 'What if it isn\u2019t a fit?',
    a: 'No long-term contracts. If the hire isn\u2019t working out in the first 30 days, we replace them free. After that, end anytime with two weeks\u2019 notice.',
  },
];

const TYPE_MS = 80;     // 12.5 chars/sec — typical answer types in ~12s
const HOLD_MS = 5000;   // 5s after typing completes, then auto-close

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [typed, setTyped] = useState<Record<number, string>>({});
  const typeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setReducedMotion(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  }, []);

  const clearTimers = () => {
    if (typeIntervalRef.current) {
      clearInterval(typeIntervalRef.current);
      typeIntervalRef.current = null;
    }
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
  };

  useEffect(() => () => clearTimers(), []);

  const handleClick = (i: number) => {
    // Same FAQ → close. Works during typing, hold, or settled state.
    if (openIdx === i) {
      clearTimers();
      setOpenIdx(null);
      return;
    }

    // Different (or none) → open i. Previous box's typed text stays put
    // during its grid-row close transition; when re-opened later, this
    // handler resets that index's typed text to '' before re-typing.
    clearTimers();
    setOpenIdx(i);

    const fullText = faqs[i].a;

    // Reduced motion → show full answer instantly, no auto-close.
    // Reduced-motion users keep control over when to close.
    if (reducedMotion) {
      setTyped((prev) => ({ ...prev, [i]: fullText }));
      return;
    }

    setTyped((prev) => ({ ...prev, [i]: '' }));

    let pos = 0;
    typeIntervalRef.current = setInterval(() => {
      pos++;
      setTyped((prev) => ({ ...prev, [i]: fullText.slice(0, pos) }));
      if (pos >= fullText.length) {
        if (typeIntervalRef.current) {
          clearInterval(typeIntervalRef.current);
          typeIntervalRef.current = null;
        }
        holdTimeoutRef.current = setTimeout(() => {
          setOpenIdx((cur) => (cur === i ? null : cur));
          holdTimeoutRef.current = null;
        }, HOLD_MS);
      }
    }, TYPE_MS);
  };

  return (
    <section id="faq" className="section bg-white scroll-mt-24">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Questions"
          title={<>Quick <span className="text-gradient">answers.</span></>}
          lead="The questions we hear most."
          align="center"
        />

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            const displayText = typed[i] ?? '';
            const isTyping = isOpen && !reducedMotion && displayText.length < f.a.length;

            return (
              <div
                key={i}
                className={`rounded-3xl border overflow-hidden transition-all duration-500 ease-out ${
                  isOpen ? 'bg-white border-brand-200 shadow-card' : 'bg-white border-ink-100 hover:border-ink-200'
                }`}
                data-reveal
                data-reveal-delay={i * 60}
              >
                <button
                  type="button"
                  onClick={() => handleClick(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span className="font-display font-semibold text-ink-900 text-base sm:text-lg">{f.q}</span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 inline-flex w-8 h-8 items-center justify-center rounded-full transition-all duration-500 ease-out ${
                      isOpen ? 'bg-gradient-brand text-white rotate-45 shadow-glow-sm' : 'bg-ink-50 text-ink-700'
                    }`}
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                </button>
                <div className={`grid transition-all duration-500 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                      {/* relative wrapper has no padding — its bounding box
                          equals the ghost <p> bounding box. The absolute
                          overlay's inset-0 then aligns perfectly. */}
                      <div className="relative">
                        {/* Ghost: reserves the full answer's natural height.
                            `invisible` = visibility:hidden (keeps layout,
                            removes from accessibility tree). */}
                        <p
                          aria-hidden="true"
                          className="invisible select-none text-ink-600 leading-relaxed text-[15px]"
                        >
                          {f.a}
                        </p>
                        {/* Visible typed text — absolute, inset-0, identical
                            font metrics to the ghost so wrapping matches. */}
                        <p className="absolute inset-0 text-ink-600 leading-relaxed text-[15px]">
                          {displayText}
                          {isTyping && (
                            <span
                              aria-hidden="true"
                              className="inline-block w-[2px] h-[0.95em] bg-brand-500 ml-0.5 align-text-bottom animate-pulse"
                              style={{ animationDuration: '0.9s' }}
                            />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
