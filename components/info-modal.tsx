"use client"

import { useRef, useEffect } from "react"
import { X, TrendingUp, Info } from "lucide-react"
import { motion } from "framer-motion"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, Legend } from "recharts"

interface InfoModalProps {
  title: string
  content: string
  data?: {
    type: 'line' | 'bar' | 'pie'
    values: any[]
    description: string
    trend?: {
      value: number
      timeframe: string
    }
    additionalInfo?: {
      title: string
      content: string
    }[]
  }
  onClose: () => void
}

const COLORS = ['#00FF95', '#6366f1', '#ec4899', '#f59e0b']
const HOVER_COLORS = {
  '#00FF95': '#00cc78', // Darker green on hover
  '#6366f1': '#4f46e5', // Darker indigo on hover
  '#ec4899': '#db2777', // Darker pink on hover
  '#f59e0b': '#d97706'  // Darker amber on hover
}

export function InfoModal({ title, content, data, onClose }: InfoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const renderChart = () => {
    if (!data) return null

    switch (data.type) {
      case 'line':
        return (
          <div className="space-y-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.values}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#6b7280"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    tick={{ fill: '#9CA3AF' }}
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#00FF95" 
                    strokeWidth={2}
                    dot={{ fill: '#00FF95', r: 4 }}
                    activeDot={{ r: 6, fill: '#00FF95' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {data.values[0].description && (
              <div className="space-y-4 bg-black/20 rounded-lg p-4">
                <h4 className="text-sm font-medium text-[#00FF95]">Version Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.values.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="text-sm font-medium text-white">{item.name}</div>
                      <div className="text-sm text-gray-400">{item.description}</div>
                      {item.value && (
                        <div className="text-sm text-[#00FF95]">
                          {item.value.toLocaleString()} submissions
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case 'bar':
        return (
          <div className="space-y-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.values}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#6b7280"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    tick={{ fill: '#9CA3AF' }}
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Legend 
                    formatter={(value, entry) => (
                      <span className="text-gray-400 hover:text-white transition-colors">
                        {value}
                      </span>
                    )}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]}
                    onMouseEnter={(data, index) => {
                      const cell = document.querySelector(`[name="Cell-${index}"]`)
                      if (cell) {
                        const color = data.color || COLORS[index % COLORS.length]
                        cell.setAttribute('fill', HOVER_COLORS[color] || color)
                      }
                    }}
                    onMouseLeave={(data, index) => {
                      const cell = document.querySelector(`[name="Cell-${index}"]`)
                      if (cell) {
                        const color = data.color || COLORS[index % COLORS.length]
                        cell.setAttribute('fill', color)
                      }
                    }}
                  >
                    {data.values.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        name={`Cell-${index}`}
                        fill={entry.color || COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {data.values[0].description && (
              <div className="space-y-4 bg-black/20 rounded-lg p-4">
                <h4 className="text-sm font-medium text-[#00FF95]">Category Details</h4>
                <div className="grid grid-cols-1 gap-4">
                  {data.values.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div 
                        className="w-3 h-3 rounded-full mt-1.5"
                        style={{ backgroundColor: item.color || COLORS[index % COLORS.length] }}
                      />
                      <div>
                        <div className="text-sm font-medium text-white">{item.name}</div>
                        <div className="text-sm text-gray-400">{item.description}</div>
                        {item.value && (
                          <div className="text-sm text-[#00FF95]">
                            {item.value.toLocaleString()} users
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case 'pie':
        // Convert pie data to line chart data
        const lineData = data.values.map((item, index) => ({
          name: `Phase ${index + 1}`,
          value: item.value,
          description: item.description
        }))
        
        return (
          <div className="space-y-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#6b7280"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    tick={{ fill: '#9CA3AF' }}
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                    cursor={{ stroke: '#00FF95', strokeWidth: 1 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#00FF95" 
                    strokeWidth={2}
                    dot={{ fill: '#00FF95', r: 4 }}
                    activeDot={{ r: 6, fill: '#00FF95' }}
                  />
                  <Legend 
                    formatter={(value) => (
                      <span className="text-gray-400 hover:text-white transition-colors">
                        Distribution Percentage
                      </span>
                    )}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {data.values[0].description && (
              <div className="space-y-4 bg-black/20 rounded-lg p-4">
                <h4 className="text-sm font-medium text-[#00FF95]">Phase Distribution Details</h4>
                <div className="grid grid-cols-1 gap-4">
                  {data.values.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div 
                        className="w-3 h-3 rounded-full mt-1.5"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <div>
                        <div className="text-sm font-medium text-white">
                          Phase {index + 1}: {item.value}%
                        </div>
                        <div className="text-sm text-gray-400">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl glass-card p-8 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-medium text-[#00FF95]">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{content}</p>
          </div>

          {data?.trend && (
            <div className="flex items-center gap-2 text-success">
              <TrendingUp className="h-4 w-4" />
              <span>+{data.trend.value}% {data.trend.timeframe}</span>
            </div>
          )}

          {data && (
            <div className="space-y-6">
              <div className="rounded-lg bg-black/20 p-6">
                {renderChart()}
              </div>
              <p className="text-sm text-gray-500 italic">{data.description}</p>
            </div>
          )}

          {data?.additionalInfo && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white flex items-center gap-2">
                <Info className="h-4 w-4 text-[#00FF95]" />
                Additional Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.additionalInfo.map((info, index) => (
                  <div key={index} className="bg-black/20 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-[#00FF95] mb-2">{info.title}</h5>
                    <p className="text-sm text-gray-400">{info.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
} 