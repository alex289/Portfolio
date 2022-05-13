import Script from 'next/script';

const Analytics = () => {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            async
            defer
            data-website-id="d406befc-fba6-40d7-84e5-f3cce8f829af"
            src="https://alexanderkonietzko-analytics.vercel.app/umami.js"
          />
        </>
      )}
    </>
  );
};

export default Analytics;
