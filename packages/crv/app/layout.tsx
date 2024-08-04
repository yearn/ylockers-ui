import type { Metadata } from 'next'
import { sans, mono } from '--lib/fonts'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import Providers from '--lib/context/Providers'

export const metadata: Metadata = {
  title: 'yCRV',
  description: 'Put your yCRV to work',
}

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
  )
}
