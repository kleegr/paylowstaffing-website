import type { Metadata } from 'next';
import {
  ArrowRight, Check, X, ShieldCheck, Briefcase, Clock, CheckCircle2,
  Sparkles, MessageCircle, Award, TrendingDown,
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import PricingCalculator from '@/components/PricingCalculator';
import CtaBanner from '@/components/CtaBanner';
import GetStartedButton from '@/components/GetStartedButton';
import CountUp from '@/components/CountUp';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Vetted remote staff from $7 an hour. Senior talent, screened first. Run the calculator and see what changes.',
};

const onshoreCons = [
  '$30/hr + payroll tax',
  'Recruitment fees up to 20%',
  'Weeks to months to hire',
  'Long-term contracts',
];
const paylowPros = [
  '$7/hr, all-in',
  'Vetted before you see them',
  'Hire in 7 days',
  'Cancel anytime',
];

// "What $7 actually buys" — the quality anchor
const qualities = [
  {
    Icon: ShieldCheck,
    title: 'Pre-vetted',
    body: 'Skills tested. References checked. Culture-fit interviewed. About 1 in 50 makes your shortlist.',
  },
  {
    Icon: Briefcase,
    title: 'Experienced',
    body: 'Senior professionals with real years in their field. Not entry-level. Not freelancers passing through.',
  },
  {
    Icon: Clock,
    title: 'Your timezone',
    body: 'Matched to your business hours, with overlap with US Eastern. Same-day collaboration, no handoffs.',
  },
  {
    Icon: CheckCircle2,
    title: 'All-in pricing',
    body: 'Their pay, our placement, ongoing account management, the tools we provide. No surprise markups.',
  },
];

// Stat chips that anchor the calculator section
const calculatorStats = [
  { label: 'Avg savings',      value: '60\u201380%' },
  { label: 'Avg time to hire', value: '7 days' },
  { label: 'Setup fee',        value: '$0' },
];

// Floating proof chips around the giant $7 — desktop only.
// Anchored to a `relative` wrapper around the price block.
const floatingChips = [
  { Icon: ShieldCheck,   text: 'Skills-tested',      pos: 'top-6 -left-2',     delay: '0.3s' },
  { Icon: MessageCircle, text: 'Fluent English',     pos: 'top-12 -right-4',   delay: '1.1s' },
  { Icon: Award,         text: 'Top 1-in-50',        pos: 'bottom-14 -left-6', delay: '1.8s' },
  { Icon: Sparkles,      text: 'Reference-checked',  pos: 'bottom-6 -right-2', delay: '0.6s' },
];

// Trust strip items below the price
const trustItems = ['Vetted', 'Fluent English', 'Your timezone', 'Cancel anytime'];

export default function PricingPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-warm" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-2" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-backdrop opacity-50" />
        <div aria-hidden className="absolute -top-32 left-1/3 w-[28rem] h-[28rem] rounded-full bg-gradient-brand opacity-15 blur-3xl animate-float-slow" />
        <div aria-hidden className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-brand-300/20 blur-3xl animate-float-slow" style={{ animationDelay: '2.5s' }} />

        <div className="container-wide pt-24 pb-16 lg:pt-32 lg:pb-20 text-center max-w-4xl">
          <div data-reveal>
            <p className="mb-5"><span className="eyebrow"><span className="eyebrow-dot" /> Pricing</span></p>
            <h1 className="display-1">
              Quality stays.<br />
              <span className="text-gradient">Cost drops.</span>
            </h1>
            <p className="lead mt-6 max-w-2xl mx-auto">
              Vetted remote staff from $7 an hour. Same caliber. Same screening. Way better math.
            </p>
          </div>

          {/* Price block wrapper. `relative` so floating chips can anchor.
              `max-w-2xl mx-auto` gives the chips room to sit just outside
              the price column without spilling into container padding. */}
          <div className="mt-10 relative max-w-2xl mx-auto" data-reveal data-reveal-delay="100">
            {/* Floating proof chips — desktop only. Each has its own delay
                on the `animate-float` keyframe so they don't sync up. */}
            <div aria-hidden="true" className="hidden lg:block">
              {floatingChips.map((c) => (
                <span
                  key={c.text}
                  className={`absolute ${c.pos} inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-700 shadow-soft animate-float whitespace-nowrap`}
                  style={{ animationDelay: c.delay }}
                >
                  <c.Icon className="w-3.5 h-3.5 text-brand-500" />
                  {c.text}
                </span>
              ))}
            </div>

            <div className="flex items-end justify-center gap-2 lg:gap-3 tabular-nums">
              <span
                className="font-display font-bold text-ink-900 self-start mt-4"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                $
              </span>
              <span
                className="font-display font-black leading-none inline-block"
                style={{ fontSize: 'clamp(9rem, 22vw, 17rem)' }}
              >
                <CountUp className="text-gradient" from={55} value={7} duration={1800} format="int" />
              </span>
              <span
                className="font-display font-semibold text-ink-700 pb-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
              >
                /hour
              </span>
            </div>
          </div>

          <p className="text-ink-500 mt-4 text-sm">
            Specialized roles run higher. Same standards. Same screening.
          </p>

          {/* Trust strip — always visible, all viewports */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-600"
            data-reveal
            data-reveal-delay="200"
          >
            {trustItems.map((item, i) => (
              <span key={item} className="inline-flex items-center gap-x-5">
                {i > 0 && <span className="text-ink-200" aria-hidden="true">·</span>}
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-500" />
                  {item}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT $7 ACTUALLY BUYS — quality anchor */}
      <section className="section bg-white">
        <div className="container-wide max-w-6xl">
          <SectionHeading
            eyebrow="Why it works"
            title={<>What <span className="text-gradient">$7 actually buys.</span></>}
            lead="Not cheap labor. A vetted hire on your team."
            align="center"
          />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {qualities.map((q, i) => (
              <article
                key={q.title}
                className="card p-6 group hover:shadow-lift transition-all duration-500 ease-out hover:-translate-y-1 relative overflow-hidden"
                data-reveal
                data-reveal-delay={i * 80}
              >
                {/* Subtle brand glow that fades in on hover */}
                <div aria-hidden className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
                <span className="relative inline-flex w-11 h-11 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow-sm group-hover:scale-105 transition-transform duration-500">
                  <q.Icon className="w-4 h-4" />
                </span>
                <h3 className="mt-5 font-display font-bold text-lg text-ink-900 relative">{q.title}</h3>
                <p className="mt-2 text-ink-500 text-sm leading-relaxed relative">{q.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR — with stat-chip anchor row + decorative orbs */}
      <section className="section bg-ink-50/50 relative overflow-hidden">
        <div aria-hidden className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-gradient-brand opacity-10 blur-3xl animate-float-slow" />
        <div aria-hidden className="absolute -bottom-20 -right-32 w-80 h-80 rounded-full bg-brand-300/20 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />

        <div className="container-wide max-w-6xl relative">
          {/* Stat chip row — grounds the calculator with concrete numbers
              before the user touches the dials. */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8" data-reveal>
            {calculatorStats.map((s) => (
              <div
                key={s.label}
                className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-100 px-4 py-2 text-sm shadow-soft"
              >
                <span className="text-ink-500">{s.label}</span>
                <span className="font-display font-bold text-ink-900 tabular-nums">{s.value}</span>
              </div>
            ))}
          </div>

          <SectionHeading
            eyebrow="Cost calculator"
            title={<>See your <span className="text-gradient">savings.</span></>}
            lead="Move the dials. Watch the math change."
            align="center"
          />
          <div className="mt-12">
            <PricingCalculator />
          </div>
        </div>
      </section>

      {/* SIDE-BY-SIDE — with subtle brand-tint background orb */}
      <section className="section bg-white relative overflow-hidden">
        <div aria-hidden className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-brand-300/10 blur-3xl" />

        <div className="container-wide max-w-5xl relative">
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

      {/* Pre-CTA guarantee strip — sits flush above the shared CtaBanner */}
      <section className="bg-white pb-2">
        <div className="container-wide max-w-4xl">
          <div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink-600"
            data-reveal
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              <span className="font-semibold text-ink-900">30-day replacement</span>
              <span className="text-ink-400">if it&rsquo;s not a fit</span>
            </span>
            <span className="text-ink-200" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-brand-500" />
              <span className="font-semibold text-ink-900">No setup fees</span>
            </span>
            <span className="text-ink-200" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-500" />
              <span className="font-semibold text-ink-900">Cancel anytime</span>
            </span>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
