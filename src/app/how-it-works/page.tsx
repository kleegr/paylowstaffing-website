import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Sparkles, Headphones, UserCheck, Zap, ShieldCheck } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import GetStartedButton from '@/components/GetStartedButton';
import ProcessVideo from '@/components/ProcessVideo';
import { assets } from '@/lib/content';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'First call to first hire in days. We screen. You compare. You decide. Watch the 60-second overview.',
};

// Hosted MP4 for the process overview video. External URL for now (per brief).
// If we later want faster first-paint, this can be moved to a self-hosted /
// CDN-optimized asset or given a poster frame.
const PROCESS_VIDEO_URL =
  'https://assets.cdn.filesafe.space/Ol42XQMnbIMA9pBMkS1m/media/6a17a9ec8c6ee94929a88b0b.mp4';

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
          HERO — heading + the process video as the main visual intro
         ============================================================ */}
      <section className="relative isolate overflow-hidden" aria-labelledby="how-hero-title">
        {/* Backdrops (same treatment as the shared PageHero, kept on-brand) */}
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
          {/* Heading block — centered so it sits on the same axis as the video */}
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
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <GetStartedButton>Find my match <ArrowRight className="w-4 h-4" /></GetStartedButton>
              <Link href="/pricing" className="btn-outline">See pricing</Link>
            </div>
          </div>

          {/* The process video — directly under the heading, the dominant visual */}
          <div className="mt-12 lg:mt-16 max-w-4xl mx-auto" data-reveal data-reveal-delay="150">
            <ProcessVideo src={PROCESS_VIDEO_URL} label="See how it works" />
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
                  <Sparkles className="w-4 h-4 text-brand-500 shrink-0" />
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
