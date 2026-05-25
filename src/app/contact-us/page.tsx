import Link from 'next/link';
import type { Metadata } from 'next';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { assets, siteConfig } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with PayLow Staffing. Tell us about your hiring needs and our team will match you with a virtual assistant who fits your goals.',
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.16 17.52h1.833L7.084 4.126H5.117L17.084 19.77Z" />
    </svg>
  );
}

const followSocials = [
  { label: 'Facebook', href: siteConfig.social.facebook, Icon: Facebook },
  { label: 'X', href: siteConfig.social.twitter, Icon: XIcon },
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'WhatsApp', href: siteConfig.social.whatsapp, Icon: MessageCircle },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" bg={assets.contactHeroBg} />

      <section className="section bg-cream-50">
        <div className="container-wide max-w-4xl">
          {/* Contact Info + Follow Us white card */}
          <div className="rounded-lg bg-white shadow-card p-7 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="font-display font-bold text-2xl text-ink-900">Contact Info</h2>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <div className="text-ink-900 font-semibold">Address</div>
                    <div className="text-slate-600 mt-1">{siteConfig.contact.address}</div>
                  </li>
                  <li>
                    <div className="text-ink-900 font-semibold">Phone Number</div>
                    <a
                      href={`tel:${siteConfig.contact.phoneTel}`}
                      className="text-slate-600 mt-1 inline-block hover:text-brand-700"
                    >
                      {siteConfig.contact.phone}{' '}
                      <span className="tracking-widest text-slate-500">
                        {siteConfig.contact.phoneDigits}
                      </span>
                    </a>
                  </li>
                  <li>
                    <div className="text-ink-900 font-semibold">Email</div>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-slate-600 mt-1 inline-block hover:text-brand-700"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="md:text-right">
                <h3 className="font-display font-bold text-xl text-ink-900">Follow Us</h3>
                <ul className="mt-5 inline-flex flex-wrap items-center gap-3 md:justify-end">
                  {followSocials.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in new window)`}
                        className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Get Started Now form */}
            <div className="mt-12 pt-10 border-t border-cream-100">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-ink-900">
                Get Started Now!
              </h2>
              <p className="mt-3 text-slate-600">
                Hiring a virtual assistant is one of the best decisions you can make when growing
                your company.
              </p>

              <div className="mt-8 max-w-2xl">
                <ContactForm />
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Prefer to fill out the form on the original site?{' '}
            <Link
              href={siteConfig.contactFormEmbedUrl}
              className="text-brand-700 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the embedded form
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
