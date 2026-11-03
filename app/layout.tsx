import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Clarity from './components/Clarity/Clarity';
import GoogleAnalytics from './components/GoogleAnalytics/GoogleAnalytics';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Russian Prison Culture',
  description: 'Russian Prison Tattos and Criminal Subculture',
  verification: {
    google: 'FaILXNl1lAQjTjE6Xp63OYZamuQcpRlrvY3FSaFtna4',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Clarity />
      <GoogleAnalytics />
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

