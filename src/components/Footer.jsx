import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-inner">
        {/* Brand column */}
        <div className="footer-brand">
          <div className="footer-brand-logo">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="48" stroke="#5bc0f8" strokeWidth="2" fill="none"/>
              <circle cx="50" cy="50" r="18" stroke="#5bc0f8" strokeWidth="1.5" fill="none"/>
              <ellipse cx="50" cy="50" rx="34" ry="18" stroke="#5bc0f8" strokeWidth="1.2" fill="none"/>
              <ellipse cx="50" cy="50" rx="34" ry="18" stroke="#5bc0f8" strokeWidth="1.2" fill="none" transform="rotate(60 50 50)"/>
              <ellipse cx="50" cy="50" rx="34" ry="18" stroke="#5bc0f8" strokeWidth="1.2" fill="none" transform="rotate(120 50 50)"/>
            </svg>
            <span>UNITED NATIONS</span>
          </div>
          <p>
            The Document Management & Electronic System
            (DOMES) is the official central repository for
            United Nations documents in Indonesia.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Search Repository</a></li>
            <li><a href="#">Analytics Dashboard</a></li>
            <li><a href="#">Data Portal</a></li>
            <li><a href="#">Recent Publications</a></li>
          </ul>
        </div>

        {/* Organization */}
        <div className="footer-column">
          <h4>Organization</h4>
          <ul>
            <li><a href="#">UN Indonesia Office</a></li>
            <li><a href="#">Agency Directory</a></li>
            <li><a href="#">Our Partners</a></li>
            <li><a href="#">Media Gallery</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Copyright Policy</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2024 United Nations Indonesia. All rights reserved.</span>
        <span>Developed by IRIC Office Data Team &nbsp;&nbsp;|&nbsp;&nbsp; Version 2.0.0</span>
      </div>
    </footer>
  );
}
