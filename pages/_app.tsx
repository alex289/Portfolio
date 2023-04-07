import { Suspense } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import NProgress from 'nprogress';

import Analytics from '@/components/Analytics';
const CommandPalette = dynamic(() => import('@/components/CommandPalette'), {
  suspense: true,
});

import type { AppType } from 'next/app';
import type { Session } from 'next-auth';

import '@/styles/global.css';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', (_url, { shallow }) => {
  if (!shallow) {
    NProgress.start();
  }
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const normal = Inter({ subsets: ['latin'] });

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <div className={normal.className}>
          <Suspense>
            <CommandPalette />
          </Suspense>
          <Component {...pageProps} />
          <Analytics />
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default App;
