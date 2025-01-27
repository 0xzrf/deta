import { useRef, useEffect } from 'react';

export function ChartComponent() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Store the ref value immediately at the start of the effect
    const currentChartContainer = chartContainerRef.current;

    // Initialize chart
    if (currentChartContainer) {
      // Chart initialization code here using currentChartContainer
    }

    // Cleanup function uses the stored reference
    return () => {
      if (currentChartContainer) {
        // Cleanup code here using currentChartContainer
      }
    };
  }, []); // Empty dependency array if the chart only needs to be initialized once

  return (
    <div ref={chartContainerRef} className="chart-container">
      {/* Chart content */}
    </div>
  );
} 