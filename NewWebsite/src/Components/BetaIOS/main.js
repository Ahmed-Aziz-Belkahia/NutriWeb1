import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faCheckCircle, 
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import Headerr from '../Global/Headerr';
import Footer from '../Global/Footer';
import hero_img from "../../assets/images/image2.png";

export default function BetaIOS() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Redirect immediately without showing processing state
    window.location.href = '/beta-ios-instructions';
    
    // Send request in background (fire and forget)
    try {
      const response = await fetch('/api/beta-ios-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If there's an error and page hasn't redirected yet, show error
        if (response.status === 409) {
          setError('This email is already registered for iOS beta testing!');
        } else {
          setError(data.error || 'Something went wrong. Please try again.');
        }
        // Cancel redirect if error
        window.location.href = '';
        return;
      }
    } catch (err) {
      console.error('Error submitting iOS beta signup:', err);
      // If page hasn't redirected yet, show error
      setError('Unable to connect to server. Please try again later.');
      window.location.href = '';
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
                  background: 'rgba(74, 144, 226, 0.1)',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  marginBottom: '20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#75C5C1'
                }}>
                  <FontAwesomeIcon icon={faApple} />
                  <span>iOS Beta Testing</span>
                </div>

                <h1>
                  Join NutriAI <span>iOS Beta Program</span>
                </h1>

                <p>
                  Get early access to NutriAI on iOS. Test the app, provide feedback, and help shape the future of nutrition tracking.
                </p>
              </div>

              {!isSubmitted ? (
                <div className="form_block" style={{ marginTop: '30px' }}>
                  <div style={{
                    background: 'rgba(74, 144, 226, 0.05)',
                    border: '2px solid rgba(74, 144, 226, 0.2)',
                    borderRadius: '15px',
                    padding: '20px',
                    marginBottom: '25px'
                  }}>
                    <div style={{ color: '#75C5C1', fontWeight: '600', marginBottom: '8px', fontSize: '18px' }}>
                      <span style={{ fontSize: '24px', marginRight: '8px' }}>🍎</span>
                      iOS TestFlight Beta
                    </div>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                      Enter your email to receive your TestFlight invitation
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
                      style={{
                        width: '100%',
                        padding: '15px',
                        fontSize: '18px',
                        fontWeight: 'bold'
                      }}
                    >
                      Get Beta Access
                    </button>

                    <p style={{ 
                      marginTop: '15px', 
                      fontSize: '14px', 
                      color: '#999',
                      textAlign: 'center' 
                    }}>
                      You'll receive instructions via email immediately
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
                    background: '#75C5C1',
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
                    Check Your Email!
                  </h2>
                  
                  <p style={{ 
                    fontSize: '16px', 
                    color: '#666', 
                    marginBottom: '25px',
                    textAlign: 'center',
                    lineHeight: '1.6'
                  }}>
                    We've sent a verification link to your email address. Please click the link to complete your registration and get access instructions.
                  </p>

                  <div style={{
                    background: '#fff7ed',
                    borderRadius: '15px',
                    padding: '25px',
                    marginBottom: '25px',
                    borderLeft: '4px solid #fb923c'
                  }}>
                    <h3 style={{ 
                      fontWeight: '600', 
                      marginBottom: '12px',
                      color: '#333'
                    }}>📧 Next Steps</h3>
                    <p style={{ color: '#666', margin: 0, lineHeight: '1.8' }}>
                      1. Check your email inbox (and spam folder)<br />
                      2. Click the verification link<br />
                      3. Follow the instructions to download the app
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    style={{
                      padding: '12px 24px',
                      color: '#75C5C1',
                      fontWeight: '600',
                      background: 'transparent',
                      border: '2px solid #75C5C1',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      display: 'block',
                      margin: '0 auto',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#75C5C1';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#75C5C1';
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
