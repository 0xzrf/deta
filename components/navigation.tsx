import Link from 'next/link'
import { WalletButton } from './wallet-button'
import { BookOpen, Github } from 'lucide-react'

export function Navigation() {
  return (
    <nav className="my-6">
      <div className="glass-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-medium tracking-tight">
              DeAI Platform
            </Link>
            
            <div className="flex items-center gap-8">
              <Link 
                href="/dashboard" 
                className="text-sm font-medium text-[#8A8F98] hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/training" 
                className="text-sm font-medium text-[#8A8F98] hover:text-white transition-colors"
              >
                Training
              </Link>
              <Link 
                href="/rewards" 
                className="text-sm font-medium text-[#8A8F98] hover:text-white transition-colors"
              >
                Rewards
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              href="https://docs.deai.com" 
              className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Docs</span>
            </Link>
            <Link 
              href="https://github.com/deai-platform" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-[#8A8F98] hover:text-white transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
            <WalletButton />
          </div>
        </div>
      </div>
    </nav>
  )
} 