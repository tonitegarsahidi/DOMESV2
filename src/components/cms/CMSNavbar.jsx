import React, { useEffect, useState, useRef } from 'react';
import { removeToken } from '../../utils/api.js';

export default function CMSNavbar() {
  const [pathname, setPathname] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [displayName, setDisplayName] = useState('Admin User');
  const [avatarUrl, setAvatarUrl] = useState('https://i.pravatar.cc/150?img=11');
  const userMenuRef = useRef(null);

  useEffect(() => {
    setPathname(window.location.pathname);

    // Get user from localStorage
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('cms_user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user) {
            setDisplayName(`${user.first_name || 'Admin'} ${user.last_name || 'User'}`);
            if (user.avatar_url) {
              setAvatarUrl(user.avatar_url);
            }
          }
        } catch (e) {
          console.error('Failed to parse user cache in navbar:', e);
        }
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  const isDashboard = pathname.includes('/cms/dashboard');
  const isSubmissions = pathname.includes('/cms/submissions');
  const isAnalytics = pathname.includes('/cms/analytics');
  const isReports = pathname.includes('/cms/reports');
  const isUsers = pathname.includes('/cms/users');
  const isMasterReference = pathname.includes('/cms/masterreference');
  const isSettings = pathname.includes('/cms/settings');

  return (
    <nav className="cms-navbar">
      <div className="cms-navbar-brand">
        <img src="/images/UN Logo_Horizontal_White_English.png" alt="UN Logo" style={{ height: '60px', marginRight: '12px', objectFit: 'contain' }} />
        <div className="cms-brand-text">
          <span className="cms-brand-title">DOMES CMS PORTAL</span>
        </div>
      </div>

      <div className="cms-navbar-links">
        <a href="/cms/dashboard" className={`cms-nav-link ${isDashboard ? 'active' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          Dashboard
        </a>
        <a href="/cms/submissions" className={`cms-nav-link ${isSubmissions ? 'active' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
          Submissions
        </a>
        <a href="/cms/analytics" className={`cms-nav-link ${isAnalytics ? 'active' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
          Analytics
        </a>
        <a href="/cms/reports" className={`cms-nav-link ${isReports ? 'active' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
            <line x1="4" y1="22" x2="4" y2="15"></line>
          </svg>
          Reports
        </a>
        <a href="/cms/users" className={`cms-nav-link ${isUsers ? 'active' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Users
        </a>
        <a href="/cms/masterreference" className={`cms-nav-link ${isMasterReference ? 'active' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          Master Reference
        </a>
        <a href="/cms/settings" className={`cms-nav-link ${isSettings ? 'active' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0-2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          Settings
        </a>
      </div>

      <div className="cms-navbar-actions">
        <button className="cms-icon-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        <button className="cms-icon-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </button>
        <div className="cms-user-menu-wrapper" ref={userMenuRef}>
          <button
            className="cms-user-menu"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="cms-avatar">
              <img src={avatarUrl} alt="User" onError={(e) => { e.target.src = 'https://i.pravatar.cc/150?img=11'; }} />
            </div>
            <span className="cms-user-name">{displayName}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`cms-dropdown-icon ${userMenuOpen ? 'open' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {userMenuOpen && (
            <div className="cms-user-dropdown">
              <a href="/cms/settings" className="cms-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0-2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Settings
              </a>
              <a href="/login" className="cms-dropdown-item cms-dropdown-item-logout" onClick={handleLogout}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}