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
      { source: '/about', destination: '/about-us', permanent: true },
      { source: '/contact', destination: '/contact-us', permanent: true },
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
