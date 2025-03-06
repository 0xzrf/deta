"use client"
import React from 'react';

interface ProcessingStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  status: 'pending' | 'processing' | 'completed'
}

interface SubmissionProcessingProps {
  steps: ProcessingStep[]
  currentStep: number
  results: {
    acceptedPairs: number
    totalReward: number
    qualityScore: number
  } | null
}

export default function SubmissionProcessing({ steps, currentStep, results }: SubmissionProcessingProps): React.ReactElement {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className={`flex items-center gap-4 p-4 rounded-lg ${
            index === currentStep ? 'bg-[#00FF95]/10' : 'bg-black/20'
          }`}>
            <div className="flex-shrink-0">
              {step.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {results && (
        <div className="p-6 bg-black/20 rounded-lg space-y-4">
          <h3 className="text-lg font-medium text-[#00FF95]">Results</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-400">Accepted Pairs</p>
              <p className="text-2xl font-bold text-white">{results.acceptedPairs}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Total Reward</p>
              <p className="text-2xl font-bold text-white">{results.totalReward.toFixed(2)} $DeTA</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Quality Score</p>
              <p className="text-2xl font-bold text-white">{results.qualityScore}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 