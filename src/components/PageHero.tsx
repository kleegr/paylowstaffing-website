import { ReactNode } from 'react';

export default function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  compact = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="page-hero-title">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-warm" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-1 opacity-90" />
      <div aria-hidden className="absolute inset-0 -z-10 grid-backdrop opacity-50" />

      <div aria-hidden className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gradient-brand opacity-15 blur-3xl animate-float-slow" />

      <div className={`container-wide ${compact ? 'pt-20 pb-14 lg:pt-24 lg:pb-20' : 'pt-24 pb-20 lg:pt-32 lg:pb-24'}`}>
        <div className="max-w-3xl" data-reveal>
          {eyebrow && (
            <p className="mb-5">
              <span className="eyebrow"><span className="eyebrow-dot" /> {eyebrow}</span>
            </p>
          )}
          <h1 id="page-hero-title" className="display-1">{title}</h1>
          {lead && <p className="lead mt-6 max-w-2xl">{lead}</p>}
          {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  );
}
