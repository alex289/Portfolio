import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'radix-ui'],
  },
  reactCompiler: true,
  cacheComponents: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
