# Deploy to Render.com - Step by Step

## ✅ Code is on GitHub!

Your code is now at: https://github.com/ManuelRodrigues0/skillhive

Now let's deploy it to Render.com so it's accessible from any device.

---

## 🚀 Step 1: Sign Up for Render (1 min)

1. Open your browser and go to: **https://render.com**
2. Click the **"Get Started"** button (top right)
3. Click **"Sign up with GitHub"** (easiest option)
4. Authorize Render to access your GitHub account
5. You'll be redirected to the Render dashboard

---

## 🚀 Step 2: Deploy Backend (3 min)

### 2.1 Create Web Service

1. In the Render dashboard, click **"New +"** (top right)
2. Select **"Web Service"**

### 2.2 Connect GitHub Repository

1. You'll see a list of your GitHub repositories
2. Find and click on **`skillhive`**
3. Click **"Connect"**

### 2.3 Configure Backend Service

Fill in the form exactly as shown:

**Name:**
```
skillhive-backend
```

**Environment:**
```
Node
```

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Plan:**
```
Free
```

### 2.4 Add Environment Variables

Click the **"Advanced"** button to expand advanced settings.

Scroll down to **"Environment Variables"** section and add these:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `JWT_SECRET` | `skillhive-secret-key-2024-change-this-in-production` |
| `DB_DIALECT` | `sqlite` |
| `FRONTEND_URL` | `https://skillhive-frontend.onrender.com` |

**To add each variable:**
1. Click **"Add Environment Variable"**
2. Enter the Key
3. Enter the Value
4. Click **"Add"**

### 2.5 Create the Service

1. Scroll to the bottom
2. Click the **"Create Web Service"** button
3. Wait 2-3 minutes for deployment
4. You'll see a progress bar and logs

### 2.6 Copy Your Backend URL

Once deployment completes (status shows "Live"), you'll see a URL at the top:

**Example:** `https://skillhive-backend-abc123.onrender.com`

**COPY THIS URL** - you'll need it for the frontend!

---

## 🚀 Step 3: Deploy Frontend (3 min)

### 3.1 Create Static Site

1. In the Render dashboard, click **"New +"** (top right)
2. Select **"Static Site"**

### 3.2 Connect GitHub Repository

1. Find and click on **`skillhive`** (same repository)
2. Click **"Connect"**

### 3.3 Configure Frontend

Fill in the form:

**Name:**
```
skillhive-frontend
```

**Build Command:**
```
cd frontend && npm install && npm run build
```

**Publish Directory:**
```
frontend/build
```

### 3.4 Add Environment Variables

Add these environment variables:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://skillhive-backend-abc123.onrender.com/api` |
| `REACT_APP_SOCKET_URL` | `https://skillhive-backend-abc123.onrender.com` |

**⚠️ IMPORTANT: Replace `skillhive-backend-abc123` with YOUR actual backend URL from Step 2!**

### 3.5 Create the Static Site

1. Click **"Create Static Site"**
2. Wait 2-3 minutes for deployment
3. You'll see build progress and logs

### 3.6 Copy Your Frontend URL

Once deployment completes (status shows "Live"), you'll see a URL:

**Example:** `https://skillhive-frontend-xyz789.onrender.com`

**COPY THIS URL** - this is your website!

---

## 🚀 Step 4: Update CORS Settings (1 min)

### 4.1 Go to Backend Service

1. In Render dashboard, click on **`skillhive-backend`**
2. Click the **"Environment"** tab

### 4.2 Update FRONTEND_URL

1. Find the `FRONTEND_URL` variable
2. Click the **pencil icon** to edit
3. Replace the value with your **actual frontend URL** from Step 3
4. Click **"Save"**

**Example:**
```
https://skillhive-frontend-xyz789.onrender.com
```

### 4.3 Wait for Redeployment

- Render will automatically redeploy your backend
- Wait 1-2 minutes
- Status should return to "Live"

---

## 🎉 DONE! Your Website is Live!

**Your website URL:** `https://skillhive-frontend-xyz789.onrender.com`

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

### Backend deployment fails?
- Check build logs in Render dashboard
- Ensure Node.js version is 14+ (Render uses 18 by default)
- Verify all files are on GitHub

### Frontend shows blank page?
- Check that `REACT_APP_API_URL` and `REACT_APP_SOCKET_URL` are correct
- Must include `https://` and no trailing slash
- Check browser console for errors (F12)

### CORS error in browser?
- Verify `FRONTEND_URL` in backend matches your actual frontend URL
- Must be exact match including `https://`

### Socket not connecting?
- Check `REACT_APP_SOCKET_URL` points to backend (not /api)
- Ensure both services show "Live" in Render

### First load is very slow?
- This is normal! Free tier sleeps after 15 min inactivity
- First request takes ~30 seconds to wake up
- Subsequent requests are fast

---

## 📊 Monitor Your App

### Render Dashboard
- Go to https://dashboard.render.com
- View logs, metrics, and performance
- See real-time requests and errors

### Free Tier Limits
- 750 hours/month (enough for 24/7)
- Automatic HTTPS
- Auto-deploy from GitHub
- 100 GB bandwidth

---

## 🎯 What You've Deployed

✅ **Frontend** - React app, mobile responsive  
✅ **Backend** - Node.js API with Socket.IO  
✅ **Database** - SQLite (auto-configured)  
✅ **HTTPS** - Automatic SSL certificate  
✅ **Real-time chat** - Socket.IO enabled  
✅ **Video calling** - WebRTC ready  
✅ **Global access** - Available anywhere  

---

## 💰 Cost: $0

Render.com free tier includes everything you need to get started!

---

## 🚀 Next Steps

1. **Share the URL** with friends and users
2. **Test on multiple devices** (phone, tablet, computer)
3. **Monitor usage** in Render dashboard
4. **Consider upgrading** to paid plan for production use
5. **Add custom domain** (optional, paid plans only)

---

## 📞 Need Help?

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com
- **Your Guides**: 
  - `START_HERE.md` - Quick start
  - `FINAL_STEPS.md` - Detailed steps
  - `DEPLOYMENT.md` - All deployment options

---

## ⏱️ Time Spent

- GitHub setup: ✅ Done
- Push code: ✅ Done
- Deploy backend: ⏳ ~3 min
- Deploy frontend: ⏳ ~3 min
- Update CORS: ⏳ ~1 min
- **Total remaining: ~7 minutes**

---

## 🎊 Almost There!

Just follow the 4 steps above and your SkillHive platform will be live!

**Start with Step 1: Go to https://render.com**

---

**Your website will be accessible from any device in the world! 🌍**