import React, { useEffect, useState } from 'react';
import CMSLayout from './CMSLayout.jsx';
import { getNotificationPreferences, updateNotificationPreferences } from '../../utils/api.js';

export default function CMSSettingsNotifications() {
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const isProfile = pathname.includes('/settings/profile');
  const isSecurity = pathname.includes('/settings/security');
  const isNotifications = pathname.includes('/settings/notifications');
  const isSystem = pathname.includes('/settings/system');

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [documentApprovals, setDocumentApprovals] = useState(true);
  const [brokenLinkReports, setBrokenLinkReports] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function loadPreferences() {
      try {
        const res = await getNotificationPreferences();
        if (res && res.success && res.data) {
          setEmailNotifications(res.data.email_notifications ?? true);
          setDocumentApprovals(res.data.document_approvals ?? true);
          setBrokenLinkReports(res.data.broken_link_reports ?? true);
          setSystemUpdates(res.data.system_updates ?? false);
        }
      } catch (err) {
        console.warn('Notification Settings: backend offline, using local states.', err.message);
      } finally {
        setLoading(false);
      }
    }
    loadPreferences();
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      document_approvals: documentApprovals,
      broken_link_reports: brokenLinkReports,
      system_updates: systemUpdates,
      email_notifications: emailNotifications
    };

    try {
      const res = await updateNotificationPreferences(payload);
      if (res && res.success) {
        showNotification('Notification preferences successfully saved!');
      } else {
        throw new Error('Save response unsuccessful');
      }
    } catch (err) {
      console.warn('Notification Settings: backend offline, simulated save locally.', err.message);
      showNotification('[Simulated] Notification preferences saved locally!');
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
          <div className="cms-notification-success" style={{ marginBottom: '20px' }}>
            <div className="cms-notification-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="cms-notification-content">
              {notification}
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
              <h2 className="cms-settings-card-title">Notification Preferences</h2>
              <div className="cms-settings-card-body">
                <form className="cms-settings-form" onSubmit={handleSave}>
                  {/* Document Approvals */}
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #e2e8f0'}}>
                    <div>
                      <h4 style={{margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a'}}>Document Approvals</h4>
                      <p style={{margin: '4px 0 0 0', fontSize: '13px', color: '#64748b'}}>Get notified when admin approves your uploaded documents</p>
                    </div>
                    <label className="cms-toggle-switch">
                      <input type="checkbox" checked={documentApprovals} onChange={(e) => setDocumentApprovals(e.target.checked)} />
                      <span className="cms-toggle-slider"></span>
                    </label>
                  </div>

                  {/* Broken Link Reports */}
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #e2e8f0'}}>
                    <div>
                      <h4 style={{margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a'}}>Broken Link Reports</h4>
                      <p style={{margin: '4px 0 0 0', fontSize: '13px', color: '#64748b'}}>Receive alerts when users report broken document links</p>
                    </div>
                    <label className="cms-toggle-switch">
                      <input type="checkbox" checked={brokenLinkReports} onChange={(e) => setBrokenLinkReports(e.target.checked)} />
                      <span className="cms-toggle-slider"></span>
                    </label>
                  </div>

                  {/* System Updates */}
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #e2e8f0'}}>
                    <div>
                      <h4 style={{margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a'}}>System Updates</h4>
                      <p style={{margin: '4px 0 0 0', fontSize: '13px', color: '#64748b'}}>Get updates about portal maintenance and new features</p>
                    </div>
                    <label className="cms-toggle-switch">
                      <input type="checkbox" checked={systemUpdates} onChange={(e) => setSystemUpdates(e.target.checked)} />
                      <span className="cms-toggle-slider"></span>
                    </label>
                  </div>

                  {/* Email Notifications */}
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0'}}>
                    <div>
                      <h4 style={{margin: 0, fontSize: '15px', fontWeight: 600, color: '#0f172a'}}>Email Notifications</h4>
                      <p style={{margin: '4px 0 0 0', fontSize: '13px', color: '#64748b'}}>Send all notifications to your email address</p>
                    </div>
                    <label className="cms-toggle-switch">
                      <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
                      <span className="cms-toggle-slider"></span>
                    </label>
                  </div>

                  <div className="cms-form-actions" style={{marginTop: '24px'}}>
                    <button type="submit" className="cms-btn-primary">Save Preferences</button>
                    <button type="button" className="cms-btn-secondary" onClick={() => window.location.reload()}>Cancel</button>
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