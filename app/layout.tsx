import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Clarity from './components/Clarity/Clarity';
import GoogleAnalytics from './components/GoogleAnalytics/GoogleAnalytics';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Clarity />
      <GoogleAnalytics />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
