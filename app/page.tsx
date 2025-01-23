'use client'

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Clock, ArrowRight, ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface Submission {
  id: string
  user: string
  timestamp: Date
  pairs: number
  approvalRate: number
  reward: number
  status: 'pending' | 'approved'
}

const rotatingWords = ["Datasets", "Models", "Frameworks", "Toolkits", "AI"]

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const router = useRouter()

  // Extract the complex expression into a memoized function
  const generateSubmission = useCallback((): Submission => ({
    id: Math.random().toString(36).substr(2, 9),
    user: `user_${Math.random().toString(36).substr(2, 6)}`,
    timestamp: new Date(),
    pairs: Math.floor(Math.random() * 50) + 1,
    approvalRate: Math.floor(Math.random() * 30) + 70,
    reward: Number((Math.random() * 10).toFixed(2)),
    status: Math.random() > 0.3 ? 'approved' : 'pending'
  }), [])

  // Rotate words every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Simulate live submissions
  useEffect(() => {
    const interval = setInterval(() => {
      setSubmissions(prev => [generateSubmission(), ...prev].slice(0, 10))
    }, 3000)

    return () => clearInterval(interval)
  }, [generateSubmission])

  return (
    <div className="relative z-10">
      {/* Updated Hero Section */}
      <div className="mx-auto max-w-4xl text-center py-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight flex flex-col gap-4">
          <span>Decentralized</span>
          <AnimatePresence mode='wait'>
            <motion.span
              key={rotatingWords[currentWordIndex]}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ 
                duration: 0.2,
                ease: "easeOut"
              }}
              className="inline-block text-[#00FF95]"
              style={{
                textShadow: '0 0 20px rgba(0, 255, 149, 0.3)'
              }}
            >
              {rotatingWords[currentWordIndex]}
            </motion.span>
          </AnimatePresence>
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          Join the future of decentralized training. Contribute to the network and earn $DeTA rewards.
        </p>

        {/* Get Started Button */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-6 mb-12 rounded-full px-8 py-3 text-base font-medium
              button-gradient-border group text-[#00FF95]
              transition-all duration-300 flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => router.push('/swap')}
            className="mt-6 mb-12 rounded-full px-8 py-3 text-base font-medium
              button-gradient-border group text-[#00FF95]
              transition-all duration-300 flex items-center gap-2"
          >
            Buy $DeTA
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Platform Metrics */}
      <div className="mx-auto max-w-3xl -mt-24 mb-12">
        <div className="relative px-6 py-4 rounded-2xl backdrop-blur-sm
          bg-black/20"
        >
          <div className="grid grid-cols-3 divide-x divide-[#00FF95]/10">
            <div className="px-6 text-center">
              <p className="text-2xl font-bold">156,842</p>
              <h3 className="text-xs text-gray-400">Total Submissions</h3>
              <a href="#" className="text-xs text-[#00FF95]/80 hover:text-[#00FF95] transition-colors">Know More ↗</a>
            </div>
            
            <div className="px-6 text-center">
              <p className="text-2xl font-bold text">24,156</p>
              <h3 className="text-xs text-gray-400">Active Users</h3>
              <a href="#" className="text-xs text-[#00FF95]/80 hover:text-[#00FF95] transition-colors">Know More ↗</a>
            </div>
            
            <div className="px-6 text-center">
              <p className="text-2xl font-bold text-[#00FF95]">1.25M</p>
              <h3 className="text-xs text-gray-400">$DeTA Distributed</h3>
              <a href="#" className="text-xs text-[#00FF95]/80 hover:text-[#00FF95] transition-colors">Know More ↗</a>
            </div>
          </div>
        </div>
      </div>

      {/* Updated Live Feed Section with colored shake animation */}
      <div className="mx-auto max-w-2xl">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-6">Live Training Feed</h2>
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {submissions.map((submission) => (
                <motion.div
                  key={submission.id}
                  initial={{ 
                    opacity: 0, 
                    y: -20,
                    boxShadow: '0 0 0 rgba(0, 255, 149, 0)'
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    x: [0, -3, 3, -3, 3, 0],
                    boxShadow: [
                      '0 0 0 rgba(0, 255, 149, 0)',
                      '0 0 20px rgba(0, 255, 149, 0.3)',
                      '0 0 0 rgba(0, 255, 149, 0)'
                    ]
                  }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.5,
                    x: { 
                      duration: 0.4, 
                      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                      ease: "easeInOut"
                    },
                    boxShadow: {
                      duration: 1,
                      repeat: 0
                    }
                  }}
                  className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/5
                    hover:border-[#00FF95]/20 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                      {submission.status === 'approved' ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-400 animate-pulse" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{submission.user}</p>
                      <p className="text-xs text-gray-400">
                        {submission.pairs} pairs submitted
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      <span className="inline-flex items-center gap-1">
                        <span className="text-success">+</span>
                        <span className="text-gradient font-bold glow-text">
                          {submission.reward}
                        </span>
                        <span className="text-xs text-success/80">$DeTA</span>
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">
                      {submission.approvalRate}% approval
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

