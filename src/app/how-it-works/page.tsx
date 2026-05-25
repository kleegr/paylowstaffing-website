import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ClipboardCheck, MessageSquare, Briefcase } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';
import { assets } from '@/lib/content';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'At PayLow, we make hiring skilled, committed remote staff a straightforward experience that enhances your business from day one.',
};

const processSteps = [
  {
    title: 'Select Your Preferences',
    body:
      'Choose the option that best suits your needs, whether you’re looking for part-time support or a full team of specialists. Our flexible options make it easy to adjust your staffing as your business grows.',
  },
  {
    title: 'Get Paired with Your Assistant',
    body:
      'We match you with a carefully selected assistant whose expertise aligns with your industry. PayLow ensures every professional is prepared to integrate smoothly into your workflow.',
  },
  {
    title: 'Kickoff Meeting',
    body:
      'In a startup meeting, you and your assistant align on goals and expectations. This session provides an overview of your processes, setting the stage for immediate productivity and smooth collaboration.',
  },
  {
    title: 'Focus on Growth',
    body:
      'With your new team member in place, you can concentrate on expanding your business while we handle the support. Enjoy reliable assistance without the hassle of HR management.',
  },
];

const applicationSteps = [
  {
    title: 'Comprehensive Screening',
    body:
      'Each candidate goes through a detailed screening to verify their skills, experience, and commitment, ensuring they are well-suited for the role.',
    Icon: ClipboardCheck,
  },
  {
    title: 'Client Interview',
    body:
      'Qualified candidates are introduced to clients for a direct interview, allowing both parties to confirm compatibility and set clear expectations.',
    Icon: MessageSquare,
  },
  {
    title: 'Job Offer Acceptance',
    body:
      'Once the interview process is complete, successful candidates receive an offer and officially become part of the client’s team. Start the journey today for a brighter future.',
    Icon: Briefcase,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero title="How It Works" bg={assets.howItWorksHeroBg} />

      {/* ===== Intro ===== */}
      <section className="section bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="h-display text-balance">Effortless Hiring Made Simple With PayLow</h2>
            <p className="mt-5 text-slate-700 leading-relaxed">
              At PayLow, we make hiring skilled, committed remote staff a straightforward
              experience that enhances your business from day one. As an offshore staffing
              agency, we connect you with top global talent that integrates smoothly into your
              team, providing reliable support to help you achieve your goals. Our approach
              emphasizes clarity and ease, enabling you to find the right match without the
              typical complications. With PayLow, you gain a strategic partner who understands
              your unique needs and offers a solution that is both efficient and affordable.
            </p>
            <div className="mt-7">
              <Link href="/about-us" className="btn-primary">
                About Us
              </Link>
            </div>
          </div>
          <div className="relative max-w-md mx-auto w-full">
            <div className="relative bg-brand-600 rounded-[2rem] p-2 shadow-soft">
              <div className="relative aspect-[4/3] rounded-[1.7rem] overflow-hidden bg-white">
                <Image
                  src={assets.howIntro}
                  alt="PayLow professional shaking hands"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Process steps ===== */}
      <section className="section bg-cream-50">
        <div className="container-wide">
          <SectionHeading title="How the Process Works" />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((s, i) => (
              <article
                key={s.title}
                className="relative bg-white rounded-md shadow-card overflow-hidden p-7 pt-12"
              >
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 inline-flex w-14 h-14 items-center justify-center rounded-full bg-brand-600 text-white font-display font-bold text-xl shadow-soft">
                  {i + 1}
                </span>
                <h3 className="font-display font-bold text-lg text-ink-900 text-center">
                  {s.title}
                </h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed text-center">{s.body}</p>
                <span className="absolute inset-x-0 bottom-0 h-1 bg-brand-600 rounded-b-md" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Video placeholder ===== */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="rounded-xl overflow-hidden shadow-card bg-slate-100 aspect-video max-w-4xl mx-auto">
            <video
              controls
              preload="metadata"
              className="w-full h-full"
              poster={assets.howIntro}
            >
              <source
                src="https://paylowstaffing.com/wp-content/uploads/2024/11/D003-1.mp4"
                type="video/mp4"
              />
              Your browser does not support HTML5 video.
            </video>
          </div>
        </div>
      </section>

      {/* ===== Application process ===== */}
      <section className="section bg-cream-50">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-start">
          <div className="grid grid-cols-2 gap-5 max-w-md mx-auto w-full">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image src={assets.howApply1} alt="" fill className="object-cover" sizes="240px" unoptimized />
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden translate-y-10">
              <Image src={assets.howApply2} alt="" fill className="object-cover" sizes="240px" unoptimized />
            </div>
          </div>

          <div>
            <h2 className="h-display text-balance">Application Process</h2>
            <div className="mt-10 space-y-4">
              {applicationSteps.map((s) => (
                <article key={s.title} className="card p-6 flex gap-5 items-start">
                  <div className="shrink-0 inline-flex w-12 h-12 items-center justify-center rounded-md bg-brand-600 text-white">
                    <s.Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-ink-900">{s.title}</h3>
                    <p className="mt-2 text-slate-600 leading-relaxed text-sm">{s.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
