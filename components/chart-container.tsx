import { useRef, useEffect } from 'react'

export function ChartContainer() {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Store the ref value immediately
    const chartContainer = chartContainerRef.current
    
    // Initialize chart
    if (chartContainer) {
      // Chart initialization code here
    }

    // Cleanup function uses the stored reference
    return () => {
      if (chartContainer) {
        // Cleanup code here
      }
    }
  }, []) // Empty dependency array if the chart only needs to be initialized once

  return (
    <div ref={chartContainerRef} className="h-[300px]">
      {/* Chart content */}
    </div>
  )
} 