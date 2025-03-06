"use client"

import { useState, useEffect } from "react"
import {  TrendingUp, Users, Database, Award, HelpCircle } from "lucide-react"
import {  AnimatePresence } from "framer-motion"
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

export function AnalyticsDashboard() {
  const [activeInfoModal, setActiveInfoModal] = useState<string | null>(null)
  const [metrics, setMetrics] = useState<MetricCard[]>([])
  const [networkStats, setNetworkStats] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGlobalFeed = async () => {
      try {
        const response = await axios.get('/api/get-global-feed')
        const data = response.data.globalFeed[0]

        // Update metrics
        setMetrics([
          {
            title: "Total Data Points",
            value: data.data_point_submitted.toLocaleString(),
            description: "Total number of Q&A pairs submitted to the network",
            chartData: {
              type: 'line',
              values: [
                { name: 'Beta V1', value: 10000 },
                { name: 'Beta V2', value: 0 },
                { name: 'Public 1.0', value: 0 },
                { name: 'Public 2.0', value: 0 },
                { name: 'Public 3.0', value: 0 }
              ],
              description: "Growth in total submissions across different network versions"
            },
            trend: {
              value: ((data.total_submissions / 1000) * 100).toFixed(1),
              timeframe: "vs last version"
            },
            icon: <Database className="h-5 w-5" />,
            color: "text-purple-400"
          },
          {
            title: "Active Contributors",
            value: data.contrib_30_days.toLocaleString(),
            description: "Users who submitted data in the last 30 days",
            chartData: {
              type: 'bar',
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
            value: `${(data.token_distributions / 1000).toFixed(2)}K`,
            description: "Total $DeTA tokens awarded to contributors",
            chartData: {
              type: 'line',
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
        ])

        // Update network stats
        setNetworkStats([
          {
            title: "Average Response Time",
            value: `${data.average_response_time.toFixed(1)}s`,
            description: "Time taken to validate and process submissions",
            info: "Response time affects user experience and network efficiency. Lower is better.",
            chartData: {
              type: 'bar',
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
            value: `${data.approval_rate}%`,
            description: "Percentage of submissions meeting quality standards",
            info: "High approval rates indicate quality data and efficient training.",
            chartData: {
              type: 'pie',
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
            value: `${data.training_progress}%`,
            description: "Progress towards next model iteration",
            info: "Shows how close we are to the next model update based on training data.",
            chartData: {
              type: 'line',
              values: [
                { name: 'Week 1', value: 15 },
                { name: 'Week 2', value: 35 },
                { name: 'Week 3', value: 52 },
                { name: 'Week 4', value: 76 }
              ],
              description: "Weekly progress towards the next model iteration. Target: 100,000 validated pairs"
            }
          }
        ])

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching global feed:', error)
        setIsLoading(false)
      }
    }

    fetchGlobalFeed()
  }, [])

  if (isLoading) {
    return <div className="text-center p-6">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-medium text-gradient mb-6">Network Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <div key={metric.title} className="rounded-lg bg-black/20 p-4 border border-white/5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`${metric.color}`}>{metric.icon}</span>
                    <h3 className="text-sm font-medium text-gray-400">{metric.title}</h3>
                    <button 
                      onClick={() => setActiveInfoModal(metric.title)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-2xl font-bold mt-2">{metric.value}</p>
                </div>
                {metric.trend && (
                  <div className="flex items-center gap-1 text-success text-sm">
                    <TrendingUp className="h-4 w-4" />
                    <span>+{metric.trend.value}%</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-2">{metric.description}</p>
              {metric.trend && (
                <p className="text-xs text-gray-500 mt-1">{metric.trend.timeframe}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Network Health Section */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gradient">Network Health</h2>
          <button
            onClick={() => setActiveInfoModal("network-health")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {networkStats.map((stat) => (
            <div key={stat.title} className="rounded-lg bg-black/20 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-400">{stat.title}</h3>
                <button
                  onClick={() => setActiveInfoModal(stat.title)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </div>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <p className="text-sm text-gray-400 mt-2">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

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
                : networkStats.find(s => s.title === activeInfoModal)?.info ||
                  metrics.find(m => m.title === activeInfoModal)?.description ||
                  "Information about this metric coming soon."
            }
            data={
              networkStats.find(s => s.title === activeInfoModal)?.chartData ||
              metrics.find(m => m.title === activeInfoModal)?.chartData || {
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
