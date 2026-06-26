import React, { useState, useEffect } from 'react';
import CMSLayout from './CMSLayout.jsx';
import { getCMSAnalyticsSummary, getCMSTopDownloads, getCMSTopViews } from '../../utils/api.js';

const DEFAULT_DOWNLOADS = [
  { title: 'UNICEF Annual Report 2023 - Indonesia', count: '4,250', percentage: 85 },
  { title: 'Humanitarian Response Plan Q3', count: '3,120', percentage: 62.4 },
  { title: 'Climate Action Guidelines for NGOs', count: '2,890', percentage: 57.8 },
  { title: 'Disaster Risk Reduction Framework', count: '1,950', percentage: 39 },
  { title: 'Health Sector Bulletin - August 2023', count: '1,240', percentage: 24.8 }
];

const DEFAULT_VIEWS = [
  { name: 'Sustainable Development Goals Overview', category: 'Policy', views: '12,405' },
  { name: 'UNICEF Annual Report 2023 - Indonesia', category: 'Report', views: '9,850' },
  { name: 'Gender Equality Strategy Document', category: 'Strategy', views: '8,210' },
  { name: 'Climate Action Guidelines for NGOs', category: 'Guidelines', views: '7,940' },
  { name: 'Emergency Response Contacts Directory', category: 'Directory', views: '6,520' }
];

export default function CMSAnalytics() {
  const [period, setPeriod] = useState('30d');
  const [stats, setStats] = useState({
    downloads: { value: 24592, change: 12.5, trend: 'up' },
    views: { value: 89401, change: 8.2, trend: 'up' },
    activeUsers: { value: 3240, change: -2.1, trend: 'down' }
  });
  const [topDownloads, setTopDownloads] = useState(DEFAULT_DOWNLOADS);
  const [topViews, setTopViews] = useState(DEFAULT_VIEWS);
  const [loading, setLoading] = useState(true);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      const [summaryRes, downloadsRes, viewsRes] = await Promise.all([
        getCMSAnalyticsSummary(period),
        getCMSTopDownloads(),
        getCMSTopViews()
      ]);

      if (summaryRes && summaryRes.success && summaryRes.data) {
        setStats({
          downloads: summaryRes.data.downloads || stats.downloads,
          views: summaryRes.data.views || stats.views,
          activeUsers: summaryRes.data.active_users || stats.activeUsers
        });
      }

      if (downloadsRes && downloadsRes.success && Array.isArray(downloadsRes.data)) {
        const maxVal = downloadsRes.data.reduce((max, cur) => Math.max(max, cur.downloads || 0), 1);
        const mapped = downloadsRes.data.map(item => ({
          title: item.title,
          count: (item.downloads || 0).toLocaleString(),
          percentage: Math.min(100, Math.round(((item.downloads || 0) / maxVal) * 100))
        }));
        setTopDownloads(mapped);
      }

      if (viewsRes && viewsRes.success && Array.isArray(viewsRes.data)) {
        const mapped = viewsRes.data.map(item => ({
          name: item.title,
          category: item.type || 'Document',
          views: (item.views || 0).toLocaleString()
        }));
        setTopViews(mapped);
      }
    } catch (err) {
      console.warn('CMS Analytics: backend offline, using mock stats simulator.', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalyticsData();
  }, [period]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toLocaleString();
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
            background: 'rgba(255, 255, 255, 0.6)',
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
        <header className="cms-analytics-header">
          <div className="cms-header-left">
            <h1>Analytics Overview</h1>
            <p>Track document performance and user engagement metrics.</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Period:</span>
            <select 
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                color: '#334155',
                background: 'white',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="12m">Last 12 Months</option>
            </select>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="cms-stats-grid">
          <div className="cms-stat-card">
            <div className="cms-stat-title">TOTAL DOWNLOADS</div>
            <div className="cms-stat-row">
              <span className="cms-stat-value">{formatNumber(stats.downloads?.value || 0)}</span>
              <span className={`cms-stat-trend ${stats.downloads?.trend || 'up'}`}>
                {stats.downloads?.trend !== 'neutral' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {stats.downloads?.trend === 'up' ? (
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
                {stats.downloads?.change > 0 ? `+${stats.downloads?.change}` : stats.downloads?.change}% vs previous
              </span>
            </div>
          </div>
          <div className="cms-stat-card">
            <div className="cms-stat-title">TOTAL VIEWS</div>
            <div className="cms-stat-row">
              <span className="cms-stat-value">{formatNumber(stats.views?.value || 0)}</span>
              <span className={`cms-stat-trend ${stats.views?.trend || 'up'}`}>
                {stats.views?.trend !== 'neutral' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {stats.views?.trend === 'up' ? (
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
                {stats.views?.change > 0 ? `+${stats.views?.change}` : stats.views?.change}% vs previous
              </span>
            </div>
          </div>
          <div className="cms-stat-card">
            <div className="cms-stat-title">ACTIVE USERS</div>
            <div className="cms-stat-row">
              <span className="cms-stat-value">{formatNumber(stats.activeUsers?.value || 0)}</span>
              <span className={`cms-stat-trend ${stats.activeUsers?.trend || 'down'}`}>
                {stats.activeUsers?.trend !== 'neutral' && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {stats.activeUsers?.trend === 'up' ? (
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
                {stats.activeUsers?.change > 0 ? `+${stats.activeUsers?.change}` : stats.activeUsers?.change}% vs previous
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
