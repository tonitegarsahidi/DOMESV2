import React, { useState, useEffect } from 'react';
import CMSLayout from './CMSLayout.jsx';

export default function CMSSubmissions() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Check search params
    const params = new URLSearchParams(window.location.search);
    const successDoc = params.get('success');
    if (successDoc) {
      setNotification(`dokumen ${decodeURIComponent(successDoc)} telah disimpan, dan akan direview oleh admin sebelum dipublikasi`);
      // Clean up URL parameter without page reload
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    // Fallback/alternative: check sessionStorage
    const storedMessage = sessionStorage.getItem('cms_success_message');
    if (storedMessage) {
      setNotification(storedMessage);
      sessionStorage.removeItem('cms_success_message');
    }
  }, []);

  const submissionsData = [
    {
      id: 1,
      title: 'Annual Report 2023 - Q4',
      description: 'Comprehensive overview of Q4 initiatives and budget allocations for regional operations.',
      status: 'Published',
      pubDate: '2024-01-15',
      actions: ['edit', 'view', 'delete']
    },
    {
      id: 2,
      title: 'Emergency Response Protocol v2',
      description: 'Updated guidelines for rapid deployment and resource management during unforeseen crises.',
      status: 'Published',
      pubDate: '2024-02-20',
      actions: ['edit', 'view', 'delete']
    },
    {
      id: 3,
      title: 'Stakeholder Engagement Framework',
      description: 'Framework for improving communication channels with local community leaders.',
      status: 'Approved - Unpublished',
      pubDate: null,
      actions: ['edit', 'view', 'delete']
    },
    {
      id: 4,
      title: 'Sustainable Development Goals Report',
      description: 'Progress report on SDG achievement across Southeast Asia region.',
      status: 'Approved - Unpublished',
      pubDate: null,
      actions: ['edit', 'view', 'delete']
    },
    {
      id: 5,
      title: 'Climate Action Plan 2024',
      description: 'Strategic plan for carbon reduction and sustainability initiatives.',
      status: 'Draft',
      pubDate: null,
      actions: ['view', 'edit', 'delete']
    },
    {
      id: 6,
      title: 'Humanitarian Aid Guidelines',
      description: 'Updated standards for humanitarian aid distribution in conflict zones.',
      status: 'Draft',
      pubDate: null,
      actions: ['view', 'edit', 'delete']
    },
    {
      id: 7,
      title: 'Archived Policy Document 2021',
      description: 'Historical record of internal compliance standards prior to the 2022 overhaul.',
      status: 'Draft',
      pubDate: '2021-06-10',
      actions: ['view', 'edit', 'delete']
    },
    {
      id: 8,
      title: 'Gender Equality Strategy',
      description: "Initiatives to promote gender parity and women's empowerment programs.",
      status: 'Approved - Unpublished',
      pubDate: null,
      actions: ['edit', 'view', 'delete']
    }
  ];

  return (
    <CMSLayout>
      <main className="cms-main">
        {notification && (
          <div className="cms-notification-success">
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

        <header className="cms-submissions-header">
          <div className="cms-header-left">
            <h1>Submissions</h1>
            <p>Manage and track all document submissions.</p>
          </div>
          <a href="/cms/submissions/new/step-1" className="cms-btn-primary cms-new-doc-btn" style={{textDecoration: 'none'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: '8px'}}>
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Document
          </a>
        </header>

        <div className="cms-table-container">
          {/* Filter Bar */}
          <div className="cms-table-filter-bar">
            <div className="cms-search-input-wrapper">
              <svg className="cms-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="Filter submissions..." />
            </div>
            <button className="cms-btn-filter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filters
            </button>
          </div>

          {/* Table */}
          <table className="cms-table">
            <thead>
              <tr>
                <th style={{width: '5%', textAlign: 'center'}}>#</th>
                <th style={{width: '20%'}}>TITLE</th>
                <th style={{width: '30%'}}>SHORT DESCRIPTION</th>
                <th style={{width: '13%'}}>DATE OF PUBLICATION</th>
                <th style={{width: '15%'}}>STATUS</th>
                <th style={{width: '8%', textAlign: 'center'}}>ACTIONS</th>
                <th style={{width: '9%', textAlign: 'center'}}>MANAGE</th>
              </tr>
            </thead>
            <tbody>
              {submissionsData.map((row, index) => (
                <tr key={row.id} className={row.status === 'Draft' ? 'cms-row-draft' : ''}>
                  <td style={{textAlign: 'center', color: '#64748b', fontWeight: '500'}}>{index + 1}</td>
                  <td className="cms-col-title">
                    <span className="cms-doc-title-link">{row.title}</span>
                  </td>
                  <td className="cms-col-desc">{row.description}</td>
                  <td className="cms-col-pubdate">
                    {row.pubDate ? new Date(row.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
                  </td>
                  <td className="cms-col-status">
                    <span className={`cms-status-badge ${row.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{textAlign: 'center'}}>
                    <div className="cms-actions-group" style={{justifyContent: 'center'}}>
                      {row.actions.map((act, actIndex) => {
                        if (act === 'edit') {
                          return (
                            <button key={actIndex} className="cms-action-btn-icon" aria-label="Edit">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                              </svg>
                            </button>
                          );
                        } else if (act === 'delete') {
                          return (
                            <button key={actIndex} className="cms-action-btn-icon cms-delete" aria-label="Delete">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                            </button>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </td>
                  <td style={{textAlign: 'center'}}>
                    {row.status === 'Published' ? (
                      <button 
                        className="cms-btn-small"
                        style={{
                          background: '#fef3c7',
                          color: '#d97706',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Unpublish
                      </button>
                    ) : row.status === 'Approved - Unpublished' ? (
                      <button 
                        className="cms-btn-small"
                        style={{
                          background: '#dcfce7',
                          color: '#16a34a',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Publish
                      </button>
                    ) : (
                      <span style={{color: '#9ca3af', fontSize: '12px'}}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Table Footer */}
          <div className="cms-table-footer">
            <span className="cms-entries-info">Showing 1 to {submissionsData.length} of {submissionsData.length} entries</span>
            <div className="cms-table-pagination">
              <button className="cms-pag-nav" aria-label="Previous" disabled>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="cms-pag-num active">1</button>
              <button className="cms-pag-nav" aria-label="Next" disabled>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </CMSLayout>
  );
}