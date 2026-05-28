'use client';

import { Plus } from 'lucide-react';
import SectionHeading from './SectionHeading';
import FaqAnswer from './FaqAnswer';

/**
 * FAQ — native HTML <details> + word-by-word typewriter. v7.
 *
 * What's new vs v6:
 *  - Added a new featured question: "What kind of experience can I expect?"
 *    placed second (right after the English question) since "are these people
 *    actually qualified?" is the other top objection. Polished copy that
 *    frames the talent as qualified + vetted, not a cheap list.
 *  - Softened the "15-minute scoping call" wording in the speed answer to
 *    "a short scoping call" so it stays consistent with the Book a Call page
 *    (which now says "less than 30 minutes").
 *
 * Stable foundation preserved EXACTLY (do not touch):
 *  - <details> structure (browser handles open/close)
 *  - name="paylow-faq" for exclusive-open behavior
 *  - FaqAnswer client component handles the word-by-word typing
 *  - No opacity transitions on the answer — typing IS the entrance
 *  - prefers-reduced-motion: full answer instant, no caret
 *
 * Build-verification marker: data-faq-version="v7-experience-q".
 */

const faqs = [
  // ===== FEATURED — the top objections, styled with extra visual weight ====
  {
    q: 'Do the candidates speak good English?',
    a: 'Yes. Clear English is one of the things we screen for hardest. We look for candidates who can speak professionally, follow instructions, and communicate with your team and customers without friction.',
    featured: true,
  },
  {
    q: 'What kind of experience can I expect?',
    a: 'We source experienced remote professionals across serious business roles — from software developers and QuickBooks experts to CRM implementers, social media managers, operations assistants, and customer support specialists. The goal isn\u2019t just to find someone affordable. It\u2019s to find someone capable, vetted, and ready to do the work from day one.',
    featured: true,
  },
  {
    q: 'How is PayLow different from hiring a freelancer?',
    a: 'Freelancers can be hit or miss. With PayLow, we screen first — then bring you vetted people who are ready for steady work. You get a dedicated team member, not someone squeezing you in between ten other projects.',
    featured: true,
  },
  {
    q: 'Is the staff member dedicated to my business?',
    a: 'Yes. During your scheduled hours, they\u2019re dedicated to your business — not juggling your work alongside five other companies. One focus, one team, one set of priorities.',
    featured: true,
  },
  {
    q: 'Are there any recruitment fees, setup fees, or hidden costs?',
    a: 'No. No recruitment fees, no setup fees, no payroll taxes, no hidden costs. You pay the agreed hourly rate — starting at $7 an hour — and that\u2019s it.',
    featured: true,
  },
  {
    q: 'Can I replace someone if they\u2019re not a good fit?',
    a: 'Yes. If the fit isn\u2019t right in the first 30 days, we replace them at no extra charge. You\u2019re not stuck with the wrong person.',
    featured: true,
  },

  // ===== SUPPORTING — process / logistics, lighter styling =====
  {
    q: 'How fast can I actually hire?',
    a: 'Most clients meet their 4 or 5 picks within five business days. Compare them side by side and hire on the call. A short scoping call is the longest part.',
    featured: false,
  },
  {
    q: 'How do you screen candidates?',
    a: 'Multiple rounds. Skills tests, English review, background and reference checks, then a culture-fit interview. About one in fifty applicants makes your shortlist.',
    featured: false,
  },
  {
    q: 'Can I hire part-time, or only full-time?',
    a: 'Both. Part-time or full-time, your call. The minimum is 20 hours a week — enough for your hire to actually learn the role and make progress.',
    featured: false,
  },
  {
    q: 'What time zones do they work?',
    a: 'Yours. Matched to your business hours, with at least six hours of overlap with US Eastern. Round-the-clock coverage on request.',
    featured: false,
  },
];

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="section bg-white scroll-mt-24"
      data-faq-version="v7-experience-q"
    >
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Questions"
          title={<>Quick <span className="text-gradient">answers.</span></>}
          lead="Straight talk on the things people actually ask."
          align="center"
        />

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              name="paylow-faq"
              className={
                f.featured
                  ? 'paylow-faq-item paylow-faq-featured rounded-3xl border border-ink-200 bg-gradient-to-br from-brand-50/40 via-white to-brand-50/20 hover:border-brand-200 transition-colors duration-300 overflow-hidden shadow-soft'
                  : 'paylow-faq-item rounded-3xl border border-ink-100 bg-white hover:border-ink-200 transition-colors duration-300 overflow-hidden'
              }
              data-reveal
              data-reveal-delay={i * 50}
            >
              <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer select-none list-none">
                <span
                  className={
                    f.featured
                      ? 'font-display font-bold text-ink-900 text-base sm:text-lg'
                      : 'font-display font-semibold text-ink-900 text-base sm:text-lg'
                  }
                >
                  {f.q}
                </span>
                <span
                  aria-hidden="true"
                  className={
                    f.featured
                      ? 'paylow-faq-plus shrink-0 inline-flex w-8 h-8 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-all duration-300'
                      : 'paylow-faq-plus shrink-0 inline-flex w-8 h-8 items-center justify-center rounded-full bg-ink-50 text-ink-700 transition-all duration-300'
                  }
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

        /* Open state — supporting (default) cards: brand-200 border + soft lift */
        .paylow-faq-item[open] {
          border-color: rgb(255 191 154);
          box-shadow: 0 1px 2px rgba(15,13,12,0.04), 0 8px 32px rgba(15,13,12,0.06);
        }

        /* Open state — featured cards: stronger brand-300 border + brand-tinted lift */
        .paylow-faq-item.paylow-faq-featured[open] {
          border-color: rgb(255 162 107);
          box-shadow:
            0 1px 2px rgba(242, 108, 42, 0.08),
            0 12px 40px rgba(242, 108, 42, 0.12);
        }

        /* Open state — plus icon rotates 45° to ✕, gets brand gradient.
           Same rule applies to both featured and supporting cards. */
        .paylow-faq-item[open] .paylow-faq-plus {
          background-image: linear-gradient(135deg, #FF8242 0%, #F26C2A 50%, #D9551A 100%);
          color: white;
          transform: rotate(45deg);
          box-shadow: 0 4px 16px rgba(242, 108, 42, 0.30);
        }

        /* Caret blink — animates only the caret span (aria-hidden), never the
           answer text. This is what makes the typewriter feel alive without
           introducing any opacity transitions on text. */
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
