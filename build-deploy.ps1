# NutriAI Beta - Build and Prepare for Deployment
# Run this on your local Windows machine before uploading to server

Write-Host "🚀 Building NutriAI Beta for Production..." -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build React frontend
Write-Host "📦 Building React frontend..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ React build complete" -ForegroundColor Green
Write-Host ""

# Step 2: Create deployment package
Write-Host "📁 Preparing deployment package..." -ForegroundColor Yellow

$deployDir = "nutriai-deploy"
if (Test-Path $deployDir) {
    Remove-Item -Recurse -Force $deployDir
}
New-Item -ItemType Directory -Path $deployDir | Out-Null

# Copy frontend build
Write-Host "  Copying frontend files..." -ForegroundColor Gray
Copy-Item -Recurse -Path "dist\*" -Destination $deployDir

# Copy server files
Write-Host "  Copying server files..." -ForegroundColor Gray
New-Item -ItemType Directory -Path "$deployDir\server" | Out-Null
Copy-Item -Path "server\index.js" -Destination "$deployDir\server\"
Copy-Item -Path "server\.env.example" -Destination "$deployDir\server\"

# Copy package.json for server
Copy-Item -Path "server\package.json" -Destination "$deployDir\server\" -ErrorAction SilentlyContinue

Write-Host "✅ Deployment package ready" -ForegroundColor Green
Write-Host ""

# Step 3: Create upload instructions
$uploadInstructions = @"
📤 UPLOAD INSTRUCTIONS
=====================

Using SCP (from PowerShell or Git Bash):
-----------------------------------------
# Upload frontend files
scp -r $deployDir/* root@89.116.110.161:/usr/local/lsws/Example/html/NutriBeta/

# Upload server files
scp -r $deployDir/server/* root@89.116.110.161:/usr/local/lsws/Example/html/NutriBeta/server/

Using WinSCP or FileZilla:
--------------------------
Server: 89.116.110.161
Port: 22
Username: root
Password: [your password]

Upload:
- $deployDir/* → /usr/local/lsws/Example/html/NutriBeta/
- $deployDir/server/* → /usr/local/lsws/Example/html/NutriBeta/server/

After Upload:
-------------
SSH into server:
  ssh root@89.116.110.161

Run these commands:
  cd /usr/local/lsws/Example/html/NutriBeta/server
  nano .env  # Update with your credentials
  npm install --production
  pm2 start ecosystem.config.js
  pm2 save
  /usr/local/lsws/bin/lswsctrl restart

Then visit:
  http://89.116.110.161/NutriBeta

"@

$uploadInstructions | Out-File -FilePath "$deployDir\UPLOAD_INSTRUCTIONS.txt" -Encoding UTF8

Write-Host $uploadInstructions -ForegroundColor Cyan

# Step 4: Create quick upload script for SCP
$scpScript = @"
#!/bin/bash
# Quick upload script using SCP
# Run: bash upload.sh

SERVER="root@89.116.110.161"
REMOTE_PATH="/usr/local/lsws/Example/html/NutriBeta"

echo "📤 Uploading frontend files..."
scp -r * `$SERVER:`$REMOTE_PATH/

echo "📤 Uploading server files..."
scp -r server/* `$SERVER:`$REMOTE_PATH/server/

echo "✅ Upload complete!"
echo ""
echo "Now SSH into the server and run:"
echo "  cd `$REMOTE_PATH/server"
echo "  npm install --production"
echo "  pm2 start ecosystem.config.js"
echo "  pm2 save"
echo "  /usr/local/lsws/bin/lswsctrl restart"
"@

$scpScript | Out-File -FilePath "$deployDir\upload.sh" -Encoding UTF8

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "✨ Build Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📁 Deployment package location:" -ForegroundColor Yellow
Write-Host "   $PWD\$deployDir" -ForegroundColor White
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Read UPLOAD_INSTRUCTIONS.txt in the deploy folder" -ForegroundColor White
Write-Host "   2. Upload files using SCP or WinSCP" -ForegroundColor White
Write-Host "   3. Configure .env on the server" -ForegroundColor White
Write-Host "   4. Install dependencies and start PM2" -ForegroundColor White
Write-Host ""
Write-Host "💡 Quick upload using SCP:" -ForegroundColor Yellow
Write-Host "   cd $deployDir" -ForegroundColor Cyan
Write-Host "   bash upload.sh" -ForegroundColor Cyan
Write-Host ""
