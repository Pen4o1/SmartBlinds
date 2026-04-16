import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

const siteUrl = 'https://smart-blinds-zeta.vercel.app'

export const metadata: Metadata = {
  title: 'SmartBlinds — Autonomous Blinds Powered by Solar Intelligence',
  description: 'SmartBlinds automatically adjust to sunlight using smart sensors and solar-powered logic. Experience the future of home automation with energy-efficient, intelligent window blinds.',
  keywords: ['smart blinds', 'autonomous blinds', 'solar powered', 'home automation', 'energy efficient', 'smart home'],
  generator: 'v0.app',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'SmartBlinds — Solar-Powered Autonomous Blinds',
    description: 'Blinds that think for themselves. Automatically adjust to sunlight using smart sensors and solar-powered logic.',
    url: siteUrl,
    siteName: 'SmartBlinds',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartBlinds — Solar-Powered Autonomous Blinds',
    description: 'Blinds that think for themselves. Automatically adjust to sunlight using smart sensors and solar-powered logic.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f7f4' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-background">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
