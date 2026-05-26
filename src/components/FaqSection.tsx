'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import SectionHeading from './SectionHeading';

/**
 * Homepage FAQ — compact 5-item accordion.
 *
 * Replaces the standalone /faq page. Keeps the highest-leverage answers users
 * actually need before they sign up. Anchored at #faq so /faq → /#faq
 * (308 in next.config.mjs) lands smoothly here.
 *
 * Accordion uses the CSS grid-template-rows trick for height animation:
 * a parent with `grid-rows-[0fr]` collapses to height 0, and animating to
 * `grid-rows-[1fr]` smoothly expands to fit content. Pure CSS, no JS
 * measuring, works for any content height. Wider browser support than
 * `interpolate-size: allow-keywords` and cleaner than a max-height hack.
 */

const faqs = [
  {
    q: 'How fast can I actually hire?',
    a: 'Most clients meet their three-person shortlist within five business days and hire within seven. The fifteen-minute scoping call is the longest part of the process.',
  },
  {
    q: 'What does $7/hour really include?',
    a: 'Everything. The hourly rate covers the hire\u2019s pay, our placement, ongoing account management, and the tools we provide. No payroll tax, no agency commission, no setup fee, no surprises.',
  },
  {
    q: 'How do you screen candidates?',
    a: 'Multiple rounds. Technical and skills assessment, English and communication review, background and reference checks, then a culture-fit conversation. Roughly one in fifty applicants reaches your shortlist.',
  },
  {
    q: 'What time zones do they work?',
    a: 'Yours. Talent is matched to your business hours \u2014 most placements maintain at least six hours of overlap with US Eastern. Full follow-the-sun coverage is available on request.',
  },
  {
    q: 'What if it isn\u2019t a fit?',
    a: 'No long-term contracts. If the hire isn\u2019t working out in the first thirty days, we replace them at no cost. Beyond that, you can end the engagement any time with two weeks\u2019 notice.',
  },
];

export default function FaqSection() {
  // Default to first item open so the section has visible content on landing.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section bg-white scroll-mt-24">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Questions"
          title={
            <>
              Quick <span className="text-gradient">answers.</span>
            </>
          }
          lead="Everything you might be wondering, in five lines or less."
          align="center"
        />

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-3xl border overflow-hidden transition-all duration-500 ease-out ${
                  isOpen
                    ? 'bg-white border-brand-200 shadow-card'
                    : 'bg-white border-ink-100 hover:border-ink-200'
                }`}
                data-reveal
                data-reveal-delay={i * 60}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span className="font-display font-semibold text-ink-900 text-base sm:text-lg">
                    {f.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 inline-flex w-8 h-8 items-center justify-center rounded-full transition-all duration-500 ease-out ${
                      isOpen
                        ? 'bg-gradient-brand text-white rotate-45 shadow-glow-sm'
                        : 'bg-ink-50 text-ink-700'
                    }`}
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-ink-600 leading-relaxed text-[15px]">
                      {f.a}
                    </p>
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
