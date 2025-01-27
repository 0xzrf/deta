"use client"

import { createContext, useContext, useState } from 'react'

interface TrainingStats {
  submittedPairs: number
  sessionEstimate: number
  approvalRate: number
  approvalMultiplier: number
}

interface TrainingStatsContextType {
  stats: TrainingStats
  updateStats: (newStats: Partial<TrainingStats>) => void
}

const TrainingStatsContext = createContext<TrainingStatsContextType>({
  stats: {
    submittedPairs: 0,
    sessionEstimate: 0,
    approvalRate: 0,
    approvalMultiplier: 1
  },
  updateStats: () => {}
})

export function TrainingStatsProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<TrainingStats>({
    submittedPairs: 0,
    sessionEstimate: 0,
    approvalRate: 0,
    approvalMultiplier: 1
  })

  const updateStats = (newStats: Partial<TrainingStats>) => {
    setStats(current => ({ ...current, ...newStats }))
  }

  return (
    <TrainingStatsContext.Provider value={{ stats, updateStats }}>
      {children}
    </TrainingStatsContext.Provider>
  )
}

export const useTrainingStats = () => useContext(TrainingStatsContext) 