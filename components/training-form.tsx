"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import {
  ChevronDown, Plus, X, Info, Upload,
  Clock, Loader2, CheckCircle, XCircle,
  ArrowUpRight
} from "lucide-react"
import { ApprovalRateModal } from "./approval-rate-modal"
import { ExampleModal } from "./example-modal"
import { AnimatePresence, motion } from "framer-motion"
import { useWallet } from "@solana/wallet-adapter-react"
import axios from "axios"
import { toast, Toaster } from "sonner"
import { useRouter } from "next/navigation"

interface QAPair {
  id: number
  question: string
  answer: string
  isCollapsed: boolean
  estimatedReward?: number
  validationStatus?: 'pending' | 'processing' | 'accepted' | 'rejected' | undefined
  validationMessage?: string
}

type _FileUploadState = {
  file: File | null
  preview: QAPair[] | null
  error: string | null
}

export function TrainingForm({ earned, claimed, claimable, bonus_claimed, multiplier, verified }: { earned: number, claimed: number, claimable: number, totalClaimable: number, bonus_claimed: boolean, multiplier: number, verified: boolean }) {
  const { connected, publicKey } = useWallet()
  const router = useRouter()
  const [qaPairs, setQaPairs] = useState<QAPair[]>([{
    id: 1,
    question: "",
    answer: "",
    isCollapsed: false,
    estimatedReward: 0
  }])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showUnlockInfo, setShowUnlockInfo] = useState(false)
  const [showLatestSessions, setShowLatestSessions] = useState(false)
  const [showExampleModal, setShowExampleModal] = useState<'question' | 'answer' | null>(null)
  const [fileUploaded, setFileUploaded] = useState(false)
  const [isClaimLoading, setIsClaimLoading] = useState(false)

  // Calculate reward based on content length, complexity, and random bonus
  const calculateReward = useCallback((question: string, answer: string): number => {
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
  }, [])


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
    
    setIsClaimLoading(true)
    try {
      const checkRequest = await axios.get("https://www.detaprotocol.com/api/waitlist/stats")

      const match = checkRequest.data.data.topReferrers.find((referrer: any) => referrer.address === publicKey?.toString())

      if (match || verified) {
        const response = await axios.post(`https://deta-server-silk.vercel.app/api/distribute`, {
          contributorKey: publicKey?.toString()
        })
  
        if (response.data.success) {
          toast.success("Rewards claimed successfully")
        } else {
          toast.error("Error claiming rewards")
        }
      } else {
        toast.error("You are not in the waitlist, redirecting to sign in")
        setTimeout(async () => {
          router.push('/signin')
        }, 5000)
      }
    } catch (error) {

      toast.error("Error claiming rewards")
    } finally {
      setIsClaimLoading(false)
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
    try {
      setIsProcessing(true)
      console.log("verified",verified)

      console.log("I'm here")
      const checkRequest = await axios.get("https://www.detaprotocol.com/api/waitlist/stats")

      
  
      const match = checkRequest.data.data.topReferrers.find((referrer: any) => referrer.address === publicKey?.toString())

      if (!match) {

        if (!verified) {
          toast.error("You are not in the waitlist, redirecting to sign in")
  
        setTimeout(async () => {
            router.push('/signin')
          }, 5000)

          return
        }
      } 
      
    } catch (error) {
      toast.error("Error checking waitlist")
      setTimeout(async () => {
        router.push('/signin')
      }, 5000)
      console.log(error)
      return
    }


    const filterredQaPairs = qaPairs.map(data => {
      if (data.answer == '' || data.question == '') return
      return {
        question: data.question,
        answer: data.answer
      }

    })


    const pairs = [...filterredQaPairs, ...qaPairsinput].reduce((acc, item) => {
      //@ts-expect-error - Add reason for suppressing the error
      if (item !== undefined) acc.push(item);
      return acc;
    }, []);

    console.log(pairs)

    const payload = {
      json: {
        walletAddress: publicKey?.toString(),
        pairs
      }
    }

    const response = await axios.post("/api/trpc/qa.submit", payload)

    if (response.data.result.data.json.success) {
      toast.success("Successfully submitted the qa pair.")
    }

    setIsProcessing(false)

  }

  const [fileSubmitting, setFileSubmitting] = useState(false)
  const [qaPairsinput, setQaPairsInput] = useState<{ question: string, answer: string }[]>([])

  const handleFileSubmit = (event: any) => {
    setFileSubmitting(true)
    const file = event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (fileExtension !== "csv" && fileExtension !== "json") {
      toast.error("Invalid file type. Please upload a CSV or JSON file.");
      setFileSubmitting(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      let jsonData: { question: string, answer: string }[] = []
      try {
        if (fileExtension === "json") {
          jsonData = JSON.parse(e.target?.result as string);
          console.log("QA submitted");

          console.log("I'm after the toaster")
        } else if (fileExtension === "csv") {
          const csvContent = e.target?.result;
          const lines = (csvContent as string)?.split("\n").map(line => line.trim()).filter(line => line);
          const result = lines.map(line => {
            const [question, answer] = line.split(",").map(item => item.trim());
            return { question, answer };
          });
          jsonData = result.slice(1, -1);
        }

        setQaPairsInput([...qaPairsinput, ...jsonData])

        toast.success(`Successfully uploaded ${jsonData.length} Q&A pairs from ${file.name}`);

      } catch (error) {
        console.error("Error reading file:", error);
        toast.error("Error reading file. Please check the file format and try again.");
      }
    };
    reader.readAsText(file);

    setFileSubmitting(false)
    setFileUploaded(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Training Form - Takes up 3 columns */}
        <div className="lg:col-span-3 glass-card p-6">
          <h2 className="text-xl font-medium text-[#00FF95] mb-6">Submit Training Data</h2>
            <>
              {/* File Upload Section */}
              <div className="mb-6">
                <div className="rounded-lg border-2 border-dashed border-white/10 p-6 text-center hover:border-white/20 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileSubmit}
                    ref={fileInputRef}
                    className="hidden"
                    accept=".json,.csv,.txt"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-2 w-full"
                  >
                    {fileSubmitting ? (
                      <div className="flex flex-col items-center gap-2 w-full animate-pulse">
                        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                        <div className="h-4 w-40 bg-gray-300 rounded"></div>
                        <div className="h-3 w-32 bg-gray-300 rounded"></div>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400" />
                        <p className="text-sm text-gray-400">Upload a file or click to browse</p>
                        <p className="text-xs text-gray-500">Supports JSON & CSV</p>
                      </>
                    )}
                  </button>

                </div>
              </div>

              {/* Q&A Input Section */}
              <div className="space-y-4">

                {/* Add this compact summary section */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-400">
                      Total Pairs: <span className="text-white font-medium">{(qaPairs.length - 1) + qaPairsinput.length}</span>
                    </div>
                    <div className="w-px h-4 bg-white/10"></div>
                    <div className="text-sm text-gray-400">
                      Estimated: <span className="text-gradient font-medium">{qaPairsinput.length * 500 * multiplier} $DeTA</span>
                    </div>
                  </div>
                  {
                    !fileUploaded && (
                      <button
                        onClick={handleAddPair}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full
                      bg-[#00FF95]/10 hover:bg-[#00FF95]/20 text-[#00FF95] text-sm
                      transition-all duration-300"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add Pair
                      </button>
                    )
                  }
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
                        {
                          !fileUploaded &&
                          <>

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
                          </>
                        }
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
                  disabled={isProcessing || (qaPairs.length - 1) + qaPairsinput.length === 0}
                  aria-busy={isProcessing}
                  aria-disabled={isProcessing || qaPairs.length === 0}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    `Submit ${(qaPairs.length - 1) + qaPairsinput.length}  Pair${qaPairs.length !== 1 ? 's' : ''}`
                  )}
                </button>
              </div>
            </>
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
              <p className="text-2xl font-bold text-gradient mt-1">{earned || 0} $DeTA</p>
            </div>

            {/* Total Claimed */}
            <div className="rounded-lg bg-black/20 p-4">
              <p className="text-sm text-gray-400">Total $DeTA Claimed</p>
              <p className="text-2xl font-bold text-white mt-1">{claimed || 0} $DeTA</p>
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
              <p className="text-2xl font-bold text-white mt-1">0 $DeTA</p>
            </div>

            {/* Available to Claim */}
            <div className="rounded-lg bg-black/20 p-4 flex justify-between">
              <div>
                <p className="text-sm text-gray-400">Claimable $DeTA</p>
                <p className="text-2xl font-bold text-gradient mt-1">{claimable} $DeTA</p>
              </div>
              {
                !bonus_claimed && (
                  <a
                    href={`https://x.com/intent/tweet?text=Hello word`}
                    target="_blank"
                    className=" rounded-full px-4 py-3 text-base font-medium
                bg-[#00FF95] text-black hover:bg-[#00FF95]/90
                transition-all duration-300 flex items-center justify-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={async () => {
                      await axios.post("/api/update-bonus", {
                        walletAddress: publicKey,
                        bonus: true
                      })

                      toast.success("Bonus claimed")

                      window.location.reload()
                    }}
                  >
                    <p className="">+5%</p>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )
              }

            </div>

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
            <button
              onClick={claimRewards}
              className="w-full rounded-full px-4 py-3 text-base font-medium
                bg-[#00FF95] text-black hover:bg-[#00FF95]/90
                transition-all duration-300 flex items-center justify-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!connected || isClaimLoading}
            >
              {isClaimLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Claiming...
                </>
              ) : (
                `Claim ${claimable} $DeTA`
              )}
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

      <ExampleModal
        isOpen={showExampleModal !== null}
        onClose={() => setShowExampleModal(null)}
        type={showExampleModal || 'question'}
      />
      <Toaster
      />
    </>
  )
}