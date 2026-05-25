import { ReactNode } from 'react';

/**
 * Modern page hero — gradient backdrop, big display title, optional lead + actions.
 * Replaces the old photo-banner-with-clip-wave look.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  actions,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="page-hero-title">
      {/* Background mesh */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-warm" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-2 opacity-90" />
      <div aria-hidden className="absolute inset-0 -z-10 grid-backdrop opacity-60" />

      {/* Floating orbs */}
      <div aria-hidden className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-gradient-brand opacity-20 blur-3xl animate-float-slow" />
      <div aria-hidden className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-accent-rose/20 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />

      <div className="container-wide pt-24 lg:pt-32 pb-20 lg:pb-28">
        <div className="max-w-3xl" data-reveal>
          {eyebrow && (
            <p className="mb-5">
              <span className="eyebrow"><span className="eyebrow-dot" /> {eyebrow}</span>
            </p>
          )}
          <h1 id="page-hero-title" className="display-1">{title}</h1>
          {lead && <p className="lead mt-6 max-w-2xl">{lead}</p>}
          {actions && <div className="mt-9 flex flex-wrap items-center gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  );
}
