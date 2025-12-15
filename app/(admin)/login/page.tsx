'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, Lock, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { loginAction } from '@/lib/actions/auth'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const result = await loginAction(formData)

    if (result.success) {
      router.push(redirect)
      router.refresh()
    } else {
      setError(result.error || 'Login failed')
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-navy font-semibold">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="admin@angelscare-homehealth.com"
          required
          disabled={isLoading}
          autoComplete="email"
          className="bg-bg-base/50 h-11 focus:bg-white transition-colors border-navy/10 focus:ring-navy/20"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password" className="text-navy font-semibold">Password</Label>
          <span className="text-xs text-navy/50 cursor-pointer hover:text-navy hover:underline">Forgot password?</span>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          required
          disabled={isLoading}
          autoComplete="current-password"
          className="bg-bg-base/50 h-11 focus:bg-white transition-colors border-navy/10 focus:ring-navy/20"
        />
      </div>

      <Button type="submit" className="w-full bg-navy hover:bg-navy/90 text-white h-12 rounded-full shadow-lg shadow-navy/20 transition-all hover:scale-[1.02]" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Authenticating...
          </>
        ) : (
          <span className="flex items-center gap-2 font-bold">
            <Lock className="h-4 w-4 text-gold" />
            Secure Login
          </span>
        )}
      </Button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-base p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-navy/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-navy tracking-tight">Angel&apos;s Care</h1>
          <p className="text-text-muted font-medium mt-2">Admin Portal</p>
        </div>

        <Card className="border-none shadow-xl shadow-navy/10 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-8 border-b border-navy/5">
            <div className="mx-auto bg-navy/5 p-4 rounded-full w-fit mb-4">
              <ShieldCheck className="w-8 h-8 text-navy" />
            </div>
            <CardTitle className="text-xl font-bold text-navy">Welcome Back</CardTitle>
            <CardDescription className="text-text-muted">
              Please verify your credentials to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <Suspense fallback={<div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-navy" /></div>}>
              <LoginForm />
            </Suspense>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-navy/5 pt-6 pb-6">
            <p className="text-xs text-center text-text-muted max-w-[200px]">
              Authorized access only. All activities are monitored and logged.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
