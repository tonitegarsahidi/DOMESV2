import React from 'react';
import CMSLayout from './CMSLayout.jsx';

export default function CMSDashboard() {
  return (
    <CMSLayout>
      <main className="cms-main">
        <header className="cms-header">
          <h1>Welcome back, Aldi Taher</h1>
          <p>Here is what's happening with your submissions today.</p>
        </header>

        {/* Stats Grid */}
        <div className="cms-stats-grid">
          <div className="cms-stat-card">
            <div className="cms-stat-title">TOTAL DOCUMENTS UPLOADED</div>
            <div className="cms-stat-row">
              <span className="cms-stat-value">1,248</span>
              <span className="cms-stat-trend positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                +12% this month
              </span>
            </div>
          </div>
          <div className="cms-stat-card">
            <div className="cms-stat-title">TOTAL VIEWS</div>
            <div className="cms-stat-row">
              <span className="cms-stat-value">45.2k</span>
              <span className="cms-stat-trend positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                +5% this week
              </span>
            </div>
          </div>
          <div className="cms-stat-card">
            <div className="cms-stat-title">TOTAL DOWNLOADS</div>
            <div className="cms-stat-row">
              <span className="cms-stat-value">8,930</span>
              <span className="cms-stat-trend negative">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                  <polyline points="17 18 23 18 23 12"></polyline>
                </svg>
                -2% this week
              </span>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <h2 className="cms-section-title">Quick Access</h2>
        <div className="cms-quick-access-grid">
          <a href="/cms/submissions" className="cms-qa-card">
            <div className="cms-qa-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="cms-qa-content">
              <h3>Manage Submissions</h3>
              <p>Review and edit pending documents.</p>
            </div>
          </a>
          <a href="/cms/analytics" className="cms-qa-card">
            <div className="cms-qa-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
            </div>
            <div className="cms-qa-content">
              <h3>View Analytics</h3>
              <p>Detailed insights on document performance.</p>
            </div>
          </a>
          <a href="/cms/settings" className="cms-qa-card">
            <div className="cms-qa-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <div className="cms-qa-content">
              <h3>Account Settings</h3>
              <p>Update your profile and preferences.</p>
            </div>
          </a>
        </div>

        {/* Recent Activity */}
        <div className="cms-activity-box">
          <div className="cms-activity-header">
            <h2>Recent Activity</h2>
            <a href="#" className="cms-view-all">View All</a>
          </div>
          <ul className="cms-activity-list">
            <li className="cms-activity-item">
              <div className="cms-activity-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div className="cms-activity-text">
                <h4>Annual Report 2023 was uploaded successfully.</h4>
                <p>2 hours ago</p>
              </div>
            </li>
            <li className="cms-activity-item">
              <div className="cms-activity-icon update">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 2v6h-6"></path>
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                  <path d="M3 22v-6h6"></path>
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                </svg>
              </div>
              <div className="cms-activity-text">
                <h4>Metadata updated for Education Strategy Framework.</h4>
                <p>5 hours ago</p>
              </div>
            </li>
            <li className="cms-activity-item">
              <div className="cms-activity-icon download">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </div>
              <div className="cms-activity-text">
                <h4>UNICEF Guidelines reached 1,000 downloads.</h4>
                <p>Yesterday</p>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </CMSLayout>
  );
}