'use client'

import { supabase } from '@/lib/supabase'
import { JOB_POLL_INTERVAL, PRICE_PER_MB } from '@/lib/constants'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import FileDropzone from '@/components/FileDropzone'
import { useFileUpload } from '@/hooks/useFileUpload'
import styles from '@/components/shared.module.css'

export default function Dashboard() {
  const [user, setUser] = useState<{email?: string} | null>(null)
  const [jobs, setJobs] = useState<Array<Record<string, string>>>([])
  const { file, setFile, uploading, setUploading } = useFileUpload()
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUser(user)
    }
    checkUser()
  }, [router])

  const fetchJobs = useCallback(async () => {
    if (!user?.email) return
    const { data } = await supabase
      .from('jobs')
      .select('*')
      .eq('customer_email', user.email)
      .order('created_at', { ascending: false })
    if (data) setJobs(data)
  }, [user?.email])

  useEffect(() => {
    if (user) fetchJobs()
  }, [user, fetchJobs])

  // Poll for job status updates
  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      fetchJobs()
    }, JOB_POLL_INTERVAL)

    return () => clearInterval(interval)
  }, [user, fetchJobs])

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

  const handleUpload = async () => {
    if (!file || uploading || !user?.email) return

    setUploading(true)
    const fileName = `job-${Date.now()}-${file.name}`

    try {
      const { error: uploadError } = await supabase.storage
        .from('job-artifacts')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { error: jobError } = await supabase
        .from('jobs')
        .insert({
          artifact_url: fileName,
          status: 'pending',
          type: 'user-upload',
          customer_email: user.email,
          estimated_cost: (file.size / 1024 / 1024 * PRICE_PER_MB).toFixed(4)
        })

      if (jobError) throw jobError

      // Optimistic update: add new job to the list
      await fetchJobs()
      setFile(null)
    } catch (error: any) {
      console.error('Upload failed:', error)
      alert(`Upload failed: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const calculateDuration = useCallback((start: string, end: string) => {
    const duration = new Date(end).getTime() - new Date(start).getTime()
    const seconds = Math.floor(duration / 1000)
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m ${seconds % 60}s`
  }, [])

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
        <div style={{ color: 'var(--color-spring-green)', fontSize: '14px' }}>
          <span style={{ color: 'var(--color-slate)' }}>Logged in as: </span>
          {user?.email}
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            border: '1px solid rgba(57, 225, 157, 0.3)',
            color: 'var(--color-spring-green)',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-spring-green)'}
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

        <FileDropzone file={file} onFileSelect={setFile} />

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
          <h2 style={{ color: 'var(--color-spring-green)', fontSize: '1.5rem', marginBottom: '24px' }}>
            Your Jobs ({jobs.length})
          </h2>
          {jobs.length === 0 ? (
            <p style={{ color: 'var(--color-slate)' }}>No jobs yet - upload your first workload above!</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(57, 225, 157, 0.2)' }}>
                  <th style={{ textAlign: 'left', padding: '12px', color: 'var(--color-spring-green)' }}>File</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: 'var(--color-spring-green)' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: 'var(--color-spring-green)' }}>Cost</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: 'var(--color-spring-green)' }}>Time</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: 'var(--color-spring-green)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} style={{ borderBottom: '1px solid rgba(57, 225, 157, 0.1)' }}>
                    <td style={{ padding: '12px', color: 'var(--color-warm-white)' }}>
                      {job.artifact_url ? job.artifact_url.split('-').slice(2).join('-') : 'No file'}
                    </td>
                    <td style={{ padding: '12px', color: job.status === 'completed' ? 'var(--color-spring-green)' : '#F59E0B' }}>
                      {job.status}
                    </td>
                    <td style={{ padding: '12px', color: 'var(--color-aqua-glow)' }}>
                      ${job.status === 'completed'
                        ? (job.actual_cost || '0.00')
                        : (job.estimated_cost || '0.00')}
                    </td>
                    <td style={{ padding: '12px', color: 'var(--color-slate)' }}>
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
                            border: '1px solid var(--color-spring-green)',
                            color: 'var(--color-spring-green)',
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
