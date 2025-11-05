import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let betaTesters = [];

// Load existing data on startup
try {
  const data = await fs.readFile('./data/beta-testers.json', 'utf-8');
  betaTesters = JSON.parse(data);
  console.log(`✅ Loaded ${betaTesters.length} beta testers from file`);
} catch (error) {
  console.log('📝 No existing data file found, starting fresh');
}

// Save data helper
async function saveData() {
  try {
    await fs.mkdir('./data', { recursive: true });
    await fs.writeFile('./data/beta-testers.json', JSON.stringify(betaTesters, null, 2));
    console.log('💾 Data saved successfully');
  } catch (error) {
    console.error('❌ Error saving data:', error);
  }
}

// Send welcome email to user
async function sendWelcomeEmail(email, platform) {
  if (!process.env.SMTP_HOST) {
    console.log('⚠️  Email service not configured, skipping welcome email');
    return { success: false, reason: 'not_configured' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const androidLink = process.env.ANDROID_BETA_LINK || 'https://play.google.com/store/apps/details?id=com.nutritheapp.nutriai';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #33A9FF 0%, #0088E6 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px; }
          .content { background: #f9f9f9; padding: 30px 20px; border-radius: 10px; margin-top: 20px; }
          .button { display: inline-block; padding: 15px 40px; background: #33A9FF; color: white !important; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 15px 5px; }
          .info-box { background: #E3F4FF; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #33A9FF; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Welcome to NutriAI Beta!</h1>
          <p style="font-size: 18px;">You're in! Let's get started.</p>
        </div>
        
        <div class="content">
          <h2>Thank you for joining our beta program!</h2>
          <p>We're excited to have you as an early tester. Your feedback will help shape the future of NutriAI.</p>
          
          <div class="info-box">
            <h3>📱 Next Steps:</h3>
            ${platform === 'android' || platform === 'both' ? `
              <p><strong>Android Users:</strong></p>
              <ol>
                <li>Click the button below to join the beta program</li>
                <li>Accept the invitation in Google Play Console</li>
                <li>Download NutriAI from the Play Store</li>
              </ol>
              <center><a href="${androidLink}" class="button">Join Android Beta →</a></center>
            ` : ''}
            
            ${platform === 'ios' || platform === 'both' ? `
              <p><strong>iOS Users:</strong></p>
              <ol>
                <li>Install TestFlight from the App Store (if you haven't already)</li>
                <li>Click the button below to join the beta</li>
                <li>Open NutriAI in TestFlight</li>
              </ol>
              <center><a href="${iosLink}" class="button">Join iOS Beta →</a></center>
            ` : ''}
          </div>
          
          <div class="info-box">
            <h3>💡 What to Expect</h3>
            <ul>
              <li>✨ Early access to new features</li>
              <li>🎯 Direct support from our team</li>
              <li>💬 Your feedback shapes the product</li>
              <li>🎁 Exclusive perks as a beta tester</li>
            </ul>
          </div>
          
          <p style="margin-top: 30px;">
            <strong>Need help?</strong> Reply to this email and we'll get back to you quickly!
          </p>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
            Best regards,<br>
            <strong>The NutriAI Team</strong><br>
            🌐 <a href="https://nutriai.online">nutriai.online</a>
          </p>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'NutriAI <noreply@nutriai.online>',
      to: email,
      subject: '🎉 Welcome to NutriAI Beta Program!',
      html: htmlContent,
    });

    console.log(`✅ Welcome email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    return { success: false, error: error.message };
  }
}

// Send notification to admin
async function sendAdminNotification(email, platform) {
  if (!process.env.SMTP_HOST || !process.env.ADMIN_EMAIL) {
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

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'NutriAI <noreply@nutriai.online>',
      to: process.env.ADMIN_EMAIL,
      subject: `🔔 New Beta Signup: ${email}`,
      html: `
        <h2>New Beta Tester Signed Up!</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Platform:</strong> ${platform}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p>Total beta testers: ${betaTesters.length}</p>
        <p><a href="https://nutriai.online/beta-admin">View Admin Panel →</a></p>
      `,
    });

    console.log(`✅ Admin notification sent for ${email}`);
  } catch (error) {
    console.error('❌ Error sending admin notification:', error.message);
  }
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    testers: betaTesters.length,
    emailConfigured: !!process.env.SMTP_HOST 
  });
});

// Get all beta testers
app.get('/api/beta-testers', (req, res) => {
  res.json(betaTesters);
});

// Add new beta tester
app.post('/api/beta-testers', async (req, res) => {
  try {
    const { email, platform } = req.body;

    // Validation
    if (!email || !platform) {
      return res.status(400).json({ error: 'Email and platform are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if email already exists
    const existing = betaTesters.find(t => t.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ 
        error: 'Email already registered',
        message: 'This email is already signed up for beta testing!' 
      });
    }

    // Create new tester
    const newTester = {
      id: Date.now(),
      email: email.toLowerCase(),
      platform,
      status: 'invited', // Status: invited, waiting, testing
      emailSent: false,
      createdAt: new Date().toISOString(),
    };

    betaTesters.push(newTester);
    await saveData();

    // Send emails asynchronously (don't wait)
    sendWelcomeEmail(email, platform)
      .then(result => {
        if (result.success) {
          newTester.emailSent = true;
          saveData();
        }
      })
      .catch(console.error);

    sendAdminNotification(email, platform).catch(console.error);

    console.log(`✅ New beta tester added: ${email} (${platform})`);

    res.status(201).json({
      success: true,
      tester: newTester,
      message: 'Successfully joined the beta program! Check your email for next steps.',
    });

  } catch (error) {
    console.error('❌ Error adding beta tester:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update tester status
app.patch('/api/beta-testers/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    const tester = betaTesters.find(t => t.id === id);
    if (!tester) {
      return res.status(404).json({ error: 'Tester not found' });
    }

    tester.status = status;
    tester.updatedAt = new Date().toISOString();
    await saveData();

    res.json({ success: true, tester });
  } catch (error) {
    console.error('❌ Error updating tester:', error);
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

    const deletedTester = betaTesters.splice(index, 1)[0];
    await saveData();

    console.log(`🗑️  Deleted tester: ${deletedTester.email}`);

    res.json({ success: true, deleted: deletedTester });
  } catch (error) {
    console.error('❌ Error deleting tester:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export data (for backup)
app.get('/api/export', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=beta-testers-export.json');
  res.json({
    exportedAt: new Date().toISOString(),
    totalTesters: betaTesters.length,
    testers: betaTesters
  });
});

// Statistics
app.get('/api/stats', (req, res) => {
  const stats = {
    total: betaTesters.length,
    android: betaTesters.filter(t => t.platform === 'android' || t.platform === 'both').length,
    ios: betaTesters.filter(t => t.platform === 'ios' || t.platform === 'both').length,
    both: betaTesters.filter(t => t.platform === 'both').length,
    emailsSent: betaTesters.filter(t => t.emailSent).length,
    byStatus: {
      invited: betaTesters.filter(t => t.status === 'invited').length,
      waiting: betaTesters.filter(t => t.status === 'waiting').length,
      testing: betaTesters.filter(t => t.status === 'testing').length,
    }
  };
  res.json(stats);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 NutriAI Beta Server Started!');
  console.log('='.repeat(50));
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api`);
  console.log(`💾 Data: ./data/beta-testers.json`);
  console.log('\n⚙️  Configuration:');
  console.log(`   📧 Email Service: ${process.env.SMTP_HOST ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`   👤 Admin Email: ${process.env.ADMIN_EMAIL || '❌ Not set'}`);
  console.log(`   🤖 Android Link: ${process.env.ANDROID_BETA_LINK ? '✅ Set' : '⚠️  Using default'}`);
  console.log(`   🍎 iOS Link: ${process.env.IOS_BETA_LINK ? '✅ Set' : '⚠️  Using default'}`);
  console.log('\n📝 Current Data:');
  console.log(`   Total Beta Testers: ${betaTesters.length}`);
  console.log('='.repeat(50) + '\n');
});
