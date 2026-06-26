import React, { useState, useEffect } from 'react';
import CMSLayout from './CMSLayout.jsx';
import { createSubmission } from '../../utils/api.js';

export default function CMSNewSubmissionStep4() {
  const currentStep = 4;
  const [consentChecked, setConsentChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // States loaded from sessionStorage
  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});
  const [step3Data, setStep3Data] = useState({});

  useEffect(() => {
    try {
      const s1 = sessionStorage.getItem('domes_submission_step1');
      const s2 = sessionStorage.getItem('domes_submission_step2');
      const s3 = sessionStorage.getItem('domes_submission_step3');
      if (s1) setStep1Data(JSON.parse(s1));
      if (s2) setStep2Data(JSON.parse(s2));
      if (s3) setStep3Data(JSON.parse(s3));
    } catch (e) {
      console.error('Error loading wizard states:', e);
    }
  }, []);

  const title = step2Data.title || "Digital Economy and Financial Inclusion in Rural Indonesia";
  const primaryFileName = step1Data.primaryFileName || "digital_economy_rural_id.pdf";
  const primaryFileSizeStr = step1Data.primaryFileSize ? `${(step1Data.primaryFileSize / 1024 / 1024).toFixed(2)} MB` : "4.2 MB";
  const coverFileName = step1Data.coverFileName || "";
  const externalUrl = step1Data.externalUrl || "";
  
  const focalName = step2Data.focalName || "Budi Santoso";
  const focalEmail = step2Data.focalEmail || "b.santoso@undp.org";
  const focalPhone = step2Data.focalPhone || "+62 812 3456 7890";
  const focalDept = step2Data.focalDept || "Inclusive Growth Unit";
  const pubDate = step2Data.pubDate || "2024-05-15";
  const totalPages = step2Data.totalPages || "120";
  const pubStatus = step2Data.pubStatus || "published";
  const shortSummary = step2Data.shortSummary || "This comprehensive report analyzes the rapid expansion of digital financial services across rural Indonesia. It highlights the profound impact of mobile banking and fintech solutions on local micro-economies, emphasizing significant improvements in women's financial independence and empowerment.";
  const summaryHtml = step2Data.summary || "<b>Executive Overview</b><br><br>Detailed summary...";
  const tagsList = step2Data.tags || ['digital economy', 'financial inclusion', 'rural development', 'fintech', 'women empowerment'];

  // step 3 alignment data
  const selectedSDGs = step3Data.selectedSDGs || [1, 5, 8, 10];
  const selectedSectors = step3Data.selectedSectors || ['Economic Development', 'Innovation and Technology', 'Rural and Regional Development'];
  const selectedAgencies = step3Data.selectedAgencies || ['UNDP', 'World Bank'];
  const worksWithNonUNPartners = step3Data.worksWithNonUNPartners || 'yes';
  const nonUNPartners = step3Data.nonUNPartners || [
    { type: 'Government', name: 'Ministry of Villages' },
    { type: 'Consulting Firm', name: 'GoTo Group' }
  ];
  const selectedThematic = step3Data.selectedThematic || ['Inclusive Economic Transformation'];
  const selectedLNOB = step3Data.selectedLNOB || ['Women and Girls'];
  const otherLNOB = step3Data.otherLNOB || 'Rural populations';
  const selectedJointProgrammes = step3Data.selectedJointProgrammes || ['Climate Village Project (PROKLIM)'];

  // SDG metadata
  const sdgNames = {
    1: 'No Poverty', 2: 'Zero Hunger', 3: 'Good Health', 4: 'Quality Education',
    5: 'Gender Equality', 6: 'Clean Water', 7: 'Affordable Energy', 8: 'Decent Work',
    9: 'Industry & Innovation', 10: 'Reduced Inequalities', 11: 'Sustainable Cities',
    12: 'Responsible Consumption', 13: 'Climate Action', 14: 'Life Below Water',
    15: 'Life on Land', 16: 'Peace & Justice', 17: 'Partnerships'
  };

  const sdgColors = {
    1: '#E5243B', 2: '#DDA63A', 3: '#4C9F38', 4: '#C5192D', 5: '#FF3A21',
    6: '#26BDE2', 7: '#FCC30B', 8: '#A21942', 9: '#FD6925', 10: '#DD1367',
    11: '#FD9D24', 12: '#BF8B2E', 13: '#3F7E44', 14: '#0A97D9', 15: '#56C02B',
    16: '#00689D', 17: '#19486A'
  };

  const languagesList = [];
  if (step2Data.languages) {
    if (step2Data.languages.english) languagesList.push('English');
    if (step2Data.languages.bahasa) languagesList.push('Bahasa Indonesia');
    if (step2Data.languages.others) languagesList.push('Others');
  } else {
    languagesList.push('English', 'Bahasa Indonesia');
  }

  const handleFinishSubmit = async () => {
    setLoading(true);
    const payload = {
      title,
      short_description: shortSummary,
      abstract: shortSummary,
      detailed_summary: summaryHtml,
      date_of_publication: pubDate,
      total_pages: parseInt(totalPages) || 0,
      language: languagesList.join(', '),
      publication_status: pubStatus.charAt(0).toUpperCase() + pubStatus.slice(1),
      tags: tagsList,
      file_url: `/uploads/documents/${primaryFileName}`,
      file_size: primaryFileSizeStr,
      cover_image_url: coverFileName ? `/uploads/covers/${coverFileName}` : '/images/report_cover.png',
      external_url: externalUrl,
      supporting_files: (step1Data.supportingFiles || []).map(sf => ({
        url: sf.file.isUrl ? sf.file.name : `/uploads/supporting/${sf.file.name}`,
        type: sf.type,
        description: sf.description
      })),
      agency: selectedAgencies[0] || 'UNDP',
      focal_point: {
        name: focalName,
        email: focalEmail,
        phone: focalPhone,
        department: focalDept
      },
      sdgs: selectedSDGs.map(s => `GOAL ${s}`),
      sectors: selectedSectors,
      lnob_groups: [
        ...selectedLNOB,
        ...(otherLNOB ? [otherLNOB] : [])
      ],
      joint_programme: selectedJointProgrammes.join(', '),
      other_agencies: selectedAgencies.slice(1),
      non_un_partners: worksWithNonUNPartners === 'yes' ? nonUNPartners : [],
      thematic_areas: selectedThematic,
      geographic_scope: "National (Indonesia)",
      is_active: true
    };

    try {
      const res = await createSubmission(payload);
      if (res && res.success) {
        // Clear wizard state on success
        sessionStorage.removeItem('domes_submission_step1');
        sessionStorage.removeItem('domes_submission_step2');
        sessionStorage.removeItem('domes_submission_step3');
        window.location.href = `/cms/submissions?success=${encodeURIComponent(title)}`;
      } else {
        alert(res?.message || 'Failed to submit. Redirecting in offline demo mode.');
        window.location.href = `/cms/submissions?success=${encodeURIComponent(title)}`;
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      // Offline/Demo fallback: redirect with success anyway
      window.location.href = `/cms/submissions?success=${encodeURIComponent(title)}`;
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAsDraft = async () => {
    setLoading(true);
    const payload = {
      title,
      short_description: shortSummary,
      abstract: shortSummary,
      detailed_summary: summaryHtml,
      date_of_publication: pubDate,
      total_pages: parseInt(totalPages) || 0,
      language: languagesList.join(', '),
      publication_status: 'Draft',
      tags: tagsList,
      file_url: `/uploads/documents/${primaryFileName}`,
      file_size: primaryFileSizeStr,
      cover_image_url: coverFileName ? `/uploads/covers/${coverFileName}` : '/images/report_cover.png',
      external_url: externalUrl,
      supporting_files: (step1Data.supportingFiles || []).map(sf => ({
        url: sf.file.isUrl ? sf.file.name : `/uploads/supporting/${sf.file.name}`,
        type: sf.type,
        description: sf.description
      })),
      agency: selectedAgencies[0] || 'UNDP',
      focal_point: {
        name: focalName,
        email: focalEmail,
        phone: focalPhone,
        department: focalDept
      },
      sdgs: selectedSDGs.map(s => `GOAL ${s}`),
      sectors: selectedSectors,
      lnob_groups: [
        ...selectedLNOB,
        ...(otherLNOB ? [otherLNOB] : [])
      ],
      joint_programme: selectedJointProgrammes.join(', '),
      other_agencies: selectedAgencies.slice(1),
      non_un_partners: worksWithNonUNPartners === 'yes' ? nonUNPartners : [],
      thematic_areas: selectedThematic,
      geographic_scope: "National (Indonesia)",
      is_active: false
    };

    try {
      const res = await createSubmission(payload);
      if (res && res.success) {
        sessionStorage.removeItem('domes_submission_step1');
        sessionStorage.removeItem('domes_submission_step2');
        sessionStorage.removeItem('domes_submission_step3');
        window.location.href = `/cms/submissions?draft_saved=${encodeURIComponent(title)}`;
      } else {
        window.location.href = `/cms/submissions?draft_saved=${encodeURIComponent(title)}`;
      }
    } catch (err) {
      window.location.href = `/cms/submissions?draft_saved=${encodeURIComponent(title)}`;
    } finally {
      setLoading(false);
    }
  };

  const progressSteps = [
    { num: 1, label: 'Files' },
    { num: 2, label: 'Details' },
    { num: 3, label: 'Alignment' },
    { num: 4, label: 'Review' },
  ];

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
                        <span className="wiz-s4-file-name" style={{ fontWeight: '600', fontSize: '15px' }}>{primaryFileName}</span>
                        <span className="wiz-s4-file-size" style={{ color: '#64748b', fontSize: '14px' }}>{primaryFileSizeStr}</span>
                        <span style={{ fontSize: '13px', color: '#0ea5e9', marginTop: '4px', display: 'inline-block', padding: '2px 8px', background: '#e0f2fe', borderRadius: '4px' }}>AI Processed</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="wiz-s4-focal-grid">
                  <div>
                    <span className="wiz-s4-label">FOCAL POINT NAME</span>
                    <p className="wiz-s4-val">{focalName}</p>
                  </div>
                  <div>
                    <span className="wiz-s4-label">FOCAL POINT EMAIL</span>
                    <p className="wiz-s4-val">{focalEmail}</p>
                  </div>
                  <div>
                    <span className="wiz-s4-label">PHONE NUMBER</span>
                    <p className="wiz-s4-val">{focalPhone}</p>
                  </div>
                  <div className="wiz-s4-focal-full">
                    <span className="wiz-s4-label">DEPARTMENT / OFFICE</span>
                    <p className="wiz-s4-val">{focalDept}</p>
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
                    <h4 className="wiz-s4-doc-title">{title}</h4>
                  </div>

                  <div className="wiz-s4-row-2col">
                    <div>
                      <span className="wiz-s4-label">PUBLICATION DATE</span>
                      <p className="wiz-s4-val">{pubDate}</p>
                    </div>
                    <div>
                      <span className="wiz-s4-label">TOTAL PAGES</span>
                      <p className="wiz-s4-val">{totalPages} Pages</p>
                    </div>
                  </div>

                  <div className="wiz-s4-row-2col">
                    <div>
                      <span className="wiz-s4-label">STATUS</span>
                      <div className="wiz-s4-status-wrapper">
                        <span className="wiz-s4-status-badge">{pubStatus.toUpperCase()}</span>
                      </div>
                    </div>
                    <div>
                      <span className="wiz-s4-label">LANGUAGES SELECTED</span>
                      <div className="wiz-s4-langs-row">
                        {languagesList.map(l => (
                          <span className="wiz-s4-lang-chip" key={l}>{l}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="wiz-s4-detail-group">
                    <span className="wiz-s4-label">TAGS / KEYWORDS</span>
                    <div className="wiz-s4-tags-row">
                      {tagsList.map(t => (
                        <span className="wiz-s4-tag-item" key={t}>#{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="wiz-s4-detail-group">
                    <span className="wiz-s4-label">SHORT SUMMARY</span>
                    <p className="wiz-s4-val wiz-s4-summary-p">
                      {shortSummary}
                    </p>
                  </div>

                  <div className="wiz-s4-detail-group">
                    <span className="wiz-s4-label">DETAILED SUMMARY</span>
                    <div className="wiz-s4-val wiz-s4-summary-p" style={{ fontSize: '15px', lineHeight: '1.6', color: '#334155' }} dangerouslySetInnerHTML={{__html: summaryHtml}} />
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
                    {selectedSDGs.map(s => (
                      <div className="wiz-s4-sdg-item" key={s}>
                        <span className="wiz-s4-sdg-num" style={{ background: sdgColors[s] || '#E5243B', color: 'white' }}>{s}</span>
                        <span className="wiz-s4-sdg-label">{sdgNames[s] || `Goal ${s}`}</span>
                      </div>
                    ))}
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
                    <span>{selectedAgencies[0] || 'UNDP'}</span>
                  </div>
                </div>

                <div className="wiz-s4-info-group">
                  <span className="wiz-s4-label">OTHER AGENCIES INVOLVED</span>
                  <p className="wiz-s4-val">{selectedAgencies.slice(1).join(', ') || 'None'}</p>
                </div>

                <div className="wiz-s4-info-group">
                  <span className="wiz-s4-label">JOINT PROGRAMME</span>
                  <p className="wiz-s4-val">{selectedJointProgrammes.length > 0 ? `Yes (${selectedJointProgrammes.join(', ')})` : 'No'}</p>
                </div>

                <div className="wiz-s4-info-group">
                  <span className="wiz-s4-label">GEOGRAPHIC SCOPE</span>
                  <p className="wiz-s4-val">National (Indonesia)</p>
                </div>

                <div className="wiz-s4-info-group">
                  <span className="wiz-s4-label">LNOB GROUPS</span>
                  <p className="wiz-s4-val">
                    {[...selectedLNOB, ...(otherLNOB ? [otherLNOB] : [])].join(', ') || 'None'}
                  </p>
                </div>

                {worksWithNonUNPartners === 'yes' && nonUNPartners.length > 0 && (
                  <div className="wiz-s4-info-group">
                    <span className="wiz-s4-label">NON-UN PARTNERS</span>
                    <p className="wiz-s4-val">
                      {nonUNPartners.map(p => `${p.name} (${p.type})`).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Consent */}
          <div className={`wiz-section-card ${consentChecked ? 'wiz-consent-checked' : 'wiz-consent-unchecked'}`} style={{ marginTop: '24px', marginBottom: '50px' }}>
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
                onClick={handleSaveAsDraft}
                disabled={loading}
                style={{ background: 'white', border: '1px solid #cbd5e1', color: '#475569', padding: '12px 24px', fontSize: '15px', borderRadius: '8px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                onMouseOut={(e) => e.currentTarget.style.background = 'white'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                {loading ? 'Saving...' : 'Save as Draft'}
              </button>
              <button 
                className="wiz-btn-submit" 
                onClick={handleFinishSubmit}
                disabled={!consentChecked || loading}
                style={{ opacity: consentChecked && !loading ? 1 : 0.6, cursor: consentChecked && !loading ? 'pointer' : 'not-allowed' }}
              >
                {loading ? 'Submitting...' : 'Submit'}
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
