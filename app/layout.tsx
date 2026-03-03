import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Royal Mail - Technology Platform Engineering',
  description: 'Organisation Structure & Platform Landscape',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
