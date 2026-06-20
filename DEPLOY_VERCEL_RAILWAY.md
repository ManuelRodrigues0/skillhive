# Deploy to Vercel + Railway

Deploy your SkillHive platform using Vercel (frontend) and Railway (backend).

---

## ✅ Prerequisites

- ✅ Code on GitHub: https://github.com/ManuelRodrigues0/skillhive
- ✅ GitHub account logged in

---

## 🚀 Step 1: Deploy Backend to Railway (5 min)

Railway will host your Node.js backend with Socket.IO.

### 1.1 Sign Up for Railway

1. Go to: **https://railway.app**
2. Click **"Login"** (top right)
3. Click **"Login with GitHub"**
4. Authorize Railway to access your GitHub
5. You'll be taken to the Railway dashboard

### 1.2 Create New Project

1. Click **"New Project"** button
2. Select **"Deploy from GitHub repo"**
3. Find and select **`skillhive`** repository
4. Click **"Deploy Now"**

### 1.3 Configure Backend

Railway will auto-detect it's a Node.js project. Now configure it:

1. Click on your project to open it
2. Click the **"Settings"** tab
3. Set **Root Directory** to: `backend`
4. Click **"Variables"** tab
5. Add these environment variables:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `JWT_SECRET` | `skillhive-secret-key-2024-change-this-in-production` |
| `DB_DIALECT` | `sqlite` |
| `FRONTEND_URL` | `https://skillhive.vercel.app` |

6. Click **"Deploy"** or wait for auto-deployment
7. Wait 2-3 minutes for deployment
8. Once deployed, click the **"Settings"** tab
9. Scroll to **"Domains"** section
10. **COPY YOUR BACKEND URL** (e.g., `https://skillhive-backend-production.up.railway.app`)

---

## 🚀 Step 2: Deploy Frontend to Vercel (3 min)

Vercel is perfect for React apps with automatic HTTPS and CDN.

### 2.1 Sign Up for Vercel

1. Go to: **https://vercel.com**
2. Click **"Sign Up"** (top right)
3. Click **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub
5. You'll be taken to the Vercel dashboard

### 2.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories
3. Find and click on **`skillhive`**
4. Click **"Import"**

### 2.3 Configure Frontend

Vercel will auto-detect it's a Create React App project. Configure it:

**Framework Preset:** Create React App (auto-detected)

**Root Directory:** Click "Edit" and set to: `frontend`

**Build Command:** `npm run build` (auto-filled)

**Output Directory:** `build` (auto-filled)

### 2.4 Add Environment Variables

Click **"Environment Variables"** section and add:

| Variable | Value |
|----------|-------|
| `REACT_APP_API_URL` | `https://skillhive-backend-production.up.railway.app/api` |
| `REACT_APP_SOCKET_URL` | `https://skillhive-backend-production.up.railway.app` |

**⚠️ IMPORTANT:** Replace with YOUR actual Railway backend URL from Step 1!

### 2.5 Deploy

1. Click **"Deploy"** button
2. Wait 2-3 minutes for build and deployment
3. You'll see a preview with a URL like: `https://skillhive.vercel.app`
4. **COPY THIS URL** - this is your website!

---

## 🚀 Step 3: Update CORS Settings (1 min)

### 3.1 Go to Railway

1. Go back to your Railway project
2. Click the **"Variables"** tab
3. Find `FRONTEND_URL` variable
4. Click the **pencil icon** to edit
5. Replace with your actual Vercel URL: `https://skillhive.vercel.app`
6. Click **"Save"**
7. Railway will automatically redeploy (1-2 minutes)

---

## 🎉 DONE! Your Website is Live!

**Your website URL:** `https://skillhive.vercel.app`

Open this URL on any device:
- 📱 Phone
- 📱 Tablet
- 💻 Computer
- 🌐 Any browser

---

## 📱 Test Your Website

1. **Open the URL** in your browser
2. **Click "Register"** and create an account
3. **Fill in your skills** and profile
4. **Post a learning request**
5. **Test on your phone** to verify it works

---

## 🔧 Troubleshooting

### Railway backend not starting?
- Check logs in Railway dashboard
- Ensure `Root Directory` is set to `backend`
- Verify all environment variables are set
- Check that PORT is 5000

### Vercel frontend shows blank page?
- Check that `Root Directory` is set to `frontend`
- Verify environment variables are correct
- Check build logs in Vercel dashboard
- Open browser console (F12) to see errors

### CORS error?
- Verify `FRONTEND_URL` in Railway matches your Vercel URL exactly
- Must include `https://` and no trailing slash

### Socket not connecting?
- Check `REACT_APP_SOCKET_URL` points to Railway backend (not /api)
- Ensure Railway service shows "Active" status

### API calls failing?
- Check `REACT_APP_API_URL` includes `/api` at the end
- Verify Railway backend is running
- Test backend URL directly in browser

---

## 📊 Monitor Your Apps

### Railway Dashboard
- Go to https://railway.app
- View logs, metrics, and performance
- See real-time requests
- Free tier: $5 credit/month (enough for small apps)

### Vercel Dashboard
- Go to https://vercel.com
- View deployments, analytics, and performance
- See real-time visitors
- Free tier: Unlimited personal projects

---

## 🎯 What You've Deployed

✅ **Frontend** - React app on Vercel (global CDN)  
✅ **Backend** - Node.js API on Railway  
✅ **Database** - SQLite (file-based)  
✅ **HTTPS** - Automatic SSL on both platforms  
✅ **Real-time chat** - Socket.IO enabled  
✅ **Video calling** - WebRTC ready  
✅ **Global access** - Available anywhere  

---

## 💰 Cost: $0

### Railway Free Tier
- $5 credit per month
- 512 MB RAM
- 1 GB storage
- Enough for development and small apps

### Vercel Free Tier
- Unlimited personal projects
- Automatic HTTPS
- Global CDN
- 100 GB bandwidth/month

---

## 🚀 Alternative: Deploy Backend to Fly.io

If you prefer Fly.io instead of Railway:

### 1. Sign Up
- Go to https://fly.io
- Sign up with GitHub
- Install Fly CLI: `curl -L https://fly.io/install.sh | sh`

### 2. Deploy
```bash
cd backend
fly launch
```

### 3. Configure
```bash
fly secrets set NODE_ENV=production
fly secrets set JWT_SECRET=your-secret-key
fly secrets set DB_DIALECT=sqlite
fly secrets set FRONTEND_URL=https://skillhive.vercel.app
```

### 4. Deploy
```bash
fly deploy
```

---

## 🔄 Auto-Deploy Setup

Both Vercel and Railway support auto-deployment from GitHub:

### Vercel
- Already enabled by default
- Every push to `main` branch triggers deployment
- Preview deployments for pull requests

### Railway
- Go to project settings
- Enable "Auto-Deploy"
- Every push to `main` branch triggers deployment

---

## 📝 Environment Variables Reference

### Railway (Backend)
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=skillhive-secret-key-2024-change-this-in-production
DB_DIALECT=sqlite
FRONTEND_URL=https://skillhive.vercel.app
```

### Vercel (Frontend)
```env
REACT_APP_API_URL=https://your-backend.up.railway.app/api
REACT_APP_SOCKET_URL=https://your-backend.up.railway.app
```

---

## 🎯 Next Steps

1. **Share the URL** with friends and users
2. **Test on multiple devices** (phone, tablet, computer)
3. **Monitor usage** in Railway and Vercel dashboards
4. **Consider upgrading** to paid plans for production
5. **Add custom domain** (available on both platforms)

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Your Guides**:
  - `DEPLOY_TO_RENDER.md` - Render.com option
  - `START_HERE.md` - Quick reference

---

## ⏱️ Time Spent

- GitHub setup: ✅ Done
- Push code: ✅ Done
- Deploy backend to Railway: ⏳ ~5 min
- Deploy frontend to Vercel: ⏳ ~3 min
- Update CORS: ⏳ ~1 min
- **Total remaining: ~9 minutes**

---

## 🎊 Almost There!

Just follow the 3 steps above and your SkillHive platform will be live on Vercel + Railway!

**Start with Step 1: Go to https://railway.app**

---

**Your website will be accessible from any device in the world! 🌍**