import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Heart, Globe2, Sparkles, Users2 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import GetStartedButton from '@/components/GetStartedButton';
import { assets } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'PayLow connects ambitious teams with skilled remote pros \u2014 born from a real hiring problem, built to fix it for everyone.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About PayLow"
        title={<>Built by people who <span className="text-gradient">needed it.</span></>}
        lead="We couldn\u2019t find affordable, qualified help. So we found it. Then we built the company that finds it for you."
        bgImage={assets.aboutHeroBg}
        imageAlt="A PayLow professional"
        actions={
          <>
            <GetStartedButton>Find my match <ArrowRight className="w-4 h-4" /></GetStartedButton>
            <Link href="/how-it-works" className="btn-outline">How it works</Link>
          </>
        }
      />

      {/* Story */}
      <section className="section bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative max-w-md mx-auto lg:mx-0" data-reveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-card">
                <Image src={assets.about01} alt="PayLow professional" fill className="object-cover" sizes="280px" />
              </div>
              <div className="space-y-4 mt-10">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card">
                  <Image src={assets.about02} alt="" fill className="object-cover" sizes="240px" />
                </div>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card">
                  <Image src={assets.aboutRecruiter} alt="" fill className="object-cover" sizes="240px" />
                </div>
              </div>
            </div>
            <span aria-hidden className="absolute -z-10 -bottom-8 -left-8 w-44 h-44 rounded-3xl bg-gradient-brand-soft" />
          </div>

          <div data-reveal data-reveal-delay="120">
            <p className="mb-5"><span className="eyebrow"><span className="eyebrow-dot" /> Our story</span></p>
            <h2 className="display-2">We were the <span className="text-gradient">first client.</span></h2>
            <div className="mt-6 space-y-4 text-ink-600 leading-relaxed text-pretty">
              <p>
                It started inside a bookkeeping company growing faster than its budget. Local hires broke the budget. Quality slipped. Something had to give.
              </p>
              <p>
                Nathan looked offshore and found brilliant people the rest of the market had missed. PayLow exists to put that talent on every team facing the same problem.
              </p>
            </div>
            <div className="mt-8">
              <GetStartedButton>Find my match <ArrowRight className="w-4 h-4" /></GetStartedButton>
            </div>
          </div>
        </div>
      </section>

      {/* Mission + Stats */}
      <section className="section bg-ink-900 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-mesh-2 opacity-20 mix-blend-screen" />
        <div aria-hidden className="absolute -top-10 right-10 w-80 h-80 rounded-full bg-gradient-brand opacity-20 blur-3xl" />

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div data-reveal>
              <p className="mb-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400" /> Mission
                </span>
              </p>
              <h2 className="display-2 text-white">Help every team grow &mdash; <span className="text-gradient">without limits.</span></h2>
              <p className="lead mt-6 text-white/70 max-w-xl">
                Match ambitious businesses with dedicated, vetted remote pros. Scale without burning out &mdash; or burning cash.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4" data-reveal data-reveal-delay="150">
              {[
                { stat: '3K+', label: 'Jobs done', Icon: Sparkles },
                { stat: '78+', label: 'Countries served', Icon: Globe2 },
                { stat: '12K+', label: 'Roles filled', Icon: Users2, primary: true },
                { stat: '60\u201380%', label: 'Cost savings', Icon: Heart },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`rounded-3xl p-6 sm:p-7 ${
                    s.primary
                      ? 'bg-gradient-brand text-white shadow-lift'
                      : 'bg-white/5 border border-white/10 text-white'
                  }`}
                >
                  <s.Icon className={`w-5 h-5 mb-4 ${s.primary ? 'text-white' : 'text-brand-400'}`} />
                  <div className="font-display font-bold text-3xl sm:text-4xl">{s.stat}</div>
                  <div className="mt-1 text-sm opacity-80">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
