'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import SectionHeading from './SectionHeading';

/**
 * FAQ — plain accordion. No typewriter, no overlays, no auto-collapse.
 *
 * Why this rewrite (v3):
 * The previous typewriter implementations (grid-cell overlay in v1,
 * absolute-overlay in v2) were unreliable in the user's browser —
 * the answer disappeared instead of typing. The user asked for a
 * simple accordion that just works.
 *
 * What this is now:
 *  - The answer text is always in the DOM, inside a grid-row container.
 *  - Closed state: grid-rows-[0fr] + opacity-0 → row height collapses to 0,
 *    overflow-hidden on inner div clips the answer.
 *  - Open state: grid-rows-[1fr] + opacity-100 → row expands to natural
 *    content height, opacity fades in.
 *  - 400ms ease-out transition on both axes.
 *  - Only one open at a time. Click an open one to close it.
 *  - Plus icon rotates 45deg when open (becomes an X visually).
 *  - No setInterval, no setTimeout, no refs, no auto-collapse.
 *  - Reliable on every browser including mobile.
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

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIdx((cur) => (cur === i ? null : i));
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
            return (
              <div
                key={i}
                className={`rounded-3xl border overflow-hidden transition-all duration-400 ease-out ${
                  isOpen
                    ? 'bg-white border-brand-200 shadow-card'
                    : 'bg-white border-ink-100 hover:border-ink-200'
                }`}
                data-reveal
                data-reveal-delay={i * 60}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span className="font-display font-semibold text-ink-900 text-base sm:text-lg">
                    {f.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 inline-flex w-8 h-8 items-center justify-center rounded-full transition-all duration-400 ease-out ${
                      isOpen
                        ? 'bg-gradient-brand text-white rotate-45 shadow-glow-sm'
                        : 'bg-ink-50 text-ink-700'
                    }`}
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                </button>

                {/* Grid-row animation: the only motion. Always in the
                    DOM, always renders the full <p>. Closed state
                    collapses the row to 0 height; open state lets it
                    expand to natural content height. */}
                <div
                  className={`grid transition-all duration-400 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                      <p className="text-ink-600 leading-relaxed text-[15px]">
                        {f.a}
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
