import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TaskPing | Cosmic Task Management',
  description: 'Experience the future of task management with TaskPing. Organize, prioritize, and conquer your goals with an intuitive cosmic interface.',
  generator: 'v0.app',
  themeColor: '#FF9FFC',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
