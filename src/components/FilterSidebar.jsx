import React, { useState } from 'react';

export default function FilterSidebar() {
  const [agenciesExpanded, setAgenciesExpanded] = useState(true);
  const [sdgExpanded, setSdgExpanded] = useState(true);
  const [sdgShowAll, setSdgShowAll] = useState(false);
  const [agenciesShowAll, setAgenciesShowAll] = useState(false); // Show all agencies
  const [sectorsShowAll, setSectorsShowAll] = useState(false); // Show all sectors
  const [yearExpanded, setYearExpanded] = useState(true);
  const [langExpanded, setLangExpanded] = useState(true);
  const [sectorExpanded, setSectorExpanded] = useState(true);

  // Full list of agencies from CMS step-3
  const agenciesList = [
    'FAO',
    'Global Pulse/ PLJ',
    'IFAD',
    'ILO',
    'IMF',
    'IOM',
    'ITU',
    'RCO',
    'UNAIDS',
    'UN Women',
    'UNDP',
    'UNEP',
    'UNESCO',
    'UNFPA',
    'UN-HABITAT',
    'UNHCR',
    'UNICEF',
    'UNIDO',
    'UNOCHA',
    'UNODC',
    'UNOPS',
    'WFP',
    'WHO',
    'World Bank'
  ];

  // Full list of sectors from CMS step-3
  const sectorsList = [
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
    'Water and Sanitation'
  ];

  // States for checkbox values
  const [selectedAgencies, setSelectedAgencies] = useState({
    undp: true,
    unep: false,
    unicef: false,
    who: false,
    fao: false
  });

  const [selectedSdgs, setSelectedSdgs] = useState({
    g13: false,
    g14: false,
    g15: false,
    g11: false
  });

  const [selectedSectors, setSelectedSectors] = useState({});
  const [selectedLangs, setSelectedLangs] = useState({
    indonesian: true,
    english: true,
    others: false
  });

  // SDG Full list with icons
  const sdgList = [
    { id: 'g1', key: 'g1', number: 1, name: 'No Poverty', icon: '/images/SDG-logos/SDG-1_no-poverty.png' },
    { id: 'g2', key: 'g2', number: 2, name: 'Zero Hunger', icon: '/images/SDG-logos/SDG-2_zero-hunger.png' },
    { id: 'g3', key: 'g3', number: 3, name: 'Good Health', icon: '/images/SDG-logos/SDG-3_good-health-and-well-being.png' },
    { id: 'g4', key: 'g4', number: 4, name: 'Quality Education', icon: '/images/SDG-logos/SDG-4_quality-education.png' },
    { id: 'g5', key: 'g5', number: 5, name: 'Gender Equality', icon: '/images/SDG-logos/SDG-5_gender-equality.png' },
    { id: 'g6', key: 'g6', number: 6, name: 'Clean Water', icon: '/images/SDG-logos/SDG-6_clean-water-and-sanitation.png' },
    { id: 'g7', key: 'g7', number: 7, name: 'Affordable Clean Energy', icon: '/images/SDG-logos/SDG-7_affordable-and-clean-energy.png' },
    { id: 'g8', key: 'g8', number: 8, name: 'Decent Work', icon: '/images/SDG-logos/SDG-8_decent-work-and-economic-growth.png' },
    { id: 'g9', key: 'g9', number: 9, name: 'Industry Innovation', icon: '/images/SDG-logos/SDG-9_industry-innovation-and-infrastructure.png' },
    { id: 'g10', key: 'g10', number: 10, name: 'Reduced Inequalities', icon: '/images/SDG-logos/SDG-10_reduced-inequalities.png' },
    { id: 'g11', key: 'g11', number: 11, name: 'Sustainable Cities', icon: '/images/SDG-logos/SDG-11_sustainable-cities-and-communities.png' },
    { id: 'g12', key: 'g12', number: 12, name: 'Responsible Consumption', icon: '/images/SDG-logos/SDG-12_responsible-consumption-and-production.png' },
    { id: 'g13', key: 'g13', number: 13, name: 'Climate Action', icon: '/images/SDG-logos/SDG-13_climate-action.png' },
    { id: 'g14', key: 'g14', number: 14, name: 'Life Below Water', icon: '/images/SDG-logos/SDG-14_life-below-water.png' },
    { id: 'g15', key: 'g15', number: 15, name: 'Life on Land', icon: '/images/SDG-logos/SDG-15_life-on-land.png' },
    { id: 'g16', key: 'g16', number: 16, name: 'Peace & Justice', icon: '/images/SDG-logos/SDG-16_peace-justice-and-strong-institutions.png' },
    { id: 'g17', key: 'g17', number: 17, name: 'Partnerships', icon: '/images/SDG-logos/SDG-17_partnership-for-the-goals.png' },
  ];

  // Range Slider States
  const [yearFrom, setYearFrom] = useState(2014);
  const [yearTo, setYearTo] = useState(2024);

  const toggleAgency = (key) => {
    setSelectedAgencies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSdg = (key) => {
    setSelectedSdgs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleLang = (key) => {
    setSelectedLangs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSector = (key) => {
    setSelectedSectors(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper to create slug from agency/sector name
  const createSlug = (str) => {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/(^-|-$)/g, '');
  };

  return (
    <aside className="new-filter-sidebar" id="filter-sidebar">
      {/* 1. Agencies Card */}
      <div className={`filter-card ${agenciesExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="filter-card-header" onClick={() => setAgenciesExpanded(!agenciesExpanded)}>
          <h3>Agencies</h3>
          <span className="chevron-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {agenciesExpanded ? <polyline points="18 15 12 9 6 15"></polyline> : <polyline points="6 9 12 15 18 9"></polyline>}
            </svg>
          </span>
        </div>
        
        {agenciesExpanded && (
          <div className="filter-card-body">
            <div className="custom-checkbox-list">
              {(agenciesShowAll ? agenciesList : agenciesList.slice(0, 5)).map((agency) => {
                const slug = createSlug(agency);
                return (
                  <label className="checkbox-item" key={slug}>
                    <input 
                      type="checkbox" 
                      checked={selectedAgencies[slug] || false} 
                      onChange={() => toggleAgency(slug)} 
                    />
                    <span className="checkbox-box"></span>
                    <span className="checkbox-label">{agency}</span>
                  </label>
                );
              })}
            </div>
            {!agenciesShowAll && (
              <a 
                href="#" 
                className="filter-link" 
                onClick={(e) => {
                  e.preventDefault();
                  setAgenciesShowAll(true);
                }}
              >
                Show all {agenciesList.length} agencies
              </a>
            )}
          </div>
        )}
      </div>

      {/* 2. SDG Goals Card */}
      <div className={`filter-card ${sdgExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="filter-card-header" onClick={() => setSdgExpanded(!sdgExpanded)}>
          <h3>SDG Goals</h3>
          <span className="chevron-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {sdgExpanded ? <polyline points="18 15 12 9 6 15"></polyline> : <polyline points="6 9 12 15 18 9"></polyline>}
            </svg>
          </span>
        </div>

        {sdgExpanded && (
          <div className="filter-card-body">
            <div className="custom-checkbox-list">
              {(sdgShowAll ? sdgList : sdgList.slice(0, 4)).map((sdg) => (
                <label className="checkbox-item" key={sdg.id}>
                  <input 
                    type="checkbox" 
                    checked={selectedSdgs[sdg.key] || false} 
                    onChange={() => toggleSdg(sdg.key)} 
                  />
                  <span className="checkbox-box"></span>
                  <div className="sdg-icon-wrapper">
                    <img 
                      src={sdg.icon} 
                      alt={`SDG ${sdg.number}`} 
                      className="sdg-icon-small" 
                    />
                    <span className="sdg-tooltip">Goal {sdg.number}: {sdg.name}</span>
                  </div>
                  <span className="checkbox-label">{sdg.name}</span>
                </label>
              ))}
            </div>
            {!sdgShowAll && (
              <a 
                href="#" 
                className="filter-link" 
                onClick={(e) => {
                  e.preventDefault();
                  setSdgShowAll(true);
                }}
              >
                Show all 17 SDGs
              </a>
            )}
          </div>
        )}
      </div>

      {/* 3. Publication Year Card */}
      <div className={`filter-card ${yearExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="filter-card-header" onClick={() => setYearExpanded(!yearExpanded)}>
          <h3>Publication Year</h3>
          <span className="chevron-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {yearExpanded ? <polyline points="18 15 12 9 6 15"></polyline> : <polyline points="6 9 12 15 18 9"></polyline>}
            </svg>
          </span>
        </div>

        {yearExpanded && (
          <div className="filter-card-body">
            <div className="filter-year-inputs">
              <div className="year-input-box">
                <span className="year-input-label">FROM</span>
                <input 
                  type="text" 
                  value={yearFrom} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 2010;
                    if (val >= 2010 && val <= yearTo) setYearFrom(val);
                  }} 
                />
              </div>
              <span className="year-range-dash">—</span>
              <div className="year-input-box">
                <span className="year-input-label">TO</span>
                <input 
                  type="text" 
                  value={yearTo} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 2024;
                    if (val >= yearFrom && val <= 2024) setYearTo(val);
                  }} 
                />
              </div>
            </div>

            {/* Simulated Dual Range Slider */}
            <div className="year-slider-container">
              <div className="year-slider-track">
                {/* Visual active fill between selected range */}
                <div 
                  className="year-slider-fill"
                  style={{
                    left: `${((yearFrom - 2010) / (2024 - 2010)) * 100}%`,
                    right: `${100 - (((yearTo - 2010) / (2024 - 2010)) * 100)}%`
                  }}
                ></div>
                {/* Range inputs overlay */}
                <input 
                  type="range" 
                  min="2010" 
                  max="2024" 
                  value={yearFrom}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val <= yearTo) setYearFrom(val);
                  }}
                  className="slider-thumb-input thumb-from" 
                />
                <input 
                  type="range" 
                  min="2010" 
                  max="2024" 
                  value={yearTo}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= yearFrom) setYearTo(val);
                  }}
                  className="slider-thumb-input thumb-to" 
                />
              </div>
              <div className="year-slider-labels">
                <span>2010</span>
                <span>2024</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Language Card */}
      <div className={`filter-card ${langExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="filter-card-header" onClick={() => setLangExpanded(!langExpanded)}>
          <h3>Language</h3>
          <span className="chevron-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {langExpanded ? <polyline points="6 9 12 15 18 9"></polyline> : <polyline points="18 15 12 9 6 15"></polyline>}
            </svg>
          </span>
        </div>

        {langExpanded && (
          <div className="filter-card-body">
            <div className="custom-checkbox-list">
              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedLangs.indonesian} 
                  onChange={() => toggleLang('indonesian')} 
                />
                <span className="checkbox-box"></span>
                <span className="checkbox-label">Bahasa Indonesia</span>
              </label>

              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedLangs.english} 
                  onChange={() => toggleLang('english')} 
                />
                <span className="checkbox-box"></span>
                <span className="checkbox-label">English</span>
              </label>

              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedLangs.others} 
                  onChange={() => toggleLang('others')} 
                />
                <span className="checkbox-box"></span>
                <span className="checkbox-label">Others</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* 5. Sectoral Analysis Card */}
      <div className={`filter-card ${sectorExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="filter-card-header" onClick={() => setSectorExpanded(!sectorExpanded)}>
          <h3>Sectoral Analysis</h3>
          <span className="chevron-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {sectorExpanded ? <polyline points="18 15 12 9 6 15"></polyline> : <polyline points="6 9 12 15 18 9"></polyline>}
            </svg>
          </span>
        </div>

        {sectorExpanded && (
          <div className="filter-card-body">
            <div className="custom-checkbox-list">
              {(sectorsShowAll ? sectorsList : sectorsList.slice(0, 5)).map((sector) => {
                const slug = createSlug(sector);
                return (
                  <label className="checkbox-item" key={slug}>
                    <input 
                      type="checkbox" 
                      checked={selectedSectors[slug] || false} 
                      onChange={() => toggleSector(slug)} 
                    />
                    <span className="checkbox-box"></span>
                    <span className="checkbox-label">{sector}</span>
                  </label>
                );
              })}
            </div>
            {!sectorsShowAll && (
              <a 
                href="#" 
                className="filter-link" 
                onClick={(e) => {
                  e.preventDefault();
                  setSectorsShowAll(true);
                }}
              >
                Show all {sectorsList.length} sectors
              </a>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}