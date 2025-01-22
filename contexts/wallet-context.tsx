"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface WalletContextType {
  walletAddress: string | null
  isConnected: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const connectWallet = async () => {
    try {
      // Implement your Solana wallet connection logic here
      // For example:
      // const provider = window.solana;
      // const response = await provider.connect();
      // setWalletAddress(response.publicKey.toString());
      
      // Temporary mock implementation:
      const mockAddress = "GH7ygR...kXYZ"
      setWalletAddress(mockAddress)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const disconnectWallet = () => {
    // Implement your disconnect logic here
    setWalletAddress(null)
  }

  return (
    <WalletContext.Provider 
      value={{
        walletAddress,
        isConnected: !!walletAddress,
        connectWallet,
        disconnectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
} 