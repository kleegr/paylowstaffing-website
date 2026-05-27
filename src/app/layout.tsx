import type { Metadata, Viewport } from 'next';
import './globals.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';
import '@fontsource/caveat/500.css';
import '@fontsource/caveat/700.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Reveal from '@/components/Reveal';
import { ModalProvider } from '@/components/ModalProvider';
import SignUpModal from '@/components/SignUpModal';
import { siteConfig } from '@/lib/content';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} \u2014 Remote staff from $7/hour. Hired in days.`,
    template: `%s | ${siteConfig.fullName}`,
  },
  description:
    'Vetted remote staff, matched to your team in days. From $7 an hour, all-in. Meet 4\u20135 pre-screened candidates and hire on the call. No setup fees, no long contracts.',
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
    title: `${siteConfig.name} \u2014 Remote staff from $7/hour. Hired in days.`,
    description: 'Vetted remote staff, matched in days. From $7 an hour, all-in. No setup fees.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Paylowstaffing',
    title: siteConfig.fullName,
    description: 'Vetted remote staff from $7/hour. Hired in days.',
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
          <SignUpModal />
        </ModalProvider>
        <Reveal />
      </body>
    </html>
  );
}
