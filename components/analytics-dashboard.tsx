"use client"

import { Info, TrendingUp, Users, Box, Award, Zap } from "lucide-react"
import { useState } from "react"
import { ApprovalRateModal } from "./approval-rate-modal"

export function AnalyticsDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 hover:border-success/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm text-gray-400">Active Users</h3>
            <Users className="h-4 w-4 text-success" />
          </div>
          <p className="text-2xl font-medium glow-text">24,156</p>
          <p className="text-xs text-success mt-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span className="text-gradient">+12.5% from last week</span>
          </p>
        </div>

        <div className="glass-card p-4 hover:border-success/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm text-gray-400">Total Submissions</h3>
            <Box className="h-4 w-4 text-success" />
          </div>
          <p className="text-2xl font-medium glow-text">156,842</p>
          <p className="text-xs text-success mt-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span className="text-gradient">+8.2% from last month</span>
          </p>
        </div>

        <div className="glass-card p-4 hover:border-success/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm text-gray-400">Total Value Locked</h3>
            <Award className="h-4 w-4 text-success" />
          </div>
          <p className="text-2xl font-medium glow-text">
            <span className="text-gradient">1.25M</span> $DeTA
          </p>
          <p className="text-xs text-success mt-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span className="text-gradient">+15.3% this week</span>
          </p>
        </div>

        <div className="glass-card p-4 hover:border-success/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm text-gray-400">Global Approval Rate</h3>
            <Zap className="h-4 w-4 text-success animate-pulse" />
          </div>
          <p className="text-2xl font-medium glow-text">
            <span className="text-gradient">92.5%</span>
          </p>
          <p className="text-xs text-success mt-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span className="text-gradient">+2.1% improvement</span>
          </p>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Platform Activity */}
        <div className="glass-card p-6 hover:border-success/10 transition-all duration-300">
          <h2 className="text-lg font-medium mb-6 text-gradient glow-text">Platform Activity</h2>
          <div className="space-y-6">
            {/* Time-based Stats */}
            <div className="space-y-4">
              <div className="rounded-lg bg-black/20 p-4 border border-white/5 hover:border-success/20 transition-all duration-300 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-gray-300 mb-4">Last 24 Hours</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-white glow-text">5,842</p>
                    <p className="text-sm text-gray-400">Submissions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gradient glow-text">12,450</p>
                    <p className="text-sm text-gray-400">$DeTA Distributed</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-black/20 p-4 border border-white/5 hover:border-success/20 transition-all duration-300 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-gray-300 mb-4">Last 7 Days</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-white glow-text">42,156</p>
                    <p className="text-sm text-gray-400">Submissions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gradient glow-text">89,750</p>
                    <p className="text-sm text-gray-400">$DeTA Distributed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Health */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full rounded-lg bg-black/20 p-4 border border-white/5 hover:border-success/20 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2 text-left">
                    Platform Health
                    <Info className="h-4 w-4 text-success" />
                  </h3>
                  <p className="text-2xl font-bold text-gradient glow-text mt-2">92.5%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Approval Rate</p>
                  <p className="text-lg font-semibold text-white">Global Average</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="glass-card p-6 hover:border-success/10 transition-all duration-300">
          <h2 className="text-lg font-medium mb-6 text-gradient glow-text">Platform Stats</h2>
          <div className="space-y-6">
            {/* Rewards Distribution */}
            <div className="rounded-lg bg-black/20 p-4 border border-white/5 hover:border-success/20 transition-all duration-300 backdrop-blur-sm">
              <h3 className="text-sm font-medium text-gray-300 mb-4">Rewards Distribution</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Distributed</span>
                  <span className="text-gradient font-semibold glow-text">1.25M $DeTA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Pending Distribution</span>
                  <span className="text-white">45.2K $DeTA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Average per Submission</span>
                  <span className="text-white">2.1 $DeTA</span>
                </div>
              </div>
            </div>

            {/* All-Time Stats */}
            <div className="rounded-lg bg-black/20 p-4 border border-white/5 hover:border-success/20 transition-all duration-300 backdrop-blur-sm">
              <h3 className="text-sm font-medium text-gray-300 mb-4">All-Time Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-white glow-text">45,862</p>
                  <p className="text-sm text-gray-400">Total Users</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gradient glow-text">156,842</p>
                  <p className="text-sm text-gray-400">Total Submissions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white glow-text">92.5%</p>
                  <p className="text-sm text-gray-400">Global Approval Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gradient glow-text">24,156</p>
                  <p className="text-sm text-gray-400">Active Contributors</p>
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
    </div>
  )
}

