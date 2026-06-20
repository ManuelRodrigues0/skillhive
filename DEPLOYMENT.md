# SkillHive Deployment Guide

This guide will help you deploy SkillHive to make it accessible on different devices.

## Option 1: Deploy to Render.com (Recommended - Free Tier)

Render.com offers free hosting for both backend and frontend applications.

### Prerequisites
- A Render.com account (sign up at https://render.com)
- Git installed on your machine
- Your code pushed to a GitHub/GitLab repository

### Step 1: Push Code to GitHub

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/skillhive.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `skillhive` repository
5. Configure the service:
   - **Name**: skillhive-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=<generate-a-random-secret>
   DB_DIALECT=sqlite
   FRONTEND_URL=https://skillhive-frontend.onrender.com
   ```

7. Click "Create Web Service"

### Step 3: Deploy Frontend

1. Click "New +" → "Static Site"
2. Connect the same GitHub repository
3. Configure the service:
   - **Name**: skillhive-frontend
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`

4. Add Environment Variables:
   ```
   REACT_APP_API_URL=https://skillhive-backend.onrender.com/api
   REACT_APP_SOCKET_URL=https://skillhive-backend.onrender.com
   ```

5. Click "Create Static Site"

### Step 4: Update Backend CORS

After frontend is deployed, update the backend's `FRONTEND_URL` environment variable to match your actual frontend URL.

## Option 2: Deploy to Vercel + Railway

### Frontend on Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel
```

### Backend on Railway
1. Go to https://railway.app
2. Create new project from GitHub
3. Select your repository
4. Set root directory to `backend`
5. Add environment variables
6. Deploy

## Option 3: Deploy to Netlify + Heroku

### Frontend on Netlify
1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Connect your repository
4. Configure:
   - **Base directory**: frontend
   - **Build command**: npm run build
   - **Publish directory**: frontend/build
5. Add environment variables
6. Deploy

### Backend on Heroku
```bash
# Install Heroku CLI
# Then:
heroku create skillhive-backend
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

## Option 4: Docker Deployment (Self-Hosted)

### Prerequisites
- Docker and Docker Compose installed
- A server (VPS, AWS EC2, DigitalOcean droplet, etc.)

### Step 1: Create Dockerfiles

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /socket.io {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
      - JWT_SECRET=your-secret-key-here
      - DB_DIALECT=sqlite
      - FRONTEND_URL=http://localhost:80
    volumes:
      - ./database:/app/database
    restart: always

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: always
```

### Step 2: Deploy with Docker Compose

```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DB_DIALECT=sqlite
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=skillhive_db
DB_PORT=3306
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_SOCKET_URL=https://your-backend-url.com
```

## Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test user login
- [ ] Test skill creation
- [ ] Test skill requests
- [ ] Test real-time chat
- [ ] Test video calling (requires HTTPS in production)
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Verify database persistence
- [ ] Check error logging

## Important Notes

1. **Database**: The app uses SQLite by default for easy deployment. For production with multiple users, consider upgrading to PostgreSQL or MySQL.

2. **HTTPS**: Video calling (WebRTC) requires HTTPS in production. Render.com and most hosting providers provide this automatically.

3. **Scaling**: The free tier has limitations. For production use with many users, upgrade to paid plans.

4. **Backups**: Regularly backup your database, especially if using SQLite.

5. **Monitoring**: Set up monitoring and error tracking (e.g., Sentry) for production.

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in backend matches your actual frontend URL
- Check that both services are running

### Socket.IO Connection Issues
- Verify `REACT_APP_SOCKET_URL` points to the correct backend URL
- Ensure WebSocket connections are not blocked by firewall

### Build Failures
- Check Node.js version compatibility (requires Node 14+)
- Clear cache: `npm run build -- --reset-cache`

### Database Issues
- For SQLite: Ensure the database file has write permissions
- For MySQL/PostgreSQL: Verify connection credentials

## Support

For deployment issues, check:
- Render.com documentation: https://render.com/docs
- Vercel documentation: https://vercel.com/docs
- Netlify documentation: https://docs.netlify.com