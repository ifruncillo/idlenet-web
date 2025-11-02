// API configuration constants
export const IDLENET_API_URL = process.env.NEXT_PUBLIC_IDLENET_API_URL || 'https://idlenet-pilot-qi7t.vercel.app'

// Polling intervals
export const JOB_POLL_INTERVAL = 5000 // 5 seconds

// File upload settings
export const ACCEPTED_FILE_TYPES = '.js,.py,.wasm'
export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

// Pricing
export const PRICE_PER_MB = 0.002
