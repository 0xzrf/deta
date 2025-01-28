"use client"

import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ExampleModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'question' | 'answer'
}

export function ExampleModal({ isOpen, onClose, type }: ExampleModalProps) {
  const examples = {
    question: [
      {
        title: "Technical Implementation",
        example: "How do I implement a custom SPL token with transfer fees in Solana using Anchor framework?",
      },
      {
        title: "Error Handling",
        example: "What are common solutions for the 'Transaction simulation failed' error when interacting with Solana programs?",
      },
      {
        title: "Performance Optimization",
        example: "What are the best practices for optimizing compute units usage in Solana smart contracts?",
      }
    ],
    answer: [
      {
        title: "Detailed Implementation",
        example: "To implement a custom SPL token with transfer fees:\n\n1. Create a new token using spl-token\n2. Implement the transfer hook feature\n3. Add fee calculation logic\n4. Test thoroughly with different scenarios\n\nHere's a code example:\n[code example would go here]",
      },
      {
        title: "Comprehensive Solution",
        example: "The 'Transaction simulation failed' error typically occurs due to:\n\n1. Insufficient funds\n2. Invalid account permissions\n3. Compute budget exceeded\n\nTo resolve:\n- Check account balances\n- Verify all required signers\n- Monitor compute units",
      },
      {
        title: "Best Practices",
        example: "To optimize compute units in Solana programs:\n\n1. Minimize account lookups\n2. Use efficient data structures\n3. Implement caching where possible\n4. Batch operations when feasible\n\nExample optimization: [specific example]",
      }
    ]
  }

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
            
            <h2 className="text-xl font-medium text-[#00FF95] mb-6">
              Example {type === 'question' ? 'Questions' : 'Answers'}
            </h2>
            
            <div className="space-y-6">
              {examples[type].map((item, index) => (
                <div key={index} className="rounded-lg bg-black/20 p-4">
                  <h3 className="text-sm font-medium text-[#00FF95] mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{item.example}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 