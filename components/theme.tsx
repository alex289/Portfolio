'use client';
import { ReactNode } from 'react';

import { ThemeProvider } from '@wits/next-themes';

const ProviderWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider attribute="class">{children}</ThemeProvider>
);

export default ProviderWrapper;
