import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import Headerr from '../Global/Headerr';
import Footer from '../Global/Footer';
import hero_img from "../../assets/images/image2.png";

export default function BetaIOSInstructions() {
  return (
    <div>
      <Headerr />
      
      <section className="banner_section">
        <div className="dotes_anim_bloack">
          <div className="dots dotes_1" />
          <div className="dots dotes_2" />
          <div className="dots dotes_3" />
          <div className="dots dotes_4" />
          <div className="dots dotes_5" />
          <div className="dots dotes_6" />
          <div className="dots dotes_7" />
          <div className="dots dotes_8" />
          <div className="dots dotes_9" />
          <div className="dots dotes_10" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="banner_text" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(74, 144, 226, 0.1)',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  marginBottom: '20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#75C5C1'
                }}>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span>You're All Set!</span>
                </div>

                <h1>
                  Welcome to the <span>NutriAI iOS Beta</span>
                </h1>

                <p style={{ marginBottom: '50px' }}>
                  Follow these simple steps to download the app and start your journey with NutriAI.
                </p>
              </div>

              {/* Step 1: Download */}
              <div className="row_am" style={{ marginBottom: '40px' }}>
                <div className="icon">
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: '#75C5C1',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    margin: '0 auto 20px'
                  }}>
                    1
                  </div>
                </div>
                <div className="text">
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 'bold', 
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}>
                    <FontAwesomeIcon icon={faApple} style={{ color: '#75C5C1' }} />
                    Download NutriAI
                  </h2>
                  <p style={{ marginBottom: '25px', fontSize: '16px', lineHeight: '1.7', color: '#666' }}>
                    Click the button below to download NutriAI from the App Store. The app is available for all iOS beta testers.
                  </p>
                  <div style={{ textAlign: 'center' }}>
                    <a 
                      href="https://apps.apple.com/pl/app/nutri-ai/id6747520795"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn puprple_btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '15px 40px',
                        fontSize: '18px'
                      }}
                    >
                      <FontAwesomeIcon icon={faApple} />
                      Download from App Store
                    </a>
                  </div>
                </div>
              </div>

              {/* Step 2: Test the App */}
              <div className="row_am" style={{ marginBottom: '40px', background: '#f9fafb', padding: '40px', borderRadius: '20px' }}>
                <div className="icon">
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: '#75C5C1',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    margin: '0 auto 20px'
                  }}>
                    2
                  </div>
                </div>
                <div className="text">
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 'bold', 
                    marginBottom: '15px',
                    textAlign: 'center'
                  }}>
                    Test & Explore
                  </h2>
                  <p style={{ marginBottom: '20px', fontSize: '16px', lineHeight: '1.7', color: '#666', textAlign: 'center' }}>
                    Take your time to explore all the features of NutriAI:
                  </p>
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    maxWidth: '600px', 
                    margin: '0 auto',
                    textAlign: 'left'
                  }}>
                    <li style={{ 
                      padding: '12px 0', 
                      borderBottom: '1px solid #e5e7eb',
                      color: '#666',
                      fontSize: '16px'
                    }}>
                      <span style={{ color: '#75C5C1', marginRight: '10px' }}>✓</span>
                      Scan your meals and track nutrition
                    </li>
                    <li style={{ 
                      padding: '12px 0', 
                      borderBottom: '1px solid #e5e7eb',
                      color: '#666',
                      fontSize: '16px'
                    }}>
                      <span style={{ color: '#75C5C1', marginRight: '10px' }}>✓</span>
                      Create personalized meal plans
                    </li>
                    <li style={{ 
                      padding: '12px 0', 
                      borderBottom: '1px solid #e5e7eb',
                      color: '#666',
                      fontSize: '16px'
                    }}>
                      <span style={{ color: '#75C5C1', marginRight: '10px' }}>✓</span>
                      Generate recipes from ingredients
                    </li>
                    <li style={{ 
                      padding: '12px 0', 
                      borderBottom: '1px solid #e5e7eb',
                      color: '#666',
                      fontSize: '16px'
                    }}>
                      <span style={{ color: '#75C5C1', marginRight: '10px' }}>✓</span>
                      Track your body composition
                    </li>
                    <li style={{ 
                      padding: '12px 0',
                      color: '#666',
                      fontSize: '16px'
                    }}>
                      <span style={{ color: '#75C5C1', marginRight: '10px' }}>✓</span>
                      Explore all premium features
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3: Provide Feedback */}
              <div className="row_am" style={{ marginBottom: '40px' }}>
                <div className="icon">
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: '#75C5C1',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    margin: '0 auto 20px'
                  }}>
                    3
                  </div>
                </div>
                <div className="text">
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 'bold', 
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}>
                    <FontAwesomeIcon icon={faClipboardList} style={{ color: '#75C5C1' }} />
                    Share Your Feedback
                  </h2>
                  <p style={{ marginBottom: '25px', fontSize: '16px', lineHeight: '1.7', color: '#666' }}>
                    After testing the app, please fill out our feedback form. Your insights help us improve NutriAI for everyone.
                  </p>

                  <div style={{
                    background: '#fff7ed',
                    borderRadius: '15px',
                    padding: '25px',
                    marginBottom: '25px',
                    borderLeft: '4px solid #fb923c',
                    textAlign: 'left',
                    maxWidth: '600px',
                    margin: '0 auto 25px'
                  }}>
                    <h3 style={{ 
                      fontWeight: '600', 
                      marginBottom: '10px',
                      color: '#9a3412',
                      fontSize: '20px'
                    }}>🎁 Bonus Reward</h3>
                    <p style={{ color: '#9a3412', margin: 0, fontSize: '16px', lineHeight: '1.6' }}>
                      Complete the feedback form to receive <strong>3 additional months of free premium access</strong> when NutriAI officially launches!
                    </p>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <a 
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdkQ_SvfSK4zX0nljv6XkNnU838g2DDNnSxzO7wHRYqIC0X7w/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn puprple_btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '15px 40px',
                        fontSize: '18px',
                        background: '#10b981'
                      }}
                    >
                      <FontAwesomeIcon icon={faClipboardList} />
                      Fill Out Feedback Form
                    </a>
                  </div>
                </div>
              </div>

              {/* Support Section */}
              <div style={{
                background: 'rgba(74, 144, 226, 0.05)',
                borderRadius: '20px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '60px',
                border: '2px solid rgba(74, 144, 226, 0.1)'
              }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  marginBottom: '15px',
                  color: '#333'
                }}>
                  Need Help?
                </h3>
                <p style={{ color: '#666', marginBottom: '20px', fontSize: '16px' }}>
                  If you encounter any issues or have questions, please reach out to our support team:
                </p>
                <a 
                  href="mailto:support@nutriai.pl" 
                  style={{ 
                    color: '#75C5C1', 
                    fontWeight: '600',
                    fontSize: '18px',
                    textDecoration: 'none'
                  }}
                >
                  support@nutriai.pl
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
