"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Twitter, Users, Github, BookOpen, Menu, X, GraduationCap, TrendingUp } from "lucide-react"
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
      name: "Telegram",
      href: "https://t.me/detaprotocol",
      icon: <svg 
        xmlns="http://www.w3.org/2000/svg" 
        x="0px" 
        y="0px" 
        width="18" 
        height="18" 
        viewBox="0,0,256,256"
      >
        <g 
          fillOpacity="0.75" 
          fill="#fff" 
          fillRule="nonzero" 
          stroke="none" 
          strokeWidth="0.75" 
          strokeLinecap="butt" 
          strokeLinejoin="miter" 
          strokeMiterlimit="10" 
          strokeDasharray="" 
          strokeDashoffset="0" 
          fontFamily="none" 
          fontWeight="none" 
          fontSize="none" 
          textAnchor="none" 
          style={{ mixBlendMode: 'normal' }}
        >
          <g transform="scale(10.66667,10.66667)">
            <path d="M20.30273,2.98438c-0.28897,0.01257 -0.55415,0.09568 -0.78711,0.1875c-0.21522,0.08476 -0.98809,0.4096 -2.21875,0.92578c-1.23066,0.51618 -2.8614,1.20058 -4.59961,1.93164c-3.47642,1.46212 -7.38303,3.10683 -9.38477,3.94922c-0.06874,0.02864 -0.34791,0.11411 -0.65625,0.34961c-0.30905,0.23605 -0.65234,0.74834 -0.65234,1.30859c0,0.45195 0.22561,0.91225 0.49805,1.17578c0.27243,0.26353 0.54854,0.38674 0.7793,0.47852v-0.00195c0.78003,0.31076 3.10944,1.24288 3.66406,1.46484c0.19673,0.58953 1.04128,3.11337 1.24219,3.74805h-0.00195c0.14201,0.44921 0.28043,0.74196 0.47266,0.98633c0.09611,0.12218 0.21084,0.2329 0.35156,0.32031c0.05399,0.03354 0.11378,0.05955 0.17383,0.08398c0.00837,0.00355 0.01699,0.00443 0.02539,0.00781l-0.02344,-0.00586c0.01741,0.007 0.03304,0.01733 0.05078,0.02344c0.02891,0.00996 0.04896,0.00963 0.08789,0.01758c0.137,0.04215 0.27376,0.07031 0.40039,0.07031c0.54361,0 0.87695,-0.29492 0.87695,-0.29492l0.02149,-0.01563l2.34766,-1.98633l2.875,2.66016c0.05251,0.07415 0.4639,0.63086 1.41602,0.63086c0.56813,0 1.01731,-0.28121 1.30469,-0.57617c0.28738,-0.29496 0.4664,-0.59677 0.54688,-1.00586l0.00195,-0.00195c0.06418,-0.33018 2.81641,-14.15039 2.81641,-14.15039l-0.00586,0.02344c0.08566,-0.38235 0.11095,-0.7521 0.00977,-1.12891c-0.10119,-0.37681 -0.37428,-0.74453 -0.70312,-0.9375c-0.32885,-0.19297 -0.64072,-0.25085 -0.92969,-0.23828zM19.9082,5.17383c-0.10876,0.54603 -2.57419,12.93205 -2.72656,13.70898l-4.15234,-3.8418l-2.80664,2.37305l0.77734,-3.03906c0,0 5.36255,-5.42814 5.68555,-5.74414c0.26,-0.253 0.31445,-0.34169 0.31445,-0.42969c0,-0.117 -0.06022,-0.20117 -0.19922,-0.20117c-0.125,0 -0.29477,0.11978 -0.38477,0.17578c-1.14365,0.713 -6.01473,3.4889 -8.41016,4.85156c-0.14416,-0.0578 -2.30846,-0.92689 -3.47461,-1.39258c2.07426,-0.873 5.62991,-2.36896 8.94141,-3.76172c1.73791,-0.73094 3.36817,-1.41595 4.59766,-1.93164c1.03785,-0.43531 1.57923,-0.6607 1.83789,-0.76758zM17.15234,19.02539h0.00195c-0.00005,0.00023 -0.00185,0.00556 -0.00195,0.00586c0.00127,-0.00646 -0.00095,-0.0008 0,-0.00586z"></path>
          </g>
        </g>
      </svg>
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
            href="https://github.com/deta-protocol"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>

          {/* Tutorial Link */}
          <Link
            href="https://www.youtube.com/@detaprotocol"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <GraduationCap className="h-4 w-4" />
            <span>Tutorial</span>
          </Link>

          {/* Docs Link */}
          <Link
            href="https://detaprotocol.gitbook.io/deta"
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

      {/* Mobile Menu - Show on all pages */}
      {isMobileMenuOpen && (
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
            
            <Link
              href="/dashboard?tab=performance"
              className="flex items-center gap-2 text-lg text-gray-300 hover:text-white transition-colors"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Your Performance</span>
            </Link>
            <a
              href="https://github.com/deta-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg text-gray-300 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>

            {/* Mobile Tutorial Link */}
            <Link
              href="https://www.youtube.com/@detaprotocol"
              className="flex items-center gap-2 text-lg text-gray-300 hover:text-white transition-colors"
            >
              <GraduationCap className="h-5 w-5" />
              <span>Tutorial</span>
            </Link>

            <a
              href="https://detaprotocol.gitbook.io/deta"
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