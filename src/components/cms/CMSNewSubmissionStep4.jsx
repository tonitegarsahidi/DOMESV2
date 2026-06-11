import React, { useState } from 'react';
import CMSLayout from './CMSLayout.jsx';

export default function CMSNewSubmissionStep4() {
  const currentStep = 4;
  const documentTitle = "Digital Economy and Financial Inclusion in Rural Indonesia";
  const [consentChecked, setConsentChecked] = useState(false);

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

          {/* AI pre-fill notice banner */}
          <div className="wiz-ai-banner" style={{ marginBottom: '24px' }}>
            <div className="wiz-ai-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="wiz-ai-text">
              <h3>AI-Powered Pre-fill</h3>
              <p>Some fields have been pre-filled by AI based on your initial document upload. Please review them carefully.</p>
            </div>
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
                    <div className="wiz-s4-file-item" style={{ alignItems: 'flex-start' }}>
                      <div className="wiz-s4-cover-preview" style={{ width: '160px', height: '226px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e2e8f0', flexShrink: 0 }}>
                        <img src="/images/report_cover.png" alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="wiz-s4-file-details">
                        <span className="wiz-s4-file-name" style={{ fontWeight: '600' }}>digital_economy_rural_id.pdf</span>
                        <span className="wiz-s4-file-size" style={{ color: '#64748b', fontSize: '13px' }}>4.2 MB</span>
                        <span style={{ fontSize: '12px', color: '#0ea5e9', marginTop: '4px', display: 'inline-block', padding: '2px 6px', background: '#e0f2fe', borderRadius: '4px' }}>AI Processed</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="wiz-s4-focal-grid">
                  <div>
                    <span className="wiz-s4-label">FOCAL POINT NAME</span>
                    <p className="wiz-s4-val">Budi Santoso</p>
                  </div>
                  <div>
                    <span className="wiz-s4-label">FOCAL POINT EMAIL</span>
                    <p className="wiz-s4-val">b.santoso@undp.org</p>
                  </div>
                  <div>
                    <span className="wiz-s4-label">PHONE NUMBER</span>
                    <p className="wiz-s4-val">+62 812 3456 7890</p>
                  </div>
                  <div className="wiz-s4-focal-full">
                    <span className="wiz-s4-label">DEPARTMENT / OFFICE</span>
                    <p className="wiz-s4-val">Inclusive Growth Unit</p>
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
                      <p className="wiz-s4-val">May 15, 2024</p>
                    </div>
                    <div>
                      <span className="wiz-s4-label">TOTAL PAGES</span>
                      <p className="wiz-s4-val">120 Pages</p>
                    </div>
                  </div>

                  <div className="wiz-s4-row-2col">
                    <div>
                      <span className="wiz-s4-label">STATUS</span>
                      <div className="wiz-s4-status-wrapper">
                        <span className="wiz-s4-status-badge">Published</span>
                      </div>
                    </div>
                    <div>
                      <span className="wiz-s4-label">LANGUAGES SELECTED</span>
                      <div className="wiz-s4-langs-row">
                        <span className="wiz-s4-lang-chip">English</span>
                        <span className="wiz-s4-lang-chip">Bahasa Indonesia</span>
                      </div>
                    </div>
                  </div>

                  <div className="wiz-s4-detail-group">
                    <span className="wiz-s4-label">TAGS / KEYWORDS</span>
                    <div className="wiz-s4-tags-row">
                      <span className="wiz-s4-tag-item">#digital economy</span>
                      <span className="wiz-s4-tag-item">#financial inclusion</span>
                      <span className="wiz-s4-tag-item">#rural development</span>
                      <span className="wiz-s4-tag-item">#fintech</span>
                      <span className="wiz-s4-tag-item">#women empowerment</span>
                    </div>
                  </div>

                  <div className="wiz-s4-detail-group">
                    <span className="wiz-s4-label">SHORT SUMMARY</span>
                    <p className="wiz-s4-val wiz-s4-summary-p">
                      This comprehensive report analyzes the rapid expansion of digital financial services across rural Indonesia. It highlights the profound impact of mobile banking and fintech solutions on local micro-economies, emphasizing significant improvements in women's financial independence and empowerment.
                    </p>
                  </div>

                  <div className="wiz-s4-detail-group">
                    <span className="wiz-s4-label">DETAILED SUMMARY</span>
                    <div className="wiz-s4-val wiz-s4-summary-p" style={{ fontSize: '14px', lineHeight: '1.6', color: '#334155' }} dangerouslySetInnerHTML={{__html: "<b>Executive Overview</b><br><br>This extensive report provides an in-depth analysis of the digital economy's penetration into rural areas of Indonesia, focusing on the critical role of financial inclusion in driving sustainable economic development. As digital infrastructure expands across the archipelago, unprecedented opportunities are emerging for smallholder farmers, micro, small, and medium enterprises (MSMEs), and previously unbanked populations.<br><br><b>Key Findings:</b><ul><li><b>Technological Adoption:</b> Mobile internet penetration in rural regions has surged by 45% over the past three years, laying the groundwork for digital financial services (DFS) adoption.</li><li><b>Economic Impact:</b> Access to digital credit and savings platforms has enabled rural MSMEs to increase their average revenue by approximately 22%, fostering local economic resilience.</li><li><b>Gender Equality:</b> Digital financial inclusion has disproportionately benefited rural women. Female-led enterprises represent 60% of new digital banking accounts, providing them with unprecedented control over household finances and business capital.</li><li><b>Agricultural Supply Chains:</b> Agritech platforms integrated with digital payment systems have reduced middleman dependencies, increasing farmers' profit margins by up to 15%.</li></ul><br><b>Challenges Identified</b><br><br>Despite significant progress, substantial barriers remain. The report identifies three primary challenges hindering universal financial inclusion in rural Indonesia: persistent gaps in digital literacy, inadequate telecommunications infrastructure in the most remote areas (the 3T regions: frontier, outermost, and underdeveloped), and limited trust in formal financial institutions among older demographics. Cybersecurity concerns and the risk of predatory digital lending practices also require urgent regulatory attention.<br><br><b>Strategic Recommendations</b><br><br>To accelerate progress towards the Sustainable Development Goals (SDGs), particularly Goal 1 (No Poverty) and Goal 5 (Gender Equality), the report outlines a multi-stakeholder action plan. We recommend enhanced public-private partnerships to subsidize rural broadband infrastructure. Furthermore, targeted digital literacy campaigns, tailored to local languages and cultural contexts, are essential. Regulatory frameworks must be strengthened to protect vulnerable new consumers while simultaneously fostering fintech innovation. By addressing these critical areas, Indonesia can ensure that the digital revolution serves as an inclusive engine for equitable prosperity across its vast rural landscape, leaving no one behind in the transition to a modern digital economy."}} />
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
                      <span className="wiz-s4-sdg-num" style={{ background: '#E5243B', color: 'white' }}>1</span>
                      <span className="wiz-s4-sdg-label">No Poverty</span>
                    </div>
                    <div className="wiz-s4-sdg-item">
                      <span className="wiz-s4-sdg-num" style={{ background: '#FF3A21', color: 'white' }}>5</span>
                      <span className="wiz-s4-sdg-label">Gender Equality</span>
                    </div>
                    <div className="wiz-s4-sdg-item">
                      <span className="wiz-s4-sdg-num" style={{ background: '#A21942', color: 'white' }}>8</span>
                      <span className="wiz-s4-sdg-label">Decent Work</span>
                    </div>
                    <div className="wiz-s4-sdg-item">
                      <span className="wiz-s4-sdg-num" style={{ background: '#DD1367', color: 'white' }}>10</span>
                      <span className="wiz-s4-sdg-label">Reduced Inequalities</span>
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
                  <p className="wiz-s4-val">World Bank</p>
                </div>

                <div className="wiz-s4-info-group">
                  <span className="wiz-s4-label">JOINT PROGRAMME</span>
                  <p className="wiz-s4-val">Yes</p>
                </div>

                <div className="wiz-s4-info-group">
                  <span className="wiz-s4-label">GEOGRAPHIC SCOPE</span>
                  <p className="wiz-s4-val">National (Indonesia)</p>
                </div>

                <div className="wiz-s4-info-group">
                  <span className="wiz-s4-label">LNOB GROUPS</span>
                  <p className="wiz-s4-val">Women and Girls, Rural populations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Consent */}
          <div className="wiz-section-card" style={{ marginTop: '24px', marginBottom: '50px' }}>
            <div className="wiz-section-header">
              <span className="wiz-section-icon consent-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <h3>Consent</h3>
            </div>

            <div className="wiz-consent-box">
              <p>
                By submitting this document, you confirm that you have the authority to
                share this information and consent to its automated processing by our AI
                systems for classification and data extraction purposes. Data is stored
                securely in compliance with UN data governance policies and applicable
                international standards for data protection.
              </p>
            </div>

            <label className="wiz-consent-check">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
              />
              <span className="wiz-consent-checkmark" />
              <span className="wiz-consent-label">
                I have read and agree to the consent statement. <span className="wiz-required">*</span>
              </span>
            </label>
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
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="wiz-btn-secondary" 
                onClick={() => window.location.href = '/cms/submissions'}
                style={{ background: 'white', border: '1px solid #cbd5e1', color: '#475569', padding: '10px 20px', borderRadius: '6px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                Save as Draft
              </button>
              <button 
                className="wiz-btn-submit" 
                onClick={handleFinishSubmit}
                disabled={!consentChecked}
                style={{ opacity: consentChecked ? 1 : 0.6, cursor: consentChecked ? 'pointer' : 'not-allowed' }}
              >
                Submit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}
