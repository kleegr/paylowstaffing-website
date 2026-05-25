import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Globe2, Briefcase, ShieldCheck, Zap, Headphones, Star } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';
import GetStartedButton from '@/components/GetStartedButton';
import { assets, reviews } from '@/lib/content';

export default function HomePage() {
  return (
    <>
      {/* ====================================================================
         HERO
      ==================================================================== */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-warm" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-2" />
        <div aria-hidden className="absolute inset-0 -z-10 grid-backdrop opacity-50" />
        <div aria-hidden className="absolute top-24 -left-32 w-96 h-96 rounded-full bg-gradient-brand opacity-15 blur-3xl animate-float-slow" />
        <div aria-hidden className="absolute -bottom-24 right-0 w-[28rem] h-[28rem] rounded-full bg-brand-300/25 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />

        <div className="container-wide pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div data-reveal>
              <p className="mb-6">
                <span className="eyebrow">
                  <span className="eyebrow-dot animate-pulse" /> Trusted in 78+ countries
                </span>
              </p>

              <h1 className="display-1">
                Hire world-class talent. <span className="text-gradient">From $7/hour.</span>
              </h1>

              <p className="lead mt-6 max-w-xl">
                PayLow matches you with elite offshore professionals in days — not months. Cut payroll costs by 60–80%. No contracts. No hidden fees.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <GetStartedButton size="lg">
                  Get started <ArrowRight className="w-4 h-4" />
                </GetStartedButton>
                <Link href="/pricing" className="btn-outline btn-lg">See pricing</Link>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 max-w-xl text-sm text-ink-600">
                {['Fluent English', 'Any time zone', 'No payroll tax', 'Hire in 1 week'].map((p) => (
                  <p key={p} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" /> {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Right — composition with floating glass cards */}
            <div className="relative" data-reveal data-reveal-delay="200">
              <div className="relative aspect-[5/6] max-w-[480px] mx-auto">
                <div aria-hidden className="absolute inset-x-4 top-12 bottom-12 rounded-[3rem] bg-gradient-brand opacity-90 shadow-glow" />
                <div aria-hidden className="absolute inset-x-10 top-20 bottom-6 rounded-[2.5rem] bg-white shadow-lift" />

                <Image
                  src={assets.homeHero}
                  alt="PayLow remote professional"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-contain animate-float relative z-10"
                  priority
                  unoptimized
                />

                <div className="absolute top-8 -left-2 sm:-left-5 z-20 card-glass px-3.5 py-2.5 flex items-center gap-3 animate-float" style={{ animationDelay: '0.4s' }}>
                  <div className="w-9 h-9 rounded-xl bg-gradient-brand text-white inline-flex items-center justify-center">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-base text-ink-900 leading-none">78+</div>
                    <div className="text-[11px] text-ink-500">Countries</div>
                  </div>
                </div>

                <div className="absolute top-1/3 -right-2 sm:-right-5 z-20 card-glass px-3.5 py-2.5 flex items-center gap-3 animate-float" style={{ animationDelay: '1.2s' }}>
                  <div className="w-9 h-9 rounded-xl bg-ink-900 text-white inline-flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-base text-ink-900 leading-none">12K+</div>
                    <div className="text-[11px] text-ink-500">Roles filled</div>
                  </div>
                </div>

                <div className="absolute bottom-10 -left-2 sm:-left-5 z-20 card-glass px-3.5 py-2.5 flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex -space-x-2">
                    {['F2D2A8', 'FFA46B', 'FF8242', 'F26C2A'].map((c) => (
                      <span key={c} className="inline-block w-7 h-7 rounded-full ring-2 ring-white" style={{ backgroundColor: `#${c}` }} />
                    ))}
                  </div>
                  <div>
                    <div className="font-display font-bold text-base text-ink-900 leading-none">3K+</div>
                    <div className="text-[11px] text-ink-500">Jobs done</div>
                  </div>
                </div>

                <Sparkles aria-hidden className="absolute top-2 right-4 w-4 h-4 text-brand-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
         HOW IT WORKS – 4 steps
      ==================================================================== */}
      <section className="section bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="How it works"
            title={<>From inquiry to <span className="text-gradient">hired</span> in days.</>}
            lead="A streamlined process designed to put the right person on your team — fast."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', t: 'Tell us your needs', d: 'A 15-minute call to scope the role.', icon: Headphones },
              { n: '02', t: 'We match talent', d: 'Vetted candidates shortlisted in days.', icon: ShieldCheck },
              { n: '03', t: 'You interview', d: 'Meet the shortlist. You pick.', icon: Briefcase },
              { n: '04', t: 'They start fast', d: 'Onboarded and productive immediately.', icon: Zap },
            ].map((s, i) => (
              <article
                key={s.n}
                className="card-hover p-6 group"
                data-reveal
                data-reveal-delay={i * 80}
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="font-display font-bold text-2xl text-ink-200 group-hover:text-brand-400 transition-colors">{s.n}</span>
                  <span className="inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-ink-50 text-ink-700 group-hover:bg-gradient-brand group-hover:text-white transition-all duration-500">
                    <s.icon className="w-4 h-4" />
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-ink-900">{s.t}</h3>
                <p className="mt-1.5 text-ink-500 text-sm leading-relaxed">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
         INDUSTRIES showcase
      ==================================================================== */}
      <section className="section bg-ink-50/50 relative">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-30" />
        <div className="container-wide relative">
          <SectionHeading
            eyebrow="Specialties"
            title="Skilled talent for every team."
            lead="Pre-vetted professionals across the roles you need most."
          />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Real Estate', sub: 'Property managers, listing coordinators', image: assets.industryRealEstate },
              { title: 'E-Commerce', sub: 'Product listers, customer support', image: assets.industryEcommerce },
              { title: 'Healthcare', sub: 'Medical billing, claims, support', image: assets.industryHealthcare },
              { title: 'IT & Tech', sub: 'Developers, helpdesk, data', image: assets.industryIT },
            ].map((c, i) => (
              <Link
                key={c.title}
                href="/industries"
                className="group relative rounded-3xl overflow-hidden bg-white shadow-card hover:shadow-lift transition-all duration-500 ease-out hover:-translate-y-1"
                data-reveal
                data-reveal-delay={i * 80}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    unoptimized
                    loading="lazy"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="font-display font-bold text-lg">{c.title}</h3>
                    <p className="text-xs text-white/75 mt-1">{c.sub}</p>
                  </div>
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur inline-flex items-center justify-center group-hover:bg-gradient-brand group-hover:text-white transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex justify-center" data-reveal>
            <Link href="/industries" className="btn-outline">
              See all roles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
         PRICING TEASER
      ==================================================================== */}
      <section className="section relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-warm" />
        <div aria-hidden className="absolute -top-20 left-1/3 w-96 h-96 rounded-full bg-gradient-brand opacity-12 blur-3xl" />

        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-reveal>
              <p className="mb-5"><span className="eyebrow"><span className="eyebrow-dot" /> Simple pricing</span></p>
              <h2 className="display-2">
                Start at <span className="text-gradient">$7/hour.</span><br />Save up to 80%.
              </h2>
              <p className="lead mt-5 max-w-xl">
                No setup fees. No taxes. No long-term contracts. Just elite talent at a fraction of what onshore costs.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/pricing" className="btn-primary">
                  Try the calculator <ArrowRight className="w-4 h-4" />
                </Link>
                <GetStartedButton variant="ghost">Get started</GetStartedButton>
              </div>
            </div>

            <div className="relative" data-reveal data-reveal-delay="150">
              <div className="card-dark p-8 sm:p-10 relative overflow-hidden">
                <div aria-hidden className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-gradient-brand opacity-40 blur-3xl" />
                <p className="text-white/55 text-[11px] uppercase tracking-widest font-semibold">PayLow average</p>
                <div className="mt-3 flex items-end gap-1 leading-none">
                  <span className="font-display font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>$</span>
                  <span className="font-display font-bold text-gradient" style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', lineHeight: 0.9 }}>7</span>
                  <span className="font-display font-semibold text-white/70 pb-3 ml-1">/hour</span>
                </div>
                <p className="mt-4 text-white/65 text-sm">All-in. No surprises.</p>

                <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  {[
                    { stat: '60–80%', label: 'Cost savings' },
                    { stat: '7 days', label: 'Avg time to hire' },
                    { stat: '$0', label: 'Setup fee' },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="font-display font-bold text-white text-lg sm:text-xl">{s.stat}</div>
                      <div className="text-white/55 text-[11px] sm:text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
         TESTIMONIALS
      ==================================================================== */}
      <section className="section bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Loved by teams"
            title={<>Real teams. <span className="text-gradient">Real results.</span></>}
          />
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {reviews.slice(0, 3).map((t, i) => (
              <article key={t.name} className="card-hover p-6 flex flex-col" data-reveal data-reveal-delay={i * 100}>
                <div className="flex gap-0.5 mb-4 text-brand-500">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-ink-700 text-[0.95rem] leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 pt-5 border-t border-ink-100">
                  <div className="font-display font-semibold text-ink-900">{t.name}</div>
                  <div className="text-sm text-ink-500">{t.role}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
