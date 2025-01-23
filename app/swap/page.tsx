"use client"

import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SwapPage() {
  const router = useRouter()
  // Initialize Coingecko widget
  useEffect(() => {
    const script = document.createElement('script')
    script.src = "https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-2 text-gray-400 hover:text-[#00FF95] transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </button>
      
      <h1 className="text-3xl font-bold text-[#00FF95] mb-8">Buy $DeTA</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Section */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-medium mb-4">Price Chart</h2>
          <div className="rounded-lg overflow-hidden">
            <coingecko-coin-price-chart-widget
              coin-id="deta"
              currency="usd"
              height="400"
              locale="en"
              background-color="#000000"
            ></coingecko-coin-price-chart-widget>
          </div>
        </div>

        {/* Jupiter Swap Interface */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-medium mb-4">Buy on Jupiter</h2>
          <div className="rounded-lg overflow-hidden h-[400px]">
            <iframe 
              src="https://jup.ag/swap/SOL-DeTA"
              frameBorder="0"
              width="100%"
              height="100%"
              style={{
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.2)'
              }}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6 space-y-6">
            <h2 className="text-xl font-medium text-[#00FF95]">$DeTA Tokenomics</h2>
            
            {/* Supply Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-black/20 p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Supply</span>
                  <span className="text-white">1,000,000,000 DeTA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Fully Diluted Valuation</span>
                  <span className="text-[#00FF95]">$100,000,000</span>
                </div>
              </div>
              <div className="rounded-lg bg-black/20 p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Circulating Supply</span>
                  <span className="text-white">24.5M DeTA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Market Cap</span>
                  <span className="text-[#00FF95]">$45.6M</span>
                </div>
              </div>
            </div>

            {/* Team and CEX Allocations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-black/20 p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Team Allocation (Locked)</span>
                  <span className="text-white">150M DeTA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Unlock in</span>
                  <span className="text-[#00FF95]">42 days</span>
                </div>
                <a 
                  href="https://streamflow.finance/lock/..." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#00FF95]/80 hover:text-[#00FF95] transition-colors"
                >
                  View on Streamflow ↗
                </a>
              </div>
              <div className="rounded-lg bg-black/20 p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">CEX & Marketing (Locked)</span>
                  <span className="text-white">50M DeTA</span>
                </div>
                <a 
                  href="https://streamflow.finance/lock/..." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#00FF95]/80 hover:text-[#00FF95] transition-colors"
                >
                  View on Streamflow ↗
                </a>
              </div>
            </div>

            {/* Rewards Distribution */}
            <div className="rounded-lg bg-black/20 p-4">
              <h3 className="text-white font-medium mb-4">$DeTA Rewards Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">BETA v1</span>
                    <span className="text-[#00FF95]">50M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">BETA v2</span>
                    <span className="text-[#00FF95]">50M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Block 1</span>
                    <span className="text-[#00FF95]">100M</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Block 2</span>
                    <span className="text-[#00FF95]">80M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Block 3</span>
                    <span className="text-[#00FF95]">70M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Block 4</span>
                    <span className="text-[#00FF95]">60M</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Block 5</span>
                    <span className="text-[#00FF95]">40M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Block 6</span>
                    <span className="text-[#00FF95]">30M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Block 7</span>
                    <span className="text-[#00FF95]">20M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 