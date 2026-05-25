'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Cpu, Briefcase, Settings, ClipboardList, GraduationCap, Hammer, Headphones, Palette, Megaphone, Calculator, HeartPulse } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import CheckBullet from '@/components/CheckBullet';
import CtaBanner from '@/components/CtaBanner';
import { assets } from '@/lib/content';

const services = [
  {
    title: 'Information Technology (I.T)',
    Icon: Cpu,
    image: assets.industryIT,
    items: [
      'Web Development', 'Software Development', 'Programming', 'Mobile Application Development',
      'Game Development', 'Tech Support Engineer', 'Data Visualization', 'QA Testing',
      'Technical Consulting', 'Security Analysis', 'Network Engineering', 'Webmaster',
      'System/ Network Admin', 'Artificial Intelligence (AI) Developer',
      'Virtual Reality (VR) Developer', 'Augmented Reality (AR) Developer',
      'Software Engineer', 'Systems Analyst', 'Business Analyst',
    ],
  },
  {
    title: 'Managed & Professional Services',
    Icon: Briefcase,
    image: assets.industriesHero1,
    items: [
      'Managed Services', 'Professional Services', 'Project Management', 'Operations Management',
      'Legal', 'Recruitment', 'Performance Management', 'Consulting',
      'Knowledge Process Outsourcing', 'Business Process Analysis', 'Logistics Support',
      'Human Resources (HR)', 'Paralegal',
    ],
  },
  {
    title: 'Specialized Roles',
    Icon: Settings,
    image: assets.tColleagues,
    items: ['Geologist', 'Travel Advisor', 'Procurement Specialist', 'Actuary', 'Compliance Officer'],
  },
  {
    title: 'Administration & Data Processing',
    Icon: ClipboardList,
    image: assets.tFinancial,
    items: [
      'Admin & Data Processing', 'Data Entry', 'Data Processing', 'Virtual Assistance',
      'Transcription', 'Website Support', 'Procurement', 'Secretarial', 'Personal Assistance',
      'Administrative Support', 'Real Estate Support', 'E-Commerce Admin',
      'Executive Assistance', 'Document Controller', 'Administrative Assistant',
    ],
  },
  {
    title: 'Education',
    Icon: GraduationCap,
    image: assets.aboutRecruiter,
    items: [
      'Educational Technologist', 'Academic Marker', 'LMS Administrator',
      'Student Administrative Officer', 'E-Learning Specialist', 'English Teacher',
      'Online Tutor', 'Teaching Assistant',
    ],
  },
  {
    title: 'Engineering',
    Icon: Hammer,
    image: assets.industryIT,
    items: [
      'AutoCAD', 'Electrical Engineer', 'Civil Engineer', 'Architecture',
      'Industrial Engineer', 'Structural Drafter', 'Technical Writer',
      'Quantity Surveyor', 'Quality Engineer', 'Structural Engineer',
    ],
  },
  {
    title: 'Contact Center & Customer Service',
    Icon: Headphones,
    image: assets.advantageImage,
    items: [
      'Customer Service Staff', 'Live Chat Support', 'Telemarketing', 'Technical Support',
      'Upsell & Cross-sell', 'Collections', 'Data Cleansing & Validation', 'Lead Generation',
      'Customer Acquisition', 'Customer Retention', 'Account Management', 'Telesales',
      'Call Center Services', 'Customer Care', 'Help Desk', 'E-Commerce Support',
      'Reservation Agent',
    ],
  },
  {
    title: 'Creative',
    Icon: Palette,
    image: assets.tAbout04,
    items: [
      'Web Design', 'Graphic Design', 'Proofreading', 'Creative Marketing',
      'Game Moderation', 'Photo Editing', 'Industrial Design', 'UX Design',
      '3D Modeling', 'Animation', 'Storyboard Art',
    ],
  },
  {
    title: 'Marketing',
    Icon: Megaphone,
    image: assets.industryEcommerce,
    items: [
      'Digital Marketing', 'Search Engine Optimization (SEO)',
      'Search Engine Marketing (SEM)', 'Social Media Marketing', 'Content Moderation',
      'Media Planning and Buying', 'Marketing Analysis', 'Data Analysis',
      'Content Marketing', 'Email Marketing', 'Visual Merchandising',
    ],
  },
  {
    title: 'Financial Services',
    Icon: Calculator,
    image: assets.tFinancial,
    items: [
      'Accounting', 'Bookkeeping', 'Financial Advice', 'Accounts Payable',
      'Accounts Receivable', 'Payroll Processing', 'Financial Analysis', 'Debt Collection',
      'Underwriting', 'Loan Processing', 'Paraplanning', 'Claims Processing',
      'Mortgage Specialist', 'Insurance Broker', 'Auditor',
    ],
  },
  {
    title: 'Healthcare',
    Icon: HeartPulse,
    image: assets.industryHealthcare,
    items: [
      'Medical Encoding', 'Clinical Abstracting', 'Medical Billing',
      'Medical Claims Administration',
    ],
  },
];

const featuredServices = [
  {
    title: 'IT & Technical Support',
    subtitle: 'Powering Innovation with Expert Talent',
    body:
      'In a fast-paced digital landscape, having a skilled technology team is crucial. We source experienced developers, IT support specialists, data analysts, and cybersecurity professionals to support your company’s growth. Our offshore talent solutions ensure that tech companies can scale quickly, maintain rigorous quality standards, and innovate seamlessly across time zones.',
  },
  {
    title: 'Healthcare & Medical Support',
    subtitle: 'Skilled Staff for Vital Roles',
    body:
      'Supporting healthcare providers with skilled offshore staff can make a real impact. From medical billing and coding to telehealth customer support and administrative services, our team recruits professionals who understand the unique demands of the healthcare industry. By partnering with us, healthcare providers can extend their services, streamline administrative tasks, and improve patient satisfaction.',
  },
  {
    title: 'Customer Service',
    subtitle: 'Exceptional Support Around the Clock',
    body:
      'Providing seamless customer service is critical to brand reputation and client satisfaction. We offer customer support representatives, technical support staff, and helpdesk agents who bring empathy, patience, and expertise to each customer interaction. With our cost-effective offshore solutions, your company can provide exceptional service around the clock.',
  },
  {
    title: 'Finance & Accounting',
    subtitle: 'Precision-Driven Financial Talent',
    body:
      'In finance, accuracy and expertise are paramount. Our finance and accounting talent includes accountants, financial analysts, bookkeepers, and payroll specialists who are trained in industry standards and compliance requirements. With our support, your company can maintain fiscal responsibility and gain insightful financial analysis without the overhead costs.',
  },
];

export default function IndustriesPage() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <>
      <PageHero title="Industries" bg={assets.industriesHeroBg} />

      {/* ===== Intro ===== */}
      <section className="section bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="h-display text-balance">Flexible Staffing Solutions Across Leading Industries</h2>
            <p className="mt-5 text-slate-700 leading-relaxed">
              Our offshore recruiting services bring skilled talent from around the world to
              meet the diverse needs of leading industries. With a unique understanding of
              global labor markets and industry-specific requirements, we help businesses access
              quality staff at affordable rates. Whether you&apos;re in technology, healthcare,
              finance, or customer service, we have the expertise to deliver high-caliber
              professionals tailored to your needs.
            </p>
            <div className="mt-8">
              <Link href="/contact-us" className="btn-primary">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 max-w-md mx-auto w-full">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image src={assets.industriesHero1} alt="" fill className="object-cover" sizes="240px" unoptimized />
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden translate-y-8">
              <Image src={assets.industriesHero2} alt="" fill className="object-cover" sizes="240px" unoptimized />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Services grid — image overlay cards ===== */}
      <section className="section bg-cream-50">
        <div className="container-wide">
          <SectionHeading
            title="Our Services"
            lead="We provide flexible, affordable staffing solutions designed to meet the unique needs of businesses across various industries."
          />

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {services.map((cat, i) => {
              const isOpen = expanded === i;
              return (
                <article
                  key={cat.title}
                  className="relative rounded-xl overflow-hidden shadow-card bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`svc-${i}`}
                    className="relative block w-full text-left aspect-[16/9] group"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <span className="img-card-overlay" />
                    <span className="absolute inset-0 flex items-center justify-center px-6">
                      <span className="text-white font-display font-bold text-xl sm:text-2xl text-center">
                        {cat.title}
                      </span>
                    </span>
                  </button>

                  {isOpen && (
                    <div id={`svc-${i}`} className="p-6 bg-white border-t border-cream-100">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm text-slate-700">
                        {cat.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-600 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <span className="block h-1 bg-brand-600" />
                </article>
              );
            })}
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">
            Click any category to see the full list of roles.
          </p>
        </div>
      </section>

      {/* ===== Featured services ===== */}
      <section className="section bg-white">
        <div className="container-wide">
          <SectionHeading
            title="Industry Spotlights"
            lead="A closer look at where PayLow staff most often deliver outsized impact."
          />
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {featuredServices.map((f) => (
              <article
                key={f.title}
                className="card p-7 lg:p-9 border-l-4 border-brand-600"
              >
                <h3 className="font-display font-bold text-2xl text-ink-900">{f.title}</h3>
                <div className="mt-1 text-brand-700 font-medium">{f.subtitle}</div>
                <p className="mt-4 text-slate-600 leading-relaxed text-sm">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PayLow Advantage ===== */}
      <section className="section bg-cream-50">
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative max-w-lg mx-auto lg:mx-0 w-full">
            <span
              aria-hidden="true"
              className="absolute -top-4 -left-4 w-32 h-32 rounded-2xl bg-cream-200 -z-10"
            />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={assets.industriesAdvantage}
                alt="PayLow Advantage"
                fill
                sizes="(max-width: 1024px) 80vw, 480px"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
          <div>
            <div className="eyebrow-row">
              <span className="font-display font-semibold text-ink-900">Why Choose</span>
              <span className="pill">PayLow</span>
            </div>
            <h2 className="h-display text-balance">The Paylow Advantage</h2>
            <p className="mt-5 text-slate-700 leading-relaxed">
              In a crowded staffing industry, Pay Low rises above by handpicking skilled remote
              professionals who seamlessly integrate into your business and deliver long-term
              value.
            </p>
            <h3 className="mt-8 font-display font-bold text-xl text-ink-900">
              True Talent, Not Temporary Fixes
            </h3>
            <p className="mt-2 text-slate-700 text-sm leading-relaxed">
              While other agencies may just fill seats, we&apos;re committed to building a team
              that drives your business forward. Offshore doesn&apos;t mean out of touch—with
              Pay Low, you get the best talent without compromising quality.
            </p>
            <ul className="mt-6 space-y-3">
              <CheckBullet>Highly Educated And Experienced.</CheckBullet>
              <CheckBullet>Skillfully Matched For Optimal Results.</CheckBullet>
              <CheckBullet>Fluent In English And Clear, Professional Interactions.</CheckBullet>
            </ul>
            <div className="mt-8">
              <Link href="/pricing" className="btn-primary">
                Calculate Your Savings
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
