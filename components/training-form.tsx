"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { 
  ChevronDown, Plus, X, Info, Upload,
  Clock, Loader2, CheckCircle, XCircle, Brain, Filter, Award
} from "lucide-react"
import { ApprovalRateModal } from "./approval-rate-modal"
import { SubmissionProcessingDetailed } from "./submission-processing"
import { useWallet } from "@/contexts/wallet-context"
import { useTrainingStats } from "@/contexts/training-stats-context"
import { AnimatePresence, motion } from "framer-motion"

interface QAPair {
  id: number
  question: string
  answer: string
  isCollapsed: boolean
  estimatedReward?: number
  validationStatus?: 'pending' | 'processing' | 'accepted' | 'rejected'
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
  const { isConnected, connectWallet } = useWallet()
  const { updateStats } = useTrainingStats()
  const [qaPairs, setQaPairs] = useState<QAPair[]>([{ 
    id: 1, 
    question: "", 
    answer: "", 
    isCollapsed: false,
    estimatedReward: undefined
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

  // Calculate approval rate based on validated pairs
  const calculateApprovalRate = useCallback(() => {
    const validatedPairs = qaPairs.filter(p => p.validationStatus)
    if (validatedPairs.length === 0) return 0
    
    const approvedPairs = validatedPairs.filter(p => p.validationStatus === 'accepted')
    return Math.round((approvedPairs.length / validatedPairs.length) * 100)
  }, [qaPairs])

  // Calculate reward multiplier based on approval rate
  const calculateMultiplier = useCallback(() => {
    const rate = calculateApprovalRate()
    if (rate >= 95) return 2.0
    if (rate >= 90) return 1.75
    if (rate >= 85) return 1.5
    if (rate >= 80) return 1.25
    return 1.0
  }, [calculateApprovalRate])

  // Apply multiplier to rewards
  const calculateFinalReward = useCallback((baseReward: number) => {
    return baseReward * calculateMultiplier()
  }, [calculateMultiplier])

  const handleAddPair = () => {
    const lastPair = qaPairs[qaPairs.length - 1]
    if (!lastPair.question.trim() || !lastPair.answer.trim()) {
      alert("Please fill in the current Q&A pair before adding a new one")
      return
    }

    // Collapse all previous pairs
    const collapsedPairs = qaPairs.map(pair => ({ ...pair, isCollapsed: true }))
    
    setQaPairs([
      ...collapsedPairs,
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
    setQaPairs(qaPairs.map(pair => {
      if (pair.id === id) {
        const updatedPair = { ...pair, [field]: value }
        // Calculate estimated reward when content changes
        const baseReward = calculateReward(
          field === 'question' ? value : updatedPair.question,
          field === 'answer' ? value : updatedPair.answer
        )
        updatedPair.estimatedReward = calculateFinalReward(baseReward)
        return updatedPair
      }
      return pair
    }))
  }

  const removePair = (id: number) => {
    setQaPairs(qaPairs.filter(pair => pair.id !== id))
  }

  const claimRewards = async () => {
    if (!isConnected) {
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

  const approvalRate = 90.5 // This should come from your data
  const approvalMultiplier = getApprovalRateMultiplier(approvalRate)

  const handleFileUpload = async (file: File) => {
    try {
      if (!isConnected) {
        throw new Error("Please connect your wallet before uploading files")
      }

      const fileType = file.name.split('.').pop()?.toLowerCase()
      if (!['csv', 'json'].includes(fileType || '')) {
        throw new Error("Only CSV and JSON files are supported")
      }

      // Read and parse file
      const content = await file.text()
      let parsedData: QAPair[] = []

      if (fileType === 'csv') {
        // Parse CSV
        const rows = content.split('\n').filter(row => row.trim())
        parsedData = rows.slice(1).map((row, index) => {
          const [question, answer] = row.split(',').map(cell => cell.trim())
          return {
            id: Date.now() + index,
            question,
            answer,
            isCollapsed: false,
            estimatedReward: 0
          }
        })
      } else {
        // Parse JSON
        const jsonData: { question: string; answer: string }[] = JSON.parse(content)
        parsedData = jsonData.map((item, index) => ({
          id: Date.now() + index,
          question: item.question,
          answer: item.answer,
          isCollapsed: false,
          estimatedReward: 0
        }))
      }

      setFileUpload({
        file,
        preview: parsedData,
        error: null
      })
    } catch (error) {
      setFileUpload({
        file: null,
        preview: null,
        error: error instanceof Error ? error.message : "Failed to process file"
      })
    }
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
    if (!isConnected) {
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

  useEffect(() => {
    // Update stats whenever relevant values change
    updateStats({
      submittedPairs: qaPairs.length,
      sessionEstimate: qaPairs.reduce((sum, p) => sum + (p.estimatedReward || 0), 0),
      approvalRate: calculateApprovalRate(),
      multiplier: calculateMultiplier()
    })
  }, [qaPairs, calculateApprovalRate, calculateMultiplier, updateStats])

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Training Form - Takes up 3 columns */}
        <div className="lg:col-span-3 glass-card p-6">
          <h2 className="text-xl font-medium text-[#00FF95] mb-6">Submit Training Data</h2>
          {isProcessing ? (
            <SubmissionProcessingDetailed
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
                    onChange={handleFileUpload}
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
                {qaPairs.map((pair) => (
                  <div
                    key={pair.id}
                    className="rounded-lg border border-white/10 bg-black/20 p-4"
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
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-300">
                            Question
                          </label>
                          <textarea
                            value={pair.question}
                            onChange={(e) => handleChange(pair.id, 'question', e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, pair.id)}
                            className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-2 text-white placeholder-gray-400"
                            placeholder="Enter your question..."
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-300">
                            Answer
                          </label>
                          <textarea
                            value={pair.answer}
                            onChange={(e) => handleChange(pair.id, 'answer', e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, pair.id)}
                            className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-2 text-white placeholder-gray-400"
                            placeholder="Enter your answer..."
                            rows={3}
                          />
                        </div>
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

                {/* Add Q&A Pair Button */}
                <button
                  onClick={handleAddPair}
                  className="w-full rounded-lg border border-dashed border-[#00FF95]/20 
                    bg-[#00FF95]/5 hover:bg-[#00FF95]/10 p-4 text-[#00FF95]
                    transition-all duration-300 flex items-center justify-center gap-2
                    group"
                >
                  <Plus className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Add Q&A Pair
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="mt-6 w-full rounded-full px-4 py-3 text-base font-medium
                  button-gradient-border text-[#00FF95]
                  transition-all duration-300 flex items-center justify-center gap-2"
                disabled={!isConnected}
              >
                {isConnected ? 'Submit Training Data' : 'Connect Wallet to Submit'}
              </button>
            </>
          )}
        </div>

        {/* Rewards Panel - Takes up 1 column */}
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-xl font-medium text-[#00FF95] mb-6">Your Rewards</h2>
          
          <div className="space-y-4">
            {/* Total Earned */}
            <div className="rounded-lg bg-black/20 p-4">
              <p className="text-sm text-gray-400">Total $DeTA Earned</p>
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
                button-gradient-border text-[#00FF95]
                transition-all duration-300 flex items-center justify-center gap-2"
              disabled={!isConnected}
            >
              {isConnected ? 'Claim 35.2 $DeTA' : 'Connect Wallet to Claim'}
            </button>
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
    </>
  )
}