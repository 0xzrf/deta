"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, GraduationCap, MessageSquareText, TrendingUp, BarChart3, Wallet, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useWallet } from "@/contexts/wallet-context"

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { wallet } = useWallet()

  const menuItems = [
    {
      name: "Contribute",
      href: "/dashboard?tab=contribute",
      icon: <MessageSquareText className="h-4 w-4" />
    },
    {
      name: "Your Performance",
      href: "/dashboard?tab=performance",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      name: "Analytics & Progress",
      href: "/analytics",
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      name: "Tutorial",
      href: "/tutorial",
      icon: <GraduationCap className="h-4 w-4" />
    },
    {
      name: "Docs",
      href: "/docs",
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      name: "Buy $DeTA",
      href: "/swap",
      icon: <Wallet className="h-4 w-4" />
    }
  ]

  return (
    <div className="flex items-center gap-4">
      {/* Wallet Address */}
      <div className="text-sm text-gray-400">
        {`${wallet?.publicKey?.toString().slice(0, 4)}...${wallet?.publicKey?.toString().slice(-3)}`}
      </div>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-300 hover:text-white transition-colors"
        >
          <div className="h-8 w-8 rounded-full bg-[#00FF95]/10 flex items-center justify-center border border-[#00FF95]/20">
            <User className="h-4 w-4 text-[#00FF95]" />
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 rounded-lg bg-black/90 backdrop-blur-lg 
                border border-white/10 shadow-lg py-1 z-50"
            >
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 
                    hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 