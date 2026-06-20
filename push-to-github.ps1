# SkillHive - Push to GitHub Script
# This script helps you push your code to GitHub

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "SkillHive - Push to GitHub" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is available
$gitPath = "C:\Program Files\Git\bin\git.exe"
if (-not (Test-Path $gitPath)) {
    Write-Host "ERROR: Git not found at $gitPath" -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/download/win" -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host "Git found!" -ForegroundColor Green
Write-Host ""

# Get GitHub username
Write-Host "Enter your GitHub username:" -ForegroundColor Yellow
$githubUsername = Read-Host

if ([string]::IsNullOrWhiteSpace($githubUsername)) {
    Write-Host "ERROR: GitHub username cannot be empty" -ForegroundColor Red
    pause
    exit 1
}

$repoName = "skillhive"
$remoteUrl = "https://github.com/$githubUsername/$repoName.git"

Write-Host ""
Write-Host "Repository URL: $remoteUrl" -ForegroundColor Cyan
Write-Host ""

# Check if remote already exists
$remoteCheck = & $gitPath remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote 'origin' already exists: $remoteCheck" -ForegroundColor Yellow
    $updateRemote = Read-Host "Do you want to update it? (y/n)"
    if ($updateRemote -eq "y" -or $updateRemote -eq "Y") {
        & $gitPath remote set-url origin $remoteUrl
        Write-Host "Remote updated!" -ForegroundColor Green
    }
} else {
    Write-Host "Adding remote origin..." -ForegroundColor Yellow
    & $gitPath remote add origin $remoteUrl
    Write-Host "Remote added!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Renaming branch to 'main'..." -ForegroundColor Yellow
& $gitPath branch -M main
Write-Host "Branch renamed!" -ForegroundColor Green

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "This may take a few minutes depending on your internet connection..." -ForegroundColor Gray
Write-Host ""

$pushResult = & $gitPath push -u origin main 2>&1
$pushExitCode = $LASTEXITCODE

Write-Host $pushResult

if ($pushExitCode -eq 0) {
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host "SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to https://render.com" -ForegroundColor White
    Write-Host "2. Sign up with your GitHub account" -ForegroundColor White
    Write-Host "3. Follow the instructions in DEPLOY_NOW.md" -ForegroundColor White
    Write-Host ""
    Write-Host "Your repository: https://github.com/$githubUsername/$repoName" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Red
    Write-Host "PUSH FAILED" -ForegroundColor Red
    Write-Host "==========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Make sure you created the repository on GitHub first" -ForegroundColor White
    Write-Host "2. Check your GitHub username is correct" -ForegroundColor White
    Write-Host "3. Ensure you're logged into GitHub" -ForegroundColor White
    Write-Host "4. Check your internet connection" -ForegroundColor White
    Write-Host ""
    Write-Host "Repository URL: $remoteUrl" -ForegroundColor Cyan
}

Write-Host ""
pause