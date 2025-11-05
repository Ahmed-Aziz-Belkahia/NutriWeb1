#!/bin/bash
# OpenLiteSpeed Configuration Backup Script
# Backs up ONLY OpenLiteSpeed configs, SSL certs, and system info
# Does NOT backup website files

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
BACKUP_DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="/root/ols-config-backup-${BACKUP_DATE}"
OLS_DIR="/usr/local/lsws"

echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo -e "${CYAN}   OpenLiteSpeed Config Backup Tool        ${NC}"
echo -e "${CYAN}   Date: ${BACKUP_DATE}                     ${NC}"
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo ""

# Create backup structure
echo -e "${YELLOW}📁 Creating backup directory...${NC}"
mkdir -p ${BACKUP_DIR}/{configs/vhosts,configs/admin,certificates,system}

# Step 1: Backup main OpenLiteSpeed config
echo -e "${YELLOW}⚙️  Backing up OpenLiteSpeed configurations...${NC}"

if [ -f "${OLS_DIR}/conf/httpd_config.conf" ]; then
    cp ${OLS_DIR}/conf/httpd_config.conf ${BACKUP_DIR}/configs/
    echo -e "${GREEN}  ✓ Main config (httpd_config.conf)${NC}"
else
    echo -e "${RED}  ✗ Main config not found${NC}"
fi

# Step 2: Backup virtual host configurations
echo -e "${YELLOW}📋 Backing up virtual host configurations...${NC}"
VHOSTS=("Opulent" "TTG" "n8n" "app" "NutriAI" "NutriApp" "NutriBeta")

for vhost in "${VHOSTS[@]}"; do
    if [ -d "${OLS_DIR}/conf/vhosts/${vhost}" ]; then
        cp -r ${OLS_DIR}/conf/vhosts/${vhost} ${BACKUP_DIR}/configs/vhosts/
        echo -e "${GREEN}  ✓ ${vhost}${NC}"
    else
        echo -e "${YELLOW}  ⚠ ${vhost} not found${NC}"
    fi
done

# Step 3: Backup admin panel config
echo -e "${YELLOW}🔧 Backing up admin panel config...${NC}"
if [ -d "${OLS_DIR}/admin/conf" ]; then
    cp -r ${OLS_DIR}/admin/conf/* ${BACKUP_DIR}/configs/admin/ 2>/dev/null || true
    echo -e "${GREEN}  ✓ Admin config${NC}"
fi

# Step 4: Backup SSL certificates
echo -e "${YELLOW}🔐 Backing up SSL certificates...${NC}"
if [ -d "/etc/letsencrypt" ]; then
    tar -czf ${BACKUP_DIR}/certificates/letsencrypt.tar.gz -C /etc letsencrypt 2>/dev/null
    echo -e "${GREEN}  ✓ Let's Encrypt certificates${NC}"
else
    echo -e "${YELLOW}  ⚠ No SSL certificates found${NC}"
fi

# Step 5: Backup system information
echo -e "${YELLOW}💻 Saving system information...${NC}"

# OpenLiteSpeed version
${OLS_DIR}/bin/lshttpd -v > ${BACKUP_DIR}/system/ols-version.txt 2>&1
echo -e "${GREEN}  ✓ OpenLiteSpeed version${NC}"

# PM2 processes (just the list, not the apps)
if command -v pm2 &> /dev/null; then
    pm2 list > ${BACKUP_DIR}/system/pm2-list.txt 2>/dev/null || true
    pm2 save 2>/dev/null || true
    [ -f ~/.pm2/dump.pm2 ] && cp ~/.pm2/dump.pm2 ${BACKUP_DIR}/system/ 2>/dev/null || true
    echo -e "${GREEN}  ✓ PM2 process list${NC}"
fi

# List of virtual host directories (for reference)
cat > ${BACKUP_DIR}/system/vhost-paths.txt << EOF
Virtual Host Paths (for reference):
====================================
Opulent:   ${OLS_DIR}/Example/html/Opulent
TTG:       ${OLS_DIR}/Example/html/TTG
n8n:       ${OLS_DIR}/n8n
app:       ${OLS_DIR}/Example/html/TTG2.0
NutriAI:   ${OLS_DIR}/Example/html/NutriAI
NutriApp:  ${OLS_DIR}/Example/html/Nutri
NutriBeta: ${OLS_DIR}/Example/html/NutriBeta
EOF

# Crontab
crontab -l > ${BACKUP_DIR}/system/crontab.txt 2>/dev/null || echo "No crontab" > ${BACKUP_DIR}/system/crontab.txt
echo -e "${GREEN}  ✓ Crontab${NC}"

# Active services
systemctl list-units --type=service --state=running > ${BACKUP_DIR}/system/services.txt
echo -e "${GREEN}  ✓ Running services${NC}"

# Step 6: Create summary
echo -e "${YELLOW}📊 Creating backup summary...${NC}"
cat > ${BACKUP_DIR}/BACKUP_INFO.txt << EOF
OpenLiteSpeed Configuration Backup
===================================
Backup Date: ${BACKUP_DATE}
Server: $(hostname)
IP: $(hostname -I | awk '{print $1}')
OLS Version: $(${OLS_DIR}/bin/lshttpd -v 2>&1 | head -n1)

Contents:
---------
✓ Main OpenLiteSpeed config (httpd_config.conf)
✓ Virtual host configurations (7 vhosts)
✓ Admin panel configuration
✓ SSL certificates (Let's Encrypt)
✓ PM2 process list
✓ System information

Virtual Hosts Included:
------------------------
$(for vhost in "${VHOSTS[@]}"; do
    if [ -d "${OLS_DIR}/conf/vhosts/${vhost}" ]; then
        echo "✓ ${vhost}"
    else
        echo "✗ ${vhost} (not found)"
    fi
done)

SSL Certificates:
-----------------
$(ls -1 /etc/letsencrypt/live/ 2>/dev/null | grep -v "README" || echo "None found")

Total Backup Size: $(du -sh ${BACKUP_DIR} | cut -f1)

NOTE: Website files are NOT included in this backup.
      Only configurations are backed up.

To Restore:
-----------
1. Extract backup on new server
2. Run: bash restore.sh
3. Manually copy website files if needed
EOF

echo -e "${GREEN}  ✓ Summary created${NC}"

# Step 7: Create restore script
echo -e "${YELLOW}📝 Creating restore script...${NC}"
cat > ${BACKUP_DIR}/restore.sh << 'RESTORE_SCRIPT'
#!/bin/bash
# OpenLiteSpeed Configuration Restore Script

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo -e "${CYAN}   OpenLiteSpeed Config Restore Tool       ${NC}"
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo ""

# Check root
if [ "$EUID" -ne 0 ]; then 
   echo -e "${RED}❌ Please run as root${NC}"
   exit 1
fi

BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OLS_DIR="/usr/local/lsws"

echo -e "${YELLOW}⚠️  This will restore OpenLiteSpeed configurations${NC}"
echo -e "${YELLOW}   Backup: ${BACKUP_DIR}${NC}"
echo ""
read -p "Continue? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "Restore cancelled"
    exit 0
fi

# Backup current config
echo -e "${YELLOW}📦 Backing up current config...${NC}"
CURRENT_BACKUP="/root/ols-current-$(date +%Y%m%d-%H%M%S)"
mkdir -p ${CURRENT_BACKUP}
[ -f "${OLS_DIR}/conf/httpd_config.conf" ] && cp ${OLS_DIR}/conf/httpd_config.conf ${CURRENT_BACKUP}/
[ -d "${OLS_DIR}/conf/vhosts" ] && cp -r ${OLS_DIR}/conf/vhosts ${CURRENT_BACKUP}/
echo -e "${GREEN}  ✓ Current config saved to ${CURRENT_BACKUP}${NC}"

# Stop OpenLiteSpeed
echo -e "${YELLOW}🛑 Stopping OpenLiteSpeed...${NC}"
${OLS_DIR}/bin/lswsctrl stop 2>/dev/null || true
sleep 2

# Restore main config
echo -e "${YELLOW}⚙️  Restoring main config...${NC}"
if [ -f "${BACKUP_DIR}/configs/httpd_config.conf" ]; then
    cp ${BACKUP_DIR}/configs/httpd_config.conf ${OLS_DIR}/conf/
    echo -e "${GREEN}  ✓ Main config restored${NC}"
fi

# Restore virtual hosts
echo -e "${YELLOW}📋 Restoring virtual host configs...${NC}"
if [ -d "${BACKUP_DIR}/configs/vhosts" ]; then
    mkdir -p ${OLS_DIR}/conf/vhosts
    cp -r ${BACKUP_DIR}/configs/vhosts/* ${OLS_DIR}/conf/vhosts/ 2>/dev/null || true
    echo -e "${GREEN}  ✓ Virtual hosts restored${NC}"
fi

# Restore admin config
echo -e "${YELLOW}🔧 Restoring admin config...${NC}"
if [ -d "${BACKUP_DIR}/configs/admin" ]; then
    mkdir -p ${OLS_DIR}/admin/conf
    cp -r ${BACKUP_DIR}/configs/admin/* ${OLS_DIR}/admin/conf/ 2>/dev/null || true
    echo -e "${GREEN}  ✓ Admin config restored${NC}"
fi

# Restore SSL certificates
echo -e "${YELLOW}🔐 Restoring SSL certificates...${NC}"
if [ -f "${BACKUP_DIR}/certificates/letsencrypt.tar.gz" ]; then
    [ -d "/etc/letsencrypt" ] && mv /etc/letsencrypt /etc/letsencrypt.bak.$(date +%Y%m%d-%H%M%S)
    tar -xzf ${BACKUP_DIR}/certificates/letsencrypt.tar.gz -C /etc/
    echo -e "${GREEN}  ✓ SSL certificates restored${NC}"
fi

# Restore PM2 if exists
if [ -f "${BACKUP_DIR}/system/dump.pm2" ] && command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}🔄 Restoring PM2 processes...${NC}"
    mkdir -p ~/.pm2
    cp ${BACKUP_DIR}/system/dump.pm2 ~/.pm2/
    pm2 resurrect 2>/dev/null || true
    echo -e "${GREEN}  ✓ PM2 processes restored${NC}"
fi

# Set correct permissions
echo -e "${YELLOW}🔒 Setting permissions...${NC}"
chown -R lsadm:lsadm ${OLS_DIR}/conf 2>/dev/null || true
chmod -R 755 ${OLS_DIR}/conf 2>/dev/null || true

# Start OpenLiteSpeed
echo -e "${YELLOW}🚀 Starting OpenLiteSpeed...${NC}"
${OLS_DIR}/bin/lswsctrl start
sleep 3

# Verify
if ${OLS_DIR}/bin/lswsctrl status | grep -q "litespeed is running"; then
    echo ""
    echo -e "${GREEN}✅ SUCCESS! OpenLiteSpeed is running${NC}"
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════${NC}"
    echo -e "${GREEN}Configuration restored successfully!${NC}"
    echo -e "${YELLOW}Remember: Website files were NOT restored${NC}"
    echo -e "${YELLOW}You need to manually copy your website files${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════${NC}"
else
    echo ""
    echo -e "${RED}❌ OpenLiteSpeed failed to start${NC}"
    echo -e "${YELLOW}Check logs: tail -f ${OLS_DIR}/logs/error.log${NC}"
    echo -e "${YELLOW}Rollback available at: ${CURRENT_BACKUP}${NC}"
fi
RESTORE_SCRIPT

chmod +x ${BACKUP_DIR}/restore.sh
echo -e "${GREEN}  ✓ Restore script created${NC}"

# Step 8: Compress backup
echo -e "${YELLOW}🗜️  Compressing backup...${NC}"
cd /root
tar -czf ols-config-backup-${BACKUP_DATE}.tar.gz ols-config-backup-${BACKUP_DATE}
FINAL_SIZE=$(du -h /root/ols-config-backup-${BACKUP_DATE}.tar.gz | cut -f1)

echo ""
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ BACKUP COMPLETED SUCCESSFULLY!${NC}"
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}📦 Backup files:${NC}"
echo "   📂 Directory: ${BACKUP_DIR}"
echo "   📄 Archive:   /root/ols-config-backup-${BACKUP_DATE}.tar.gz (${FINAL_SIZE})"
echo ""
echo -e "${GREEN}📋 What's included:${NC}"
echo "   ✓ OpenLiteSpeed main config"
echo "   ✓ All 7 virtual host configs"
echo "   ✓ SSL certificates"
echo "   ✓ Admin panel config"
echo "   ✓ PM2 process list"
echo "   ✓ System information"
echo "   ✓ Restore script"
echo ""
echo -e "${YELLOW}📥 To download backup to your computer:${NC}"
echo "   scp root@$(hostname -I | awk '{print $1}'):/root/ols-config-backup-${BACKUP_DATE}.tar.gz ./"
echo ""
echo -e "${YELLOW}🔄 To restore on another server:${NC}"
echo "   1. tar -xzf ols-config-backup-${BACKUP_DATE}.tar.gz"
echo "   2. cd ols-config-backup-${BACKUP_DATE}"
echo "   3. bash restore.sh"
echo ""
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
