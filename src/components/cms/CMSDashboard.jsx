import React, { useState, useEffect } from 'react';
import CMSLayout from './CMSLayout.jsx';
import { getCMSDashboardStats, getCMSActivity } from '../../utils/api.js';

export default function CMSDashboard() {
  const [userName, setUserName] = useState('Editor');
  const [stats, setStats] = useState({
    total_documents: { value: 1248, change: 12.5, trend: 'up' },
    total_views: { value: 45200, change: 8.3, trend: 'up' },
    total_downloads: { value: 8930, change: -2.1, trend: 'down' }
  });
  const [activities, setActivities] = useState([
    { id: 1, type: 'submission', action: 'created', description: 'Annual Report 2023 was uploaded successfully.', time_ago: '2 hours ago' },
    { id: 2, type: 'submission', action: 'updated', description: 'Metadata updated for Education Strategy Framework.', time_ago: '5 hours ago' },
    { id: 3, type: 'download', action: 'milestone', description: 'UNICEF Guidelines reached 1,000 downloads.', time_ago: 'Yesterday' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user name
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('cms_user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user && user.first_name) {
            setUserName(`${user.first_name} ${user.last_name || ''}`);
          }
        } catch (e) {
          console.error('Failed to parse cms_user:', e);
        }
      }
    }

    async function loadDashboardData() {
      try {
        const [statsRes, activityRes] = await Promise.all([
          getCMSDashboardStats(),
          getCMSActivity(5)
        ]);

        if (statsRes && statsRes.success && statsRes.data) {
          setStats(statsRes.data);
        }
        if (activityRes && activityRes.success && activityRes.data) {
          setActivities(activityRes.data);
        }
      } catch (err) {
        console.warn('CMS Dashboard: backend offline, using mock simulator data.', err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toLocaleString();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'download':
        return (
          <div className="cms-activity-icon download">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </div>
        );
      case 'update':
      case 'updated':
        return (
          <div className="cms-activity-icon update">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className="cms-activity-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
          </div>
        );
    }
  };

  return (
    <CMSLayout>
      <main className="cms-main">
        <header className="cms-header">
          <h1>Welcome back, {userName}</h1>
          <p>Here is what's happening with your submissions today.</p>
        </header>

        {/* Stats Grid */}
        <div className="cms-stats-grid">
          <div className="cms-stat-card">
            <div className="cms-stat-title">TOTAL DOCUMENTS UPLOADED</div>
            <div className="cms-stat-row">
              <span className="cms-stat-value">{formatNumber(stats.total_documents?.value || 0)}</span>
              <span className={`cms-stat-trend ${stats.total_documents?.trend || 'up'}`}>
                {stats.total_documents?.trend !== 'neutral' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {stats.total_documents?.trend === 'up' ? (
                      <>
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </>
                    ) : (
                      <>
                        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                        <polyline points="17 18 23 18 23 12"></polyline>
                      </>
                    )}
                  </svg>
                )}
                {stats.total_documents?.change > 0 ? `+${stats.total_documents?.change}` : stats.total_documents?.change}% this month
              </span>
            </div>
          </div>
          <div className="cms-stat-card">
            <div className="cms-stat-title">TOTAL VIEWS</div>
            <div className="cms-stat-row">
              <span className="cms-stat-value">{formatNumber(stats.total_views?.value || 0)}</span>
              <span className={`cms-stat-trend ${stats.total_views?.trend || 'up'}`}>
                {stats.total_views?.trend !== 'neutral' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {stats.total_views?.trend === 'up' ? (
                      <>
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </>
                    ) : (
                      <>
                        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                        <polyline points="17 18 23 18 23 12"></polyline>
                      </>
                    )}
                  </svg>
                )}
                {stats.total_views?.change > 0 ? `+${stats.total_views?.change}` : stats.total_views?.change}% this week
              </span>
            </div>
          </div>
          <div className="cms-stat-card">
            <div className="cms-stat-title">TOTAL DOWNLOADS</div>
            <div className="cms-stat-row">
              <span className="cms-stat-value">{formatNumber(stats.total_downloads?.value || 0)}</span>
              <span className={`cms-stat-trend ${stats.total_downloads?.trend || 'down'}`}>
                {stats.total_downloads?.trend !== 'neutral' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {stats.total_downloads?.trend === 'up' ? (
                      <>
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </>
                    ) : (
                      <>
                        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                        <polyline points="17 18 23 18 23 12"></polyline>
                      </>
                    )}
                  </svg>
                )}
                {stats.total_downloads?.change > 0 ? `+${stats.total_downloads?.change}` : stats.total_downloads?.change}% this week
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
          </div>
          <ul className="cms-activity-list">
            {activities.map((act) => (
              <li key={act.id} className="cms-activity-item">
                {getActivityIcon(act.type)}
                <div className="cms-activity-text">
                  <h4>{act.description}</h4>
                  <p>{act.time_ago || 'recently'}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </CMSLayout>
  );
}