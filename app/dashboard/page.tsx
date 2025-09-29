'use client'

export default function DashboardPage() {
  return (
    <div style={{ padding: '32px' }}>
      <h1 style={{ color: '#39E19D', fontSize: '32px', marginBottom: '24px' }}>
        Dashboard
      </h1>
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        border: '1px solid rgba(57, 225, 157, 0.2)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <p style={{ color: '#94A3B8' }}>Welcome to your IdleNet dashboard.</p>
      </div>
    </div>
  )
}