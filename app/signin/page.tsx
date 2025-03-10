import { Metadata } from 'next'
import SignInForm from '@/components/sign-in-form'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in with your referral code',
}

export default function SignInPage() {
  return (
    <div className="container flex min-h-[80vh] flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
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