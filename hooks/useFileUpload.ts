import { useState } from 'react'

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const resetUpload = () => {
    setFile(null)
    setUploading(false)
  }

  return {
    file,
    setFile,
    uploading,
    setUploading,
    resetUpload
  }
}
