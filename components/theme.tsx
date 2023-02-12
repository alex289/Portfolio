import { ReactNode } from 'react';

import { ThemeProvider } from '@wits/next-themes';

const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default ProviderWrapper;
