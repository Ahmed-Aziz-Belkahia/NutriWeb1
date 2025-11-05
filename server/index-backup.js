import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { getApprovalEmailHTML } from './email-template-approval.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
let betaTesters = [];
let adminSettings = { notificationEmails: [] };

// Load existing data on startup
try {
  const data = await fs.readFile('./data/beta-testers.json', 'utf-8');
  betaTesters = JSON.parse(data);
  console.log(`Loaded ${betaTesters.length} beta testers from file`);
} catch (error) {
  console.log('No existing data file found, starting fresh');
}

// Load admin settings
try {
  const settingsData = await fs.readFile('./data/admin-settings.json', 'utf-8');
  adminSettings = JSON.parse(settingsData);
  console.log(`Loaded admin settings with ${adminSettings.notificationEmails?.length || 0} notification emails`);
} catch (error) {
  console.log('No admin settings found, using defaults');
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

// Save admin settings helper
async function saveAdminSettings() {
  try {
    await fs.mkdir('./data', { recursive: true });
    await fs.writeFile('./data/admin-settings.json', JSON.stringify(adminSettings, null, 2));
  } catch (error) {
    console.error('Error saving admin settings:', error);
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

// Email transporter helper
function getEmailTransporter() {
  if (!process.env.SMTP_HOST) {
    return null;
  }
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Email: Application Received
async function sendApplicationReceivedEmail(email, platform) {
  const transporter = getEmailTransporter();
  if (!transporter) {
    console.log('Email service not configured, skipping email');
    return;
  }

  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #33A9FF 0%, #0088E6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px; }
          .timeline { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; }
          .timeline-step { display: flex; align-items: center; margin: 15px 0; }
          .step-icon { width: 40px; height: 40px; border-radius: 50%; background: #E3F4FF; color: #33A9FF; font-weight: bold; margin-right: 15px; flex-shrink: 0; text-align: center; line-height: 40px; font-size: 16px; }
          .step-icon.active { background: #33A9FF; color: white; }
          .highlight { background: #E3F4FF; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #33A9FF; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📥 Application Received!</h1>
            <p>We're reviewing your beta application</p>
          </div>
          
          <div class="content">
            <h2>Thank you for your interest in NutriAI Beta!</h2>
            <p>We've successfully received your application to join our ${platform === 'android' ? 'Android' : platform === 'ios' ? 'iOS' : 'Android & iOS'} beta testing program.</p>
            
            <div class="timeline">
              <h3>📍 Where you are in the process:</h3>
              <div class="timeline-step">
                <div class="step-icon active">✓</div>
                <div>
                  <strong>Application Submitted</strong><br>
                  <span style="color: #666; font-size: 14px;">You're here!</span>
                </div>
              </div>
              <div class="timeline-step">
                <div class="step-icon">2</div>
                <div>
                  <strong>Under Review</strong><br>
                  <span style="color: #666; font-size: 14px;">Our team will review your application</span>
                </div>
              </div>
              <div class="timeline-step">
                <div class="step-icon">3</div>
                <div>
                  <strong>Decision Email</strong><br>
                  <span style="color: #666; font-size: 14px;">You'll receive approval status within 24-48 hours</span>
                </div>
              </div>
            </div>
            
            <div class="highlight">
              <h3>⏱️ What's Next?</h3>
              <p style="margin: 10px 0;">Our team reviews applications carefully to ensure the best beta testing experience. You'll receive an email with our decision within <strong>24-48 hours</strong>.</p>
              <p style="margin: 10px 0;">If approved, you'll get instant access to download NutriAI and start testing!</p>
            </div>
            
            <p style="margin-top: 30px;">
              <strong>Questions?</strong> Reply to this email or contact us at support@nutriai.pl
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
      subject: '📥 NutriAI Beta Application Received',
      html: htmlContent,
    });

    console.log(`Application received email sent to ${email}`);
  } catch (error) {
    console.error('Error sending application received email:', error);
  }
}

// Email: Application Approved
async function sendApprovedEmail(email, platform) {
  const transporter = getEmailTransporter();
  if (!transporter) {
    console.log('Email service not configured, skipping email');
    return;
  }

  try {
    const androidLink = 'https://play.google.com/store/apps/details?id=com.nutritheapp.nutriai';
    const iosLink = 'https://apps.apple.com/pl/app/nutri-ai/id6747520795';

    const htmlContent = getApprovalEmailHTML(androidLink, iosLink);
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px; }
          .button { display: inline-block; padding: 15px 40px; background: #10B981; color: white; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 10px 5px; font-size: 16px; }
          .button:hover { background: #059669; }
          .button-ios { background: #007AFF; }
          .button-ios:hover { background: #0051D5; }
          .steps { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; }
          .step { margin: 15px 0; padding-left: 30px; position: relative; }
          .step-number { position: absolute; left: 0; top: 0; background: #10B981; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-weight: bold; font-size: 12px; }
          .highlight { background: #D1FAE5; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10B981; }
          .download-section { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 You're Approved!</h1>
            <p>Welcome to NutriAI Beta Program</p>
          </div>
          
          <div class="content">
            <h2>Congratulations! Your application has been approved.</h2>
            <p>We're thrilled to have you as an early tester for NutriAI. Your feedback will directly shape the future of our AI-powered nutrition platform.</p>
            
            <div class="highlight">
              <h3>✨ You're now part of an exclusive group!</h3>
              <p>As a beta tester, you get:</p>
              <ul style="margin: 10px 0;">
                <li>Full access to all premium features</li>
                <li>Direct support from our team</li>
                <li>Priority for future updates</li>
                <li>Exclusive lifetime perks</li>
              </ul>
            </div>
            
            <div class="download-section">
              <h3>� Download NutriAI Now!</h3>
              <p>Choose your platform and start testing:</p>
              <div style="margin: 20px 0;">
                <a href="${androidLink}" class="button">🤖 Get on Android</a>
                <a href="${iosLink}" class="button button-ios">🍎 Get on iOS</a>
              </div>
              <p style="font-size: 14px; color: #666; margin-top: 20px;">
                <strong>Android Link:</strong> ${androidLink}<br>
                <strong>iOS Link:</strong> ${iosLink}
              </p>
            </div>
            
            <div class="steps">
              <h3>📱 Quick Start Guide:</h3>
              <div class="step">
                <div class="step-number">1</div>
                <strong>Download the app</strong><br>
                Click the button above for your platform
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <strong>Install & Open</strong><br>
                Launch NutriAI on your device
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <strong>Create Account</strong><br>
                Set up your profile and preferences
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <strong>Start Exploring!</strong><br>
                Test all features and share your feedback
              </div>
            </div>
            
            <div style="background: #E3F4FF; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <h3>💬 We Want Your Feedback!</h3>
              <p>Found a bug? Have a feature idea? We'd love to hear from you!</p>
              <p style="margin: 10px 0;">Reply to this email anytime or reach out at <strong>support@nutriai.pl</strong></p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Thank you for being part of NutriAI's journey!<br><br>
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
      subject: '✅ You\'re Approved! Welcome to NutriAI Beta',
      html: htmlContent,
    });

    console.log(`Approval email sent to ${email}`);
  } catch (error) {
    console.error('Error sending approval email:', error);
  }
}

// Email: Application Rejected
async function sendRejectedEmail(email, reason = '') {
  const transporter = getEmailTransporter();
  if (!transporter) {
    console.log('Email service not configured, skipping email');
    return;
  }

  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px; }
          .highlight { background: #FEF3C7; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #F59E0B; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 Beta Application Update</h1>
            <p>Thank you for your interest in NutriAI</p>
          </div>
          
          <div class="content">
            <h2>Thank you for applying to NutriAI Beta</h2>
            <p>We appreciate your interest in becoming a beta tester for NutriAI.</p>
            
            <p>Unfortunately, we're unable to accept your application at this time.</p>
            ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : '<p>Our beta program has limited capacity and we are prioritizing testers who meet specific criteria for this phase.</p>'}
            
            <div class="highlight">
              <h3>🚀 Stay Connected</h3>
              <p>While you won't be part of the current beta, you'll be among the first to know when NutriAI launches publicly!</p>
              <p style="margin: 10px 0;">We'll keep you updated on our progress and notify you as soon as the app is available to everyone.</p>
            </div>
            
            <p style="margin-top: 30px;">
              <strong>Questions?</strong> Feel free to reply to this email or contact us at support@nutriai.pl
            </p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Thank you for your understanding,<br>
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
      subject: 'NutriAI Beta Application Update',
      html: htmlContent,
    });

    console.log(`Rejection email sent to ${email}`);
  } catch (error) {
    console.error('Error sending rejection email:', error);
  }
}

// Email: Admin Notification
async function sendAdminNotification(email, platform) {
  const transporter = getEmailTransporter();
  if (!transporter) return;

  // Get list of admin emails to notify
  const adminEmails = adminSettings.notificationEmails || [];
  if (adminEmails.length === 0) {
    console.log('No admin emails configured for notifications');
    return;
  }

  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #F97316 0%, #EA580C 100%); color: white; padding: 20px; text-align: center; border-radius: 10px; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 10px; margin-top: 15px; }
          .info-row { background: white; padding: 12px; margin: 8px 0; border-radius: 6px; display: flex; align-items: center; }
          .info-label { font-weight: bold; margin-right: 10px; min-width: 80px; }
          .button { display: inline-block; padding: 12px 24px; background: #F97316; color: white; text-decoration: none; border-radius: 20px; font-weight: bold; margin: 10px 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🔔 New Beta Application</h2>
          </div>
          <div class="content">
            <p><strong>A new user has applied for the beta program!</strong></p>
            <div class="info-row">
              <span class="info-label">📧 Email:</span>
              <span>${email}</span>
            </div>
            <div class="info-row">
              <span class="info-label">📱 Platform:</span>
              <span>${platform}</span>
            </div>
            <div class="info-row">
              <span class="info-label">⏰ Time:</span>
              <span>${new Date().toLocaleString()}</span>
            </div>
            <center style="margin-top: 20px;">
              <a href="https://nutriai.online/betaadmin" class="button">Review in Admin Panel →</a>
            </center>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send to all configured admin emails
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: adminEmails.join(', '),
      subject: `🔔 New Beta Application: ${email}`,
      html: htmlContent,
    });

    console.log(`Admin notification sent for ${email}`);
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', testers: betaTesters.length });
});

// Get admin settings
app.get('/api/admin-settings', (req, res) => {
  res.json(adminSettings);
});

// Update admin notification emails
app.put('/api/admin-settings/notification-emails', async (req, res) => {
  try {
    const { emails } = req.body;

    if (!Array.isArray(emails)) {
      return res.status(400).json({ error: 'Emails must be an array' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emails.filter(email => !emailRegex.test(email));
    
    if (invalidEmails.length > 0) {
      return res.status(400).json({ 
        error: 'Invalid email format', 
        invalidEmails 
      });
    }

    adminSettings.notificationEmails = emails;
    await saveAdminSettings();

    res.json({ 
      success: true, 
      notificationEmails: adminSettings.notificationEmails 
    });
  } catch (error) {
    console.error('Error updating admin settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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

    // Create new tester with pending status
    const newTester = {
      id: Date.now(),
      email,
      platform,
      status: 'pending',
      inviteEmailSent: false,
      reviewedAt: null,
      reviewedBy: null,
      rejectionReason: null,
      createdAt: new Date().toISOString(),
    };

    betaTesters.push(newTester);
    await saveData();

    // Send "application received" email (NOT invite email)
    sendApplicationReceivedEmail(email, platform).catch(console.error);
    
    // Send admin notification
    sendAdminNotification(email, platform).catch(console.error);

    res.status(201).json({
      success: true,
      tester: newTester,
      message: 'Application submitted successfully. You will receive an email once reviewed.',
    });

  } catch (error) {
    console.error('Error adding beta tester:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Approve beta tester
app.patch('/api/beta-testers/:id/approve', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tester = betaTesters.find(t => t.id === id);

    if (!tester) {
      return res.status(404).json({ error: 'Tester not found' });
    }

    if (tester.status === 'approved') {
      return res.status(400).json({ error: 'Tester already approved' });
    }

    // Update tester status
    tester.status = 'approved';
    tester.reviewedAt = new Date().toISOString();
    tester.reviewedBy = 'admin';
    
    await saveData();

    // Send approval email with Play Store link
    if (!tester.inviteEmailSent) {
      await sendApprovedEmail(tester.email, tester.platform);
      tester.inviteEmailSent = true;
      await saveData();
    }

    res.json({
      success: true,
      tester,
      message: 'Tester approved and invitation email sent',
    });

  } catch (error) {
    console.error('Error approving tester:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reject beta tester
app.patch('/api/beta-testers/:id/reject', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { reason } = req.body;
    const tester = betaTesters.find(t => t.id === id);

    if (!tester) {
      return res.status(404).json({ error: 'Tester not found' });
    }

    if (tester.status === 'rejected') {
      return res.status(400).json({ error: 'Tester already rejected' });
    }

    // Update tester status
    tester.status = 'rejected';
    tester.reviewedAt = new Date().toISOString();
    tester.reviewedBy = 'admin';
    tester.rejectionReason = reason || null;
    
    await saveData();

    // Send rejection email
    await sendRejectedEmail(tester.email, reason);

    res.json({
      success: true,
      tester,
      message: 'Tester rejected and notification email sent',
    });

  } catch (error) {
    console.error('Error rejecting tester:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Bulk approve beta testers
app.post('/api/beta-testers/bulk-approve', async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required' });
    }

    const results = {
      approved: [],
      failed: [],
    };

    for (const id of ids) {
      const tester = betaTesters.find(t => t.id === parseInt(id));
      
      if (!tester || tester.status !== 'pending') {
        results.failed.push({ id, reason: 'Not found or already processed' });
        continue;
      }

      try {
        tester.status = 'approved';
        tester.reviewedAt = new Date().toISOString();
        tester.reviewedBy = 'admin';
        
        if (!tester.inviteEmailSent) {
          await sendApprovedEmail(tester.email, tester.platform);
          tester.inviteEmailSent = true;
        }
        
        results.approved.push(tester);
      } catch (error) {
        results.failed.push({ id, reason: error.message });
      }
    }

    await saveData();

    res.json({
      success: true,
      results,
      message: `Approved ${results.approved.length} testers, ${results.failed.length} failed`,
    });

  } catch (error) {
    console.error('Error bulk approving testers:', error);
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
