'use client'

import { useState, useEffect } from 'react'
import { submitJob, getJobs } from './lib/supabase'

export default function DashboardPage() {
  const [dragActive, setDragActive] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [jobs, setJobs] = useState<Array<{
  id: string
  status: string
  type?: string
  estimated_cost?: number
  actual_cost?: number
  created_at: string
  started_at?: string
  completed_at?: string
}>>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadJobs()
    const interval = setInterval(loadJobs, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const loadJobs = async () => {
    const data = await getJobs()
    setJobs(data)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    await handleFiles(files)
  }

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    await handleFiles(files)
  }

  const handleFiles = async (files: File[]) => {
    setUploading(true)
    for (const file of files) {
      try {
        await submitJob(file)
      } catch (error) {
        console.error('Error submitting job:', error)
      }
    }
    setUploading(false)
    loadJobs()
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return '#10B981'
      case 'pending': return '#FCD34D'
      case 'assigned': return '#3B82F6'
      case 'failed': return '#EF4444'
      default: return '#64748B'
    }
  }

  return (
    <div style={{ padding: '32px', color: '#F1F5F9' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
        Your Computing Dashboard
      </h1>
      <p style={{ color: '#94A3B8', fontSize: '18px', marginBottom: '48px' }}>
        Upload your workload to the IdleNet distributed compute network.
      </p>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          border: '2px dashed rgba(57, 225, 157, 0.3)',
          borderRadius: '12px',
          padding: '64px',
          textAlign: 'center',
          background: dragActive ? 'rgba(57, 225, 157, 0.05)' : 'transparent',
          transition: 'all 0.3s',
          marginBottom: '48px',
          cursor: 'pointer',
          boxShadow: isHovered ? '0 0 30px rgba(57, 225, 157, 0.3)' : 'none'
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>📦</div>
        <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>
          {uploading ? 'Uploading...' : 'Drop your code here'}
        </h2>
        <p style={{ color: '#64748B' }}>or click to browse • Supports JavaScript, Python, WASM</p>
        <input 
          id="fileInput" 
          type="file" 
          style={{ display: 'none' }} 
          multiple 
          accept=".js,.py,.wasm,.jsx,.ts,.tsx,.mjs,.rs,.go,.c,.cpp"
          onChange={handleFileInput}
        />
      </div>

      {/* Jobs Table */}
      <div>
        <h2 style={{ fontSize: '24px', color: '#39E19D', marginBottom: '24px' }}>
          Your Jobs ({jobs.length})
        </h2>
        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          {jobs.length === 0 ? (
            <p style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>
              No jobs yet. Upload a file to get started!
            </p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(71, 85, 105, 0.3)' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Job ID</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Cost</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#39E19D' }}>Created</th>
                </tr>
              </thead>
              <tbody>
                {jobs.slice(0, 5).map((job, i) => (
                  <tr key={job.id} style={{ 
                    borderBottom: i < jobs.length - 1 ? '1px solid rgba(71, 85, 105, 0.2)' : 'none' 
                  }}>
                    <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: '12px' }}>
                      {job.id.slice(0, 8)}...
                    </td>
                    <td style={{ padding: '16px', color: getStatusColor(job.status) }}>
                      {job.status}
                    </td>
                    <td style={{ padding: '16px' }}>
                      ${job.estimated_cost || '0.00'}
                    </td>
                    <td style={{ padding: '16px', color: '#64748B' }}>
                      {new Date(job.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}