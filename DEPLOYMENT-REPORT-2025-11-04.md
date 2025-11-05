# NutriAI Website Deployment Report
**Date:** November 4, 2025  
**Server:** srv1077855.hstgr.cloud (72.61.182.248)  
**Domain:** nutriai.online  

---

## 🎯 Objective
Deploy the NutriAI website with beta testing functionality to production on OpenLiteSpeed server.

---

## ✅ What Was Accomplished

### 1. **Server Setup & File Transfer**
- ✅ Transferred entire project folder to VPS: `/usr/local/lsws/Example/html/NutriWeb`
- ✅ Installed all Node.js dependencies for both frontend and backend
- ✅ Fixed file permissions for OpenLiteSpeed (`lsadm:lsadm`)

### 2. **Virtual Host Configuration**
- ✅ Created new virtual host: `NutriWeb`
- ✅ Configured OpenLiteSpeed vhost at: `/usr/local/lsws/conf/vhosts/NutriWeb/vhconf.conf`
- ✅ Mapped domain `nutriai.online` to NutriWeb virtual host
- ✅ Configured SSL certificate (valid until February 2026)
  - Certificate path: `/etc/letsencrypt/live/nutriai.online/`

### 3. **API Backend Configuration**
- ✅ Set up backend API server at port 3001
- ✅ Configured PM2 process manager with 3 services:
  - `nutriai-beta` - Beta testing API (port 3001)
  - `nutriapp` - Existing app
  - `nutriweb-dev` - Vite dev server (stopped, using production build instead)
- ✅ Moved API server to correct path: `/usr/local/lsws/Example/html/NutriWeb/server/`
- ✅ Installed server dependencies (Express, CORS, Nodemailer, etc.)

### 4. **Production Build Deployment**
- ✅ Built React production bundle: `npm run build`
- ✅ Configured vhost to serve from `/dist` folder
- ✅ Switched from dev server to production build (eliminates constant refresh issues)

### 5. **React Router Configuration**
- ✅ Implemented proper rewrite rules for single-page application (SPA)
- ✅ Fixed 404 errors when directly accessing routes like `/beta`, `/betaadmin`
- ✅ Added rules to exclude `/api` routes from rewrite
- ✅ Created `.htaccess` file with proper React Router support

**Rewrite Rules:**
```apache
RewriteCond %{REQUEST_URI} !^/api
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L,QSA]
```

### 6. **API Proxy Configuration**
- ✅ Fixed API routing issues
- ✅ Configured OpenLiteSpeed to proxy `/api` requests to `localhost:3001`
- ✅ Updated all frontend API calls to use relative paths (`/api/...`)
- ✅ Fixed both `Beta.tsx` and `BetaAdmin.tsx` to use proxy

**Fixed Files:**
- `src/pages/Beta.tsx` - Beta signup form API calls
- `src/pages/BetaAdmin.tsx` - Admin panel API calls

### 7. **Email System Configuration**
- ✅ Configured SMTP with Gmail (support@nutriai.pl)
- ✅ Created `.env` file with email credentials
- ✅ Updated email templates to include both Android and iOS links
- ✅ Implemented automatic emails:
  - **Application Received** - Sent when user submits beta application
  - **Approval Email** - Sent when admin approves application
  - **Rejection Email** - Sent when admin rejects application

**Email Configuration (.env):**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=support@nutriai.pl
SMTP_PASS=7|Pwm5qY?U
EMAIL_FROM="NutriAI Team <support@nutriai.pl>"
```

**App Links in Emails:**
- Android: https://play.google.com/store/apps/details?id=com.nutritheapp.nutriai
- iOS: https://apps.apple.com/pl/app/nutri-ai/id6747520795

### 8. **Vite Configuration Updates**
- ✅ Updated `vite.config.ts` with HMR settings (for dev mode)
- ✅ Configured proxy for API calls during development
- ✅ Set proper host bindings (`0.0.0.0:5174`)

### 9. **Bug Fixes & Optimizations**
- ✅ Fixed WebSocket errors (disabled WebSocket when using production build)
- ✅ Fixed constant page refresh issue (switched from dev to production)
- ✅ Fixed API connectivity issues (proper proxy configuration)
- ✅ Fixed admin panel not showing beta testers (updated API URLs)
- ✅ Fixed direct URL access (React Router rewrite rules)
- ✅ Fixed file permissions issues
- ✅ Set log level to ERROR (reduced noise in logs)

---

## 🏗️ Final Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    HTTPS (443)                          │
│                  nutriai.online                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              OpenLiteSpeed Server                       │
│         /usr/local/lsws/conf/vhosts/NutriWeb/          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────┐         ┌─────────────────┐      │
│  │  Static Files   │         │   API Proxy     │      │
│  │  /dist/         │         │   /api → :3001  │      │
│  │  (React Build)  │         │                 │      │
│  └─────────────────┘         └────────┬────────┘      │
│                                       │                │
└───────────────────────────────────────┼────────────────┘
                                        │
                                        ▼
                        ┌───────────────────────────┐
                        │    PM2 Process Manager    │
                        ├───────────────────────────┤
                        │  nutriai-beta (port 3001) │
                        │  - Express API            │
                        │  - Beta tester CRUD       │
                        │  - Email notifications    │
                        │  - Data: JSON file        │
                        └───────────────────────────┘
```

---

## 📁 Key File Locations

### Frontend
- **Production Build:** `/usr/local/lsws/Example/html/NutriWeb/dist/`
- **Source Code:** `/usr/local/lsws/Example/html/NutriWeb/src/`
- **Vite Config:** `/usr/local/lsws/Example/html/NutriWeb/vite.config.ts`

### Backend
- **API Server:** `/usr/local/lsws/Example/html/NutriWeb/server/index.js`
- **Environment:** `/usr/local/lsws/Example/html/NutriWeb/server/.env`
- **Data Storage:** `/usr/local/lsws/Example/html/NutriWeb/server/data/beta-testers.json`

### Configuration
- **VHost Config:** `/usr/local/lsws/conf/vhosts/NutriWeb/vhconf.conf`
- **Main Config:** `/usr/local/lsws/conf/httpd_config.conf`
- **SSL Certificates:** `/etc/letsencrypt/live/nutriai.online/`
- **PM2 Config:** `/usr/local/lsws/Example/html/NutriWeb/ecosystem.config.cjs`

### Logs
- **OpenLiteSpeed:** `/usr/local/lsws/logs/error.log`
- **VHost Errors:** `/usr/local/lsws/NutriWeb/logs/error.log`
- **PM2 Logs:** `/root/.pm2/logs/nutriai-beta-*.log`

---

## 🔧 Useful Commands

### PM2 Management
```bash
pm2 list                    # List all processes
pm2 restart nutriai-beta    # Restart API server
pm2 logs nutriai-beta       # View API logs
pm2 save                    # Save PM2 configuration
pm2 monit                   # Monitor resources
```

### OpenLiteSpeed
```bash
systemctl restart lsws      # Restart web server
systemctl status lsws       # Check status
/usr/local/lsws/bin/lswsctrl reload  # Graceful reload
```

### Building Frontend
```bash
cd /usr/local/lsws/Example/html/NutriWeb
npm run build               # Build for production
```

### Testing API
```bash
# Test API directly
curl http://localhost:3001/api/beta-testers

# Test through proxy
curl https://nutriai.online/api/beta-testers
```

---

## 🌐 Live URLs

- **Homepage:** https://nutriai.online
- **Beta Signup:** https://nutriai.online/beta
- **Admin Panel:** https://nutriai.online/betaadmin
- **Features:** https://nutriai.online/features
- **About:** https://nutriai.online/about
- **Contact:** https://nutriai.online/contact

**Admin Credentials:**
- Password: `nutriai2025`

---

## 📊 Current Status

### Services Running
- ✅ OpenLiteSpeed (HTTPS on port 443)
- ✅ API Server (nutriai-beta on port 3001)
- ✅ Email Service (SMTP via Gmail)
- ⏸️ Vite Dev Server (stopped, using production build)

### Features Working
- ✅ Beta signup form
- ✅ Admin panel with full CRUD operations
- ✅ Email notifications (application received & approval)
- ✅ React Router (all routes accessible)
- ✅ API proxy
- ✅ SSL/HTTPS
- ✅ Static file caching
- ✅ Gzip/Brotli compression

---

## 🐛 Issues Resolved

1. **Constant Page Refresh**
   - **Cause:** Vite dev server HMR conflicts with proxy
   - **Solution:** Switched to production build

2. **404 on Direct URL Access**
   - **Cause:** Missing React Router rewrite rules
   - **Solution:** Added proper rewrite conditions in vhconf

3. **API Calls Returning HTML**
   - **Cause:** Rewrite rules catching /api requests
   - **Solution:** Added `RewriteCond %{REQUEST_URI} !^/api`

4. **Admin Panel Not Loading Data**
   - **Cause:** Hardcoded API URLs bypassing proxy
   - **Solution:** Updated all API calls to relative paths

5. **Email Not Sending**
   - **Cause:** Missing SMTP configuration
   - **Solution:** Created .env file with credentials

6. **WebSocket Errors**
   - **Cause:** VHost configured for WebSocket but not needed
   - **Solution:** Removed WebSocket config for production build

---

## 📝 Notes & Recommendations

### For Future Updates
1. **To update frontend:**
   ```bash
   cd /usr/local/lsws/Example/html/NutriWeb
   npm run build
   # No need to restart OpenLiteSpeed
   ```

2. **To update backend:**
   ```bash
   # Upload new index.js via WinSCP
   pm2 restart nutriai-beta
   ```

3. **To update environment variables:**
   ```bash
   nano /usr/local/lsws/Example/html/NutriWeb/server/.env
   pm2 restart nutriai-beta
   ```

### Security
- Admin password is hardcoded in BetaAdmin.tsx (consider moving to backend)
- Beta tester data stored in JSON file (consider moving to database)
- Email password visible in .env (ensure proper file permissions)

### Performance
- Static files cached for 7 days
- Images cached for 30 days
- Gzip and Brotli compression enabled
- HTTP/2 enabled

### Monitoring
- Check PM2 logs regularly: `pm2 logs`
- Monitor server resources: `pm2 monit`
- Check OpenLiteSpeed logs: `tail -f /usr/local/lsws/logs/error.log`

---

## 🎉 Summary

**The NutriAI website is now fully deployed and operational on nutriai.online with:**
- ✅ Production-ready React frontend
- ✅ Functioning API backend
- ✅ Email notification system
- ✅ Beta testing management
- ✅ Secure HTTPS connection
- ✅ Proper routing and proxying

**All systems are GO! 🚀**

---

**Deployed by:** GitHub Copilot  
**Report Date:** November 4, 2025  
**Server:** srv1077855.hstgr.cloud
