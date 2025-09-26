'use client'
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './dashboard.module.css'

const supabase = createClient(
  'https://lltpwuhbuiubcldbprgc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdHB3dWhidWl1YmNsZGJwcmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNjU2MjQsImV4cCI6MjA3Mjc0MTYyNH0.Yoeyn3w1j3uFQX9nS21JC7UHWA5yHf8818-PVh27tpU'
)

export default function Dashboard() {
  const [user, setUser] = useState<{email?: string} | null>(null)
  const [jobs, setJobs] = useState<Array<Record<string, string>>>([])
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/login')
      setUser(user)
    }
    checkUser()
  }, [router])

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user?.email) return
      const { data } = await supabase
        .from('jobs')
        .select('*')
        .eq('customer_email', user.email)
        .order('created_at', { ascending: false })
      if (data) setJobs(data)
    }
    if (user) fetchJobs()
  }, [user])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const handleDownload = async (artifactUrl: string) => {
    const { data } = await supabase.storage
      .from('job-artifacts')
      .download(artifactUrl)
    
    if (data) {
      const url = URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = artifactUrl.split('/').pop() || 'download'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file || uploading || !user?.email) return
    
    setUploading(true)
    const fileName = `job-${Date.now()}-${file.name}`
    
    const { error: uploadError } = await supabase.storage
      .from('job-artifacts')
      .upload(fileName, file)
      
    if (!uploadError) {
      const { error: jobError } = await supabase
        .from('jobs')
        .insert({
          artifact_url: fileName,
          status: 'pending',
          type: 'user-upload',
          customer_email: user.email,
          estimated_cost: (file.size / 1024 / 1024 * 0.002).toFixed(4)
        })
      
      if (!jobError) {
        const { data } = await supabase
          .from('jobs')
          .select('*')
          .eq('customer_email', user.email)
          .order('created_at', { ascending: false })
        if (data) setJobs(data)
        setFile(null)
      }
    }
    setUploading(false)
  }

  const calculateDuration = (start: string, end: string) => {
    const duration = new Date(end).getTime() - new Date(start).getTime()
    const seconds = Math.floor(duration / 1000)
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m ${seconds % 60}s`
  }

  return (
    <div className={styles.uploadContainer}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '768px',
        margin: '0 auto 24px',
        padding: '0 48px'
      }}>
        <div style={{ color: '#39E19D', fontSize: '14px' }}>
          <span style={{ color: '#6C7280' }}>Logged in as: </span>
          {user?.email}
        </div>
        <button 
          onClick={handleLogout}
          style={{
            background: 'transparent',
            border: '1px solid rgba(57, 225, 157, 0.3)',
            color: '#39E19D',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = '#39E19D'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(57, 225, 157, 0.3)'}
        >
          Logout
        </button>
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>Your Computing Dashboard</h1>
        <p className={styles.subtitle}>
          Upload your workload and pay 80% less than AWS. Processing starts immediately.
        </p>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ''}`}
        >
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer'
            }}
            accept=".js,.py,.wasm"
          />

          {file ? (
            <div>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
              <p className={styles.fileName}>{file.name}</p>
              <p className={styles.fileSize}>
                {(file.size / 1024).toFixed(2)} KB ready to process
              </p>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.6 }}>📦</div>
              <p className={styles.dropzoneText}>
                Drop your code here
              </p>
              <p className={styles.dropzoneSubtext}>
                or click to browse • Supports JavaScript, Python, WASM
              </p>
            </div>
          )}
        </div>

        {file && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={styles.submitButton}
          >
            {uploading ? "Processing Upload..." : "Submit to IdleNet →"}
          </button>
        )}
        
        <div style={{ marginTop: '48px' }}>
          <h2 style={{ color: '#39E19D', fontSize: '1.5rem', marginBottom: '24px' }}>
            Your Jobs ({jobs.length})
          </h2>
          {jobs.length === 0 ? (
            <p style={{ color: '#6C7280' }}>No jobs yet - upload your first workload above!</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(57, 225, 157, 0.2)' }}>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#39E19D' }}>File</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#39E19D' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#39E19D' }}>Cost</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#39E19D' }}>Time</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#39E19D' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} style={{ borderBottom: '1px solid rgba(57, 225, 157, 0.1)' }}>
                    <td style={{ padding: '12px', color: '#FFF9F0' }}>
                      {job.artifact_url ? job.artifact_url.split('-').slice(2).join('-') : 'No file'}
                    </td>
                    <td style={{ padding: '12px', color: job.status === 'completed' ? '#39E19D' : '#F59E0B' }}>
                      {job.status}
                    </td>
                    <td style={{ padding: '12px', color: '#64F2C6' }}>
                      ${job.status === 'completed' 
                        ? (job.actual_cost || '0.00')
                        : (job.estimated_cost || '0.00')}
                    </td>
                    <td style={{ padding: '12px', color: '#6C7280' }}>
                      {job.status === 'completed' && job.started_at && job.completed_at
                        ? calculateDuration(job.started_at, job.completed_at)
                        : '~15s'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {job.status === 'completed' && job.artifact_url && (
                        <button
                          onClick={() => handleDownload(job.artifact_url)}
                          style={{
                            background: 'transparent',
                            border: '1px solid #39E19D',
                            color: '#39E19D',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Download
                        </button>
                      )}
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
