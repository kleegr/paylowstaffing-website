import Link from 'next/link';
import { Facebook, Instagram, Youtube, Linkedin, MessageCircle, ArrowRight } from 'lucide-react';
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
  { label: 'Facebook', href: siteConfig.social.facebook, Icon: Facebook },
  { label: 'X', href: siteConfig.social.twitter, Icon: XIcon },
  { label: 'YouTube', href: siteConfig.social.youtube, Icon: Youtube },
  { label: 'LinkedIn', href: siteConfig.social.linkedin, Icon: Linkedin },
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'WhatsApp', href: siteConfig.social.whatsapp, Icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer className="relative bg-ink-900 text-white/85 overflow-hidden">
      {/* Top gradient ribbon */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-60" />

      <div className="container-wide pt-16 pb-10 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo size="lg" />
            <p className="mt-5 text-sm leading-relaxed text-white/65 max-w-md">
              World-class remote talent for ambitious teams. Skilled offshore professionals from $7/hour, ready to plug into your workflow.
            </p>
            <form className="mt-7 max-w-md" aria-label="Newsletter">
              <label htmlFor="footer-newsletter" className="sr-only">Email</label>
              <div className="flex items-stretch overflow-hidden rounded-full bg-white/10 backdrop-blur-md border border-white/10 focus-within:border-white/30 transition">
                <input
                  id="footer-newsletter"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="flex-1 bg-transparent px-5 text-sm text-white placeholder-white/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-white bg-gradient-brand hover:opacity-90 transition"
                >
                  Subscribe <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-base font-semibold text-white mb-5">Explore</h3>
            <ul className="space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/65 hover:text-white transition-colors inline-flex items-center gap-1.5 group">
                    <span>{l.label}</span>
                    <ArrowRight className="w-3 h-3 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-base font-semibold text-white mb-5">Get in touch</h3>
            <address className="not-italic space-y-3 text-sm text-white/70">
              <div>
                <div className="text-white/50 text-xs uppercase tracking-wider mb-0.5">Address</div>
                {siteConfig.contact.address}
              </div>
              <div>
                <div className="text-white/50 text-xs uppercase tracking-wider mb-0.5">Phone</div>
                <a href={`tel:${siteConfig.contact.phoneTel}`} className="hover:text-brand-300">{siteConfig.contact.phone}</a>
              </div>
              <div>
                <div className="text-white/50 text-xs uppercase tracking-wider mb-0.5">Email</div>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-brand-300">{siteConfig.contact.email}</a>
              </div>
            </address>

            <ul className="mt-6 flex flex-wrap items-center gap-2.5">
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
