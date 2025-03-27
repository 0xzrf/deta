import { Metadata } from 'next'
import SignInForm from '@/components/sign-in-form'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in with your referral code',
}

export default function SignInPage() {
  return (
    <div className="mt-16 w-full flex items-center justify-center overflow-hidden">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] px-4">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gradient">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-400">
            Enter your referral code to continue
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}