# IdleNet Web - Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Supabase Project**: Set up at [supabase.com](https://supabase.com)

## Environment Variables

Configure these in your Vercel project settings or `.env.local`:

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional (has default)
NEXT_PUBLIC_IDLENET_API_URL=https://idlenet-pilot-qi7t.vercel.app
```

## Deployment Options

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Configure environment variables
4. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Or deploy preview
vercel
```

### Option 3: Deploy from this branch

```bash
# Deploy current branch
vercel --prod

# The CLI will prompt you to:
# 1. Link to existing project or create new
# 2. Set environment variables
# 3. Deploy
```

## Post-Deployment

1. **Set Environment Variables** in Vercel dashboard:
   - Project Settings → Environment Variables
   - Add all required variables
   - Redeploy if needed

2. **Configure Supabase**:
   - Update redirect URLs in Supabase dashboard
   - Add your Vercel domain to allowed URLs

3. **Test**:
   - Visit your deployment URL
   - Test login functionality
   - Test file upload
   - Verify job status polling

## Troubleshooting

### Build fails with font errors
- This is a network issue with Google Fonts
- The build should still succeed, it's just warnings
- Fonts will fall back to Geist fonts

### Environment variables not working
- Make sure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding environment variables
- Check Vercel dashboard → Deployments → Environment Variables

### Supabase authentication not working
- Verify SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Add Vercel domain to Supabase allowed redirect URLs
- Check browser console for errors

## Production Checklist

- [ ] All environment variables configured
- [ ] Supabase redirect URLs updated
- [ ] Build completes successfully
- [ ] Login/signup works
- [ ] File upload works
- [ ] Job status updates automatically
- [ ] Download results works
