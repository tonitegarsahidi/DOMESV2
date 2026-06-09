import React, { useState } from 'react';
import CMSLayout from './CMSLayout.jsx';

export default function CMSNewSubmissionStep2() {
  const currentStep = 2;

  const [title, setTitle] = useState('Annual Progress Report on Sustainable Development Goals in the Asia-Pacific Region');
  const [languages, setLanguages] = useState({ english: true, bahasa: false, others: false });
  const [pubDate, setPubDate] = useState('');
  const [summary, setSummary] = useState(
    'This report outlines the progress made across the Asia-Pacific region towards achieving the Sustainable Development Goals (SDGs) established by the United Nations. It highlights key areas of success, identifies ongoing challenges, and proposes strategic recommendations for accelerating implementation over the next decade.'
  );
  const [summaryEditing, setSummaryEditing] = useState(false);
  const [shortSummary, setShortSummary] = useState('');
  const [tags, setTags] = useState('');
  const [pubStatus, setPubStatus] = useState('');
  
  const [focalName, setFocalName] = useState('');
  const [focalEmail, setFocalEmail] = useState('');
  const [focalDept, setFocalDept] = useState('');

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

  const AiSparkle = () => (
    <span className="wiz-ai-sparkle" title="AI pre-filled">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </span>
  );

  const handleLangChange = (lang) => {
    setLanguages((prev) => ({ ...prev, [lang]: !prev[lang] }));
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

          {/* Single-column content */}
          <div className="wiz-step2-content">
            {/* AI pre-fill notice banner */}
            <div className="wiz-prefill-banner">
              <AiSparkle />
              <p>Some fields have been pre-filled by AI based on your initial document upload. Please review them carefully.</p>
            </div>

            {/* Title */}
            <div className="wiz-s2-field">
              <label className="wiz-s2-label">
                Title of report/document <span className="wiz-required">*</span> <AiSparkle />
              </label>
              <input
                type="text"
                className="wiz-s2-input-underline"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Languages */}
            <div className="wiz-s2-field">
              <label className="wiz-s2-label">
                Languages (Select all that apply) <span className="wiz-required">*</span> <AiSparkle />
              </label>
              <div className="wiz-s2-checkbox-row">
                <label className="wiz-s2-checkbox-item">
                  <input
                    type="checkbox"
                    checked={languages.english}
                    onChange={() => handleLangChange('english')}
                  />
                  <span className="wiz-s2-checkmark" />
                  <span>English</span>
                </label>
                <label className="wiz-s2-checkbox-item">
                  <input
                    type="checkbox"
                    checked={languages.bahasa}
                    onChange={() => handleLangChange('bahasa')}
                  />
                  <span className="wiz-s2-checkmark" />
                  <span>Bahasa Indonesia</span>
                </label>
                <label className="wiz-s2-checkbox-item">
                  <input
                    type="checkbox"
                    checked={languages.others}
                    onChange={() => handleLangChange('others')}
                  />
                  <span className="wiz-s2-checkmark" />
                  <span>Others</span>
                </label>
              </div>
            </div>

            {/* Date of publication */}
            <div className="wiz-s2-field">
              <label className="wiz-s2-label">
                Date of publication <span className="wiz-required">*</span>
              </label>
              <input
                type="date"
                className="wiz-s2-input-underline wiz-s2-date"
                value={pubDate}
                onChange={(e) => setPubDate(e.target.value)}
              />
            </div>

            {/* Summary */}
            <div className="wiz-s2-summary-card">
              <div className="wiz-s2-summary-header">
                <strong>Summary</strong> <AiSparkle />
              </div>
              {summaryEditing ? (
                <textarea
                  className="wiz-s2-summary-textarea"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={5}
                />
              ) : (
                <p className="wiz-s2-summary-text">{summary}</p>
              )}
              <div className="wiz-s2-summary-footer">
                <button
                  className="wiz-s2-edit-link"
                  onClick={() => setSummaryEditing(!summaryEditing)}
                >
                  {summaryEditing ? 'Done Editing' : 'Edit Summary'}
                </button>
              </div>
            </div>

            {/* Short Summary */}
            <div className="wiz-s2-short-summary-card">
              <div className="wiz-s2-summary-header">
                <strong>Short Summary</strong> <AiSparkle />
              </div>
              <p className="wiz-s2-short-hint">Concise version for search results (max 3 sentences)</p>
              <textarea
                className="wiz-s2-short-textarea"
                placeholder="Enter a brief overview..."
                value={shortSummary}
                onChange={(e) => setShortSummary(e.target.value)}
                rows={3}
              />
            </div>

            {/* Focal Point */}
            <div className="wiz-s2-field" style={{ marginTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#0ea5e9' }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#1e293b' }}>Focal Point</h3>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="wiz-s2-label">
                    FULL NAME <span className="wiz-required">*</span>
                  </label>
                  <input
                    type="text"
                    className="wiz-s2-input-underline"
                    placeholder="e.g. Jane Doe"
                    value={focalName}
                    onChange={(e) => setFocalName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="wiz-s2-label">
                    EMAIL ADDRESS <span className="wiz-required">*</span>
                  </label>
                  <input
                    type="email"
                    className="wiz-s2-input-underline"
                    placeholder="jane.doe@organization.org"
                    value={focalEmail}
                    onChange={(e) => setFocalEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="wiz-s2-label">DEPARTMENT / UNIT</label>
                  <input
                    type="text"
                    className="wiz-s2-input-underline"
                    placeholder="Enter department..."
                    value={focalDept}
                    onChange={(e) => setFocalDept(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Tags / Keywords */}
            <div className="wiz-s2-field">
              <label className="wiz-s2-label">Tags / Keywords</label>
              <input
                type="text"
                className="wiz-s2-input-underline"
                placeholder="e.g. environment, sustainability, report"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            {/* Publication Status */}
            <div className="wiz-s2-field">
              <label className="wiz-s2-label">
                Publication Status <span className="wiz-required">*</span>
              </label>
              <div className="wiz-s2-radio-row">
                <label className="wiz-s2-radio-item">
                  <input
                    type="radio"
                    name="pubStatus"
                    value="published"
                    checked={pubStatus === 'published'}
                    onChange={(e) => setPubStatus(e.target.value)}
                  />
                  <span className="wiz-s2-radio-circle" />
                  <span>Officially Published</span>
                </label>
                <label className="wiz-s2-radio-item">
                  <input
                    type="radio"
                    name="pubStatus"
                    value="draft"
                    checked={pubStatus === 'draft'}
                    onChange={(e) => setPubStatus(e.target.value)}
                  />
                  <span className="wiz-s2-radio-circle" />
                  <span>Draft / Internal</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="wiz-footer">
            <a href="/cms/submissions/new/step-1" className="wiz-btn-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back
            </a>
            <a href="/cms/submissions/new/step-3" className="wiz-btn-next">
              Next Step
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}
