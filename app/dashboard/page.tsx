'use client'

import { useState } from 'react'

export default function DashboardPage() {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Handle file upload here
  }

  return (
    <div style={{ padding: '32px', color: '#F1F5F9' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
        Your Computing Dashboard
      </h1>
      <p style={{ color: '#94A3B8', fontSize: '18px', marginBottom: '48px' }}>
        Upload your workload and pay 80% less than AWS. Processing starts immediately.
      </p>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
        style={{
          border: '2px dashed rgba(57, 225, 157, 0.3)',
          borderRadius: '12px',
          padding: '64px',
          textAlign: 'center',
          background: dragActive ? 'rgba(57, 225, 157, 0.05)' : 'transparent',
          transition: 'all 0.3s',
          marginBottom: '48px',
          cursor: 'pointer'
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>📦</div>
        <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Drop your code here</h2>
        <p style={{ color: '#64748B' }}>or click to browse • Supports JavaScript, Python, WASM</p>
        <input id="fileInput" type="file" style={{ display: 'none' }} multiple />
      </div>

      {/* Jobs Table */}
      <div>
        <h2 style={{ fontSize: '24px', color: '#39E19D', marginBottom: '24px' }}>
          Your Jobs (3)
        </h2>
        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(71, 85, 105, 0.3)' }}>
                <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>File</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Cost</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Time</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(71, 85, 105, 0.2)' }}>
                <td style={{ padding: '16px' }}>test-job.js</td>
                <td style={{ padding: '16px', color: '#FCD34D' }}>pending</td>
                <td style={{ padding: '16px' }}>$0.00</td>
                <td style={{ padding: '16px', color: '#64748B' }}>~15s</td>
                <td style={{ padding: '16px' }}>
                  <button style={{
                    padding: '4px 12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '4px',
                    color: '#EF4444',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>Cancel</button>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '16px' }}>test-job.js</td>
                <td style={{ padding: '16px', color: '#FCD34D' }}>pending</td>
                <td style={{ padding: '16px' }}>$0.00</td>
                <td style={{ padding: '16px', color: '#64748B' }}>~15s</td>
                <td style={{ padding: '16px' }}>
                  <button style={{
                    padding: '4px 12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '4px',
                    color: '#EF4444',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}