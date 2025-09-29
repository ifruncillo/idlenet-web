'use client'

import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState, useCallback } from 'react'

const supabase = createClient(
  'https://lltpwuhbuiubcldbprgc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdHB3dWhidWl1YmNsZGJwcmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNjU2MjQsImV4cCI6MjA3Mjc0MTYyNH0.Yoeyn3w1j3uFQX9nS21JC7UHWA5yHf8818-PVh27tpU'
)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [userEmail, setUserEmail] = useState('')

  const checkUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    } else {
      setUserEmail(user.email || '')
    }
  }, [router])

  useEffect(() => {
    checkUser()
  }, [checkUser])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/dashboard/jobs', label: 'Jobs', icon: '⚡' },
    { path: '/dashboard/billing', label: 'Billing', icon: '💳' },
    { path: '/dashboard/account', label: 'Account', icon: '👤' },
    { path: '/dashboard/api', label: 'API Docs', icon: '🔧' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0F172A' }}>
      {/* Sidebar */}
      <div style={{
        width: '240px',
        background: 'rgba(30, 41, 59, 0.5)',
        borderRight: '1px solid rgba(57, 225, 157, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {/* Logo */}
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(71, 85, 105, 0.3)' }}>
          <h1 style={{ fontSize: '24px', color: '#39E19D', margin: 0 }}>IdleNet</h1>
          <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0 0' }}>Compute Network</p>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px 8px' }}>
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              style={{
                width: '100%',
                padding: '12px 16px',
                marginBottom: '4px',
                background: pathname === item.path ? 'rgba(57, 225, 157, 0.1)' : 'transparent',
                border: pathname === item.path ? '1px solid rgba(57, 225, 157, 0.2)' : '1px solid transparent',
                borderRadius: '8px',
                color: pathname === item.path ? '#39E19D' : '#94A3B8',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                if (pathname !== item.path) {
                  e.currentTarget.style.background = 'rgba(57, 225, 157, 0.05)'
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== item.path) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User section */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid rgba(71, 85, 105, 0.3)'
        }}>
          <div style={{ marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Logged in as:</p>
            <p style={{ fontSize: '14px', color: '#F1F5F9', margin: '4px 0', wordBreak: 'break-all' }}>{userEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '8px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '6px',
              color: '#EF4444',
              fontSize: '14px',
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
            Logout
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  )
}