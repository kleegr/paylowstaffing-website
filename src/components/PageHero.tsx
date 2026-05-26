import { ReactNode } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

/**
 * Inner-page hero.
 *
 * Two visual modes:
 *   - text-only: warm gradient backdrop + decorative orb. Use for content-
 *     heavy pages where the photo would compete (FAQ, Pricing top).
 *   - bgImage:  premium portrait composed on the right (lg+) with brand orbs
 *     and a soft tonal overlay. Use whenever the page would otherwise feel
 *     empty above the fold. Photo is rendered `priority` since it's the
 *     first paint above the fold.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  compact = false,
  bgImage,
  imageAlt = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
  bgImage?: string;
  imageAlt?: string;
}) {
  const padding = compact
    ? 'pt-20 pb-14 lg:pt-24 lg:pb-20'
    : 'pt-24 pb-20 lg:pt-32 lg:pb-24';

  const Copy = (
    <>
      {eyebrow && (
        <p className="mb-5">
          <span className="eyebrow"><span className="eyebrow-dot" /> {eyebrow}</span>
        </p>
      )}
      <h1 id="page-hero-title" className="display-1">{title}</h1>
      {lead && <p className="lead mt-6 max-w-2xl">{lead}</p>}
      {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}
    </>
  );

  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="page-hero-title">
      {/* Backdrops */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-warm" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-1 opacity-90" />
      <div aria-hidden className="absolute inset-0 -z-10 grid-backdrop opacity-50" />
      <div aria-hidden className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gradient-brand opacity-15 blur-3xl animate-float-slow" />
      {bgImage && (
        <div
          aria-hidden
          className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] rounded-full bg-brand-300/25 blur-3xl animate-float-slow"
          style={{ animationDelay: '3s' }}
        />
      )}

      <div className={`container-wide ${padding}`}>
        {bgImage ? (
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7" data-reveal>{Copy}</div>
            <div className="lg:col-span-5 relative" data-reveal data-reveal-delay="180">
              <div className="relative max-w-[420px] mx-auto aspect-[4/5]">
                {/* Decorative brand orbs */}
                <div
                  aria-hidden
                  className="absolute -top-6 -right-6 w-36 h-36 rounded-full bg-gradient-brand opacity-30 blur-2xl -z-10"
                />
                <div
                  aria-hidden
                  className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full bg-brand-300 opacity-30 blur-2xl -z-10"
                />

                {/* Portrait */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-lift ring-1 ring-white/40">
                  <Image
                    src={bgImage}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 1024px) 80vw, 420px"
                    className="object-cover"
                    priority
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-900/25 via-transparent to-transparent"
                  />
                </div>

                <Sparkles
                  aria-hidden
                  className="absolute -top-2 right-6 w-5 h-5 text-brand-400 animate-pulse"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl" data-reveal>{Copy}</div>
        )}
      </div>
    </section>
  );
}
