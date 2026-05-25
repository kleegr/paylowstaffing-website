'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import Logo from './Logo';
import GetStartedButton from './GetStartedButton';
import { navLinks, siteConfig } from '@/lib/content';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(15,13,10,0.04),0_8px_24px_rgba(15,13,10,0.04)] border-b border-ink-100/60'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-wide flex items-center justify-between py-3 lg:py-4">
        <Logo size="md" />

        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main">
          {navLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  active ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
                }`}
              >
                {l.label}
                {active && (
                  <span aria-hidden className="absolute left-3 right-3 -bottom-1 h-0.5 rounded-full bg-brand-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <GetStartedButton className="hidden md:inline-flex">Get Started</GetStartedButton>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-ink-900 bg-white border border-ink-100 hover:bg-ink-50 transition"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 top-[68px] z-40 transition-[transform,opacity] duration-500 ease-out ${
          open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-gradient-warm" />
        <div className="relative h-full overflow-y-auto px-6 pt-8 pb-12">
          <nav aria-label="Mobile" className="flex flex-col gap-1.5">
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ animationDelay: `${60 + i * 40}ms` }}
                className={`group flex items-center justify-between rounded-2xl px-5 py-3.5 text-base font-semibold transition-colors duration-200 ${
                  isActive(l.href)
                    ? 'bg-ink-900 text-white shadow-lift'
                    : 'bg-white/70 text-ink-900 hover:bg-white'
                } ${open ? 'animate-fade-up' : ''}`}
              >
                <span>{l.label}</span>
                <span aria-hidden className={isActive(l.href) ? 'text-brand-300' : 'text-brand-500'}>→</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 grid grid-cols-1 gap-3">
            <GetStartedButton size="lg" className="w-full justify-center">Get Started</GetStartedButton>
            <Link href="/contact-us" className="btn-outline btn-lg w-full justify-center">Talk to us</Link>
          </div>

          <div className="mt-10 pt-6 border-t border-ink-100 space-y-3 text-sm">
            <a href={`tel:${siteConfig.contact.phoneTel}`} className="flex items-center gap-3 text-ink-700 hover:text-ink-900">
              <Phone className="w-4 h-4 text-brand-500" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 text-ink-700 hover:text-ink-900">
              <Mail className="w-4 h-4 text-brand-500" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
