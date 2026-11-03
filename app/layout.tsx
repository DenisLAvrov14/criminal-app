import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Clarity from './components/Clarity/Clarity';
import GoogleAnalytics from './components/GoogleAnalytics/GoogleAnalytics';
import { CookieBanner } from './components/CookieBanner/CookieBanner';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Russian Criminal Culture',
  description:
    'Russian criminal culture: prison tattoos, thieves-in-law, hierarchy, slang and history',
  verification: {
    google: 'FaILXNl1lAQjTjE6Xp63OYZamuQcpRlrvY3FSaFtna4',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <CookieBanner />
        <GoogleAnalytics />
        <Clarity />
      </body>
    </html>
  );
}
