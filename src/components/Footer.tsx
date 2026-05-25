'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Facebook, Linkedin, Youtube, MessageCircle, ChevronRight } from 'lucide-react';
import { navLinks, siteConfig } from '@/lib/content';
import Logo from './Logo';

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
  { label: 'WhatsApp', href: siteConfig.social.whatsapp, Icon: MessageCircle },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubscribe(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'newsletter', email }),
      });
      if (!res.ok) throw new Error('Subscribe failed');
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <footer className="bg-nav text-white/85">
      <div className="container-wide pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo size={64} />
            <p className="mt-5 text-sm leading-relaxed text-white/70 max-w-sm">{siteConfig.tagline}</p>
            <form onSubmit={onSubscribe} className="mt-7 max-w-sm" aria-label="Newsletter">
              <h3 className="text-base font-semibold text-white mb-3">Subscribe Our Newsletter</h3>
              <div className="flex items-stretch overflow-hidden rounded-md bg-white">
                <label htmlFor="newsletter-email" className="sr-only">Email</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-ink-900 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="px-5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold disabled:opacity-60"
                >
                  {status === 'sending' ? '…' : 'Submit'}
                </button>
              </div>
              {status === 'done' && <p className="mt-2 text-xs text-emerald-300">Thanks — you&apos;re subscribed.</p>}
              {status === 'error' && <p className="mt-2 text-xs text-red-300">Something went wrong. Please try again.</p>}
            </form>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-base font-semibold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-brand-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-white/40 group-hover:text-brand-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h3 className="text-base font-semibold text-white mb-5">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <div className="text-white font-semibold mb-1">Address</div>
                <div className="text-white/70">{siteConfig.contact.address}</div>
              </li>
              <li>
                <div className="text-white font-semibold mb-1">Phone Number</div>
                <a href={`tel:${siteConfig.contact.phoneTel}`} className="text-white/70 hover:text-brand-400">
                  1-877-3<strong className="text-white">PAYLOW</strong>{' '}
                  <span className="tracking-widest">{siteConfig.contact.phoneDigits}</span>
                </a>
              </li>
              <li>
                <div className="text-white font-semibold mb-1">Email</div>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-white/70 hover:text-brand-400">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <div className="text-white font-semibold text-sm mb-3">Find us on:</div>
              <ul className="flex flex-wrap items-center gap-2.5">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} page opens in new window`}
                      title={`${label} page opens in new window`}
                      className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide py-5 text-xs flex flex-col md:flex-row items-center justify-center gap-2 text-white/60 text-center">
          <span>Copyright © {new Date().getFullYear()} Pay Low</span>
          <span aria-hidden>|</span>
          <a href={siteConfig.termsUrl} className="hover:text-white" target="_blank" rel="noopener noreferrer">Terms</a>
          <span aria-hidden>|</span>
          <a href={siteConfig.privacyUrl} className="hover:text-white" target="_blank" rel="noopener noreferrer">Privacy</a>
          <span aria-hidden>|</span>
          <span>
            Designed &amp; Developed by{' '}
            <a href={siteConfig.designer.url} target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300">
              {siteConfig.designer.name}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
