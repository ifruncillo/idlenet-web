'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://lltpwuhbuiubcldbprgc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdHB3dWhidWl1YmNsZGJwcmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNjU2MjQsImV4cCI6MjA3Mjc0MTYyNH0.Yoeyn3w1j3uFQX9nS21JC7UHWA5yHf8818-PVh27tpU'
)

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isPasswordAuth, setIsPasswordAuth] = useState(true)
  const [isLogin, setIsLogin] = useState(true)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    try {
      if (isPasswordAuth) {
        // Password authentication
        if (!isLogin) {
          // Sign up with password
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          })
          
          if (error) throw error
          
          // Show success message and switch to login mode
          setMessage('✅ Success! Check your email to confirm your account, then you can log in.')
          setEmail('')
          setPassword('')
          setIsLogin(true) // Switch to login mode
        } else {
          // Sign in with password
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          
          if (error) throw error
          
          router.push('/dashboard')
        }
      } else {
        // Magic link authentication
        const { data, error } = await supabase.auth.signInWithOtp({
          email,
        })
        
        if (error) throw error
        
        setMessage('✅ Check your email for the login link!')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setMessage(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            IdleNet
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {/* Auth Type Toggle */}
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => setIsPasswordAuth(true)}
            className={`px-4 py-2 rounded-lg transition-all ${
              isPasswordAuth 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Password Login
          </button>
          <button
            type="button"
            onClick={() => setIsPasswordAuth(false)}
            className={`px-4 py-2 rounded-lg transition-all ${
              !isPasswordAuth 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Magic Link
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            {isPasswordAuth && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            )}
          </div>

          {message && (
            <div className={`rounded-md p-4 ${
              message.includes('Success') || message.includes('Check your email') 
                ? 'bg-green-800 text-green-200' 
                : 'bg-red-800 text-red-200'
            }`}>
              <p className="text-sm">{message}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : (
                isPasswordAuth 
                  ? (isLogin ? 'Sign In' : 'Sign Up')
                  : 'Send Magic Link'
              )}
            </button>
          </div>

          {isPasswordAuth && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-green-400 hover:text-green-300"
              >
                {isLogin 
                  ? "Don't have an account? Sign Up" 
                  : "Already have an account? Sign In"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}