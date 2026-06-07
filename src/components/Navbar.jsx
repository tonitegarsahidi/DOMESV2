import React from 'react';

const UNEmblem = ({ size = 42, color = '#ffffff' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="50" cy="50" r="18" stroke={color} strokeWidth="1.5" fill="none"/>
    <ellipse cx="50" cy="50" rx="34" ry="18" stroke={color} strokeWidth="1.2" fill="none" transform="rotate(0 50 50)"/>
    <ellipse cx="50" cy="50" rx="34" ry="18" stroke={color} strokeWidth="1.2" fill="none" transform="rotate(60 50 50)"/>
    <ellipse cx="50" cy="50" rx="34" ry="18" stroke={color} strokeWidth="1.2" fill="none" transform="rotate(120 50 50)"/>
    <line x1="50" y1="8" x2="50" y2="20" stroke={color} strokeWidth="1.5"/>
    <line x1="50" y1="80" x2="50" y2="92" stroke={color} strokeWidth="1.5"/>
    {/* Olive branches (simplified) */}
    <path d="M18 75 Q25 60 30 50 Q25 40 18 25" stroke={color} strokeWidth="1.2" fill="none"/>
    <path d="M82 75 Q75 60 70 50 Q75 40 82 25" stroke={color} strokeWidth="1.2" fill="none"/>
    {/* Leaves */}
    <path d="M18 70 Q22 65 20 60" stroke={color} strokeWidth="1" fill="none"/>
    <path d="M20 60 Q24 55 22 50" stroke={color} strokeWidth="1" fill="none"/>
    <path d="M22 50 Q26 45 24 40" stroke={color} strokeWidth="1" fill="none"/>
    <path d="M24 40 Q28 35 22 30" stroke={color} strokeWidth="1" fill="none"/>
    <path d="M82 70 Q78 65 80 60" stroke={color} strokeWidth="1" fill="none"/>
    <path d="M80 60 Q76 55 78 50" stroke={color} strokeWidth="1" fill="none"/>
    <path d="M78 50 Q74 45 76 40" stroke={color} strokeWidth="1" fill="none"/>
    <path d="M76 40 Q72 35 78 30" stroke={color} strokeWidth="1" fill="none"/>
  </svg>
);

export default function Navbar() {
  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-brand">
        <div className="un-emblem">
          <UNEmblem size={42} color="#5bc0f8" />
        </div>
        <div className="navbar-brand-text">
          <span className="title">UNITED NATIONS INDONESIA</span>
          <span className="subtitle">Document Repository</span>
        </div>
      </div>

      <div className="navbar-links">
        <a href="/" className="active">Home</a>
        <a href="/documents">Documents</a>
        <a href="/analytics">Analytics</a>
        <a href="/about">About</a>
      </div>

      <div className="navbar-actions">
        <button className="navbar-search-btn" aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
        <button className="navbar-login-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          Login
        </button>
      </div>
    </nav>
  );
}
