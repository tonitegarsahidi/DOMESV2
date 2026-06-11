import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [currentPath, setCurrentPath] = useState('/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-brand">
        <a href="/">
          <img 
            src="/images/un-logo.png" 
            alt="United Nations Indonesia" 
            className="navbar-logo" 
          />
        </a>
      </div>

      <div className="navbar-links">
        <a href="/" className={currentPath === '/' ? 'active' : ''}>Home</a>
        <a href="/about" className={currentPath === '/about' ? 'active' : ''}>About</a>
        <a href="/faq" className={currentPath === '/faq' ? 'active' : ''}>FAQ</a>
        <a href="/analytics" className={currentPath === '/analytics' ? 'active' : ''}>Statistics</a>
      </div>

      <div className="navbar-actions">
        <button className="navbar-login-btn" onClick={() => window.location.href = '/login'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          Login
        </button>

        {/* Mobile Hamburger */}
        <button 
          className="navbar-hamburger" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <a href="/" className={currentPath === '/' ? 'active' : ''}>Home</a>
            <a href="/about" className={currentPath === '/about' ? 'active' : ''}>About</a>
            <a href="/faq" className={currentPath === '/faq' ? 'active' : ''}>FAQ</a>
            <a href="/analytics" className={currentPath === '/analytics' ? 'active' : ''}>Statistics</a>
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginTop: '8px' }}>
              <a href="/login" className="mobile-login-link">Login / Register</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
