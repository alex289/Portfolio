import { Suspense } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import NProgress from 'nprogress';

import Analytics from '@/components/Analytics';
const CommandPalette = dynamic(() => import('@/components/CommandPalette'), {
  suspense: true,
  ssr: false,
});

import type { AppProps } from 'next/app';
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

export default function App({
  Component,
  pageProps
}: AppProps<{ session: Session }>): JSX.Element {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class">
        <Suspense>
          <CommandPalette />
        </Suspense>
        <Analytics />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
