import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Facebook, Youtube, Linkedin, MessageCircle } from 'lucide-react';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Tell us what you need. We&apos;ll match you with the right offshore talent within days.',
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.16 17.52h1.833L7.084 4.126H5.117L17.084 19.77Z" />
    </svg>
  );
}

const socials = [
  { label: 'LinkedIn', href: siteConfig.social.linkedin, Icon: Linkedin },
  { label: 'X', href: siteConfig.social.twitter, Icon: XIcon },
  { label: 'YouTube', href: siteConfig.social.youtube, Icon: Youtube },
  { label: 'Facebook', href: siteConfig.social.facebook, Icon: Facebook },
  { label: 'WhatsApp', href: siteConfig.social.whatsapp, Icon: MessageCircle },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s build your <span className="text-gradient">remote team.</span></>}
        lead="Tell us about your project. A human replies within one business day."
        compact
      />

      <section className="section bg-white">
        <div className="container-wide max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-8">
            <aside className="lg:col-span-2 space-y-4" data-reveal>
              <div className="card p-7">
                <h3 className="font-display font-bold text-lg text-ink-900 mb-5">Contact info</h3>
                <ul className="space-y-5 text-sm">
                  <li className="flex gap-4">
                    <span className="shrink-0 inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-ink-400 font-semibold">Address</div>
                      <div className="mt-0.5 text-ink-700">{siteConfig.contact.address}</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="shrink-0 inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                      <Phone className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-ink-400 font-semibold">Phone</div>
                      <a href={`tel:${siteConfig.contact.phoneTel}`} className="mt-0.5 text-ink-700 hover:text-brand-700 transition block">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="shrink-0 inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                      <Mail className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-ink-400 font-semibold">Email</div>
                      <a href={`mailto:${siteConfig.contact.email}`} className="mt-0.5 text-ink-700 hover:text-brand-700 transition block break-all">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </li>
                </ul>

                <div className="mt-7 pt-6 border-t border-ink-100">
                  <div className="text-[10px] uppercase tracking-wider text-ink-400 font-semibold mb-3">Follow us</div>
                  <ul className="flex flex-wrap items-center gap-2">
                    {socials.map(({ label, href, Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-ink-50 text-ink-700 hover:bg-gradient-brand hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card-dark p-7 relative overflow-hidden">
                <div aria-hidden className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-gradient-brand opacity-30 blur-3xl" />
                <p className="text-[10px] uppercase tracking-wider font-semibold text-white/55">Average response</p>
                <p className="mt-1 font-display font-bold text-white text-2xl">&lt; 24 hours</p>
                <p className="mt-2 text-white/65 text-sm">A small, human team. Real people, real fast.</p>
              </div>
            </aside>

            <div className="lg:col-span-3" data-reveal data-reveal-delay="120">
              <div className="card p-7 sm:p-9">
                <h2 className="display-3">Get in touch</h2>
                <p className="text-ink-500 text-sm mt-2 mb-7">
                  Tell us what you&apos;re looking for. We&apos;ll respond fast.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
