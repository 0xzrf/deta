import React from 'react';
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import AppWalletProvider from "@/components/Solana/AppWalletProvider"
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "DeTA",
  description: "Decentralized Training Assistant",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>

            <Script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js" strategy="afterInteractive" />
            <Script src="https://files.bpcontent.cloud/2025/02/08/14/20250208141525-8ZDS7NKA.js" strategy="afterInteractive" />
        <AppWalletProvider>

          <div className="relative min-h-screen bg-background">
            {/* Gradient background */}
            <div className="fixed inset-0 bg-gradient-to-tr from-background via-muted to-background opacity-50" />



            {/* Content */}
            <div className="relative">
              <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                <Navigation />
                <main className="py-8">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </AppWalletProvider>
      </body>
    </html>
  )
}

