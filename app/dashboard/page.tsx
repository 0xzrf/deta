"use client"

import { useState, useEffect } from "react"
import { TrainingForm } from "@/components/training-form"
import { MessageSquareText, TrendingUp, HelpCircle, ChevronDown, CheckCircle, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTrainingStats } from "@/contexts/training-stats-context"
import { useWallet } from "@/contexts/wallet-context"
import { LeaderboardModal } from "@/components/leaderboard-modal"

type TabType = 'contribute' | 'performance' | 'chat'

interface Submission {
  id: string
  user: string
  status: 'pending' | 'approved' | 'rejected'
  timestamp: Date
  reward?: number
  estimatedReward?: number
  question: string
  category: 'Development' | 'DeFi' | 'NFT' | 'General'
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('contribute')
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false)
  const { stats } = useTrainingStats()
  const { wallet } = useWallet()
  const [globalSubmissions, setGlobalSubmissions] = useState<Submission[]>([])
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showMultiplierInfo, setShowMultiplierInfo] = useState(false)
  const [activeFeed, setActiveFeed] = useState<'global' | 'personal'>('global')

  // Function to generate a random submission
  const generateSubmission = (): Submission => ({
    id: Math.random().toString(36).substr(2, 9),
    user: `${Math.random().toString(36).substr(2, 12)}`,
    status: Math.random() > 0.3 ? 'pending' : Math.random() > 0.5 ? 'approved' : 'rejected',
    timestamp: new Date(),
    reward: Number((Math.random() * 10).toFixed(2)),
    estimatedReward: Number((Math.random() * 10).toFixed(2)),
    question: `Question about ${['Smart Contracts', 'Token Standards', 'RPC Nodes', 'Wallet Integration'][Math.floor(Math.random() * 4)]}`,
    category: ['Development', 'DeFi', 'NFT', 'General'][Math.floor(Math.random() * 4)] as Submission['category']
  })

  // Simulate real-time updates
  useEffect(() => {
    // Initial submissions
    setGlobalSubmissions(Array.from({ length: 10 }, generateSubmission))

    // Add new submissions periodically
    const addInterval = setInterval(() => {
      setGlobalSubmissions(prev => [generateSubmission(), ...prev].slice(0, 20))
    }, 5000)

    // Update pending submissions
    const updateInterval = setInterval(() => {
      setGlobalSubmissions(prev => prev.map(sub => {
        if (sub.status === 'pending' && Math.random() > 0.7) {
          return {
            ...sub,
            status: Math.random() > 0.2 ? 'approved' : 'rejected',
            reward: sub.estimatedReward
          }
        }
        return sub
      }))
    }, 3000)

    return () => {
      clearInterval(addInterval)
      clearInterval(updateInterval)
    }
  }, [])

  const tabs = [
    {
      id: 'contribute',
      label: 'Contribute',
      icon: <MessageSquareText className="h-4 w-4" />
    },
    {
      id: 'performance',
      label: 'Your Performance',
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: <HelpCircle className="h-4 w-4" />
    },
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="glass-card p-2">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {tabs.slice(0, 3).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${activeTab === tab.id 
                    ? 'bg-success/10 text-success' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex space-x-1">
            {tabs.slice(3).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${activeTab === tab.id 
                    ? 'bg-success/10 text-success' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'contribute' && (
            <div className="space-y-6">
              {/* Quick How To */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-medium text-[#00FF95] mb-4">How To Earn $DeTA</h2>
                <p className="text-gray-400 leading-relaxed">
                  Submit high-quality Q&A pairs about Solana development, ecosystem, and technical concepts. 
                  Each approved submission earns you $DeTA tokens, with rewards varying based on quality and depth. 
                  Focus on technical accuracy and completeness to maximize your earnings. 
                  Maintain a high approval rate to unlock bonus multipliers.
                </p>
              </div>
              
              {/* Guidelines Section */}
              <div className="glass-card">
                <button
                  onClick={() => setIsGuidelinesOpen(!isGuidelinesOpen)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left"
                >
                  <h2 className="text-base font-medium text-[#00FF95]">Submission Guidelines</h2>
                  <ChevronDown 
                    className={`h-4 w-4 text-[#00FF95] transition-transform duration-200 
                      ${isGuidelinesOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {isGuidelinesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-4">
                        <div className="space-y-1">
                          <p className="text-gray-300">
                            <span className="font-medium text-white">What to Submit</span><br />
                            Share your knowledge about Solana! Write questions and answers about using Solana, common problems, or how things work. The more helpful your content is, the more <span className="text-[#00FF95] font-semibold">$DeTA</span> you&apos;ll earn.
                          </p>
                          <a 
                            href="https://github.com/yourusername/your-repo/docs/solana-guidelines.md" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#00FF95]/80 hover:text-[#00FF95] transition-colors inline-flex items-center gap-1 mt-1"
                          >
                            More Info ↗
                          </a>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Quality Tips</span><br />
                            Make your answers clear and complete. Include examples when possible. The better your answers help others, the more rewards you&apos;ll get!
                          </p>
                          <a 
                            href="https://github.com/yourusername/your-repo/docs/writing-tips.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#00FF95]/80 hover:text-[#00FF95] transition-colors inline-flex items-center gap-1 mt-1"
                          >
                            Writing Tips ↗
                          </a>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Earning More</span><br />
                            Keep submitting good content and maintain a high approval rate. The more your submissions get approved, the more <span className="text-[#00FF95] font-semibold">$DeTA</span> you&apos;ll earn with bonus multipliers!
                          </p>
                          <a 
                            href="https://github.com/yourusername/your-repo/docs/rewards-guide.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#00FF95]/80 hover:text-[#00FF95] transition-colors inline-flex items-center gap-1 mt-1"
                          >
                            Rewards Guide ↗
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <TrainingForm />
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              {/* Section 1: User Performance Overview */}
              <div className="glass-card p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gradient mb-6">Performance Dashboard</h1>
                
                {/* Wallet & Basic Stats */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="rounded-lg bg-black/20 p-4 border border-white/5">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium text-white">Your Wallet</h2>
                      <p className="text-sm text-gray-400">
                        {wallet?.publicKey?.toString().slice(0, 4)}...
                        {wallet?.publicKey?.toString().slice(-4)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-black/20 p-4">
                      <p className="text-sm text-gray-400">Total Submissions</p>
                      <p className="text-2xl font-bold text-white mt-1">{stats.submittedPairs}</p>
                    </div>
                    <div className="rounded-lg bg-black/20 p-4">
                      <p className="text-sm text-gray-400">Approved Pairs</p>
                      <p className="text-2xl font-bold text-success mt-1">
                        {stats.approvedPairs} ({stats.approvalRate}%)
                      </p>
                    </div>
                    <div className="rounded-lg bg-black/20 p-4">
                      <p className="text-sm text-gray-400">Global Rank</p>
                      <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-gradient mt-1">#42</p>
                        <button
                          onClick={() => setShowLeaderboard(true)}
                          className="text-sm text-[#00FF95] hover:text-[#00FF95]/80 transition-colors"
                        >
                          Leaderboard
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Multiplier Section with Dropdown */}
                  <div className="rounded-lg bg-black/20 p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-white">Reward Multipliers</h3>
                        <p className="text-sm text-gray-400 mt-1">Your current multiplier: {stats.approvalMultiplier}x</p>
                      </div>
                      <button
                        onClick={() => setShowMultiplierInfo(!showMultiplierInfo)}
                        className="text-sm text-[#00FF95]"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${showMultiplierInfo ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    
                    {showMultiplierInfo && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-400">
                          <span>95%+ Approval Rate</span>
                          <span className="text-success">2.0x</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>90-94% Approval Rate</span>
                          <span className="text-success">1.75x</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>85-89% Approval Rate</span>
                          <span className="text-success">1.5x</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>80-84% Approval Rate</span>
                          <span className="text-success">1.25x</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 2: Global Submissions Feed */}
                <div className="glass-card p-6 mt-6">
                  <div className="flex flex-col space-y-4">
                    {/* Feed Tabs */}
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium text-gradient">Submissions Feed</h2>
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                        </span>
                        <span className="text-sm text-gray-400">Live</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 border-b border-white/5">
                      <button
                        onClick={() => setActiveFeed('global')}
                        className={`px-4 py-2 text-sm font-medium transition-colors relative
                          ${activeFeed === 'global' 
                            ? 'text-[#00FF95]' 
                            : 'text-gray-400 hover:text-white'}`}
                      >
                        Global Feed
                        {activeFeed === 'global' && (
                          <motion.div 
                            layoutId="feedIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF95]"
                          />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveFeed('personal')}
                        className={`px-4 py-2 text-sm font-medium transition-colors relative
                          ${activeFeed === 'personal' 
                            ? 'text-[#00FF95]' 
                            : 'text-gray-400 hover:text-white'}`}
                      >
                        Your Submissions
                        {activeFeed === 'personal' && (
                          <motion.div 
                            layoutId="feedIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF95]"
                          />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto mt-6">
                    <table className="w-full">
                      <thead>
                        <tr className="text-sm text-gray-400 border-b border-white/5">
                          <th className="pb-2 text-left">Queue ID</th>
                          <th className="pb-2 text-left">Wallet</th>
                          <th className="pb-2 text-left">Category</th>
                          <th className="pb-2 text-left">Question</th>
                          <th className="pb-2 text-left">Status</th>
                          <th className="pb-2 text-left">Processing Time</th>
                          <th className="pb-2 text-right">Rewards</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {(activeFeed === 'global' ? globalSubmissions : 
                          globalSubmissions.filter(sub => 
                            sub.user === wallet?.publicKey?.toString()
                          )
                        ).map((sub) => (
                          <tr key={sub.id} className="text-sm">
                            <td className="py-3 text-gray-300">#{sub.id}</td>
                            <td className="py-3 text-gray-300">
                              {sub.user === wallet?.publicKey?.toString() 
                                ? 'You'
                                : `${sub.user.slice(0, 4)}...${sub.user.slice(-4)}`
                              }
                            </td>
                            <td className="py-3">
                              <span className={`
                                px-2 py-1 rounded-full text-xs
                                ${sub.category === 'Development' ? 'bg-purple-500/10 text-purple-400' :
                                  sub.category === 'DeFi' ? 'bg-blue-500/10 text-blue-400' :
                                  sub.category === 'NFT' ? 'bg-pink-500/10 text-pink-400' :
                                  'bg-gray-500/10 text-gray-400'}
                              `}>
                                {sub.category}
                              </span>
                            </td>
                            <td className="py-3 text-gray-300 truncate max-w-[200px]">
                              {sub.question}
                            </td>
                            <td className="py-3">
                              <span className={`
                                inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs
                                ${sub.status === 'approved' 
                                  ? 'bg-success/10 text-success' 
                                  : sub.status === 'pending'
                                  ? 'bg-yellow-500/10 text-yellow-500'
                                  : 'bg-red-500/10 text-red-500'
                                }
                              `}>
                                {sub.status === 'approved' && <CheckCircle className="h-3 w-3" />}
                                {sub.status === 'pending' && <Clock className="h-3 w-3 animate-pulse" />}
                                {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 text-gray-400">
                              {sub.status === 'approved' && `${Math.floor((Date.now() - sub.timestamp.getTime()) / 1000)}s ago`}
                              {sub.status === 'pending' && 'ETA: 2min'}
                              {sub.status === 'rejected' && '-'}
                            </td>
                            <td className="py-3 text-right">
                              {sub.status === 'approved' && <span className="text-gradient">{sub.reward} $DeTA</span>}
                              {sub.status === 'pending' && (
                                <span className="text-gray-400">
                                  ~{sub.estimatedReward} $DeTA
                                  <span className="text-xs ml-1">(est.)</span>
                                </span>
                              )}
                              {sub.status === 'rejected' && '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Leaderboard Modal */}
              <LeaderboardModal 
                isOpen={showLeaderboard}
                onClose={() => setShowLeaderboard(false)}
              />
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Support Chatbot */}
              <div className="glass-card p-6">
                <h2 className="text-lg font-medium text-gradient mb-4">DeTA Chat</h2>
                <div className="rounded-lg bg-black/20 p-4 border border-white/5 h-[500px]">
                  {/* Add your AI chatbot component here */}
                  <div className="text-gray-400 text-center mt-20">
                    DeTA Chat Coming Soon
                  </div>
                </div>
              </div>

              {/* Guidelines */}
              <div className="glass-card p-6">
                <h2 className="text-lg font-medium text-gradient mb-4">Submission Guidelines</h2>
                <div className="rounded-lg bg-black/20 p-4 border border-white/5 space-y-4">
                  <div>
                    <h3 className="text-success font-medium mb-2">Earning Higher Rewards</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Focus on high-quality, accurate data submissions</li>
                      <li>• Maintain consistent formatting and structure</li>
                      <li>• Include detailed context where relevant</li>
                      <li>• Submit data in batches for efficiency</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-success font-medium mb-2">Solana-Specific Guidelines</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Include transaction-specific details</li>
                      <li>• Focus on common Solana operations</li>
                      <li>• Document error scenarios and solutions</li>
                      <li>• Provide context for different network versions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 