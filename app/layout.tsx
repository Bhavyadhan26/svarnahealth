import type { Metadata } from 'next';
import { MuseoModerno } from 'next/font/google';
import '@fontsource/open-sauce-sans/400.css';
import '@fontsource/open-sauce-sans/500.css';
import '@fontsource/open-sauce-sans/600.css';
import '@fontsource/open-sauce-sans/700.css';
import { SiteNavbar } from '@/components/site-navbar';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

const display = MuseoModerno({
  subsets: ['latin'],
  variable: '--font-display',
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
      <body className={`${display.variable} bg-void font-body text-white antialiased`}>
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}