import React from 'react';
import CMSLayout from './CMSLayout.jsx';

export default function CMSNewSubmissionStep4() {
  const currentStep = 4;
  const documentTitle = "Annual Progress Report on Sustainable Agriculture 2023";

  const progressSteps = [
    { num: 1, label: 'Files' },
    { num: 2, label: 'Details' },
    { num: 3, label: 'Alignment' },
    { num: 4, label: 'Review' },
  ];

  const stepIcon = (type) => {
    switch (type) {
      case 'file':
        return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>);
      case 'edit':
        return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>);
      case 'target':
        return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>);
      case 'check':
        return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>);
      default: return null;
    }
  };

  const handleFinishSubmit = () => {
    window.location.href = `/cms/submissions?success=${encodeURIComponent(documentTitle)}`;
  };

  return (
    <CMSLayout>
      <div className="wiz-page">
        {/* ===== MAIN AREA ===== */}
        <div className="wiz-main">
          {/* Progress bar */}
          <div className="wiz-progress-bar">
            {progressSteps.map((ps, idx) => (
              <React.Fragment key={ps.num}>
                <a
                  href={`/cms/submissions/new/step-${ps.num}`}
                  className={`wiz-progress-step ${ps.num === currentStep ? 'active' : ''} ${ps.num < currentStep ? 'completed' : ''}`}
                >
                  <span className="wiz-progress-num">{ps.num}</span>
                  <span className="wiz-progress-label">{ps.label}</span>
                </a>
                {idx < progressSteps.length - 1 && (
                  <div className={`wiz-progress-connector ${ps.num < currentStep ? 'active' : ''}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Two-Column Layout */}
          <div className="wiz-s4-layout">
            {/* Left Column: General Info & Doc Details */}
            <div className="wiz-s4-col-left">
              {/* General Information Card */}
              <div className="wiz-s4-card">
                <div className="wiz-s4-card-header">
                  <div className="wiz-s4-header-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="wiz-s4-card-icon">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="16" x2="12" y2="12"/>
                      <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                    <h3>General Information</h3>
                  </div>
                  <a href="/cms/submissions/new/step-1" className="wiz-s4-edit-link">Edit</a>
                </div>

                <div className="wiz-s4-section">
                  <span className="wiz-s4-label">UPLOADED FILES</span>
                  <div className="wiz-s4-file-list">
                    <div className="wiz-s4-file-item">
                      <div className="wiz-s4-file-icon wiz-pdf">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                        </svg>
                      </div>
                      <div className="wiz-s4-file-details">
                        <span className="wiz-s4-file-name">annual_progress_report_2023_final.pdf</span>
                        <span className="wiz-s4-file-size">4.2 MB</span>
                      </div>
                    </div>

                    <div className="wiz-s4-file-item">
                      <div className="wiz-s4-file-icon wiz-docx">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                        </svg>
                      </div>
                      <div className="wiz-s4-file-details">
                        <span className="wiz-s4-file-name">annex_1_data_tables.docx</span>
                        <span className="wiz-s4-file-size">1.1 MB</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="wiz-s4-focal-grid">
                  <div>
                    <span className="wiz-s4-label">FOCAL POINT NAME</span>
                    <p className="wiz-s4-val">Elena Rodriguez</p>
                  </div>
                  <div>
                    <span className="wiz-s4-label">FOCAL POINT EMAIL</span>
                    <p className="wiz-s4-val">e.rodriguez@undp.org</p>
                  </div>
                  <div className="wiz-s4-focal-full">
                    <span className="wiz-s4-label">DEPARTMENT / OFFICE</span>
                    <p className="wiz-s4-val">Sustainable Development Unit, Latin America Hub</p>
                  </div>
                </div>
              </div>

              {/* Document Details Card */}
              <div className="wiz-s4-card">
                <div className="wiz-s4-card-header">
                  <div className="wiz-s4-header-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="wiz-s4-card-icon">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                    <h3>Document Details</h3>
                  </div>
                  <a href="/cms/submissions/new/step-2" className="wiz-s4-edit-link">Edit</a>
                </div>

                <div className="wiz-s4-details-section">
                  <div className="wiz-s4-detail-group">
                    <span className="wiz-s4-label">TITLE OF REPORT</span>
                    <h4 className="wiz-s4-doc-title">{documentTitle}</h4>
                  </div>

                  <div className="wiz-s4-row-2col">
                    <div>
                      <span className="wiz-s4-label">PUBLICATION DATE</span>
                      <p className="wiz-s4-val">October 15, 2023</p>
                    </div>
                    <div>
                      <span className="wiz-s4-label">STATUS</span>
                      <div className="wiz-s4-status-wrapper">
                        <span className="wiz-s4-status-badge">Published</span>
                      </div>
                    </div>
                  </div>

                  <div className="wiz-s4-row-2col">
                    <div>
                      <span className="wiz-s4-label">LANGUAGES SELECTED</span>
                      <div className="wiz-s4-langs-row">
                        <span className="wiz-s4-lang-chip">English</span>
                        <span className="wiz-s4-lang-chip">Spanish</span>
                      </div>
                    </div>
                    <div>
                      <span className="wiz-s4-label">TAGS / KEYWORDS</span>
                      <div className="wiz-s4-tags-row">
                        <span className="wiz-s4-tag-item">#Agriculture</span>
                        <span className="wiz-s4-tag-item">#Sustainability</span>
                        <span className="wiz-s4-tag-item">#LATAM</span>
                      </div>
                    </div>
                  </div>

                  <div className="wiz-s4-detail-group">
                    <span className="wiz-s4-label">SHORT SUMMARY</span>
                    <p className="wiz-s4-val wiz-s4-summary-p">
                      A comprehensive overview of agricultural sustainability initiatives implemented across
                      Latin America in 2023, highlighting key achievements in water conservation and crop
                      yield improvements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Classification */}
            <div className="wiz-s4-col-right">
              <div className="wiz-s4-card">
                <div className="wiz-s4-card-header">
                  <div className="wiz-s4-header-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="wiz-s4-card-icon">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="6"/>
                      <circle cx="12" cy="12" r="2"/>
                    </svg>
                    <h3>Classification</h3>
                  </div>
                  <a href="/cms/submissions/new/step-3" className="wiz-s4-edit-link">Edit</a>
                </div>

                <div className="wiz-s4-section">
                  <span className="wiz-s4-label">SUSTAINABLE DEVELOPMENT GOALS</span>
                  <div className="wiz-s4-sdg-list">
                    <div className="wiz-s4-sdg-item">
                      <span className="wiz-s4-sdg-num red-bg">2</span>
                      <span className="wiz-s4-sdg-label">Zero Hunger</span>
                    </div>
                    <div className="wiz-s4-sdg-item">
                      <span className="wiz-s4-sdg-num green-bg">13</span>
                      <span className="wiz-s4-sdg-label">Climate Action</span>
                    </div>
                  </div>
                </div>

                <div className="wiz-s4-info-group">
                  <span className="wiz-s4-label">LEAD AGENCY</span>
                  <div className="wiz-s4-val-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="wiz-s4-val-svg">
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                      <line x1="9" y1="22" x2="9" y2="16"/>
                      <line x1="15" y1="22" x2="15" y2="16"/>
                      <line x1="9" y1="16" x2="15" y2="16"/>
                      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01"/>
                    </svg>
                    <span>UNDP</span>
                  </div>
                </div>

                <div className="wiz-s4-info-group">
                  <span className="wiz-s4-label">OTHER AGENCIES INVOLVED</span>
                  <p className="wiz-s4-val">FAO, UNEP</p>
                </div>

                <div className="wiz-s4-info-group">
                  <span className="wiz-s4-label">JOINT PROGRAMME</span>
                  <p className="wiz-s4-val">Yes</p>
                </div>

                <div className="wiz-s4-info-group">
                  <span className="wiz-s4-label">GEOGRAPHIC SCOPE</span>
                  <p className="wiz-s4-val">Regional (Latin America)</p>
                </div>

                <div className="wiz-s4-info-group">
                  <span className="wiz-s4-label">LNOB GROUPS</span>
                  <p className="wiz-s4-val">Rural populations, Indigenous peoples</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="wiz-footer">
            <a href="/cms/submissions/new/step-3" className="wiz-btn-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back
            </a>
            <button className="wiz-btn-submit" onClick={handleFinishSubmit}>
              Submit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}
