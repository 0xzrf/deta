"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Users, Database, Award, HelpCircle } from "lucide-react"
import { AnimatePresence } from "framer-motion"
import { InfoModal } from "./info-modal"
import axios from "axios"

interface ChartData {
  type: 'line' | 'bar' | 'pie'
  values: Array<{
    name: string
    value: number
    description?: string
    color?: string
  }>
  description: string
  additionalInfo?: { title: string; content: string }[]
}

interface MetricCard {
  title: string
  value: string | number
  description: string
  chartData?: ChartData
  trend?: {
    value: number
    timeframe: string
  }
  icon: JSX.Element
  color: string
}

interface GlobalFeedResponse {
  success: boolean
  globalFeed: Array<{
    id: number
    contrib_30_days: number
    token_distributions: number
    data_point_submitted: number
    total_submissions: number
  }>
  msg: string
}

export function AnalyticsDashboard() {
  const [activeInfoModal, setActiveInfoModal] = useState<string | null>(null)
  const [networkOverview, setNetworkOverview] = useState([
    {
      title: "Network Overview",
      items: [
        {
          title: "Total Data Points",
          value: "0",
          description: "Total number of Q&A pairs submitted to the network",
          subDescription: "vs last version",
          chartData: {
            type: 'line' as const,
            values: [
              { name: 'Beta V1', value: 25000 },
              { name: 'Beta V2', value: 65000 },
              { name: 'Public 1.0', value: 98000 },
              { name: 'Public 2.0', value: 135000 },
              { name: 'Public 3.0', value: 156842 }
            ],
            description: "Growth in total submissions across different network versions"
          },
          trend: {
            value: 23.5,
            timeframe: "vs last version"
          },
          icon: <Database className="h-5 w-5" />,
          color: "text-purple-400"
        },
        {
          title: "Active Contributors",
          value: "0",
          description: "Users who submitted data in the last 30 days",
          subDescription: "vs last month",
          chartData: {
            type: 'bar' as const,
            values: [
              { name: 'New', value: 5234, color: '#00FF95' },
              { name: 'Regular', value: 12680, color: '#6366f1' },
              { name: 'Power', value: 6242, color: '#ec4899' }
            ],
            description: "Breakdown of contributor types: New (< 1 month), Regular (1-6 months), Power Users (6+ months)"
          },
          trend: {
            value: 12.3,
            timeframe: "vs last month"
          },
          icon: <Users className="h-5 w-5" />,
          color: "text-blue-400"
        },
        {
          title: "$DeTA Distributed",
          value: "0",
          description: "Total $DeTA tokens awarded to contributors",
          subDescription: "vs last version",
          chartData: {
            type: 'line' as const,
            values: [
              { name: 'Beta V1', value: 5, description: "Initial testing phase with core contributors" },
              { name: 'Beta V2', value: 10, description: "Extended testing with early adopters" },
              { name: 'Public 1.0', value: 15, description: "First public release with basic Q&A validation" },
              { name: 'Public 2.0', value: 25, description: "Enhanced validation and quality metrics" },
              { name: 'Public 3.0', value: 35, description: "Introduction of specialized categories" },
              { name: 'Public 4.0', value: 45, description: "Advanced quality scoring system" },
              { name: 'Public 5.0', value: 60, description: "Automated validation improvements" },
              { name: 'Public 6.0', value: 80, description: "Enhanced reward mechanisms" },
              { name: 'Public 7.0', value: 100, description: "Full-scale deployment with all features" },
              { name: 'Public 8.0', value: 125, description: "Current version with optimized distribution" }
            ],
            description: "Cumulative $DeTA distribution across network versions (in thousands)",
            additionalInfo: [
              {
                title: "Direct Rewards",
                content: "80% of tokens distributed as direct rewards for quality Q&A submissions"
              },
              {
                title: "Quality Bonuses",
                content: "20% allocated for consistency and exceptional quality contributions"
              }
            ]
          },
          trend: {
            value: 8.7,
            timeframe: "vs last version"
          },
          icon: <Award className="h-5 w-5" />,
          color: "text-[#00FF95]"
        }
      ]
    }
  ])

  const [networkHealth, setNetworkHealth] = useState([
    {
      title: "Network Health",
      items: [
        {
          title: "Average Response Time",
          value: "0s",
          description: "Time taken to validate and process submissions",
          info: "Response time affects user experience and network efficiency. Lower is better.",
          chartData: {
            type: 'bar' as const,
            values: [
              { name: 'Validation', value: 0.3 },
              { name: 'Processing', value: 0.5 },
              { name: 'Response', value: 0.4 }
            ],
            description: "Breakdown of processing stages in seconds"
          }
        },
        {
          title: "Network Approval Rate",
          value: "0%",
          description: "Percentage of submissions meeting quality standards",
          info: "High approval rates indicate quality data and efficient training.",
          chartData: {
            type: 'pie' as const,
            values: [
              { name: 'Approved', value: 92.5 },
              { name: 'Pending', value: 5.5 },
              { name: 'Rejected', value: 2 }
            ],
            description: "Distribution of submission statuses"
          }
        },
        {
          title: "Training Progress",
          value: "76%",
          description: "Progress towards next model iteration",
          info: "Shows how close we are to the next model update based on training data.",
          chartData: {
            type: 'line' as const,
            values: [
              { name: 'Week 1', value: 15 },
              { name: 'Week 2', value: 35 },
              { name: 'Week 3', value: 52 },
              { name: 'Week 4', value: 76 }
            ],
            description: "Weekly progress towards the next model iteration. Target: 100,000 validated pairs"
          }
        }
      ]
    }
  ])

  useEffect(() => {
    const fetchGlobalFeed = async () => {
      try {
        const response = await axios.get<GlobalFeedResponse>('/api/get-global-feed')
        if (response.data.success && response.data.globalFeed.length > 0) {
          const feed = response.data.globalFeed[0]
          
          // Update Network Overview
          setNetworkOverview(prev => {
            const newData = [...prev]
            newData[0].items = newData[0].items.map(item => {
              switch (item.title) {
                case "Total Data Points":
                  return { ...item, value: feed.data_point_submitted.toString() }
                case "Active Contributors":
                  return { ...item, value: feed.contrib_30_days.toString() }
                case "$DeTA Distributed":
                  return { ...item, value: feed.token_distributions.toString() }
                default:
                  return item
              }
            })
            return newData
          })

          // Update Network Health
          setNetworkHealth(prev => {
            const newData = [...prev]
            newData[0].items = newData[0].items.map(item => {
              if (item.title === "Network Approval Rate") {
                const approvalRate = ((feed.total_submissions > 0 
                  ? feed.data_point_submitted / feed.total_submissions 
                  : 0) * 100).toFixed(1)
                return { ...item, value: `${approvalRate}%` }
              }
              return item
            })
            return newData
          })
        }
      } catch (error) {
        console.error('Error fetching global feed:', error)
      }
    }

    fetchGlobalFeed()
  }, []) // Empty dependency array means this runs once on mount

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      {networkOverview.map((section) => (
        <div key={section.title} className="glass-card p-6">
          <h2 className="text-xl font-medium text-gradient mb-6">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {section.items.map((item) => (
              <div key={item.title} className="rounded-lg bg-black/20 p-4 border border-white/5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`${item.color}`}>{item.icon}</span>
                      <h3 className="text-sm font-medium text-gray-400">{item.title}</h3>
                      <button
                        onClick={() => setActiveInfoModal(item.title)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-2xl font-bold mt-2">{item.value}</p>
                  </div>
                  {item.trend && (
                    <div className="flex items-center gap-1 text-success text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>+{item.trend.value}%</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-2">{item.description}</p>
                {item.trend && (
                  <p className="text-xs text-gray-500 mt-1">{item.trend.timeframe}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Network Health Section */}
      {networkHealth.map((section) => (
        <div key={section.title} className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-gradient">{section.title}</h2>
            <button
              onClick={() => setActiveInfoModal("network-health")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {section.items.map((item) => (
              <div key={item.title} className="rounded-lg bg-black/20 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-400">{item.title}</h3>
                  <button
                    onClick={() => setActiveInfoModal(item.title)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-2xl font-bold mt-2">{item.value}</p>
                <p className="text-sm text-gray-400 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Training Progress Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gradient">Training Progress</h2>
          <div className="flex items-center gap-4">
            <select
              className="bg-black/20 border border-white/10 rounded-md px-3 py-1 text-sm text-gray-400"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button
              onClick={() => setActiveInfoModal("training-progress")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="h-[300px] rounded-lg bg-black/20 p-4 flex items-center justify-center">
          <p className="text-gray-400">Training Progress Chart Coming Soon</p>
        </div>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {activeInfoModal && (
          <InfoModal
            title={activeInfoModal}
            content={
              activeInfoModal === "network-health"
                ? "Network health metrics help monitor the overall performance and efficiency of the DeTA network."
                : networkHealth.find(s => s.title === activeInfoModal)?.items.find(i => i.title === activeInfoModal)?.info ||
                "Information about this metric coming soon."
            }
            data={
              networkHealth.find(s => s.title === activeInfoModal)?.items.find(i => i.title === activeInfoModal)?.chartData || {
                type: 'line',
                values: [],
                description: ''
              }
            }
            onClose={() => setActiveInfoModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

