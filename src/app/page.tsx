import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import CheckBullet from '@/components/CheckBullet';
import CtaBanner from '@/components/CtaBanner';
import { assets, reviews, siteConfig } from '@/lib/content';

export default function HomePage() {
  return (
    <>
      {/* ===== HERO — cream/peach with bokeh + floating photo ===== */}
      <section className="relative overflow-hidden bg-hero-cream">
        <span aria-hidden="true" className="watermark -bottom-10 -left-12 opacity-30">
          P
        </span>

        <div className="relative container-wide pt-16 pb-20 md:pt-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-up">
              <div className="eyebrow-row">
                <span className="font-display font-semibold text-ink-900">Welcome To</span>
                <span className="pill">Pay Low</span>
              </div>

              <h1 className="font-display font-bold tracking-tight text-balance text-ink-900 text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                Hire A Full–time Remote Employee For{' '}
                <span className="text-brand-600">$7 An Hour</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-slate-700 leading-relaxed max-w-xl">
                Discover world-class professionals with our global recruitment platform and
                reduce operating and payroll costs by 60% to 80%.
              </p>

              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-xl">
                <CheckBullet>No Hidden Fees</CheckBullet>
                <CheckBullet>Fluent English</CheckBullet>
                <CheckBullet>No Recruitment Fees</CheckBullet>
                <CheckBullet>No Payroll Taxes</CheckBullet>
                <CheckBullet>No Lock-In Contracts</CheckBullet>
                <CheckBullet>Any Time Zone You Prefer</CheckBullet>
              </ul>

              <div className="mt-9">
                <Link href="/contact-us" className="btn-primary">
                  Hire Today
                </Link>
              </div>
            </div>

            {/* Right — floating photo with stat cards */}
            <div className="relative animate-fade-in">
              <div className="relative aspect-[4/5] max-w-[520px] mx-auto">
                <Image
                  src={assets.homeHero}
                  alt="Smiling remote PayLow professional"
                  fill
                  sizes="(max-width: 1024px) 80vw, 520px"
                  className="object-contain animate-float"
                  priority
                  unoptimized
                />

                {/* "78+ Jobs For Countries" */}
                <div className="absolute top-6 right-0 sm:-right-2 rounded-md bg-white shadow-soft px-4 py-3 flex items-center gap-3">
                  <span className="font-display font-bold text-2xl text-brand-600">78+</span>
                  <span className="text-xs text-slate-600 leading-tight">
                    Jobs For
                    <br />
                    Countries
                  </span>
                </div>

                {/* "12K+ Company Jobs" */}
                <div className="absolute top-1/3 -right-2 sm:-right-6 rounded-md bg-white shadow-soft px-4 py-3 flex items-center gap-3">
                  <span className="font-display font-bold text-2xl text-brand-600">12K+</span>
                  <span className="text-xs text-slate-600 leading-tight">
                    Company
                    <br />
                    Jobs
                  </span>
                </div>

                {/* "3K+ Jobs Done" + avatar stack */}
                <div className="absolute bottom-8 left-0 sm:-left-2 rounded-md bg-white shadow-soft px-4 py-3 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['F2D2A8', 'FFA46B', 'FF8242', 'F26C2A'].map((c) => (
                      <span
                        key={c}
                        className="inline-block w-7 h-7 rounded-full ring-2 ring-white"
                        style={{ backgroundColor: `#${c}` }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-2xl text-brand-600">3K+</span>
                    <span className="text-xs text-slate-600">Jobs Done</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Industries snapshot — horizontal cards ===== */}
      <section className="section bg-cream-50">
        <div className="container-wide">
          <SectionHeading
            eyebrowLeft="Industry-Specific"
            eyebrowPill="Expertise for Your Business"
            title="Skilled Professionals, Tailored to Your Needs"
            lead="Our remote staffing solutions provide specialized talent across various industries, ensuring a perfect fit for your business requirements:"
          />

          <div className="mt-14 grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                title: 'Real Estate & Property Management',
                body:
                  'Real Estate & Property Management Property Managers, Listing Managers, Tenant Support Specialists, Work Order Coordinators, Collections Experts.',
                image: assets.industryRealEstate,
              },
              {
                title: 'E-Commerce & Amazon',
                body:
                  'Product Listers, SEO Specialists, Customer Support, Product Sourcing Experts, Data Entry Assistants.',
                image: assets.industryEcommerce,
              },
              {
                title: 'Healthcare',
                body:
                  'Medical Billing Specialists, Accounts Receivable/Payable Experts, Patient Support Coordinators, Collections Specialists.',
                image: assets.industryHealthcare,
              },
              {
                title: 'IT & Technical Support',
                body:
                  'Helpdesk Technicians, IT Support Experts, Order Processing Assistants, Data Entry Specialists.',
                image: assets.industryIT,
              },
            ].map((c) => (
              <article
                key={c.title}
                className="relative bg-white rounded-xl shadow-card overflow-hidden pb-1.5"
              >
                <div className="grid grid-cols-5 items-stretch">
                  <div className="col-span-3 p-6 lg:p-7">
                    <h3 className="font-display font-bold text-lg lg:text-xl text-ink-900">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">{c.body}</p>
                  </div>
                  <div className="col-span-2 relative">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="(max-width: 768px) 40vw, 220px"
                      className="object-cover"
                      style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}
                      unoptimized
                    />
                  </div>
                </div>
                <span className="accent-bar" />
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/industries" className="btn-primary">
              Discover More
            </Link>
          </div>
        </div>
      </section>

      {/* ===== How PayLow Builds Your Ideal Team ===== */}
      <section className="section bg-white relative overflow-hidden">
        <span aria-hidden="true" className="watermark top-20 -right-12 opacity-30">
          P
        </span>
        <div className="container-wide relative">
          <SectionHeading
            eyebrowLeft="Hire"
            eyebrowPill="Ideal Staff"
            title="How PayLow Builds Your Ideal Team"
            lead="Our thorough hiring process ensures that every team member is a perfect fit, giving you the highest level of value from day one."
          />

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Discovery', body: 'We start by understanding your unique requirements and objectives.', icon: assets.iconDiscovery },
              { title: 'Talent Acquisition', body: 'Our team finds candidates with the right skills to match your needs precisely.', icon: assets.iconTalent },
              { title: 'Evaluation', body: 'Each candidate undergoes detailed screening to guarantee top-quality staffing.', icon: assets.iconEvaluation },
              { title: 'Interviews', body: 'You get the final say by interviewing our shortlisted candidates to confirm the right match.', icon: assets.iconInterview },
              { title: 'Onboarding', body: 'We prepare your new hire for success with onboarding and an introduction to our culture.', icon: assets.iconOnboarding },
              { title: 'Continuous Training', body: 'Our team provides additional training to equip employees with essential tools and workflows.', icon: assets.iconTraining },
            ].map((step) => (
              <article
                key={step.title}
                className="card p-7 text-center hover:shadow-soft transition-shadow"
              >
                <div className="inline-flex w-16 h-16 items-center justify-center rounded-md bg-brand-50">
                  <Image
                    src={step.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="w-10 h-10 object-contain"
                    unoptimized
                  />
                </div>
                <h3 className="mt-5 font-display font-bold text-lg text-ink-900">{step.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why PayLow — orange-bordered features box ===== */}
      <section className="section bg-cream-50 relative overflow-hidden">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative max-w-md mx-auto lg:mx-0 w-full">
            <span
              aria-hidden="true"
              className="absolute -top-4 -left-4 w-32 h-32 rounded-2xl bg-cream-200 -z-10"
            />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={assets.whyImage}
                alt="PayLow team collaborating"
                fill
                sizes="(max-width: 1024px) 80vw, 480px"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          <div>
            <div className="eyebrow-row">
              <span className="font-display font-semibold text-ink-900">About</span>
              <span className="pill">PayLow</span>
            </div>
            <h2 className="h-display text-balance">Why PayLow?</h2>
            <p className="mt-5 text-slate-700 leading-relaxed">
              Running a business isn&apos;t easy. Finding reliable, qualified employees? Even
              harder. Keeping them engaged while managing costs? Nearly impossible.
            </p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              PayLow changes the game with experienced offshore professionals committed to your
              success, so you can focus on what you do best.
            </p>
            <div className="mt-7">
              <Link href="/contact-us" className="btn-primary">
                Contact Us
              </Link>
            </div>

            {/* Orange-bordered feature box */}
            <div className="mt-8 bg-brand-600 rounded-xl p-2">
              <div className="bg-cream-50 rounded-lg p-5 sm:p-7 space-y-5">
                {[
                  {
                    title: 'Skill-Centric Recruitment',
                    body: 'Carefully chosen talent for the perfect skill match and heightened productivity.',
                    icon: assets.iconSkillCentric,
                  },
                  {
                    title: 'Employee Empowerment',
                    body: 'Dedicated to a culture of growth and positivity, ensuring your team feels valued and supported.',
                    icon: assets.iconGuided,
                  },
                  {
                    title: 'Guided Solutions',
                    body: 'A framework that includes proactive support to navigate challenges, sustaining team productivity and morale.',
                    icon: assets.iconEmpower,
                  },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="shrink-0 inline-flex w-12 h-12 items-center justify-center rounded-md bg-brand-100">
                      <Image
                        src={f.icon}
                        alt=""
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-ink-900">{f.title}</h3>
                      <p className="mt-1 text-slate-600 text-sm leading-relaxed">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Benefits — 4 (then 2) columns ===== */}
      <section className="section bg-white relative overflow-hidden">
        <span aria-hidden="true" className="watermark -bottom-20 -left-12 opacity-30">
          P
        </span>
        <div className="container-wide relative">
          <SectionHeading
            eyebrowLeft="Our"
            eyebrowPill="Benefits"
            title="The Benefits Of Choosing PayLow"
            lead="Hire with confidence! Our remote staff speak and write professional English and have great communication skills."
          />

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-6">
            {[
              { title: 'Cost Savings', body: 'Benefit from lower wages, reduced taxes, and no facility expenses without sacrificing quality.', icon: assets.iconCost },
              { title: 'Around-the-Clock Support', body: 'Long-hour availability ensures smooth coverage across all time zones.', icon: assets.iconSupport },
              { title: 'Engaged and Positive Teams', body: 'Our team members bring energy and passion to every task, becoming an integral part of your team.', icon: assets.iconPositive },
              { title: 'Flexible Scheduling', body: 'Employees can work overtime when needed, reducing conflicts and boosting productivity.', icon: assets.iconFlexible },
              { title: 'Adaptability for Your Needs', body: 'Scale up or down to align with business growth or seasonal demands.', icon: assets.iconAdapt },
              { title: 'No Lock-In Contracts', body: 'With flexible agreements, you stay in control—no long-term commitments required.', icon: assets.iconNoLockIn },
            ].map((b) => (
              <article key={b.title} className="text-left">
                <div className="inline-flex w-14 h-14 items-center justify-center rounded-md bg-brand-50 mb-4">
                  <Image
                    src={b.icon}
                    alt=""
                    width={36}
                    height={36}
                    className="w-9 h-9 object-contain"
                    unoptimized
                  />
                </div>
                <h3 className="font-display font-bold text-lg text-ink-900">{b.title}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="section bg-cream-50">
        <div className="container-wide">
          <SectionHeading
            eyebrowLeft="Our Testimonials"
            eyebrowPill="PayLow"
            title="The Success Stories Of Our Clients"
            lead="Discover how our specialized remote staffing solutions have transformed businesses across industries, boosting productivity, customer satisfaction, and growth."
          />

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((t) => (
              <article key={t.name} className="card p-7 flex flex-col">
                <div className="flex items-center gap-1 text-brand-500 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 pt-5 border-t border-slate-100">
                  <div className="font-display font-bold text-brand-700">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/testimonials"
              className="text-brand-700 font-semibold inline-flex items-center gap-2 hover:text-brand-800"
            >
              See All Testimonials <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PayLow Advantage — cream bg with image + checks ===== */}
      <section className="section bg-white relative overflow-hidden">
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] max-w-lg mx-auto lg:mx-0 w-full">
            <span
              aria-hidden="true"
              className="absolute -top-5 -left-5 w-28 h-28 rounded-2xl bg-cream-200 -z-10"
            />
            <Image
              src={assets.advantageImage}
              alt="PayLow Advantage"
              fill
              sizes="(max-width: 1024px) 80vw, 480px"
              className="object-cover rounded-2xl"
              unoptimized
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-5 -right-5 w-28 h-28 rounded-2xl bg-cream-200 -z-10"
            />
          </div>
          <div>
            <div className="eyebrow-row">
              <span className="font-display font-semibold text-ink-900">Why Choose</span>
              <span className="pill">PayLow</span>
            </div>
            <h2 className="h-display text-balance">The PayLow Advantage</h2>
            <p className="mt-5 text-slate-700 leading-relaxed">
              In a crowded staffing industry, PayLow rises above by handpicking skilled remote
              professionals who seamlessly integrate into your business and deliver long-term
              value.
            </p>

            <h3 className="mt-8 font-display font-bold text-xl text-ink-900">
              True Talent, Not Temporary Fixes
            </h3>
            <p className="mt-2 text-slate-700 text-sm leading-relaxed">
              While other agencies may just fill seats, we&apos;re committed to building a team
              that drives your business forward. Offshore doesn&apos;t mean out of touch—with
              PayLow, you get the best talent without compromising quality.
            </p>
            <ul className="mt-6 space-y-3">
              <CheckBullet>Highly Educated And Experienced.</CheckBullet>
              <CheckBullet>Skillfully Matched For Optimal Results.</CheckBullet>
              <CheckBullet>Fluent In English And Clear, Professional Interactions.</CheckBullet>
            </ul>
            <div className="mt-7">
              <Link href={siteConfig.signUpUrl} className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Pricing teaser ===== */}
      <section className="section bg-cream-50">
        <div className="container-wide">
          <SectionHeading eyebrowLeft="Our" eyebrowPill="Pricing" title="Our Unbeatable Pricing" />
          <div className="mt-10 max-w-3xl mx-auto text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-display font-bold text-ink-900">$</span>
              <span className="text-7xl md:text-8xl font-display font-bold text-brand-600 leading-none">
                7
              </span>
              <span className="text-2xl font-display font-semibold text-ink-900 self-end pb-2">/hour</span>
            </div>
            <p className="mt-4 text-slate-700">High-skilled roles may be slightly higher.</p>
            <div className="mt-8">
              <Link href="/pricing" className="btn-primary">
                See Full Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
