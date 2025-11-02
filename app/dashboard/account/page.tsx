'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://lltpwuhbuiubcldbprgc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdHB3dWhidWl1YmNsZGJwcmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNjU2MjQsImV4cCI6MjA3Mjc0MTYyNH0.Yoeyn3w1j3uFQX9nS21JC7UHWA5yHf8818-PVh27tpU'
)

export default function AccountPage() {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setEmail(user.email || '')
    }
  }

  const handlePasswordUpdate = async () => {
    setMessage('')
    
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Password updated successfully!')
      setNewPassword('')
      setConfirmPassword('')
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '32px', color: '#F1F5F9' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '32px', color: '#39E19D' }}>
        Account Settings
      </h1>

      {/* Profile Information */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Profile Information</h2>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#94A3B8', marginBottom: '8px', fontSize: '14px' }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            disabled
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(71, 85, 105, 0.3)',
              borderRadius: '8px',
              color: '#94A3B8',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Password Update */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Update Password</h2>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#94A3B8', marginBottom: '8px', fontSize: '14px' }}>
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(71, 85, 105, 0.3)',
              borderRadius: '8px',
              color: '#F1F5F9',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#94A3B8', marginBottom: '8px', fontSize: '14px' }}>
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(71, 85, 105, 0.3)',
              borderRadius: '8px',
              color: '#F1F5F9',
              fontSize: '14px'
            }}
          />
        </div>

        {message && (
          <p style={{ 
            color: message.startsWith('Error') ? '#EF4444' : '#10B981',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {message}
          </p>
        )}

        <button
          onClick={handlePasswordUpdate}
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: 'rgba(57, 225, 157, 0.1)',
            border: '1px solid rgba(57, 225, 157, 0.3)',
            borderRadius: '8px',
            color: '#39E19D',
            fontSize: '14px',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            opacity: loading ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.background = 'rgba(57, 225, 157, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(57, 225, 157, 0.1)'
          }}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </div>

      {/* API Access */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>API Access</h2>
        <p style={{ color: '#94A3B8', marginBottom: '16px' }}>Your API key for programmatic access</p>
        <div style={{
          padding: '12px',
          background: 'rgba(15, 23, 42, 0.5)',
          border: '1px solid rgba(71, 85, 105, 0.3)',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '14px',
          wordBreak: 'break-all'
        }}>
          idle_key_xxxxxxxxxxxxxxxxxxxxxxxxx
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid rgba(239, 68, 68, 0.2)'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#EF4444' }}>Danger Zone</h2>
        <p style={{ color: '#94A3B8', marginBottom: '16px' }}>Once you delete your account, there is no going back.</p>
        <button
          style={{
            padding: '12px 24px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#EF4444',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  )
}