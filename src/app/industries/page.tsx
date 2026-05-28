'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowRight, Cpu, Briefcase, ClipboardList, GraduationCap, Hammer,
  Headphones, Palette, Megaphone, Calculator, HeartPulse, Settings, Check,
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
  roles: string[];
};

const categories: Category[] = [
  { title: 'IT & Tech',             Icon: Cpu,           image: assets.industryIT,              sample: 'Engineers who ship.',            roles: ['Developers', 'QA', 'DevOps', 'AI engineers'] },
  { title: 'Professional Services', Icon: Briefcase,     image: assets.industryServices,        sample: 'The backbone of operations.',    roles: ['Project managers', 'Ops', 'Recruiting', 'Legal support'] },
  { title: 'Admin & Data',          Icon: ClipboardList, image: assets.industryAdmin,           sample: 'Keep everything moving.',        roles: ['Executive assistants', 'Data entry', 'Transcription'] },
  { title: 'Education',             Icon: GraduationCap, image: assets.industryEducation,       sample: 'Teach, build, support.',         roles: ['Tutors', 'LMS admins', 'Instructional designers'] },
  { title: 'Engineering',           Icon: Hammer,        image: assets.industryEngineering,     sample: 'Technical, precise, reliable.',  roles: ['CAD', 'Structural', 'Electrical', 'Tech writing'] },
  { title: 'Customer Service',      Icon: Headphones,    image: assets.industryCustomerService, sample: 'Your front line.',               roles: ['CX reps', 'Live chat', 'Telesupport'] },
  { title: 'Creative & Design',     Icon: Palette,       image: assets.industryCreative,        sample: 'Make it look the part.',         roles: ['UI/UX', 'Graphic', 'Animation', 'Video'] },
  { title: 'Marketing',             Icon: Megaphone,     image: assets.industryMarketing,       sample: 'Growth, end to end.',            roles: ['SEO', 'Social', 'Content', 'Email', 'Analytics'] },
  { title: 'Finance',               Icon: Calculator,    image: assets.industryFinance,         sample: 'Numbers you can trust.',         roles: ['Bookkeeping', 'AP/AR', 'Payroll', 'FP&A'] },
  { title: 'Healthcare',            Icon: HeartPulse,    image: assets.industryHealthcare,      sample: 'Compliant, careful support.',    roles: ['Medical billing', 'Claims', 'Telehealth'] },
  { title: 'Specialized',           Icon: Settings,      image: null,                           sample: 'Hard-to-fill, handled.',         roles: ['Procurement', 'Compliance', 'Actuarial'] },
];

export default function IndustriesPage() {
  // First card open by default so the pattern is obvious. On mobile every
  // card's roles are ALWAYS visible regardless of open state (no hover
  // dependency) — opening just adds a highlight + on larger screens reveals
  // the photo accent.
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
            lead="Tap a category to see the roles we fill."
            align="center"
          />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {categories.map((c, i) => {
              const isOpen = active === i;
              return (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => setActive(isOpen ? i : i)}
                  aria-expanded={isOpen}
                  className={`group text-left rounded-3xl border bg-white p-5 sm:p-6 transition-all duration-300 ease-out ${
                    isOpen
                      ? 'border-brand-300 shadow-lift ring-1 ring-brand-200'
                      : 'border-ink-100 shadow-card hover:border-ink-200 hover:shadow-lift hover:-translate-y-0.5'
                  }`}
                >
                  {/* Header row — icon + title, always high-contrast (dark text
                      on white), never text-over-photo. */}
                  <div className="flex items-center gap-3.5">
                    <span
                      aria-hidden="true"
                      className={`inline-flex w-11 h-11 items-center justify-center rounded-2xl shrink-0 transition-colors duration-300 ${
                        isOpen
                          ? 'bg-gradient-brand text-white shadow-glow-sm'
                          : 'bg-brand-50 text-brand-700 group-hover:bg-gradient-brand group-hover:text-white'
                      }`}
                    >
                      <c.Icon className="w-5 h-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display font-bold text-ink-900 text-base sm:text-lg leading-tight" style={{ letterSpacing: '-0.018em' }}>
                        {c.title}
                      </h3>
                      <p className="text-[13px] text-ink-500 mt-0.5 leading-snug">{c.sample}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`inline-flex w-7 h-7 items-center justify-center rounded-full shrink-0 transition-all duration-300 ${
                        isOpen ? 'bg-brand-500 text-white rotate-90' : 'bg-ink-50 text-ink-400 group-hover:bg-ink-100'
                      }`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Roles — always visible. Readable chips, no hover needed,
                      so this works perfectly on touch devices. */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.roles.map((r) => (
                      <span
                        key={r}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-medium transition-colors duration-300 ${
                          isOpen
                            ? 'bg-brand-50 text-brand-700 border border-brand-100'
                            : 'bg-ink-50 text-ink-600 border border-transparent'
                        }`}
                      >
                        {isOpen && <Check className="w-3 h-3" />}
                        {r}
                      </span>
                    ))}
                  </div>

                  {/* Photo accent — only when open, and only from sm up. Kept
                      OUT of the mobile flow so small screens stay compact and
                      text-led (image dominance reduced per brief). */}
                  {c.image && (
                    <div
                      className={`hidden sm:block overflow-hidden rounded-2xl transition-all duration-500 ease-out ${
                        isOpen ? 'mt-5 max-h-44 opacity-100' : 'mt-0 max-h-0 opacity-0'
                      }`}
                    >
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={c.image}
                          alt={c.title}
                          fill
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                          loading="lazy"
                        />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />
                      </div>
                    </div>
                  )}
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
