'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * A theme provider component that wraps children in a Next.js theme provider.
 * @param {React.ComponentProps<typeof NextThemesProvider>} props - The props for the theme provider component.
 * @returns {JSX.Element} The rendered theme provider component.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
