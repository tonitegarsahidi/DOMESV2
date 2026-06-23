import React, { useState, useEffect, useRef } from 'react';

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

  const lnobList = [
    'Women and Girls',
    'Youth and Children',
    'Persons with Disabilities',
    'Others'
  ];

  const nonUnPartnersList = [
    'Government',
    'Universities',
    'Billateral Agency',
    'Consulting Firm',
    'Think Tank / Research Institute',
    'International NGO',
    'Local NGO',
    'Others'
  ];

  const [isRefining, setIsRefining] = useState(false);
  const isInitialMount = useRef(true);
  const [isReady, setIsReady] = useState(false);
  const isSyncingToUrl = useRef(false);

  // States for checkbox values
  const [selectedAgencies, setSelectedAgencies] = useState({});
  const [selectedSdgs, setSelectedSdgs] = useState({});
  const [selectedSectors, setSelectedSectors] = useState({});
  const [selectedLangs, setSelectedLangs] = useState({});
  const [yearFrom, setYearFrom] = useState(2014);
  const [yearTo, setYearTo] = useState(2024);
  const [selectedJointProgrammes, setSelectedJointProgrammes] = useState({});
  const [selectedLnob, setSelectedLnob] = useState({});
  const [selectedNonUnPartners, setSelectedNonUnPartners] = useState({});

  const [jointProgrammesExpanded, setJointProgrammesExpanded] = useState(true);
  const [jointProgrammesShowAll, setJointProgrammesShowAll] = useState(false);
  const [lnobExpanded, setLnobExpanded] = useState(true);
  const [nonUnPartnersExpanded, setNonUnPartnersExpanded] = useState(true);

  const loadFromUrl = () => {
    const params = new URLSearchParams(window.location.search);

    // Agencies
    const agenciesParam = params.get('agencies');
    if (agenciesParam) {
      const agenciesMap = {};
      agenciesParam.split(',').forEach(a => agenciesMap[a] = true);
      setSelectedAgencies(agenciesMap);
    } else {
      setSelectedAgencies({ undp: true });
    }

    // SDGs
    const sdgParam = params.get('sdgs');
    if (sdgParam) {
      const sdgsMap = {};
      sdgParam.split(',').forEach(s => sdgsMap[s] = true);
      setSelectedSdgs(sdgsMap);
    } else {
      setSelectedSdgs({});
    }

    // Sectors
    const sectorParam = params.get('sectors');
    if (sectorParam) {
      const sectorsMap = {};
      sectorParam.split(',').forEach(s => sectorsMap[s] = true);
      setSelectedSectors(sectorsMap);
    } else {
      setSelectedSectors({});
    }

    // Langs
    const langParam = params.get('langs');
    if (langParam) {
      const langsMap = {};
      langParam.split(',').forEach(l => langsMap[l] = true);
      setSelectedLangs(langsMap);
    } else {
      setSelectedLangs({ indonesian: true, english: true });
    }

    // Years
    const yFrom = params.get('yearFrom');
    if (yFrom) setYearFrom(parseInt(yFrom));
    else setYearFrom(2014);

    const yTo = params.get('yearTo');
    if (yTo) setYearTo(parseInt(yTo));
    else setYearTo(2024);

    // Joint Programmes
    const jpParam = params.get('jointProgrammes');
    if (jpParam) {
      const jpMap = {};
      jpParam.split(',').forEach(j => jpMap[j] = true);
      setSelectedJointProgrammes(jpMap);
    } else {
      setSelectedJointProgrammes({});
    }

    // LNOBs
    const lnobParam = params.get('lnobs');
    if (lnobParam) {
      const lnobMap = {};
      lnobParam.split(',').forEach(l => lnobMap[l] = true);
      setSelectedLnob(lnobMap);
    } else {
      setSelectedLnob({});
    }

    // Non-UN Partners
    const nonUnPartnersParam = params.get('nonUnPartners');
    if (nonUnPartnersParam) {
      const nonUnPartnersMap = {};
      nonUnPartnersParam.split(',').forEach(n => nonUnPartnersMap[n] = true);
      setSelectedNonUnPartners(nonUnPartnersMap);
    } else {
      setSelectedNonUnPartners({});
    }
  };

  useEffect(() => {
    loadFromUrl();
    setIsReady(true);

    const handleUrlChange = () => {
      if (isSyncingToUrl.current) return;
      loadFromUrl();
    };

    window.addEventListener('urlchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('urlchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    }
  }, []);

  // Sync to URL
  useEffect(() => {
    if (!isReady) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setIsRefining(true);

    const handler = setTimeout(() => {
      setIsRefining(false);

      const params = new URLSearchParams(window.location.search);

      const agencies = Object.keys(selectedAgencies).filter(k => selectedAgencies[k]);
      if (agencies.length > 0) params.set('agencies', agencies.join(','));
      else params.delete('agencies');

      const sdgs = Object.keys(selectedSdgs).filter(k => selectedSdgs[k]);
      if (sdgs.length > 0) params.set('sdgs', sdgs.join(','));
      else params.delete('sdgs');

      const sectors = Object.keys(selectedSectors).filter(k => selectedSectors[k]);
      if (sectors.length > 0) params.set('sectors', sectors.join(','));
      else params.delete('sectors');

      const langs = Object.keys(selectedLangs).filter(k => selectedLangs[k]);
      if (langs.length > 0) params.set('langs', langs.join(','));
      else params.delete('langs');

      if (yearFrom !== 2014) params.set('yearFrom', yearFrom);
      else params.delete('yearFrom');

      if (yearTo !== 2024) params.set('yearTo', yearTo);
      else params.delete('yearTo');

      // Joint Programmes
      const jointProgs = Object.keys(selectedJointProgrammes).filter(k => selectedJointProgrammes[k]);
      if (jointProgs.length > 0) params.set('jointProgrammes', jointProgs.join(','));
      else params.delete('jointProgrammes');

      // LNOBs
      const lnobs = Object.keys(selectedLnob).filter(k => selectedLnob[k]);
      if (lnobs.length > 0) params.set('lnobs', lnobs.join(','));
      else params.delete('lnobs');

      // Non-UN Partners
      const nonUnPartners = Object.keys(selectedNonUnPartners).filter(k => selectedNonUnPartners[k]);
      if (nonUnPartners.length > 0) params.set('nonUnPartners', nonUnPartners.join(','));
      else params.delete('nonUnPartners');

      isSyncingToUrl.current = true;
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, '', newUrl);
      window.dispatchEvent(new Event('urlchange'));
      isSyncingToUrl.current = false;
    }, 1000);

    return () => clearTimeout(handler);
  }, [selectedAgencies, selectedSdgs, selectedSectors, selectedLangs, yearFrom, yearTo, selectedJointProgrammes, selectedLnob, selectedNonUnPartners, isReady]);

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
  // (Moved yearFrom and yearTo up to avoid ReferenceError)

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

  const toggleJointProgramme = (key) => {
    setSelectedJointProgrammes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleLnob = (key) => {
    setSelectedLnob(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleNonUnPartner = (key) => {
    setSelectedNonUnPartners(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper to create slug from agency/sector name
  const createSlug = (str) => {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/(^-|-$)/g, '');
  };

  return (
    <>
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

        {/* 6. Joint Programme Card */}
        <div className={`filter-card ${jointProgrammesExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="filter-card-header" onClick={() => setJointProgrammesExpanded(!jointProgrammesExpanded)}>
            <h3>Joint Programme</h3>
            <span className="chevron-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {jointProgrammesExpanded ? <polyline points="18 15 12 9 6 15"></polyline> : <polyline points="6 9 12 15 18 9"></polyline>}
              </svg>
            </span>
          </div>

          {jointProgrammesExpanded && (
            <div className="filter-card-body">
              <div className="custom-checkbox-list">
                {(jointProgrammesShowAll ? jointProgrammesList : jointProgrammesList.slice(0, 5)).map((prog) => {
                  const slug = createSlug(prog);
                  return (
                    <label className="checkbox-item" key={slug}>
                      <input
                        type="checkbox"
                        checked={selectedJointProgrammes[slug] || false}
                        onChange={() => toggleJointProgramme(slug)}
                      />
                      <span className="checkbox-box"></span>
                      <span className="checkbox-label" style={{ fontSize: '13px', lineHeight: '1.4' }}>{prog}</span>
                    </label>
                  );
                })}
              </div>
              {!jointProgrammesShowAll && (
                <a
                  href="#"
                  className="filter-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setJointProgrammesShowAll(true);
                  }}
                >
                  Show all {jointProgrammesList.length} programmes
                </a>
              )}
            </div>
          )}
        </div>

        {/* 7. Leave No One Behind (LNOB) Card */}
        <div className={`filter-card ${lnobExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="filter-card-header" onClick={() => setLnobExpanded(!lnobExpanded)}>
            <h3>Leave No One Behind (LNOB)</h3>
            <span className="chevron-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {lnobExpanded ? <polyline points="18 15 12 9 6 15"></polyline> : <polyline points="6 9 12 15 18 9"></polyline>}
              </svg>
            </span>
          </div>

          {lnobExpanded && (
            <div className="filter-card-body">
              <div className="custom-checkbox-list">
                {lnobList.map((group) => {
                  const slug = createSlug(group);
                  return (
                    <label className="checkbox-item" key={slug}>
                      <input
                        type="checkbox"
                        checked={selectedLnob[slug] || false}
                        onChange={() => toggleLnob(slug)}
                      />
                      <span className="checkbox-box"></span>
                      <span className="checkbox-label">{group}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 8. Non-UN Partners Card */}
        <div className={`filter-card ${nonUnPartnersExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="filter-card-header" onClick={() => setNonUnPartnersExpanded(!nonUnPartnersExpanded)}>
            <h3>Non-UN Partners</h3>
            <span className="chevron-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {nonUnPartnersExpanded ? <polyline points="18 15 12 9 6 15"></polyline> : <polyline points="6 9 12 15 18 9"></polyline>}
              </svg>
            </span>
          </div>

          {nonUnPartnersExpanded && (
            <div className="filter-card-body">
              <div className="custom-checkbox-list">
                {nonUnPartnersList.map((partner) => {
                  const slug = createSlug(partner);
                  return (
                    <label className="checkbox-item" key={slug}>
                      <input
                        type="checkbox"
                        checked={selectedNonUnPartners[slug] || false}
                        onChange={() => toggleNonUnPartner(slug)}
                      />
                      <span className="checkbox-box"></span>
                      <span className="checkbox-label">{partner}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </aside>
      {/* Refining Search Modal */}
      {isRefining && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'white',
            padding: '24px 40px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
            <style>
              {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
            </style>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
              Applying search filter...
            </span>
          </div>
        </div>
      )}
    </>
  );
}