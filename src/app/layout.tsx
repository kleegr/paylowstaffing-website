import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Reveal from '@/components/Reveal';
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-ink-700 antialiased">
        <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-brand-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-full">
          Skip to content
        </a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <ScrollToTop />
        <Reveal />
      </body>
    </html>
  );
}
