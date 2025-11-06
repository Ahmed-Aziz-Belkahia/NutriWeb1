// Modern blue-themed approval email template
// Note: androidLink should be the beta testing link, not the public store link
export const getApprovalEmailHTML = (androidLink, iosLink) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
      line-height: 1.6; 
      color: #1e293b; 
      background: #f1f5f9;
      margin: 0;
      padding: 0;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background: #ffffff;
    }
    .header { 
      background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%); 
      color: white; 
      padding: 40px 30px; 
      text-align: center;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 32px;
      font-weight: 700;
      color: #ffffff;
    }
    .header p {
      margin: 0 0 12px 0;
      font-size: 18px;
      color: #e0f2fe;
      font-weight: 500;
    }
    .badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-top: 8px;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .content { 
      background: #ffffff; 
      padding: 40px 30px;
    }
    .content h2 {
      color: #0284c7;
      font-size: 24px;
      margin: 0 0 16px 0;
      font-weight: 700;
    }
    .content h3 {
      color: #0369a1;
      font-size: 18px;
      margin: 0 0 12px 0;
      font-weight: 600;
    }
    .content p {
      color: #475569;
      margin: 0 0 16px 0;
      font-size: 16px;
    }
    .highlight { 
      background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); 
      padding: 24px; 
      border-radius: 12px; 
      margin: 24px 0; 
      border-left: 4px solid #0284c7;
    }
    .highlight h3 {
      color: #0369a1;
      margin-top: 0;
    }
    .highlight p {
      color: #0c4a6e;
      margin-bottom: 12px;
    }
    .highlight ul {
      margin: 12px 0;
      padding-left: 20px;
      color: #0c4a6e;
    }
    .highlight li {
      margin: 8px 0;
      color: #0c4a6e;
    }
    .highlight strong {
      color: #075985;
    }
    .download-section { 
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); 
      padding: 32px 24px; 
      border-radius: 12px; 
      margin: 24px 0; 
      text-align: center;
      border: 2px solid #bae6fd;
    }
    .download-section h3 {
      color: #0369a1;
      font-size: 22px;
      margin: 0 0 12px 0;
    }
    .download-section p {
      color: #0c4a6e;
      margin-bottom: 20px;
    }
    .button { 
      display: inline-block; 
      padding: 16px 40px; 
      background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
      color: white !important; 
      text-decoration: none; 
      border-radius: 30px; 
      font-weight: 700; 
      margin: 8px 8px; 
      font-size: 16px;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
    .button-ios { 
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
    .steps { 
      background: #f8fafc; 
      padding: 24px; 
      border-radius: 12px; 
      margin: 24px 0;
      border: 1px solid #e2e8f0;
    }
    .steps h3 {
      color: #0369a1;
      margin-top: 0;
    }
    .step { 
      margin: 20px 0; 
      padding-left: 45px; 
      position: relative;
      color: #475569;
    }
    .step-number { 
      position: absolute; 
      left: 0; 
      top: 2px; 
      background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); 
      color: white; 
      width: 32px; 
      height: 32px; 
      border-radius: 50%; 
      text-align: center; 
      line-height: 32px; 
      font-weight: 700; 
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(14, 165, 233, 0.3);
    }
    .step strong {
      color: #1e293b;
      display: block;
      margin-bottom: 4px;
      font-size: 16px;
    }
    .feedback-section {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      padding: 24px;
      border-radius: 12px;
      margin: 24px 0;
      border-left: 4px solid #f59e0b;
    }
    .feedback-section h3 {
      color: #92400e;
      margin-top: 0;
    }
    .feedback-section p {
      color: #78350f;
      margin-bottom: 12px;
    }
    .feedback-section strong {
      color: #92400e;
    }
    .links {
      font-size: 13px;
      color: #64748b;
      margin-top: 16px;
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    .links strong {
      color: #0369a1;
      display: block;
      margin: 8px 0 4px 0;
    }
    .links a {
      color: #0284c7;
      word-break: break-all;
      text-decoration: none;
    }
    .footer {
      background: #f8fafc;
      padding: 24px 30px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    .footer p {
      color: #64748b;
      font-size: 14px;
      margin: 8px 0;
    }
    .footer strong {
      color: #1e293b;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 You're Approved!</h1>
      <p>Welcome to the NutriAI Beta Program</p>
      <div class="badge">✨ EXCLUSIVE ACCESS GRANTED</div>
    </div>
    
    <div class="content">
      <h2>Congratulations! Your application has been approved.</h2>
      <p>We're thrilled to welcome you as an early tester for NutriAI. Your feedback will directly shape the future of our AI-powered nutrition platform and help us create the best experience possible.</p>
      
      <div class="highlight">
        <h3>✨ What You Get as a Beta Tester</h3>
        <p>You're now part of an exclusive group with special privileges:</p>
        <ul>
          <li><strong>Full Premium Access</strong> - All features unlocked at no cost</li>
          <li><strong>Direct Team Support</strong> - Priority assistance from our developers</li>
          <li><strong>Early Feature Access</strong> - Test new features before anyone else</li>
          <li><strong>Lifetime Benefits</strong> - Special perks that continue after beta</li>
          <li><strong>Shape the Product</strong> - Your input drives our development</li>
        </ul>
      </div>
      
      <div class="download-section">
        <h3>📲 Download NutriAI Now</h3>
        <p>Choose your platform and start your journey:</p>
        <div>
          <a href="${androidLink}" class="button">🤖 Download for Android</a>
          <a href="${iosLink}" class="button button-ios">🍎 Download for iOS</a>
        </div>
      </div>
      
      <div class="steps">
        <h3>📱 Quick Start Guide</h3>
        <div class="step">
          <div class="step-number">1</div>
          <strong>Download the App</strong>
          Tap the download button above for your device
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <strong>Install & Launch</strong>
          Open NutriAI on your device
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <strong>Create Your Account</strong>
          Set up your profile and nutrition goals
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <strong>Start Exploring!</strong>
          Test all features and discover what NutriAI can do
        </div>
      </div>
      
      <div class="feedback-section">
        <h3>💬 We Need Your Feedback!</h3>
        <p>Your insights are invaluable to us. Found a bug? Have a feature idea? Love something? Let us know!</p>
        <p>📧 Reply to this email anytime or contact us at <strong>support@nutriai.pl</strong></p>
      </div>

      <div class="links">
        <p><strong>🤖 Android Download Link:</strong></p>
        <a href="${androidLink}">${androidLink}</a>
        <p><strong>🍎 iOS Download Link:</strong></p>
        <a href="${iosLink}">${iosLink}</a>
      </div>
    </div>

    <div class="footer">
      <p><strong>Thank you for being part of NutriAI's journey! 🚀</strong></p>
      <p>Best regards,<br>The NutriAI Team</p>
      <p style="font-size: 12px; color: #94a3b8; margin-top: 16px;">
        © 2025 NutriAI. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
`;
