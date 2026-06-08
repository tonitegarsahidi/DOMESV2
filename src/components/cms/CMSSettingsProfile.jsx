import React, { useEffect, useState } from 'react';
import CMSLayout from './CMSLayout.jsx';

export default function CMSSettingsProfile() {
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const isProfile = pathname.includes('/settings/profile');
  const isSecurity = pathname.includes('/settings/security');
  const isNotifications = pathname.includes('/settings/notifications');
  const isSystem = pathname.includes('/settings/system');

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
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0-2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              System Configuration
            </a>
          </aside>

          {/* Form Content Area */}
          <section className="cms-settings-content">
            <div className="cms-settings-card">
              <h2 className="cms-settings-card-title">Profile Settings</h2>
              <div className="cms-settings-card-body">
                
                {/* Avatar Uploader Section */}
                <div className="cms-avatar-uploader">
                  <div className="cms-avatar-preview-lg">
                    <img src="https://i.pravatar.cc/150?img=11" alt="Avatar Preview" />
                  </div>
                  <div className="cms-avatar-uploader-info">
                    <h3>Profile Photo</h3>
                    <p>PNG, JPG or JPEG. Max 2MB.</p>
                    <div className="cms-avatar-uploader-actions">
                      <button className="cms-btn-secondary">Upload New</button>
                      <button className="cms-btn-text-delete">Remove</button>
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <form className="cms-settings-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="cms-form-row">
                    <div className="cms-form-group">
                      <label htmlFor="fullname">Full Name</label>
                      <input type="text" id="fullname" defaultValue="Aldi Taher" />
                    </div>
                  </div>

                  <div className="cms-form-row">
                    <div className="cms-form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" defaultValue="aldi.taher@un.or.id" />
                    </div>
                  </div>

                  <div className="cms-form-row">
                    <div className="cms-form-group">
                      <label htmlFor="role">User Role</label>
                      <input type="text" id="role" defaultValue="Administrator" disabled />
                    </div>
                  </div>

                  <div className="cms-form-actions">
                    <button type="submit" className="cms-btn-primary">Save Changes</button>
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