"use client"

import { useRef, useEffect } from 'react'

export function ChartContainer() {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Store the ref value immediately at the start of the effect
    const currentContainer = chartContainerRef.current

    // Initialize chart
    if (currentContainer) {
      // Chart initialization code here using currentContainer
    }

    // Cleanup function uses the stored reference
    return () => {
      if (currentContainer) {
        // Cleanup code here using currentContainer
      }
    }
  }, []) // Empty dependency array if the chart only needs to be initialized once

  return (
    <div ref={chartContainerRef} className="h-[300px]">
      {/* Chart content */}
    </div>
  )
} 