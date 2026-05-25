import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/lib/content';

export default function CtaBanner() {
  return (
    <section className="relative bg-cream-100 overflow-hidden">
      <div className="grid lg:grid-cols-2 items-stretch">
        <div className="container-wide lg:max-w-none lg:mx-0 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-12 py-14 lg:py-20 flex items-center">
          <div className="max-w-xl">
            <h2 className="h-display text-balance">
              Ready To Transform Your Business with PayLow?
            </h2>
            <p className="mt-5 text-slate-700 leading-relaxed">
              Unlock world-class professionals to boost productivity and slash operating costs by
              up to 80%. No hidden fees, no lock-in contracts, and tailored expertise in every
              industry—from real estate to healthcare, e-commerce to IT.
            </p>
            <div className="mt-7">
              <Link href="/contact-us" className="btn-primary">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
        <div className="relative h-64 lg:h-auto min-h-[280px]">
          <Image
            src={assets.ctaWomen}
            alt="PayLow customer support team on headsets"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
