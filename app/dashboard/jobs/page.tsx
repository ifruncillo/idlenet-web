'use client'

export default function JobsPage() {
  const handleExportCSV = () => {
    const csvContent = `Job ID,File,Status,Started,Duration,Cost
#j-001,test-job.js,completed,2 hours ago,12s,$0.02
#j-002,process.py,running,5 min ago,5m 23s,$0.14
#j-003,render.wasm,queued,-,-,-`
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'jobs-export.csv'
    a.click()
  }

  return (
    <div style={{ padding: '32px', color: '#F1F5F9' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px', color: '#39E19D' }}>
        All Jobs
      </h1>
      
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(71, 85, 105, 0.3)' }}>
              <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Job ID</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>File</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Started</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Duration</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(71, 85, 105, 0.2)' }}>
              <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: '14px' }}>#j-001</td>
              <td style={{ padding: '16px' }}>test-job.js</td>
              <td style={{ padding: '16px', color: '#10B981' }}>completed</td>
              <td style={{ padding: '16px', color: '#64748B' }}>2 hours ago</td>
              <td style={{ padding: '16px' }}>12s</td>
              <td style={{ padding: '16px' }}>$0.02</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(71, 85, 105, 0.2)' }}>
              <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: '14px' }}>#j-002</td>
              <td style={{ padding: '16px' }}>process.py</td>
              <td style={{ padding: '16px', color: '#FCD34D' }}>running</td>
              <td style={{ padding: '16px', color: '#64748B' }}>5 min ago</td>
              <td style={{ padding: '16px' }}>5m 23s</td>
              <td style={{ padding: '16px' }}>$0.14</td>
            </tr>
            <tr>
              <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: '14px' }}>#j-003</td>
              <td style={{ padding: '16px' }}>render.wasm</td>
              <td style={{ padding: '16px', color: '#64748B' }}>queued</td>
              <td style={{ padding: '16px', color: '#64748B' }}>-</td>
              <td style={{ padding: '16px' }}>-</td>
              <td style={{ padding: '16px' }}>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={handleExportCSV}
        style={{
          marginTop: '24px',
          padding: '12px 24px',
          background: 'rgba(57, 225, 157, 0.1)',
          border: '1px solid rgba(57, 225, 157, 0.3)',
          borderRadius: '8px',
          color: '#39E19D',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(57, 225, 157, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(57, 225, 157, 0.1)'
        }}
      >
        Export as CSV
      </button>
    </div>
  )
}