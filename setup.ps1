# Beta Testing System Setup Script
# Run this to initialize your beta testing system

Write-Host "🚀 NutriAI Beta Testing System Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Setup server
Write-Host "Setting up backend server..." -ForegroundColor Yellow
Write-Host "-----------------------------" -ForegroundColor Gray

if (Test-Path ".\server") {
    Set-Location ".\server"
    
    # Install dependencies
    Write-Host "Installing server dependencies..." -ForegroundColor Yellow
    npm install
    
    # Check if .env exists
    if (-not (Test-Path ".\.env")) {
        Write-Host ""
        Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
        Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
        Copy-Item ".\.env.example" ".\.env"
        Write-Host "✅ .env file created" -ForegroundColor Green
        Write-Host ""
        Write-Host "⚠️  IMPORTANT: Edit server/.env with your credentials!" -ForegroundColor Red
        Write-Host "   See GOOGLE_SETUP_GUIDE.md for detailed instructions" -ForegroundColor Yellow
    } else {
        Write-Host "✅ .env file exists" -ForegroundColor Green
    }
    
    # Create data directory
    if (-not (Test-Path ".\data")) {
        New-Item -ItemType Directory -Path ".\data" | Out-Null
        Write-Host "✅ Created data directory" -ForegroundColor Green
    }
    
    Set-Location ".."
    Write-Host "✅ Backend setup complete" -ForegroundColor Green
} else {
    Write-Host "❌ Server directory not found" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check frontend dependencies
Write-Host "Checking frontend dependencies..." -ForegroundColor Yellow
Write-Host "-----------------------------" -ForegroundColor Gray

if (Test-Path ".\package.json") {
    if (-not (Test-Path ".\node_modules")) {
        Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
        npm install
        Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "✅ Frontend dependencies already installed" -ForegroundColor Green
    }
} else {
    Write-Host "❌ Frontend package.json not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "✨ Setup Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📚 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Configure Google Cloud:" -ForegroundColor White
Write-Host "   - Read GOOGLE_SETUP_GUIDE.md" -ForegroundColor Gray
Write-Host "   - Set up Google Groups" -ForegroundColor Gray
Write-Host "   - Create service account" -ForegroundColor Gray
Write-Host "   - Update server/.env with credentials" -ForegroundColor Gray
Write-Host ""

Write-Host "2. Start the backend server:" -ForegroundColor White
Write-Host "   cd server" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""

Write-Host "3. In a new terminal, start the frontend:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""

Write-Host "4. Visit the beta page:" -ForegroundColor White
Write-Host "   http://localhost:5173/beta" -ForegroundColor Cyan
Write-Host ""

Write-Host "5. Access the admin panel:" -ForegroundColor White
Write-Host "   http://localhost:5173/beta-admin" -ForegroundColor Cyan
Write-Host "   Password: nutriai2025" -ForegroundColor Gray
Write-Host ""

Write-Host "📖 Documentation:" -ForegroundColor Yellow
Write-Host "   - QUICKSTART.md           - 5-minute guide" -ForegroundColor Gray
Write-Host "   - GOOGLE_SETUP_GUIDE.md   - Complete setup" -ForegroundColor Gray
Write-Host "   - BETA_IMPLEMENTATION.md  - System overview" -ForegroundColor Gray
Write-Host ""

Write-Host "💡 Tips:" -ForegroundColor Yellow
Write-Host "   - Test locally before deploying" -ForegroundColor Gray
Write-Host "   - Use test Google Groups for development" -ForegroundColor Gray
Write-Host "   - Change admin password before launch" -ForegroundColor Gray
Write-Host "   - Keep service account keys secure" -ForegroundColor Gray
Write-Host ""

Write-Host "Happy beta testing! 🎉" -ForegroundColor Green
