/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // remotePatterns lets Next.js's image optimizer fetch + cache + convert
    // these to AVIF/WebP. First request hits Unsplash; subsequent requests
    // are served from Vercel's edge cache.
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },

      // About Us page removed — the hero already covers the founder/value story.
      // Old shortcut /about now goes straight to the homepage too.
      { source: '/about', destination: '/', permanent: true },
      { source: '/about-us', destination: '/', permanent: true },

      // FAQ page removed — a compact FAQ accordion now lives on the homepage at #faq.
      // Next.js carries hash fragments through 308 redirects: the browser receives
      // Location: /#faq and scrolls to the section on landing.
      { source: '/faq', destination: '/#faq', permanent: true },

      { source: '/contact', destination: '/contact-us', permanent: true },

      // Testimonials page removed — social proof now lives on the homepage.
      { source: '/testimonials', destination: '/#testimonials', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)\\.(svg|woff2|jpg|jpeg|png|webp|avif)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
