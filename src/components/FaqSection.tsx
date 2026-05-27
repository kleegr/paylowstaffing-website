'use client';

import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import SectionHeading from './SectionHeading';

/**
 * Homepage FAQ — typewriter reveal.
 *
 * Click + on a question: the answer types in character-by-character. Once
 * fully typed, it holds for 5s, then auto-collapses. The + icon resets.
 *
 * Interaction matrix:
 *  - Click open FAQ while it's typing → close immediately (kill interval).
 *  - Click open FAQ during hold phase → close immediately (kill timeout).
 *  - Click a DIFFERENT FAQ → previous closes cleanly, new one types fresh.
 *  - 5s after typing completes → auto-close.
 *  - prefers-reduced-motion → full answer instant, no auto-close (user
 *    controls pace; we don't yank text away from them).
 *
 * Layout shift avoidance:
 *  - A visually hidden "ghost" paragraph holds the full answer's height.
 *  - The visible typed text overlays it in the same CSS grid cell.
 *  - Result: typing fills in over reserved space — the box doesn't grow
 *    line by line as text appears.
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

const TYPE_MS = 18;     // ms per character
const HOLD_MS = 5000;   // ms to hold fully-typed answer before auto-close

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [typed, setTyped] = useState<Record<number, string>>({});
  const typeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotionRef = useRef(false);

  // One-shot reduced-motion detection. We don't react to mid-session
  // toggles — not worth the complexity for this rare case.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    reducedMotionRef.current = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
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

  // Cleanup on unmount — important for React strict-mode double-mount and
  // for navigation away from the page mid-animation.
  useEffect(() => () => clearTimers(), []);

  const handleClick = (i: number) => {
    // Same FAQ → close. Works during typing, hold, or settled state.
    if (openIdx === i) {
      clearTimers();
      setOpenIdx(null);
      return;
    }

    // Different FAQ (or none open) → open i fresh. We don't touch typed[prev]
    // so the previous box's text stays put while its grid-row collapses
    // (clean close animation). When prev is re-opened later, this handler
    // resets typed[prev] = '' before re-typing.
    clearTimers();
    setOpenIdx(i);

    const fullText = faqs[i].a;

    // Reduced motion: skip the animation entirely. No auto-collapse either
    // — reduced-motion users get manual control over when to close.
    if (reducedMotionRef.current) {
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
        // Hold the fully-typed answer for HOLD_MS, then auto-collapse.
        // The setOpenIdx callback guards against race: if the user already
        // opened a different FAQ during the hold, we leave it alone.
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
            const isTyping = isOpen && !reducedMotionRef.current && displayText.length < f.a.length;

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
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 grid">
                      {/* Ghost: reserves the full answer's height so the visible
                          typed text fills in over the same box — no per-line
                          layout growth as characters appear. */}
                      <p
                        aria-hidden="true"
                        className="col-start-1 row-start-1 invisible select-none text-ink-600 leading-relaxed text-[15px]"
                      >
                        {f.a}
                      </p>
                      {/* Visible typed text overlays the ghost in the same grid cell. */}
                      <p className="col-start-1 row-start-1 text-ink-600 leading-relaxed text-[15px]">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
