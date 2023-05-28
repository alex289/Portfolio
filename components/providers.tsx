'use client';

import { ThemeProvider, useTheme } from 'next-themes';
import { ReactNode, useEffect } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider attribute="class">
      <ThemeColorSetter>{children}</ThemeColorSetter>
    </ThemeProvider>;
}

function ThemeColorSetter({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#f9fafb' : '#222222');
    }
  }, [theme]);

  return <>{children}</>;
}
