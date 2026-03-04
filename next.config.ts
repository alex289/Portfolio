import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'radix-ui'],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
