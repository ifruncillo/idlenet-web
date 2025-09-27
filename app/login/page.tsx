'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async () => {
    await supabase.auth.signInWithOtp({ 
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` }
    })
    alert('Check your email for login link!')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-96 p-8">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">
          Send Login Link
        </button>
      </div>
    </div>
  )
}
