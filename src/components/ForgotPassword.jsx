import React, { useState } from 'react';

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <a href="/">
              <img src="/images/un-logo.png" alt="UN Indonesia" className="auth-logo" />
            </a>
            <h2>Email Sent</h2>
            <p>Password Reset Instructions</p>
          </div>
          
          <div className="success-message" style={{
            background: '#dcfce7',
            border: '1px solid #22c55e',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" style={{margin: '0 auto 16px'}}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <p style={{ color: '#166534', fontSize: '16px', margin: 0 }}>
              Kami mengirimkan instruksi reset password ke email Anda
            </p>
          </div>

          <a href="/login" style={{
            display: 'block',
            textAlign: 'center',
            background: '#0288d1',
            color: '#ffffff',
            padding: '14px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '15px'
          }}>
            Back to Login
          </a>

          <div className="auth-footer">
            <p>Need help? <a href="#">Contact support</a></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <a href="/">
            <img src="/images/un-logo.png" alt="UN Indonesia" className="auth-logo" />
          </a>
          <h2>Forgot Password</h2>
          <p>Enter your email to reset your password</p>
        </div>
        
        <form className="auth-form" onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="name@un.org" />
          </div>

          {/* Dummy reCAPTCHA */}
          <div className="dummy-recaptcha">
            <div className="recaptcha-checkbox">
              <input type="checkbox" id="recaptcha-check" required />
              <label htmlFor="recaptcha-check">I'm not a robot</label>
            </div>
            <div className="recaptcha-logo">
              <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" />
              <span>reCAPTCHA<br/>Privacy - Terms</span>
            </div>
          </div>

          <button type="submit" className="btn-primary full-width">Reset my password</button>
        </form>

        <div className="auth-footer">
          <p>Remember your password? <a href="/login">Login here</a></p>
        </div>
      </div>
    </div>
  );
}