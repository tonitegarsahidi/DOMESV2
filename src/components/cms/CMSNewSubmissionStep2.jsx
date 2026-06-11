import React, { useState, useRef, useEffect } from 'react';
import CMSLayout from './CMSLayout.jsx';

const SimpleWYSIWYG = ({ value, onChange, maxLength, readOnly }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value && document.activeElement !== editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = (e) => {
    const html = e.currentTarget.innerHTML;
    onChange(html);
  };

  const execCmd = (cmd, val = null) => {
    document.execCommand(cmd, false, val);
    if (editorRef.current) {
      editorRef.current.focus();
      handleInput({ currentTarget: editorRef.current });
    }
  };

  if (readOnly) {
    return (
      <div 
        style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '15px', color: '#334155', lineHeight: '1.6', width: '75%', boxSizing: 'border-box' }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  return (
    <div style={{ width: '75%', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '8px', borderBottom: '1px solid #cbd5e1', background: '#f1f5f9', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        <button onClick={() => execCmd('bold')} type="button" style={{ background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>B</button>
        <button onClick={() => execCmd('italic')} type="button" style={{ background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '4px', fontStyle: 'italic', fontFamily: 'serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>I</button>
        <button onClick={() => execCmd('underline')} type="button" style={{ background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '4px', textDecoration: 'underline', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>U</button>
        <div style={{ width: '1px', background: '#cbd5e1', margin: '0 4px' }} />
        <button onClick={() => execCmd('insertUnorderedList')} type="button" style={{ background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', padding: '0 10px', height: '32px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> Bullet
        </button>
        <button onClick={() => execCmd('insertOrderedList')} type="button" style={{ background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', padding: '0 10px', height: '32px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg> Number
        </button>
      </div>
      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        style={{ padding: '16px', minHeight: '220px', outline: 'none', fontSize: '15px', lineHeight: '1.6', color: '#334155', flex: 1, overflowY: 'auto' }}
      />
    </div>
  );
};

export default function CMSNewSubmissionStep2() {
  const currentStep = 2;

  const [title, setTitle] = useState('Digital Economy and Financial Inclusion in Rural Indonesia');
  const [languages, setLanguages] = useState({ english: true, bahasa: true, others: false });
  const [pubDate, setPubDate] = useState('2024-05-15');
  const [totalPages, setTotalPages] = useState('120');
  const [summary, setSummary] = useState(
    '<b>Executive Overview</b><br><br>This extensive report provides an in-depth analysis of the digital economy\'s penetration into rural areas of Indonesia, focusing on the critical role of financial inclusion in driving sustainable economic development. As digital infrastructure expands across the archipelago, unprecedented opportunities are emerging for smallholder farmers, micro, small, and medium enterprises (MSMEs), and previously unbanked populations.<br><br><b>Key Findings:</b><ul><li><b>Technological Adoption:</b> Mobile internet penetration in rural regions has surged by 45% over the past three years, laying the groundwork for digital financial services (DFS) adoption.</li><li><b>Economic Impact:</b> Access to digital credit and savings platforms has enabled rural MSMEs to increase their average revenue by approximately 22%, fostering local economic resilience.</li><li><b>Gender Equality:</b> Digital financial inclusion has disproportionately benefited rural women. Female-led enterprises represent 60% of new digital banking accounts, providing them with unprecedented control over household finances and business capital.</li><li><b>Agricultural Supply Chains:</b> Agritech platforms integrated with digital payment systems have reduced middleman dependencies, increasing farmers\' profit margins by up to 15%.</li></ul><br><b>Challenges Identified</b><br><br>Despite significant progress, substantial barriers remain. The report identifies three primary challenges hindering universal financial inclusion in rural Indonesia: persistent gaps in digital literacy, inadequate telecommunications infrastructure in the most remote areas (the 3T regions: frontier, outermost, and underdeveloped), and limited trust in formal financial institutions among older demographics. Cybersecurity concerns and the risk of predatory digital lending practices also require urgent regulatory attention.<br><br><b>Strategic Recommendations</b><br><br>To accelerate progress towards the Sustainable Development Goals (SDGs), particularly Goal 1 (No Poverty) and Goal 5 (Gender Equality), the report outlines a multi-stakeholder action plan. We recommend enhanced public-private partnerships to subsidize rural broadband infrastructure. Furthermore, targeted digital literacy campaigns, tailored to local languages and cultural contexts, are essential. Regulatory frameworks must be strengthened to protect vulnerable new consumers while simultaneously fostering fintech innovation. By addressing these critical areas, Indonesia can ensure that the digital revolution serves as an inclusive engine for equitable prosperity across its vast rural landscape, leaving no one behind in the transition to a modern digital economy.'
  );
  const [shortSummary, setShortSummary] = useState('This comprehensive report analyzes the rapid expansion of digital financial services across rural Indonesia. It highlights the profound impact of mobile banking and fintech solutions on local micro-economies, emphasizing significant improvements in women\'s financial independence and empowerment.');
  const [tags, setTags] = useState(['digital economy', 'financial inclusion', 'rural development', 'fintech', 'women empowerment']);
  const [tagInput, setTagInput] = useState('');

  const handleTagKeyDown = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const val = tagInput.trim().replace(/,$/, '');
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
      }
      setTagInput('');
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const [pubStatus, setPubStatus] = useState('published');
  
  const [focalName, setFocalName] = useState('Budi Santoso');
  const [focalEmail, setFocalEmail] = useState('b.santoso@undp.org');
  const [focalPhone, setFocalPhone] = useState('+62 812 3456 7890');
  const [focalDept, setFocalDept] = useState('Inclusive Growth Unit');

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

          {/* Content columns */}
          <div className="wiz-content-cols">
            <div className="wiz-col-left">
              {/* AI pre-fill notice banner */}
              <div className="wiz-ai-banner">
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

              {/* Document Details Card */}
              <div className="wiz-section-card">
                <div className="wiz-section-header">
                  <span className="wiz-section-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </span>
                  <h3>Document Details</h3>
                </div>

                <div className="wiz-field-group">
                  <label className="wiz-field-label">
                    TITLE OF REPORT/DOCUMENT <span className="wiz-required">*</span> <AiSparkle />
                  </label>
                  <input
                    type="text"
                    className="wiz-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: '75%' }}
                  />
                </div>

                <div className="wiz-field-group">
                  <label className="wiz-field-label">
                    DATE OF PUBLICATION <span className="wiz-required">*</span>
                  </label>
                  <input
                    type="date"
                    className="wiz-input"
                    value={pubDate}
                    onChange={(e) => setPubDate(e.target.value)}
                    style={{ width: '50%' }}
                  />
                </div>

                <div className="wiz-field-group">
                  <label className="wiz-field-label">
                    TOTAL PAGES (JUMLAH HALAMAN)
                  </label>
                  <input
                    type="number"
                    className="wiz-input"
                    placeholder="e.g. 150"
                    value={totalPages}
                    onChange={(e) => setTotalPages(e.target.value)}
                    style={{ width: '50%' }}
                  />
                </div>

                <div className="wiz-field-group">
                  <label className="wiz-field-label">
                    LANGUAGES (SELECT ALL THAT APPLY) <span className="wiz-required">*</span> <AiSparkle />
                  </label>
                  <div className="wiz-s2-checkbox-row">
                    <label className="wiz-s2-checkbox-item">
                      <input type="checkbox" checked={languages.english} onChange={() => handleLangChange('english')} />
                      <span className="wiz-s2-checkmark" />
                      <span>English</span>
                    </label>
                    <label className="wiz-s2-checkbox-item">
                      <input type="checkbox" checked={languages.bahasa} onChange={() => handleLangChange('bahasa')} />
                      <span className="wiz-s2-checkmark" />
                      <span>Bahasa Indonesia</span>
                    </label>
                    <label className="wiz-s2-checkbox-item">
                      <input type="checkbox" checked={languages.others} onChange={() => handleLangChange('others')} />
                      <span className="wiz-s2-checkmark" />
                      <span>Others</span>
                    </label>
                  </div>
                </div>

                <div className="wiz-field-group">
                  <label className="wiz-field-label">
                    PUBLICATION STATUS <span className="wiz-required">*</span>
                  </label>
                  <div className="wiz-s2-radio-row">
                    <label className="wiz-s2-radio-item">
                      <input type="radio" name="pubStatus" value="published" checked={pubStatus === 'published'} onChange={(e) => setPubStatus(e.target.value)} />
                      <span className="wiz-s2-radio-circle" />
                      <span>Officially Published</span>
                    </label>
                    <label className="wiz-s2-radio-item">
                      <input type="radio" name="pubStatus" value="draft" checked={pubStatus === 'draft'} onChange={(e) => setPubStatus(e.target.value)} />
                      <span className="wiz-s2-radio-circle" />
                      <span>Draft / Internal</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Content Summaries Card */}
              <div className="wiz-section-card">
                <div className="wiz-section-header">
                  <span className="wiz-section-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                  <h3>Content Summaries</h3>
                </div>

                <div className="wiz-field-group">
                  <label className="wiz-field-label" style={{ display: 'flex', justifyContent: 'space-between', width: '75%', marginBottom: '4px' }}>
                    <span>SHORT SUMMARY <AiSparkle /></span>
                    <span style={{ fontSize: '13px', color: shortSummary.length >= 300 ? '#ef4444' : '#94a3b8', fontWeight: '500', textTransform: 'none' }}>
                      {300 - shortSummary.length} characters left
                    </span>
                  </label>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 10px 0' }}>Concise version for search results</p>
                  <textarea
                    className="wiz-input"
                    placeholder="Enter a brief overview..."
                    value={shortSummary}
                    onChange={(e) => {
                      if (e.target.value.length <= 300) setShortSummary(e.target.value);
                    }}
                    rows={3}
                    style={{ resize: 'vertical', width: '75%' }}
                  />
                </div>

                <div className="wiz-field-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px', width: '75%' }}>
                    <label className="wiz-field-label" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                      <span>DETAILED SUMMARY <AiSparkle /></span>
                      <span style={{ fontSize: '13px', color: summary.replace(/<[^>]*>?/gm, '').length >= 5000 ? '#ef4444' : '#94a3b8', fontWeight: '500', textTransform: 'none', marginLeft: 'auto' }}>
                        {5000 - summary.replace(/<[^>]*>?/gm, '').length} characters left
                      </span>
                    </label>
                  </div>
                  <SimpleWYSIWYG 
                    value={summary} 
                    onChange={(val) => {
                      if (val.replace(/<[^>]*>?/gm, '').length <= 5000) {
                        setSummary(val);
                      }
                    }} 
                    maxLength={5000} 
                  />
                </div>

                <div className="wiz-field-group">
                  <label className="wiz-field-label" style={{ display: 'flex', justifyContent: 'space-between', width: '75%', marginBottom: '4px' }}>
                    <span>TAGS / KEYWORDS</span>
                    <span style={{ fontSize: '13px', color: (tags.join(',').length + tagInput.length) >= 500 ? '#ef4444' : '#94a3b8', fontWeight: '500', textTransform: 'none' }}>
                      {500 - (tags.join(',').length + tagInput.length)} characters left
                    </span>
                  </label>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 10px 0' }}>Use commas to separate tags.</p>
                  <div className="wiz-input" style={{ width: '75%', display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '44px', height: 'auto', padding: '8px 12px' }}>
                    {tags.map((tag, idx) => (
                      <span key={idx} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '4px 8px', borderRadius: '4px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {tag}
                        <button onClick={() => removeTag(tag)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, display: 'flex' }} title="Remove tag">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder={tags.length === 0 ? "Type a keyword and press comma..." : "Add tag..."}
                      value={tagInput}
                      onChange={(e) => {
                        if (tags.join(',').length + e.target.value.length <= 500) {
                          setTagInput(e.target.value);
                        }
                      }}
                      onKeyDown={handleTagKeyDown}
                      style={{ border: 'none', outline: 'none', flex: 1, minWidth: '120px', background: 'transparent', fontSize: '15px', color: '#334155' }}
                    />
                  </div>
                </div>
              </div>

              {/* Focal Point Card */}
              <div className="wiz-section-card" style={{ marginBottom: '50px' }}>
                <div className="wiz-section-header">
                  <span className="wiz-section-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <h3>Focal Point</h3>
                </div>

                <div className="wiz-field-group">
                  <label className="wiz-field-label">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    className="wiz-input"
                    placeholder="e.g. Jane Doe"
                    value={focalName}
                    onChange={(e) => setFocalName(e.target.value)}
                    style={{ width: '75%' }}
                  />
                </div>

                <div className="wiz-field-group">
                  <label className="wiz-field-label">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    className="wiz-input"
                    placeholder="jane.doe@organization.org"
                    value={focalEmail}
                    onChange={(e) => setFocalEmail(e.target.value)}
                    style={{ width: '75%' }}
                  />
                </div>

                <div className="wiz-field-group">
                  <label className="wiz-field-label">PHONE NUMBER</label>
                  <input
                    type="tel"
                    className="wiz-input"
                    placeholder="+62 812 3456 7890"
                    value={focalPhone}
                    onChange={(e) => setFocalPhone(e.target.value)}
                    style={{ width: '75%' }}
                  />
                </div>

                <div className="wiz-field-group">
                  <label className="wiz-field-label">DEPARTMENT / UNIT</label>
                  <input
                    type="text"
                    className="wiz-input"
                    placeholder="Enter department..."
                    value={focalDept}
                    onChange={(e) => setFocalDept(e.target.value)}
                    style={{ width: '75%' }}
                  />
                </div>
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
