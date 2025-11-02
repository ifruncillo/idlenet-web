import { useState } from 'react'

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetUpload = () => {
    setFile(null)
    setUploading(false)
    setError(null)
  }

  return {
    file,
    setFile,
    uploading,
    setUploading,
    error,
    setError,
    resetUpload
  }
}
