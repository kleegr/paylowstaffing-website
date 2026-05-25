import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ThumbsUp, Users, Globe2, Diamond, Headphones, Folder } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import CheckBullet from '@/components/CheckBullet';
import CtaBanner from '@/components/CtaBanner';
import { assets } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'PayLow Staffing was founded by Nathan to bridge the gap between businesses and skilled offshore professionals, offering a flexible, efficient staffing model.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" bg={assets.aboutHeroBg} />

      {/* ===== Story ===== */}
      <section className="section bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          {/* Photo collage */}
          <div className="relative max-w-md mx-auto lg:mx-0 grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={assets.about01}
                alt="PayLow recruiter"
                fill
                className="object-cover"
                sizes="280px"
                unoptimized
              />
            </div>
            <div className="space-y-3 mt-8">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src={assets.about02} alt="" fill className="object-cover" sizes="240px" unoptimized />
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={assets.aboutRecruiter}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="240px"
                  unoptimized
                />
              </div>
            </div>
            <span
              aria-hidden="true"
              className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-brand-100 -z-10"
            />
          </div>

          <div>
            <h2 className="h-display text-balance">Bringing Dreams and Ambitions to Life</h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                At Paylow Staffing, our journey began within the walls of a large bookkeeping
                company. As the business grew, so did the need for reliable, skilled support.
                However, finding local employees who could deliver quality work at a sustainable
                cost quickly became a significant challenge. The high cost of hiring locally was
                straining the business, forcing us to reconsider how we approached staffing.
              </p>
              <p>
                This struggle was a turning point for our CEO, Nathan. Determined to find a
                solution, Nathan explored alternative staffing options and discovered the
                incredible talent available offshore. With this new perspective, he saw an
                opportunity to not only help his own business but also to create a staffing
                model that could benefit other companies facing similar challenges.
              </p>
              <p>
                Driven by his firsthand experience, Nathan launched Paylow Staffing to bridge
                the gap between businesses and skilled professionals worldwide. Today, we&apos;re
                proud to offer a flexible, efficient staffing model that allows companies to
                grow sustainably while ensuring talented professionals can find rewarding work
                from anywhere.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/contact-us" className="btn-primary">
                Hire Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Mission + stats (BLACK section with one ORANGE highlight card) ===== */}
      <section className="relative bg-ink-900 text-white py-20 lg:py-24 overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute top-0 right-12 w-16 h-32 opacity-80"
          style={{
            background:
              'linear-gradient(180deg, #F26C2A 0%, transparent 100%)',
            clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
          }}
        />
        <div className="relative container-wide grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="h-display-light text-balance">
              Empowering Your Success with Exceptional Talent
            </h2>
            <p className="mt-6 text-white/80 leading-relaxed">
              Our mission is straightforward yet powerful: to support businesses of all sizes in
              achieving their full potential by connecting them with dedicated, expertly matched
              remote professionals. Through flexible and cost-effective staffing solutions, we
              strive to boost your team&apos;s productivity, adaptability, and growth, one
              strategic hire at a time.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <StatCard stat="3K+" label="Jobs Done" Icon={ThumbsUp} />
            <StatCard stat="78+" label="Jobs For Countries" Icon={Users} />
            <StatCard stat="12K+" label="Company Jobs" Icon={Globe2} highlight />
          </div>
        </div>
      </section>

      {/* ===== Benefits cards ===== */}
      <section className="section bg-cream-50">
        <div className="container-wide">
          <SectionHeading title="Our Benefits: Going Beyond Traditional Staffing" />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Exceptional Talent',
                body:
                  'Access a pool of highly skilled, experienced professionals at a fraction of the cost of traditional in-house hires. Scale your team seamlessly while maintaining top-tier quality.',
                Icon: Diamond,
              },
              {
                title: 'Reliable Support',
                body:
                  'Our remote professionals offer extended availability across multiple time zones, so your operations continue smoothly without time-zone constraints.',
                Icon: Headphones,
              },
              {
                title: 'Dedicated Workforce',
                body:
                  'Our team members approach every task with enthusiasm and commitment, fostering a positive and dynamic work environment that supports your goals.',
                Icon: Folder,
              },
            ].map((b) => (
              <article key={b.title} className="card p-7">
                <div className="inline-flex w-12 h-12 items-center justify-center rounded-md bg-brand-600 text-white mb-5">
                  <b.Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-ink-900">{b.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Customized Hiring — list left, orange-bordered photo right ===== */}
      <section className="section bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="h-display text-balance">
              Customized Hiring to Fit Your Business Needs
            </h2>
            <p className="mt-5 text-slate-700 leading-relaxed">
              At PayLow, we follow a structured approach to find the ideal fit for your team. Our
              refined process is designed to understand your unique requirements and provide
              skilled professionals who integrate smoothly into your operations.
            </p>
            <ul className="mt-7 space-y-3.5">
              <CheckBullet>Gain insight into your company&apos;s goals and culture for an optimal match.</CheckBullet>
              <CheckBullet>Source top talent aligned with your specific needs and values.</CheckBullet>
              <CheckBullet>Conduct rigorous screening to ensure quality and compatibility.</CheckBullet>
              <CheckBullet>Present a shortlist of candidates for your final selection.</CheckBullet>
              <CheckBullet>Prepare new hires to be productive from day one.</CheckBullet>
              <CheckBullet>
                Conduct regular check-ins to keep your team engaged and aligned with your objectives.
              </CheckBullet>
            </ul>
          </div>
          <div className="relative max-w-md mx-auto w-full">
            {/* Orange-bordered rounded rectangle around photo */}
            <div className="relative bg-brand-600 rounded-[2rem] p-2 shadow-soft">
              <div className="relative aspect-[4/3] rounded-[1.7rem] overflow-hidden bg-white">
                <Image
                  src={assets.about03}
                  alt="PayLow recruiter consulting with a client"
                  fill
                  sizes="(max-width: 1024px) 80vw, 400px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

function StatCard({
  stat,
  label,
  Icon,
  highlight = false,
}: {
  stat: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? 'rounded-md p-5 sm:p-6 bg-brand-600 text-white shadow-soft'
          : 'rounded-md p-5 sm:p-6 bg-ink-800 text-white border border-white/10'
      }
    >
      <Icon className={highlight ? 'w-7 h-7 text-white mb-3' : 'w-7 h-7 text-brand-500 mb-3'} />
      <div className="font-display font-bold text-3xl sm:text-4xl">{stat}</div>
      <div className={highlight ? 'mt-1 text-sm text-white/90' : 'mt-1 text-sm text-white/70'}>
        {label}
      </div>
    </div>
  );
}
