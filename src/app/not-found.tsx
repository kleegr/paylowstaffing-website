import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="bg-cream-50 min-h-[70vh] flex items-center">
      <div className="container-wide text-center max-w-xl">
        <p className="pill">404</p>
        <h1 className="mt-4 h-display text-balance">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-4 text-slate-600 leading-relaxed">
          The link may be outdated, or the page might have moved. Let&rsquo;s get you back on
          track.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link href="/contact-us" className="btn-ghost">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
