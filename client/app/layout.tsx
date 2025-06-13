import './globals.css'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Nav from '@/components/Nav/index'
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TechMeet | Discover, Book & Attend Tech Events Near You',
  description: 'TechMeet is your gateway to the world of tech events. Explore upcoming meetups, conferences, and workshops in your area. Sign in with Google, build your profile, and start networking with fellow tech enthusiasts.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <Providers>
        <body className={`${inter.className} dark`}>
          <Nav />
          <main className="pt-18">{children}</main>
        </body>
      </Providers>
    </html>
  )
}
