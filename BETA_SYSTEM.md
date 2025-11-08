# Beta Testing System - Local Storage

## Overview
Simple local storage-based beta testing signup system. Data is stored in browser's localStorage.

## How It Works

### User Flow
1. User visits `/beta` page
2. Selects platform (Android, iOS, or Both)
3. Enters email address
4. Data is saved to localStorage
5. Success message is displayed

### Data Structure
```json
{
  "id": 1234567890,
  "email": "user@example.com",
  "platform": "both",
  "status": "pending",
  "createdAt": "2025-10-29T12:00:00.000Z"
}
```

### Admin Panel
Access at `/beta-admin`
- **Password**: `nutriai2025` (change in `beta-admin.tsx`)
- View all signups
- Export to CSV or JSON
- Delete individual entries
- Clear all data

### Features
- ✅ Duplicate email detection
- ✅ Platform selection (Android/iOS/Both)
- ✅ Export to CSV
- ✅ Export to JSON
- ✅ Statistics dashboard
- ✅ Delete functionality
- ✅ Simple password protection

## Exporting Data

### CSV Export
Click "Export CSV" to download a spreadsheet-compatible file with all beta tester data.

### JSON Export
Click "Export JSON" to download raw data that can be imported into other systems.

## Migration to Real Database

When ready to scale, replace localStorage with:

1. **Supabase** - PostgreSQL with real-time features
2. **Firebase** - NoSQL with built-in auth
3. **MongoDB Atlas** - Document database
4. **Custom backend** - Node.js + Express + your DB

The data structure is already designed to be database-friendly.

## Security Notes

⚠️ **Important**: This is a development/prototype solution:
- Data is stored in user's browser
- Admin password is hardcoded
- No real authentication
- For production, use proper backend + database

## Accessing Stored Data Manually

Open browser console and run:
```javascript
// View all testers
JSON.parse(localStorage.getItem('nutriai_beta_testers'))

// Clear data
localStorage.removeItem('nutriai_beta_testers')
```
