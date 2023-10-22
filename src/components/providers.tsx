'use client';

import { type ReactNode, useEffect } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider, useTheme } from 'next-themes';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <JotaiProvider>
        <ThemeColorSetter>{children}</ThemeColorSetter>
      </JotaiProvider>
    </ThemeProvider>
  );
}

function ThemeColorSetter({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'light' ? '#f9fafb' : '#222222',
      );
    }
  }, [theme]);

  return <>{children}</>;
}
