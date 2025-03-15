'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useWallet } from '@solana/wallet-adapter-react'
import axios from 'axios'
import { toast, Toaster } from 'sonner'


export default function SignInForm() {
  const [referralCode, setReferralCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { publicKey } = useWallet()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would typically validate the referral code with your backend
      // For now, we'll just simulate a delay
      const response = await axios.post('/api/verify-referral', {
        referralCode,
        walletAddress: publicKey?.toString(),
      })
      
      if (!response.data.success) {
        toast.error(response.data.msg)
        setIsLoading(false)
        return
      }

      // Redirect to dashboard or handle the sign-in logic
      router.push('/dashboard?tab=contribute')
    } catch (error) {
      console.error('Sign in failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="glass-card border border-white/5 bg-black/20 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-[#00FF95]">Sign In</CardTitle>
        <CardDescription className="text-center text-gray-400">
          Enter your referral code below to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="referralCode" className="text-base text-gray-300">
              Referral Code
            </Label>
            <Input
              id="referralCode"
              placeholder="Enter your referral code"
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              disabled={isLoading}
              required
              className="h-12 text-base bg-black/30 border border-white/10 focus:border-[#00FF95]/50 focus:ring-[#00FF95]/20"
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-[#00FF95] hover:bg-[#00FF95]/80 text-black"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
      <Toaster />
    </Card>
  )
}