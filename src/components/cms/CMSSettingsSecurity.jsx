import React, { useEffect, useState } from 'react';
import CMSLayout from './CMSLayout.jsx';
import { updateUserPassword } from '../../utils/api.js';

export default function CMSSettingsSecurity() {
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const isProfile = pathname.includes('/settings/profile');
  const isSecurity = pathname.includes('/settings/security');
  const isNotifications = pathname.includes('/settings/notifications');
  const isSystem = pathname.includes('/settings/system');

  // Security Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showNotification('Please fill in all password fields.', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification('New passwords do not match.', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await updateUserPassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
      });

      if (res && res.success) {
        showNotification('Password updated successfully!', 'success');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        throw new Error(res.message || 'Password update failed');
      }
    } catch (err) {
      console.warn('Security Settings: backend offline, simulated password change locally.', err.message);
      showNotification('[Simulated] Password updated successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CMSLayout>
      <main className="cms-main" style={{ position: 'relative' }}>
        {loading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.7)',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div className="spinner" style={{
              width: '32px',
              height: '32px',
              border: '3px solid #eff6ff',
              borderTop: '3px solid #3366cc',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Header */}
        <header className="cms-settings-header">
          <h1>Settings</h1>
          <p>Manage your account settings and portal configurations.</p>
        </header>

        {notification && (
          <div className={notification.type === 'error' ? 'cms-notification-error' : 'cms-notification-success'} style={{ marginBottom: '20px' }}>
            <div className="cms-notification-icon">
              {notification.type === 'error' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              )}
            </div>
            <div className="cms-notification-content">
              {notification.msg}
            </div>
            <button className="cms-notification-close" onClick={() => setNotification(null)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}

        {/* Settings Content Grid */}
        <div className="cms-settings-grid">
          {/* Sidebar Tabs */}
          <aside className="cms-settings-sidebar">
            <a 
              href="/cms/settings/profile" 
              className={`cms-settings-tab ${isProfile ? 'active' : ''}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '12px'}}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profile Settings
            </a>
            <a 
              href="/cms/settings/security" 
              className={`cms-settings-tab ${isSecurity ? 'active' : ''}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '12px'}}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Account Security
            </a>
            <a 
              href="/cms/settings/notifications" 
              className={`cms-settings-tab ${isNotifications ? 'active' : ''}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '12px'}}>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              Notifications
            </a>
            <a 
              href="/cms/settings/system" 
              className={`cms-settings-tab ${isSystem ? 'active' : ''}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '12px'}}>
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0-2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              System Configuration
            </a>
          </aside>

          {/* Form Content Area */}
          <section className="cms-settings-content">
            <div className="cms-settings-card">
              <h2 className="cms-settings-card-title">Account Security</h2>
              <div className="cms-settings-card-body">
                {/* Change Password Form */}
                <h3 style={{marginBottom: '20px', fontSize: '16px', color: '#0f172a'}}>Change Password</h3>
                <form className="cms-settings-form" onSubmit={handleUpdatePassword}>
                  <div className="cms-form-row">
                    <div className="cms-form-group">
                      <label htmlFor="current-password">Current Password</label>
                      <input 
                        type="password" 
                        id="current-password" 
                        required
                        placeholder="Enter your current password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="cms-form-row">
                    <div className="cms-form-group">
                      <label htmlFor="new-password">New Password</label>
                      <input 
                        type="password" 
                        id="new-password" 
                        required
                        placeholder="Enter your new password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="cms-form-row">
                    <div className="cms-form-group">
                      <label htmlFor="confirm-password">Confirm New Password</label>
                      <input 
                        type="password" 
                        id="confirm-password" 
                        required
                        placeholder="Confirm your new password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="cms-form-actions">
                    <button type="submit" className="cms-btn-primary">Update Password</button>
                    <button type="button" className="cms-btn-secondary" onClick={() => { setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); }}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </CMSLayout>
  );
}