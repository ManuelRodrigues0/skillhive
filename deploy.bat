@echo off
echo ==========================================
echo SkillHive Deployment Helper
echo ==========================================
echo.

echo Step 1: Checking prerequisites...
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed. Please install Git from https://git-scm.com
    pause
    exit /b 1
)

echo Git found!
echo.

echo Step 2: Initializing Git repository...
if not exist .git (
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo.
    echo Git repository initialized.
) else (
    echo Git repository already exists.
)

echo.
echo ==========================================
echo Deployment Options:
echo ==========================================
echo.
echo 1. Deploy to Render.com (Recommended - Free)
echo 2. Deploy locally for testing
echo 3. Exit
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo ==========================================
    echo Render.com Deployment Instructions
    echo ==========================================
    echo.
    echo 1. Push your code to GitHub:
    echo    git remote add origin https://github.com/YOUR_USERNAME/skillhive.git
    echo    git branch -M main
    echo    git push -u origin main
    echo.
    echo 2. Go to https://dashboard.render.com
    echo.
    echo 3. Click "New +" and select "Web Service"
    echo.
    echo 4. Connect your GitHub repository and select skillhive
    echo.
    echo 5. Configure Backend Service:
    echo    - Name: skillhive-backend
    echo    - Environment: Node
    echo    - Build Command: npm install
    echo    - Start Command: npm start
    echo    - Plan: Free
    echo.
    echo 6. Add Environment Variables for Backend:
    echo    NODE_ENV=production
    echo    PORT=10000
    echo    JWT_SECRET=your-secret-key-here
    echo    DB_DIALECT=sqlite
    echo    FRONTEND_URL=https://skillhive-frontend.onrender.com
    echo.
    echo 7. Create Frontend Static Site:
    echo    - Name: skillhive-frontend
    echo    - Build Command: cd frontend ^&^& npm install ^&^& npm run build
    echo    - Publish Directory: frontend/build
    echo.
    echo 8. Add Environment Variables for Frontend:
    echo    REACT_APP_API_URL=https://skillhive-backend.onrender.com/api
    echo    REACT_APP_SOCKET_URL=https://skillhive-backend.onrender.com
    echo.
    echo 9. After deployment, update FRONTEND_URL in backend with actual frontend URL
    echo.
    echo Your app will be accessible at: https://skillhive-frontend.onrender.com
    echo.
    pause
) else if "%choice%"=="2" (
    echo.
    echo ==========================================
    echo Local Testing Deployment
    echo ==========================================
    echo.
    echo Starting backend server...
    echo.
    start "SkillHive Backend" cmd /k "cd backend && npm start"
    timeout /t 3 /nobreak >nul
    echo.
    echo Backend is running at http://localhost:5000
    echo.
    echo Starting frontend server...
    echo.
    start "SkillHive Frontend" cmd /k "cd frontend && npm start"
    echo.
    echo Frontend will open at http://localhost:3000
    echo.
    echo Press any key to exit this window (servers will keep running)...
    pause >nul
) else (
    echo Exiting...
    exit /b 0
)