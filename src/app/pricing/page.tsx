import type { Metadata } from 'next';
import { ArrowRight, Check, X } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import PricingCalculator from '@/components/PricingCalculator';
import CtaBanner from '@/components/CtaBanner';
import GetStartedButton from '@/components/GetStartedButton';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Pre-vetted remote pros from $7/hour. Run the calculator. See what you save.',
};

const onshoreCons = [
  '$30/hr + payroll tax',
  'Recruitment fees up to 20%',
  'Weeks to months to hire',
  'Long-term contracts',
];
const paylowPros = [
  '$7/hr \u2014 all-in',
  'No recruitment fee',
  '7-day average to hire',
  'No lock-in. Ever.',
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-warm" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-2" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-backdrop opacity-50" />
        <div aria-hidden className="absolute -top-32 left-1/3 w-[28rem] h-[28rem] rounded-full bg-gradient-brand opacity-15 blur-3xl animate-float-slow" />

        <div className="container-wide pt-24 pb-16 lg:pt-32 lg:pb-20 text-center max-w-4xl">
          <div data-reveal>
            <p className="mb-5"><span className="eyebrow"><span className="eyebrow-dot" /> Pricing</span></p>
            <h1 className="display-1">
              One rate.<br />
              <span className="text-gradient">Massive savings.</span>
            </h1>
            <p className="lead mt-6 max-w-2xl mx-auto">
              Pre-vetted remote pros from $7/hour. Run the calculator. See what you save.
            </p>
          </div>

          <div className="mt-10 flex items-end justify-center gap-2 lg:gap-3" data-reveal data-reveal-delay="100">
            <span className="font-display font-bold text-ink-900 self-start mt-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>$</span>
            <span
              className="font-display font-black text-gradient leading-none"
              style={{ fontSize: 'clamp(9rem, 22vw, 17rem)' }}
            >
              7
            </span>
            <span className="font-display font-semibold text-ink-700 pb-4" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>/hour</span>
          </div>
          <p className="text-ink-500 mt-4 text-sm">Specialized roles can run higher. No hidden fees. Ever.</p>
        </div>
      </section>

      {/* Calculator */}
      <section className="section bg-white">
        <div className="container-wide max-w-6xl">
          <SectionHeading
            eyebrow="Cost calculator"
            title={<>See your <span className="text-gradient">real savings.</span></>}
            lead="Move the dials. Watch the math update in real time."
            align="center"
          />
          <div className="mt-12">
            <PricingCalculator />
          </div>
        </div>
      </section>

      {/* Side-by-side comparison */}
      <section className="section bg-ink-50/50">
        <div className="container-wide max-w-5xl">
          <SectionHeading
            eyebrow="Side by side"
            title={<>The PayLow <span className="text-gradient">advantage.</span></>}
            align="center"
          />
          <div className="mt-12 grid md:grid-cols-2 gap-5">
            <article className="card p-7" data-reveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex w-10 h-10 rounded-full bg-ink-100 text-ink-700 items-center justify-center font-bold">A</span>
                <div>
                  <h3 className="font-display font-bold text-lg text-ink-900">Hiring locally</h3>
                  <p className="text-xs text-ink-500">The traditional way</p>
                </div>
              </div>
              <ul className="space-y-3">
                {onshoreCons.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-ink-600 text-sm">
                    <X className="w-4 h-4 mt-0.5 text-ink-400 shrink-0" strokeWidth={3} /> {c}
                  </li>
                ))}
              </ul>
            </article>

            <article className="card-hover p-7 border-brand-200 bg-gradient-to-br from-white to-brand-50/40 relative overflow-hidden" data-reveal data-reveal-delay="120">
              <span className="absolute top-4 right-4 inline-flex rounded-full bg-gradient-brand text-white text-[10px] font-semibold px-2.5 py-1 shadow-glow-sm">Recommended</span>
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex w-10 h-10 rounded-full bg-gradient-brand text-white items-center justify-center font-bold shadow-glow-sm">P</span>
                <div>
                  <h3 className="font-display font-bold text-lg text-ink-900">Hiring with PayLow</h3>
                  <p className="text-xs text-brand-700">The modern way</p>
                </div>
              </div>
              <ul className="space-y-3">
                {paylowPros.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-ink-800 text-sm font-medium">
                    <Check className="w-4 h-4 mt-0.5 text-brand-500 shrink-0" strokeWidth={3} /> {c}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <GetStartedButton className="w-full sm:w-auto justify-center">
                  Find my match <ArrowRight className="w-4 h-4" />
                </GetStartedButton>
              </div>
            </article>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
