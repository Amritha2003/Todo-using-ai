# Deployment Guide for Vercel

This guide will help you deploy your Next.js Todo app to Vercel.

## Prerequisites

- ✅ Next.js app is ready for production
- ✅ Supabase project is set up
- ✅ Environment variables are configured
- ✅ Database tables are created with RLS policies

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Todo app ready for deployment"

# Add remote repository
git remote add origin https://github.com/Amritha2003/Todo-using-ai.git

# Push to GitHub
git push -u origin main
```

### 1.2 Verify Environment Variables
Make sure your `.env.local` file contains:
```env
NEXT_PUBLIC_SUPABASE_URL=https://rkjezcfjuhagnqwumubx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI
```

## Step 2: Deploy to Vercel

### Option A: Automatic Deployment (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your `Todo-using-ai` repository
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `.next` (should auto-detect)
   - **Install Command**: `npm install` (should auto-detect)

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://rkjezcfjuhagnqwumubx.supabase.co
   Environment: Production, Preview, Development
   ```
   ```
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI
   Environment: Production, Preview, Development
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (usually 2-3 minutes)

### Option B: Manual Deployment with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # Deploy to production
   vercel --prod
   
   # Or deploy to preview
   vercel
   ```

## Step 3: Verify Deployment

### 3.1 Check Build Status
- Go to your Vercel dashboard
- Check that the build completed successfully
- Look for any build errors in the logs

### 3.2 Test Your App
- Visit your deployed URL (e.g., `https://todo-using-ai.vercel.app`)
- Test the following functionality:
  - ✅ User registration
  - ✅ User login
  - ✅ Creating tasks
  - ✅ Viewing tasks
  - ✅ Project selection

### 3.3 Check Environment Variables
- Go to Project Settings → Environment Variables
- Verify all variables are set correctly
- Check that they're available in all environments

## Step 4: Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Supabase Settings**
   - Go to your Supabase dashboard
   - Navigate to Authentication → URL Configuration
   - Add your custom domain to allowed redirect URLs

## Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Check build logs in Vercel dashboard
   # Common fixes:
   npm install
   npm run build
   ```

2. **Environment Variables Not Working**
   - Verify variables are set in Vercel dashboard
   - Check that they're available in the correct environment
   - Redeploy after adding variables

3. **Supabase Connection Issues**
   - Verify Supabase URL and key are correct
   - Check Supabase project is active
   - Verify RLS policies are set up correctly

4. **Authentication Not Working**
   - Check Supabase Auth settings
   - Verify redirect URLs are configured
   - Test with different browsers

### Debug Commands

```bash
# Test production build locally
npm run build:prod

# Check TypeScript errors
npm run type-check

# Lint code
npm run lint

# Test production server locally
npm run build
npm run start
```

## Post-Deployment Checklist

- ✅ App loads without errors
- ✅ User registration works
- ✅ User login works
- ✅ Task creation works
- ✅ Task viewing works
- ✅ Project selection works
- ✅ Responsive design works on mobile
- ✅ Environment variables are secure
- ✅ Custom domain is configured (if applicable)

## Monitoring and Analytics

1. **Vercel Analytics**
   - Enable in Project Settings → Analytics
   - Monitor performance and user behavior

2. **Error Tracking**
   - Consider adding Sentry or similar service
   - Monitor for runtime errors

3. **Performance Monitoring**
   - Use Vercel's built-in performance monitoring
   - Check Core Web Vitals

## Security Considerations

1. **Environment Variables**
   - Never commit `.env.local` to git
   - Use Vercel's environment variable management
   - Rotate keys regularly

2. **Supabase Security**
   - Enable Row Level Security (RLS)
   - Use proper authentication policies
   - Monitor database access logs

3. **HTTPS**
   - Vercel provides HTTPS by default
   - Ensure all external links use HTTPS

## Updates and Maintenance

### Deploying Updates
```bash
# Make your changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel will automatically redeploy
```

### Rollback
- Go to Vercel dashboard
- Navigate to Deployments
- Click "Redeploy" on a previous deployment

## Support

If you encounter issues:
1. Check Vercel documentation
2. Review build logs in Vercel dashboard
3. Check Supabase logs
4. Test locally with `npm run build:prod` 