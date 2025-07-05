import Providers from '@/components/Providers'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Henri Maronen Photography',
  description:
    'Exploring the raw beauty of landscapes and the stories they tell',
  keywords: ['photography', 'landscape', 'nature', 'portfolio'],
  authors: [{ name: 'Henri Maronen' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
