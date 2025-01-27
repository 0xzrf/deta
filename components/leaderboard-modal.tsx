"use client"

import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface LeaderboardModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
  const topContributors = [
    {
      rank: 1,
      wallet: "7x8d...9f3e",
      pairs: 1256,
      rewards: 4521.5,
      approvalRate: 98
    },
    // Add more mock data...
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl glass-card p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-2xl font-bold text-gradient mb-6">Top Contributors</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-gray-400 border-b border-white/5">
                    <th className="pb-4 text-left">Rank</th>
                    <th className="pb-4 text-left">Wallet</th>
                    <th className="pb-4 text-right">Q&A Pairs</th>
                    <th className="pb-4 text-right">$DeTA Earned</th>
                    <th className="pb-4 text-right">Approval Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {topContributors.map((contributor) => (
                    <tr key={contributor.rank} className="text-sm">
                      <td className="py-4 text-gray-300">#{contributor.rank}</td>
                      <td className="py-4 text-gray-300">{contributor.wallet}</td>
                      <td className="py-4 text-right text-gray-300">{contributor.pairs}</td>
                      <td className="py-4 text-right text-gradient">{contributor.rewards}</td>
                      <td className="py-4 text-right text-success">{contributor.approvalRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 