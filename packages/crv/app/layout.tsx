import type { Metadata } from 'next'
import { sans, mono } from '--lib/fonts'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import Providers from '--lib/context/Providers'
import env from '--lib/tools/env'

export const metadata: Metadata = {
  title: env.LOCKER_TOKEN_NAME,
  description: `Put your ${env.LOCKER_TOKEN_NAME} to work`,
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
