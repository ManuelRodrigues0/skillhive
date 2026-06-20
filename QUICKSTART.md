# Quick Start - Deploy SkillHive in 5 Minutes

## Fastest Way to Deploy (Render.com)

### Prerequisites
- GitHub account
- Render.com account (free at https://render.com)

### Step 1: Push to GitHub (2 minutes)

```bash
# In your project folder:
git init
git add .
git commit -m "Deploy SkillHive"
git remote add origin https://github.com/YOUR_USERNAME/skillhive.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend (1 minute)

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo `skillhive`
4. Settings:
   - Name: `skillhive-backend`
   - Environment: **Node**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: **Free**
5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=any-random-string-here
   DB_DIALECT=sqlite
   FRONTEND_URL=https://skillhive-frontend.onrender.com
   ```
6. Click **"Create Web Service"**

### Step 3: Deploy Frontend (1 minute)

1. Click **"New +"** → **"Static Site"**
2. Connect same GitHub repo
3. Settings:
   - Name: `skillhive-frontend`
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/build`
4. Add Environment Variables:
   ```
   REACT_APP_API_URL=https://skillhive-backend.onrender.com/api
   REACT_APP_SOCKET_URL=https://skillhive-backend.onrender.com
   ```
5. Click **"Create Static Site"**

### Step 4: Update CORS (30 seconds)

1. Go back to your backend service on Render
2. Click **"Environment"** tab
3. Update `FRONTEND_URL` to your actual frontend URL (e.g., `https://skillhive-frontend-abc123.onrender.com`)
4. Click **"Save Changes"** (backend will auto-redeploy)

### Done! 🎉

Your app is now live at: `https://skillhive-frontend-xxx.onrender.com`

Access from any device - phone, tablet, or computer!

---

## Alternative: Deploy Locally for Testing

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
cd frontend
npm install
npm start
```

Open browser to: `http://localhost:3000`

---

## What's Included

✅ **render.yaml** - Render.com configuration file
✅ **Updated server.js** - Serves frontend in production
✅ **DEPLOYMENT.md** - Detailed deployment guide
✅ **deploy.bat** - Windows deployment helper script
✅ **Frontend build** - Production-ready static files

---

## Need Help?

- Full guide: See `DEPLOYMENT.md`
- Run helper: Double-click `deploy.bat`
- Render docs: https://render.com/docs

---

## Important Notes

1. **Free Tier Limits**: Render free tier sleeps after 15 minutes of inactivity. First load may take 30 seconds.
2. **Database**: Uses SQLite (file-based). Data persists between deployments.
3. **HTTPS**: Automatically provided by Render - required for video calling.
4. **Custom Domain**: You can add your own domain in Render settings (paid plans).

---

## Post-Deployment Testing

Test these features:
- [ ] User registration
- [ ] User login
- [ ] Create skill profile
- [ ] Post learning request
- [ ] Real-time chat
- [ ] Video calling (needs HTTPS)
- [ ] Mobile responsiveness

---

## Troubleshooting

**CORS Error?**
- Check `FRONTEND_URL` in backend matches your actual frontend URL

**Socket not connecting?**
- Verify `REACT_APP_SOCKET_URL` points to backend URL (not /api)

**Build fails?**
- Ensure Node.js version is 14+ (Render uses 18 by default)

**Database errors?**
- SQLite file needs write permissions (Render provides this)

---

## Next Steps

1. Share the URL with users
2. Test on multiple devices
3. Monitor usage in Render dashboard
4. Consider upgrading to paid plan for production use
5. Add custom domain (optional)
6. Set up monitoring/analytics (optional)