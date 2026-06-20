@echo off
echo ==========================================
echo SkillHive - Push to GitHub
echo ==========================================
echo.

set GIT_PATH="C:\Program Files\Git\bin\git.exe"

echo Enter your GitHub username:
set /p GITHUB_USERNAME=

if "%GITHUB_USERNAME%"=="" (
    echo ERROR: GitHub username cannot be empty
    pause
    exit /b 1
)

set REPO_NAME=skillhive
set REMOTE_URL=https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo.
echo Repository URL: %REMOTE_URL%
echo.

echo Adding remote origin...
%GIT_PATH% remote add origin %REMOTE_URL% 2>nul
if %errorlevel% neq 0 (
    echo Remote already exists, updating...
    %GIT_PATH% remote set-url origin %REMOTE_URL%
)
echo Remote configured!
echo.

echo Renaming branch to 'main'...
%GIT_PATH% branch -M main
echo Branch renamed!
echo.

echo Pushing to GitHub...
echo This may take a few minutes...
echo.

%GIT_PATH% push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ==========================================
    echo SUCCESS! Code pushed to GitHub!
    echo ==========================================
    echo.
    echo Next steps:
    echo 1. Go to https://render.com
    echo 2. Sign up with your GitHub account
    echo 3. Follow instructions in DEPLOY_NOW.md
    echo.
    echo Your repository: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
) else (
    echo.
    echo ==========================================
    echo PUSH FAILED
    echo ==========================================
    echo.
    echo Common issues:
    echo 1. Make sure you created the repository on GitHub first
    echo 2. Check your GitHub username is correct
    echo 3. Ensure you're logged into GitHub
    echo.
    echo Repository URL: %REMOTE_URL%
)

echo.
pause