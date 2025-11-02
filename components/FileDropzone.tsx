'use client'

import { useState } from 'react'
import styles from './FileDropzone.module.css'

interface FileDropzoneProps {
  file: File | null
  onFileSelect: (file: File | null) => void
  accept?: string
}

export default function FileDropzone({ file, onFileSelect, accept = ".js,.py,.wasm" }: FileDropzoneProps) {
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0])
    }
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ''}`}
    >
      <input
        type="file"
        onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'pointer'
        }}
        accept={accept}
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
  )
}
