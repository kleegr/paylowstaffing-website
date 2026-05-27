'use client';

import { Plus } from 'lucide-react';
import SectionHeading from './SectionHeading';
import FaqAnswer from './FaqAnswer';

/**
 * FAQ — native HTML <details> + word-by-word typewriter. v5.
 *
 * Builds on v4 (native <details>, which finally fixed the disappearing
 * bug) and adds a stable typewriter on top via the FaqAnswer client
 * component.
 *
 * What's the same as v4:
 * - <details>/<summary> structure — browser handles open/close
 * - name="paylow-faq" for exclusive-open behavior
 * - [open] CSS selector for icon rotation, border, shadow
 * - data-faq-version marker for build verification (now v5)
 *
 * What's new:
 * - <FaqAnswer> renders inside each <details> and listens to the
 *   parent's 'toggle' event. When [open] is set, it types out the
 *   answer word-by-word.
 * - The wrapper's @keyframes fade-down has been REMOVED — the typing
 *   IS the entrance animation. No more stacked opacity transitions.
 * - Layout-shift safe: an invisible ghost <p> inside FaqAnswer
 *   reserves the full answer's natural height before typing starts.
 * - Accessible: the full answer text is in the DOM at all times,
 *   readable by screen readers and search engines, regardless of
 *   how far along the typing animation is.
 *
 * No auto-collapse (per user request). Once open, an answer stays
 * open until the user clicks again or opens another FAQ (the
 * native exclusive group closes the previous one).
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
      data-faq-version="v5-details-with-typer"
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
                <FaqAnswer text={f.a} />
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

        /* NO opacity/transform keyframe on .paylow-faq-answer anymore.
           The typewriter IS the entrance animation. This is the change
           that prevents the v1–v3 "answer disappears" bug from coming
           back — there's no opacity transition here that can race with
           the global [data-reveal] rule. */

        /* Caret blink — simple opacity flash. Only animates the caret
           span (which has aria-hidden), not the answer text. Safe. */
        @keyframes paylow-faq-caret-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .paylow-faq-caret { animation: paylow-faq-caret-blink 0.9s steps(1) infinite; }

        @media (prefers-reduced-motion: reduce) {
          .paylow-faq-caret { animation: none; opacity: 0; }
        }
      ` }} />
    </section>
  );
}
