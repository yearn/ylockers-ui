import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();


const config = getDefaultConfig({
  appName: 'yPrisma',
  projectId: '84801a4fb569adb34f184f543b6d1762',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});


const sans = localFont({
  variable: '--font-aeonik-sans',
  display: 'swap',
  src: [
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
  title: "yPrisma",
  description: "Put your yPRISMA to work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <body>{children}</body>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
    </html>
  );
}
