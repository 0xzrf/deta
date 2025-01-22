"use client"

import { useEffect, useState } from "react"
import { Brain, Box, CheckCircle, AlertCircle } from "lucide-react"

interface TrainingBlock {
  id: string
  pairCount: number
  status: 'pending' | 'processing' | 'completed'
  timestamp: number
  quality: number
  size: number // KB of data
}

interface ModelMetrics {
  totalPairs: number
  epochsCompleted: number
  currentAccuracy: number
  targetAccuracy: number
  trainingSpeed: number // pairs per second
}

export function ModelProgress() {
  const [blocks, setBlocks] = useState<TrainingBlock[]>([])
  const [metrics, setMetrics] = useState<ModelMetrics>({
    totalPairs: 156842,
    epochsCompleted: 23,
    currentAccuracy: 92.5,
    targetAccuracy: 95,
    trainingSpeed: 450
  })

  // Simulate incoming blocks
  useEffect(() => {
    const createBlock = (): TrainingBlock => ({
      id: Math.random().toString(36).substr(2, 9),
      pairCount: Math.floor(Math.random() * 500) + 100,
      status: 'pending',
      timestamp: Date.now(),
      quality: Math.random() * 20 + 80, // 80-100%
      size: Math.floor(Math.random() * 500) + 100 // 100-600KB
    })

    const interval = setInterval(() => {
      setBlocks(current => {
        const newBlocks = [...current]
        
        // Add new block
        if (newBlocks.length < 6) {
          newBlocks.push(createBlock())
        }

        // Update block statuses
        return newBlocks.map(block => {
          if (block.status === 'pending') {
            return { ...block, status: 'processing' as const }
          }
          if (block.status === 'processing') {
            return { ...block, status: 'completed' as const }
          }
          return block
        }).slice(-6) // Keep only last 6 blocks
      })

      // Update metrics
      setMetrics(current => ({
        ...current,
        totalPairs: current.totalPairs + Math.floor(Math.random() * 50),
        currentAccuracy: Math.min(95, current.currentAccuracy + Math.random() * 0.01)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Model Training Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-400">Training Speed</h3>
            <Brain className="h-4 w-4 text-success" />
          </div>
          <p className="mt-2 text-2xl font-medium">
            {metrics.trainingSpeed} <span className="text-sm text-gray-400">pairs/s</span>
          </p>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-400">Total Q&A Pairs</h3>
            <Box className="h-4 w-4 text-success" />
          </div>
          <p className="mt-2 text-2xl font-medium">
            {metrics.totalPairs.toLocaleString()}
          </p>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-400">Current Accuracy</h3>
            <CheckCircle className="h-4 w-4 text-success" />
          </div>
          <p className="mt-2 text-2xl font-medium">
            {metrics.currentAccuracy.toFixed(2)}%
          </p>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-400">Epochs Completed</h3>
            <AlertCircle className="h-4 w-4 text-success" />
          </div>
          <p className="mt-2 text-2xl font-medium">
            {metrics.epochsCompleted}
          </p>
        </div>
      </div>

      {/* Training Blocks Visualization */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-medium mb-6">Live Training Progress</h2>
        
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="h-2 bg-black/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-success transition-all duration-500"
              style={{ width: `${(metrics.currentAccuracy / metrics.targetAccuracy) * 100}%` }}
            />
          </div>

          {/* Blocks visualization */}
          <div className="grid grid-cols-6 gap-4">
            {blocks.map((block) => (
              <div
                key={block.id}
                className={`
                  glass-card p-3 transition-all duration-300
                  ${block.status === 'completed' 
                    ? 'border-success/20' 
                    : block.status === 'processing'
                    ? 'border-success/40 animate-pulse' 
                    : 'border-white/5'
                  }
                `}
              >
                <div className="text-xs text-gray-400 mb-2">
                  Block {block.id.slice(0, 4)}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Pairs</span>
                    <span>{block.pairCount}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Quality</span>
                    <span>{block.quality.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Size</span>
                    <span>{block.size}KB</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-medium mb-4">Training Activity</h2>
        <div className="space-y-3">
          {blocks.slice().reverse().map((block) => (
            <div key={block.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className={`
                  w-2 h-2 rounded-full
                  ${block.status === 'completed' 
                    ? 'bg-success' 
                    : block.status === 'processing'
                    ? 'bg-success animate-pulse' 
                    : 'bg-gray-400'
                  }
                `} />
                <span>
                  Processed block {block.id.slice(0, 4)} 
                  ({block.pairCount} pairs)
                </span>
              </div>
              <span className="text-gray-400">
                {new Date(block.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 