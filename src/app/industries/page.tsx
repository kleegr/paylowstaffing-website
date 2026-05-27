'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowRight, Cpu, Briefcase, ClipboardList, GraduationCap, Hammer,
  Headphones, Palette, Megaphone, Calculator, HeartPulse, Settings,
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import GetStartedButton from '@/components/GetStartedButton';
import { assets } from '@/lib/content';

type Category = {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  image: string | null;
  sample: string;
};

const categories: Category[] = [
  { title: 'IT & Tech',             Icon: Cpu,             image: assets.industryIT,              sample: 'Devs, QA, devops, AI engineers.' },
  { title: 'Professional Services', Icon: Briefcase,       image: assets.industryServices,        sample: 'PMs, ops, recruiting, legal support.' },
  { title: 'Admin & Data',          Icon: ClipboardList,   image: assets.industryAdmin,           sample: 'EAs, data entry, transcription.' },
  { title: 'Education',             Icon: GraduationCap,   image: assets.industryEducation,       sample: 'Tutors, LMS admins, instructional designers.' },
  { title: 'Engineering',           Icon: Hammer,          image: assets.industryEngineering,     sample: 'CAD, structural, electrical, tech writing.' },
  { title: 'Customer Service',      Icon: Headphones,      image: assets.industryCustomerService, sample: 'CX reps, live chat, telesupport.' },
  { title: 'Creative & Design',     Icon: Palette,         image: assets.industryCreative,        sample: 'UI/UX, graphic, animation, video.' },
  { title: 'Marketing',             Icon: Megaphone,       image: assets.industryMarketing,       sample: 'SEO, social, content, email, analytics.' },
  { title: 'Finance',               Icon: Calculator,      image: assets.industryFinance,         sample: 'Bookkeeping, AP/AR, payroll, FP&A.' },
  { title: 'Healthcare',            Icon: HeartPulse,      image: assets.industryHealthcare,      sample: 'Medical billing, claims, telehealth.' },
  { title: 'Specialized',           Icon: Settings,        image: null,                            sample: 'Procurement, compliance, actuarial.' },
];

export default function IndustriesPage() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Pros for every <span className="text-gradient">corner of your business.</span></>}
        lead="Pre-vetted talent for every role your team needs."
        bgImage={assets.industriesHeroBg}
        imageAlt="A PayLow specialist"
        actions={<GetStartedButton>Find my match <ArrowRight className="w-4 h-4" /></GetStartedButton>}
      />

      <section className="section bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Specialties"
            title={<>Find your <span className="text-gradient">perfect hire.</span></>}
            lead="Tap a category. See what we fill."
            align="center"
          />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {categories.map((c, i) => {
              const isOpen = active === i;
              const hasImage = c.image !== null;

              return (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => setActive(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className={`group relative overflow-hidden rounded-3xl text-left transition-all duration-500 ease-out ${
                    isOpen ? 'shadow-lift ring-2 ring-brand-500 -translate-y-1' : 'shadow-card hover:shadow-lift hover:-translate-y-1'
                  }`}
                >
                  <div className="relative aspect-[5/4]">
                    {hasImage ? (
                      <>
                        <Image
                          src={c.image as string}
                          alt={c.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          className={`object-cover transition-transform duration-700 ease-out ${isOpen ? 'scale-110' : 'group-hover:scale-105'}`}
                          loading="lazy"
                        />
                        <div
                          aria-hidden
                          className={`absolute inset-0 transition-opacity duration-500 ${
                            isOpen
                              ? 'bg-gradient-to-t from-brand-900/95 via-brand-800/55 to-brand-600/10'
                              : 'bg-gradient-to-t from-ink-900/92 via-ink-900/55 to-ink-900/10'
                          }`}
                        />
                      </>
                    ) : (
                      <>
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-800 to-brand-700" />
                        <div aria-hidden className="absolute inset-0 bg-mesh-2 opacity-40 mix-blend-screen" />
                        <div aria-hidden className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-brand opacity-30 blur-3xl" />
                        <div aria-hidden className="absolute -bottom-12 -left-10 w-40 h-40 rounded-full bg-brand-400/20 blur-3xl" />
                      </>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="inline-flex w-9 h-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md border border-white/25 shadow-sm shrink-0"
                        >
                          <c.Icon className="w-4 h-4 text-white" />
                        </span>
                        <h3
                          className="font-display font-bold text-white text-base sm:text-lg leading-tight"
                          style={{ letterSpacing: '-0.018em' }}
                        >
                          {c.title}
                        </h3>
                      </div>

                      <p
                        className={`text-xs sm:text-[13px] text-white/90 mt-3 pl-12 leading-relaxed transition-all duration-500 ease-out ${
                          isOpen
                            ? 'opacity-100 translate-y-0 max-h-20'
                            : 'opacity-0 -translate-y-1 max-h-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-20'
                        }`}
                      >
                        {c.sample}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`absolute top-3 right-3 inline-flex w-8 h-8 items-center justify-center rounded-full backdrop-blur-md border transition-all duration-500 ${
                        isOpen ? 'bg-white text-brand-700 border-white rotate-45 shadow-glow-sm' : 'bg-white/15 text-white border-white/25 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center" data-reveal>
            <GetStartedButton size="lg">
              Find my match <ArrowRight className="w-4 h-4" />
            </GetStartedButton>
          </div>
        </div>
      </section>
    </>
  );
}
