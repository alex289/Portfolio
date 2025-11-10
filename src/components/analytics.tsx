'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
