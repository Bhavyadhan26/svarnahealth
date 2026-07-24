import type { Metadata } from 'next';
import { MuseoModerno, Open_Sans } from 'next/font/google';
import { SiteNavbar } from '@/components/site-navbar';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

const display = MuseoModerno({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700']
});

const body = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Svarna | SIP THE GOLD',
  description: 'Ancient Wisdom | Modern Care. Small daily habits. Big long term results.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${display.variable} ${body.variable} bg-void font-body text-white antialiased`}>
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}