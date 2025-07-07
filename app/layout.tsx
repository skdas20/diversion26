import type { Metadata } from 'next'
import './globals.css'
import SteampunkCursor from '../components/steampunk-cursor'
import SteampunkFooter from '../components/footer'
import { Cinzel } from 'next/font/google'

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Diversion',
  description: 'Welcome to Diversion - Your Ultimate Event Experience',
  generator: 'Diversion',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`overflow-x-hidden ${cinzel.className}`}>
        <SteampunkCursor />
        {children}
        <SteampunkFooter />
      </body>
    </html>
  )
}
