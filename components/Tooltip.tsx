"use client"

import { ReactNode } from "react"

interface TooltipProps {
  children: ReactNode
  content: string
}

export function Tooltip({ children, content }: TooltipProps) {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform
        px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg
        opacity-0 group-hover:opacity-100 transition-opacity duration-200
        pointer-events-none whitespace-nowrap z-50">
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2
          bg-gray-800 transform rotate-45" />
      </div>
    </div>
  )
} 