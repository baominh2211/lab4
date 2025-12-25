# Deployment Guide - React Lab 4

## 🚀 Deploy to Vercel

### Method 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to project directory:
```bash
cd react-lab4
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N`
   - Project name? `react-lab4` (or your preferred name)
   - Directory? `./` (press Enter)
   - Override settings? `N`

### Method 2: Using GitHub + Vercel Dashboard

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: React Lab 4"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/react-lab4.git
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: **Vite**
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`
   - Click "Deploy"

### Method 3: Using Vercel Button

Add this to your GitHub README:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/react-lab4)
```

## ⚙️ Configuration Files

The project includes these deployment configuration files:

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This configuration:
- Sets the build command
- Specifies output directory
- Configures framework detection
- **Rewrites all routes to index.html** (essential for React Router)

### Why Rewrites are Needed

React Router uses client-side routing. Without rewrites:
- `/` works fine
- `/blogdash` returns 404 (Vercel looks for blogdash.html)
- `/dashboard/post/1` returns 404

With rewrites:
- All routes → serve index.html
- React Router handles routing on client side
- All routes work correctly ✅

## 🔧 Build Settings

If configuring manually in Vercel dashboard:

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Node Version | 18.x (or latest) |

## 🌍 Environment Variables

This project doesn't require environment variables, but if you need to add any:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables:
   - `VITE_API_URL` (if using custom API)
   - `VITE_APP_NAME` (if configurable)
3. Redeploy

**Note:** Vite environment variables must start with `VITE_`

## 🐛 Troubleshooting

### Build Fails with "Rollup failed to resolve import"

**Solution:** Make sure:
- All imports use correct paths
- `index.html` has `/src/main.jsx` (absolute path)
- `src/main.jsx` exists
- No typos in file names

### Routes Return 404 in Production

**Solution:**
- Add `vercel.json` with rewrites configuration
- Or configure in Vercel dashboard:
  - Settings → Rewrites
  - Add: Source `(.*)` → Destination `/index.html`

### Build Succeeds but Page is Blank

**Solution:**
- Check browser console for errors
- Ensure all dependencies are in `package.json`, not devDependencies
- Check for incorrect import paths
- Verify `base` config in `vite.config.js` (should be `/` for Vercel)

### Styles Not Loading

**Solution:**
- Import CSS files in components
- Check if CSS imports are correct
- Verify assets are in `dist` folder after build

## 📊 Performance Optimization

After deployment, consider:

1. **Enable Edge Caching:**
   - Vercel automatically does this
   - Static assets cached at edge locations

2. **Image Optimization:**
   - If adding images, use Vercel's Image Optimization
   - Or use next-gen formats (WebP, AVIF)

3. **Code Splitting:**
   - Vite automatically code-splits
   - Routes are lazy-loaded

4. **Compression:**
   - Vercel automatically enables Brotli/Gzip
   - No configuration needed

## 🔍 Post-Deployment Checklist

After deploying, verify:

- [ ] Home page (`/`) loads correctly
- [ ] All section components render
- [ ] BlogDash login (`/blogdash`) works
- [ ] Protected routes redirect when not authenticated
- [ ] Dashboard (`/dashboard`) shows posts after login
- [ ] Individual post routes (`/dashboard/post/:id`) work
- [ ] Router demo routes work (`/router-demo`)
- [ ] Dynamic routes with params work
- [ ] Navigation between routes is smooth
- [ ] Browser back/forward buttons work
- [ ] No console errors
- [ ] MouseTracker logs to console
- [ ] LocalStorage persistence works

## 🔗 Production URLs

After deployment, your routes will be:

```
https://your-app.vercel.app/
https://your-app.vercel.app/blogdash
https://your-app.vercel.app/dashboard
https://your-app.vercel.app/dashboard/post/1
https://your-app.vercel.app/router-demo
https://your-app.vercel.app/router-demo/about
https://your-app.vercel.app/router-demo/users/123
```

## 📝 Custom Domain (Optional)

To add a custom domain:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `lab4.example.com`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)
5. Your app is live on custom domain!

## 🔄 Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to main** → Production deployment
- **Push to other branch** → Preview deployment
- **Pull request** → Preview deployment with unique URL

Preview deployments are perfect for testing before merging!

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deploying)

---

Happy deploying! 🎉
