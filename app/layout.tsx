import './globals.css';
import { Inter } from 'next/font/google';

import { ReactNode } from 'react';
import ProviderClient from './components/ProviderClient';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RTK Weather',
  description: 'Generated by create next app',
};

type RootLayoutProps = {
  children: ReactNode[];
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProviderClient>{children}</ProviderClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
