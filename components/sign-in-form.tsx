'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast, Toaster } from "sonner"
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

export default function SignInForm() {
  const [referralCode, setReferralCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { publicKey } = useWallet()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/verify-referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ referralCode, walletAddress: publicKey?.toBase58() }),
      })

      const data = await response.json()

      if (data.success) {
          toast.success("Referral code verified successfully.")
        
        // Wait 5 seconds before redirecting
        setTimeout(() => {
          router.push('/dashboard?tab=contribute')
        }, 5000)
      } else {
        toast.error("Invalid referral code")
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Sign in failed:', error)
      toast.error("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-2">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Enter your referral code below to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="referralCode" className="text-base">
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
              className="h-12 text-base"
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
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