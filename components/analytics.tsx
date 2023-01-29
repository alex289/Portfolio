'use client';

import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const AnalyticsWrapper = () => {
  if (process.env.NODE_ENV === 'production') {
    return <></>;
  }

  return (
    <>
      <Script
        async
        defer
        data-website-id="d406befc-fba6-40d7-84e5-f3cce8f829af"
        src="https://alexanderkonietzko-analytics.vercel.app/umami.js"
      />
      <Analytics />
    </>
  );
};

export default AnalyticsWrapper;
