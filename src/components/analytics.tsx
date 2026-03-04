'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

const AnalyticsWrapper = () => {
  if (process.env.NODE_ENV !== 'production') {
    return <></>;
  }

  return (
    <>
      <Script
        async
        defer
        data-website-id="1eb6c13b-1d82-4897-ad01-27a318a59e41"
        src="https://alexanderkonietzko-analytics.vercel.app/script.js"
      />
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default AnalyticsWrapper;
