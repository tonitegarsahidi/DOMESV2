import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

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
        {/* <a href="/documents" className={currentPath === '/documents' || currentPath === '/search-results' ? 'active' : ''}>Documents</a> */}
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
      </div>
    </nav>
  );
}

