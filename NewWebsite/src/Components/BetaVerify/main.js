import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle,
  faExclamationCircle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import Headerr from '../Global/Headerr';
import Footer from '../Global/Footer';

export default function BetaVerify() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const token = searchParams.get('token');

  useEffect(() => {
    // No verification needed - redirect directly to instructions
    window.location.href = '/beta-ios-instructions';
  }, []);

  return (
    <div>
      <Headerr />
      
      <section className="banner_section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
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
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div style={{
                background: 'white',
                borderRadius: '30px',
                padding: '60px 40px',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
              }}>
                {status === 'verifying' && (
                  <>
                    <FontAwesomeIcon 
                      icon={faSpinner} 
                      spin 
                      style={{ 
                        fontSize: '80px', 
                        color: '#75C5C1', 
                        marginBottom: '30px' 
                      }} 
                    />
                    <h2 style={{ 
                      fontSize: '36px', 
                      fontWeight: 'bold', 
                      marginBottom: '20px',
                      color: '#333'
                    }}>
                      Verifying Your Email...
                    </h2>
                    <p style={{ 
                      color: '#666',
                      fontSize: '18px',
                      lineHeight: '1.6'
                    }}>
                      Please wait while we confirm your registration.
                    </p>
                  </>
                )}

                {status === 'success' && (
                  <>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      background: '#10b981',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 30px'
                    }}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: '50px', color: 'white' }} />
                    </div>
                    
                    <h2 style={{ 
                      fontSize: '36px', 
                      fontWeight: 'bold', 
                      marginBottom: '20px', 
                      color: '#10b981'
                    }}>
                      Email Verified!
                    </h2>
                    
                    <p style={{ 
                      fontSize: '18px', 
                      color: '#666', 
                      marginBottom: '30px',
                      lineHeight: '1.6'
                    }}>
                      Your email has been successfully verified. Redirecting you to the instructions page...
                    </p>

                    <div style={{
                      background: 'rgba(74, 144, 226, 0.05)',
                      borderRadius: '15px',
                      padding: '20px',
                      marginTop: '30px',
                      border: '2px solid rgba(74, 144, 226, 0.1)'
                    }}>
                      <p style={{ 
                        color: '#75C5C1', 
                        margin: 0, 
                        fontSize: '16px' 
                      }}>
                        If you're not redirected automatically, <Link to="/beta-ios-instructions" style={{ color: '#75C5C1', fontWeight: '600', textDecoration: 'underline' }}>click here</Link>
                      </p>
                    </div>
                  </>
                )}

                {status === 'error' && (
                  <>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      background: '#ef4444',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 30px'
                    }}>
                      <FontAwesomeIcon icon={faExclamationCircle} style={{ fontSize: '50px', color: 'white' }} />
                    </div>
                    
                    <h2 style={{ 
                      fontSize: '36px', 
                      fontWeight: 'bold', 
                      marginBottom: '20px', 
                      color: '#dc2626'
                    }}>
                      Verification Failed
                    </h2>
                    
                    <p style={{ 
                      fontSize: '18px', 
                      color: '#666', 
                      marginBottom: '30px',
                      lineHeight: '1.6'
                    }}>
                      {message || 'We couldn\'t verify your email. The link may be invalid or expired.'}
                    </p>

                    <Link 
                      to="/beta-ios" 
                      className="btn puprple_btn"
                      style={{
                        display: 'inline-block',
                        padding: '15px 40px',
                        fontSize: '18px'
                      }}
                    >
                      Try Again
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
