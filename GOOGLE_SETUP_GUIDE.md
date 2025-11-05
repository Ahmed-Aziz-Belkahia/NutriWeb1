# Google Play Console Beta Testing Setup Guide

This guide walks you through setting up automated beta tester management using Google Groups and Google Play Console.

## 📋 Overview

The system automatically adds beta testers to Google Groups, which are linked to your Google Play Console closed testing tracks. This means:

1. User signs up on your website
2. Backend adds them to Google Group
3. They automatically get access to your app's beta in Play Store

---

## 🚀 Step 1: Create Google Groups

### 1.1 Create Groups for Beta Testing

Visit [Google Groups](https://groups.google.com/) and create two groups:

**Android Beta Group:**
- Name: `NutriAI Android Beta Testers`
- Email: `nutriai-android-beta@yourdomain.com`
- Access: Public or Private
- Post permissions: Only managers can post

**iOS Beta Group (optional):**
- Name: `NutriAI iOS Beta Testers`
- Email: `nutriai-ios-beta@yourdomain.com`
- Access: Public or Private
- Post permissions: Only managers can post

### 1.2 Group Settings

For each group:
1. Go to Group Settings → Members
2. Set "Who can join" to "Anyone can ask"
3. Set "Allow members outside your organization" to Yes
4. Save changes

---

## 🔐 Step 2: Set up Google Cloud Service Account

### 2.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it: `NutriAI Beta Management`
4. Click "Create"

### 2.2 Enable Required APIs

1. In your project, go to **APIs & Services** → **Library**
2. Search and enable these APIs:
   - **Admin SDK API**
   - **Google Play Android Developer API** (for future use)

### 2.3 Create Service Account

1. Go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Fill in:
   - **Name:** `nutriai-beta-manager`
   - **Description:** `Service account for managing beta testers`
4. Click **Create and Continue**
5. Skip role assignment for now (click **Continue**)
6. Click **Done**

### 2.4 Generate Service Account Key

1. Click on the newly created service account
2. Go to **Keys** tab
3. Click **Add Key** → **Create New Key**
4. Choose **JSON** format
5. Click **Create**
6. Save the downloaded JSON file securely (you'll need it later)

### 2.5 Enable Domain-Wide Delegation

1. Still in the service account details, find **    **
2. Click **Show Domain-Wide Delegation**
3. Enable it and note the **Client ID**

---

## 🔧 Step 3: Configure Google Workspace

### 3.1 Delegate Authority (Google Workspace Admin Required)

⚠️ **Important:** You need Google Workspace admin access for this step.

1. Go to [Google Workspace Admin Console](https://admin.google.com/)
2. Navigate to **Security** → **API Controls** → **Domain-wide Delegation**
3. Click **Add new**
4. Enter:
   - **Client ID:** (from your service account)
   - **OAuth Scopes:**
     ```
     https://www.googleapis.com/auth/admin.directory.group
     https://www.googleapis.com/auth/admin.directory.group.member
     ```
5. Click **Authorize**

### 3.2 Grant Group Management Permissions

1. Go to [Google Groups](https://groups.google.com/)
2. For each beta group you created:
   - Click on the group
   - Click **Manage** → **Members**
   - Add your service account email as **Manager**
   - Service account email format: `nutriai-beta-manager@PROJECT_ID.iam.gserviceaccount.com`

---

## 📱 Step 4: Configure Google Play Console

### 4.1 Create Closed Testing Track

1. Go to [Google Play Console](https://play.google.com/console/)
2. Select your app (or create one if you haven't)
3. Go to **Testing** → **Closed testing**
4. Click **Create new release** or **Manage track**

### 4.2 Add Email List

1. In the closed testing settings
2. Go to **Testers** tab
3. Click **Create email list**
4. Choose **Google Group**
5. Enter your group email: `nutriai-android-beta@yourdomain.com`
6. Click **Save changes**

### 4.3 Get Beta Link

1. After saving, you'll see a **Opt-in URL**
2. Copy this URL (format: `https://play.google.com/apps/testing/YOUR_PACKAGE_NAME`)
3. You'll use this in your email templates

---

## 🍎 Step 5: Configure TestFlight (iOS)

### 5.1 Create TestFlight Beta

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Select your app
3. Go to **TestFlight** tab
4. Click **External Testing**

### 5.2 Create Public Link (Optional)

1. In External Testing, click **Public Link**
2. Enable public link testing
3. Copy the link (format: `https://testflight.apple.com/join/YOUR_CODE`)

**Note:** TestFlight doesn't support Google Groups automation. You'll need to:
- Manually invite testers via App Store Connect, OR
- Use the public link in your welcome emails

---

## ⚙️ Step 6: Configure Server Environment

### 6.1 Copy Service Account Credentials

1. Open the JSON key file you downloaded
2. Extract these values:
   - `client_email`
   - `private_key`

### 6.2 Create .env File

In the `server/` directory, create `.env`:

```bash
# Server Configuration
PORT=3001

# Google Service Account
GOOGLE_CLIENT_EMAIL=nutriai-beta-manager@PROJECT_ID.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"

# Google Groups
GOOGLE_GROUP_ANDROID=nutriai-android-beta@yourdomain.com
GOOGLE_GROUP_IOS=nutriai-ios-beta@yourdomain.com
GOOGLE_ADMIN_EMAIL=admin@yourdomain.com

# Play Console & TestFlight Links
ANDROID_BETA_LINK=https://play.google.com/apps/testing/YOUR_PACKAGE_NAME
IOS_BETA_LINK=https://testflight.apple.com/join/YOUR_CODE

# Email Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=NutriAI Beta <beta@nutriai.app>
```

### 6.3 Important Notes

- **Private Key:** Keep the `\n` characters in the private key
- **Admin Email:** Use the Google Workspace admin email that delegated authority
- **SMTP Password:** For Gmail, create an [App Password](https://support.google.com/accounts/answer/185833)

---

## 🧪 Step 7: Test the System

### 7.1 Install Dependencies

```powershell
cd server
npm install
```

### 7.2 Start the Server

```powershell
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:3001
📊 API endpoints available at http://localhost:3001/api
```

### 7.3 Test Beta Signup

1. Start the frontend: `npm run dev` (in project root)
2. Visit: `http://localhost:5173/beta`
3. Enter a test email and select platform
4. Click "Join Beta Program"

### 7.4 Verify in Admin Panel

1. Visit: `http://localhost:5173/beta-admin`
2. Password: `nutriai2025`
3. Check if:
   - Tester appears in the table
   - Google Group status shows "added"
   - Status is "invited"

### 7.5 Verify in Google Groups

1. Go to [Google Groups](https://groups.google.com/)
2. Check your beta group
3. Verify the test email was added as a member

---

## 🔒 Security Checklist

Before going to production:

- [ ] Change admin panel password in `BetaAdmin.tsx`
- [ ] Use environment variables (never commit `.env`)
- [ ] Enable HTTPS for your API
- [ ] Add rate limiting to prevent spam
- [ ] Implement CAPTCHA on signup form
- [ ] Set up proper CORS rules
- [ ] Use a real database instead of JSON file
- [ ] Enable API authentication
- [ ] Set up monitoring and logging
- [ ] Backup your service account keys securely

---

## 🐛 Troubleshooting

### Error: "Invalid grant: Not a valid email"
**Solution:** Make sure domain-wide delegation is configured correctly and you're using the admin email in `GOOGLE_ADMIN_EMAIL`.

### Error: "Insufficient permissions"
**Solution:** Check that the OAuth scopes are correct in domain-wide delegation settings.

### Group member not added
**Solution:** 
1. Verify the service account is a manager of the group
2. Check the group email is correct in `.env`
3. Look at server logs for detailed error messages

### Welcome email not sent
**Solution:**
1. For Gmail: Use an App Password, not your regular password
2. Enable "Less secure app access" (if using regular password)
3. Check SMTP settings are correct

### Server can't connect to Google APIs
**Solution:**
1. Verify APIs are enabled in Google Cloud Console
2. Check service account credentials are correct
3. Ensure private key format is preserved (with `\n` characters)

---

## 📚 Additional Resources

- [Google Admin SDK Documentation](https://developers.google.com/admin-sdk)
- [Google Groups API](https://developers.google.com/admin-sdk/directory/v1/guides/manage-group-members)
- [Play Console Testing Guide](https://support.google.com/googleplay/android-developer/answer/9845334)
- [TestFlight Documentation](https://developer.apple.com/testflight/)
- [Domain-Wide Delegation Guide](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority)

---

## 🎯 Next Steps

Once everything is working:

1. **Deploy the server** to a hosting platform (Heroku, Railway, DigitalOcean, etc.)
2. **Update frontend** to use production API URL
3. **Set up monitoring** (Sentry, LogRocket, etc.)
4. **Add analytics** to track conversion rates
5. **Scale as needed** with a proper database (PostgreSQL, MongoDB, etc.)

---

## 💡 Pro Tips

- Test with multiple email addresses before launch
- Create a separate "testing" Google Group for development
- Monitor your Google Group quotas
- Keep the service account JSON key very secure
- Consider implementing webhook notifications for failed additions
- Export tester data regularly as backup
