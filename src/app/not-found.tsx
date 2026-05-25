import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-warm" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-2 opacity-80" />
      <div aria-hidden className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-gradient-brand opacity-20 blur-3xl animate-float-slow" />

      <div className="container-wide min-h-[70vh] flex items-center">
        <div className="text-center max-w-xl mx-auto" data-reveal>
          <p className="mb-5"><span className="eyebrow"><span className="eyebrow-dot" /> 404</span></p>
          <h1 className="display-1">
            We couldn&rsquo;t find <span className="text-gradient">that page.</span>
          </h1>
          <p className="lead mt-5">
            The link may have moved or never existed. Let&rsquo;s get you back on track.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="btn-primary"><Home className="w-4 h-4" /> Back to home</Link>
            <Link href="/contact-us" className="btn-outline"><ArrowLeft className="w-4 h-4" /> Contact us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
