'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qqsggrbxizugjrzoqkyv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxc2dncmJ4aXp1Z2pyem9xa3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MDMzODMsImV4cCI6MjA3NDQ3OTM4M30.LSUvRpJYCDNB8-Je7g5KWVpVgi8K6hR5qHqx7RpUS1o'
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [authMethod, setAuthMethod] = useState<'password' | 'magic'>('password')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleAuth = async () => {
    setLoading(true)
    setMessage('')

    try {
      if (authMethod === 'magic') {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        })
        if (error) throw error
        setMessage('Check your email for the magic link!')
      } else {
        if (isSignUp) {
          const { error } = await supabase.auth.signUp({
            email,
            password,
          })
          if (error) throw error
          setMessage('Account created! You can now sign in.')
          setIsSignUp(false)
        } else {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          if (error) throw error
          router.push('/dashboard')
        }
      }
    } catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'An error occurred'
  setMessage(errorMessage){
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const isValid = email && (authMethod === 'magic' || password)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '440px', margin: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#39E19D', marginBottom: '8px', letterSpacing: '-0.5px' }}>
            IdleNet
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '14px' }}>Distributed Computing Network</p>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(57, 225, 157, 0.2)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            marginBottom: '24px',
            background: 'rgba(15, 23, 42, 0.5)',
            borderRadius: '8px',
            padding: '4px'
          }}>
            <button
              onClick={() => setAuthMethod('password')}
              style={{
                flex: 1,
                padding: '8px',
                background: authMethod === 'password' ? 'rgba(57, 225, 157, 0.2)' : 'transparent',
                border: authMethod === 'password' ? '1px solid rgba(57, 225, 157, 0.3)' : '1px solid transparent',
                borderRadius: '6px',
                color: authMethod === 'password' ? '#39E19D' : '#94A3B8',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Password Login
            </button>
            <button
              onClick={() => setAuthMethod('magic')}
              style={{
                flex: 1,
                padding: '8px',
                background: authMethod === 'magic' ? 'rgba(57, 225, 157, 0.2)' : 'transparent',
                border: authMethod === 'magic' ? '1px solid rgba(57, 225, 157, 0.3)' : '1px solid transparent',
                borderRadius: '6px',
                color: authMethod === 'magic' ? '#39E19D' : '#94A3B8',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Magic Link
            </button>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#CBD5E1', fontSize: '14px', fontWeight: '500' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(71, 85, 105, 0.3)',
                borderRadius: '8px',
                color: '#F1F5F9',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          {authMethod === 'password' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#CBD5E1', fontSize: '14px', fontWeight: '500' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(71, 85, 105, 0.3)',
                  borderRadius: '8px',
                  color: '#F1F5F9',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          )}

          <button
            onClick={handleAuth}
            disabled={!isValid || loading}
            style={{
              width: '100%',
              padding: '12px',
              background: isValid && !loading ? 'linear-gradient(135deg, #39E19D 0%, #10B981 100%)' : 'rgba(71, 85, 105, 0.3)',
              border: 'none',
              borderRadius: '8px',
              color: isValid && !loading ? '#0F172A' : '#64748B',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isValid && !loading ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {loading ? 'Loading...' : (authMethod === 'magic' ? 'Send Magic Link' : (isSignUp ? 'Sign Up' : 'Sign In'))}
          </button>

          {message && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(57, 225, 157, 0.2)',
              borderRadius: '8px',
              color: '#39E19D',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {message}
            </div>
          )}

          {authMethod === 'password' && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <span style={{ color: '#94A3B8', fontSize: '14px' }}>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              </span>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                style={{
                  marginLeft: '6px',
                  background: 'none',
                  border: 'none',
                  color: '#39E19D',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px'
                }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          )}
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#64748B', fontSize: '12px', lineHeight: '1.5' }}>
            By signing in, you agree to our Terms of Service<br/>
            80% cheaper than AWS • Processing starts immediately
          </p>
        </div>
      </div>
    </div>
  )
}