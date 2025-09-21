"use client";

import { useState } from "react";
import styles from "./upload.module.css";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file || uploading) return;
    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const uploadResponse = await fetch('https://idlenet-pilot-qi7t.vercel.app/api/jobs/upload', {
        method: 'POST',
        body: formData
      });
      
      const uploadData = await uploadResponse.json();
      
      const jobResponse = await fetch('https://idlenet-pilot-qi7t.vercel.app/api/jobs/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          type: 'javascript',
          artifactUrl: uploadData.artifactUrl,
          artifactSHA256: uploadData.sha256,
          priority: 1
        })
      });
      
      const jobData = await jobResponse.json();
      alert(`Job submitted successfully! ID: ${jobData.jobId}`);
      setFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>Submit Computing Job</h1>
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
            onClick={handleSubmit}
            disabled={uploading}
            className={styles.submitButton}
          >
            {uploading ? "Processing Upload..." : "Submit to IdleNet →"}
          </button>
        )}
      </div>
    </div>
  );
}