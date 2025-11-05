#!/bin/bash
# OpenLiteSpeed Deployment Script for NutriAI Beta
# Run this on your server: bash deploy.sh

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}🚀 NutriAI Beta - OpenLiteSpeed Deployment${NC}"
echo "=============================================="
echo ""

# Configuration
APP_DIR="/usr/local/lsws/Example/html/NutriBeta"
VHOST_CONF_DIR="/usr/local/lsws/conf/vhosts/NutriBeta"
NODE_VERSION="18"

# Step 1: Check if running as root
if [ "$EUID" -ne 0 ]; then 
   echo -e "${RED}❌ Please run as root${NC}"
   exit 1
fi

echo -e "${GREEN}✅ Running as root${NC}"

# Step 2: Create directory structure
echo -e "${YELLOW}📁 Creating directory structure...${NC}"
mkdir -p $APP_DIR/{server,logs,data}
mkdir -p $VHOST_CONF_DIR
echo -e "${GREEN}✅ Directories created${NC}"

# Step 3: Install Node.js if not present
echo -e "${YELLOW}📦 Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Installing Node.js ${NODE_VERSION}...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt-get install -y nodejs
    echo -e "${GREEN}✅ Node.js installed${NC}"
else
    NODE_VER=$(node -v)
    echo -e "${GREEN}✅ Node.js already installed: ${NODE_VER}${NC}"
fi

# Step 4: Install PM2 globally
echo -e "${YELLOW}📦 Checking PM2 installation...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installing PM2...${NC}"
    npm install -g pm2
    echo -e "${GREEN}✅ PM2 installed${NC}"
else
    echo -e "${GREEN}✅ PM2 already installed${NC}"
fi

# Step 5: Create virtual host configuration
echo -e "${YELLOW}⚙️  Creating OpenLiteSpeed virtual host configuration...${NC}"
cat > $VHOST_CONF_DIR/vhconf.conf << 'VHCONF'
docRoot                   /usr/local/lsws/Example/html/NutriBeta
enableGzip                1
enableBr                  1

errorlog $VH_ROOT/logs/error.log {
  useServer               0
  logLevel                DEBUG
  rollingSize             10M
}

accesslog $VH_ROOT/logs/access.log {
  useServer               0
  rollingSize             10M
  keepDays                30
  compressArchive         1
}

index  {
  useServer               0
  indexFiles              index.html
}

expires  {
  enableExpires           1
  expiresDefault          A604800
  expiresByType           image/*=A2592000, text/css=A604800, application/javascript=A2592000
}

context /api/ {
  type                    proxy
  handler                 nutriai
  addDefaultCharset       off
}

extprocessor nutriai {
  type                    proxy
  address                 127.0.0.1:3001
  maxConns                100
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

rewrite  {
  enable                  1
  
  RewriteCond %{REQUEST_URI} ^/api/
  RewriteRule ^/api/(.*)$ http://127.0.0.1:3001/api/$1 [P,L]
  
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !^/api/
  RewriteRule ^(.*)$ /index.html [L]
}
VHCONF

echo -e "${GREEN}✅ Virtual host configuration created${NC}"

# Step 6: Update main OpenLiteSpeed config
echo -e "${YELLOW}⚙️  Updating OpenLiteSpeed main configuration...${NC}"

# Check if virtual host already exists in config
if ! grep -q "virtualhost NutriBeta" /usr/local/lsws/conf/httpd_config.conf; then
    echo -e "${YELLOW}Adding virtual host to httpd_config.conf...${NC}"
    
    # Backup original config
    cp /usr/local/lsws/conf/httpd_config.conf /usr/local/lsws/conf/httpd_config.conf.backup
    
    # Add virtual host configuration
    cat >> /usr/local/lsws/conf/httpd_config.conf << 'HTTPD'

virtualhost NutriBeta {
  vhRoot                  /usr/local/lsws/Example/html/NutriBeta
  configFile              /usr/local/lsws/conf/vhosts/NutriBeta/vhconf.conf
  allowSymbolLink         1
  enableScript            1
  restrained              0
}
HTTPD
    
    echo -e "${GREEN}✅ Virtual host added to main config${NC}"
else
    echo -e "${GREEN}✅ Virtual host already exists in config${NC}"
fi

# Step 7: Set up file permissions
echo -e "${YELLOW}🔒 Setting file permissions...${NC}"
chown -R nobody:nogroup $APP_DIR
chmod -R 755 $APP_DIR
chmod -R 775 $APP_DIR/data  # Writable for data storage
chmod -R 775 $APP_DIR/logs  # Writable for logs
echo -e "${GREEN}✅ Permissions set${NC}"

# Step 8: Create server package.json
echo -e "${YELLOW}📦 Creating server package.json...${NC}"
cat > $APP_DIR/server/package.json << 'PACKAGE'
{
  "name": "nutriai-beta-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "googleapis": "^128.0.0",
    "nodemailer": "^6.9.7"
  }
}
PACKAGE
echo -e "${GREEN}✅ Server package.json created${NC}"

# Step 9: Create PM2 ecosystem file
echo -e "${YELLOW}📦 Creating PM2 ecosystem configuration...${NC}"
cat > $APP_DIR/server/ecosystem.config.js << 'ECOSYSTEM'
module.exports = {
  apps: [{
    name: 'nutriai-api',
    script: './index.js',
    cwd: '/usr/local/lsws/Example/html/NutriBeta/server',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '256M',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/usr/local/lsws/Example/html/NutriBeta/logs/api-error.log',
    out_file: '/usr/local/lsws/Example/html/NutriBeta/logs/api-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
ECOSYSTEM
echo -e "${GREEN}✅ PM2 ecosystem config created${NC}"

# Step 10: Create .env template if it doesn't exist
if [ ! -f "$APP_DIR/server/.env" ]; then
    echo -e "${YELLOW}⚙️  Creating .env template...${NC}"
    cat > $APP_DIR/server/.env << 'ENV'
# Server Configuration
PORT=3001
NODE_ENV=production

# Data Storage
DATA_DIR=/usr/local/lsws/Example/html/NutriBeta/data

# Google Service Account (UPDATE THESE!)
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"

# Google Groups (UPDATE THESE!)
GOOGLE_GROUP_ANDROID=nutriai-android-beta@yourdomain.com
GOOGLE_GROUP_IOS=nutriai-ios-beta@yourdomain.com
GOOGLE_ADMIN_EMAIL=admin@yourdomain.com

# Beta Links (UPDATE THESE!)
ANDROID_BETA_LINK=https://play.google.com/apps/testing/com.nutriai.app
IOS_BETA_LINK=https://testflight.apple.com/join/YOUR_CODE

# Email Configuration (UPDATE THESE!)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=NutriAI Beta <beta@nutriai.app>
ENV
    echo -e "${GREEN}✅ .env template created${NC}"
    echo -e "${RED}⚠️  IMPORTANT: Edit $APP_DIR/server/.env with your actual credentials!${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Step 11: Create placeholder index.html if files not uploaded yet
if [ ! -f "$APP_DIR/index.html" ]; then
    echo -e "${YELLOW}📄 Creating placeholder index.html...${NC}"
    cat > $APP_DIR/index.html << 'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NutriAI Beta - Deployment in Progress</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #33A9FF 0%, #0088E6 100%);
            color: white;
        }
        .container {
            text-align: center;
            padding: 2rem;
        }
        h1 { font-size: 3rem; margin-bottom: 1rem; }
        p { font-size: 1.5rem; opacity: 0.9; }
        .spinner {
            border: 4px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top: 4px solid white;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
            margin: 2rem auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 NutriAI Beta</h1>
        <div class="spinner"></div>
        <p>Deployment in Progress...</p>
        <p style="font-size: 1rem; margin-top: 2rem;">
            Upload your built React files to complete the setup
        </p>
    </div>
</body>
</html>
HTML
    echo -e "${GREEN}✅ Placeholder page created${NC}"
fi

# Step 12: Set up log rotation
echo -e "${YELLOW}📋 Setting up log rotation...${NC}"
cat > /etc/logrotate.d/nutriai << 'LOGROTATE'
/usr/local/lsws/Example/html/NutriBeta/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 644 nobody nogroup
    sharedscripts
}
LOGROTATE
echo -e "${GREEN}✅ Log rotation configured${NC}"

echo ""
echo -e "${CYAN}=============================================="
echo -e "✅ Deployment Setup Complete!"
echo -e "==============================================$ {NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo -e "${CYAN}1. Upload your application files:${NC}"
echo "   - React build files → $APP_DIR/"
echo "   - Server files → $APP_DIR/server/"
echo ""
echo -e "${CYAN}2. Update configuration:${NC}"
echo "   nano $APP_DIR/server/.env"
echo ""
echo -e "${CYAN}3. Install server dependencies:${NC}"
echo "   cd $APP_DIR/server"
echo "   npm install --production"
echo ""
echo -e "${CYAN}4. Start the API server:${NC}"
echo "   cd $APP_DIR/server"
echo "   pm2 start ecosystem.config.js"
echo "   pm2 save"
echo "   pm2 startup"
echo ""
echo -e "${CYAN}5. Restart OpenLiteSpeed:${NC}"
echo "   /usr/local/lsws/bin/lswsctrl restart"
echo ""
echo -e "${GREEN}📍 Your app will be available at:${NC}"
echo "   http://89.116.110.161/NutriBeta"
echo "   API: http://89.116.110.161/api/health"
echo ""
echo -e "${YELLOW}📊 Useful commands:${NC}"
echo "   pm2 status              - Check API status"
echo "   pm2 logs nutriai-api    - View API logs"
echo "   pm2 restart nutriai-api - Restart API"
echo "   tail -f $APP_DIR/logs/error.log"
echo ""
