"use client"

import { motion } from "framer-motion"
import { ArrowRight, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/contexts/wallet-context"

export default function GetStartedPage() {
  const router = useRouter()
  const { isConnected, connectWallet } = useWallet()

  const handleGetStarted = () => {
    connectWallet()
  }

  const handleStartEarning = () => {
    router.push('/dashboard')
  }

  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <div className="mx-auto max-w-4xl text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight flex flex-col gap-4">
            <span>Earn</span>
            <span className="text-[#00FF95]" style={{ textShadow: '0 0 20px rgba(0, 255, 149, 0.3)' }}>
              $DeTA
            </span>
          </h1>
          
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Contribute high-quality Question & Answer pairs to the DeTA protocol and earn rewards for your knowledge.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handleGetStarted}
              className="rounded-full px-8 py-3 text-base font-medium
                button-gradient-border group text-[#00FF95]
                transition-all duration-300 flex items-center gap-2"
            >
              Connect Wallet
              <Wallet className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {isConnected && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleStartEarning}
                className="rounded-full px-8 py-3 text-base font-medium
                  bg-white text-black group
                  transition-all duration-300 flex items-center gap-2
                  hover:bg-gray-100"
              >
                Start Earning
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* How it Works Section */}
      <div className="mx-auto max-w-3xl px-4">
        <div className="glass-card p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-[#00FF95] text-center mb-8">
            How to Earn $DeTA
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-[#00FF95]/10 flex items-center justify-center text-[#00FF95] font-medium">
                1
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Connect Your Wallet</h3>
                <p className="text-gray-400">
                  Start by connecting your Solana wallet to track your contributions and receive rewards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-[#00FF95]/10 flex items-center justify-center text-[#00FF95] font-medium">
                2
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Submit Q&A Pairs</h3>
                <p className="text-gray-400">
                  Contribute high-quality Solana-related questions and answers. Focus on technical details, 
                  development guides, and common issues.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-[#00FF95]/10 flex items-center justify-center text-[#00FF95] font-medium">
                3
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Earn Rewards</h3>
                <p className="text-gray-400">
                  Get $DeTA tokens for approved submissions. Higher quality contributions and maintaining a good 
                  approval rate will earn you more rewards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-[#00FF95]/10 flex items-center justify-center text-[#00FF95] font-medium">
                4
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Claim Your $DeTA</h3>
                <p className="text-gray-400">
                  Once your submissions are approved, claim your $DeTA tokens directly to your connected wallet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 