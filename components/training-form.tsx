"use client"

import { useState, useEffect, useRef } from "react"
import { 
  ChevronDown, Plus, X, Wallet, Info, Upload,
  Clock, Loader2, CheckCircle, XCircle, Brain, Filter, Award
} from "lucide-react"
import { ApprovalRateModal } from "./approval-rate-modal"
import { ExampleModal } from "./example-modal"
import { AnimatePresence, motion } from "framer-motion"
import { SubmissionProcessing } from "./SubmissionProcessing"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"

interface QAPair {
  id: number
  question: string
  answer: string
  isCollapsed: boolean
  estimatedReward?: number
  validationStatus?: 'pending' | 'processing' | 'accepted' | 'rejected' | undefined
  validationMessage?: string
}

interface FileUploadState {
  file: File | null
  preview: QAPair[] | null
  error: string | null
}

interface ProcessingStep {
  id: number
  title: string
  description: string
  icon: JSX.Element
  status: 'pending' | 'processing' | 'completed'
}

export function TrainingForm() {
  const { connected } = useWallet()
  const {setVisible} = useWalletModal()

  const connectWallet = () => {
    setVisible(true)
  }

  const [qaPairs, setQaPairs] = useState<QAPair[]>([{ 
    id: 1, 
    question: "", 
    answer: "", 
    isCollapsed: false,
    estimatedReward: 0
  }])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fileUpload, setFileUpload] = useState<FileUploadState>({
    file: null,
    preview: null,
    error: null
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [submissionResults, setSubmissionResults] = useState<{
    acceptedPairs: number
    totalReward: number
    qualityScore: number
  } | null>(null)
  const [currentStep] = useState(0)
  const [processingSteps] = useState<ProcessingStep[]>([
    {
      id: 1,
      title: "Initializing AI Filter",
      description: "Preparing to analyze submissions",
      icon: <Brain className="h-6 w-6" />,
      status: 'pending'
    },
    {
      id: 2,
      title: "Quality Analysis",
      description: "Analyzing submissions",
      icon: <Filter className="h-6 w-6" />,
      status: 'pending'
    },
    {
      id: 3,
      title: "Calculating Rewards",
      description: "Determining final rewards based on quality",
      icon: <Award className="h-6 w-6" />,
      status: 'pending'
    }
  ])
  const [showUnlockInfo, setShowUnlockInfo] = useState(false)
  const [showLatestSessions, setShowLatestSessions] = useState(false)
  const [showExampleModal, setShowExampleModal] = useState<'question' | 'answer' | null>(null)
  const [totalEstimatedReward, setTotalEstimatedReward] = useState(0)

  // Calculate reward based on content length, complexity, and random bonus
  const calculateReward = (question: string, answer: string): number => {
    if (!question.trim() || !answer.trim()) return 0
    
    const baseReward = 0.2 // Minimum reward
    const maxRandomBonus = 1.8 // Maximum additional reward
    const randomBonus = Math.random() * maxRandomBonus // Random bonus between 0 and 1.8
    
    // Length and complexity multipliers
    const lengthMultiplier = Math.min((question.length + answer.length) / 200, 1)
    const complexityMultiplier = Math.min(
      (question.split(' ').length + answer.split(' ').length) / 20,
      1
    )
    
    // Final reward calculation: base + random bonus, adjusted by quality multipliers
    const reward = (baseReward + randomBonus) * 
      (0.7 + (0.3 * lengthMultiplier * complexityMultiplier)) // Quality affects 30% of reward
    
    return Number(reward.toFixed(2))
  }

  // Update rewards whenever Q&A content changes
  useEffect(() => {
    setQaPairs(pairs => 
      pairs.map(pair => ({
        ...pair,
        estimatedReward: calculateReward(pair.question, pair.answer)
      }))
    )
  }, [qaPairs.map(p => p.question + p.answer).join('')])

  useEffect(() => {
    const calculateTotal = () => {
      const total = qaPairs.reduce((sum, pair) => sum + (pair.estimatedReward || 0), 0)
      setTotalEstimatedReward(total)
    }
    calculateTotal()
  }, [qaPairs])

  // Calculate approval rate based on validated pairs
  const calculateApprovalRate = () => {
    const validatedPairs = qaPairs.filter(p => p.validationStatus)
    if (validatedPairs.length === 0) return 0
    
    const approvedPairs = validatedPairs.filter(p => p.validationStatus === 'accepted')
    return Math.round((approvedPairs.length / validatedPairs.length) * 100)
  }

  // Calculate reward multiplier based on approval rate
  const calculateMultiplier = () => {
    const rate = calculateApprovalRate()
    if (rate >= 95) return 2.0
    if (rate >= 90) return 1.75
    if (rate >= 85) return 1.5
    if (rate >= 80) return 1.25
    return 1.0
  }

  const handleAddPair = () => {
    const lastPair = qaPairs[qaPairs.length - 1]
    if (!lastPair.question.trim() || !lastPair.answer.trim()) {
      alert("Please fill in the current Q&A pair before adding a new one")
      return
    }

    // Collapse the current pair and add a new one
    setQaPairs([
      ...qaPairs.slice(0, -1), // Keep all pairs except the last one
      { ...lastPair, isCollapsed: true }, // Collapse the last pair
      { 
        id: Date.now(), 
        question: "", 
        answer: "", 
        isCollapsed: false 
      }
    ])
  }

  const handleKeyPress = (e: React.KeyboardEvent, pairId: number) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const pair = qaPairs.find(p => p.id === pairId)
      if (pair && pair.question.trim() && pair.answer.trim()) {
        setQaPairs(qaPairs.map(p => 
          p.id === pairId ? { ...p, isCollapsed: true } : p
        ))
      }
    }
  }

  const toggleCollapse = (pairId: number) => {
    setQaPairs(qaPairs.map(pair =>
      pair.id === pairId ? { ...pair, isCollapsed: !pair.isCollapsed } : pair
    ))
  }

  const handleChange = (id: number, field: 'question' | 'answer', value: string) => {
    setQaPairs(qaPairs.map(pair =>
      pair.id === id ? { ...pair, [field]: value } : pair
    ))
  }

  const removePair = (id: number) => {
    setQaPairs(qaPairs.filter(pair => pair.id !== id))
  }

  const claimRewards = async () => {
    if (!connected) {
      alert("Please connect your wallet to claim rewards")
      return
    }
    // Implement your reward claiming logic here
  }

  // Calculate approval rate multiplier
  const getApprovalRateMultiplier = (rate: number): number => {
    if (rate >= 95) return 2.0
    if (rate >= 85) return 1.5
    if (rate >= 70) return 1.2
    return 1.0
  }

  function ValidationStatus({ status, message }: { 
    status?: 'pending' | 'processing' | 'accepted' | 'rejected'
    message?: string 
  }) {
    if (!status) return null

    const statusConfig = {
      pending: {
        icon: <Clock className="h-4 w-4 text-gray-400" />,
        text: 'Pending validation',
        color: 'text-gray-400'
      },
      processing: {
        icon: <Loader2 className="h-4 w-4 text-[--success] animate-spin" />,
        text: 'Validating...',
        color: 'text-[--success]'
      },
      accepted: {
        icon: <CheckCircle className="h-4 w-4 text-green-400" />,
        text: 'Accepted',
        color: 'text-green-400'
      },
      rejected: {
        icon: <XCircle className="h-4 w-4 text-red-400" />,
        text: 'Rejected',
        color: 'text-red-400'
      }
    }

    const config = statusConfig[status]

    return (
      <div className={`flex items-center gap-2 ${config.color}`}>
        {config.icon}
        <span className="text-sm font-medium">{message || config.text}</span>
      </div>
    )
  }

  const handleSubmit = async () => {
    if (!connected) {
      await connectWallet()
      return
    }

    const submittablePairs = qaPairs.filter(pair => 
      pair.question.trim() && pair.answer.trim()
    )

    if (submittablePairs.length === 0 && !fileUpload.preview) {
      alert("Please add at least one Q&A pair or upload a file before submitting")
      return
    }

    setIsProcessing(true)

    // Set all pairs to pending
    setQaPairs(current => current.map(pair => ({
      ...pair,
      validationStatus: pair.question.trim() && pair.answer.trim() ? 'pending' : undefined
    })))

    // Process each pair
    for (let i = 0; i < qaPairs.length; i++) {
      const pair = qaPairs[i]
      if (!pair.question.trim() || !pair.answer.trim()) continue

      // Update status to processing
      setQaPairs(current => current.map(p => 
        p.id === pair.id ? { ...p, validationStatus: 'processing' } : p
      ))

      // Simulate AI validation
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simulate validation result
      const isAccepted = Math.random() > 0.2 // 80% acceptance rate
      const validationMessage = isAccepted 
        ? 'Meets quality standards'
        : 'Low quality or duplicate content'

      setQaPairs(current => current.map(p => 
        p.id === pair.id ? {
          ...p,
          validationStatus: isAccepted ? 'accepted' : 'rejected',
          validationMessage
        } : p
      ))
    }

    // Calculate final results
    const results = {
      acceptedPairs: qaPairs.filter(p => p.validationStatus === 'accepted').length,
      totalReward: qaPairs.reduce((sum, p) => 
        p.validationStatus === 'accepted' ? sum + (p.estimatedReward || 0) : sum, 0
      ),
      qualityScore: Math.round(
        (qaPairs.filter(p => p.validationStatus === 'accepted').length / 
        qaPairs.filter(p => p.validationStatus).length) * 100
      )
    }

    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmissionResults(results)
    setIsProcessing(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Training Form - Takes up 3 columns */}
        <div className="lg:col-span-3 glass-card p-6">
          <h2 className="text-xl font-medium text-[#00FF95] mb-6">Submit Training Data</h2>
          {isProcessing ? (
            <SubmissionProcessing
              steps={processingSteps}
              currentStep={currentStep}
              results={submissionResults}
            />
          ) : (
            <>
              {/* File Upload Section */}
              <div className="mb-6">
                <div className="rounded-lg border-2 border-dashed border-white/10 p-6 text-center hover:border-white/20 transition-colors">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".json,.csv,.txt"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-2 w-full"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-400">
                      Upload a file or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports JSON, CSV, TXT
                    </p>
                  </button>
                </div>
              </div>

              {/* Q&A Input Section */}
              <div className="space-y-4">
                {/* Add this compact summary section */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-400">
                      Total Pairs: <span className="text-white font-medium">{qaPairs.length}</span>
                    </div>
                    <div className="w-px h-4 bg-white/10"></div>
                    <div className="text-sm text-gray-400">
                      Estimated: <span className="text-gradient font-medium">{totalEstimatedReward.toFixed(1)} $DeTA</span>
                    </div>
                  </div>
                  <button
                    onClick={handleAddPair}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full
                      bg-[#00FF95]/10 hover:bg-[#00FF95]/20 text-[#00FF95] text-sm
                      transition-all duration-300"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Pair
                  </button>
                </div>

                {qaPairs.map((pair) => (
                  <div
                    key={pair.id}
                    className="rounded-lg border border-white/10 bg-black/20 p-3" // Reduced padding
                  >
                    {pair.isCollapsed ? (
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white truncate">
                            Q: {pair.question}
                          </p>
                          <p className="text-sm text-gray-400 truncate">
                            A: {pair.answer}
                          </p>
                          {pair.validationStatus && (
                            <div className="mt-2">
                              <ValidationStatus 
                                status={pair.validationStatus}
                                message={pair.validationMessage}
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gradient">
                            {pair.estimatedReward?.toFixed(1)} $DeTA
                          </span>
                          <button
                            onClick={() => toggleCollapse(pair.id)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </button>
                          {!isProcessing && (
                            <button
                              onClick={() => removePair(pair.id)}
                              className="p-1 text-gray-400 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-300">
                            Question
                          </label>
                          <button
                            onClick={() => setShowExampleModal('question')}
                            className="text-xs text-[#00FF95] hover:text-[#00FF95]/80"
                          >
                            example
                          </button>
                        </div>
                        <textarea
                          value={pair.question}
                          onChange={(e) => handleChange(pair.id, 'question', e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, pair.id)}
                          className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-2 text-white placeholder-gray-400"
                          placeholder="Enter your question..."
                          rows={2}
                        />
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-300">
                            Answer
                          </label>
                          <button
                            onClick={() => setShowExampleModal('answer')}
                            className="text-xs text-[#00FF95] hover:text-[#00FF95]/80"
                          >
                            example
                          </button>
                        </div>
                        <textarea
                          value={pair.answer}
                          onChange={(e) => handleChange(pair.id, 'answer', e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, pair.id)}
                          className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-2 text-white placeholder-gray-400"
                          placeholder="Enter your answer..."
                          rows={3}
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gradient">
                            Estimated: {pair.estimatedReward?.toFixed(1)} $DeTA
                          </span>
                          <button
                            onClick={() => toggleCollapse(pair.id)}
                            className="rounded-md px-3 py-1 text-sm text-gray-400 hover:text-white"
                          >
                            Collapse
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add this Submit Button section */}
              <div className="mt-8">
                <button
                  onClick={handleSubmit}
                  className="w-full px-6 py-3 rounded-full bg-[#00FF95] text-black
                    font-medium text-lg hover:bg-[#00FF95]/90 transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isProcessing || qaPairs.length === 0}
                  aria-busy={isProcessing}
                  aria-disabled={isProcessing || qaPairs.length === 0}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    `Submit ${qaPairs.length} Pair${qaPairs.length !== 1 ? 's' : ''}`
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Rewards Panel - Takes up 1 column */}
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-xl font-medium text-[#00FF95] mb-4">
            Your Rewards
          </h2>
          
          <div className="space-y-4">
            {/* Total Earned */}
            <div className="rounded-lg bg-black/20 p-4">
              <p className="text-sm text-gray-400">
                Total $DeTA Earned
              </p>
              <p className="text-2xl font-bold text-gradient mt-1">263.4 $DeTA</p>
            </div>
            
            {/* Total Claimed */}
            <div className="rounded-lg bg-black/20 p-4">
              <p className="text-sm text-gray-400">Total $DeTA Claimed</p>
              <p className="text-2xl font-bold text-white mt-1">210.6 $DeTA</p>
            </div>
            
            {/* Locked Amount */}
            <div className="rounded-lg bg-black/20 p-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-400">Unlocks at Next Stage</p>
                <button
                  onClick={() => setShowUnlockInfo(true)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Info className="h-4 w-4" />
                </button>
              </div>
              <p className="text-2xl font-bold text-white mt-1">17.6 $DeTA</p>
            </div>
            
            {/* Available to Claim */}
            <div className="rounded-lg bg-black/20 p-4">
              <p className="text-sm text-gray-400">Claimable $DeTA</p>
              <p className="text-2xl font-bold text-gradient mt-1">35.2 $DeTA</p>
            </div>
            
            <button
              onClick={claimRewards}
              className="w-full rounded-full px-4 py-3 text-base font-medium
                bg-[#00FF95] text-black hover:bg-[#00FF95]/90
                transition-all duration-300 flex items-center justify-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!connected}
            >
              {connected ? (
                <>
                  <Wallet className="h-4 w-4" />
                  Claim 35.2 $DeTA
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4" />
                  Connect Wallet to Claim
                </>
              )}
            </button>

            {/* Latest Sessions Dropdown */}
            <div className="mt-6 rounded-lg bg-black/20">
              <button
                onClick={() => setShowLatestSessions(!showLatestSessions)}
                className="w-full px-4 py-3 flex items-center justify-between text-left"
              >
                <h3 className="text-base font-medium text-[#00FF95]">Latest Sessions</h3>
                <ChevronDown 
                  className={`h-4 w-4 text-[#00FF95] transition-transform duration-200 
                    ${showLatestSessions ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {showLatestSessions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden px-4 pb-4"
                  >
                    <div className="space-y-4 mt-4">
                      {/* Session Items */}
                      <div className="rounded-lg bg-black/20 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-400">Today, 2:30 PM</p>
                          <span className="text-sm text-success">+12.4 $DeTA</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-gray-400">
                            <span className="text-white">8</span> pairs submitted
                          </div>
                          <span className="text-gray-500">•</span>
                          <div className="text-xs text-gray-400">
                            <span className="text-white">6</span> approved
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-black/20 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-400">Yesterday</p>
                          <span className="text-sm text-success">+8.6 $DeTA</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-gray-400">
                            <span className="text-white">5</span> pairs submitted
                          </div>
                          <span className="text-gray-500">•</span>
                          <div className="text-xs text-gray-400">
                            <span className="text-white">4</span> approved
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-black/20 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-400">Mar 15, 2024</p>
                          <span className="text-sm text-success">+15.8 $DeTA</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-gray-400">
                            <span className="text-white">10</span> pairs submitted
                          </div>
                          <span className="text-gray-500">•</span>
                          <div className="text-xs text-gray-400">
                            <span className="text-white">8</span> approved
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <ApprovalRateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      {/* Unlock Info Modal */}
      <AnimatePresence>
        {showUnlockInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md glass-card p-6"
            >
              <button
                onClick={() => setShowUnlockInfo(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              
              <h3 className="text-xl font-medium text-[#00FF95] mb-4">$DeTA Unlock Schedule</h3>
              <p className="text-gray-400 leading-relaxed">
                50% of your total earned $DeTA tokens are locked until the next phase of 
                the DeTA training protocol. This ensures long-term commitment and quality 
                contributions from our community members.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                The locked tokens will automatically become available for claiming when 
                the next phase begins.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ExampleModal 
        isOpen={showExampleModal !== null}
        onClose={() => setShowExampleModal(null)}
        type={showExampleModal || 'question'}
      />
    </>
  )
}