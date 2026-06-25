import React, { useState, useEffect } from 'react';
import { login } from '../utils/api.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await login(email, password);
      if (res.success) {
        window.location.href = '/cms/dashboard';
      } else {
        setErrorMsg(res.message || 'Login failed.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
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

        {/* Error notification for login */}
        {errorMsg && (
          <div className="error-alert" style={{
            background: '#fef2f2',
            border: '1px solid #ef4444',
            borderRadius: '6px',
            padding: '12px 16px',
            marginBottom: '20px',
            color: '#991b1b',
            fontSize: '14px'
          }}>
            <span style={{ marginRight: '8px' }}>⚠️</span>
            {errorMsg}
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="name@un.org" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  zIndex: 2
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
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

          <button 
            type="submit" 
            className="btn-primary full-width"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
      </div>
    </div>
  );
}