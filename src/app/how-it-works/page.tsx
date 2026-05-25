import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Sparkles, Headphones, UserCheck, Zap, ShieldCheck } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import GetStartedButton from '@/components/GetStartedButton';
import { assets } from '@/lib/content';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'A streamlined hiring process. Skilled offshore staff matched to your team in as little as one week.',
};

const processSteps = [
  { n: '01', title: 'Tell us your needs', d: 'A 15-minute call to scope role, skills, and timezone.', Icon: Headphones },
  { n: '02', title: 'We match talent',  d: 'Vetted candidates aligned to your industry and culture.', Icon: ShieldCheck },
  { n: '03', title: 'You interview',     d: 'Meet the shortlist. You choose who joins your team.', Icon: UserCheck },
  { n: '04', title: 'They start fast',   d: 'Kickoff meeting. Smooth onboarding. Immediate productivity.', Icon: Zap },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={<>Hire skilled remote staff — <span className="text-gradient">without the headache.</span></>}
        lead="A clear, fast, simple process. From first call to first hire in days."
        actions={
          <>
            <GetStartedButton>Get started <ArrowRight className="w-4 h-4" /></GetStartedButton>
            <Link href="/pricing" className="btn-outline">See pricing</Link>
          </>
        }
      />

      {/* Intro split */}
      <section className="section bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <div data-reveal>
            <p className="mb-5"><span className="eyebrow"><span className="eyebrow-dot" /> Why PayLow</span></p>
            <h2 className="display-2">Built for clarity, speed, and quality.</h2>
            <p className="lead mt-5">
              No drawn-out RFPs. No vague resume piles. A refined matching process that gets the right people into your workflow.
            </p>
            <ul className="mt-7 space-y-3">
              {['One contact. Real humans, no chatbots.', 'Talent vetted before you see them.', 'Hire in days — not weeks.'].map((s) => (
                <li key={s} className="flex items-center gap-3 text-ink-700">
                  <Sparkles className="w-4 h-4 text-brand-500 shrink-0" /> <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative" data-reveal data-reveal-delay="150">
            <div className="relative aspect-[4/3] rounded-4xl overflow-hidden shadow-lift">
              <Image src={assets.howIntro} alt="PayLow team" fill sizes="(max-width: 1024px) 90vw, 500px" className="object-cover" unoptimized loading="lazy" />
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
            title={<>From hello to hired in <span className="text-gradient">4 simple steps.</span></>}
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
            <GetStartedButton size="lg">Start your hire today <ArrowRight className="w-4 h-4" /></GetStartedButton>
          </div>
        </div>
      </section>
    </>
  );
}
