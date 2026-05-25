import type { Metadata, Viewport } from 'next';
import './globals.css';

// Self-hosted fonts (via @fontsource) — no external request, no CLS
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Reveal from '@/components/Reveal';
import { ModalProvider } from '@/components/ModalProvider';
import GetStartedModal from '@/components/GetStartedModal';
import { siteConfig } from '@/lib/content';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Hire skilled remote talent from $7/hr`,
    template: `%s | ${siteConfig.fullName}`,
  },
  description:
    'PayLow connects you with world-class offshore professionals from $7/hr. Cut payroll costs by 60–80% — no hidden fees, no lock-in contracts.',
  keywords: ['remote staffing', 'offshore staffing', 'virtual assistants', 'hire remote', 'PayLow Staffing'],
  authors: [{ name: 'PayLow Staffing' }],
  creator: 'PayLow Staffing',
  publisher: 'PayLow Staffing',
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Hire skilled remote talent from $7/hr`,
    description: 'World-class offshore talent. From $7/hr. No payroll taxes, no lock-in contracts.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Paylowstaffing',
    title: siteConfig.fullName,
    description: 'Hire skilled remote talent from $7/hr.',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#F26C2A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-ink-700 antialiased font-sans">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-brand-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to content
        </a>
        <ModalProvider>
          <Header />
          <main id="content">{children}</main>
          <Footer />
          <ScrollToTop />
          <GetStartedModal />
        </ModalProvider>
        <Reveal />
      </body>
    </html>
  );
}
