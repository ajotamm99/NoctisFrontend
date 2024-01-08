import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from './(components)/Nav' // Importa el componente Nav
import SessionProvider from '../utils/SessionProvider' // Importa el componente SessionProvider

import { getServerSession } from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Noctis Forum',
  description: 'Generated by amunozmoy',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
        <Nav /> 
        {children}        
        </SessionProvider>
      </body>
    </html>
  )
}
