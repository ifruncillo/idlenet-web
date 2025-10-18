'use client'

import { useState, useEffect } from 'react'
import { getJobs } from '../lib/supabase'

export default function JobsPage() {
  const [jobs, setJobs] = useState<Array<{
    id: string
    status: string
    type?: string
    estimated_cost?: number
    actual_cost?: number
    created_at: string
    started_at?: string
    completed_at?: string
    result_url?: string
  }>>([])

  useEffect(() => {
    loadJobs()
    const interval = setInterval(loadJobs, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadJobs = async () => {
    const data = await getJobs()
    setJobs(data)
  }

  const handleDownload = async (jobId: string) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}/download`)
      if (!response.ok) {
        const error = await response.json()
        alert(`Download failed: ${error.error}`)
        return
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `job-${jobId}-result.txt`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download result')
    }
  }

  const handleExportCSV = () => {
    const headers = 'Job ID,Status,Type,Cost,Created,Started,Completed\n'
    const rows = jobs.map(job =>
      `${job.id},${job.status},${job.type || 'compute'},${job.estimated_cost || 0},${job.created_at},${job.started_at || ''},${job.completed_at || ''}`
    ).join('\n')

    const csvContent = headers + rows
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `jobs-export-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return '#10B981'
      case 'pending': return '#FCD34D'
      case 'assigned': return '#3B82F6'
      case 'running': return '#3B82F6'
      case 'failed': return '#EF4444'
      default: return '#64748B'
    }
  }

  const formatDuration = (start: string | undefined, end: string | undefined) => {
    if (!start || !end) return '-'
    const duration = new Date(end).getTime() - new Date(start).getTime()
    const seconds = Math.floor(duration / 1000)
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m ${seconds % 60}s`
  }

  const formatTimeAgo = (date: string) => {
    if (!date) return '-'
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
    return `${Math.floor(seconds / 86400)} days ago`
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
        {jobs.length === 0 ? (
          <p style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>
            No jobs found. Submit a job from the dashboard to get started!
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(71, 85, 105, 0.3)' }}>
                <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Job ID</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Type</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Started</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Duration</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Cost</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, i) => (
                <tr key={job.id} style={{
                  borderBottom: i < jobs.length - 1 ? '1px solid rgba(71, 85, 105, 0.2)' : 'none'
                }}>
                  <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: '14px' }}>
                    {job.id.slice(0, 8)}...
                  </td>
                  <td style={{ padding: '16px' }}>
                    {job.type || 'compute'}
                  </td>
                  <td style={{ padding: '16px', color: getStatusColor(job.status) }}>
                    {job.status}
                  </td>
                  <td style={{ padding: '16px', color: '#64748B' }}>
                    {formatTimeAgo(job.started_at || job.created_at)}
                  </td>
                  <td style={{ padding: '16px' }}>
                    {formatDuration(job.started_at, job.completed_at)}
                  </td>
                  <td style={{ padding: '16px' }}>
                    ${job.actual_cost || job.estimated_cost || '0.00'}
                  </td>
                  <td style={{ padding: '16px' }}>
                    {job.status === 'completed' && job.result_url ? (
                      <button
                        onClick={() => handleDownload(job.id)}
                        style={{
                          padding: '6px 12px',
                          background: 'rgba(57, 225, 157, 0.1)',
                          border: '1px solid rgba(57, 225, 157, 0.3)',
                          borderRadius: '6px',
                          color: '#39E19D',
                          fontSize: '12px',
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
                        Download
                      </button>
                    ) : (
                      <span style={{ color: '#64748B', fontSize: '12px' }}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {jobs.length > 0 && (
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
      )}
    </div>
  )
}