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
      role="button"
      tabIndex={0}
      aria-label="File upload dropzone"
    >
      <input
        type="file"
        onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
        className={styles.fileInput}
        accept={accept}
        aria-label="Select file for upload"
        id="file-upload"
      />

      {file ? (
        <div>
          <div style={{ fontSize: '64px', marginBottom: '20px' }} role="img" aria-label="Checkmark">✅</div>
          <p className={styles.fileName}>{file.name}</p>
          <p className={styles.fileSize}>
            {(file.size / 1024).toFixed(2)} KB ready to process
          </p>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.6 }} role="img" aria-label="Package icon">📦</div>
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
