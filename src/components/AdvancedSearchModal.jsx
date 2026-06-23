import React, { useState } from 'react';

export default function AdvancedSearchModal({ isOpen, onClose, initialQuery = '' }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedAgencies, setSelectedAgencies] = useState({});
  const [selectedSdgs, setSelectedSdgs] = useState({});
  const [selectedSectors, setSelectedSectors] = useState({});
  const [selectedLangs, setSelectedLangs] = useState({});
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [selectedJointProgrammes, setSelectedJointProgrammes] = useState({});

  if (!isOpen) return null;

  const agenciesList = [
    'FAO', 'Global Pulse/ PLJ', 'IFAD', 'ILO', 'IMF', 'IOM', 'ITU', 'RCO',
    'UNAIDS', 'UN Women', 'UNDP', 'UNEP', 'UNESCO', 'UNFPA', 'UN-HABITAT',
    'UNHCR', 'UNICEF', 'UNIDO', 'UNOCHA', 'UNODC', 'UNOPS', 'WFP', 'WHO', 'World Bank'
  ];

  const sectorsList = [
    'Agriculture and Food', 'Business and Investment', 'Conflict, Violence, and Radicalism',
    'COVID-19', 'Disability and Vulnerability and Social Welfare', 'Disaster and Emergency',
    'Economic Development', 'Education and Culture', 'Energy and Natural Resources',
    'Environment and Climate Change', 'Fishery and Maritime', 'Gender and Child Protection',
    'Governance and Corruption', 'Health and Nutrition', 'Infrastructure Development',
    'Innovation and Technology', 'Livelihood and Employment', 'Population and Migration',
    'Poverty and Social Exclusion', 'Public Finance, Tax, and Fiscal Policy',
    'Rural and Regional Development', 'Social Security and Protection',
    'Urban Development', 'Water and Sanitation'
  ];

  const jointProgrammesList = [
    "Advancing Indonesia’s Lighting Market to High Efficient Technologies (ADLIGHT)",
    "Better Reproductive Health and Rights for All in Indonesia (BERANI)",
    "Better Sexual and Reproductive Rights for All in Indonesia (BERANI II)",
    "Building a safer South-East Asia by preventing and responding to the use of chemical weapons by terrorists and other non-state actors in Indonesia (Chemical Weapons Terrorism Project)",
    "Climate Village Project (PROKLIM)",
    "Driving Public and Private Capital Towards Green and Social Investments in Indonesia / Accelerating SDGs Investments in Indonesia (ASSIST)",
    "EmPower: Women for Climate-Resilient Societies",
    "Employment and Livelihood: An Inclusive Approach to Economic Empowerment of Women and Vulnerable Populations in Indonesia (ELJP, COVID-19)",
    "Food Systems, Land Use and Restoration (FOLUR) Impact Program",
    "Global IOM-UNDP Seed Funding Round I",
    "Global IOM-UNDP Seed Funding Round II",
    "Global Peatlands Initiative (GPI)",
    "HIV/AIDS Joint Programme",
    "Leaving No One Behind: Adaptive Social Protection (ASP) for All in Indonesia",
    "Migration Governance for Sustainable Development in Indonesia",
    "Net Zero Nature Positive Accelerator",
    "Partnership for Action on Green Economy (PAGE)",
    "Preventing Violent Extremism through Promoting Tolerance and Respect for Diversity (PROTECT) Project",
    "Project Unwaste: tackling waste trafficking to support a circular economy",
    "RESPECT - Preventing Violence against Women",
    "Safe and Fair Migration: Realizing women migrant workers’ rights and opportunities in the ASEAN region (SPOTLIGHT)",
    "Ship to Shore Rights Project",
    "Strengthening Resilience Against Violent Extremism in Asia (STRIVE Asia)",
    "Supporting the Government of Indonesia and Key Stakeholders to Scale-Up Inclusive Social Protection Programmes in Response to COVID-19",
    "Sustainable, Healthy and Inclusive Food Systems Transformation (SHIFT) Indonesia",
    "Tackling the threat of violent extremism and its impact on human securities in East Java (The Guyub Project)",
    "UN Joint Violent Extremist Prisoners (VEPs) Parole and Probation Project",
    "UN-REDD ASEAN Social Forestry initiative (UN-REDD)"
  ];

  const sdgList = [
    { key: 'g1', number: 1, name: 'No Poverty' },
    { key: 'g2', number: 2, name: 'Zero Hunger' },
    { key: 'g3', number: 3, name: 'Good Health' },
    { key: 'g4', number: 4, name: 'Quality Education' },
    { key: 'g5', number: 5, name: 'Gender Equality' },
    { key: 'g6', number: 6, name: 'Clean Water' },
    { key: 'g7', number: 7, name: 'Affordable Clean Energy' },
    { key: 'g8', number: 8, name: 'Decent Work' },
    { key: 'g9', number: 9, name: 'Industry Innovation' },
    { key: 'g10', number: 10, name: 'Reduced Inequalities' },
    { key: 'g11', number: 11, name: 'Sustainable Cities' },
    { key: 'g12', number: 12, name: 'Responsible Consumption' },
    { key: 'g13', number: 13, name: 'Climate Action' },
    { key: 'g14', number: 14, name: 'Life Below Water' },
    { key: 'g15', number: 15, name: 'Life on Land' },
    { key: 'g16', number: 16, name: 'Peace & Justice' },
    { key: 'g17', number: 17, name: 'Partnerships' },
  ];
  const createSlug = (str) => {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/(^-|-$)/g, '');
  };

  const toggleAgency = (slug) => setSelectedAgencies(prev => ({ ...prev, [slug]: !prev[slug] }));
  const toggleSector = (slug) => setSelectedSectors(prev => ({ ...prev, [slug]: !prev[slug] }));
  const toggleSdg = (key) => setSelectedSdgs(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleLang = (lang) => setSelectedLangs(prev => ({ ...prev, [lang]: !prev[lang] }));
  const toggleJointProgramme = (slug) => setSelectedJointProgrammes(prev => ({ ...prev, [slug]: !prev[slug] }));

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    
    const agencies = Object.keys(selectedAgencies).filter(k => selectedAgencies[k]);
    if (agencies.length > 0) params.set('agencies', agencies.join(','));

    const sdgs = Object.keys(selectedSdgs).filter(k => selectedSdgs[k]);
    if (sdgs.length > 0) params.set('sdgs', sdgs.join(','));

    const sectors = Object.keys(selectedSectors).filter(k => selectedSectors[k]);
    if (sectors.length > 0) params.set('sectors', sectors.join(','));

    const langs = Object.keys(selectedLangs).filter(k => selectedLangs[k]);
    if (langs.length > 0) params.set('langs', langs.join(','));

    const jointProgs = Object.keys(selectedJointProgrammes).filter(k => selectedJointProgrammes[k]);
    if (jointProgs.length > 0) params.set('jointProgrammes', jointProgs.join(','));

    if (yearFrom) params.set('yearFrom', yearFrom);
    if (yearTo) params.set('yearTo', yearTo);

    window.location.href = `/search-results?${params.toString()}`;
  };

  const handleClear = () => {
    setSearchQuery('');
    setSelectedAgencies({});
    setSelectedSdgs({});
    setSelectedSectors({});
    setSelectedLangs({});
    setSelectedJointProgrammes({});
    setYearFrom('');
    setYearTo('');
  };
  return (
    <div className="adv-modal-overlay" onClick={onClose}>
      <div className="adv-modal-content" onClick={e => e.stopPropagation()}>
        <div className="adv-modal-watermark">
          <img src="/images/UN Logo_Horizontal_White_English.png" alt="UN Logo Background" />
        </div>
        
        <div className="adv-modal-header">
          <h2>Advanced Search</h2>
          <button className="adv-modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="adv-modal-body">
          {/* Keyword Search */}
          <div className="adv-filter-group full-width">
            <label>Keyword Search</label>
            <input 
              type="text" 
              className="adv-input-large" 
              placeholder="Search by title, keywords, or authors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <div className="adv-grid-2col">
            {/* Agencies */}
            <div className="adv-filter-group">
              <label>UN Agencies</label>
              <div className="adv-scroll-list">
                {agenciesList.map(agency => {
                  const slug = createSlug(agency);
                  return (
                    <label className="checkbox-item adv-compact-checkbox" key={slug}>
                      <input type="checkbox" checked={selectedAgencies[slug] || false} onChange={() => toggleAgency(slug)} />
                      <span className="checkbox-box"></span>
                      <span className="checkbox-label">{agency}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Sectors */}
            <div className="adv-filter-group">
              <label>Sectoral Analysis</label>
              <div className="adv-scroll-list">
                {sectorsList.map(sector => {
                  const slug = createSlug(sector);
                  return (
                    <label className="checkbox-item adv-compact-checkbox" key={slug}>
                      <input type="checkbox" checked={selectedSectors[slug] || false} onChange={() => toggleSector(slug)} />
                      <span className="checkbox-box"></span>
                      <span className="checkbox-label">{sector}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Publication Year */}
            <div className="adv-filter-group">
              <label>Publication Year</label>
              <div className="adv-flex-row">
                <input 
                  type="number" 
                  className="adv-input-small" 
                  placeholder="From (e.g. 2010)" 
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                />
                <span className="adv-dash">—</span>
                <input 
                  type="number" 
                  className="adv-input-small" 
                  placeholder="To (e.g. 2024)" 
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                />
              </div>
            </div>

            {/* Language */}
            <div className="adv-filter-group">
              <label>Language</label>
              <div className="adv-flex-row wrap">
                {['indonesian', 'english', 'others'].map(lang => (
                  <label className="checkbox-item adv-compact-checkbox" key={lang}>
                    <input type="checkbox" checked={selectedLangs[lang] || false} onChange={() => toggleLang(lang)} />
                    <span className="checkbox-box"></span>
                    <span className="checkbox-label">{lang === 'indonesian' ? 'Bahasa Indonesia' : lang === 'english' ? 'English' : 'Others'}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* SDGs */}
          <div className="adv-filter-group full-width" style={{ marginTop: '20px' }}>
            <label>Sustainable Development Goals (SDGs)</label>
            <div className="adv-sdg-grid">
              {sdgList.map(sdg => (
                <label className="checkbox-item adv-compact-checkbox" key={sdg.key} title={`Goal ${sdg.number}: ${sdg.name}`}>
                  <input type="checkbox" checked={selectedSdgs[sdg.key] || false} onChange={() => toggleSdg(sdg.key)} />
                  <span className="checkbox-box"></span>
                  <span className="checkbox-label">SDG {sdg.number}: {sdg.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Joint Programme */}
          <div className="adv-filter-group full-width" style={{ marginTop: '20px' }}>
            <label>Joint Programme</label>
            <div className="adv-scroll-list" style={{ maxHeight: '180px' }}>
              {jointProgrammesList.map(prog => {
                const slug = createSlug(prog);
                return (
                  <label className="checkbox-item adv-compact-checkbox" key={slug} style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <input type="checkbox" checked={selectedJointProgrammes[slug] || false} onChange={() => toggleJointProgramme(slug)} />
                    <span className="checkbox-box" style={{ marginTop: '2px', flexShrink: 0 }}></span>
                    <span className="checkbox-label" style={{ fontSize: '13px', lineHeight: '1.4' }}>{prog}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="adv-modal-footer">
          <button className="adv-btn-clear" onClick={handleClear}>Clear All</button>
          <button className="adv-btn-search" onClick={handleSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            Apply Filters & Search
          </button>
        </div>
      </div>
    </div>
  );
}
