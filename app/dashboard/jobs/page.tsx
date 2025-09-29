'use client'

export default function JobsPage() {
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
    </div>
  )
}