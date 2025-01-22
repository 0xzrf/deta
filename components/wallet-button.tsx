"use client"

import { useWallet } from "@/contexts/wallet-context"

export function WalletButton() {
  const { walletAddress, isConnected, connectWallet, disconnectWallet } = useWallet()

  return (
    <button
      onClick={isConnected ? disconnectWallet : connectWallet}
      className="button-gradient rounded-md px-5 py-2 text-sm font-medium text-white shadow-lg"
    >
      {isConnected ? (
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span>{walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</span>
        </div>
      ) : (
        "Connect Wallet"
      )}
    </button>
  )
} 