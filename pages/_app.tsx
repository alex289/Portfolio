import type { AppProps } from 'next/app';
import Router from 'next/router';

import { ThemeProvider } from 'next-themes';
import NProgress from 'nprogress';

import '@/styles/global.css';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', (_url, { shallow }) => {
  if (!shallow) {
    NProgress.start();
  }
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
