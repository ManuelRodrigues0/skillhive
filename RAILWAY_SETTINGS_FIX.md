# Railway Settings Fix - CRASHED Status

## Current Status
- ❌ Status: CRASHED
- ❌ Error: "Deployment failed during build process"
- ❌ Root Directory: Not set (defaults to root)

## ✅ Fix: Set Root Directory to `backend`

### Step-by-Step Instructions:

1. **In Railway Dashboard:**
   - Click the **"Settings"** tab (next to Deployments, Variables, etc.)

2. **Scroll down to "Root Directory" field:**
   - You'll see a text field labeled "Root Directory"
   - Currently it's empty or shows `.`
   - **Type:** `backend`
   - Press Enter or click outside the field
   - It should auto-save

3. **Go back to "Deployments" tab:**
   - Click the **"Restart"** button (or "Deploy" button)
   - Wait 2-3 minutes

4. **Verify:**
   - Build logs should show `npm install` running
   - Status should change to "Active" (green)
   - No more crashes!

---

## 📸 Visual Guide

```
Railway Dashboard - skillhive-backend
├── Deployments (current tab)
│   └── CRASHED ❌
│       └── "Remove package-lock.json..." (48 seconds ago)
│
├── Variables ✅
├── Metrics
├── Console
└── Settings ⭐ CLICK HERE
    │
    └── Root Directory: [        ]  ← TYPE "backend" HERE
    │
    └── (other settings...)
```

---

## 🔧 Alternative: Use Railway CLI

If the web interface doesn't work, use Railway CLI:

### 1. Install Railway CLI
```bash
npm install -g @railway/cli
```

### 2. Login
```bash
railway login
```

### 3. Link Project
```bash
railway link
```

### 4. Set Root Directory
```bash
railway variables set RAILWAY_ROOT_DIRECTORY=backend
```

### 5. Redeploy
```bash
railway up
```

---

## 📋 Complete Configuration Checklist

After setting Root Directory to `backend`, verify:

**Settings Tab:**
- ✅ Root Directory: `backend`
- ✅ Build Command: (empty or `npm install`)
- ✅ Start Command: (empty or `npm start`)

**Variables Tab:**
- ✅ NODE_ENV=production
- ✅ PORT=5000
- ✅ JWT_SECRET=skillhive-secret-key-2024-change-this-in-production
- ✅ DB_DIALECT=sqlite
- ✅ FRONTEND_URL=https://skillhive.vercel.app

---

## 🚀 After Fixing

1. **Click "Restart" or "Deploy"**
2. **Wait 2-3 minutes**
3. **Check status changes to "Active"**
4. **Copy your backend URL** from the top of the page

---

## ❌ If Still Failing

### Check Build Logs
1. Click **"View logs"** on the failed deployment
2. Look for specific error messages
3. Common issues:
   - "Cannot find package.json" → Root Directory not set correctly
   - "npm not found" → Root Directory not set correctly
   - "Port already in use" → PORT variable not set

### Try Redeploying
1. Click the **three dots** (⋯) on the deployment
2. Select **"Redeploy"**
3. Wait for new deployment

### Check Node Version
- Railway uses Node 14.21.3 (shown in your screenshot)
- Your package.json requires Node >=14.0.0
- This should be compatible

---

## 💡 Why This Happened

Railway defaults to the root directory of your repository. Since your backend code is in the `backend/` subfolder, Railway couldn't find `package.json` and failed to build.

Setting **Root Directory** to `backend` tells Railway where to look for the backend code.

---

## ✅ Success Indicators

When deployment succeeds, you'll see:
- ✅ Status: **Active** (green badge)
- ✅ URL: `https://skillhive-backend-production.up.railway.app`
- ✅ Logs show: "SkillHive API Server running on port 5000"

---

## 🎯 Next Steps After Success

1. **Copy your Railway URL**
2. **Deploy frontend to Vercel** (use this URL in environment variables)
3. **Update CORS** in Railway with your Vercel URL

---

**Do this now:**
1. Railway Dashboard → Settings
2. Set Root Directory to: `backend`
3. Save
4. Go to Deployments → Click Restart
5. Wait 2-3 minutes

It should work! 🎉