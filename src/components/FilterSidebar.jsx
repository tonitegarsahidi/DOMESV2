import React, { useState } from 'react';

export default function FilterSidebar() {
  const [agenciesExpanded, setAgenciesExpanded] = useState(true);
  const [sdgExpanded, setSdgExpanded] = useState(true);
  const [yearExpanded, setYearExpanded] = useState(true);
  const [langExpanded, setLangExpanded] = useState(true);
  const [sectorExpanded, setSectorExpanded] = useState(false);

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

  const [selectedLangs, setSelectedLangs] = useState({
    indonesian: true,
    english: true,
    others: false
  });

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
              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedAgencies.undp} 
                  onChange={() => toggleAgency('undp')} 
                />
                <span className="checkbox-box"></span>
                <span className="checkbox-label">UNDP (45)</span>
              </label>

              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedAgencies.unep} 
                  onChange={() => toggleAgency('unep')} 
                />
                <span className="checkbox-box"></span>
                <span className="checkbox-label">UNEP (32)</span>
              </label>

              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedAgencies.unicef} 
                  onChange={() => toggleAgency('unicef')} 
                />
                <span className="checkbox-box"></span>
                <span className="checkbox-label">UNICEF (28)</span>
              </label>

              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedAgencies.who} 
                  onChange={() => toggleAgency('who')} 
                />
                <span className="checkbox-box"></span>
                <span className="checkbox-label">WHO (15)</span>
              </label>

              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedAgencies.fao} 
                  onChange={() => toggleAgency('fao')} 
                />
                <span className="checkbox-box"></span>
                <span className="checkbox-label">FAO (12)</span>
              </label>
            </div>
            <a href="#" className="filter-link" onClick={(e) => e.preventDefault()}>Show more (8)</a>
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
              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedSdgs.g13} 
                  onChange={() => toggleSdg('g13')} 
                />
                <span className="checkbox-box"></span>
                <span className="color-indicator sdg-green"></span>
                <span className="checkbox-label">Goal 13: Climate Action</span>
              </label>

              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedSdgs.g14} 
                  onChange={() => toggleSdg('g14')} 
                />
                <span className="checkbox-box"></span>
                <span className="color-indicator sdg-green"></span>
                <span className="checkbox-label">Goal 14: Life Below Water</span>
              </label>

              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedSdgs.g15} 
                  onChange={() => toggleSdg('g15')} 
                />
                <span className="checkbox-box"></span>
                <span className="color-indicator sdg-green"></span>
                <span className="checkbox-label">Goal 15: Life on Land</span>
              </label>

              <label className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedSdgs.g11} 
                  onChange={() => toggleSdg('g11')} 
                />
                <span className="checkbox-box"></span>
                <span className="color-indicator sdg-orange"></span>
                <span className="checkbox-label">Goal 11: Sustainable Cities</span>
              </label>
            </div>
            <a href="#" className="filter-link" onClick={(e) => e.preventDefault()}>Show more (13)</a>
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
            {/* Collapsed by default */}
          </div>
        )}
      </div>
    </aside>
  );
}
