'use client'
import { useState } from 'react'

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleAddPayment = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'setup',
          customer_email: 'ifruncillo@gmail.com'
        })
      })
      
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to open payment setup')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ padding: '32px', color: '#F1F5F9' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '32px', color: '#39E19D' }}>
        Billing
      </h1>
      
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        border: '1px solid rgba(57, 225, 157, 0.2)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h2 style={{ fontSize: '18px', color: '#94A3B8', marginBottom: '8px' }}>Current Balance</h2>
        <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#39E19D' }}>$0.16</p>
        <p style={{ fontSize: '14px', color: '#64748B', marginTop: '8px' }}>Last payment: Never</p>
      </div>
      
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Usage This Month</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <p style={{ color: '#94A3B8', marginBottom: '8px' }}>Compute Hours</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>0.4 hours</p>
          </div>
          <div>
            <p style={{ color: '#94A3B8', marginBottom: '8px' }}>Jobs Processed</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>3</p>
          </div>
        </div>
      </div>
      
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Payment Method</h2>
        <p style={{ color: '#94A3B8', marginBottom: '16px' }}>No payment method on file</p>
        <button
          onClick={handleAddPayment}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            background: 'rgba(57, 225, 157, 0.1)',
            border: '1px solid rgba(57, 225, 157, 0.3)',
            borderRadius: '8px',
            color: '#39E19D',
            fontSize: '14px',
            fontWeight: '500',
            cursor: isLoading ? 'wait' : 'pointer',
            transition: 'all 0.2s',
            opacity: isLoading ? 0.6 : 1
          }}
          onMouseEnter={(e) => {
            if (!isLoading) e.currentTarget.style.background = 'rgba(57, 225, 157, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(57, 225, 157, 0.1)'
          }}
        >
          {isLoading ? 'Loading...' : 'Add Payment Method'}
        </button>
      </div>
    </div>
  )
}
