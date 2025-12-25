# Build Error Fix Guide

## ❌ Error: "Rollup failed to resolve import /src/main.jsx"

If you see this error during Vercel deployment:

```
error during build:
[vite]: Rollup failed to resolve import "/src/main.jsx" from "/vercel/path0/index.html".
```

## ✅ Solutions

### Solution 1: Verify File Structure

Ensure your project has this structure:

```
react-lab4/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx  ← Must exist!
    ├── App.jsx
    └── ...
```

### Solution 2: Check index.html

Your `index.html` should have:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Lab 4 - Intermediate</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

**Important:** The path should be `/src/main.jsx` (with leading slash) for Vite.

### Solution 3: Check vite.config.js

Your `vite.config.js` should be:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  }
})
```

**Do NOT use** `base: './'` if you're using React Router!

### Solution 4: Ensure All Dependencies are Installed

Check your `package.json` includes:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8"
  }
}
```

### Solution 5: Clear Cache and Redeploy

In Vercel Dashboard:
1. Go to Deployments
2. Click on the failed deployment
3. Click "Redeploy"
4. Check "Clear build cache"
5. Click "Redeploy"

### Solution 6: Manual Build Test

Test the build locally:

```bash
# Install dependencies
npm install

# Try building
npm run build

# If successful, check dist folder
ls -la dist/
```

If local build works but Vercel fails, it's likely a Vercel-specific config issue.

### Solution 7: Vercel Build Settings

In Vercel Dashboard → Settings → General:

| Setting | Value |
|---------|-------|
| Framework Preset | **Vite** |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### Solution 8: Check for TypeScript Issues

If you accidentally have TypeScript configs or `.ts` files, make sure:
- Remove `tsconfig.json` if not using TypeScript
- All files are `.jsx` not `.tsx`
- No TypeScript-specific imports

### Solution 9: File Name Case Sensitivity

Ensure file names match exactly:
- `main.jsx` not `Main.jsx`
- `App.jsx` not `app.jsx`
- Linux/Vercel servers are case-sensitive!

### Solution 10: Check Git Repository

Make sure all files are committed:

```bash
git status  # Should show "working tree clean"
git add .
git commit -m "Add all files"
git push
```

## 🔍 Debugging Steps

1. **Check Vercel Build Logs:**
   - Look for the exact error message
   - Check which file is missing
   - Verify the path being resolved

2. **Compare with Working Projects:**
   - Check Vite documentation examples
   - Verify against Vercel Vite template

3. **Test Locally First:**
   ```bash
   npm install
   npm run build
   npm run preview
   ```

4. **Check File Permissions:**
   ```bash
   ls -la src/main.jsx
   # Should show readable file
   ```

## ✨ Working Configuration

This project includes all necessary files:

- ✅ `index.html` - Entry point
- ✅ `src/main.jsx` - React entry
- ✅ `vite.config.js` - Vite config
- ✅ `package.json` - Dependencies
- ✅ `vercel.json` - Routing config
- ✅ `.gitignore` - Exclude node_modules

## 🎯 Expected Build Output

Successful build should show:

```
Running "npm run build"

> react-lab4-intermediate@1.0.0 build
> vite build

vite v5.4.21 building for production...
✓ 150 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-abc123.css      2.34 kB │ gzip:  1.23 kB
dist/assets/index-xyz789.js     156.78 kB │ gzip: 52.34 kB
✓ built in 3.42s
```

## 📞 Still Having Issues?

1. Check GitHub Issues for similar problems
2. Verify all files are present in repository
3. Try deploying to Netlify as alternative
4. Contact Vercel support with build logs

## 🔗 Helpful Resources

- [Vite Troubleshooting](https://vitejs.dev/guide/troubleshooting.html)
- [Vercel Build Issues](https://vercel.com/docs/concepts/deployments/troubleshoot-a-build)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deploying)

---

**Most Common Fix:** Just ensure `src/main.jsx` exists and `index.html` references it correctly!
