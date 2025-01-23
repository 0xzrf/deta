"use client"

import { useState, useEffect, useRef } from "react"
import { 
  ChevronDown, Plus, X, Wallet, Info, Upload, FileText,
  Clock, Loader2, CheckCircle, XCircle, Brain, Filter, Award
} from "lucide-react"
import { ApprovalRateModal } from "./approval-rate-modal"
import { useWallet } from "@/contexts/wallet-context"

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

  const totalEstimatedReward = qaPairs.reduce((sum, pair) => sum + (pair.estimatedReward || 0), 0)

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
    setQaPairs(qaPairs.map(pair =>
      pair.id === id ? { ...pair, [field]: value } : pair
    ))
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

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 xl:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-black/20 p-4 sm:p-6 backdrop-blur-sm">
          {isProcessing ? (
            <div>
              <h2 className="text-xl font-semibold text-gradient mb-8">Processing Submissions</h2>
              <div className="space-y-6">
                {processingSteps.map((step) => (
                  <div key={step.id} className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {step.status === 'completed' ? (
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      ) : step.status === 'processing' ? (
                        <Loader2 className="h-6 w-6 text-[--success] animate-spin" />
                      ) : (
                        <div className="h-6 w-6 text-gray-400">
                          {step.icon}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{step.title}</p>
                      <p className="text-sm text-gray-400">{step.description}</p>
                    </div>
                    {step.status === 'completed' && (
                      <span className="text-sm text-green-400">Complete</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center text-sm text-gray-400">
                {currentStep < 3 ? (
                  "Please wait while we process your submissions..."
                ) : (
                  "Processing complete! Displaying results..."
                )}
              </div>
            </div>
          ) : submissionResults ? (
            <div>
              <h2 className="text-xl font-semibold text-gradient mb-6">Submission Results</h2>
              <div className="space-y-4">
                <div className="rounded-md bg-black/20 p-4">
                  <p className="text-2xl font-bold text-gradient">
                    {submissionResults.acceptedPairs}
                  </p>
                  <p className="text-sm text-gray-400">Accepted Pairs</p>
                </div>
                <div className="rounded-md bg-black/20 p-4">
                  <p className="text-2xl font-bold text-gradient">
                    {submissionResults.totalReward.toFixed(1)} $DeTA
                  </p>
                  <p className="text-sm text-gray-400">Total Reward</p>
                </div>
                <div className="rounded-md bg-black/20 p-4">
                  <p className="text-2xl font-bold text-gradient">
                    {submissionResults.qualityScore}%
                  </p>
                  <p className="text-sm text-gray-400">Quality Score</p>
                </div>
                <button
                  onClick={() => setSubmissionResults(null)}
                  className="mt-6 w-full button-gradient rounded-md px-4 py-3 text-sm font-medium text-white"
                >
                  Submit More Q&A Pairs
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gradient">Submit Training Data</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    Session Reward:
                  </span>
                  <span className="text-gradient font-semibold">
                    {totalEstimatedReward.toFixed(1)} $DeTA
                  </span>
                </div>
              </div>

              <div className="space-y-4 max-h-[800px] overflow-y-auto">
                {/* File Upload Section */}
                <div className="rounded-lg border border-dashed border-white/10 bg-black/20 p-4">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".csv,.json"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(file)
                      }}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Q&A File
                    </button>
                    <p className="text-xs text-gray-400">
                      Supported formats: CSV, JSON
                    </p>
                  </div>
                  {fileUpload.error && (
                    <p className="mt-2 text-sm text-red-400">{fileUpload.error}</p>
                  )}
                  {fileUpload.file && (
                    <div className="mt-2 flex items-center justify-between rounded-md bg-black/20 p-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-white">{fileUpload.file.name}</span>
                        <span className="text-xs text-gray-400">
                          ({fileUpload.preview?.length} pairs)
                        </span>
                      </div>
                      <button
                        onClick={() => setFileUpload({ file: null, preview: null, error: null })}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

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
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={handleAddPair}
                  className="flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                >
                  <Plus className="h-4 w-4" />
                  Add Q&A Pair
                </button>

                <button
                  onClick={handleSubmit}
                  className={`rounded-full px-4 py-2 text-sm font-medium
                    button-gradient-border text-[#00FF95]
                    transition-all duration-300 flex items-center gap-2`}
                >
                  {!isConnected ? (
                    <>
                      <Wallet className="h-4 w-4" />
                      Connect Wallet to Submit
                    </>
                  ) : (
                    'Submit Q&A Pairs'
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Stats Section */}
        <div className="rounded-lg border border-white/10 bg-black/20 p-4 sm:p-6 backdrop-blur-sm">
          <h2 className="mb-6 text-xl font-semibold text-gradient">Training Stats</h2>
          <div className="space-y-6">
            {/* Current Session Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md bg-black/20 p-4">
                <p className="text-2xl font-bold text-white">
                  {qaPairs.filter(pair => pair.isCollapsed).length}
                </p>
                <p className="text-sm text-gray-400">Current Session</p>
              </div>
              <div className="rounded-md bg-black/20 p-4">
                <p className="text-2xl font-bold text-gradient">
                  {totalEstimatedReward.toFixed(1)} $DeTA
                </p>
                <p className="text-sm text-gray-400">Session Estimate</p>
              </div>
            </div>

            {/* Add new Approval Rate Rewards section after Current Session Stats */}
            <div className="rounded-md bg-black/20 p-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-between group"
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    Approval Rate Rewards
                    <Info className="h-4 w-4 text-gray-400 group-hover:text-white" />
                  </h3>
                  <p className="text-2xl font-bold text-gradient mt-2">
                    {approvalMultiplier}x
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Current Rate</p>
                  <p className="text-lg font-semibold text-white">{approvalRate}%</p>
                </div>
              </button>
            </div>

            {/* Rewards Section */}
            <div className="rounded-md bg-black/20 p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-4">Rewards Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Available to Claim</span>
                  <span className="text-gradient font-semibold">35.2 $DeTA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Claimed</span>
                  <span className="text-white">210.6 $DeTA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Pending Approval</span>
                  <span className="text-white">{totalEstimatedReward.toFixed(1)} $DeTA</span>
                </div>
                
                {!isConnected ? (
                  <button
                    onClick={connectWallet}
                    className="w-full mt-4 rounded-full px-4 py-2 text-sm font-medium
                      button-gradient-border text-[#00FF95]
                      transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Wallet className="h-4 w-4" />
                    Connect Wallet to Claim
                  </button>
                ) : (
                  <button
                    onClick={claimRewards}
                    className="rounded-full px-4 py-2 text-sm font-medium
                      button-gradient-border text-[#00FF95]
                      transition-all duration-300 flex items-center gap-2"
                  >
                    Claim Rewards
                  </button>
                )}
              </div>
            </div>

            {/* All-Time Stats */}
            <div className="rounded-md bg-black/20 p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-4">All-Time Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Submissions</span>
                  <span className="text-white">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Approved Pairs</span>
                  <span className="text-white">142</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Approval Rate</span>
                  <span className="text-white">90.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ApprovalRateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}