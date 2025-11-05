import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
let betaTesters = [];

// Load existing data on startup
try {
  const data = await fs.readFile('./data/beta-testers.json', 'utf-8');
  betaTesters = JSON.parse(data);
  console.log(`Loaded ${betaTesters.length} beta testers from file`);
} catch (error) {
  console.log('No existing data file found, starting fresh');
}

// Save data helper
async function saveData() {
  try {
    await fs.mkdir('./data', { recursive: true });
    await fs.writeFile('./data/beta-testers.json', JSON.stringify(betaTesters, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Initialize Google Admin SDK
function getGoogleAuthClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/admin.directory.group',
      'https://www.googleapis.com/auth/admin.directory.group.member'
    ],
    // Important: You need to delegate domain-wide authority
    subject: process.env.GOOGLE_ADMIN_EMAIL,
  });

  return auth;
}

// Add user to Google Group
async function addToGoogleGroup(email, groupEmail) {
  try {
    const auth = getGoogleAuthClient();
    const admin = google.admin({ version: 'directory_v1', auth });

    await admin.members.insert({
      groupKey: groupEmail,
      requestBody: {
        email: email,
        role: 'MEMBER',
      }
    });

    console.log(`Added ${email} to ${groupEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`Error adding to Google Group:`, error.message);
    return { success: false, error: error.message };
  }
}

// Email service (optional)
async function sendWelcomeEmail(email, platform) {
  if (!process.env.SMTP_HOST) {
    console.log('Email service not configured, skipping email');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const androidLink = process.env.ANDROID_BETA_LINK;
    const iosLink = process.env.IOS_BETA_LINK;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #33A9FF 0%, #0088E6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px; }
          .button { display: inline-block; padding: 12px 30px; background: #33A9FF; color: white; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 10px 5px; }
          .steps { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; }
          .step { margin: 15px 0; padding-left: 30px; position: relative; }
          .step-number { position: absolute; left: 0; top: 0; background: #33A9FF; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-weight: bold; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to NutriAI Beta!</h1>
            <p>You're in! Let's get you started.</p>
          </div>
          
          <div class="content">
            <h2>Thank you for joining our beta program!</h2>
            <p>We're excited to have you as an early tester. Your feedback will help shape the future of NutriAI.</p>
            
            ${platform === 'android' || platform === 'both' ? `
            <div class="steps">
              <h3>📱 For Android Users:</h3>
              <div class="step">
                <div class="step-number">1</div>
                <strong>Join the testing program</strong><br>
                Click the button below to accept the beta invitation
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <strong>Download from Play Store</strong><br>
                Once accepted, download NutriAI from the Google Play Store
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <strong>Start testing!</strong><br>
                Open the app and explore all the features
              </div>
              <center>
                <a href="${androidLink}" class="button">Join Android Beta →</a>
              </center>
            </div>
            ` : ''}
            
            ${platform === 'ios' || platform === 'both' ? `
            <div class="steps">
              <h3>🍎 For iOS Users:</h3>
              <div class="step">
                <div class="step-number">1</div>
                <strong>Install TestFlight</strong><br>
                Download TestFlight from the App Store if you haven't already
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <strong>Accept the invitation</strong><br>
                Click the link below to join the beta program
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <strong>Start testing!</strong><br>
                Open NutriAI in TestFlight and begin your journey
              </div>
              <center>
                <a href="${iosLink}" class="button">Join iOS Beta →</a>
              </center>
            </div>
            ` : ''}
            
            <div style="background: #E3F4FF; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <h3>💡 What to Expect</h3>
              <ul>
                <li>Early access to new features</li>
                <li>Direct support from our team</li>
                <li>Your feedback shapes the product</li>
                <li>Exclusive lifetime perks as a beta tester</li>
              </ul>
            </div>
            
            <p style="margin-top: 30px;">
              <strong>Need help?</strong> Reply to this email or reach out at beta@nutriai.app
            </p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Best regards,<br>
              The NutriAI Team
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: '🎉 Welcome to NutriAI Beta Program!',
      html: htmlContent,
    });

    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', testers: betaTesters.length });
});

// Get all beta testers
app.get('/api/beta-testers', (req, res) => {
  res.json(betaTesters);
});

// Add new beta tester
app.post('/api/beta-testers', async (req, res) => {
  try {
    const { email, platform } = req.body;

    if (!email || !platform) {
      return res.status(400).json({ error: 'Email and platform are required' });
    }

    // Check if email already exists
    const existing = betaTesters.find(t => t.email === email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Create new tester
    const newTester = {
      id: Date.now(),
      email,
      platform,
      status: 'pending',
      googleGroupStatus: {},
      createdAt: new Date().toISOString(),
    };

    betaTesters.push(newTester);
    await saveData();

    // Add to Google Groups based on platform
    const groupResults = {};
    
    if (platform === 'android' || platform === 'both') {
      const result = await addToGoogleGroup(email, process.env.GOOGLE_GROUP_ANDROID);
      groupResults.android = result;
      newTester.googleGroupStatus.android = result.success ? 'added' : 'failed';
    }
    
    if (platform === 'ios' || platform === 'both') {
      const result = await addToGoogleGroup(email, process.env.GOOGLE_GROUP_IOS);
      groupResults.ios = result;
      newTester.googleGroupStatus.ios = result.success ? 'added' : 'failed';
    }

    // Update status based on Google Group results
    const allSuccess = Object.values(groupResults).every(r => r.success);
    if (allSuccess) {
      newTester.status = 'invited';
    }

    await saveData();

    // Send welcome email (async, don't wait)
    sendWelcomeEmail(email, platform).catch(console.error);

    res.status(201).json({
      success: true,
      tester: newTester,
      googleGroupResults: groupResults,
    });

  } catch (error) {
    console.error('Error adding beta tester:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete beta tester
app.delete('/api/beta-testers/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = betaTesters.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Tester not found' });
    }

    betaTesters.splice(index, 1);
    await saveData();

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting tester:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clear all data
app.delete('/api/beta-testers', async (req, res) => {
  try {
    betaTesters = [];
    await saveData();
    res.json({ success: true });
  } catch (error) {
    console.error('Error clearing data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`💾 Data file: ./data/beta-testers.json`);
  console.log(`\n⚙️  Configuration:`);
  console.log(`   - Android Group: ${process.env.GOOGLE_GROUP_ANDROID || 'Not configured'}`);
  console.log(`   - iOS Group: ${process.env.GOOGLE_GROUP_IOS || 'Not configured'}`);
  console.log(`   - Email Service: ${process.env.SMTP_HOST ? 'Enabled' : 'Disabled'}`);
});
