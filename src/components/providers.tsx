'use client';

import { type ReactNode } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <JotaiProvider>{children}</JotaiProvider>
    </ThemeProvider>
  );
}
