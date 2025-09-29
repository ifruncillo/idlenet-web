'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://lltpwuhbuiubcldbprgc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdHB3dWhidWl1YmNsZGJwcmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNjU2MjQsImV4cCI6MjA3Mjc0MTYyNH0.Yoeyn3w1j3uFQX9nS21JC7UHWA5yHf8818-PVh27tpU'
)

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Record<string, any>[]>([])
  const [loading, setLoading] = useState(true)
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    fetchRecentJobs()
  }, [])

  const fetchRecentJobs = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('jobs')
        .select('*')
        .eq('customer_email', user.email)
        .order('created_at', { ascending: false })
        .limit(5)
      
      setJobs(data || [])
    }
    setLoading(false)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Handle file upload here
  }

  const handleFileInput = () => {
    // Handle file upload here
  }

  return (
    <div style={{ 
      padding: '32px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', color: '#F1F5F9', marginBottom: '8px' }}>Dashboard</h1>
        <p style={{ color: '#94A3B8', fontSize: '14px' }}>
          Upload compute jobs and save 80% vs AWS batch processing
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          border: '1px solid rgba(57, 225, 157, 0.2)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <p style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '8px' }}>Total Jobs</p>
          <p style={{ color: '#39E19D', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            {jobs.length}
          </p>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          border: '1px solid rgba(57, 225, 157, 0.2)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <p style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '8px' }}>Estimated Savings</p>
          <p style={{ color: '#39E19D', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            ${(jobs.reduce((sum, job) => sum + (job.estimated_cost || 0), 0) * 4).toFixed(2)}
          </p>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          border: '1px solid rgba(57, 225, 157, 0.2)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <p style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '8px' }}>Active Jobs</p>
          <p style={{ color: '#39E19D', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            {jobs.filter(j => j.status === 'pending' || j.status === 'assigned').length}
          </p>
        </div>
      </div>

      {/* Upload Area - Much smaller */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        border: dragActive ? '2px dashed #39E19D' : '2px dashed rgba(71, 85, 105, 0.5)',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
        marginBottom: '32px',
        transition: 'all 0.2s',
        cursor: 'pointer'
      }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <div style={{ fontSize: '32px', marginBottom: '16px' }}>📦</div>
        <h3 style={{ color: '#F1F5F9', marginBottom: '8px' }}>Drop your code here</h3>
        <p style={{ color: '#94A3B8', fontSize: '14px' }}>
          or click to browse • Supports JavaScript, Python, WASM
        </p>
        <input
          id="file-input"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileInput}
          accept=".js,.py,.wasm"
        />
      </div>

      {/* Quick Start */}
      <div style={{
        background: 'rgba(57, 225, 157, 0.1)',
        border: '1px solid rgba(57, 225, 157, 0.2)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '32px'
      }}>
        <h3 style={{ color: '#39E19D', marginBottom: '12px' }}>Quick Start with API</h3>
        <pre style={{
          background: 'rgba(15, 23, 42, 0.5)',
          padding: '12px',
          borderRadius: '8px',
          color: '#F1F5F9',
          fontSize: '12px',
          overflow: 'auto'
        }}>
{`curl -X POST https://api.idlenet.io/jobs \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"type": "batch", "artifact_url": "s3://your-bucket/code.zip"}'`}
        </pre>
      </div>

      {/* Recent Jobs Table */}
      <div>
        <h2 style={{ color: '#F1F5F9', marginBottom: '16px' }}>Recent Jobs</h2>
        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          border: '1px solid rgba(71, 85, 105, 0.3)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(71, 85, 105, 0.3)' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94A3B8', fontSize: '12px', fontWeight: '600' }}>JOB ID</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94A3B8', fontSize: '12px', fontWeight: '600' }}>STATUS</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94A3B8', fontSize: '12px', fontWeight: '600' }}>TYPE</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94A3B8', fontSize: '12px', fontWeight: '600' }}>COST</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94A3B8', fontSize: '12px', fontWeight: '600' }}>CREATED</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#94A3B8' }}>
                    Loading jobs...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#94A3B8' }}>
                    No jobs yet. Upload your first job above!
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} style={{ borderBottom: '1px solid rgba(71, 85, 105, 0.2)' }}>
                    <td style={{ padding: '12px', color: '#F1F5F9', fontSize: '14px' }}>
                      {job.id.substring(0, 8)}...
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500',
                        background: job.status === 'completed' ? 'rgba(34, 197, 94, 0.1)' : 
                                   job.status === 'pending' ? 'rgba(250, 204, 21, 0.1)' : 
                                   'rgba(239, 68, 68, 0.1)',
                        color: job.status === 'completed' ? '#22C55E' : 
                               job.status === 'pending' ? '#FACC15' : 
                               '#EF4444'
                      }}>
                        {job.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#F1F5F9', fontSize: '14px' }}>
                      {job.type || 'batch'}
                    </td>
                    <td style={{ padding: '12px', color: '#39E19D', fontSize: '14px' }}>
                      ${job.estimated_cost || '0.00'}
                    </td>
                    <td style={{ padding: '12px', color: '#94A3B8', fontSize: '14px' }}>
                      {new Date(job.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}