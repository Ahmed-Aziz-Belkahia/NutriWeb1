# OpenLiteSpeed Deployment Guide

Complete step-by-step guide to deploy NutriAI Beta on OpenLiteSpeed.

## 📋 Pre-Deployment Checklist

- [ ] Server accessible via SSH (root@89.116.110.161)
- [ ] OpenLiteSpeed installed and running
- [ ] React app builds successfully locally
- [ ] Node.js backend tested locally
- [ ] Google Cloud credentials ready (optional)
- [ ] Email SMTP credentials ready (optional)

---

## 🚀 Deployment Steps

### Step 1: Prepare Local Build

On your **local Windows machine**:

```powershell
# Build the application
.\build-deploy.ps1
```

This creates a `nutriai-deploy` folder with all necessary files.

---

### Step 2: Run Server Setup

**SSH into your server:**
```bash
ssh root@89.116.110.161
cd /usr/local/lsws/Example/html/NutriBeta
```

**Upload and run the deployment script:**

```bash
# Download the deploy script
curl -o deploy.sh https://raw.githubusercontent.com/YOUR_REPO/deploy.sh
# Or upload deploy.sh from your local machine

# Make it executable
chmod +x deploy.sh

# Run deployment setup
bash deploy.sh
```

**What this does:**
- ✅ Creates directory structure
- ✅ Installs Node.js 18+ if needed
- ✅ Installs PM2 globally
- ✅ Creates OpenLiteSpeed virtual host config
- ✅ Updates main OpenLiteSpeed configuration
- ✅ Sets up proper permissions
- ✅ Creates .env template
- ✅ Sets up log rotation

---

### Step 3: Upload Application Files

**Option A: Using SCP (from local Windows PowerShell)**

```powershell
cd nutriai-deploy
scp -r * root@89.116.110.161:/usr/local/lsws/Example/html/NutriBeta/
scp -r server/* root@89.116.110.161:/usr/local/lsws/Example/html/NutriBeta/server/
```

**Option B: Using WinSCP**

1. Open WinSCP
2. Connect to: `89.116.110.161` (Port 22, username: root)
3. Navigate to: `/usr/local/lsws/Example/html/NutriBeta/`
4. Upload all files from `nutriai-deploy` folder
5. Upload server files to `server/` subdirectory

**Option C: Using FileZilla**

1. Host: `sftp://89.116.110.161`
2. Username: `root`
3. Port: `22`
4. Remote directory: `/usr/local/lsws/Example/html/NutriBeta/`
5. Upload files

---

### Step 4: Configure Environment Variables

**SSH into server:**
```bash
ssh root@89.116.110.161
cd /usr/local/lsws/Example/html/NutriBeta/server
nano .env
```

**Update these values:**

```bash
# Google Service Account
GOOGLE_CLIENT_EMAIL=your-actual-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n[YOUR_ACTUAL_KEY]\n-----END PRIVATE KEY-----\n"

# Google Groups
GOOGLE_GROUP_ANDROID=nutriai-android-beta@yourdomain.com
GOOGLE_GROUP_IOS=nutriai-ios-beta@yourdomain.com
GOOGLE_ADMIN_EMAIL=admin@yourdomain.com

# Beta Links
ANDROID_BETA_LINK=https://play.google.com/apps/testing/com.nutriai.app
IOS_BETA_LINK=https://testflight.apple.com/join/YOUR_CODE

# Email Configuration
SMTP_USER=your-actual-email@gmail.com
SMTP_PASS=your-actual-app-password
```

**Save:** `Ctrl+O`, `Enter`, `Ctrl+X`

---

### Step 5: Install Dependencies and Start API

```bash
# Install server dependencies
cd /usr/local/lsws/Example/html/NutriBeta/server
npm install --production

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup systemd

# Check status
pm2 status
pm2 logs nutriai-api
```

---

### Step 6: Set Permissions

```bash
# Set correct ownership
chown -R nobody:nogroup /usr/local/lsws/Example/html/NutriBeta

# Set permissions
chmod -R 755 /usr/local/lsws/Example/html/NutriBeta
chmod -R 775 /usr/local/lsws/Example/html/NutriBeta/data
chmod -R 775 /usr/local/lsws/Example/html/NutriBeta/logs
```

---

### Step 7: Restart OpenLiteSpeed

```bash
# Restart OpenLiteSpeed
/usr/local/lsws/bin/lswsctrl restart

# Or graceful restart
/usr/local/lsws/bin/lswsctrl graceful

# Check status
/usr/local/lsws/bin/lswsctrl status
```

---

### Step 8: Verify Deployment

```bash
# Download and run verification script
cd /usr/local/lsws/Example/html/NutriBeta
curl -o verify.sh https://raw.githubusercontent.com/YOUR_REPO/verify.sh
chmod +x verify.sh
bash verify.sh
```

**Manual verification:**

```bash
# Test API
curl http://localhost:3001/api/health

# Check if files are served
curl -I http://localhost/NutriBeta/

# View PM2 status
pm2 status

# View logs
pm2 logs nutriai-api --lines 50
tail -f /usr/local/lsws/Example/html/NutriBeta/logs/error.log
```

---

### Step 9: Test in Browser

Visit these URLs:

1. **Frontend:** `http://89.116.110.161/NutriBeta`
2. **Beta Page:** `http://89.116.110.161/NutriBeta/beta`
3. **Admin Panel:** `http://89.116.110.161/NutriBeta/beta-admin` (password: `nutriai2025`)
4. **API Health:** `http://89.116.110.161/api/health`

---

## 🔧 Configuration Files

### Virtual Host Config Location
```
/usr/local/lsws/conf/vhosts/NutriBeta/vhconf.conf
```

### Main OpenLiteSpeed Config
```
/usr/local/lsws/conf/httpd_config.conf
```

### Application Files
```
/usr/local/lsws/Example/html/NutriBeta/
├── index.html              # React entry point
├── assets/                 # JS, CSS, images
├── server/
│   ├── index.js           # API server
│   ├── package.json       # Dependencies
│   ├── ecosystem.config.js # PM2 config
│   └── .env              # Environment variables
├── data/
│   └── beta-testers.json # Beta signups
└── logs/
    ├── api-error.log     # API errors
    ├── api-out.log       # API output
    ├── error.log         # OLS errors
    └── access.log        # OLS access logs
```

---

## 🐛 Troubleshooting

### Frontend Not Loading

```bash
# Check if files exist
ls -la /usr/local/lsws/Example/html/NutriBeta/index.html

# Check OpenLiteSpeed logs
tail -f /usr/local/lsws/Example/html/NutriBeta/logs/error.log

# Check permissions
ls -la /usr/local/lsws/Example/html/NutriBeta/

# Restart OpenLiteSpeed
/usr/local/lsws/bin/lswsctrl restart
```

### API Not Responding

```bash
# Check PM2 status
pm2 status

# View API logs
pm2 logs nutriai-api

# Check if port 3001 is in use
netstat -tlnp | grep 3001

# Restart API
pm2 restart nutriai-api

# Check .env configuration
cat /usr/local/lsws/Example/html/NutriBeta/server/.env
```

### 404 Errors on Routes

This usually means the rewrite rules aren't working.

```bash
# Check vhost config
cat /usr/local/lsws/conf/vhosts/NutriBeta/vhconf.conf

# Verify rewrite section exists
grep -A 10 "rewrite" /usr/local/lsws/conf/vhosts/NutriBeta/vhconf.conf

# Restart OpenLiteSpeed
/usr/local/lsws/bin/lswsctrl restart
```

### API Proxy Not Working

```bash
# Test API directly
curl http://localhost:3001/api/health

# Test through proxy
curl http://localhost/api/health

# Check external processor config
grep -A 10 "extprocessor nutriai" /usr/local/lsws/conf/vhosts/NutriBeta/vhconf.conf

# Check OpenLiteSpeed error log
tail -100 /usr/local/lsws/Example/html/NutriBeta/logs/error.log
```

### Permission Errors

```bash
# Fix ownership
chown -R nobody:nogroup /usr/local/lsws/Example/html/NutriBeta

# Fix permissions
chmod -R 755 /usr/local/lsws/Example/html/NutriBeta
chmod -R 775 /usr/local/lsws/Example/html/NutriBeta/data
chmod -R 775 /usr/local/lsws/Example/html/NutriBeta/logs

# Restart services
pm2 restart nutriai-api
/usr/local/lsws/bin/lswsctrl restart
```

### PM2 Process Crashes

```bash
# View crash logs
pm2 logs nutriai-api --err --lines 100

# Check if dependencies are installed
cd /usr/local/lsws/Example/html/NutriBeta/server
npm list

# Reinstall if needed
rm -rf node_modules
npm install --production

# Check .env file
cat .env

# Restart
pm2 delete nutriai-api
pm2 start ecosystem.config.js
pm2 save
```

---

## 📊 Monitoring Commands

```bash
# PM2 monitoring
pm2 status                    # Process status
pm2 logs nutriai-api          # Live logs
pm2 logs nutriai-api --lines 100  # Last 100 lines
pm2 monit                     # Real-time monitoring

# OpenLiteSpeed
/usr/local/lsws/bin/lswsctrl status   # Service status
tail -f /usr/local/lsws/Example/html/NutriBeta/logs/access.log  # Access logs
tail -f /usr/local/lsws/Example/html/NutriBeta/logs/error.log   # Error logs

# System resources
htop                          # CPU/Memory usage
df -h                         # Disk space
netstat -tlnp                 # Open ports
```

---

## 🔄 Updates and Maintenance

### Updating Frontend

```bash
# On local machine - rebuild
npm run build

# Upload new files
scp -r dist/* root@89.116.110.161:/usr/local/lsws/Example/html/NutriBeta/

# On server - clear cache (if needed)
rm -rf /usr/local/lsws/Example/html/NutriBeta/assets/*
# Then re-upload

# Restart OpenLiteSpeed
/usr/local/lsws/bin/lswsctrl restart
```

### Updating Backend

```bash
# Upload new server files
scp server/index.js root@89.116.110.161:/usr/local/lsws/Example/html/NutriBeta/server/

# On server
pm2 restart nutriai-api

# Or reload with zero downtime
pm2 reload nutriai-api
```

### Backup Beta Tester Data

```bash
# Create backup
cp /usr/local/lsws/Example/html/NutriBeta/data/beta-testers.json \
   /root/backups/beta-testers-$(date +%Y%m%d).json

# Or download to local machine
scp root@89.116.110.161:/usr/local/lsws/Example/html/NutriBeta/data/beta-testers.json \
    ./backups/beta-testers-$(date +%Y%m%d).json
```

---

## 🔐 Security Enhancements

### 1. Set up SSL Certificate

```bash
# Install certbot
apt-get install certbot

# Get certificate (adjust domain)
certbot certonly --webroot \
  -w /usr/local/lsws/Example/html/NutriBeta \
  -d yourdomain.com

# Update vhost config to use SSL
nano /usr/local/lsws/conf/vhosts/NutriBeta/vhconf.conf
```

### 2. Add Rate Limiting

Install and configure rate limiting to prevent abuse.

### 3. Set up Firewall

```bash
# Allow only necessary ports
ufw allow 22      # SSH
ufw allow 80      # HTTP
ufw allow 443     # HTTPS
ufw enable
```

### 4. Change Admin Password

Edit `BetaAdmin.tsx` before building to change the default password.

---

## 📋 Quick Reference

### Important Paths
- **App Root:** `/usr/local/lsws/Example/html/NutriBeta`
- **Server:** `/usr/local/lsws/Example/html/NutriBeta/server`
- **Logs:** `/usr/local/lsws/Example/html/NutriBeta/logs`
- **Data:** `/usr/local/lsws/Example/html/NutriBeta/data`
- **Vhost Config:** `/usr/local/lsws/conf/vhosts/NutriBeta/vhconf.conf`

### Key Commands
```bash
# PM2
pm2 status
pm2 restart nutriai-api
pm2 logs nutriai-api

# OpenLiteSpeed
/usr/local/lsws/bin/lswsctrl restart
/usr/local/lsws/bin/lswsctrl status

# View logs
tail -f /usr/local/lsws/Example/html/NutriBeta/logs/api-error.log
tail -f /usr/local/lsws/Example/html/NutriBeta/logs/error.log
```

### Test URLs
- Frontend: `http://89.116.110.161/NutriBeta`
- API: `http://89.116.110.161/api/health`
- Beta: `http://89.116.110.161/NutriBeta/beta`
- Admin: `http://89.116.110.161/NutriBeta/beta-admin`

---

## ✅ Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] All routes work (/, /beta, /features, etc.)
- [ ] API responds to health check
- [ ] Beta signup works
- [ ] Admin panel accessible
- [ ] PM2 process running and stable
- [ ] Logs are being written
- [ ] Data directory is writable
- [ ] Environment variables configured
- [ ] SSL certificate installed (optional)
- [ ] Backups configured
- [ ] Monitoring set up

---

## 🆘 Getting Help

If you encounter issues:

1. Run the verification script: `bash verify.sh`
2. Check PM2 logs: `pm2 logs nutriai-api`
3. Check OpenLiteSpeed logs: `tail -100 /usr/local/lsws/Example/html/NutriBeta/logs/error.log`
4. Verify configuration files
5. Check file permissions
6. Review this troubleshooting guide

---

**Ready to deploy!** 🚀

Start with Step 1 and follow through sequentially.
