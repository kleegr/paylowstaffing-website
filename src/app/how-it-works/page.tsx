import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight, Sparkles, Headphones, UserCheck, Zap, ShieldCheck,
  Calendar, ChevronDown, ListChecks, Scale, Briefcase, Check,
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import GetStartedButton from '@/components/GetStartedButton';
import ProcessVideo from '@/components/ProcessVideo';
import { assets } from '@/lib/content';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Watch the overview, then see it in action. We screen hundreds, you compare 4 or 5 vetted picks, and you hire on the call — from $7/hour.',
};

// Hosted MP4 for the process overview video. External URL for now (per brief).
const PROCESS_VIDEO_URL =
  'https://assets.cdn.filesafe.space/Ol42XQMnbIMA9pBMkS1m/media/6a17a9ec8c6ee94929a88b0b.mp4';

// "What you'll learn" — the reasons this video is worth two minutes.
const watchPoints = [
  {
    Icon: ListChecks,
    title: 'How your shortlist is built',
    body: 'Hundreds screened down to the 4 or 5 people actually worth your time.',
  },
  {
    Icon: ShieldCheck,
    title: 'How we screen first',
    body: 'Skills, English, references and culture — checked before you see a name.',
  },
  {
    Icon: Scale,
    title: 'Why clients decide faster',
    body: 'Compare your picks side by side and make the call with confidence.',
  },
  {
    Icon: Briefcase,
    title: 'What $7/hour really covers',
    body: 'Senior-level work, no setup fees, no trade-off on quality.',
  },
];

// Floating proof chips around the video (desktop only).
const floatingChips = [
  { text: '4 or 5 curated picks', pos: '-top-3 right-8 sm:right-16', delay: '0.2s' },
  { text: 'Vetted before you meet them', pos: 'top-1/2 -right-4', delay: '1.1s' },
  { text: 'From $7/hour', pos: '-bottom-3 left-10 sm:left-20', delay: '0.7s' },
];

const processSteps = [
  { n: '01', title: 'Brief us',      d: 'A 15-minute call. Tell us what you need.',           Icon: Headphones },
  { n: '02', title: 'We match',      d: 'We screen hundreds. You see 4 or 5 picks.',          Icon: ShieldCheck },
  // Step 03: side-by-side comparison is the punchline of our process.
  { n: '03', title: 'You interview', d: 'See your shortlist side by side. Decide on the call.', Icon: UserCheck },
  { n: '04', title: 'They start',    d: 'Onboarded and productive day one.',                  Icon: Zap },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* ============================================================
          HERO — heading + video + context + CTA, all above the fold-ish
         ============================================================ */}
      <section className="relative isolate overflow-hidden" aria-labelledby="how-hero-title">
        {/* Backdrops */}
        <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-warm" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-1 opacity-90" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-backdrop opacity-50" />
        <div aria-hidden className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gradient-brand opacity-15 blur-3xl animate-float-slow" />
        <div
          aria-hidden
          className="absolute -bottom-24 -right-20 w-[26rem] h-[26rem] rounded-full bg-brand-300/20 blur-3xl animate-float-slow"
          style={{ animationDelay: '3s' }}
        />

        <div className="container-wide pt-24 pb-16 lg:pt-28 lg:pb-20">
          {/* Heading */}
          <div className="max-w-3xl mx-auto text-center" data-reveal>
            <p className="mb-5">
              <span className="eyebrow"><span className="eyebrow-dot" /> How it works</span>
            </p>
            <h1 id="how-hero-title" className="display-1">
              Hire remote staff. <span className="text-gradient">Without the headache.</span>
            </h1>
            <p className="lead mt-6 max-w-2xl mx-auto">
              First call to first hire in days. We screen. You compare. You decide.
            </p>

            {/* Watch-before-you-book accent */}
            <div className="mt-7 flex flex-col items-center gap-1.5">
              <div className="inline-flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur border border-ink-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-600 shadow-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" /> Quick overview
                </span>
                <span className="handwritten-accent text-xl text-brand-600">watch before you book</span>
              </div>
              <ChevronDown aria-hidden className="w-5 h-5 text-brand-400 animate-bounce" />
            </div>
          </div>

          {/* Video + floating proof chips */}
          <div className="mt-6 lg:mt-8 max-w-4xl mx-auto relative" data-reveal data-reveal-delay="120">
            <div aria-hidden className="hidden lg:block">
              {floatingChips.map((c) => (
                <span
                  key={c.text}
                  className={`absolute ${c.pos} z-10 inline-flex items-center gap-2 rounded-full bg-white border border-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-800 shadow-soft animate-float whitespace-nowrap`}
                  style={{ animationDelay: c.delay }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                  {c.text}
                </span>
              ))}
            </div>

            <ProcessVideo src={PROCESS_VIDEO_URL} label="See how it works" />
          </div>

          {/* What you'll learn */}
          <div className="mt-10 max-w-4xl mx-auto" data-reveal data-reveal-delay="160">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-400 mb-5">
              What you&rsquo;ll learn in two minutes
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {watchPoints.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-ink-100 bg-white/70 backdrop-blur p-4 hover:border-ink-200 hover:bg-white transition-colors duration-300"
                >
                  <span className="inline-flex w-9 h-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <p.Icon className="w-4 h-4" />
                  </span>
                  <h3 className="mt-3 font-display font-bold text-[15px] text-ink-900 leading-snug">{p.title}</h3>
                  <p className="mt-1 text-ink-500 text-[13px] leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA block — two CTAs, clear next step after watching */}
          <div className="mt-10 flex flex-col items-center gap-4" data-reveal data-reveal-delay="200">
            <p className="text-sm text-ink-500">
              Ready after watching? Two ways to start:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/book-a-call" className="btn-primary btn-lg">
                <Calendar className="w-4 h-4" /> Book a free call
              </Link>
              <GetStartedButton variant="outline" size="lg">
                Find my match <ArrowRight className="w-4 h-4" />
              </GetStartedButton>
            </div>
            <Link href="/pricing" className="text-sm text-ink-500 hover:text-ink-900 underline-offset-4 hover:underline transition-colors">
              Curious about cost? See the math
            </Link>
          </div>
        </div>
      </section>

      {/* Intro split */}
      <section className="section bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <div data-reveal>
            <p className="mb-5"><span className="eyebrow"><span className="eyebrow-dot" /> Why PayLow</span></p>
            <h2 className="display-2">Clarity, speed, <span className="text-gradient">no guesswork.</span></h2>
            <p className="lead mt-5">
              No RFPs. No r&eacute;sum&eacute; piles. Just the right person for your team &mdash; fast.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                'A real person to call. Never a chatbot.',
                'Vetted before you see them.',
                'Compare 4 or 5 picks side by side.',
                'Hire in days, not months.',
              ].map((s) => (
                <li key={s} className="flex items-center gap-3 text-ink-700">
                  <Check className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative" data-reveal data-reveal-delay="150">
            <div className="relative aspect-[4/3] rounded-4xl overflow-hidden shadow-lift">
              <Image src={assets.howIntro} alt="PayLow team" fill sizes="(max-width: 1024px) 90vw, 500px" className="object-cover" />
            </div>
            <span aria-hidden className="absolute -z-10 -top-6 -left-6 w-32 h-32 rounded-3xl bg-gradient-brand-soft" />
          </div>
        </div>
      </section>

      {/* Process — 4 step cards */}
      <section className="section bg-ink-50/50 relative">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-30" />
        <div className="container-wide relative">
          <SectionHeading
            eyebrow="The process"
            title={<>Hired in <span className="text-gradient">four steps.</span></>}
            align="center"
          />

          <div className="mt-14 relative">
            <div aria-hidden className="hidden lg:block absolute top-16 left-12 right-12 border-t-2 border-dashed border-brand-200" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
              {processSteps.map((s, i) => (
                <article key={s.n} className="card-hover p-6 text-center group bg-white" data-reveal data-reveal-delay={i * 90}>
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-brand text-white inline-flex items-center justify-center shadow-glow-sm group-hover:scale-105 transition-transform duration-500">
                    <s.Icon className="w-6 h-6" />
                  </div>
                  <div className="mt-5 inline-flex rounded-full bg-ink-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-500">{s.n}</div>
                  <h3 className="mt-3 font-display font-bold text-lg text-ink-900">{s.title}</h3>
                  <p className="mt-2 text-ink-500 text-sm leading-relaxed">{s.d}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 flex justify-center" data-reveal>
            <GetStartedButton size="lg">Find my match <ArrowRight className="w-4 h-4" /></GetStartedButton>
          </div>
        </div>
      </section>
    </>
  );
}
