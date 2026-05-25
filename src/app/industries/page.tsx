'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Cpu, Briefcase, ClipboardList, GraduationCap, Hammer, Headphones, Palette, Megaphone, Calculator, HeartPulse, Settings } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';
import { assets } from '@/lib/content';

const categories = [
  { title: 'IT & Tech', Icon: Cpu, image: assets.industryIT, sample: 'Web/mobile devs, QA, devops, support, AI engineers' },
  { title: 'Professional Services', Icon: Briefcase, image: assets.advantageImage, sample: 'PMs, ops, recruiting, legal support, BPO' },
  { title: 'Admin & Data', Icon: ClipboardList, image: assets.tFinancial, sample: 'EAs, data entry, transcription, document control' },
  { title: 'Education', Icon: GraduationCap, image: assets.aboutRecruiter, sample: 'Tutors, LMS admins, instructional design' },
  { title: 'Engineering', Icon: Hammer, image: assets.industryIT, sample: 'CAD, structural, electrical, technical writing' },
  { title: 'Customer Service', Icon: Headphones, image: assets.advantageImage, sample: 'CX reps, live chat, telemarketing, account mgmt' },
  { title: 'Creative & Design', Icon: Palette, image: assets.tAbout04, sample: 'UI/UX, graphic, animation, video editing' },
  { title: 'Marketing', Icon: Megaphone, image: assets.industryEcommerce, sample: 'SEO/SEM, social, content, email, analytics' },
  { title: 'Finance', Icon: Calculator, image: assets.tFinancial, sample: 'Bookkeeping, AP/AR, payroll, financial analysis' },
  { title: 'Healthcare', Icon: HeartPulse, image: assets.industryHealthcare, sample: 'Medical billing, claims, telehealth support' },
  { title: 'Specialized', Icon: Settings, image: assets.tColleagues, sample: 'Procurement, compliance, actuary, geology' },
];

const spotlights = [
  { title: 'IT & Tech', sub: 'Scale your engineering, fast.', body: 'Developers, support engineers, data analysts, and security pros to keep your platform humming around the clock.' },
  { title: 'Healthcare',  sub: 'Skilled staff for vital roles.',   body: 'From medical billing to telehealth coordinators, we recruit professionals who understand healthcare\u2019s unique demands.' },
  { title: 'Customer Service', sub: 'Always-on, empathy first.', body: 'Reps and helpdesk agents who bring patience and expertise to every interaction.' },
  { title: 'Finance',          sub: 'Precision-driven talent.',   body: 'Accountants, bookkeepers, and financial analysts trained in compliance and reporting standards.' },
];

export default function IndustriesPage() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Skilled professionals for every <span className="text-gradient">industry.</span></>}
        lead="Pre-vetted offshore talent across the roles your team actually needs."
        actions={<Link href="/contact-us" className="btn-primary">Talk to us <ArrowRight className="w-4 h-4" /></Link>}
      />

      {/* Quick-pick categories */}
      <section className="section bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Specialties"
            title={<>Find your <span className="text-gradient">perfect hire.</span></>}
            lead="Tap any category to see the most-requested roles we fill."
            align="center"
          />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-reveal>
            {categories.map((c, i) => {
              const isOpen = active === i;
              return (
                <button
                  key={c.title}
                  onClick={() => setActive(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className={`group relative overflow-hidden rounded-3xl text-left transition-all duration-500 ease-out-expo ${
                    isOpen ? 'shadow-lift ring-2 ring-brand-500' : 'shadow-card hover:shadow-lift hover:-translate-y-1'
                  }`}
                >
                  <div className="relative aspect-[5/4]">
                    <Image src={c.image} alt={c.title} fill sizes="(max-width: 768px) 100vw, 25vw" className={`object-cover transition-transform duration-700 ease-out-expo ${isOpen ? 'scale-105' : 'group-hover:scale-110'}`} unoptimized />
                    <div aria-hidden className={`absolute inset-0 transition-opacity duration-500 ${isOpen ? 'bg-gradient-to-t from-brand-900/85 via-brand-700/40 to-transparent' : 'bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent'}`} />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <c.Icon className="w-6 h-6 mb-2 text-brand-300" />
                      <h3 className="font-display font-bold text-lg">{c.title}</h3>
                      <p className={`text-xs text-white/75 mt-1 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        {c.sample}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Spotlights */}
      <section className="section bg-ink-50/50 relative">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-30" />
        <div className="container-wide relative">
          <SectionHeading
            eyebrow="Where we shine"
            title={<>Industries we know <span className="text-gradient">inside-out.</span></>}
            align="center"
          />
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {spotlights.map((s, i) => (
              <article key={s.title} className="card-hover p-8" data-reveal data-reveal-delay={i * 80}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="display-3">{s.title}</h3>
                  <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-gradient-brand text-white">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-brand-700 font-medium text-sm">{s.sub}</p>
                <p className="mt-3 text-ink-500 leading-relaxed text-sm">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
