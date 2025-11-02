import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lltpwuhbuiubcldbprgc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdHB3dWhidWl1YmNsZGJwcmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNjU2MjQsImV4cCI6MjA3Mjc0MTYyNH0.Yoeyn3w1j3uFQX9nS21JC7UHWA5yHf8818-PVh27tpU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function submitJob(file: File) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Convert file to base64
  const arrayBuffer = await file.arrayBuffer()
  const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
  
  // Create job in database
  const { data, error } = await supabase
    .from('jobs')
    .insert({
      customer_email: user.email,
      customer_id: user.id,
      type: 'compute',
      artifact_url: `data:${file.type};base64,${base64}`,
      status: 'pending',
      estimated_cost: 0.01
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getJobs() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('customer_email', user.email)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching jobs:', error)
    return []
  }

  return data || []
}