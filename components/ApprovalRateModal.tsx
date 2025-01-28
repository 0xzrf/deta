"use client"

interface ApprovalRateModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ApprovalRateModal({ isOpen, onClose }: ApprovalRateModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-black/90 p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-medium mb-4">Approval Rate Information</h2>
        <p className="text-gray-300 mb-4">
          Your approval rate affects your reward multiplier. Higher quality submissions lead to higher approval rates.
        </p>
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-[#00FF95] text-black rounded hover:bg-[#00FF95]/90"
        >
          Close
        </button>
      </div>
    </div>
  )
} 