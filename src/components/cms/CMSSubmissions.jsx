import React, { useState, useEffect } from 'react';
import CMSLayout from './CMSLayout.jsx';
import { getSubmissions, publishSubmission, unpublishSubmission, deleteSubmission } from '../../utils/api.js';

const MOCK_SUBMISSIONS = [
  {
    id: '1',
    title: 'Annual Report 2023 - Q4',
    short_description: 'Comprehensive overview of Q4 initiatives and budget allocations for regional operations.',
    status: 'published',
    created_at: '2024-01-15T00:00:00Z',
    agency: 'UNDP',
    author: 'Erlangga Agustino'
  },
  {
    id: '2',
    title: 'Emergency Response Protocol v2',
    short_description: 'Updated guidelines for rapid deployment and resource management during unforeseen crises.',
    status: 'published',
    created_at: '2024-02-20T00:00:00Z',
    agency: 'UNEP',
    author: 'Budi Santoso'
  },
  {
    id: '3',
    title: 'Stakeholder Engagement Framework',
    short_description: 'Framework for improving communication channels with local community leaders.',
    status: 'approved_unpublished',
    created_at: '2026-06-25T10:00:00+07:00',
    agency: 'UNICEF',
    author: 'Ahmad Faisal'
  },
  {
    id: '4',
    title: 'Sustainable Development Goals Report',
    short_description: 'Progress report on SDG achievement across Southeast Asia region.',
    status: 'approved_unpublished',
    created_at: '2026-06-25T10:00:00+07:00',
    agency: 'WHO',
    author: 'Sarah Jenkins'
  },
  {
    id: '5',
    title: 'Climate Action Plan 2024',
    short_description: 'Strategic plan for carbon reduction and sustainability initiatives.',
    status: 'draft',
    created_at: '2026-06-25T10:00:00+07:00',
    agency: 'UNEP',
    author: 'Budi Santoso'
  }
];

export default function CMSSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  
  // Search & Filter
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState(''); // 'delete', 'publish', 'unpublish'
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    // Check search params for success redirect notifications from wizard
    const params = new URLSearchParams(window.location.search);
    const successDoc = params.get('success');
    if (successDoc) {
      setNotification(`Dokumen "${decodeURIComponent(successDoc)}" telah disimpan, dan akan direview oleh admin sebelum dipublikasi`);
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    const storedMessage = sessionStorage.getItem('cms_success_message');
    if (storedMessage) {
      setNotification(storedMessage);
      sessionStorage.removeItem('cms_success_message');
    }
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const res = await getSubmissions(statusFilter, searchFilter);
      if (res && res.success && res.data) {
        const list = Array.isArray(res.data) ? res.data : (res.data.items || []);
        setSubmissions(list);
      } else {
        throw new Error('Failed to fetch from API');
      }
    } catch (err) {
      console.warn('CMS Submissions: backend offline, using mock simulator data.', err.message);
      // Filter mock data locally
      let list = [...MOCK_SUBMISSIONS];
      if (statusFilter !== 'all') {
        list = list.filter(s => s.status === statusFilter);
      }
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        list = list.filter(s => s.title.toLowerCase().includes(q) || s.short_description.toLowerCase().includes(q));
      }
      setSubmissions(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      loadSubmissions();
    }, 400); // debounce user search inputs
    return () => clearTimeout(handler);
  }, [searchFilter, statusFilter]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleActionClick = (type, doc) => {
    setActionType(type);
    setSelectedDoc(doc);
    setIsActionModalOpen(true);
  };

  const confirmAction = async () => {
    if (!selectedDoc) return;

    try {
      if (actionType === 'delete') {
        const res = await deleteSubmission(selectedDoc.id);
        if (res && res.success) {
          showNotification(`Document "${selectedDoc.title}" has been successfully deleted.`);
          loadSubmissions();
        } else {
          throw new Error('Delete failed');
        }
      } else if (actionType === 'publish') {
        const res = await publishSubmission(selectedDoc.id);
        if (res && res.success) {
          showNotification(`Document "${selectedDoc.title}" has been successfully published.`);
          loadSubmissions();
        } else {
          throw new Error('Publish failed');
        }
      } else if (actionType === 'unpublish') {
        const res = await unpublishSubmission(selectedDoc.id);
        if (res && res.success) {
          showNotification(`Document "${selectedDoc.title}" has been successfully unpublished.`);
          loadSubmissions();
        } else {
          throw new Error('Unpublish failed');
        }
      }
    } catch (err) {
      console.warn(`CMS Submissions: backend offline. Simulating action "${actionType}" locally.`, err.message);
      
      // Simulate locally
      if (actionType === 'delete') {
        const idx = MOCK_SUBMISSIONS.findIndex(s => s.id === selectedDoc.id);
        if (idx !== -1) MOCK_SUBMISSIONS.splice(idx, 1);
        showNotification(`[Simulated] Document "${selectedDoc.title}" has been deleted.`);
      } else if (actionType === 'publish') {
        const idx = MOCK_SUBMISSIONS.findIndex(s => s.id === selectedDoc.id);
        if (idx !== -1) MOCK_SUBMISSIONS[idx].status = 'published';
        showNotification(`[Simulated] Document "${selectedDoc.title}" has been published.`);
      } else if (actionType === 'unpublish') {
        const idx = MOCK_SUBMISSIONS.findIndex(s => s.id === selectedDoc.id);
        if (idx !== -1) MOCK_SUBMISSIONS[idx].status = 'approved_unpublished';
        showNotification(`[Simulated] Document "${selectedDoc.title}" has been unpublished.`);
      }
      loadSubmissions();
    }

    setIsActionModalOpen(false);
    setSelectedDoc(null);
  };

  const getStatusLabel = (status) => {
    if (status === 'published') return 'Published';
    if (status === 'approved_unpublished') return 'Approved - Unpublished';
    if (status === 'draft') return 'Draft';
    if (status === 'pending_review') return 'Pending Review';
    return status;
  };

  return (
    <CMSLayout>
      <main className="cms-main">
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

        <div className="cms-table-container" style={{ position: 'relative' }}>
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

          {/* Filter Bar */}
          <div className="cms-table-filter-bar" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div className="cms-search-input-wrapper" style={{ flex: 1 }}>
              <svg className="cms-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search submissions by title..." 
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: '#64748b' }}>Status:</span>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Submissions</option>
                <option value="draft">Draft</option>
                <option value="pending_review">Pending Review</option>
                <option value="published">Published</option>
                <option value="approved_unpublished">Approved - Unpublished</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <table className="cms-table">
            <thead>
              <tr>
                <th style={{width: '5%', textAlign: 'center'}}>#</th>
                <th style={{width: '25%'}}>TITLE</th>
                <th style={{width: '35%'}}>SHORT DESCRIPTION</th>
                <th style={{width: '15%'}}>DATE ADDED</th>
                <th style={{width: '10%'}}>STATUS</th>
                <th style={{width: '10%', textAlign: 'center'}}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length > 0 ? (
                submissions.map((row, index) => (
                  <tr key={row.id} className={row.status === 'draft' ? 'cms-row-draft' : ''}>
                    <td style={{textAlign: 'center', color: '#64748b', fontWeight: '500'}}>{index + 1}</td>
                    <td className="cms-col-title">
                      <span className="cms-doc-title-link" style={{ fontWeight: '600', color: '#1e293b' }}>{row.title}</span>
                    </td>
                    <td className="cms-col-desc" style={{ color: '#475569', fontSize: '13px' }}>{row.short_description}</td>
                    <td className="cms-col-pubdate">
                      {row.created_at ? new Date(row.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
                    </td>
                    <td className="cms-col-status">
                      <span className={`cms-status-badge ${row.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {getStatusLabel(row.status)}
                      </span>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <div className="cms-actions-group" style={{justifyContent: 'center', gap: '8px'}}>
                        <button 
                          className="cms-action-btn-icon" 
                          aria-label="Edit"
                          onClick={() => window.location.href = `/cms/submissions/new/step-1?edit=${row.id}`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                          </svg>
                        </button>
                        <button 
                          className="cms-action-btn-icon cms-delete" 
                          aria-label="Delete"
                          onClick={() => handleActionClick('delete', row)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                        
                        {row.status === 'published' ? (
                          <button 
                            className="cms-action-btn-icon"
                            title="Unpublish"
                            onClick={() => handleActionClick('unpublish', row)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="9" y1="9" x2="15" y2="15"></line>
                              <line x1="15" y1="9" x2="9" y2="15"></line>
                            </svg>
                          </button>
                        ) : row.status === 'approved_unpublished' ? (
                          <button 
                            className="cms-action-btn-icon"
                            title="Publish"
                            onClick={() => handleActionClick('publish', row)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                              <polyline points="9 11 12 14 22 4"></polyline>
                              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                    No submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Table Footer */}
          <div className="cms-table-footer">
            <span className="cms-entries-info">Showing {submissions.length} entries</span>
          </div>
        </div>
      </main>

      {/* Action Confirmation Modal */}
      {isActionModalOpen && selectedDoc && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', color: '#0f172a' }}>
              {actionType === 'delete' ? 'Delete Document' : actionType === 'publish' ? 'Publish Document' : 'Unpublish Document'}
            </h2>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
              Are you sure you want to {actionType} <strong>"{selectedDoc.title}"</strong>?
              {actionType === 'delete' && ' This action cannot be undone.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                onClick={() => { setIsActionModalOpen(false); setSelectedDoc(null); }}
                style={{ padding: '10px 20px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={confirmAction}
                style={{ 
                  padding: '10px 20px', 
                  background: actionType === 'delete' ? '#ef4444' : actionType === 'publish' ? '#16a34a' : '#d97706', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '6px', 
                  fontWeight: '600', 
                  cursor: 'pointer' 
                }}
              >
                {actionType === 'delete' ? 'Delete' : actionType === 'publish' ? 'Publish' : 'Unpublish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </CMSLayout>
  );
}