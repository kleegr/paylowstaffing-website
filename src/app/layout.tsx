import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://paylowstaffing.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F26C2A',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'PayLow — Hire A Full-Time Remote Employee For $7 An Hour',
    template: '%s | PayLow Staffing',
  },
  description:
    'Discover world-class remote professionals with our global recruitment platform and reduce operating and payroll costs by 60% to 80%. No hidden fees, no lock-in contracts.',
  keywords: [
    'remote staffing',
    'offshore staffing',
    'virtual assistants',
    'hire remote employees',
    'PayLow Staffing',
    'remote hiring',
  ],
  authors: [{ name: 'PayLow Staffing' }],
  creator: 'PayLow Staffing',
  publisher: 'PayLow Staffing',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'PayLow',
    title: 'PayLow — Hire A Full-Time Remote Employee For $7 An Hour',
    description:
      'World-class remote professionals at a fraction of the cost. Reduce operating and payroll costs by 60–80%.',
    url: siteUrl,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PayLow Staffing',
    description: 'Hire A Full-Time Remote Employee For $7 An Hour',
    site: '@Paylowstaffing',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts loaded via CSS link so the build doesn't require build-time network access.
            Browsers fetch them on first paint; if blocked, the CSS variables fall back to
            system fonts (see globals.css). */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]
                     focus:bg-brand-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
