import React, { useEffect, useState } from 'react';
import CMSLayout from './CMSLayout.jsx';

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

  const addAdminEmail = () => {
    if (newAdminEmail && !adminEmails.includes(newAdminEmail)) {
      setAdminEmails([...adminEmails, newAdminEmail]);
      setNewAdminEmail('');
    }
  };

  const removeAdminEmail = (email) => {
    setAdminEmails(adminEmails.filter(e => e !== email));
  };

  return (
    <CMSLayout>
      <main className="cms-main">
        {/* Header */}
        <header className="cms-settings-header">
          <h1>Settings</h1>
          <p>Manage your account settings and portal configurations.</p>
        </header>

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
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
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
                    onClick={addAdminEmail}
                    className="cms-btn-primary"
                    style={{whiteSpace: 'nowrap'}}
                  >
                    Add Admin
                  </button>
                </div>

                {/* Admin List */}
                <div style={{border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden'}}>
                  {adminEmails.map((email, index) => (
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
                        onClick={() => removeAdminEmail(email)}
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
                  ))}
                </div>

                <form className="cms-settings-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="cms-form-actions" style={{marginTop: '24px'}}>
                    <button type="submit" className="cms-btn-primary">Save Configuration</button>
                    <button type="button" className="cms-btn-secondary">Cancel</button>
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