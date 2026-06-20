# Fix Railway Deployment - "npm: not found" Error

## The Problem

Railway is looking for `package.json` in the root directory, but your backend code is in the `backend/` folder.

## ✅ Solution: Set Root Directory

### Step 1: Go to Railway Settings

1. In your Railway project, click the **"Settings"** tab
2. Scroll down to the **"Root Directory"** field
3. Enter: `backend`
4. Click **"Save"** or it auto-saves

### Step 2: Redeploy

1. Go back to the **"Deployments"** tab
2. Click the **"Deploy"** button (or wait for auto-deploy)
3. Railway will now look for `package.json` in the `backend/` folder
4. Wait 2-3 minutes for deployment

---

## 🔧 Alternative Solution: Add package.json at Root

If setting Root Directory doesn't work, create a `package.json` at the root level:

### Step 1: Create Root package.json

Create a new file `package.json` in the root folder (d:\swaphub):

```json
{
  "name": "skillhive-root",
  "version": "1.0.0",
  "description": "SkillHive Platform",
  "scripts": {
    "install:backend": "cd backend && npm install",
    "install:frontend": "cd frontend && npm install",
    "build:frontend": "cd frontend && npm run build",
    "start:backend": "cd backend && npm start"
  }
}
```

### Step 2: Commit and Push

```powershell
& 'C:\Program Files\Git\bin\git.exe' add package.json
& 'C:\Program Files\Git\bin\git.exe' commit -m "Add root package.json for Railway"
& 'C:\Program Files\Git\bin\git.exe' push
```

### Step 3: Update Railway

1. In Railway, go to **Settings**
2. Set **Root Directory** to: `.` (or leave empty)
3. Set **Build Command** to: `npm run install:backend`
4. Set **Start Command** to: `npm run start:backend`
5. Save and redeploy

---

## 📋 Complete Railway Configuration

Here's the exact configuration you need:

### Settings Tab

| Setting | Value |
|---------|-------|
| **Root Directory** | `backend` |
| **Build Command** | `npm install` (or leave empty) |
| **Start Command** | `npm start` (or leave empty) |

### Variables Tab

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `JWT_SECRET` | `skillhive-secret-key-2024-change-this-in-production` |
| `DB_DIALECT` | `sqlite` |
| `FRONTEND_URL` | `https://skillhive.vercel.app` |

---

## 🚀 Quick Fix Steps

1. **In Railway dashboard:**
   - Click **Settings** tab
   - Find **Root Directory** field
   - Type: `backend`
   - Click **Save**

2. **Go to Deployments tab**
   - Click **"Deploy"** button
   - Wait for build to complete

3. **Verify:**
   - Check build logs show `npm install` running
   - Status should change to "Active"
   - Copy your backend URL

---

## ❌ Common Issues

### "npm: not found"
**Fix:** Set Root Directory to `backend`

### "package.json not found"
**Fix:** Make sure Root Directory is set correctly

### "Cannot find module"
**Fix:** Ensure all dependencies are in backend/package.json

### Build succeeds but app crashes
**Fix:** Check that PORT environment variable is set to 5000

---

## 📸 Visual Guide

```
Railway Dashboard
├── Project: skillhive-backend
│   ├── Deployments (current tab)
│   │   └── Build failed ❌
│   ├── Variables ✅ (already configured)
│   ├── Metrics
│   ├── Console
│   └── Settings ⭐ (GO HERE)
│       ├── Root Directory: [backend]  ← SET THIS
│       ├── Build Command: [npm install]
│       └── Start Command: [npm start]
```

---

## ✅ After Fixing

Once you set Root Directory to `backend`:

1. Railway will detect `backend/package.json`
2. Run `npm install` in the backend folder
3. Start the server with `npm start`
4. Your backend will be live!

---

## 🎯 Next Steps After Fix

1. **Copy your Railway backend URL** (e.g., `https://skillhive-backend-production.up.railway.app`)
2. **Deploy frontend to Vercel** (use this backend URL in environment variables)
3. **Update CORS** in Railway with your Vercel URL

---

## 💡 Pro Tip

Railway automatically detects the framework, but for monorepos (projects with multiple folders), you MUST set the Root Directory to tell Railway where your code is.

---

**Do this now:**
1. Go to Railway Settings
2. Set Root Directory to: `backend`
3. Click Save
4. Click Deploy

The deployment should succeed! 🎉