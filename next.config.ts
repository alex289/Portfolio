import { type NextConfig } from 'next';

import './src/env.mjs';

import withNextIntl from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/((?!_next|assets|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: [
              `s-maxage=` + 86400000 / 1000,
              `stale-while-revalidate=` + 31536000000 / 1000,
            ].join(', '),
          },
        ],

        missing: [
          {
            type: 'header',
            key: 'Next-Router-Prefetch',
          },
        ],
      },
    ];
  },
};

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://alexanderkonietzko-analytics.vercel.app/script.js cdn.vercel-insights.com vercel.live va.vercel-scripts.com;
  child-src 'self' vercel.live;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

export default withNextIntl()(nextConfig);
