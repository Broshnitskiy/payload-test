import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { Toaster } from 'react-hot-toast'

import { InitTheme } from '@/providers/Theme/InitTheme'

import './globals.css'
import { UserProvider } from '@/context'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <UserProvider>{children}</UserProvider>
        <Toaster />
      </body>
    </html>
  )
}
