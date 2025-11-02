# Deployment Guide

## Vercel Deployment (Recommended)

### Quick Deploy
1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: AI Chat Application"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Leave all settings as default (Vercel auto-detects Next.js)
6. Click "Deploy"

Your app will be live in ~2 minutes!

### Environment Setup
No environment variables needed - the app works out of the box.

### Custom Domain (Optional)
1. Go to your project dashboard on Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Alternative Platforms

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Docker (Self-hosted)
```bash
# Build
docker build -t ai-chat .

# Run
docker run -p 3000:3000 ai-chat
```

### AWS Amplify
1. Push code to GitHub
2. Go to AWS Amplify Console
3. Connect repository
4. Deploy

## Build Optimization

For production builds, Next.js automatically:
- Minifies JavaScript and CSS
- Optimizes images
- Generates static pages where possible
- Implements code splitting

## Performance Tips

1. **Enable Compression**: Most platforms enable this by default
2. **CDN**: Vercel and Netlify provide global CDN automatically
3. **Caching**: React Query handles client-side caching
4. **Images**: Use Next.js Image component for optimized loading

## Monitoring

### Vercel Analytics
Enable in your project dashboard for:
- Real-time visitor analytics
- Web Vitals monitoring
- Performance insights

### Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user behavior

## Post-Deployment Checklist

- [ ] Test all features in production
- [ ] Verify chat persistence works
- [ ] Test autocomplete and mentions
- [ ] Check mobile responsiveness
- [ ] Test keyboard shortcuts (⌘K)
- [ ] Verify sticky headers on long content
- [ ] Test artifact expansion
- [ ] Confirm error boundaries work

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm build
```

### Hydration Errors
- Check for browser extension interference
- Verify no SSR/CSR mismatches
- Clear browser cache

### Port Issues (Local)
```bash
# Kill existing processes
pkill -f "next dev"
# Or use a different port
PORT=3001 pnpm dev
```

## Support

For issues:
1. Check the README.md
2. Review Next.js documentation
3. Check browser console for errors
4. Verify all dependencies are installed

## Update Strategy

To deploy updates:
```bash
git add .
git commit -m "Update: description of changes"
git push
```

Vercel will automatically rebuild and deploy!
