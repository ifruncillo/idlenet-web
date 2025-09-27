'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [authMethod, setAuthMethod] = useState<'password' | 'magiclink'>('password')
  
  const router = useRouter()
  
  // Initialize Supabase client with hardcoded credentials
  const supabase = createClient(
    'https://lltpwuhbuiubcldbprgc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdHB3dWhidWl1YmNsZGJwcmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNjU2MjQsImV4cCI6MjA3Mjc0MTYyNH0.Yoeyn3w1j3uFQX9nS21JC7UHWA5yHf8818-PVh27tpU'
  )

  // Handle password-based authentication (both sign in and sign up)
  const handlePasswordAuth = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      if (isSignUp) {
        // Create new account with email and password
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        })
        
        if (error) throw error
        
        setMessage('Account created! Check your email to verify your account, then sign in.')
        setIsSignUp(false)
      } else {
        // Sign in with existing credentials
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        
        if (error) throw error
        
        // Successful login - redirect to dashboard
        if (data?.user) {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during authentication'
      setMessage(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Handle magic link authentication (passwordless)
  const handleMagicLink = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { 
          emailRedirectTo: `${window.location.origin}/dashboard` 
        }
      })
      
      if (error) throw error
      
      setMessage('Check your email for the login link! You can close this window.')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send magic link'
      setMessage(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        margin: '0 20px'
      }}>
        {/* Logo and Branding */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#39E19D',
            marginBottom: '8px',
            letterSpacing: '-0.5px'
          }}>
            IdleNet
          </h1>
          <p style={{
            color: '#94A3B8',
            fontSize: '14px'
          }}>
            Distributed Computing Network
          </p>
        </div>

        {/* Main Login Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(57, 225, 157, 0.2)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
        }}>
          {/* Authentication Method Toggle */}
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
              onClick={() => setAuthMethod('magiclink')}
              style={{
                flex: 1,
                padding: '8px',
                background: authMethod === 'magiclink' ? 'rgba(57, 225, 157, 0.2)' : 'transparent',
                border: authMethod === 'magiclink' ? '1px solid rgba(57, 225, 157, 0.3)' : '1px solid transparent',
                borderRadius: '6px',
                color: authMethod === 'magiclink' ? '#39E19D' : '#94A3B8',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Magic Link
            </button>
          </div>

          {/* Email Input */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#CBD5E1',
              fontSize: '14px',
              fontWeight: '500'
            }}>
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
              onFocus={(e) => e.target.style.borderColor = 'rgba(57, 225, 157, 0.5)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(71, 85, 105, 0.3)'}
            />
          </div>

          {/* Password Input (only for password auth) */}
          {authMethod === 'password' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#CBD5E1',
                fontSize: '14px',
                fontWeight: '500'
              }}>
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
                onFocus={(e) => e.target.style.borderColor = 'rgba(57, 225, 157, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(71, 85, 105, 0.3)'}
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordAuth()}
              />
            </div>
          )}

          {/* Error/Success Messages */}
          {message && (
            <div style={{
              padding: '12px',
              marginBottom: '16px',
              background: message.includes('error') || message.includes('Failed') 
                ? 'rgba(239, 68, 68, 0.1)' 
                : 'rgba(57, 225, 157, 0.1)',
              border: `1px solid ${message.includes('error') || message.includes('Failed')
                ? 'rgba(239, 68, 68, 0.3)' 
                : 'rgba(57, 225, 157, 0.3)'}`,
              borderRadius: '8px',
              color: message.includes('error') || message.includes('Failed')
                ? '#FCA5A5'
                : '#86EFAC',
              fontSize: '13px',
              lineHeight: '1.5'
            }}>
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={authMethod === 'password' ? handlePasswordAuth : handleMagicLink}
            disabled={loading || !email || (authMethod === 'password' && !password)}
            style={{
              width: '100%',
              padding: '12px',
              background: loading || !email || (authMethod === 'password' && !password)
                ? 'rgba(71, 85, 105, 0.3)'
                : 'linear-gradient(135deg, #39E19D 0%, #2DD4BF 100%)',
              border: 'none',
              borderRadius: '8px',
              color: loading || !email || (authMethod === 'password' && !password)
                ? '#64748B'
                : '#0F172A',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading || !email || (authMethod === 'password' && !password)
                ? 'not-allowed'
                : 'pointer',
              transition: 'all 0.2s',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (!loading && email && (authMethod === 'magiclink' || password)) {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(57, 225, 157, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {loading ? 'Processing...' : 
             authMethod === 'password' 
               ? (isSignUp ? 'Create Account' : 'Sign In')
               : 'Send Magic Link'}
          </button>

          {/* Toggle Sign Up / Sign In (only for password auth) */}
          {authMethod === 'password' && (
            <div style={{
              marginTop: '20px',
              textAlign: 'center'
            }}>
              <span style={{ color: '#94A3B8', fontSize: '14px' }}>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              </span>
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setMessage('')
                }}
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

        {/* Footer Information */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#64748B',
            fontSize: '12px',
            lineHeight: '1.5'
          }}>
            By signing in, you agree to our Terms of Service<br/>
            80% cheaper than AWS • Processing starts immediately
          </p>
        </div>
      </div>
    </div>
  )
}