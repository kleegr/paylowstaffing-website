import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Heart, Globe2, Sparkles, Users2 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';
import { assets } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'PayLow was founded by Nathan to connect businesses with skilled offshore professionals — a flexible, efficient staffing model built from firsthand experience.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About PayLow"
        title={<>We connect ambitious teams with <span className="text-gradient">world-class talent.</span></>}
        lead="Born from a real hiring problem. Built to fix it for everyone."
        actions={
          <>
            <Link href="/contact-us" className="btn-primary">Start hiring <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/how-it-works" className="btn-outline">How it works</Link>
          </>
        }
      />

      {/* ===== Story ===== */}
      <section className="section bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative max-w-md mx-auto lg:mx-0" data-reveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-card">
                <Image src={assets.about01} alt="PayLow recruiter" fill className="object-cover" sizes="280px" unoptimized />
              </div>
              <div className="space-y-4 mt-10">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card">
                  <Image src={assets.about02} alt="" fill className="object-cover" sizes="240px" unoptimized />
                </div>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card">
                  <Image src={assets.aboutRecruiter} alt="" fill className="object-cover" sizes="240px" unoptimized />
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
                PayLow began inside a growing bookkeeping company that couldn&rsquo;t find affordable, qualified help. Local hiring was breaking the budget. Quality kept slipping.
              </p>
              <p>
                Our CEO, Nathan, looked offshore — and found extraordinary talent everyone else had missed. PayLow was born to bring that talent to every team facing the same problem.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/contact-us" className="btn-primary">Hire today <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Mission + Stats (dark, premium) ===== */}
      <section className="section bg-ink-900 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-mesh-2 opacity-25 mix-blend-screen" />
        <div aria-hidden className="absolute -top-10 right-10 w-80 h-80 rounded-full bg-gradient-brand opacity-25 blur-3xl" />

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div data-reveal>
              <p className="mb-5"><span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80"><span className="w-1.5 h-1.5 rounded-full bg-brand-400" /> Mission</span></p>
              <h2 className="display-2 text-white">Empower every team to grow — without limits.</h2>
              <p className="lead mt-6 text-white/70 max-w-xl">
                Connect ambitious businesses with dedicated, expertly matched remote professionals. Boost productivity. Scale sustainably.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4" data-reveal data-reveal-delay="200">
              {[
                { stat: '3K+', label: 'Jobs done', Icon: Sparkles },
                { stat: '78+', label: 'Countries served', Icon: Globe2 },
                { stat: '12K+', label: 'Roles filled', Icon: Users2, primary: true },
                { stat: '60–80%', label: 'Cost savings', Icon: Heart },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`rounded-3xl p-6 sm:p-7 ${
                    s.primary
                      ? 'bg-gradient-brand text-white shadow-lift'
                      : 'bg-white/5 border border-white/10 text-white'
                  }`}
                  data-reveal
                  data-reveal-delay={i * 80}
                >
                  <s.Icon className={`w-6 h-6 mb-4 ${s.primary ? 'text-white' : 'text-brand-400'}`} />
                  <div className="font-display font-bold text-3xl sm:text-4xl">{s.stat}</div>
                  <div className="mt-1 text-sm opacity-80">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Values cards ===== */}
      <section className="section bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What sets us apart"
            title={<>More than staffing. <span className="text-gradient">A partnership.</span></>}
            align="center"
          />
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              { t: 'Exceptional Talent', d: 'Highly skilled professionals at a fraction of in-house costs. Scale without sacrificing quality.', emoji: '✦' },
              { t: 'Reliable Support', d: 'Round-the-clock availability across every time zone — your operations never sleep.', emoji: '◎' },
              { t: 'Dedicated Workforce', d: 'Energetic, committed team members who treat your business like their own.', emoji: '✺' },
            ].map((b, i) => (
              <article key={b.t} className="card-hover p-8" data-reveal data-reveal-delay={i * 100}>
                <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-gradient-brand text-white font-display font-bold text-2xl mb-5 shadow-glow-sm">
                  {b.emoji}
                </div>
                <h3 className="display-3">{b.t}</h3>
                <p className="mt-3 text-ink-500 leading-relaxed text-sm">{b.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
