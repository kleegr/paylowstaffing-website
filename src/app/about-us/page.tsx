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
    'PayLow was founded to connect businesses with skilled offshore professionals — flexible, efficient staffing built from firsthand experience.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About PayLow"
        title={<>We connect ambitious teams with <span className="text-gradient">world-class talent.</span></>}
        lead="Born from a real hiring problem. Built to fix it for everyone."
        bgImage={assets.aboutHeroBg}
        imageAlt="A PayLow professional"
        actions={
          <>
            <GetStartedButton>Start hiring <ArrowRight className="w-4 h-4" /></GetStartedButton>
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
            <h2 className="display-2">Built by people who needed it.</h2>
            <div className="mt-6 space-y-4 text-ink-600 leading-relaxed text-pretty">
              <p>
                PayLow began inside a growing bookkeeping company that couldn&rsquo;t find affordable, qualified help. Local hiring broke the budget. Quality slipped.
              </p>
              <p>
                Our CEO, Nathan, looked offshore — and found extraordinary talent everyone else had missed. PayLow exists to bring that talent to every team facing the same problem.
              </p>
            </div>
            <div className="mt-8">
              <GetStartedButton>Hire today <ArrowRight className="w-4 h-4" /></GetStartedButton>
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
              <h2 className="display-2 text-white">Empower every team to grow — without limits.</h2>
              <p className="lead mt-6 text-white/70 max-w-xl">
                Connect ambitious businesses with dedicated, expertly matched remote professionals. Boost productivity. Scale sustainably.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4" data-reveal data-reveal-delay="150">
              {[
                { stat: '3K+', label: 'Jobs done', Icon: Sparkles },
                { stat: '78+', label: 'Countries served', Icon: Globe2 },
                { stat: '12K+', label: 'Roles filled', Icon: Users2, primary: true },
                { stat: '60–80%', label: 'Cost savings', Icon: Heart },
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
