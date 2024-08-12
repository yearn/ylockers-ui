import localFont from 'next/font/local'

const sans = localFont({
  variable: '--font-aeonik-sans',
  display: 'swap',
  src: [
    { path: './Aeonik-Thin.ttf', weight: '200', style: 'normal' },
    { path: './Aeonik-Regular.woff2', weight: '400', style: 'normal' },
    { path: './Aeonik-Regular.woff', weight: '400', style: 'normal' },
    { path: './Aeonik-Regular.ttf', weight: '400', style: 'normal' },
    { path: './Aeonik-Bold.woff2', weight: '700', style: 'normal' }, 
    { path: './Aeonik-Bold.woff', weight: '700', style: 'normal' },
    { path: './Aeonik-Bold.ttf', weight: '700', style: 'normal' },
    { path: './Aeonik-Black.ttf', weight: '900', style: 'normal' },
  ]})

const mono = localFont({
  variable: '--font-aeonik-mono',
  display: 'swap',
  src: [
    { path: './AeonikMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: './AeonikMono-Regular.woff', weight: '400', style: 'normal' },
    { path: './AeonikMono-Regular.ttf', weight: '400', style: 'normal' },
    { path: './AeonikMono-Bold.woff2', weight: '700', style: 'normal' }, 
    { path: './AeonikMono-Bold.woff', weight: '700', style: 'normal' },
    { path: './AeonikMono-Bold.ttf', weight: '700', style: 'normal' },
  ]})

export { sans, mono }
