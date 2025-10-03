'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  'https://lltpwuhbuiubcldbprgc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdHB3dWhidWl1YmNsZGJwcmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNjU2MjQsImV4cCI6MjA3Mjc0MTYyNH0.Yoeyn3w1j3uFQX9nS21JC7UHWA5yHf8818-PVh27tpU'
)

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async () => {
    setLoading(true)
    setMessage('')
    setSuccess(false)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })
      
      if (error) throw error
      
      setSuccess(true)
      setMessage('Check your email for the password reset link!')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
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
      <div style={{ width: '100%', maxWidth: '440px', margin: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#39E19D', marginBottom: '8px', letterSpacing: '-0.5px' }}>
            IdleNet
          </h1>
          <h2 style={{ fontSize: '20px', color: '#F1F5F9', marginBottom: '8px' }}>
            Reset Your Password
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '14px' }}>
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(57, 225, 157, 0.2)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ marginBottom: '20px' }}>
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

          <button
            onClick={handleResetPassword}
            disabled={!email || loading}
            style={{
              width: '100%',
              padding: '12px',
              background: email && !loading ? 'linear-gradient(135deg, #39E19D 0%, #10B981 100%)' : 'rgba(71, 85, 105, 0.3)',
              border: 'none',
              borderRadius: '8px',
              color: email && !loading ? '#0F172A' : '#64748B',
              fontSize: '14px',
              fontWeight: '600',
              cursor: email && !loading ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              marginBottom: '16px'
            }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          {message && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: 'rgba(15, 23, 42, 0.5)',
              border: `1px solid ${success ? 'rgba(57, 225, 157, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
              borderRadius: '8px',
              color: success ? '#39E19D' : '#EF4444',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {message}
            </div>
          )}

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Link 
              href="/login"
              style={{
                color: '#39E19D',
                fontSize: '14px',
                textDecoration: 'none',
                opacity: 0.8,
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}