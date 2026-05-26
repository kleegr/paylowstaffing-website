import Image from 'next/image';
import type { Metadata } from 'next';
import { Star, Quote, ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import GetStartedButton from '@/components/GetStartedButton';
import { assets, reviews, videoReviews } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Real stories from PayLow Staffing clients — photography, property management, real estate, IT, and more.',
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title={<>Real teams. <span className="text-gradient">Real results.</span></>}
        lead="Stories from PayLow clients across industries and time zones."
        bgImage={assets.testimonialsHeroBg}
        imageAlt="A PayLow client"
        compact
      />

      {/* Video reviews */}
      <section className="section bg-white">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Watch"
            title={<>In their <span className="text-gradient">own words.</span></>}
            align="center"
          />

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {videoReviews.map((v, i) => (
              <article
                key={v.youtubeId}
                className="card-hover overflow-hidden"
                data-reveal
                data-reveal-delay={i * 100}
              >
                <div className="aspect-video bg-ink-900 relative">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?rel=0&modestbranding=1`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-base text-ink-900">{v.title}</h3>
                  <p className="text-sm text-ink-500 mt-1">PayLow customer</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Written reviews — bento */}
      <section className="section bg-ink-50/50 relative">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-30" />
        <div className="container-wide relative">
          <SectionHeading
            eyebrow="Reviews"
            title={<>What clients are <span className="text-gradient">saying.</span></>}
            align="center"
          />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r, i) => {
              const featured = i === 0;
              const avatarSrc = assets[r.image as keyof typeof assets] as string;
              return (
                <article
                  key={r.name}
                  className={`card-hover p-6 flex flex-col relative overflow-hidden ${
                    featured ? 'lg:col-span-2 bg-ink-900 text-white border-ink-900 shadow-lift' : ''
                  }`}
                  data-reveal
                  data-reveal-delay={i * 60}
                >
                  {featured && (
                    <div aria-hidden className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-gradient-brand opacity-25 blur-3xl" />
                  )}
                  <Quote className={`w-7 h-7 ${featured ? 'text-brand-400' : 'text-brand-300'} mb-4`} />
                  <p className={`text-[0.95rem] leading-relaxed flex-1 relative ${featured ? 'text-white/90 md:text-lg' : 'text-ink-700'}`}>
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <div className={`mt-5 pt-5 border-t ${featured ? 'border-white/10' : 'border-ink-100'} flex items-center gap-3 relative`}>
                    <div className="relative w-11 h-11 rounded-full overflow-hidden bg-ink-200 shrink-0">
                      <Image src={avatarSrc} alt={r.name} fill sizes="44px" className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className={`font-display font-semibold ${featured ? 'text-white' : 'text-ink-900'}`}>{r.name}</div>
                      <div className={`text-xs ${featured ? 'text-white/60' : 'text-ink-500'}`}>{r.role}</div>
                    </div>
                    <div className={`flex gap-0.5 ${featured ? 'text-brand-300' : 'text-brand-500'}`}>
                      {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center" data-reveal>
            <GetStartedButton size="lg">Join them <ArrowRight className="w-4 h-4" /></GetStartedButton>
          </div>
        </div>
      </section>
    </>
  );
}
