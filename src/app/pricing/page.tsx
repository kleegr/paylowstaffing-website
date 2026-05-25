import Image from 'next/image';
import type { Metadata } from 'next';
import { FileText, UserCheck, CalendarCheck, ShieldCheck } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import PricingCalculator from '@/components/PricingCalculator';
import CtaBanner from '@/components/CtaBanner';
import { assets } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'PayLow Staffing starts at $7 per hour. Use our interactive cost calculator to compare onshore vs offshore rates and see how much you can save.',
};

const planSteps = [
  {
    title: 'Choose Your Plan',
    body:
      'Pick the plan that fits your needs, whether it’s part-time support or a full team of specialists. Our flexible options make scaling up or down effortless.',
    Icon: FileText,
  },
  {
    title: 'Meet Your Assistant',
    body:
      'Get matched with a carefully selected assistant whose skills and experience align with your industry. Paylow ensures every professional is ready to integrate smoothly into your workflow.',
    Icon: UserCheck,
  },
  {
    title: 'Schedule Meeting',
    body:
      'Align your goals and expectations in a kickoff meeting where your assistant learns the ins and outs of your processes. This setup ensures immediate productivity and seamless collaboration.',
    Icon: CalendarCheck,
  },
  {
    title: 'A Sigh of Relief',
    body:
      'With your new team member ready to go, you can focus on growth while we handle the rest. Enjoy reliable support without the HR headache.',
    Icon: ShieldCheck,
  },
];

export default function PricingPage() {
  return (
    <>
      {/* ===== Big $7 hero — cream bg, no page hero ===== */}
      <section className="bg-cream-50 pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="container-wide text-center max-w-3xl">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-ink-900">
            Let&rsquo;s Get Started
          </h1>
          <p className="mt-5 text-slate-700 leading-relaxed">
            Everything start at <strong>$7 an hour</strong>, get access to a wide range of skilled
            professionals ready to help your business grow. Whether you need support in
            administration, design, development, or more…!
          </p>
          <div className="mt-10 flex items-end justify-center gap-1 lg:gap-2">
            <span className="text-4xl md:text-5xl font-display font-bold text-ink-900 self-start mt-3">
              $
            </span>
            <span className="text-[8rem] md:text-[12rem] font-display font-black text-brand-600 leading-none">
              7
            </span>
            <span className="text-3xl md:text-4xl font-display font-semibold text-ink-900 self-end pb-3">
              /hour
            </span>
          </div>
          <p className="mt-4 text-slate-700">High-skilled roles may be slightly higher.</p>
        </div>
      </section>

      {/* ===== Flexible solutions split ===== */}
      <section className="section bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="h-display text-balance">
              Flexible, Affordable Staffing Solutions to Fit Your Needs
            </h2>
            <p className="mt-5 text-slate-700 leading-relaxed">
              At PayLow, we&apos;re dedicated to providing affordable, high-quality virtual
              assistant options with transparent pricing and dedicated support. No matter the
              size of your business, our plans are designed to fit your budget, with rates
              starting at just $7 per hour to help you build a high-performing team.
            </p>
          </div>
          <div className="relative max-w-md mx-auto w-full">
            <div className="relative bg-brand-600 rounded-[2rem] p-2 shadow-soft">
              <div className="relative aspect-[4/3] rounded-[1.7rem] overflow-hidden bg-white">
                <Image
                  src={assets.pricingImage}
                  alt="PayLow remote professional"
                  fill
                  sizes="(max-width: 1024px) 80vw, 480px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Calculator ===== */}
      <section className="section bg-white">
        <div className="container-wide max-w-5xl">
          <SectionHeading
            eyebrowLeft="Our"
            eyebrowPill="Pricing"
            title="Our Unbeatable Pricing"
            lead="Use the calculator below to compare onshore vs offshore costs across your team size and rate cadence."
          />
          <div className="mt-12">
            <PricingCalculator />
          </div>
        </div>
      </section>

      {/* ===== BLACK Here's How It Works section ===== */}
      <section className="bg-ink-900 py-20 lg:py-24 text-white">
        <div className="container-wide">
          <h2 className="h-display-light text-center mx-auto max-w-3xl text-balance">
            Here&rsquo;s How It Works
          </h2>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {planSteps.map((s) => (
              <article
                key={s.title}
                className="relative rounded-md bg-white text-ink-900 p-7 pb-8 overflow-hidden"
              >
                <div className="flex justify-center">
                  <div className="inline-flex w-14 h-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-soft">
                    <s.Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="mt-5 font-display font-bold text-lg text-center">{s.title}</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed text-center">{s.body}</p>
                <span className="absolute inset-x-0 bottom-0 h-1 bg-brand-600" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
