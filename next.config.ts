import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  experimental: {
    optimizePackageImports: ['lucide-react', '@base-ui/react'],
  },
  reactCompiler: true,
  cacheComponents: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
