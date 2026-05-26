'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Cpu, Briefcase, ClipboardList, GraduationCap, Hammer, Headphones, Palette, Megaphone, Calculator, HeartPulse, Settings } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import GetStartedButton from '@/components/GetStartedButton';
import { assets } from '@/lib/content';

const categories = [
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
  { title: 'Specialized',           Icon: Settings,        image: assets.industrySpecialized,     sample: 'Procurement, compliance, actuarial.' },
];

export default function IndustriesPage() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Pros for every <span className="text-gradient">corner of your business.</span></>}
        lead="Pre-vetted remote talent across the roles your team actually needs."
        bgImage={assets.industriesHeroBg}
        imageAlt="A PayLow specialist"
        actions={<GetStartedButton>Find my match <ArrowRight className="w-4 h-4" /></GetStartedButton>}
      />

      <section className="section bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Specialties"
            title={<>Find your <span className="text-gradient">perfect hire.</span></>}
            lead="Tap any category. See the roles we fill."
            align="center"
          />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((c, i) => {
              const isOpen = active === i;
              return (
                <button
                  key={c.title}
                  onClick={() => setActive(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className={`group relative overflow-hidden rounded-3xl text-left transition-all duration-500 ease-out ${
                    isOpen ? 'shadow-lift ring-2 ring-brand-500' : 'shadow-card hover:shadow-lift hover:-translate-y-1'
                  }`}
                >
                  <div className="relative aspect-[5/4]">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className={`object-cover transition-transform duration-700 ease-out ${isOpen ? 'scale-105' : 'group-hover:scale-105'}`}
                      loading="lazy"
                    />
                    <div aria-hidden className={`absolute inset-0 transition-opacity duration-500 ${isOpen ? 'bg-gradient-to-t from-brand-900/85 via-brand-700/40 to-transparent' : 'bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent'}`} />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <c.Icon className="w-5 h-5 mb-2 text-brand-300" />
                      <h3 className="font-display font-bold text-base">{c.title}</h3>
                      <p className={`text-[11px] text-white/75 mt-1 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        {c.sample}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center" data-reveal>
            <GetStartedButton size="lg">Hire for your team <ArrowRight className="w-4 h-4" /></GetStartedButton>
          </div>
        </div>
      </section>
    </>
  );
}
