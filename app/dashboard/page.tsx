"use client"

import { useState, useEffect, Suspense } from "react"
import { TrainingForm } from "@/components/training-form"
import { MessageSquareText, TrendingUp, ChevronDown, CheckCircle, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useWallet } from "@solana/wallet-adapter-react"
import { useSearchParams, useRouter } from "next/navigation"
import axios from "axios"


interface UserData {
  address: string,
  total_claimed: number,
  claimable: number
  total_earned: number
  approved: number,
  submissions: number,
  tokens: number
  multiplier: string  
  bonus_claimed: boolean
  verified: boolean
}

interface Submission {
  id: string
  user: string
  status: 'pending' | 'approved' | 'rejected'
  timestamp: Date
  reward?: number
  estimatedReward?: number
  question: string
  category: 'Development' | 'DeFi' | 'NFT' | 'General' | "Unclassified"
}

interface userSubmission {
  walletAddress: string,
  question: string,
  answer: string,
  classification: "approved" | "rejected",
  createdAt: string,
  tokens: number,
  category: "Development" | "DeFi" | "NFT" | "General" | null
}


export default function ProfilePage() {
  const [activeTab] = useState<"contribute" | "performance" | "chat">('contribute')
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileContent />
    </Suspense>
  )
}

function ProfileContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false)
  const wallet = useWallet()
  const [globalSubmissions, setGlobalSubmissions] = useState<Submission[]>([])
  const [showMultiplierInfo, setShowMultiplierInfo] = useState(false)
  const [activeFeed, setActiveFeed] = useState<'global' | 'personal'>('personal')
  const [isHowToOpen, setIsHowToOpen] = useState(false)
  const [signedIn, setSignedIn] = useState(true)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [personalSubmissions, setPersonalSubmissions] = useState<Submission[]>([])
  const [bigDataLoading, setBigDataLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setBigDataLoading(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    (async () => {
      if (!bigDataLoading) return;

      const response = await axios.get(`/api/trpc/qa.list?input={"json":{}}`)

      console.log("Global dataaa:", response.data.result.data)

      const pairs = response.data.result.data

      const submissions = pairs.json.pairs.map((data: userSubmission) => {

        const returnData: Submission = {
          category: data.category ? data.category : "Unclassified",
          id: Math.floor(Math.random() * 10).toString(),
          question: data.question,
          status: data.classification == null ? "pending" : (data.classification == "approved" ? "approved" : 'rejected'),
          timestamp: new Date(data.createdAt),
          user: data.walletAddress.toString(),
          reward: data.tokens
        }

        return returnData
      })

      const sortedArr = submissions.sort((a: {timestamp: any}, b: {timestamp: any}) => a.timestamp - b.timestamp)

      const filteredArr = sortedArr.filter((sub: any) => {
        return sub.user === wallet?.publicKey?.toString()
      })

      setGlobalSubmissions(sortedArr)

    })()

  }, [bigDataLoading, wallet?.publicKey]) // Added bigDataLoading to dependencies

  useEffect(() => {
    (async () => {

      if (!wallet.publicKey) {
        return
      }
      const response1 = await axios.post("/api/get-or-create-user", {
        walletAddress: wallet.publicKey.toString()
      })

      if (!response1.data.success) {
        alert(response1.data.msg)
      }
      console.log("response1:", response1.data.user)

      const response2 = await axios.get(`/api/trpc/qa.list?input={"json":{"walletAddress": "${wallet.publicKey.toString()}"}}`)

      console.log("response 2", response2.data.result.data)
      const userInfo = response2.data.result.data
      const submissions = userInfo.json.pairs.length;

      const personalSubmissions = userInfo.json.pairs.map((data: userSubmission) => {
        return {
          category: data.category ? data.category : "Unclassified",
          id: Math.floor(Math.random() * 10).toString(),
          question: data.question,
          status: data.classification == null ? "pending" : (data.classification == "approved" ? "approved" : 'rejected'),
          timestamp: new Date(data.createdAt),
          user: data.walletAddress.toString(),
          reward: data.tokens
        }
      })

      setPersonalSubmissions(personalSubmissions)

      const approved = userInfo.json.pairs.filter((data: userSubmission) => {
        return data.classification == "approved"
      }).length

      let tokens = 0;

      userInfo.json.pairs.map((data: userSubmission) => {
        tokens += data.tokens
      })

      const approval_rate = (approved / submissions) * 100;

      let multiplier = (1 + (((approval_rate - 50) / 50) ** 2 ) * 0.5).toString() || "1"

      if (isNaN(Number(multiplier))) {
        multiplier = "1"
      }

      console.log("Multiplier:", multiplier)

      const data: UserData = {
        address: response1.data.address,
        approved,
        claimable: response1.data.user.claimable,
        submissions,
        total_claimed: response1.data.user.total_claimed,
        total_earned: tokens,
        tokens,
        multiplier,
        bonus_claimed: response1.data.user.bonus_claimed,
        verified: response1.data.user.verified
      }

      console.log("Data::::", data)

      setUserData (data)
      setDataLoading(false)
      setSignedIn(true)

    })()

  }, [wallet.publicKey])


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
  ]

  if (!signedIn) {
    return (
      <div>
        <h1>
          User not logged in
        </h1>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="glass-card p-2">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {tabs.slice(0, 3).map((tab) => (
              <button
                key={tab.id}
                onClick={() => router.push(`/dashboard?tab=${tab.id}`)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${searchParams.get('tab') === tab.id
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
                onClick={() => router.push(`/dashboard?tab=${tab.id}`)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${searchParams.get('tab') === tab.id
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {(searchParams.get("tab") == "contribute") && (
            <div className="space-y-6">
              {/* How To Earn $DeTA */}
              <div className="glass-card">
                <button
                  onClick={() => setIsHowToOpen(!isHowToOpen)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left"
                >
                  <h2 className="text-base font-medium text-[#00FF95]">How To Earn $DeTA</h2>
                  <ChevronDown
                    className={`h-4 w-4 text-[#00FF95] transition-transform duration-200 
                      ${isHowToOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isHowToOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden px-4 pb-4 space-y-4"
                    >
                      <div className="space-y-2 text-gray-300">
                        <p><strong>1. Connect Your Wallet</strong><br />Start by connecting your Solana wallet to track your contributions and receive rewards.</p>
                        <p><strong>2. Submit Q&A Pairs</strong><br />Contribute high-quality Solana-related questions and answers. Focus on technical details, development guides, and common issues.</p>
                        <p><strong>3. Earn Rewards</strong><br />Get $DeTA tokens for approved submissions. Higher quality contributions and maintaining a good approval rate will earn you more rewards.</p>
                        <p><strong>4. Claim Your $DeTA</strong><br />Once your submissions are approved, claim your $DeTA tokens directly to your connected wallet.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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

              <TrainingForm
                earned={userData?.total_earned || 0}
                claimed={userData?.total_claimed || 0}
                claimable={userData?.claimable || 0}
                totalClaimable={0}
                bonus_claimed={userData?.bonus_claimed || false}
                multiplier={parseFloat(userData?.multiplier || "1")}
                verified={userData?.verified || false}
                dataLoading={dataLoading}
                globalData={globalSubmissions}
              />
            </div>
          )}

          {(searchParams.get("tab") == "performance") && (
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
                        {wallet.publicKey ? wallet.publicKey.toString()?.slice(0, 4) + "..." + wallet?.publicKey?.toString()?.slice(-4) : "Please connect your wallet"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-black/20 p-4">
                      <p className="text-sm text-gray-400">Total Submissions</p>
                      <p className="text-2xl font-bold text-white mt-1">
                        {
                          userData && userData.submissions
                        }
                      </p>
                    </div>
                    <div className="rounded-lg bg-black/20 p-4">
                      <p className="text-sm text-gray-400">Approval rate</p>
                      <p className="text-2xl font-bold text-success mt-1">
                        {
                          userData &&
                          ((userData.approved / userData.submissions) * 100) || 0
                        }%
                      </p>
                    </div>
                    <div className="rounded-lg bg-black/20 p-4">
                      <p className="text-sm text-gray-400">Approved Q&A Pairs</p>
                      <p className="text-2xl font-bold text-gradient mt-1">
                        {
                          userData &&
                          userData.approved
                        }
                      </p>
                    </div>
                  </div>

                  {/* Multiplier Section with Dropdown */}
                  <div className="rounded-lg bg-black/20 p-4">
                    <button
                      onClick={() => setShowMultiplierInfo(!showMultiplierInfo)}
                      className="w-full"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-white">Reward Multipliers</h3>
                          <p className="text-sm text-gray-400 mt-1">Your current multiplier: {userData?.multiplier || 0}x</p>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-[#00FF95] transition-transform duration-200 ${showMultiplierInfo ? 'rotate-180' : ''
                            }`}
                        />
                      </div>
                    </button>

                    {showMultiplierInfo && (
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-black/10">
                          <span className="text-sm text-gray-300">95%+ Approval Rate</span>
                          <span className="text-sm font-medium text-success">2.0x</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-black/10">
                          <span className="text-sm text-gray-300">90-94% Approval Rate</span>
                          <span className="text-sm font-medium text-success">1.75x</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-black/10">
                          <span className="text-sm text-gray-300">85-89% Approval Rate</span>
                          <span className="text-sm font-medium text-success">1.5x</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-black/10">
                          <span className="text-sm text-gray-300">80-84% Approval Rate</span>
                          <span className="text-sm font-medium text-success">1.25x</span>
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
                          personalSubmissions
                        ).map((sub, i) => {

                          if (i > 20) {
                            return null
                          }

                          return (
                            <tr key={sub.id} className="text-sm">
                              <td className="py-3 text-gray-300">#{i}</td>
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
                          )
                        })}
                      </tbody>
                    </table>
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