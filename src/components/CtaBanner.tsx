import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import GetStartedButton from './GetStartedButton';
import { siteConfig } from '@/lib/content';

export default function CtaBanner() {
  return (
    <section className="section">
      <div className="container-wide">
        <div
          className="relative overflow-hidden rounded-4xl bg-ink-900 text-white p-8 sm:p-12 lg:p-14 shadow-lift noise noise-strong"
          data-reveal
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-50 bg-mesh-2 mix-blend-screen"
          />
          <div
            aria-hidden
            className="absolute -top-20 -right-10 w-72 h-72 rounded-full bg-gradient-brand opacity-30 blur-3xl"
          />

          <div className="relative grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/80 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                Ready when you are
              </p>
              <h2 className="display-2 text-white">
                Ready to find{' '}
                <span className="text-gradient">your match?</span>
              </h2>
              <p className="lead mt-4 text-white/75 max-w-xl">
                Tell us the role. We&rsquo;ll have a shortlist on your desk this week.
              </p>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-3 lg:items-end">
              <GetStartedButton size="lg" className="w-full lg:w-auto justify-center">
                Find my match <ArrowRight className="w-4 h-4" />
              </GetStartedButton>
              <Link
                href={`tel:${siteConfig.contact.phoneTel}`}
                className="btn-outline btn-lg w-full lg:w-auto justify-center bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/30"
              >
                <Phone className="w-4 h-4" /> {siteConfig.contact.phone}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
