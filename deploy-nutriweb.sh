#!/bin/bash
# Complete NutriWeb Deployment Script
# Deploys NutriWeb React app to OpenLiteSpeed on nutriai.online

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo -e "${CYAN}   NutriWeb Deployment Script              ${NC}"
echo -e "${CYAN}   Domain: nutriai.online                  ${NC}"
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo ""

# Step 1: Install dependencies
echo -e "${YELLOW}📦 Installing Node.js and Git...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - > /dev/null 2>&1
apt-get install -y nodejs git > /dev/null 2>&1
echo -e "${GREEN}✅ Node.js $(node --version) installed${NC}"
echo -e "${GREEN}✅ npm $(npm --version) installed${NC}"
echo -e "${GREEN}✅ Git installed${NC}"

# Step 2: Clone and build the project
echo -e "${YELLOW}📥 Cloning NutriWeb repository...${NC}"
cd /tmp
rm -rf NutriWeb
git clone https://github.com/Ahmed-Aziz-Belkahia/NutriWeb.git
cd NutriWeb
echo -e "${GREEN}✅ Repository cloned${NC}"

echo -e "${YELLOW}📦 Installing npm packages (this may take a moment)...${NC}"
npm install --silent
echo -e "${GREEN}✅ Dependencies installed${NC}"

echo -e "${YELLOW}🔨 Building for production...${NC}"
npm run build
echo -e "${GREEN}✅ Build complete${NC}"

# Step 3: Deploy to web directory
echo -e "${YELLOW}📂 Deploying to web directory...${NC}"
rm -rf /usr/local/lsws/Example/html/nutriweb
mkdir -p /usr/local/lsws/Example/html/nutriweb
cp -r dist/* /usr/local/lsws/Example/html/nutriweb/
chown -R www-data:www-data /usr/local/lsws/Example/html/nutriweb
chmod -R 755 /usr/local/lsws/Example/html/nutriweb
echo -e "${GREEN}✅ Files deployed to /usr/local/lsws/Example/html/nutriweb${NC}"

# Step 4: Configure OpenLiteSpeed Virtual Host
echo -e "${YELLOW}⚙️  Configuring OpenLiteSpeed virtual host...${NC}"

# Update the Example virtual host to serve our React app
cat > /usr/local/lsws/conf/vhosts/Example/vhconf.conf << 'VHCONF'
docRoot                   /usr/local/lsws/Example/html/nutriweb
enableGzip                1
enableBr                  1

errorlog $VH_ROOT/logs/error.log {
  useServer               0
  logLevel                WARN
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
  expiresByType           text/css=A31536000, application/javascript=A31536000, image/*=A31536000, font/*=A31536000
}

# Cache control for static assets
context /assets/ {
  location                /usr/local/lsws/Example/html/nutriweb/assets/
  allowBrowse             0
  
  extraHeaders            <<<END_extraHeaders
Cache-Control: public, max-age=31536000, immutable
END_extraHeaders
}

# Security headers for all pages
context / {
  extraHeaders            <<<END_extraHeaders
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
END_extraHeaders
}

# React Router support - serve index.html for all routes
rewrite  {
  enable                  1
  autoLoadHtaccess        0
  
  # Serve index.html for all non-file requests (React Router)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ /index.html [L]
}
VHCONF

echo -e "${GREEN}✅ Virtual host configured${NC}"

# Step 5: Restart OpenLiteSpeed
echo -e "${YELLOW}🔄 Restarting OpenLiteSpeed...${NC}"
/usr/local/lsws/bin/lswsctrl restart
sleep 3

# Check if it started successfully
if /usr/local/lsws/bin/lswsctrl status | grep -q "litespeed is running"; then
    echo -e "${GREEN}✅ OpenLiteSpeed restarted successfully${NC}"
else
    echo -e "${RED}⚠️  OpenLiteSpeed may have issues. Check logs.${NC}"
fi

# Step 6: Clean up
echo -e "${YELLOW}🧹 Cleaning up temporary files...${NC}"
rm -rf /tmp/NutriWeb
echo -e "${GREEN}✅ Cleanup complete${NC}"

# Step 7: Verify deployment
echo -e "${YELLOW}🔍 Verifying deployment...${NC}"
if [ -f "/usr/local/lsws/Example/html/nutriweb/index.html" ]; then
    echo -e "${GREEN}✅ index.html found${NC}"
    FILE_COUNT=$(find /usr/local/lsws/Example/html/nutriweb -type f | wc -l)
    echo -e "${GREEN}✅ ${FILE_COUNT} files deployed${NC}"
else
    echo -e "${RED}❌ index.html not found!${NC}"
fi

echo ""
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 DEPLOYMENT SUCCESSFUL!${NC}"
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}Your website is now live at:${NC}"
echo "  🌐 https://nutriai.online"
echo "  🌐 https://www.nutriai.online"
echo ""
echo -e "${YELLOW}Admin Panel Access:${NC}"
echo "  📊 URL: https://nutriai.online:7080"
echo "  👤 Username: admin"
echo "  🔑 Password: 22Ye2o91TyRLPna7"
echo ""
echo -e "${YELLOW}Useful Commands:${NC}"
echo "  Check status: /usr/local/lsws/bin/lswsctrl status"
echo "  Restart server: /usr/local/lsws/bin/lswsctrl restart"
echo "  View error logs: tail -f /usr/local/lsws/Example/logs/error.log"
echo "  View access logs: tail -f /usr/local/lsws/Example/logs/access.log"
echo ""
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
