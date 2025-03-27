"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Twitter, Users, Github, BookOpen, Menu, X, GraduationCap } from "lucide-react"
import { usePathname } from "next/navigation"
import { ProfileDropdown } from "./profile-dropdown"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"

export function Navigation() {
  const { connected, publicKey, disconnect } = useWallet()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const pathname = usePathname()

  const isDashboard = pathname === '/dashboard' || pathname.startsWith('/dashboard/') || pathname.startsWith('/analytics')
  const { setVisible } = useWalletModal()

  const connectWallet = () => { 
    if (connected) {
      disconnect()
      return
    }
    setVisible(true)
    console.log("Connected wallet")
  }

  const closeMenu = () => {
    console.log("Close menu clicked")
    setIsClosing(true)
    
    setTimeout(() => {
      setIsMobileMenuOpen(false)
      setIsClosing(false)
      console.log("Menu closed")
    }, 300)
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
        <div className="flex items-center gap-8">
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
        </div>

        <button
          onClick={() => isMobileMenuOpen ? closeMenu() : setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 text-gray-300 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
          <Link
            href="/docs"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span>Docs</span>
          </Link>

          {/* Community Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen)
                console.log("Dropdown open", isDropdownOpen)
              }}
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

          {/* Connect Wallet Button */}
          {
            !isDashboard ?
            <>

              <button
                onClick={connectWallet}
                onMouseEnter={() => {
                  if (connected) {
                    // Intentionally empty
                  }
                }}
                className={`
                      rounded-full px-6 py-3 text-base font-medium transition-all duration-300
                      ${connected
                    ? 'button-gradient-border text-[#00FF95]'
                    : 'button-gradient-border text-[#00FF95]'
                  }
                    `}
              >
                {connected ? `${publicKey?.toString().slice(0, 6)}...${publicKey?.toString().slice(38, -1)}` : 'Please connect your wallet'}
              </button>
            </>
            :
            <ProfileDropdown />
          }
        </div>

      </div>

      {/* Mobile Menu - Only show on landing page */}
      {!isDashboard && isMobileMenuOpen && (
        <div 
          className={`lg:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-lg transition-all duration-300 ease-in-out ${
            isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Close button */}
          <button 
            onClick={closeMenu}
            className="absolute top-6 right-6 text-gray-300 hover:text-white transition-colors z-10"
            aria-label="Close menu"
          >
            <X className="h-8 w-8 transform transition-transform duration-300 hover:rotate-90" />
          </button>

          <div className={`flex flex-col items-center justify-center h-full space-y-8 transition-all duration-300 ${
            isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
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

            {/* Mobile Connect Wallet Button */}
            <button
              onClick={connectWallet}
              className={`
                rounded-full px-6 py-3 text-base font-medium transition-all duration-300 mt-4
                ${connected
                  ? 'button-gradient-border text-[#00FF95]'
                  : 'button-gradient-border text-[#00FF95]'
                }
              `}
            >
              {connected ? `${publicKey?.toString().slice(0, 6)}...${publicKey?.toString().slice(38, -1)}` : 'Please connect your wallet'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
} 