import React from 'react';
import CMSLayout from './CMSLayout.jsx';

export default function CMSNewSubmissionStep4() {
  const currentStep = 4;

  const sidebarSteps = [
    { num: 1, label: 'Files', icon: 'file' },
    { num: 2, label: 'Details', icon: 'edit' },
    { num: 3, label: 'Alignment', icon: 'target' },
    { num: 4, label: 'Review', icon: 'check' },
  ];

  const progressSteps = [
    { num: 1, label: 'Initial Information' },
    { num: 2, label: 'Document Details' },
    { num: 3, label: 'Review & Submit' },
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

  return (
    <CMSLayout>
      <div className="wiz-page">
        <aside className="wiz-sidebar">
          {sidebarSteps.map((s) => (
            <a
              key={s.num}
              href={`/cms/submissions/new/step-${s.num}`}
              className={`wiz-sidebar-item ${s.num === currentStep ? 'active' : ''} ${s.num < currentStep ? 'completed' : ''}`}
            >
              <span className="wiz-sidebar-icon">{stepIcon(s.icon)}</span>
              Step {s.num} - {s.label}
            </a>
          ))}
        </aside>

        <div className="wiz-main">
          <div className="wiz-progress-bar">
            {progressSteps.map((ps, idx) => (
              <React.Fragment key={ps.num}>
                <div className={`wiz-progress-step active`}>
                  <span className="wiz-progress-num">{ps.num}</span>
                  <span className="wiz-progress-label">{ps.label}</span>
                </div>
                {idx < progressSteps.length - 1 && <div className="wiz-progress-connector active" />}
              </React.Fragment>
            ))}
          </div>

          <div className="wiz-placeholder-content">
            <div className="wiz-placeholder-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <h2>Step 4 — Review & Submit</h2>
            <p>This step will show a summary of all entered information for final review before submission. Coming soon.</p>
          </div>

          <div className="wiz-footer">
            <a href="/cms/submissions/new/step-3" className="wiz-btn-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              BACK
            </a>
            <button className="wiz-btn-submit" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}
