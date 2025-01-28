"use client"

interface ExampleModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'question' | 'answer'
}

export function ExampleModal({ isOpen, onClose, type }: ExampleModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-black/90 p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-medium mb-4">
          {type === 'question' ? 'Question Example' : 'Answer Example'}
        </h2>
        <p className="text-gray-300 mb-4">
          {type === 'question' 
            ? 'Example question: What is the capital of France?'
            : 'Example answer: The capital of France is Paris.'}
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