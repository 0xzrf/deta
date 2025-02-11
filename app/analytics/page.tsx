"use client"

import { useState } from "react"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { ModelProgress } from "@/components/model-progress"
import { BarChart3, Activity } from "lucide-react"

type TabType = 'analytics' | 'progress'

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('analytics')

  const tabs = [
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="h-4 w-4" />
    }
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="glass-card p-2">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
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

      {/* Tab Content */}
      {activeTab === 'analytics' && <AnalyticsDashboard />}
    </div>
  )
} 