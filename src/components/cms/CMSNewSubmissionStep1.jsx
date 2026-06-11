import React, { useState, useRef } from 'react';
import CMSLayout from './CMSLayout.jsx';

export default function CMSNewSubmissionStep1() {
  const [dragActive, setDragActive] = useState(false);
  const [primaryFile, setPrimaryFile] = useState(null);
  const [externalUrl, setExternalUrl] = useState('');

  const [coverDragActive, setCoverDragActive] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState('');

  const [primaryUrlChecked, setPrimaryUrlChecked] = useState(false);
  const [coverUrlChecked, setCoverUrlChecked] = useState(false);

  const [supportingFiles, setSupportingFiles] = useState([]);
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const supportingInputRef = useRef(null);

  const currentStep = 1;

  const progressSteps = [
    { num: 1, label: 'Files' },
    { num: 2, label: 'Details' },
    { num: 3, label: 'Alignment' },
    { num: 4, label: 'Review' },
  ];

  /* ---- drag & drop handlers ---- */
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setPrimaryFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPrimaryFile(e.target.files[0]);
    }
  };

  const handleCoverDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setCoverDragActive(true);
    else if (e.type === 'dragleave') setCoverDragActive(false);
  };

  const handleCoverDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCoverDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCoverFile(e.dataTransfer.files[0]);
    }
  };

  const handleCoverFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleSupportingFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => ({
        file: f,
        type: 'Additional document',
        description: ''
      }));
      setSupportingFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const updateSupportingFile = (index, field, value) => {
    setSupportingFiles(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removeSupportingFile = (index) => {
    setSupportingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---- icon helpers ---- */
  const stepIcon = (type) => {
    switch (type) {
      case 'file':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        );
      case 'edit':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        );
      case 'target':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        );
      case 'check':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        );
      default:
        return null;
    }
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
            {/* LEFT COLUMN */}
            <div className="wiz-col-left">
              {/* AI Banner */}
              <div className="wiz-ai-banner">
                <div className="wiz-ai-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className="wiz-ai-text">
                  <h3>AI-Powered Extraction</h3>
                  <p>Upload your primary document. Our system will automatically analyze and pre-fill fields in the next steps to streamline your submission process.</p>
                </div>
              </div>

              {/* Primary Document */}
              <div className="wiz-section-card">
                <div className="wiz-section-header">
                  <span className="wiz-section-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </span>
                  <h3>Primary Document</h3>
                </div>

                {/* Upload zone */}
                {!primaryUrlChecked && (
                  <>
                    <div
                      className={`wiz-upload-zone ${dragActive ? 'drag-active' : ''} ${primaryFile ? 'has-file' : ''}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.docx,.pptx"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      {primaryFile ? (
                        <div className="wiz-file-attached">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          <span className="wiz-file-name">{primaryFile.name}</span>
                          <span className="wiz-file-size">({(primaryFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                          <button
                            className="wiz-file-remove"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPrimaryFile(null);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="wiz-upload-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                          </div>
                          <p className="wiz-upload-text">Click to upload or drag and drop</p>
                          <p className="wiz-upload-hint">Supported formats: PDF, DOCX, PPTX (Max 50MB)</p>
                        </>
                      )}
                    </div>

                    {/* OR divider */}
                    <div className="wiz-or-divider">
                      <span>OR</span>
                    </div>
                  </>
                )}

                {/* External URL */}
                <div className="wiz-field-group">
                  <label className="wiz-field-label">
                    External Document URL <span className="wiz-required">*</span>
                    {primaryUrlChecked && <span style={{ color: '#10b981', marginLeft: '8px', fontWeight: 'bold', fontSize: '24px', verticalAlign: 'middle', lineHeight: '1' }}>✓</span>}
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                    <div className="wiz-input-with-icon" style={{ width: '75%' }}>
                      <svg className="wiz-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      <input
                        type="url"
                        placeholder="https://example.com/document.pdf"
                        value={externalUrl}
                        onChange={(e) => {
                          setExternalUrl(e.target.value);
                          setPrimaryUrlChecked(false);
                        }}
                        style={primaryUrlChecked ? { border: '2px solid #10b981', outline: 'none' } : {}}
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => { if(externalUrl) setPrimaryUrlChecked(true); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#0288d1', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', color: '#ffffff', boxShadow: '0 2px 4px rgba(2, 136, 209, 0.2)', transition: 'background 0.2s' }}
                      onMouseOver={(e) => e.target.style.background = '#0277bd'}
                      onMouseOut={(e) => e.target.style.background = '#0288d1'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      Cek URL
                    </button>
                  </div>
                </div>
              </div>

              {/* Cover Document/Image */}
              <div className="wiz-section-card">
                <div className="wiz-section-header">
                  <span className="wiz-section-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </span>
                  <h3>Cover Image / Document</h3>
                </div>

                {/* Upload zone */}
                {!coverUrlChecked && (
                  <>
                    <div
                      className={`wiz-upload-zone ${coverDragActive ? 'drag-active' : ''} ${coverFile ? 'has-file' : ''}`}
                      onDragEnter={handleCoverDrag}
                      onDragLeave={handleCoverDrag}
                      onDragOver={handleCoverDrag}
                      onDrop={handleCoverDrop}
                      onClick={() => coverInputRef.current?.click()}
                    >
                      <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*,.pdf"
                        style={{ display: 'none' }}
                        onChange={handleCoverFileChange}
                      />
                      {coverFile ? (
                        <div className="wiz-file-attached">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          <span className="wiz-file-name">{coverFile.name}</span>
                          <span className="wiz-file-size">({(coverFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                          <button
                            className="wiz-file-remove"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCoverFile(null);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="wiz-upload-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21 15 16 10 5 21"/>
                            </svg>
                          </div>
                          <p className="wiz-upload-text">Click to upload or drag and drop</p>
                          <p className="wiz-upload-hint">Supported formats: JPG, PNG, PDF (Max 10MB)</p>
                        </>
                      )}
                    </div>

                    {/* OR divider */}
                    <div className="wiz-or-divider">
                      <span>OR</span>
                    </div>
                  </>
                )}

                {/* External URL */}
                <div className="wiz-field-group">
                  <label className="wiz-field-label">
                    Cover Image URL
                    {coverUrlChecked && <span style={{ color: '#10b981', marginLeft: '8px', fontWeight: 'bold', fontSize: '24px', verticalAlign: 'middle', lineHeight: '1' }}>✓</span>}
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                    <div className="wiz-input-with-icon" style={{ width: '75%' }}>
                      <svg className="wiz-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      <input
                        type="url"
                        placeholder="https://example.com/cover.jpg"
                        value={coverUrl}
                        onChange={(e) => {
                          setCoverUrl(e.target.value);
                          setCoverUrlChecked(false);
                        }}
                        style={coverUrlChecked ? { border: '2px solid #10b981', outline: 'none' } : {}}
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => { if(coverUrl) setCoverUrlChecked(true); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#0288d1', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', color: '#ffffff', boxShadow: '0 2px 4px rgba(2, 136, 209, 0.2)', transition: 'background 0.2s' }}
                      onMouseOver={(e) => e.target.style.background = '#0277bd'}
                      onMouseOut={(e) => e.target.style.background = '#0288d1'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      Cek URL
                    </button>
                  </div>
                </div>
              </div>

              {/* Supporting Materials */}
              <div className="wiz-section-card">
                <div className="wiz-section-header">
                  <span className="wiz-section-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  </span>
                  <h3>Supporting Materials</h3>
                  <button
                    className="wiz-add-file-btn"
                    onClick={() => supportingInputRef.current?.click()}
                  >
                    + Add File
                  </button>
                  <input
                    ref={supportingInputRef}
                    type="file"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleSupportingFileChange}
                  />
                </div>
                <p className="wiz-supporting-desc">Optional attachments for additional context or reference.</p>

                {supportingFiles.length === 0 ? (
                  <div className="wiz-empty-state">
                    <p>No supporting files added yet.</p>
                  </div>
                ) : (
                  <div className="wiz-supporting-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {supportingFiles.map((item, i) => (
                      <div key={i} className="wiz-supporting-item-extended" style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#64748b' }}>
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                            <span className="wiz-supporting-name" style={{ fontWeight: '500', color: '#334155' }}>{item.file.name}</span>
                            <span className="wiz-supporting-size" style={{ color: '#94a3b8', fontSize: '13px' }}>({(item.file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </div>
                          <button className="wiz-file-remove" onClick={() => removeSupportingFile(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '16px', padding: '4px' }}>✕</button>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                          <div>
                            <label className="wiz-field-label" style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>TYPE</label>
                            <select 
                              className="wiz-input" 
                              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                              value={item.type}
                              onChange={(e) => updateSupportingFile(i, 'type', e.target.value)}
                            >
                              <option value="Main document">Main document</option>
                              <option value="Annex">Annex (Lampiran)</option>
                              <option value="Raw data">Raw data (Data Asli)</option>
                              <option value="Data collection tools">Data collection tools (Kuesioner)</option>
                              <option value="ToR">ToR (Kerangka Acuan Kerja)</option>
                              <option value="Additional document">Additional document</option>
                            </select>
                          </div>
                          <div>
                            <label className="wiz-field-label" style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>DESCRIPTION</label>
                            <input 
                              type="text" 
                              className="wiz-input" 
                              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                              placeholder="Add a brief description..." 
                              value={item.description}
                              onChange={(e) => updateSupportingFile(i, 'description', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>


          </div>

          {/* Footer */}
          <div className="wiz-footer">
            <a href="/cms/submissions" className="wiz-btn-cancel">Cancel</a>
            <a href="/cms/submissions/new/step-2" className="wiz-btn-next">
              NEXT
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
