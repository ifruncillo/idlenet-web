'use client'

import { useState } from 'react'

export default function AccountPage() {
  const [email] = useState('ifruncillo@gmail.com')

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

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#94A3B8', marginBottom: '8px', fontSize: '14px' }}>
            Account Type
          </label>
          <p style={{ fontSize: '14px', color: '#39E19D' }}>Standard</p>
        </div>
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