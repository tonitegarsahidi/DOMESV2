import React, { useState, useEffect } from 'react';

export default function Login() {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  
  useEffect(() => {
    // Check if user came from register page
    const params = new URLSearchParams(window.location.search);
    const registered = params.get('registered');
    if (registered) {
      setShowSuccessMsg(true);
      // Clean up URL parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = '/cms/dashboard';
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <a href="/">
            <img src="/images/un-logo.png" alt="UN Indonesia" className="auth-logo" />
          </a>
          <h2>Sign in to DOMES</h2>
          <p>Document Management & Electronic System</p>
        </div>

        {/* Success notification for registration */}
        {showSuccessMsg && (
          <div className="success-alert" style={{
            background: '#dcfce7',
            border: '1px solid #22c55e',
            borderRadius: '6px',
            padding: '12px 16px',
            marginBottom: '20px',
            color: '#166534',
            fontSize: '14px'
          }}>
            <span style={{ marginRight: '8px' }}>✓</span>
            Registrasi sukses, silakan login
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="name@un.org" />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" />
          </div>

          <div className="form-row flex-between">
            <label className="checkbox-label">
              <input type="checkbox" id="remember" />
              <span>Remember me</span>
            </label>
            <a href="/forgot-password" className="forgot-link">Forgot password?</a>
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

          <button type="submit" className="btn-primary full-width">Sign In</button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
      </div>
    </div>
  );
}