'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navLinks, siteConfig } from '@/lib/content';
import Logo from './Logo';
import clsx from 'clsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-nav/95 backdrop-blur-md shadow-lg' : 'bg-nav'
      )}
    >
      <div className="container-wide flex items-center justify-between py-3 lg:py-4">
        <Logo size={48} />

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {navLinks.map((link) => {
            const active = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'px-3.5 py-2 text-sm font-semibold uppercase tracking-wide rounded transition-colors',
                  active ? 'text-brand-500' : 'text-white hover:text-brand-400'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={siteConfig.signUpUrl}
            className="hidden sm:inline-flex bg-ink-900 hover:bg-ink-800 text-white font-semibold text-sm px-5 py-2.5 rounded-md transition-colors"
          >
            Get Started
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((p) => !p)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-white hover:bg-white/10 transition"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={clsx(
          'lg:hidden fixed inset-x-0 top-[68px] bottom-0 bg-nav z-40 transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-hidden={!open}
      >
        <nav className="px-6 py-8 flex flex-col gap-1 h-full overflow-y-auto" aria-label="Mobile">
          {navLinks.map((link) => {
            const active = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'block px-4 py-3.5 rounded text-base font-semibold uppercase tracking-wide border-b border-white/10',
                  active ? 'text-brand-500' : 'text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href={siteConfig.signUpUrl} className="mt-6 btn-primary self-stretch text-center">
            Get Started
          </Link>
          <div className="mt-8 pt-6 border-t border-white/10 text-sm text-white/80 space-y-2">
            <div><a href={`tel:${siteConfig.contact.phoneTel}`} className="hover:text-white">{siteConfig.contact.phone}</a></div>
            <div><a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">{siteConfig.contact.email}</a></div>
          </div>
        </nav>
      </div>
    </header>
  );
}
