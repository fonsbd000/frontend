import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fonsbangladesh.com'),
  title: {
    default: 'FONS Bangladesh Ltd. | Industrial Equipment & Solutions',
    template: '%s | FONS Bangladesh Ltd.',
  },
  description: 'Leading provider of industrial machinery, fiber optic solutions, and comprehensive engineering services in Bangladesh. Empowering industries since 2010.',
  keywords: ['industrial equipment', 'fiber optics', 'Bangladesh engineering', 'FONS', 'machinery supply'],
  authors: [{ name: 'FONS Bangladesh Ltd.' }],
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: 'https://fonsbangladesh.com',
    siteName: 'FONS Bangladesh Ltd.',
    title: 'FONS Bangladesh Ltd. | Industrial Equipment & Solutions',
    description: 'Empowering industries across Bangladesh with premium machinery and expert services.',
    images: [
      {
        url: '/og-image.jpg', // Placeholder for OG image
        width: 1200,
        height: 630,
        alt: 'FONS Bangladesh Ltd.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FONS Bangladesh Ltd. | Industrial Equipment & Solutions',
    description: 'Empowering industries across Bangladesh with premium machinery and expert services.',
    images: ['/og-image.jpg'],
  },
};

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-neutral-light text-neutral-dark font-sans">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
