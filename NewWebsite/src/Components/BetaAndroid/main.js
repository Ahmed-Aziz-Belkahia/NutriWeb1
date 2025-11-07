import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faCheckCircle, 
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { faAndroid } from '@fortawesome/free-brands-svg-icons';
import Headerr from '../Global/Headerr';
import Footer from '../Global/Footer';
import hero_img from "../../assets/images/image2.png";

export default function BetaAndroid() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/beta-android-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setError('This email is already registered for Android beta testing!');
        } else {
          setError(data.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error('Error submitting Android beta signup:', err);
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

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
            <div
              className="col-lg-6 col-md-12 aos-init aos-animate"
              data-aos="fade-right"
              data-aos-duration={1500}
            >
              <div className="banner_text">
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(76, 175, 80, 0.1)',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  marginBottom: '20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#C51A1B'
                }}>
                  <FontAwesomeIcon icon={faAndroid} />
                  <span>Android Beta Testing</span>
                </div>

                <h1>
                  Join NutriAI <span>Android Beta Program</span>
                </h1>

                <p>
                  Get early access to NutriAI on Android. Test the app, provide feedback, and help shape the future of nutrition tracking.
                </p>
              </div>

              {!isSubmitted ? (
                <div className="form_block" style={{ marginTop: '30px' }}>
                  <div style={{
                    background: 'rgba(76, 175, 80, 0.05)',
                    border: '2px solid rgba(76, 175, 80, 0.2)',
                    borderRadius: '15px',
                    padding: '20px',
                    marginBottom: '25px'
                  }}>
                    <div style={{ color: '#C51A1B', fontWeight: '600', marginBottom: '8px', fontSize: '18px' }}>
                      <span style={{ fontSize: '24px', marginRight: '8px' }}>🤖</span>
                      Android Beta Access
                    </div>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                      Submit your email to apply for Android beta testing
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label style={{
                        display: 'block',
                        fontWeight: '600',
                        marginBottom: '10px',
                        color: '#333',
                        fontSize: '16px'
                      }}>
                        Your Email Address
                      </label>
                      <div style={{ position: 'relative' }}>
                        <FontAwesomeIcon 
                          icon={faEnvelope}
                          style={{
                            position: 'absolute',
                            left: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#999',
                            fontSize: '18px'
                          }}
                        />
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          style={{
                            paddingLeft: '55px',
                            height: '55px',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: '2px solid #e5e5e5'
                          }}
                        />
                      </div>
                    </div>

                    {error && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#dc2626',
                        background: '#fef2f2',
                        padding: '12px',
                        borderRadius: '10px',
                        gap: '8px',
                        marginBottom: '20px',
                        border: '1px solid #fecaca'
                      }}>
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        <span style={{ fontSize: '14px' }}>{error}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn puprple_btn"
                      disabled={isLoading}
                      style={{
                        width: '100%',
                        padding: '15px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        opacity: isLoading ? 0.5 : 1,
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        background: '#C51A1B'
                      }}
                    >
                      {isLoading ? 'Processing...' : 'Apply for Beta Access'}
                    </button>

                    <p style={{ 
                      marginTop: '15px', 
                      fontSize: '14px', 
                      color: '#999',
                      textAlign: 'center' 
                    }}>
                      We'll review your application and get back to you soon
                    </p>
                  </form>
                </div>
              ) : (
                <div className="form_block" style={{ 
                  marginTop: '30px',
                  background: 'white',
                  padding: '40px',
                  borderRadius: '20px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: '#C51A1B',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 25px'
                  }}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: '40px', color: 'white' }} />
                  </div>
                  
                  <h2 style={{ 
                    fontSize: '32px', 
                    fontWeight: 'bold', 
                    marginBottom: '15px',
                    textAlign: 'center',
                    color: '#333'
                  }}>
                    Application Received!
                  </h2>
                  
                  <p style={{ 
                    fontSize: '16px', 
                    color: '#666', 
                    marginBottom: '25px',
                    textAlign: 'center',
                    lineHeight: '1.6'
                  }}>
                    Thank you for your interest in the NutriAI Android Beta program. We've received your application and will review it shortly.
                  </p>

                  <div style={{
                    background: 'rgba(76, 175, 80, 0.05)',
                    borderRadius: '15px',
                    padding: '25px',
                    marginBottom: '25px',
                    borderLeft: '4px solid #C51A1B'
                  }}>
                    <h3 style={{ 
                      fontWeight: '600', 
                      marginBottom: '12px',
                      color: '#333'
                    }}>📧 What's Next?</h3>
                    <p style={{ color: '#666', margin: 0, lineHeight: '1.8' }}>
                      • We'll review your application<br />
                      • You'll receive an email with our decision<br />
                      • If approved, you'll get instructions to download the app
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    style={{
                      padding: '12px 24px',
                      color: '#C51A1B',
                      fontWeight: '600',
                      background: 'transparent',
                      border: '2px solid #C51A1B',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      display: 'block',
                      margin: '0 auto',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#C51A1B';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#C51A1B';
                    }}
                  >
                    Use a different email
                  </button>
                </div>
              )}
            </div>

            <div
              className="col-lg-6 col-md-12 aos-init aos-animate"
              data-aos="fade-in"
              data-aos-duration={1500}
            >
              <div className="banner_shape_images">
                <div className="hero_image_1">
                  <img
                    src={hero_img}
                    className="moving_position_animatin"
                    alt="NutriAI App"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
