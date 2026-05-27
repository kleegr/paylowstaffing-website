'use client';

import { Plus } from 'lucide-react';
import SectionHeading from './SectionHeading';

/**
 * FAQ — native HTML <details> accordion. v4.
 *
 * Why this version exists:
 * Despite v3 being a plain React state accordion (no typewriter), the user
 * still saw the answer "disappear" on click. The most likely cause was a
 * race between the global `[data-reveal]` opacity transition (0→1 over
 * 0.9s) and the inner accordion's own opacity transition (0→100) firing
 * at the same time in some browsers. Pile a few transitions together and
 * weird things happen.
 *
 * What this is now:
 * Native <details>/<summary>. The browser handles open/close. There is no
 * React state, no event handler, no JS controlling the toggle. The only
 * JavaScript on this page involved with the FAQ is React rendering the
 * static markup once on mount. After that, clicking the question toggles
 * the `open` attribute and the browser shows/hides the content.
 *
 * Visual:
 * - Plus icon rotates 45° to ✕ when open (CSS, via [open] selector)
 * - Plus background goes from ink-50 to brand gradient when open
 * - Card border shifts to brand-200 + shadow when open
 * - Answer fades down on open via CSS @keyframes (280ms, ease-out)
 *
 * Exclusive behavior:
 * `name="paylow-faq"` groups the <details> elements so only one stays
 * open at a time (native HTML feature, supported in all current browsers).
 * Older browsers fall back to multi-open behavior, which still works.
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
  return (
    <section
      id="faq"
      className="section bg-white scroll-mt-24"
      data-faq-version="v4-native-details"
    >
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Questions"
          title={<>Quick <span className="text-gradient">answers.</span></>}
          lead="The questions we hear most."
          align="center"
        />

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              name="paylow-faq"
              className="paylow-faq-item rounded-3xl border border-ink-100 bg-white hover:border-ink-200 transition-colors duration-300 overflow-hidden"
              data-reveal
              data-reveal-delay={i * 60}
            >
              <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer select-none list-none">
                <span className="font-display font-semibold text-ink-900 text-base sm:text-lg">
                  {f.q}
                </span>
                <span
                  aria-hidden="true"
                  className="paylow-faq-plus shrink-0 inline-flex w-8 h-8 items-center justify-center rounded-full bg-ink-50 text-ink-700 transition-all duration-300"
                >
                  <Plus className="w-4 h-4" strokeWidth={2.5} />
                </span>
              </summary>
              <div className="paylow-faq-answer px-5 pb-5 sm:px-6 sm:pb-6">
                <p className="text-ink-600 leading-relaxed text-[15px]">
                  {f.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide the default arrow marker that browsers add to <summary> */
        .paylow-faq-item > summary::-webkit-details-marker { display: none; }
        .paylow-faq-item > summary::marker { content: ''; }

        /* Open state: brand border + shadow */
        .paylow-faq-item[open] {
          border-color: rgb(255 191 154);
          box-shadow: 0 1px 2px rgba(15,13,12,0.04), 0 8px 32px rgba(15,13,12,0.06);
        }

        /* Open state: rotate the Plus to an X with brand gradient bg */
        .paylow-faq-item[open] .paylow-faq-plus {
          background-image: linear-gradient(135deg, #FF8242 0%, #F26C2A 50%, #D9551A 100%);
          color: white;
          transform: rotate(45deg);
          box-shadow: 0 4px 16px rgba(242, 108, 42, 0.30);
        }

        /* Answer fade-down on open. The @keyframes runs once each time
           [open] is added (i.e. every click that opens an item). */
        @keyframes paylow-faq-fade-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .paylow-faq-item[open] > .paylow-faq-answer {
          animation: paylow-faq-fade-in 280ms ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .paylow-faq-item[open] > .paylow-faq-answer { animation: none; }
        }
      ` }} />
    </section>
  );
}
