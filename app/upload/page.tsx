"use client";

import FileDropzone from '@/components/FileDropzone'
import { useFileUpload } from '@/hooks/useFileUpload'
import { IDLENET_API_URL } from '@/lib/constants'
import styles from '@/components/shared.module.css'

// NOTE: This is a legacy upload page for testing purposes
// Main upload flow is through /dashboard
export default function UploadPage() {
  const { file, setFile, uploading, setUploading } = useFileUpload();

  const handleSubmit = async () => {
    if (!file || uploading) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadResponse = await fetch(`${IDLENET_API_URL}/api/jobs/upload`, {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.statusText}`)
      }

      const uploadData = await uploadResponse.json();

      const jobResponse = await fetch(`${IDLENET_API_URL}/api/jobs/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com', // Test email for legacy upload page
          type: 'javascript',
          artifactUrl: uploadData.artifactUrl,
          artifactSHA256: uploadData.sha256,
          priority: 1
        })
      });

      if (!jobResponse.ok) {
        throw new Error(`Job submission failed: ${jobResponse.statusText}`)
      }

      const jobData = await jobResponse.json();
      alert(`Job submitted successfully! ID: ${jobData.jobId}`);
      setFile(null);
    } catch (error: any) {
      console.error('Upload failed:', error);
      alert(`Upload failed: ${error.message}`);
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

        <FileDropzone file={file} onFileSelect={setFile} />

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