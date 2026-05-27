'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import SectionHeading from './SectionHeading';

/**
 * Homepage FAQ — 5-item accordion. Anchored at #faq so /faq → /#faq (308
 * redirect in next.config.mjs) lands here.
 *
 * Copy pass: removed "no agency commission" from FAQ #2 (PayLow IS a
 * staffing service, so claiming "no agency" is incoherent). Replaced with
 * the stronger, more concrete promise: "no setup fees, no surprise markups".
 */

const faqs = [
  {
    q: 'How fast can I actually hire?',
    a: 'Most clients meet their 4 or 5 picks within five business days and hire within seven. The 15-minute scoping call is the longest part.',
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
  const [open, setOpen] = useState<number | null>(0);

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
            const isOpen = open === i;
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
                  onClick={() => setOpen(isOpen ? null : i)}
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
                    <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-ink-600 leading-relaxed text-[15px]">{f.a}</p>
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
