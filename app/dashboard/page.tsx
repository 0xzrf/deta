"use client"

import { useState } from "react"
import { TrainingForm } from "@/components/training-form"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { ModelProgress } from "@/components/model-progress"
import { MessageSquareText, TrendingUp, HelpCircle, BarChart3, Activity, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type TabType = 'contribute' | 'performance' | 'help' | 'analytics' | 'progress'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('contribute')
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false)

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
      id: 'help',
      label: 'Help',
      icon: <HelpCircle className="h-4 w-4" />
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: <Activity className="h-4 w-4" />
    }
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
                            <span className="font-medium text-white">Prioritize Solana-Related Data</span><br />
                            Submissions focused on Solana will earn higher <span className="text-[#00FF95] font-semibold">$DeTA rewards</span>. Examples include smart contract snippets, DeFi protocols, RPC FAQs, and Solana documentation.
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
                            <span className="font-medium text-white">Leverage Data Scraping</span><br />
                            Where permissible, scraping data allows for a higher volume of Q&A pairs, increasing your contribution and rewards.
                          </p>
                          <a 
                            href="https://github.com/yourusername/your-repo/docs/scraping-guide.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#00FF95]/80 hover:text-[#00FF95] transition-colors inline-flex items-center gap-1 mt-1"
                          >
                            Learn How to Scrape ↗
                          </a>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Focus on Quality and Depth</span><br />
                            High-quality, comprehensive, and well-organized data submissions will earn greater <span className="text-[#00FF95] font-semibold">$DeTA rewards</span>. Aim for exhaustive and precise information.
                          </p>
                          <a 
                            href="https://github.com/yourusername/your-repo/docs/quality-guidelines.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#00FF95]/80 hover:text-[#00FF95] transition-colors inline-flex items-center gap-1 mt-1"
                          >
                            Learn More ↗
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
            <div className="glass-card p-6">
              <h1 className="text-2xl font-bold text-gradient mb-6">Performance Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Stats */}
                <div className="space-y-4">
                  <div className="rounded-lg bg-black/20 p-4 border border-white/5">
                    <h2 className="text-lg font-medium text-gradient mb-4">Your Stats</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Submissions</span>
                        <span className="text-white">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Approval Rate</span>
                        <span className="text-success">90.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Earned</span>
                        <span className="text-gradient">2,450 $DeTA</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Achievements */}
                <div className="space-y-4">
                  <div className="rounded-lg bg-black/20 p-4 border border-white/5">
                    <h2 className="text-lg font-medium text-gradient mb-4">Achievements</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Top Contributor</span>
                        <span className="text-success">Level 3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Quality Master</span>
                        <span className="text-success">95%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Support Chatbot */}
              <div className="glass-card p-6">
                <h2 className="text-lg font-medium text-gradient mb-4">Support Assistant</h2>
                <div className="rounded-lg bg-black/20 p-4 border border-white/5 h-[500px]">
                  {/* Add your AI chatbot component here */}
                  <div className="text-gray-400 text-center mt-20">
                    AI Support Assistant Coming Soon
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

          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'progress' && <ModelProgress />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 