import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';

import Providers from '--lib/context/Providers';

const sans = localFont({
  variable: '--font-aeonik-sans',
  display: 'swap',
  src: [
    { path: './fonts/Aeonik-Thin.ttf', weight: '200', style: 'normal' },
    { path: './fonts/Aeonik-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Aeonik-Regular.woff', weight: '400', style: 'normal' },
    { path: './fonts/Aeonik-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Aeonik-Bold.woff2', weight: '700', style: 'normal' }, 
    { path: './fonts/Aeonik-Bold.woff', weight: '700', style: 'normal' },
    { path: './fonts/Aeonik-Bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/Aeonik-Black.ttf', weight: '900', style: 'normal' },
  ]})

const mono = localFont({
  variable: '--font-aeonik-mono',
  display: 'swap',
  src: [
    { path: './fonts/AeonikMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/AeonikMono-Regular.woff', weight: '400', style: 'normal' },
    { path: './fonts/AeonikMono-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/AeonikMono-Bold.woff2', weight: '700', style: 'normal' }, 
    { path: './fonts/AeonikMono-Bold.woff', weight: '700', style: 'normal' },
    { path: './fonts/AeonikMono-Bold.ttf', weight: '700', style: 'normal' },
  ]})

export const metadata: Metadata = {
  title: "yCRV",
  description: "Put your yCRV to work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
