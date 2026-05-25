import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import PageHero from '@/components/PageHero';
import FaqAccordion, { type FaqItem } from '@/components/FaqAccordion';
import CtaBanner from '@/components/CtaBanner';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Common questions about PayLow Staffing — pricing, billing, hiring process, contracts, and support.',
};

const faqs: FaqItem[] = [
  { q: 'What is the starting pay for virtual assistants?', a: 'PayLow virtual assistants start at $7/hour. Specialized roles may be slightly higher.' },
  { q: 'How does the billing cycle work?', a: 'Weekly billing. You receive a clear weekly invoice for hours worked, so costs stay predictable.' },
  { q: 'Are there any additional fees?', a: 'No setup fees, no recruitment fees, no payroll taxes. The hourly rate is all-in.' },
  { q: 'How long does it take to hire?', a: 'Most clients are interviewing candidates within days and onboarding inside one week.' },
  { q: 'Can I terminate at any time?', a: 'Yes — no lock-in contracts, no early termination penalties. You stay in full control.' },
  { q: 'Can I change my assistant if it isn\u2019t the right fit?', a: 'Absolutely. Tell us and we\u2019ll quickly source a better match — no extra fee.' },
  { q: 'How do we communicate with the assistant?', a: 'Email, Slack, Zoom, WhatsApp — whatever your team uses. Our pros come ready.' },
  { q: 'Do you offer 24/7 coverage?', a: 'Yes. Our talent works across every time zone — perfect for round-the-clock operations.' },
  { q: 'How is data security handled?', a: 'All assistants sign NDAs and follow strict data-handling protocols.' },
  { q: 'Can I hire multiple assistants?', a: 'Yes — scale from one role to a full team. We support hiring at any volume.' },
  { q: 'Do you provide training?', a: 'Yes. Onboarding aligns every assistant to your tools, processes, and standards.' },
  { q: 'What if my assistant is unavailable?', a: 'We provide rapid coverage or a temporary replacement so your operations don\u2019t miss a beat.' },
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
        title={<>Answers to the <span className="text-gradient">questions</span> we hear most.</>}
        lead="Search or browse below. Still have a question? We&apos;re one click away."
        actions={
          <Link href="/contact-us" className="btn-primary">
            <MessageCircle className="w-4 h-4" /> Ask a question
          </Link>
        }
      />

      <section className="section bg-white">
        <div className="container-wide max-w-4xl">
          <FaqAccordion items={faqs} defaultOpen={0} searchable />

          <div className="mt-12 rounded-3xl bg-ink-50 p-7 sm:p-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between" data-reveal>
            <div>
              <h3 className="font-display font-bold text-lg text-ink-900">Still curious?</h3>
              <p className="text-ink-500 text-sm mt-1">Our team replies within one business day.</p>
            </div>
            <Link href="/contact-us" className="btn-primary self-start sm:self-auto">
              Contact us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
