"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"

export function WalletButton() {
  const { connected, disconnect, publicKey } = useWallet()
  const {setVisible} = useWalletModal()


  return (
    <button
      onClick={() => {
        if (connected) {
          disconnect()
        } else {
          setVisible(true)
        }
      }}
      className="button-gradient rounded-md px-5 py-2 text-sm font-medium text-white shadow-lg"
    >
      {connected ? (
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span>{publicKey?.toString().slice(0, 6)}...{publicKey?.toString().slice(-4)}</span>
        </div>
      ) : (
        "Connect Wallet"
      )}
    </button>
  )
} 