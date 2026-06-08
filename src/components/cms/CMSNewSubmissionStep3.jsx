import React, { useState } from 'react';
import CMSLayout from './CMSLayout.jsx';

/* ── SDG data with icons ── */
const sdgList = [
  { id: 'g1', key: 'g1', number: 1, name: 'No Poverty', icon: '/images/SDG-logos/SDG-1_no-poverty.png', fullName: 'Goal 1: No Poverty', color: '#E5243B' },
  { id: 'g2', key: 'g2', number: 2, name: 'Zero Hunger', icon: '/images/SDG-logos/SDG-2_zero-hunger.png', fullName: 'Goal 2: Zero Hunger', color: '#DDA63A' },
  { id: 'g3', key: 'g3', number: 3, name: 'Good Health', icon: '/images/SDG-logos/SDG-3_good-health-and-well-being.png', fullName: 'Goal 3: Good Health and Well-being', color: '#4C9F38' },
  { id: 'g4', key: 'g4', number: 4, name: 'Quality Education', icon: '/images/SDG-logos/SDG-4_quality-education.png', fullName: 'Goal 4: Quality Education', color: '#C5192D' },
  { id: 'g5', key: 'g5', number: 5, name: 'Gender Equality', icon: '/images/SDG-logos/SDG-5_gender-equality.png', fullName: 'Goal 5: Gender Equality', color: '#FF3A21' },
  { id: 'g6', key: 'g6', number: 6, name: 'Clean Water', icon: '/images/SDG-logos/SDG-6_clean-water-and-sanitation.png', fullName: 'Goal 6: Clean Water and Sanitation', color: '#26BDE2' },
  { id: 'g7', key: 'g7', number: 7, name: 'Affordable Clean Energy', icon: '/images/SDG-logos/SDG-7_affordable-and-clean-energy.png', fullName: 'Goal 7: Affordable and Clean Energy', color: '#FCC30B' },
  { id: 'g8', key: 'g8', number: 8, name: 'Decent Work', icon: '/images/SDG-logos/SDG-8_decent-work-and-economic-growth.png', fullName: 'Goal 8: Decent Work and Economic Growth', color: '#A21942' },
  { id: 'g9', key: 'g9', number: 9, name: 'Industry Innovation', icon: '/images/SDG-logos/SDG-9_industry-innovation-and-infrastructure.png', fullName: 'Goal 9: Industry, Innovation and Infrastructure', color: '#FD6925' },
  { id: 'g10', key: 'g10', number: 10, name: 'Reduced Inequalities', icon: '/images/SDG-logos/SDG-10_reduced-inequalities.png', fullName: 'Goal 10: Reduced Inequalities', color: '#DD1367' },
  { id: 'g11', key: 'g11', number: 11, name: 'Sustainable Cities', icon: '/images/SDG-logos/SDG-11_sustainable-cities-and-communities.png', fullName: 'Goal 11: Sustainable Cities and Communities', color: '#FD9D24' },
  { id: 'g12', key: 'g12', number: 12, name: 'Responsible Consumption', icon: '/images/SDG-logos/SDG-12_responsible-consumption-and-production.png', fullName: 'Goal 12: Responsible Consumption and Production', color: '#BF8B2E' },
  { id: 'g13', key: 'g13', number: 13, name: 'Climate Action', icon: '/images/SDG-logos/SDG-13_climate-action.png', fullName: 'Goal 13: Climate Action', color: '#3F7E44' },
  { id: 'g14', key: 'g14', number: 14, name: 'Life Below Water', icon: '/images/SDG-logos/SDG-14_life-below-water.png', fullName: 'Goal 14: Life Below Water', color: '#0A97D9' },
  { id: 'g15', key: 'g15', number: 15, name: 'Life on Land', icon: '/images/SDG-logos/SDG-15_life-on-land.png', fullName: 'Goal 15: Life on Land', color: '#56C02B' },
  { id: 'g16', key: 'g16', number: 16, name: 'Peace & Justice', icon: '/images/SDG-logos/SDG-16_peace-justice-and-strong-institutions.png', fullName: 'Goal 16: Peace, Justice and Strong Institutions', color: '#00689D' },
  { id: 'g17', key: 'g17', number: 17, name: 'Partnerships', icon: '/images/SDG-logos/SDG-17_partnership-for-the-goals.png', fullName: 'Goal 17: Partnerships for the Goals', color: '#19486A' },
];

/* ── SDG data ── */
const SDG_GOALS = [
  { num: 1, label: 'No Poverty', color: '#E5243B' },
  { num: 2, label: 'Zero Hunger', color: '#DDA63A' },
  { num: 3, label: 'Good Health', color: '#4C9F38' },
  { num: 4, label: 'Quality Education', color: '#C5192D' },
  { num: 5, label: 'Gender Equality', color: '#FF3A21' },
  { num: 6, label: 'Clean Water', color: '#26BDE2' },
  { num: 7, label: 'Affordable Energy', color: '#FCC30B' },
  { num: 8, label: 'Decent Work', color: '#A21942' },
  { num: 9, label: 'Industry & Innovation', color: '#FD6925' },
  { num: 10, label: 'Reduced Inequalities', color: '#DD1367' },
  { num: 11, label: 'Sustainable Cities', color: '#FD9D24' },
  { num: 12, label: 'Responsible Consumption', color: '#BF8B2E' },
  { num: 13, label: 'Climate Action', color: '#3F7E44' },
  { num: 14, label: 'Life Below Water', color: '#0A97D9' },
  { num: 15, label: 'Life on Land', color: '#56C02B' },
  { num: 16, label: 'Peace & Justice', color: '#00689D' },
  { num: 17, label: 'Partnerships', color: '#19486A' },
];

const SDG_ICONS = {
  1: (c) => <><circle cx="12" cy="10" r="3" stroke={c} fill="none" strokeWidth="1.5"/><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={c} fill="none" strokeWidth="1.5"/></>,
  2: (c) => <><path d="M12 3C8 8 4 10 4 14a8 8 0 0 0 16 0c0-4-4-6-8-11z" stroke={c} fill="none" strokeWidth="1.5"/></>,
  3: (c) => <><path d="M4.5 12h3l2-4 3 8 2-4h4.5" stroke={c} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
  4: (c) => <><path d="M2 3h6a4 4 0 0 1 4 4v14" stroke={c} fill="none" strokeWidth="1.5"/><path d="M22 3h-6a4 4 0 0 0-4 4" stroke={c} fill="none" strokeWidth="1.5"/></>,
  5: (c) => <><circle cx="12" cy="8" r="4" stroke={c} fill="none" strokeWidth="1.5"/><path d="M12 12v9M9 18h6" stroke={c} fill="none" strokeWidth="1.5"/></>,
  6: (c) => <><path d="M12 2C8 7 4 9 4 13a8 8 0 0 0 16 0c0-4-4-6-8-11z" stroke={c} fill="none" strokeWidth="1.5"/><path d="M8 14l2 2 4-4" stroke={c} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
  7: (c) => <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke={c} fill="none" strokeWidth="1.5" strokeLinejoin="round"/></>,
  8: (c) => <><path d="M12 20V10" stroke={c} fill="none" strokeWidth="1.5"/><path d="M18 20V4" stroke={c} fill="none" strokeWidth="1.5"/><path d="M6 20v-4" stroke={c} fill="none" strokeWidth="1.5"/></>,
  9: (c) => <><circle cx="12" cy="12" r="3" stroke={c} fill="none" strokeWidth="1.5"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke={c} fill="none" strokeWidth="1.5"/></>,
  10: (c) => <><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" stroke={c} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
  11: (c) => <><rect x="3" y="11" width="7" height="10" rx="1" stroke={c} fill="none" strokeWidth="1.5"/><rect x="14" y="7" width="7" height="14" rx="1" stroke={c} fill="none" strokeWidth="1.5"/><path d="M6 3l4 4M14 3l4 4" stroke={c} fill="none" strokeWidth="1.5"/></>,
  12: (c) => <><path d="M21 12a9 9 0 1 1-9-9" stroke={c} fill="none" strokeWidth="1.5"/><path d="M21 3v9h-9" stroke={c} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
  13: (c) => <><circle cx="12" cy="12" r="10" stroke={c} fill="none" strokeWidth="1.5"/><path d="M12 6v6l4 2" stroke={c} fill="none" strokeWidth="1.5" strokeLinecap="round"/></>,
  14: (c) => <><path d="M2 12c2-3 4-4 6-4s4 3 6 3 4-2 6-5" stroke={c} fill="none" strokeWidth="1.5" strokeLinecap="round"/><path d="M2 17c2-2 4-3 6-3s4 2 6 2 4-1 6-3" stroke={c} fill="none" strokeWidth="1.5" strokeLinecap="round"/></>,
  15: (c) => <><path d="M12 22V8" stroke={c} fill="none" strokeWidth="1.5"/><path d="M5 12a7 7 0 0 1 14 0" stroke={c} fill="none" strokeWidth="1.5"/><path d="M8 22h8" stroke={c} fill="none" strokeWidth="1.5"/></>,
  16: (c) => <><circle cx="12" cy="12" r="10" stroke={c} fill="none" strokeWidth="1.5"/><path d="M12 8v8M8 12h8" stroke={c} fill="none" strokeWidth="1.5" strokeLinecap="round"/></>,
  17: (c) => <><circle cx="5" cy="6" r="3" stroke={c} fill="none" strokeWidth="1.5"/><circle cx="19" cy="6" r="3" stroke={c} fill="none" strokeWidth="1.5"/><circle cx="12" cy="18" r="3" stroke={c} fill="none" strokeWidth="1.5"/><path d="M7.5 8l3 7.5M16.5 8l-3 7.5" stroke={c} fill="none" strokeWidth="1.5"/></>,
};

const SECTORS = [
  'Agriculture and Food',
  'Business and Investment',
  'Conflict, Violence, and Radicalism',
  'COVID-19',
  'Disability and Vulnerability and Social Welfare',
  'Disaster and Emergency',
  'Economic Development',
  'Education and Culture',
  'Energy and Natural Resources',
  'Environment and Climate Change',
  'Fishery and Maritime',
  'Gender and Child Protection',
  'Governance and Corruption',
  'Health and Nutrition',
  'Infrastructure Development',
  'Innovation and Technology',
  'Livelihood and Employment',
  'Population and Migration',
  'Poverty and Social Exclusion',
  'Public Finance, Tax, and Fiscal Policy',
  'Rural and Regional Development',
  'Social Security and Protection',
  'Urban Development',
  'Water and Sanitation',
];

const AGENCIES = [
  'UNDP', 'FAO', 'ILO', 'IOM', 'ITU',
  'OHCHR', 'UNESCO', 'UNFPA', 'UNICEF', 'UNIDO',
  'WFP', 'WHO', 'UN Women',
];

const THEMATIC_AREAS = [
  'Social Cohesion & Peacebuilding',
  'Inclusive Economic Transformation',
  'Climate Resilience & Green Energy',
];

const LNOB_OPTIONS = [
  'Women and Girls',
  'Youth and Children',
  'Persons with Disabilities',
];

export default function CMSNewSubmissionStep3() {
  const currentStep = 3;

  /* state */
  const [selectedSectors, setSelectedSectors] = useState(['Economic Growth & Trade', 'Governance & Human Rights']);
  const [selectedSDGs, setSelectedSDGs] = useState([2, 5]);
  const [selectedAgencies, setSelectedAgencies] = useState([]);
  const [isJointProgramme, setIsJointProgramme] = useState('');
  const [leadAgency, setLeadAgency] = useState('');
  const [primaryProgramme, setPrimaryProgramme] = useState('');
  const [geoScope, setGeoScope] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [selectedThematic, setSelectedThematic] = useState(['Inclusive Economic Transformation']);
  const [selectedLNOB, setSelectedLNOB] = useState(['Youth and Children']);
  const [otherLNOB, setOtherLNOB] = useState('');

  /* helpers */
  const toggleItem = (arr, setter, item) => {
    setter(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  };
  const toggleNum = (arr, setter, num) => {
    setter(arr.includes(num) ? arr.filter((x) => x !== num) : [...arr, num]);
  };

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

          <div className="wiz-s3-content">
            {/* ── SECTOR CLASSIFICATION ── */}
            <div className="wiz-s3-card">
              <h3 className="wiz-s3-card-title">Sector classification <span className="wiz-required">*</span></h3>
              <div className="wiz-s3-sector-grid">
                {SECTORS.map((s) => {
                  const active = selectedSectors.includes(s);
                  return (
                    <button
                      key={s}
                      className={`wiz-s3-sector-chip ${active ? 'active' : ''}`}
                      onClick={() => toggleItem(selectedSectors, setSelectedSectors, s)}
                    >
                      <span className="wiz-s3-chip-check">
                        {active ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : null}
                      </span>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── SDG GOALS ── */}
            <div className="wiz-s3-card">
              <h3 className="wiz-s3-card-title">Sustainable Development Goals (SDGs) <span className="wiz-required">*</span></h3>
              <p className="wiz-s3-card-desc">Select all primary goals that align with this submission.</p>
              <div className="wiz-s3-sdg-grid">
                {sdgList.map((sdg) => {
                  const active = selectedSDGs.includes(sdg.number);
                  return (
                    <button
                      key={sdg.number}
                      className={`wiz-s3-sdg-card ${active ? 'active' : ''}`}
                      style={active ? { borderColor: sdg.color, boxShadow: `0 0 0 2px ${sdg.color}30` } : {}}
                      onClick={() => toggleNum(selectedSDGs, setSelectedSDGs, sdg.number)}
                    >
                      <div className="wiz-s3-sdg-icon" style={{ backgroundColor: `${sdg.color}15`, padding: '8px' }}>
                        <img src={sdg.icon} alt={sdg.fullName} className="wiz-s3-sdg-img" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                      </div>
                      <span className="wiz-s3-sdg-num">{sdg.number}. {sdg.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── ADDITIONAL CLASSIFICATION ── */}
            <div className="wiz-s3-card">
              <h3 className="wiz-s3-card-title">Additional Classification</h3>
              <p className="wiz-s3-card-desc">Please provide institutional and geographic details for this document.</p>

              {/* UN Agencies */}
              <div className="wiz-s3-field">
                <label className="wiz-s3-label">
                  UN Agencies involved in the initiative/project/joint programme <span className="wiz-required">*</span>
                </label>
                <div className="wiz-s3-agency-grid">
                  {AGENCIES.map((a) => (
                    <label key={a} className="wiz-s2-checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedAgencies.includes(a)}
                        onChange={() => toggleItem(selectedAgencies, setSelectedAgencies, a)}
                      />
                      <span className="wiz-s2-checkmark" />
                      <span>{a}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Joint Programme + Lead Agency row */}
              <div className="wiz-s3-row-2col">
                <div className="wiz-s3-field">
                  <label className="wiz-s3-label">
                    Joint Programme (is this a joint initiative with multiple agencies?) <span className="wiz-required">*</span>
                  </label>
                  <div className="wiz-s2-radio-row">
                    <label className="wiz-s2-radio-item">
                      <input type="radio" name="jointProg" value="yes" checked={isJointProgramme === 'yes'} onChange={(e) => setIsJointProgramme(e.target.value)} />
                      <span className="wiz-s2-radio-circle" />
                      <span>Yes</span>
                    </label>
                    <label className="wiz-s2-radio-item">
                      <input type="radio" name="jointProg" value="no" checked={isJointProgramme === 'no'} onChange={(e) => setIsJointProgramme(e.target.value)} />
                      <span className="wiz-s2-radio-circle" />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div className="wiz-s3-field">
                  <label className="wiz-s3-label">Lead UN Agency <span className="wiz-required">*</span></label>
                  <select className="wiz-s3-select" value={leadAgency} onChange={(e) => setLeadAgency(e.target.value)}>
                    <option value="">Pick Lead Agency</option>
                    {AGENCIES.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              {/* Primary Programme + Geographic Scope row */}
              <div className="wiz-s3-row-2col">
                <div className="wiz-s3-field">
                  <label className="wiz-s3-label">Primary Programme / Pillar <span className="wiz-required">*</span></label>
                  <select className="wiz-s3-select" value={primaryProgramme} onChange={(e) => setPrimaryProgramme(e.target.value)}>
                    <option value="">Please select the program/pillar that corresponds to the document</option>
                    <option value="governance">Governance & Rule of Law</option>
                    <option value="resilience">Resilience & Climate</option>
                    <option value="inclusive">Inclusive Growth</option>
                    <option value="human_capital">Human Capital Development</option>
                  </select>
                </div>
                <div className="wiz-s3-field">
                  <label className="wiz-s3-label">Geographic Scope <span className="wiz-required">*</span></label>
                  <select className="wiz-s3-select" value={geoScope} onChange={(e) => setGeoScope(e.target.value)}>
                    <option value="">Pick Region (choose multiple)</option>
                    <option value="national">National</option>
                    <option value="java">Java</option>
                    <option value="sumatra">Sumatra</option>
                    <option value="kalimantan">Kalimantan</option>
                    <option value="sulawesi">Sulawesi</option>
                    <option value="papua">Papua</option>
                  </select>
                </div>
              </div>

              {/* Agency Name */}
              <div className="wiz-s3-field">
                <select className="wiz-s3-select" value={agencyName} onChange={(e) => setAgencyName(e.target.value)}>
                  <option value="">Pick Name of Agency / Office / Region / Rural</option>
                  <option value="jakarta">UN Jakarta Office</option>
                  <option value="field">Field Office</option>
                  <option value="regional">Regional Office</option>
                </select>
              </div>
            </div>

            {/* ── THEMATIC + LNOB row ── */}
            <div className="wiz-s3-row-2col">
              {/* Thematic Area */}
              <div className="wiz-s3-card">
                <h3 className="wiz-s3-card-title">Thematic Area (UNSDCF) <span className="wiz-required">*</span></h3>
                <div className="wiz-s3-checkbox-list">
                  {THEMATIC_AREAS.map((t) => (
                    <label key={t} className="wiz-s2-checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedThematic.includes(t)}
                        onChange={() => toggleItem(selectedThematic, setSelectedThematic, t)}
                      />
                      <span className="wiz-s2-checkmark" />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Leave No One Behind */}
              <div className="wiz-s3-card">
                <h3 className="wiz-s3-card-title">Leave No One Behind (LNOB) <span className="wiz-required">*</span></h3>
                <div className="wiz-s3-checkbox-list">
                  {LNOB_OPTIONS.map((l) => (
                    <label key={l} className="wiz-s2-checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedLNOB.includes(l)}
                        onChange={() => toggleItem(selectedLNOB, setSelectedLNOB, l)}
                      />
                      <span className="wiz-s2-checkmark" />
                      <span>{l}</span>
                    </label>
                  ))}
                </div>
                <div className="wiz-s3-other-field">
                  <label className="wiz-s3-other-label">Other LNOB group</label>
                  <input
                    type="text"
                    className="wiz-s3-other-input"
                    placeholder="Your answer..."
                    value={otherLNOB}
                    onChange={(e) => setOtherLNOB(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="wiz-footer">
            <a href="/cms/submissions/new/step-2" className="wiz-btn-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back
            </a>
            <a href="/cms/submissions/new/step-4" className="wiz-btn-next">
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