import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Headphones,
  Briefcase,
  Star,
  Quote,
  TrendingDown,
  CheckCircle2,
} from 'lucide-react';
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
        <div
          aria-hidden
          className="absolute top-24 -left-32 w-96 h-96 rounded-full bg-gradient-brand opacity-15 blur-3xl animate-float-slow"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 right-0 w-[28rem] h-[28rem] rounded-full bg-brand-300/25 blur-3xl animate-float-slow"
          style={{ animationDelay: '3s' }}
        />

        <div className="container-wide pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT — copy */}
            <div className="lg:col-span-6" data-reveal>
              <p className="mb-6">
                <span className="eyebrow">
                  <span className="eyebrow-dot animate-pulse" /> Built for fast-moving teams
                </span>
              </p>

              <h1 className="display-1">
                Brilliant remote staff.
                <br />
                <span className="relative inline-block">
                  <span className="text-gradient">From $7 an hour.</span>
                  <span
                    aria-hidden="true"
                    className="hidden md:inline-block handwritten-accent absolute -top-6 -right-6 text-2xl whitespace-nowrap"
                  >
                    not a typo &#8600;
                  </span>
                </span>
              </h1>

              <p className="lead mt-6">
                We match you with vetted remote pros in days &mdash; not months. Cut payroll
                costs by 60&ndash;80%. Skip the contracts, the taxes, the agency markup.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <GetStartedButton size="lg">
                  Get matched <ArrowRight className="w-4 h-4" />
                </GetStartedButton>
                <Link href="/pricing" className="btn-outline btn-lg">
                  Run the numbers
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 max-w-xl text-sm text-ink-600">
                {[
                  'Fluent English',
                  'Your time zone',
                  'No payroll tax',
                  'Hire this week',
                ].map((p) => (
                  <p key={p} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" /> {p}
                  </p>
                ))}
              </div>
            </div>

            {/* RIGHT — real photo + floating glass cards */}
            <div className="lg:col-span-6 relative" data-reveal data-reveal-delay="200">
              <div className="relative max-w-[480px] mx-auto aspect-[4/5]">
                {/* Brand orb behind */}
                <div
                  aria-hidden
                  className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-gradient-brand opacity-30 blur-2xl -z-10"
                />
                <div
                  aria-hidden
                  className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-brand-300 opacity-30 blur-2xl -z-10"
                />

                {/* Main photo */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-lift">
                  <Image
                    src={assets.heroPerson}
                    alt="A friendly PayLow remote professional"
                    fill
                    sizes="(max-width: 1024px) 90vw, 480px"
                    className="object-cover"
                    priority
                  />
                  {/* Subtle warm overlay */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-900/30 via-transparent to-transparent"
                  />
                </div>

                {/* Floating card 1 — top left */}
                <div
                  className="absolute -top-4 -left-4 sm:-left-8 z-20 card-glass px-3.5 py-2.5 flex items-center gap-3 animate-float"
                  style={{ animationDelay: '0.4s' }}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-brand text-white inline-flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-base text-ink-900 leading-none">
                      Hired in 7 days
                    </div>
                    <div className="text-[11px] text-ink-500 mt-0.5">avg time to start</div>
                  </div>
                </div>

                {/* Floating card 2 — middle right */}
                <div
                  className="absolute top-1/3 -right-4 sm:-right-8 z-20 card-glass px-3.5 py-2.5 flex items-center gap-3 animate-float"
                  style={{ animationDelay: '1.2s' }}
                >
                  <div className="w-9 h-9 rounded-xl bg-ink-900 text-white inline-flex items-center justify-center">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-base text-ink-900 leading-none">
                      77% lower cost
                    </div>
                    <div className="text-[11px] text-ink-500 mt-0.5">vs. local hiring</div>
                  </div>
                </div>

                {/* Floating card 3 — bottom left */}
                <div
                  className="absolute -bottom-4 left-6 z-20 card-glass px-3.5 py-2.5 flex items-center gap-3 animate-float"
                  style={{ animationDelay: '2s' }}
                >
                  <div className="flex -space-x-2">
                    {['F2D2A8', 'FFA46B', 'FF8242', 'F26C2A'].map((c) => (
                      <span
                        key={c}
                        className="inline-block w-7 h-7 rounded-full ring-2 ring-white"
                        style={{ backgroundColor: `#${c}` }}
                      />
                    ))}
                  </div>
                  <div>
                    <div className="font-display font-bold text-base text-ink-900 leading-none">
                      3,000+ hires
                    </div>
                    <div className="text-[11px] text-ink-500 mt-0.5">and counting</div>
                  </div>
                </div>

                <Sparkles
                  aria-hidden
                  className="absolute -top-2 right-6 w-5 h-5 text-brand-400 animate-pulse"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
         HOW IT WORKS — 4 steps
      ==================================================================== */}
      <section className="section bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                From inquiry to <span className="text-gradient">hired in a week.</span>
              </>
            }
            lead="Four steps. Mostly handled by us. You spend about 30 minutes total."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                n: '01',
                t: 'Tell us what you need',
                d: 'A 15-minute call to scope the role and your team\u2019s style.',
                icon: Headphones,
              },
              {
                n: '02',
                t: 'We do the heavy lifting',
                d: 'We screen hundreds. You see the top 3 candidates.',
                icon: ShieldCheck,
              },
              {
                n: '03',
                t: 'Interview your shortlist',
                d: 'Meet the ones you like. Decide on the call.',
                icon: Briefcase,
              },
              {
                n: '04',
                t: 'They start Monday',
                d: 'Onboarded, set up, productive from day one.',
                icon: Zap,
              },
            ].map((s, i) => (
              <article
                key={s.n}
                className="card-hover p-6 group"
                data-reveal
                data-reveal-delay={i * 80}
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="font-display font-extrabold text-2xl text-ink-200 group-hover:text-brand-400 transition-colors tabular-nums tracking-tight">
                    {s.n}
                  </span>
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
            eyebrow="Roles we fill"
            title="Pre-vetted pros across every team."
            lead="Whatever you need &mdash; admin, support, dev, sales &mdash; we\u2019ve placed dozens of them."
          />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Real Estate',
                sub: 'Property managers, listings',
                image: assets.industryRealEstate,
              },
              {
                title: 'E-Commerce',
                sub: 'Product listers, CX support',
                image: assets.industryEcommerce,
              },
              {
                title: 'Healthcare',
                sub: 'Billing, claims, telehealth',
                image: assets.industryHealthcare,
              },
              {
                title: 'IT & Tech',
                sub: 'Devs, helpdesk, data',
                image: assets.industryIT,
              },
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
                    loading="lazy"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent"
                  />
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
              See every role <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
         PRICING TEASER
      ==================================================================== */}
      <section className="section relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-warm" />
        <div
          aria-hidden
          className="absolute -top-20 left-1/3 w-96 h-96 rounded-full bg-gradient-brand opacity-12 blur-3xl"
        />

        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-reveal>
              <p className="mb-5">
                <span className="eyebrow">
                  <span className="eyebrow-dot" /> The deal
                </span>
              </p>
              <h2 className="display-2">
                Start at <span className="text-gradient">$7/hour.</span>
                <br />
                <span className="handwritten-accent text-4xl sm:text-5xl ml-1">
                  save up to 80%.
                </span>
              </h2>
              <p className="lead mt-5">
                No setup fee. No payroll taxes. No long-term contract. Just elite talent at a
                fraction of what onshore costs you.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/pricing" className="btn-primary">
                  Try the calculator <ArrowRight className="w-4 h-4" />
                </Link>
                <GetStartedButton variant="ghost">Get matched</GetStartedButton>
              </div>
            </div>

            <div className="relative" data-reveal data-reveal-delay="150">
              <div className="card-dark p-8 sm:p-10 relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-gradient-brand opacity-40 blur-3xl"
                />
                <p className="label-meta text-white/60">PayLow average</p>
                <div className="mt-3 flex items-end gap-1 leading-none tabular-nums">
                  <span
                    className="font-display font-extrabold text-white tracking-tight"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
                  >
                    $
                  </span>
                  <span
                    className="font-display font-extrabold text-gradient tracking-tight"
                    style={{
                      fontSize: 'clamp(5rem, 12vw, 9rem)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    7
                  </span>
                  <span className="font-display font-semibold text-white/70 pb-3 ml-1">
                    /hour
                  </span>
                </div>
                <p className="mt-4 text-white/65 text-sm">All-in. No surprises. No catches.</p>

                <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  {[
                    { stat: '60\u201380%', label: 'Cost savings' },
                    { stat: '7 days', label: 'Time to hire' },
                    { stat: '$0', label: 'Setup fee' },
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

      {/* ====================================================================
         TESTIMONIALS
      ==================================================================== */}
      <section className="section bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What teams say"
            title={
              <>
                <span className="handwritten-accent text-4xl sm:text-5xl mr-2">Real teams.</span>{' '}
                <span className="text-gradient">Real results.</span>
              </>
            }
          />
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {reviews.slice(0, 3).map((t, i) => (
              <article
                key={t.name}
                className="card-hover p-6 flex flex-col"
                data-reveal
                data-reveal-delay={i * 100}
              >
                <Quote className="w-5 h-5 text-brand-400 mb-4" />
                <p className="text-ink-700 text-[0.95rem] leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 pt-5 border-t border-ink-100 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-ink-100 shrink-0">
                    <Image
                      src={assets[t.image as keyof typeof assets]}
                      alt={t.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-semibold text-ink-900 text-[0.95rem]">
                      {t.name}
                    </div>
                    <div className="text-xs text-ink-500">{t.role}</div>
                  </div>
                  <div className="flex gap-0.5 text-brand-500">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
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
