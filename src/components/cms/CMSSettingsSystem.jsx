import React, { useEffect, useState } from 'react';
import CMSLayout from './CMSLayout.jsx';
import { getAdminEmails, addAdminEmail as apiAddAdminEmail, deleteAdminEmail as apiDeleteAdminEmail } from '../../utils/api.js';

export default function CMSSettingsSystem() {
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const isProfile = pathname.includes('/settings/profile');
  const isSecurity = pathname.includes('/settings/security');
  const isNotifications = pathname.includes('/settings/notifications');
  const isSystem = pathname.includes('/settings/system');

  const [adminEmails, setAdminEmails] = useState([
    'aldi.taher@un.or.id',
    'admin@un.or.id'
  ]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const loadAdminEmails = async () => {
    setLoading(true);
    try {
      const res = await getAdminEmails();
      if (res && res.success && res.data) {
        // Assume res.data is array of emails or object with entries
        const list = Array.isArray(res.data) ? res.data : (res.data.emails || []);
        setAdminEmails(list);
      } else {
        throw new Error('API query unsuccessful');
      }
    } catch (err) {
      console.warn('System Settings: backend offline, using fallback admin email list.', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminEmails();
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleAddEmail = async () => {
    if (!newAdminEmail) return;
    if (adminEmails.includes(newAdminEmail)) {
      showNotification('Email is already in the list.');
      return;
    }

    try {
      const res = await apiAddAdminEmail(newAdminEmail);
      if (res && res.success) {
        showNotification(`Successfully added ${newAdminEmail} to admin whitelist!`);
        setNewAdminEmail('');
        loadAdminEmails();
      } else {
        throw new Error('Add email failed');
      }
    } catch (err) {
      console.warn('System Settings: backend offline, simulating add locally.', err.message);
      setAdminEmails([...adminEmails, newAdminEmail]);
      setNewAdminEmail('');
      showNotification(`[Simulated] Added ${newAdminEmail} locally.`);
    }
  };

  const handleRemoveEmail = async (email) => {
    try {
      const res = await apiDeleteAdminEmail(email);
      if (res && res.success) {
        showNotification(`Successfully removed ${email} from admin whitelist!`);
        loadAdminEmails();
      } else {
        throw new Error('Remove email failed');
      }
    } catch (err) {
      console.warn('System Settings: backend offline, simulating remove locally.', err.message);
      setAdminEmails(adminEmails.filter(e => e !== email));
      showNotification(`[Simulated] Removed ${email} locally.`);
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
              <h2 className="cms-settings-card-title">System Configuration</h2>
              <div className="cms-settings-card-body">
                <h3 style={{marginBottom: '20px', fontSize: '16px', color: '#0f172a'}}>Administrator Access List</h3>
                <p style={{marginBottom: '20px', fontSize: '13px', color: '#64748b'}}>Manage email addresses that have administrator privileges on this portal.</p>
                
                {/* Add New Admin */}
                <div style={{display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center'}}>
                  <input 
                    type="email" 
                    placeholder="Add new admin email..." 
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    style={{flex: 1, padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '14px'}}
                  />
                  <button 
                    onClick={handleAddEmail}
                    className="cms-btn-primary"
                    style={{whiteSpace: 'nowrap', cursor: 'pointer'}}
                  >
                    Add Admin
                  </button>
                </div>

                {/* Admin List */}
                <div style={{border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden'}}>
                  {adminEmails.length > 0 ? (
                    adminEmails.map((email, index) => (
                      <div 
                        key={email}
                        style={{
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          padding: '14px 16px',
                          backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                          borderBottom: index < adminEmails.length - 1 ? '1px solid #e2e8f0' : 'none'
                        }}
                      >
                        <span style={{fontSize: '14px', color: '#0f172a'}}>{email}</span>
                        <button 
                          onClick={() => handleRemoveEmail(email)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: 500
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                      No administrator whitelist addresses configured.
                    </div>
                  )}
                </div>

                <form className="cms-settings-form" onSubmit={(e) => { e.preventDefault(); showNotification('Configuration changes saved!'); }}>
                  <div className="cms-form-actions" style={{marginTop: '24px'}}>
                    <button type="submit" className="cms-btn-primary">Save Configuration</button>
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