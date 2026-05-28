import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles, Clock, ShieldCheck, MessageCircle, Users,
  TrendingDown, Eye, ArrowRight, CheckCircle2, Headphones,
  Briefcase, Calendar, Phone,
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import BookingCalendar from '@/components/BookingCalendar';
import { siteConfig } from '@/lib/content';

/**
 * /book-a-call — dedicated landing page wrapping the GoHighLevel
 * booking widget with a full "why book + what to expect" funnel.
 *
 * Structure:
 *  1. Hero            — headline, lead, trust pills, scroll-to-calendar CTA
 *  2. Why book        — 6 reasons grid (useful even if just exploring)
 *  3. What happens    — 3-step explainer
 *  4. Calendar        — the actual iframe embed, in a polished card with
 *                       floating proof badges (desktop) and a small header
 *  5. Closing offer   — alternative paths (message us, call us)
 *
 * Note: this page intentionally has NO CtaBanner at the end — the
 * calendar IS the CTA. Adding another "book a call" button below the
 * actual booking calendar would be silly.
 */

export const metadata: Metadata = {
  title: 'Book a Free Hiring Call',
  description:
    'Book a free call with PayLow Staffing to learn how to hire vetted remote staff from around $7/hour. Less than 30 minutes. No commitment.',
};

// Six reasons to book — each gets its own icon + tight copy.
// Ordered so the "is this a fit" / "what talent" questions come first
// (most common first-call concerns), then the deeper how-it-works,
// then a clear out ("get a clear next step") to defuse pressure.
const reasons = [
  {
    Icon: ShieldCheck,
    title: 'See if your role fits',
    body: 'Tell us what you need. We\u2019ll tell you straight whether we can deliver it.',
  },
  {
    Icon: Users,
    title: 'Meet the talent profile',
    body: 'Hear what kind of candidates we can source for your specific role.',
  },
  {
    Icon: Briefcase,
    title: 'Understand the $7 math',
    body: 'What\u2019s included, what isn\u2019t, and what changes for specialized roles.',
  },
  {
    Icon: Eye,
    title: 'Inside the screening',
    body: 'How we go from hundreds of applicants to your 4 or 5 picks.',
  },
  {
    Icon: TrendingDown,
    title: 'Run the cost compare',
    body: 'What you\u2019re paying now versus what you could save — actual numbers.',
  },
  {
    Icon: ArrowRight,
    title: 'Get a clear next step',
    body: 'Leave the call knowing exactly what to do next. Or not. No pressure.',
  },
];

// Three-step explainer mirroring the homepage's "How it works" pattern
// so the page feels native to the site, not pasted in.
const steps = [
  {
    n: '01',
    title: 'Tell us the role',
    body: 'A few minutes scoping what you need and what success looks like.',
    icon: Headphones,
  },
  {
    n: '02',
    title: 'We explain what\u2019s possible',
    body: 'Hear the talent profile, the screening process, and the math.',
    icon: MessageCircle,
  },
  {
    n: '03',
    title: 'You decide',
    body: 'Move forward, think about it, or pass. Zero pressure either way.',
    icon: CheckCircle2,
  },
];

const trustPills = ['100% free', 'Less than 30 minutes', 'No commitment', 'No setup fee'];

// Floating proof badges around the calendar card. Desktop-only because on
// mobile the calendar takes the full viewport width and there's nowhere
// off-edge for the badges to sit without overlapping the picker UI.
const floatingBadges = [
  { Icon: Clock,        text: 'Under 30 minutes', pos: '-top-3 left-4 sm:-left-4',           delay: '0.2s' },
  { Icon: ShieldCheck,  text: 'No commitment',  pos: 'top-1/3 -right-4',                    delay: '1.0s' },
  { Icon: Sparkles,     text: 'Real human',     pos: '-bottom-3 -left-3',                   delay: '1.6s' },
  { Icon: CheckCircle2, text: 'No setup fee',   pos: '-bottom-3 right-6 sm:right-10',       delay: '0.6s' },
];

export default function BookACallPage() {
  return (
    <>
      {/* ============================================================
          HERO
         ============================================================ */}
      <section className="relative isolate overflow-hidden noise">
        <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-warm" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-2" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-backdrop opacity-50" />
        <div aria-hidden className="absolute -top-32 left-1/3 w-[28rem] h-[28rem] rounded-full bg-gradient-brand opacity-15 blur-3xl animate-float-slow" />
        <div aria-hidden className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-brand-300/20 blur-3xl animate-float-slow" style={{ animationDelay: '2.5s' }} />

        <div className="container-wide pt-24 pb-16 lg:pt-32 lg:pb-20 text-center max-w-4xl">
          <div data-reveal>
            <p className="mb-5">
              <span className="eyebrow">
                <span className="eyebrow-dot animate-pulse" /> Free hiring call &middot; under 30 minutes
              </span>
            </p>
            <h1 className="display-1">
              Let&rsquo;s find your{' '}
              <span className="text-gradient">next great hire.</span>
            </h1>
            <p className="lead mt-6 max-w-2xl mx-auto">
              In less than 30 minutes, we&rsquo;ll learn the role, explain how PayLow works, and show you the kind of talent we can put in front of you. From $7 an hour. No setup fees, no commitment.
            </p>
          </div>

          {/* Trust pills */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            data-reveal
            data-reveal-delay="100"
          >
            {trustPills.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-ink-100 px-3.5 py-1.5 text-xs font-semibold text-ink-700 shadow-soft"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
                {p}
              </span>
            ))}
          </div>

          {/* Primary CTA (scrolls to calendar) + secondary text link */}
          <div
            className="mt-9 flex flex-col items-center gap-3"
            data-reveal
            data-reveal-delay="200"
          >
            <Link href="#calendar" className="btn-primary btn-lg">
              Pick a time <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact-us"
              className="text-sm text-ink-500 hover:text-ink-900 underline-offset-4 hover:underline transition-colors"
            >
              Or send us a message instead
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY BOOK — 6 reasons grid
         ============================================================ */}
      <section className="section bg-white">
        <div className="container-wide max-w-6xl">
          <SectionHeading
            eyebrow="Why book?"
            title={<>Useful even if you&rsquo;re <span className="text-gradient">just exploring.</span></>}
            lead="No pitch, no pressure. Just clear answers to the questions you actually have."
            align="center"
          />

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reasons.map((r, i) => (
              <article
                key={r.title}
                className="card p-6 group hover:shadow-lift transition-all duration-500 ease-out hover:-translate-y-1 relative overflow-hidden"
                data-reveal
                data-reveal-delay={i * 60}
              >
                {/* Subtle brand glow on hover */}
                <div aria-hidden className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
                <span className="relative inline-flex w-11 h-11 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow-sm group-hover:scale-105 transition-transform duration-500">
                  <r.Icon className="w-4 h-4" />
                </span>
                <h3 className="relative mt-5 font-display font-bold text-lg text-ink-900">{r.title}</h3>
                <p className="relative mt-2 text-ink-500 text-sm leading-relaxed">{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          WHAT HAPPENS — 3-step explainer
         ============================================================ */}
      <section className="section bg-ink-50/50 relative">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-30" />
        <div className="container-wide max-w-5xl relative">
          <SectionHeading
            eyebrow="What happens on the call"
            title={<>Three things. <span className="text-gradient">That&rsquo;s it.</span></>}
            lead="No confusing sales pitch. Just a clear conversation about the help you need."
            align="center"
          />

          <div className="mt-14 grid sm:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <article
                key={s.n}
                className="card-hover p-6 group bg-white"
                data-reveal
                data-reveal-delay={i * 80}
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="font-display font-extrabold text-2xl text-ink-200 group-hover:text-brand-400 transition-colors tabular-nums tracking-tight">{s.n}</span>
                  <span className="inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-ink-50 text-ink-700 group-hover:bg-gradient-brand group-hover:text-white transition-all duration-500">
                    <s.icon className="w-4 h-4" />
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-ink-900">{s.title}</h3>
                <p className="mt-1.5 text-ink-500 text-sm leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-ink-500 max-w-xl mx-auto" data-reveal>
            <span className="handwritten-accent text-2xl mr-1">No pressure.</span>
            Just a clear conversation about the help you need.
          </p>
        </div>
      </section>

      {/* ============================================================
          CALENDAR — the actual booking widget
         ============================================================ */}
      <section
        id="calendar"
        className="section bg-white relative overflow-hidden scroll-mt-24"
      >
        <div aria-hidden className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-gradient-brand opacity-10 blur-3xl animate-float-slow" />
        <div aria-hidden className="absolute -bottom-20 -right-32 w-80 h-80 rounded-full bg-brand-300/20 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />

        <div className="container-wide max-w-4xl relative">
          <div className="text-center mb-10" data-reveal>
            <p className="mb-5">
              <span className="eyebrow">
                <span className="eyebrow-dot" /> Schedule
              </span>
            </p>
            <h2 className="display-2">
              Pick a time that works <span className="text-gradient">for you.</span>
            </h2>
            <p className="lead mt-5 mx-auto">
              The call is free and takes less than 30 minutes.
            </p>
          </div>

          <div className="relative" data-reveal data-reveal-delay="100">
            {/* Floating proof badges — desktop only */}
            <div aria-hidden="true" className="hidden lg:block">
              {floatingBadges.map((b) => (
                <span
                  key={b.text}
                  className={`absolute ${b.pos} z-10 inline-flex items-center gap-2 rounded-full bg-white border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-800 shadow-soft animate-float whitespace-nowrap`}
                  style={{ animationDelay: b.delay }}
                >
                  <b.Icon className="w-3.5 h-3.5 text-brand-500" />
                  {b.text}
                </span>
              ))}
            </div>

            {/* The card wrapping the iframe */}
            <div className="relative rounded-4xl bg-white border border-ink-100 shadow-lift overflow-hidden">
              {/* Card header strip — brand-tinted, gives the embed an identity
                  before the iframe content paints */}
              <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-ink-100 bg-gradient-to-r from-white via-brand-50/40 to-white">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="inline-flex w-9 h-9 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow-sm shrink-0">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-ink-900 text-sm sm:text-base leading-tight">
                      Free hiring call
                    </p>
                    <p className="text-[11px] text-ink-500 mt-0.5">
                      Under 30 minutes &middot; via video
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-100 px-2.5 py-1 text-[11px] font-semibold text-brand-700 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                  Real human
                </span>
              </div>

              {/* The iframe itself */}
              <div className="p-1 sm:p-2">
                <BookingCalendar />
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-ink-500">
              Times shown in your local time zone. By booking, you agree to our{' '}
              <Link
                href={siteConfig.privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-ink-700"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          CLOSING — alternative paths
         ============================================================ */}
      <section className="bg-white pb-20 lg:pb-28">
        <div className="container-wide max-w-3xl">
          <div
            className="card-hover p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left"
            data-reveal
          >
            <div>
              <h3 className="font-display font-bold text-lg text-ink-900">
                Prefer to message instead?
              </h3>
              <p className="mt-1 text-sm text-ink-500">
                A real human replies within one business day.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 shrink-0">
              <Link href="/contact-us" className="btn-outline">
                Send a message <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                className="btn-ghost"
              >
                <Phone className="w-4 h-4" /> {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
