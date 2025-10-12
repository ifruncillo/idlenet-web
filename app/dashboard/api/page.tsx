'use client'

export default function ApiDocsPage() {
  return (
    <div style={{ padding: '32px', color: '#F1F5F9', maxWidth: '900px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '32px', color: '#39E19D' }}>
        API Documentation
      </h1>

      {/* Introduction */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Getting Started</h2>
        <p style={{ color: '#94A3B8', marginBottom: '16px' }}>
          The IdleNet API allows you to submit compute jobs programmatically. All requests require authentication using your API key.
        </p>
        <div style={{
          background: 'rgba(15, 23, 42, 0.5)',
          border: '1px solid rgba(71, 85, 105, 0.3)',
          borderRadius: '8px',
          padding: '16px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          Base URL: https://api.idlenet.io/v1
        </div>
      </div>

      {/* Authentication */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Authentication</h2>
        <p style={{ color: '#94A3B8', marginBottom: '16px' }}>
          Include your API key in the Authorization header:
        </p>
        <div style={{
          background: 'rgba(15, 23, 42, 0.5)',
          border: '1px solid rgba(71, 85, 105, 0.3)',
          borderRadius: '8px',
          padding: '16px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          Authorization: Bearer YOUR_API_KEY
        </div>
      </div>

      {/* Endpoints */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Endpoints</h2>
        
        {/* Submit Job */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{
              padding: '4px 8px',
              background: 'rgba(57, 225, 157, 0.1)',
              border: '1px solid rgba(57, 225, 157, 0.3)',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#39E19D'
            }}>POST</span>
            <span style={{ fontFamily: 'monospace' }}>/jobs/submit</span>
          </div>
          <p style={{ color: '#94A3B8', marginBottom: '12px' }}>Submit a new compute job</p>
          <div style={{
            background: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid rgba(71, 85, 105, 0.3)',
            borderRadius: '8px',
            padding: '16px',
            fontFamily: 'monospace',
            fontSize: '13px',
            whiteSpace: 'pre'
          }}>
{`{
  "file": "base64_encoded_content",
  "filename": "script.js",
  "runtime": "node" | "python" | "wasm"
}`}
          </div>
        </div>

        {/* Get Job Status */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{
              padding: '4px 8px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#3B82F6'
            }}>GET</span>
            <span style={{ fontFamily: 'monospace' }}>/jobs/:id</span>
          </div>
          <p style={{ color: '#94A3B8', marginBottom: '12px' }}>Get status and details of a specific job</p>
        </div>

        {/* List Jobs */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{
              padding: '4px 8px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#3B82F6'
            }}>GET</span>
            <span style={{ fontFamily: 'monospace' }}>/jobs</span>
          </div>
          <p style={{ color: '#94A3B8' }}>List all your submitted jobs</p>
        </div>
      </div>

      {/* Rate Limits */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Rate Limits</h2>
        <p style={{ color: '#94A3B8' }}>
          Standard accounts: 100 requests per minute<br/>
          Pro accounts: 1000 requests per minute
        </p>
      </div>
    </div>
  )
}