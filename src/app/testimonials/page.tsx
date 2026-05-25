import Image from 'next/image';
import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CtaBanner from '@/components/CtaBanner';
import { assets, reviews, videoReviews } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'Hear from PayLow Staffing clients across photography, property management, real estate, IT and more — video reviews and written stories from real businesses.',
};

// Map of image-key → URL used by the review avatars
const avatarMap: Record<string, string> = {
  tColleagues: assets.tColleagues,
  tFinancial: assets.tFinancial,
  tProperty: assets.tProperty,
  tManSlider: assets.tManSlider,
  tAbout04: assets.tAbout04,
  tHomeImg7: assets.tHomeImg7,
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero title="Testimonials" bg={assets.testimonialsHeroBg} />

      {/* ===== Video reviews ===== */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink-900 inline-flex items-center gap-3 flex-wrap justify-center">
              Video Reviews About <span className="pill text-xl">Pay Low</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {videoReviews.map((v) => (
              <article
                key={v.youtubeId}
                className="rounded-xl overflow-hidden shadow-card bg-white"
              >
                <div className="aspect-video bg-slate-900">
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
                  <p className="text-sm text-slate-500 mt-1">Paylow</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Best reviews ===== */}
      <section className="section bg-cream-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink-900 inline-flex items-center gap-3 flex-wrap justify-center">
              Best Reviews About <span className="pill text-xl">Pay Low</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {reviews.map((r) => (
              <article key={r.name} className="card p-6 lg:p-7 flex flex-col">
                <p className="text-slate-700 text-sm md:text-base leading-relaxed text-center">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-3 justify-center">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-cream-200 shrink-0">
                    <Image
                      src={avatarMap[r.image] ?? assets.tColleagues}
                      alt={r.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-display font-bold text-brand-700">{r.name}</div>
                    <div className="text-xs text-slate-500">{r.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
