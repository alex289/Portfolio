import Script from 'next/script';

const Analytics = () => {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <Script
          async
          defer
          data-website-id="1eb6c13b-1d82-4897-ad01-27a318a59e41"
          src="https://alexanderkonietzko-analytics.vercel.app/script.js"
        />
      )}
    </>
  );
};

export default Analytics;
