"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface ApprovalRateModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ApprovalRateModal({ isOpen, onClose }: ApprovalRateModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl rounded-lg border border-[#3730a3] bg-[#1e293b]/95 p-6 backdrop-blur-sm"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold text-gradient mb-6">
          Approval Rate Rewards System
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">
              How it works
            </h3>
            <p className="text-gray-300">
              Your approval rate directly influences your reward multiplier. Higher approval rates lead to increased rewards for each submission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-md bg-[#1e293b] p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Approval Rate Tiers
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">95-100%</span>
                  <span className="text-gradient">2.0x bonus</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">85-94%</span>
                  <span className="text-white">1.5x bonus</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">70-84%</span>
                  <span className="text-white">1.2x bonus</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">&lt;70%</span>
                  <span className="text-white">1.0x (base)</span>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-[#1e293b] p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Additional Bonuses
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Consistency</span>
                  <span className="text-gradient">+0.3x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Complexity</span>
                  <span className="text-white">+0.2x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uniqueness</span>
                  <span className="text-white">+0.2x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Volume</span>
                  <span className="text-white">+0.1x</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md bg-[#1e293b] p-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">
              Example Calculation
            </h4>
            <p className="text-gray-400">
              Base Reward: 1 DeAI<br />
              Approval Rate (95%): 2.0x<br />
              Consistency Bonus: +0.3x<br />
              Final Reward: 1 × (2.0 + 0.3) = 2.3 DeAI
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 