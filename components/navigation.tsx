"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Twitter, Users, Github, BookOpen, Menu, X, LayoutDashboard, GraduationCap } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"
import { useRouter } from "next/navigation"

export function Navigation() {
  const router = useRouter()
  const { isConnected, connectWallet } = useWallet()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleProfileClick = () => {
    router.push('/dashboard')
  }

  const communityLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com/yourproject",
      icon: <Twitter className="h-4 w-4" />
    },
    {
      name: "Discord",
      href: "https://discord.gg/yourproject",
      icon: <Users className="h-4 w-4" />
    }
  ]

  return (
    <nav className="py-4 sm:py-6">
      <div className="flex items-center justify-between px-4 sm:px-0">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/deta-logo.png"
            alt="DeTA Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-lg sm:text-xl font-bold text-white">DeTA</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-300 hover:text-white"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {/* GitHub Link */}
          <a
            href="https://github.com/yourusername/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>

          {/* Tutorial Link */}
          <Link
            href="/tutorial"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <GraduationCap className="h-4 w-4" />
            <span>Tutorial</span>
          </Link>

          {/* Docs Link */}
          <a
            href="https://docs.yourproject.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span>Docs</span>
          </a>

          {/* Community Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
            >
              Community
              <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-black/90 backdrop-blur-lg border border-white/10 shadow-lg py-1 z-50">
                {communityLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {link.icon}
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Profile Button */}
          <button
            onClick={handleProfileClick}
            className={`
              rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 
              flex items-center gap-2 text-[#00FF95] button-gradient-border
            `}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </button>

          {/* Connect Wallet Button */}
          <button
            onClick={connectWallet}
            className={`
              rounded-full px-4 py-2 text-sm font-medium transition-all duration-300
              ${isConnected 
                ? 'button-gradient-border text-[#00FF95]' 
                : 'button-gradient-border text-[#00FF95]'
              }
            `}
          >
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </button>
        </div>
      </div>

      {/* Mobile Menu (updated to include Profile) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-lg">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {/* Mobile Links */}
            <a
              href="https://github.com/yourusername/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg text-gray-300 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>

            {/* Mobile Tutorial Link */}
            <Link
              href="/tutorial"
              className="flex items-center gap-2 text-lg text-gray-300 hover:text-white transition-colors"
            >
              <GraduationCap className="h-5 w-5" />
              <span>Tutorial</span>
            </Link>

            <a
              href="https://docs.yourproject.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg text-gray-300 hover:text-white transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              <span>Docs</span>
            </a>

            {/* Mobile Community Links */}
            {communityLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-lg text-gray-300 hover:text-white transition-colors"
              >
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}

            {/* Mobile Profile Button */}
            <button
              onClick={handleProfileClick}
              className={`
                rounded-full px-6 py-3 text-base font-medium transition-all duration-300
                flex items-center gap-2 text-[#00FF95] button-gradient-border
              `}
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </button>

            {/* Mobile Connect Wallet Button */}
            <button
              onClick={connectWallet}
              className={`
                rounded-full px-6 py-3 text-base font-medium transition-all duration-300 mt-4
                ${isConnected 
                  ? 'button-gradient-border text-[#00FF95]' 
                  : 'button-gradient-border text-[#00FF95]'
                }
              `}
            >
              {isConnected ? 'Connected' : 'Connect Wallet'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
} 