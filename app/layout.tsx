import type { Metadata } from 'next'
import './globals.css'
import SteampunkCursor from '../components/steampunk-cursor'
import SteampunkFooter from '../components/footer'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SteampunkCursor />
        {children}
        <SteampunkFooter />
      </body>
    </html>
  )
}
