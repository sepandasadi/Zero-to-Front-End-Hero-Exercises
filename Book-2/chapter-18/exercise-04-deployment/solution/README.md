# Exercise 04: Deployment - Solution

## 🎯 What's Included

- ✅ Production-ready Vite configuration
- ✅ Environment variable handling
- ✅ Netlify configuration (`netlify.toml`)
- ✅ Vercel configuration (`vercel.json`)
- ✅ Deployment scripts in package.json
- ✅ Security headers
- ✅ SPA routing setup
- ✅ Asset caching strategy

## 🚀 Quick Deployment

### Option 1: Netlify

**Via CLI:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
npm run deploy:netlify
```

**Via Git:**
1. Push to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Build settings are auto-detected from `netlify.toml`
6. Add environment variables in Netlify dashboard:
   - `VITE_API_URL`
   - `VITE_APP_TITLE`
7. Deploy!

### Option 2: Vercel

**Via CLI:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
npm run deploy:vercel
```

**Via Git:**
1. Push to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Connect your repository
5. Build settings auto-detected from `vercel.json`
6. Add environment variables in Vercel dashboard
7. Deploy!

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] `npm run build` succeeds without errors
- [ ] All environment variables are identified
- [ ] `.env` files are in `.gitignore`
- [ ] `dist/` folder is in `.gitignore`
- [ ] Images and assets are optimized
- [ ] No console errors in production build
- [ ] App works in `npm run preview`
- [ ] Git repository is up to date

## 🔐 Environment Variables

### Local Development
1. Copy `.env.example` to `.env`
2. Fill in your values
3. Never commit `.env` to Git!

### Production
Add variables in hosting platform:

**Netlify:**
- Site settings → Environment variables

**Vercel:**
- Project settings → Environment Variables

## 📁 Files Explained

### `netlify.toml`
- Build command and output directory
- SPA routing (redirects all routes to index.html)
- Security headers
- Asset caching rules

### `vercel.json`
- Build configuration
- SPA routing setup
- Cache headers for optimized assets

### `.gitignore`
- Prevents committing sensitive files
- Excludes build output
- Ignores local environment files

## 🔍 Post-Deployment Checks

After deploying, verify:

1. **Site loads correctly**
   - Check URL provided by host
   - Test on mobile device

2. **Environment variables work**
   - Check values are correct in app
   - No "undefined" for env vars

3. **Assets load properly**
   - Images display
   - CSS applies
   - JavaScript runs

4. **HTTPS is enabled**
   - URL starts with `https://`
   - No mixed content warnings

5. **Custom domain (optional)**
   - Configure in hosting dashboard
   - Update DNS records
   - Verify SSL certificate

## 🛠️ Continuous Deployment

Both Netlify and Vercel support automatic deployments:

1. Push to `main` branch
2. Host automatically builds and deploys
3. Preview deployments for pull requests
4. Rollback to previous deployments if needed

## 📊 Performance Tips

- ✅ Enable gzip/brotli compression (automatic on both hosts)
- ✅ Use CDN for assets (automatic)
- ✅ Configure caching headers (included in config files)
- ✅ Monitor build times and optimize if needed

## 🐛 Troubleshooting

**Build fails:**
- Check Node.js version (use 18+)
- Verify all dependencies in package.json
- Check for syntax errors

**Environment variables not working:**
- Must be prefixed with `VITE_`
- Added in hosting dashboard, not in code
- Redeploy after adding variables

**404 on routes:**
- Ensure SPA redirects are configured
- Check `netlify.toml` or `vercel.json`

**Assets not loading:**
- Check build output in `dist/`
- Verify paths don't have hardcoded domains
- Use relative paths or `import.meta.env.BASE_URL`

## 🎉 Success!

Your app is now deployed and accessible worldwide! 

Share your deployment URL and celebrate! 🚀
