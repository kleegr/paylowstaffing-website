import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import GetStartedButton from '@/components/GetStartedButton';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Common questions about PayLow \u2014 pricing, billing, hiring, contracts, and support.',
};

const faqs: FaqItem[] = [
  { q: 'What\u2019s the starting rate?',                       a: '$7/hour for most roles. Specialized ones can run higher \u2014 always quoted upfront.' },
  { q: 'How does billing work?',                              a: 'Weekly. One clear invoice. No surprises.' },
  { q: 'Are there any extra fees?',                           a: 'No setup fee. No recruitment fee. No payroll tax. The rate you see is the rate you pay.' },
  { q: 'How fast can I hire?',                                a: 'Most clients interview within days and onboard inside a week.' },
  { q: 'Can I cancel any time?',                              a: 'Yes. No lock-in. No termination penalty. You\u2019re never stuck.' },
  { q: 'What if my hire isn\u2019t the right fit?',              a: 'We\u2019ll find you a better match. No extra fee.' },
  { q: 'How do we communicate?',                              a: 'Slack. Email. Zoom. WhatsApp. Whatever your team already uses.' },
  { q: 'Do you cover every time zone?',                       a: 'Yes. Our talent works around the clock and around the world.' },
  { q: 'How is data handled?',                                a: 'NDAs on every hire. Strict protocols. Your data stays yours.' },
  { q: 'Can I hire more than one person?',                    a: 'One role or a full team. Same simple process.' },
  { q: 'Do you handle training?',                             a: 'Yes. We onboard them to your tools, processes, and standards.' },
  { q: 'What if my hire goes offline?',                       a: 'We send fast coverage or a temporary replacement \u2014 same day where we can.' },
];

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={<>Questions we <span className="text-gradient">hear most.</span></>}
        lead="Search below. Still curious? We\u2019re one click away."
        actions={<GetStartedButton>Ask a question <ArrowRight className="w-4 h-4" /></GetStartedButton>}
        compact
      />

      <section className="section bg-white">
        <div className="container-wide max-w-4xl">
          <FaqAccordion items={faqs} defaultOpen={0} searchable />

          <div className="mt-12 rounded-3xl bg-ink-50 p-7 sm:p-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between" data-reveal>
            <div>
              <h3 className="font-display font-bold text-lg text-ink-900">Still have questions?</h3>
              <p className="text-ink-500 text-sm mt-1">Real humans, real fast. We reply within one business day.</p>
            </div>
            <GetStartedButton className="self-start sm:self-auto">
              Find my match <ArrowRight className="w-4 h-4" />
            </GetStartedButton>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
