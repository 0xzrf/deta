"use client"
import React from 'react';

import { useEffect, useState } from "react"
import { CheckCircle, Loader2, Brain, Filter, Award } from "lucide-react"

interface ProcessingStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  status: 'pending' | 'processing' | 'completed'
}

interface SubmissionProcessingProps {
  totalPairs: number
}

export default function SubmissionProcessing({ totalPairs }: SubmissionProcessingProps): React.ReactElement {
  const [currentStep, setCurrentStep] = useState(0)
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
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
      description: `Analyzing ${totalPairs} Q&A pairs`,
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

  useEffect(() => {
    const simulateProcessing = async () => {
      // Step 1: Initialize
      setProcessingSteps(steps => steps.map(step =>
        step.id === 1 ? { ...step, status: 'processing' } : step
      ))
      await new Promise(resolve => setTimeout(resolve, 2000))
      setProcessingSteps(steps => steps.map(step =>
        step.id === 1 ? { ...step, status: 'completed' } : step
      ))
      setCurrentStep(1)

      // Step 2: Analysis
      setProcessingSteps(steps => steps.map(step =>
        step.id === 2 ? { ...step, status: 'processing' } : step
      ))
      await new Promise(resolve => setTimeout(resolve, 3000))
      setProcessingSteps(steps => steps.map(step =>
        step.id === 2 ? { ...step, status: 'completed' } : step
      ))
      setCurrentStep(2)

      // Step 3: Rewards
      setProcessingSteps(steps => steps.map(step =>
        step.id === 3 ? { ...step, status: 'processing' } : step
      ))
      await new Promise(resolve => setTimeout(resolve, 2000))
      setProcessingSteps(steps => steps.map(step =>
        step.id === 3 ? { ...step, status: 'completed' } : step
      ))
      setCurrentStep(3)
    }

    simulateProcessing()
  }, [totalPairs])

  return (
    <div className="rounded-lg border border-[#2997ff] bg-[#1c1c1e]/70 p-6 backdrop-blur-sm">
      <h2 className="text-xl font-semibold text-gradient mb-8">Processing Submissions</h2>
      
      <div className="space-y-6">
        {processingSteps.map((step) => (
          <div key={step.id} className="flex items-center gap-4">
            <div className="flex-shrink-0">
              {step.status === 'completed' ? (
                <CheckCircle className="h-6 w-6 text-green-400" />
              ) : step.status === 'processing' ? (
                <Loader2 className="h-6 w-6 text-[#2997ff] animate-spin" />
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
  )
} 