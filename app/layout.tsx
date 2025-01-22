import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { WalletProvider } from "@/contexts/wallet-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "DeAI Platform",
  description: "Decentralized AI Training Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
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
        </WalletProvider>
      </body>
    </html>
  )
}

