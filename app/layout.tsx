import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { WalletProvider } from "@/contexts/wallet-context"
import { TrainingStatsProvider } from "@/contexts/training-stats-context"
import { SupportWidget } from "@/components/SupportWidget"

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
  const user = {
    id: "user-id", // Replace with actual user ID
    name: "User Name", // Replace with actual user name
    email: "user@example.com", // Replace with actual user email
    createdAt: 1704067200, // Replace with actual user sign-up date in Unix timestamp
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <TrainingStatsProvider>
            <div className="relative min-h-screen bg-background">
              {/* Gradient background */}
              <div className="fixed inset-0 bg-gradient-to-tr from-background via-muted to-background opacity-50" />
              
              {/* Content */}
              <div className="relative">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                  <Navigation />
                  <main className="py-8">
                    <SupportWidget user={user} />
                    {children}
                  </main>
                </div>
              </div>
            </div>
          </TrainingStatsProvider>
        </WalletProvider>
      </body>
    </html>
  )
}

