# Deployment Guide

## Prerequisites
- [ ] Build runs successfully (`npm run build`)
- [ ] All environment variables identified
- [ ] Git repository created
- [ ] Netlify or Vercel account created

## Steps

### Option 1: Netlify

1. **Via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

2. **Via Git Integration:**
   - Push code to GitHub
   - Connect repository in Netlify dashboard
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variables in dashboard

### Option 2: Vercel

1. **Via Vercel CLI:**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Via Git Integration:**
   - Push code to GitHub
   - Import project in Vercel dashboard
   - Build settings auto-detected
   - Add environment variables in dashboard

## TODO
- [ ] Add your deployment steps
- [ ] Test environment variables
- [ ] Verify production build
