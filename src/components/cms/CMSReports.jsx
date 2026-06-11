import React, { useState } from 'react';
import CMSLayout from './CMSLayout.jsx';

export default function CMSReports() {
  const [reportsData, setReportsData] = useState([
    {
      id: 1,
      docTitle: 'Digital Economy and Financial Inclusion in Rural Indonesia',
      reporterName: 'John Doe',
      reporterEmail: 'john.doe@example.com',
      dateReported: '2026-06-11',
      details: 'The PDF link throws a 404 error when clicked.',
      status: 'Open'
    },
    {
      id: 2,
      docTitle: 'Sustainable Development Goals Report 2025',
      reporterName: 'Jane Smith',
      reporterEmail: 'jane.smith@ngocorp.org',
      dateReported: '2026-06-10',
      details: 'The file downloaded is corrupted and cannot be opened by Adobe Reader.',
      status: 'Open'
    },
    {
      id: 3,
      docTitle: 'Climate Action Plan 2024',
      reporterName: 'Budi Santoso',
      reporterEmail: 'b.santoso@undp.org',
      dateReported: '2026-06-08',
      details: 'Link redirects to the homepage instead of the document details.',
      status: 'Resolved'
    },
    {
      id: 4,
      docTitle: 'Global International Waters Assessment',
      reporterName: 'Alice Johnson',
      reporterEmail: 'alice.j@water.org',
      dateReported: '2026-06-05',
      details: 'The document link is missing entirely from the action button.',
      status: 'Open'
    },
    {
      id: 5,
      docTitle: 'Humanitarian Aid Guidelines',
      reporterName: 'Carlos Ray',
      reporterEmail: 'carlos.ray@relief.net',
      dateReported: '2026-06-01',
      details: 'The PDF opens, but it seems to be an outdated version from 2020.',
      status: 'In Progress'
    },
    {
      id: 6,
      docTitle: 'Gender Equality Strategy',
      reporterName: 'Siti Aminah',
      reporterEmail: 'siti.a@womenempowerment.id',
      dateReported: '2026-05-28',
      details: 'The link leads to a login page requiring admin access.',
      status: 'Resolved'
    },
    {
      id: 7,
      docTitle: 'Emergency Response Protocol v2',
      reporterName: 'Michael Chang',
      reporterEmail: 'm.chang@disaster-response.com',
      dateReported: '2026-05-20',
      details: 'Download button is unresponsive on mobile devices.',
      status: 'Resolved'
    }
  ]);
  
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <CMSLayout>
      <main className="cms-main">
        <header className="cms-submissions-header">
          <div className="cms-header-left">
            <h1>Broken Link Reports</h1>
            <p>Manage and track user reports regarding broken documents.</p>
          </div>
        </header>

        <div className="cms-table-container">
          {/* Filter Bar */}
          <div className="cms-table-filter-bar">
            <div className="cms-search-input-wrapper">
              <svg className="cms-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="Filter reports..." />
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
                <th style={{width: '60%'}}>DOCUMENT TITLE</th>
                <th style={{width: '20%'}}>DATE REPORTED</th>
                <th style={{width: '20%'}}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {reportsData.map((row) => (
                <tr 
                  key={row.id} 
                  onClick={() => setSelectedReport(row)}
                  style={{ cursor: 'pointer' }}
                  className="cms-table-row-hover"
                  onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td className="cms-col-title">
                    <span className="cms-doc-title-link" style={{ color: 'var(--un-primary, #006699)' }}>{row.docTitle}</span>
                  </td>
                  <td className="cms-col-pubdate">
                    {new Date(row.dateReported).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="cms-col-status">
                    <span className={`cms-status-badge ${row.status.toLowerCase().replace(/\s+/g, '-')}`} style={{ 
                      background: row.status === 'Resolved' ? '#dcfce7' : row.status === 'In Progress' ? '#fef9c3' : row.status === 'On Hold' ? '#e5e7eb' : '#fee2e2',
                      color: row.status === 'Resolved' ? '#16a34a' : row.status === 'In Progress' ? '#ca8a04' : row.status === 'On Hold' ? '#4b5563' : '#dc2626'
                    }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Table Footer */}
          <div className="cms-table-footer">
            <span className="cms-entries-info">Showing 1 to {reportsData.length} of {reportsData.length} entries</span>
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
                onChange={(e) => {
                  const newStatus = e.target.value;
                  const updatedData = reportsData.map(r => r.id === selectedReport.id ? { ...r, status: newStatus } : r);
                  setReportsData(updatedData);
                  setSelectedReport({ ...selectedReport, status: newStatus });
                }}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '15px', color: '#0f172a', cursor: 'pointer', background: '#fff' }}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Resolved">Resolved</option>
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
