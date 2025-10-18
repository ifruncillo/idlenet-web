import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { mode, customer_email } = await req.json()
  
  // For now, return test data
  // TODO: Integrate with Stripe
  console.log('Payment setup requested for:', customer_email)
  
  return NextResponse.json({ 
    url: 'https://checkout.stripe.com/test_session', // Replace with actual Stripe session URL
    error: 'Stripe not configured yet - add STRIPE_SECRET_KEY to env'
  })
}
