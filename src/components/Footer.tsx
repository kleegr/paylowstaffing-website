import Link from 'next/link';
import { Facebook, Youtube, Linkedin, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { navLinks, siteConfig } from '@/lib/content';

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

export default function Footer() {
  return (
    <footer className="relative bg-ink-900 text-white/85 overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-60" />

      <div className="container-wide pt-16 pb-10 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo size="md" variant="dark" />
            <p className="mt-5 text-sm leading-relaxed text-white/65 max-w-md">
              Vetted remote staff for ambitious teams. From $7 an hour. Hired in days.
            </p>

            <ul className="mt-7 flex flex-wrap items-center gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in new window)`}
                    className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-white/10 hover:bg-gradient-brand text-white transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/65 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Get in touch</h3>
            <address className="not-italic space-y-3 text-sm text-white/70">
              <div>
                <div className="text-white/45 text-[11px] uppercase tracking-wider mb-0.5">Address</div>
                {siteConfig.contact.address}
              </div>
              <div>
                <div className="text-white/45 text-[11px] uppercase tracking-wider mb-0.5">Phone</div>
                <a href={`tel:${siteConfig.contact.phoneTel}`} className="hover:text-brand-300">{siteConfig.contact.phone}</a>
              </div>
              <div>
                <div className="text-white/45 text-[11px] uppercase tracking-wider mb-0.5">Email</div>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-brand-300">{siteConfig.contact.email}</a>
              </div>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide py-5 text-xs flex flex-col md:flex-row items-center justify-between gap-3 text-white/50">
          <span>© {new Date().getFullYear()} PayLow Staffing. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="https://toc.paylowstaffing.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Terms</a>
            <a href="https://privacy-policy.paylowstaffing.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Privacy</a>
            <span>·</span>
            <span>Designed by <a href="https://www.chaimteitelbaum.com" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300">Chaim Teitelbaum</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
