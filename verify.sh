#!/bin/bash
# Verification script for NutriAI Beta deployment
# Run on server: bash verify.sh

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

APP_DIR="/usr/local/lsws/Example/html/NutriBeta"

echo -e "${CYAN}🔍 Verifying NutriAI Beta Deployment${NC}"
echo "======================================"
echo ""

# Check 1: Directory structure
echo -e "${YELLOW}📁 Checking directory structure...${NC}"
DIRS_OK=true
for dir in "$APP_DIR" "$APP_DIR/server" "$APP_DIR/logs" "$APP_DIR/data"; do
    if [ -d "$dir" ]; then
        echo -e "  ✅ $dir"
    else
        echo -e "  ${RED}❌ $dir (missing)${NC}"
        DIRS_OK=false
    fi
done
echo ""

# Check 2: Frontend files
echo -e "${YELLOW}📄 Checking frontend files...${NC}"
if [ -f "$APP_DIR/index.html" ]; then
    echo -e "  ✅ index.html exists"
    FILE_SIZE=$(stat -f%z "$APP_DIR/index.html" 2>/dev/null || stat -c%s "$APP_DIR/index.html" 2>/dev/null)
    echo -e "     Size: ${FILE_SIZE} bytes"
else
    echo -e "  ${RED}❌ index.html missing${NC}"
fi

if [ -d "$APP_DIR/assets" ]; then
    FILE_COUNT=$(find "$APP_DIR/assets" -type f | wc -l)
    echo -e "  ✅ assets/ directory (${FILE_COUNT} files)"
else
    echo -e "  ${YELLOW}⚠️  assets/ directory not found${NC}"
fi
echo ""

# Check 3: Server files
echo -e "${YELLOW}🖥️  Checking server files...${NC}"
if [ -f "$APP_DIR/server/index.js" ]; then
    echo -e "  ✅ server/index.js exists"
else
    echo -e "  ${RED}❌ server/index.js missing${NC}"
fi

if [ -f "$APP_DIR/server/package.json" ]; then
    echo -e "  ✅ server/package.json exists"
else
    echo -e "  ${RED}❌ server/package.json missing${NC}"
fi

if [ -f "$APP_DIR/server/.env" ]; then
    echo -e "  ✅ server/.env exists"
    # Check if it's still the template
    if grep -q "your-service-account@project.iam.gserviceaccount.com" "$APP_DIR/server/.env"; then
        echo -e "     ${YELLOW}⚠️  Still using template values - update .env!${NC}"
    else
        echo -e "     ${GREEN}✅ Appears to be configured${NC}"
    fi
else
    echo -e "  ${RED}❌ server/.env missing${NC}"
fi

if [ -d "$APP_DIR/server/node_modules" ]; then
    echo -e "  ✅ node_modules installed"
else
    echo -e "  ${YELLOW}⚠️  node_modules not installed - run: cd $APP_DIR/server && npm install${NC}"
fi
echo ""

# Check 4: Node.js and PM2
echo -e "${YELLOW}📦 Checking Node.js and PM2...${NC}"
if command -v node &> /dev/null; then
    NODE_VER=$(node -v)
    echo -e "  ✅ Node.js installed: ${NODE_VER}"
else
    echo -e "  ${RED}❌ Node.js not installed${NC}"
fi

if command -v pm2 &> /dev/null; then
    PM2_VER=$(pm2 -v)
    echo -e "  ✅ PM2 installed: ${PM2_VER}"
else
    echo -e "  ${RED}❌ PM2 not installed${NC}"
fi
echo ""

# Check 5: PM2 process status
echo -e "${YELLOW}🔄 Checking PM2 process...${NC}"
if command -v pm2 &> /dev/null; then
    if pm2 list | grep -q "nutriai-api"; then
        echo -e "  ✅ nutriai-api process exists"
        pm2 list | grep nutriai-api
        
        # Check if it's running
        if pm2 list | grep nutriai-api | grep -q "online"; then
            echo -e "  ${GREEN}✅ API is running${NC}"
        else
            echo -e "  ${RED}❌ API is not running${NC}"
        fi
    else
        echo -e "  ${YELLOW}⚠️  nutriai-api process not found${NC}"
        echo -e "     Run: cd $APP_DIR/server && pm2 start ecosystem.config.js"
    fi
else
    echo -e "  ${RED}❌ PM2 not available${NC}"
fi
echo ""

# Check 6: API endpoint test
echo -e "${YELLOW}🌐 Testing API endpoint...${NC}"
if command -v curl &> /dev/null; then
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/health 2>/dev/null || echo "000")
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "  ${GREEN}✅ API responding (HTTP $HTTP_CODE)${NC}"
        RESPONSE=$(curl -s http://localhost:3001/api/health)
        echo -e "     Response: ${RESPONSE}"
    else
        echo -e "  ${RED}❌ API not responding (HTTP $HTTP_CODE)${NC}"
    fi
else
    echo -e "  ${YELLOW}⚠️  curl not available for testing${NC}"
fi
echo ""

# Check 7: OpenLiteSpeed
echo -e "${YELLOW}⚡ Checking OpenLiteSpeed...${NC}"
if pgrep -x "litespeed" > /dev/null; then
    echo -e "  ✅ OpenLiteSpeed is running"
    LSWS_PROCS=$(pgrep -c litespeed)
    echo -e "     Processes: ${LSWS_PROCS}"
else
    echo -e "  ${RED}❌ OpenLiteSpeed is not running${NC}"
fi

if [ -f "/usr/local/lsws/conf/vhosts/NutriBeta/vhconf.conf" ]; then
    echo -e "  ✅ Virtual host config exists"
else
    echo -e "  ${RED}❌ Virtual host config missing${NC}"
fi

if grep -q "virtualhost NutriBeta" /usr/local/lsws/conf/httpd_config.conf; then
    echo -e "  ✅ Virtual host registered in main config"
else
    echo -e "  ${RED}❌ Virtual host not registered${NC}"
fi
echo ""

# Check 8: Permissions
echo -e "${YELLOW}🔒 Checking permissions...${NC}"
OWNER=$(stat -c '%U:%G' "$APP_DIR" 2>/dev/null || stat -f '%Su:%Sg' "$APP_DIR" 2>/dev/null)
echo -e "  Owner: ${OWNER}"
if [ "$OWNER" = "nobody:nogroup" ] || [ "$OWNER" = "nobody:nobody" ]; then
    echo -e "  ${GREEN}✅ Correct ownership${NC}"
else
    echo -e "  ${YELLOW}⚠️  Expected nobody:nogroup, found ${OWNER}${NC}"
fi
echo ""

# Check 9: Logs
echo -e "${YELLOW}📋 Checking logs...${NC}"
if [ -f "$APP_DIR/logs/api-error.log" ]; then
    ERROR_COUNT=$(wc -l < "$APP_DIR/logs/api-error.log")
    echo -e "  ✅ API error log exists (${ERROR_COUNT} lines)"
    if [ "$ERROR_COUNT" -gt 0 ]; then
        echo -e "     ${YELLOW}Last 5 errors:${NC}"
        tail -5 "$APP_DIR/logs/api-error.log" | sed 's/^/     /'
    fi
else
    echo -e "  ${YELLOW}⚠️  No error log yet${NC}"
fi

if [ -f "$APP_DIR/logs/error.log" ]; then
    echo -e "  ✅ OpenLiteSpeed error log exists"
else
    echo -e "  ${YELLOW}⚠️  No OpenLiteSpeed error log yet${NC}"
fi
echo ""

# Summary
echo -e "${CYAN}======================================"
echo -e "📊 Summary"
echo -e "======================================${NC}"
echo ""

# Test URLs
echo -e "${GREEN}🌐 Test URLs:${NC}"
echo "  Frontend: http://89.116.110.161/NutriBeta"
echo "  API Health: http://89.116.110.161/api/health"
echo "  Beta Page: http://89.116.110.161/NutriBeta/beta"
echo "  Admin: http://89.116.110.161/NutriBeta/beta-admin"
echo ""

# Useful commands
echo -e "${GREEN}📝 Useful Commands:${NC}"
echo "  pm2 status              - Check API status"
echo "  pm2 logs nutriai-api    - View API logs"
echo "  pm2 restart nutriai-api - Restart API"
echo "  pm2 save                - Save PM2 config"
echo "  /usr/local/lsws/bin/lswsctrl status   - OpenLiteSpeed status"
echo "  /usr/local/lsws/bin/lswsctrl restart  - Restart OpenLiteSpeed"
echo "  tail -f $APP_DIR/logs/api-error.log   - Watch API errors"
echo "  tail -f $APP_DIR/logs/error.log       - Watch OLS errors"
echo ""

# Next steps
if [ ! -f "$APP_DIR/index.html" ] || [ ! -f "$APP_DIR/server/index.js" ]; then
    echo -e "${YELLOW}⚠️  Next Steps:${NC}"
    echo "  1. Upload your built files to $APP_DIR"
    echo "  2. Update $APP_DIR/server/.env with your credentials"
    echo "  3. Install dependencies: cd $APP_DIR/server && npm install"
    echo "  4. Start PM2: pm2 start ecosystem.config.js"
    echo "  5. Restart OpenLiteSpeed: /usr/local/lsws/bin/lswsctrl restart"
    echo ""
fi

echo -e "${CYAN}Done!${NC}"
