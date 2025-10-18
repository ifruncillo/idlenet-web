import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: jobId } = await params

    // Use service role client to bypass RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get job details
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('result_url, type, status')
      .eq('id', jobId)
      .single()

    if (jobError || !job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    if (job.status !== 'completed') {
      return NextResponse.json(
        { error: 'Job not completed yet' },
        { status: 400 }
      )
    }

    if (!job.result_url) {
      return NextResponse.json(
        { error: 'No result file available' },
        { status: 404 }
      )
    }

    // Extract file path from result_url
    // Format: https://lltpwuhbuiubcldbprgc.supabase.co/storage/v1/object/public/job-results/job-{uuid}-result-{random}.txt
    const urlParts = job.result_url.split('/job-results/')
    if (urlParts.length !== 2) {
      return NextResponse.json(
        { error: 'Invalid result URL format' },
        { status: 500 }
      )
    }
    const filePath = urlParts[1]

    // Download file from storage
    const { data: fileData, error: downloadError } = await supabase
      .storage
      .from('job-results')
      .download(filePath)

    if (downloadError || !fileData) {
      console.error('Download error:', downloadError)
      return NextResponse.json(
        { error: 'Failed to download result file' },
        { status: 500 }
      )
    }

    // Convert blob to text
    const resultText = await fileData.text()

    // Return file with appropriate headers
    return new NextResponse(resultText, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="job-${jobId}-result.txt"`,
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}