import React, { useState, useEffect } from 'react';
import CMSLayout from './CMSLayout.jsx';
import { getReports, updateReportStatus } from '../../utils/api.js';

const MOCK_REPORTS = [
  {
    id: '1',
    document_title: 'Digital Economy and Financial Inclusion in Rural Indonesia',
    reporter_name: 'John Doe',
    reporter_email: 'john.doe@example.com',
    created_at: '2026-06-11T12:00:00+07:00',
    details: 'The PDF link throws a 404 error when clicked.',
    status: 'open'
  },
  {
    id: '2',
    document_title: 'Sustainable Development Goals Report 2025',
    reporter_name: 'Jane Smith',
    reporter_email: 'jane.smith@ngocorp.org',
    created_at: '2026-06-10T15:30:00+07:00',
    details: 'The file downloaded is corrupted and cannot be opened by Adobe Reader.',
    status: 'open'
  },
  {
    id: '3',
    document_title: 'Climate Action Plan 2024',
    reporter_name: 'Budi Santoso',
    reporter_email: 'b.santoso@undp.org',
    created_at: '2026-06-08T09:15:00+07:00',
    details: 'Link redirects to the homepage instead of the document details.',
    status: 'resolved'
  },
  {
    id: '4',
    document_title: 'Global International Waters Assessment',
    reporter_name: 'Alice Johnson',
    reporter_email: 'alice.j@water.org',
    created_at: '2026-06-05T16:45:00+07:00',
    details: 'The document link is missing entirely from the action button.',
    status: 'open'
  },
  {
    id: '5',
    document_title: 'Humanitarian Aid Guidelines',
    reporter_name: 'Carlos Ray',
    reporter_email: 'carlos.ray@relief.net',
    created_at: '2026-06-01T11:00:00+07:00',
    details: 'The PDF opens, but it seems to be an outdated version from 2020.',
    status: 'in_progress'
  }
];

export default function CMSReports() {
  const [reportsData, setReportsData] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const normalizeReport = (raw) => ({
    id: String(raw.id),
    docTitle: raw.document_title || 'Unknown Document',
    reporterName: raw.reporter_name || 'Anonymous',
    reporterEmail: raw.reporter_email || '',
    dateReported: raw.created_at || new Date().toISOString(),
    details: raw.details || '',
    status: raw.status || 'open'
  });

  const loadReports = async () => {
    setLoading(true);
    try {
      const res = await getReports();
      if (res && res.success && res.data) {
        // Depending on backend design, res.data might be a paginated object or raw list
        const list = Array.isArray(res.data) ? res.data : (res.data.items || []);
        setReportsData(list.map(normalizeReport));
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.warn('CMS Reports: backend offline, using mock simulator data.', err.message);
      setReportsData(MOCK_REPORTS.map(normalizeReport));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      const res = await updateReportStatus(reportId, newStatus.toLowerCase().replace(/\s+/g, '_'));
      if (res && res.success) {
        // update local reportsData list
        setReportsData(prev => prev.map(r => r.id === reportId ? { ...r, status: newStatus } : r));
        if (selectedReport && selectedReport.id === reportId) {
          setSelectedReport(prev => ({ ...prev, status: newStatus }));
        }
      } else {
        throw new Error('Failed to update status on server');
      }
    } catch (err) {
      console.warn('CMS Reports: backend offline. Simulating status update locally.', err.message);
      setReportsData(prev => prev.map(r => r.id === reportId ? { ...r, status: newStatus } : r));
      if (selectedReport && selectedReport.id === reportId) {
        setSelectedReport(prev => ({ ...prev, status: newStatus }));
      }
    }
  };

  const getStatusLabel = (status) => {
    // maps api status code to user-friendly label
    const clean = (status || '').toLowerCase().replace(/_/g, ' ');
    if (clean === 'open') return 'Open';
    if (clean === 'in progress' || clean === 'in_progress') return 'In Progress';
    if (clean === 'resolved') return 'Resolved';
    if (clean === 'on hold' || clean === 'on_hold') return 'On Hold';
    return status || 'Open';
  };

  // Filter reports locally
  const filteredReports = reportsData.filter(r => {
    const matchesSearch = r.docTitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          r.reporterName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          r.reporterEmail.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          r.details.toLowerCase().includes(searchFilter.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && r.status.toLowerCase().replace(/\s+/g, '_') === statusFilter.toLowerCase().replace(/\s+/g, '_');
  });

  return (
    <CMSLayout>
      <main className="cms-main">
        <header className="cms-submissions-header">
          <div className="cms-header-left">
            <h1>Broken Link Reports</h1>
            <p>Manage and track user reports regarding broken documents.</p>
          </div>
        </header>

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
                placeholder="Search reports..." 
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
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="on_hold">On Hold</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <table className="cms-table">
            <thead>
              <tr>
                <th style={{width: '50%'}}>DOCUMENT TITLE</th>
                <th style={{width: '20%'}}>REPORTER</th>
                <th style={{width: '15%'}}>DATE REPORTED</th>
                <th style={{width: '15%'}}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length > 0 ? (
                filteredReports.map((row) => (
                  <tr 
                    key={row.id} 
                    onClick={() => setSelectedReport(row)}
                    style={{ cursor: 'pointer' }}
                    className="cms-table-row-hover"
                    onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td className="cms-col-title">
                      <span className="cms-doc-title-link" style={{ color: 'var(--un-primary, #006699)', fontWeight: '600' }}>{row.docTitle}</span>
                    </td>
                    <td>
                      <div style={{ fontSize: '13px', fontWeight: '500', color: '#334155' }}>{row.reporterName}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{row.reporterEmail}</div>
                    </td>
                    <td className="cms-col-pubdate">
                      {new Date(row.dateReported).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="cms-col-status">
                      <span className={`cms-status-badge ${row.status.toLowerCase().replace(/\s+/g, '-')}`} style={{ 
                        background: row.status.toLowerCase() === 'resolved' ? '#dcfce7' : row.status.toLowerCase() === 'in_progress' ? '#fef9c3' : row.status.toLowerCase() === 'on_hold' ? '#e5e7eb' : '#fee2e2',
                        color: row.status.toLowerCase() === 'resolved' ? '#16a34a' : row.status.toLowerCase() === 'in_progress' ? '#ca8a04' : row.status.toLowerCase() === 'on_hold' ? '#4b5563' : '#dc2626'
                      }}>
                        {getStatusLabel(row.status)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                    No broken link reports found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Table Footer */}
          <div className="cms-table-footer">
            <span className="cms-entries-info">Showing {filteredReports.length} entries</span>
          </div>
        </div>
      </main>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>Report Details</h2>
              <button 
                onClick={() => setSelectedReport(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>DOCUMENT TITLE</label>
              <div style={{ fontSize: '15px', color: '#0f172a', fontWeight: '500' }}>{selectedReport.docTitle}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>REPORTER</label>
                <div style={{ fontSize: '15px', color: '#0f172a', fontWeight: '500' }}>{selectedReport.reporterName}</div>
                <div style={{ fontSize: '13px', color: '#475569' }}>{selectedReport.reporterEmail}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>DATE REPORTED</label>
                <div style={{ fontSize: '15px', color: '#0f172a' }}>
                  {new Date(selectedReport.dateReported).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>REPORT DETAILS</label>
              <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                {selectedReport.details}
              </div>
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>UPDATE STATUS</label>
              <select 
                value={selectedReport.status}
                onChange={(e) => handleStatusChange(selectedReport.id, e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '15px', color: '#0f172a', cursor: 'pointer', background: '#fff' }}
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="on_hold">On Hold</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setSelectedReport(null)}
                style={{ padding: '10px 24px', background: 'var(--un-primary, #006699)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </CMSLayout>
  );
}
