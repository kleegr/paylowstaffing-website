import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Headphones, Briefcase, TrendingDown, CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';
import GetStartedButton from '@/components/GetStartedButton';
import CountUp from '@/components/CountUp';
import FaqSection from '@/components/FaqSection';
import RotatingProofChip from '@/components/RotatingProofChip';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { assets, reviews } from '@/lib/content';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden noise">
        <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-warm" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-2" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-backdrop opacity-50" />
        <div aria-hidden className="absolute top-24 -left-32 w-96 h-96 rounded-full bg-gradient-brand opacity-15 blur-3xl animate-float-slow" />
        <div aria-hidden className="absolute -bottom-24 right-0 w-[28rem] h-[28rem] rounded-full bg-brand-300/25 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />

        <div className="container-wide pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6" data-reveal>
              <p className="mb-6"><span className="eyebrow"><span className="eyebrow-dot animate-pulse" /> Vetted remote staff</span></p>

              <h1 className="display-1">
                Your next great hire.
                <br />
                <span className="relative inline-block">
                  <span className="text-gradient">
                    From{' '}
                    <CountUp className="text-gradient" from={55} value={7} duration={1600} prefix="$" format="int" />
                    /hour.
                  </span>
                  <span aria-hidden="true" className="hidden md:inline-block handwritten-accent absolute -top-6 -right-6 text-2xl whitespace-nowrap">not a typo &#8601;</span>
                </span>
              </h1>

              {/* Rotating proof chip — lives right under the headline,
                  cycles through value phrases. The hero's quiet motion. */}
              <div className="mt-5">
                <RotatingProofChip />
              </div>

              <p className="lead mt-5">
                We screen thousands. You meet your top 4 or 5. You hire on the call. From $7 an hour. No surprises.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <GetStartedButton size="lg">Find my match <ArrowRight className="w-4 h-4" /></GetStartedButton>
                <Link href="/pricing" className="btn-outline btn-lg">See the math</Link>
              </div>

              {/* Static pill row — informational anchor below the buttons. */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 max-w-xl text-sm text-ink-600">
                {['Pre-vetted talent', 'Your time zone', 'Hire this week', 'No hidden fees'].map((p) => (
                  <p key={p} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" /> {p}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative" data-reveal data-reveal-delay="200">
              <div className="relative max-w-[480px] mx-auto aspect-[4/5]">
                <div aria-hidden className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-gradient-brand opacity-30 blur-2xl -z-10" />
                <div aria-hidden className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-brand-300 opacity-30 blur-2xl -z-10" />

                <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-lift">
                  <Image src={assets.heroPerson} alt="A friendly PayLow remote professional" fill sizes="(max-width: 1024px) 90vw, 480px" className="object-cover" priority />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/30 via-transparent to-transparent" />
                </div>

                {/* Floating proof cards. Hidden below sm to avoid spilling off
                    the portrait edges on small phones (caused horizontal feel
                    + cramped overlaps). They reappear from sm up. */}
                <div className="hidden sm:flex absolute -top-4 -left-4 sm:-left-8 z-20 card-glass px-3.5 py-2.5 items-center gap-3 animate-float" style={{ animationDelay: '0.4s' }}>
                  <div className="w-9 h-9 rounded-xl bg-gradient-brand text-white inline-flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                  <div>
                    <div className="font-display font-bold text-base text-ink-900 leading-none">Hired in <CountUp value={7} duration={1300} /> days</div>
                    <div className="text-[11px] text-ink-500 mt-0.5">avg time to start</div>
                  </div>
                </div>

                <div className="hidden sm:flex absolute top-1/3 -right-4 sm:-right-8 z-20 card-glass px-3.5 py-2.5 items-center gap-3 animate-float" style={{ animationDelay: '1.2s' }}>
                  <div className="w-9 h-9 rounded-xl bg-ink-900 text-white inline-flex items-center justify-center"><TrendingDown className="w-4 h-4" /></div>
                  <div>
                    <div className="font-display font-bold text-base text-ink-900 leading-none"><CountUp value={77} duration={1700} />% lower cost</div>
                    <div className="text-[11px] text-ink-500 mt-0.5">vs. local hiring</div>
                  </div>
                </div>

                <div className="hidden sm:flex absolute -bottom-4 left-6 z-20 card-glass px-3.5 py-2.5 items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex -space-x-2">
                    {['F2D2A8', 'FFA46B', 'FF8242', 'F26C2A'].map((c) => (
                      <span key={c} className="inline-block w-7 h-7 rounded-full ring-2 ring-white" style={{ backgroundColor: `#${c}` }} />
                    ))}
                  </div>
                  <div>
                    <div className="font-display font-bold text-base text-ink-900 leading-none"><CountUp value={3000} duration={2100} />+ hires</div>
                    <div className="text-[11px] text-ink-500 mt-0.5">and counting</div>
                  </div>
                </div>

                <Sparkles aria-hidden className="absolute -top-2 right-6 w-5 h-5 text-brand-400 animate-pulse" />
              </div>

              {/* Mobile-only proof strip — replaces the floating cards on phones
                  with a clean inline row that can't overflow. */}
              <div className="sm:hidden mt-6 grid grid-cols-3 gap-2 text-center">
                {[
                  { v: '7 days', l: 'to hire' },
                  { v: '77%', l: 'lower cost' },
                  { v: '3,000+', l: 'hires' },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-ink-100 bg-white/70 backdrop-blur px-2 py-3">
                    <div className="font-display font-bold text-ink-900 text-lg leading-none tabular-nums">{s.v}</div>
                    <div className="text-[11px] text-ink-500 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="How it works"
            title={<>Hello to hired in <span className="text-gradient">a week.</span></>}
            lead="Four steps. We do most of them."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', t: 'Brief us',      d: 'A quick call. Tell us what you need.',                          icon: Headphones },
              { n: '02', t: 'We screen',     d: 'Hundreds apply. Four or five make the cut.',                   icon: ShieldCheck },
              { n: '03', t: 'You interview', d: 'See your 4 or 5 picks side by side. Decide on the call.',      icon: Briefcase },
              { n: '04', t: 'They start',    d: 'Set up and productive day one.',                                icon: Zap },
            ].map((s, i) => (
              <article key={s.n} className="card-hover p-6 group" data-reveal data-reveal-delay={i * 80}>
                <div className="flex items-start justify-between mb-5">
                  <span className="font-display font-extrabold text-2xl text-ink-200 group-hover:text-brand-400 transition-colors tabular-nums tracking-tight">{s.n}</span>
                  <span className="inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-ink-50 text-ink-700 group-hover:bg-gradient-brand group-hover:text-white transition-all duration-500"><s.icon className="w-4 h-4" /></span>
                </div>
                <h3 className="font-display font-bold text-lg text-ink-900">{s.t}</h3>
                <p className="mt-1.5 text-ink-500 text-sm leading-relaxed">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES — mobile-friendly: shorter cards, larger tap area, readable
          labels. Switched from a tall aspect-[4/5] photo to a compact 16:10
          thumbnail so cards aren't awkwardly tall on phones. */}
      <section className="section bg-ink-50/50 relative">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-30" />
        <div className="container-wide relative">
          <SectionHeading
            eyebrow="What we fill"
            title={<>Talent for <span className="text-gradient">every role.</span></>}
            lead="Admin. Support. Dev. Sales. We&rsquo;ve placed all of it."
          />
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { title: 'Real Estate',  sub: 'Listings, leasing, management',  image: assets.industryRealEstate },
              { title: 'E-Commerce',   sub: 'Listings, support, fulfillment', image: assets.industryEcommerce },
              { title: 'Healthcare',   sub: 'Billing, claims, scheduling',    image: assets.industryHealthcare },
              { title: 'IT & Tech',    sub: 'Devs, helpdesk, ops',            image: assets.industryIT },
            ].map((c, i) => (
              <Link key={c.title} href="/industries" className="group relative rounded-3xl overflow-hidden bg-white shadow-card hover:shadow-lift transition-all duration-500 ease-out hover:-translate-y-1" data-reveal data-reveal-delay={i * 80}>
                <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
                  <Image src={c.image} alt={c.title} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5 text-white">
                    <h3 className="font-display font-bold text-[15px] sm:text-lg leading-tight">{c.title}</h3>
                    <p className="text-[11px] sm:text-xs text-white/85 mt-1 leading-snug">{c.sub}</p>
                  </div>
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur inline-flex items-center justify-center group-hover:bg-gradient-brand group-hover:text-white transition-all"><ArrowRight className="w-3.5 h-3.5" /></div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex justify-center" data-reveal>
            <Link href="/industries" className="btn-outline">See every role <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="section relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-warm" />
        <div aria-hidden className="absolute -top-20 left-1/3 w-96 h-96 rounded-full bg-gradient-brand opacity-12 blur-3xl" />

        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-reveal>
              <p className="mb-5"><span className="eyebrow"><span className="eyebrow-dot" /> Pricing</span></p>
              <h2 className="display-2">
                Start at{' '}
                <span className="text-gradient">
                  <CountUp className="text-gradient" from={55} value={7} duration={1600} prefix="$" format="int" />
                  /hour.
                </span>
                <br />
                <span className="handwritten-accent text-4xl sm:text-5xl ml-1">
                  save up to <CountUp value={80} duration={1500} format="int" suffix="%" />.
                </span>
              </h2>
              <p className="lead mt-5">
                No setup fees. No payroll taxes. No surprise markups.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/pricing" className="btn-primary">See the calculator <ArrowRight className="w-4 h-4" /></Link>
                <GetStartedButton variant="ghost">Find my match</GetStartedButton>
              </div>
            </div>

            <div className="relative" data-reveal data-reveal-delay="150">
              <div className="card-dark p-8 sm:p-10 relative overflow-hidden noise noise-strong">
                <div aria-hidden className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-gradient-brand opacity-40 blur-3xl" />
                <p className="label-meta text-white/60">PayLow rate</p>
                <div className="mt-3 flex items-end gap-1 leading-none tabular-nums">
                  <span className="font-display font-extrabold text-white tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>$</span>
                  <span className="font-display font-extrabold tracking-tight inline-block" style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', lineHeight: 0.9, letterSpacing: '-0.04em' }}>
                    <CountUp className="text-gradient" from={55} value={7} duration={1700} format="int" />
                  </span>
                  <span className="font-display font-semibold text-white/70 pb-3 ml-1">/hour</span>
                </div>
                <p className="mt-4 text-white/65 text-sm">No setup fees. No payroll taxes. No surprises.</p>

                <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  {[
                    { stat: '60\u201380%', label: 'Cost savings' },
                    { stat: '7 days',      label: 'Time to hire' },
                    { stat: '$0',          label: 'Setup fee' },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="stat-number text-white text-xl sm:text-2xl">{s.stat}</div>
                      <div className="text-white/55 text-[11px] sm:text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — interactive stacked-paper carousel. Text-first: no
          photos, no videos. Handwritten quote + typewriter + auto-advance. */}
      <section id="testimonials" className="section bg-white relative overflow-hidden scroll-mt-24">
        <div aria-hidden className="absolute -top-20 right-1/4 w-96 h-96 rounded-full bg-brand-300/15 blur-3xl" />
        <div className="container-wide relative">
          <SectionHeading
            eyebrow="Customer stories"
            title={<><span className="handwritten-accent text-4xl sm:text-5xl mr-2">Real teams.</span> <span className="text-gradient">Real results.</span></>}
            lead="What founders, brokers, and ops leads say after switching to PayLow."
            align="center"
          />

          <div className="mt-14">
            <TestimonialCarousel reviews={reviews} />
          </div>
        </div>
      </section>

      <FaqSection />
      <CtaBanner />
    </>
  );
}
