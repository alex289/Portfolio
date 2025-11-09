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
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default AnalyticsWrapper;
