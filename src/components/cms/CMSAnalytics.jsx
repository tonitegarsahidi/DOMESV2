import React from 'react';
import CMSLayout from './CMSLayout.jsx';

export default function CMSAnalytics() {
  const topDownloads = [
    { title: 'UNICEF Annual Report 2023 - Indonesia', count: '4,250', percentage: 85 },
    { title: 'Humanitarian Response Plan Q3', count: '3,120', percentage: 62.4 },
    { title: 'Climate Action Guidelines for NGOs', count: '2,890', percentage: 57.8 },
    { title: 'Disaster Risk Reduction Framework', count: '1,950', percentage: 39 },
    { title: 'Health Sector Bulletin - August 2023', count: '1,240', percentage: 24.8 }
  ];

  const topViews = [
    { name: 'Sustainable Development Goals Overview', category: 'Policy', views: '12,405' },
    { name: 'UNICEF Annual Report 2023 - Indonesia', category: 'Report', views: '9,850' },
    { name: 'Gender Equality Strategy Document', category: 'Strategy', views: '8,210' },
    { name: 'Climate Action Guidelines for NGOs', category: 'Guidelines', views: '7,940' },
    { name: 'Emergency Response Contacts Directory', category: 'Directory', views: '6,520' }
  ];

  return (
    <CMSLayout>
      <main className="cms-main">
        {/* Header */}
        <header className="cms-analytics-header">
          <div className="cms-header-left">
            <h1>Analytics Overview</h1>
            <p>Track document performance and user engagement metrics.</p>
          </div>
          <div className="cms-dropdown-filter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px', color: '#64748b'}}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Last 30 Days</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '8px', color: '#64748b'}}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="cms-stats-grid">
          <div className="cms-stat-card">
            <div className="cms-stat-title">TOTAL DOWNLOADS</div>
            <div className="cms-stat-row">
              <span className="cms-stat-value">24,592</span>
              <span className="cms-stat-trend positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                +12.5% vs previous 30 days
              </span>
            </div>
          </div>
          <div className="cms-stat-card">
            <div className="cms-stat-title">TOTAL VIEWS</div>
            <div className="cms-stat-row">
              <span className="cms-stat-value">89,401</span>
              <span className="cms-stat-trend positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                +8.2% vs previous 30 days
              </span>
            </div>
          </div>
          <div className="cms-stat-card">
            <div className="cms-stat-title">ACTIVE USERS</div>
            <div className="cms-stat-row">
              <span className="cms-stat-value">3,240</span>
              <span className="cms-stat-trend negative">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                  <polyline points="17 18 23 18 23 12"></polyline>
                </svg>
                -2.1% vs previous 30 days
              </span>
            </div>
          </div>
        </div>

        {/* Content Columns */}
        <div className="cms-analytics-grid">
          {/* Top Downloads */}
          <div className="cms-analytics-card">
            <div className="cms-card-header">
              <h2>Top Downloads</h2>
              <a href="#" className="cms-view-all">
                View All
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '4px'}}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
            <div className="cms-card-body">
              <div className="cms-progress-list">
                {topDownloads.map((item, index) => (
                  <div key={index} className="cms-progress-item">
                    <div className="cms-progress-labels">
                      <span className="cms-progress-title">{item.title}</span>
                      <span className="cms-progress-value">{item.count}</span>
                    </div>
                    <div className="cms-progress-bar-bg">
                      <div className="cms-progress-bar-fill" style={{width: `${item.percentage}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Views */}
          <div className="cms-analytics-card">
            <div className="cms-card-header">
              <h2>Top Views</h2>
              <a href="#" className="cms-view-all">
                View All
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '4px'}}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
            <div className="cms-card-body">
              <table className="cms-mini-table">
                <thead>
                  <tr>
                    <th>DOCUMENT NAME</th>
                    <th>CATEGORY</th>
                    <th style={{textAlign: 'right'}}>VIEWS</th>
                  </tr>
                </thead>
                <tbody>
                  {topViews.map((item, index) => (
                    <tr key={index}>
                      <td className="cms-mini-table-name">{item.name}</td>
                      <td>{item.category}</td>
                      <td className="cms-mini-table-value">{item.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </CMSLayout>
  );
}
