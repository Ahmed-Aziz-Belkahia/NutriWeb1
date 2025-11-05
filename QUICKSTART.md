# Quick Start Guide - Beta Testing System

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- Google Workspace account (for Google Groups automation)
- Google Cloud project set up (see GOOGLE_SETUP_GUIDE.md)

---

## Step 1: Install Server Dependencies

```powershell
cd server
npm install
```

## Step 2: Configure Environment

1. Copy `.env.example` to `.env`:
```powershell
cp .env.example .env
```

2. Edit `.env` with your credentials (see GOOGLE_SETUP_GUIDE.md for details)

## Step 3: Start the Backend

```powershell
npm run dev
```

Server will run on: `http://localhost:3001`

## Step 4: Start the Frontend

In a new terminal, from the project root:

```powershell
npm run dev
```

Frontend will run on: `http://localhost:5173`

## Step 5: Test It Out

### Test Beta Signup
1. Visit: `http://localhost:5173/beta`
2. Select platform and enter email
3. Submit the form

### Check Admin Panel
1. Visit: `http://localhost:5173/beta-admin`
2. Password: `nutriai2025`
3. Verify tester was added

---

## 📁 Project Structure

```
project/
├── src/                    # Frontend React app
│   ├── pages/
│   │   ├── Beta.tsx       # Beta signup page
│   │   └── BetaAdmin.tsx  # Admin dashboard
│   └── ...
├── server/                 # Backend Node.js API
│   ├── index.js           # Express server
│   ├── package.json       # Server dependencies
│   ├── .env               # Environment variables (create this)
│   ├── .env.example       # Environment template
│   └── data/              # Data storage (auto-created)
│       └── beta-testers.json
└── ...
```

---

## 🔗 API Endpoints

### GET /api/health
Health check endpoint
```bash
curl http://localhost:3001/api/health
```

### GET /api/beta-testers
Get all beta testers
```bash
curl http://localhost:3001/api/beta-testers
```

### POST /api/beta-testers
Add new beta tester
```bash
curl -X POST http://localhost:3001/api/beta-testers \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","platform":"android"}'
```

### DELETE /api/beta-testers/:id
Delete specific tester
```bash
curl -X DELETE http://localhost:3001/api/beta-testers/1234567890
```

---

## ⚙️ Configuration Options

### Without Google Groups
If you haven't set up Google Groups yet, the system will:
- ✅ Still store testers in the database
- ✅ Send welcome emails (if SMTP configured)
- ❌ Not add to Google Groups (will log error)
- 🔄 You can add them manually later

### Without Email Service
If you haven't configured email:
- ✅ System will still work
- ✅ Testers will be stored
- ✅ Google Groups will be updated
- ❌ No welcome email sent
- 💡 Testers can use the Play Console link directly

---

## 🎯 What Happens When a User Signs Up?

1. **Frontend** sends email + platform to backend
2. **Backend** receives request and:
   - Checks for duplicate email
   - Saves to `server/data/beta-testers.json`
   - Adds email to Google Group(s) based on platform
   - Sends welcome email with beta links
   - Returns success/failure response
3. **Frontend** shows success message
4. **Admin Panel** can view all signups

---

## 📊 Data Storage

Beta testers are stored in `server/data/beta-testers.json`:

```json
[
  {
    "id": 1730208000000,
    "email": "user@example.com",
    "platform": "android",
    "status": "invited",
    "googleGroupStatus": {
      "android": "added"
    },
    "createdAt": "2025-10-29T12:00:00.000Z"
  }
]
```

---

## 🔐 Change Admin Password

Edit `src/pages/BetaAdmin.tsx`:

```typescript
// Line 16
const ADMIN_PASSWORD = 'your-secure-password-here';
```

---

## 📧 Email Configuration

### Gmail Setup (Easiest)

1. Enable 2-factor authentication on your Google account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Add to `.env`:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
EMAIL_FROM=NutriAI Beta <beta@nutriai.app>
```

### Other Email Providers

**SendGrid:**
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Mailgun:**
```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
```

---

## 🚀 Deployment

### Deploy Backend

**Recommended platforms:**
- **Railway** (easiest): https://railway.app/
- **Heroku**: https://heroku.com/
- **DigitalOcean App Platform**: https://digitalocean.com/
- **AWS Elastic Beanstalk**

**Environment variables to set:**
- All variables from `.env`
- Set `NODE_ENV=production`

### Deploy Frontend

**Recommended platforms:**
- **Vercel** (easiest for Vite): https://vercel.com/
- **Netlify**: https://netlify.com/
- **Cloudflare Pages**: https://pages.cloudflare.com/

**Important:** Update API URL in production:
```typescript
// In Beta.tsx and BetaAdmin.tsx, change:
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Then use:
fetch(`${API_URL}/api/beta-testers`, ...)
```

Add to `.env.production`:
```bash
VITE_API_URL=https://your-backend-url.com
```

---

## 🐛 Common Issues

### "Cannot connect to server"
- Check if backend is running: `http://localhost:3001/api/health`
- Check CORS is enabled in server
- Verify port 3001 is not in use

### "Google Group error"
- Review GOOGLE_SETUP_GUIDE.md
- Check service account credentials
- Verify domain-wide delegation is set up
- Confirm OAuth scopes are correct

### "Email not sending"
- Check SMTP credentials
- For Gmail: Use App Password, not regular password
- Test SMTP connection separately

### "Data not persisting"
- Check `server/data/` directory exists
- Verify file permissions
- Check server logs for save errors

---

## 📚 Full Documentation

- **GOOGLE_SETUP_GUIDE.md** - Complete Google Cloud setup
- **BETA_SYSTEM.md** - Local storage system documentation
- **.github/copilot-instructions.md** - Development guidelines

---

## 💡 Tips

1. **Test locally first** before deploying
2. **Use test Google Groups** for development
3. **Monitor logs** for Google API errors
4. **Export data regularly** (use admin panel)
5. **Keep service account keys secure**
6. **Set up error monitoring** (Sentry, etc.)

---

## ✅ Checklist Before Launch

- [ ] Google Groups created and configured
- [ ] Service account set up with proper permissions
- [ ] Domain-wide delegation enabled
- [ ] `.env` file configured with all credentials
- [ ] Backend tested locally
- [ ] Frontend tested locally
- [ ] Email delivery tested
- [ ] Admin password changed
- [ ] Play Console closed testing track set up
- [ ] TestFlight beta configured (iOS)
- [ ] Backend deployed to production
- [ ] Frontend deployed to production
- [ ] Production environment variables set
- [ ] API URL updated in frontend
- [ ] End-to-end test in production

---

## 🆘 Need Help?

1. Check the server logs for detailed errors
2. Review GOOGLE_SETUP_GUIDE.md for Google-specific issues
3. Test API endpoints directly with curl/Postman
4. Verify environment variables are set correctly
5. Check Google Cloud Console for API quotas/errors

---

Happy beta testing! 🚀
