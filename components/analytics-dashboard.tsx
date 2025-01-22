"use client"

import { Info } from "lucide-react"
import { useState } from "react"
import { ApprovalRateModal } from "./approval-rate-modal"

export function AnalyticsDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 xl:grid-cols-2">
      {/* Platform Activity Section */}
      <div className="glass-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Platform Activity</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              Total Value Locked:
            </span>
            <span className="text-success font-semibold">
              1.25M DeAI
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Current Period Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md bg-black/20 p-4">
              <p className="text-2xl font-bold text-white">24,156</p>
              <p className="text-sm text-gray-400">Active Users</p>
            </div>
            <div className="rounded-md bg-black/20 p-4">
              <p className="text-2xl font-bold text-success">156,842</p>
              <p className="text-sm text-gray-400">Total Submissions</p>
            </div>
          </div>

          {/* Platform Health */}
          <div className="rounded-md bg-black/20 p-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full flex items-center justify-between group"
            >
              <div>
                <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  Platform Health
                  <Info className="h-4 w-4 text-gray-400 group-hover:text-white" />
                </h3>
                <p className="text-2xl font-bold text-success mt-2">
                  92.5%
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Approval Rate</p>
                <p className="text-lg font-semibold text-white">Global Average</p>
              </div>
            </button>
          </div>

          {/* Time-based Stats */}
          <div className="space-y-4">
            <div className="rounded-md bg-black/20 p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Last 24 Hours</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-white">5,842</p>
                  <p className="text-sm text-gray-400">Submissions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">12,450</p>
                  <p className="text-sm text-gray-400">DeAI Distributed</p>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-black/20 p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Last 7 Days</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-white">42,156</p>
                  <p className="text-sm text-gray-400">Submissions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">89,750</p>
                  <p className="text-sm text-gray-400">DeAI Distributed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Stats Section */}
      <div className="glass-card p-6">
        <h2 className="mb-6 text-xl font-semibold">Platform Stats</h2>
        <div className="space-y-6">
          {/* Overall Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md bg-black/20 p-4">
              <p className="text-2xl font-bold text-white">142,856</p>
              <p className="text-sm text-gray-400">Approved Pairs</p>
            </div>
            <div className="rounded-md bg-black/20 p-4">
              <p className="text-2xl font-bold text-success">92.5%</p>
              <p className="text-sm text-gray-400">Average Quality</p>
            </div>
          </div>

          {/* Rewards Distribution */}
          <div className="rounded-md bg-black/20 p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-4">Rewards Distribution</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Distributed</span>
                <span className="text-success font-semibold">1.25M DeAI</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Pending Distribution</span>
                <span className="text-white">45.2K DeAI</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Average per Submission</span>
                <span className="text-white">2.1 DeAI</span>
              </div>
            </div>
          </div>

          {/* All-Time Stats */}
          <div className="rounded-md bg-black/20 p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-4">All-Time Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Users</span>
                <span className="text-white">45,862</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Submissions</span>
                <span className="text-white">156,842</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Global Approval Rate</span>
                <span className="text-white">92.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Active Contributors</span>
                <span className="text-white">24,156</span>
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

