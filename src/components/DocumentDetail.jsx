import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

// Detailed document data map or fallback
const documentDetails = {
  1: {
    code: 'UNDP-2023-001',
    agency: 'UNDP',
    year: '2023',
    title: 'Annual Progress Report: Sustainable Development Goals in Indonesia 2023',
    language: 'English',
    fileSize: '~ 4.8 MB',
    added: '12/10/23',
    type: 'Report',
    image: '/images/doc-cover-sdg.png',
    abstract: [
      'This progress report outlines the milestones achieved in the past fiscal year, focusing on the impact of global initiatives on sustainable development goals across multiple governance levels in Indonesia.',
      'The analysis highlights major areas of improvement in poverty alleviation, clean energy integration, and educational access in remote regions, offering strategic recommendations to align regional policies with UN sustainability benchmarks.'
    ],
    summary: 'The report emphasizes that partnership between public and private sectors remains the cornerstone of achieving the 2030 Agenda in Indonesia, highlighting success stories in climate finance and inclusive social programs.',
    sdgs: ['GOAL 1', 'GOAL 7', 'GOAL 8', 'GOAL 10', 'GOAL 13', 'GOAL 17'],
    themes: ['Socio-Economic Development', 'Climate Action', 'Partnership for Goals'],
    sectors: ['Governance', 'Energy', 'Finance', 'Education']
  },
  2: {
    code: 'UNDP-2022-004',
    agency: 'UNDP',
    year: '2022',
    title: 'Climate Action Framework: Maritime Biodiversity in the Archipelago',
    language: 'English',
    fileSize: '~ 3.2 MB',
    added: '25/08/22',
    type: 'Framework',
    image: '/images/doc-cover-ocean.png',
    abstract: [
      'A strategic roadmap for protecting marine and coastal habitats in the Indonesian archipelago through sustainable fishing practices and community-led conservation efforts.',
      'The document provides comprehensive policy frameworks to mitigate illegal fishing, marine pollution, and coral reef degradation while fostering ecotourism opportunities for coastal communities.'
    ],
    summary: 'Protecting the archipelagic biodiversity requires centralized ocean monitoring, local community enforcement, and alternative sustainable livelihoods to ensure the prosperity of fishing villages.',
    sdgs: ['GOAL 13', 'GOAL 14', 'GOAL 15'],
    themes: ['Maritime Biodiversity', 'Environment', 'Ecotourism'],
    sectors: ['Fishery', 'Environment', 'Tourism', 'Governance']
  },
  3: {
    code: 'UNICEF-2023-008',
    agency: 'UNICEF',
    year: '2023',
    title: 'Children in Focus: Socio-Economic Protection Systems',
    language: 'English',
    fileSize: '~ 2.8 MB',
    added: '15/07/23',
    type: 'Report',
    image: '/images/doc-cover-children.png',
    abstract: [
      'Analyzing the efficacy of social safety nets for vulnerable families across the outer islands of Indonesia, with policy recommendations for enhanced coverage and efficiency.',
      'This study evaluates childcare accessibility, health services, and education resources in rural and underserved regions, focusing on post-pandemic recovery.'
    ],
    summary: 'Improving socio-economic protection systems for children is essential for regional growth. Recommendations focus on school feeding programs, direct cash transfers, and digital registration platforms.',
    sdgs: ['GOAL 1', 'GOAL 3', 'GOAL 4', 'GOAL 5', 'GOAL 10'],
    themes: ['Social Protection', 'Child Education', 'Healthcare Access'],
    sectors: ['Healthcare', 'Education', 'Social Affairs', 'Finance']
  }
};

// Default seaweed document (from user mockup)
const defaultDoc = {
  code: 'UNIDO-2015-001',
  agency: 'UNIDO',
  year: '2015',
  title: 'A diagnostic analysis of seaweed value chains in Sumenep Regency, Madura Indonesia',
  language: 'English',
  fileSize: '~ 2.4 MB',
  added: '01/10/16',
  type: 'Report',
  image: '/images/doc-cover-sdg.png', // Fallback cover
  abstract: [
    'This report provides a comprehensive diagnostic analysis of the seaweed value chains operating within the Sumenep Regency of Madura, Indonesia. It explores the intricate network of actors involved, from primary cultivation by local farmers to processing and market distribution.',
    'The analysis aims to identify key constraints and opportunities for upgrading the value chain, focusing on enhancing productivity, improving quality standards, and ensuring sustainable livelihoods for the communities dependent on this vital coastal resource. It addresses aspects of inclusive human development and economic transformation within the region.'
  ],
  summary: 'The Sumenep Regency seaweed value chain faces challenges in quality control and market access despite high production volumes. Key recommendations include establishing farmer cooperatives, improving drying techniques, and developing direct links with national processors to increase margins for primary producers.',
  sdgs: ['GOAL 2', 'GOAL 7', 'GOAL 8', 'GOAL 12', 'GOAL 13', 'GOAL 14', 'GOAL 15'],
  themes: ['Inclusive Human Development', 'Economic Transformation', 'Green Development', 'Innovation for SDGs'],
  sectors: ['Business', 'Economic Development', 'Energy', 'Environment', 'Fishery', 'Governance']
};

const relatedDocs = [
  { id: 6, image: '/images/doc-cover-sdg.png', date: 'SEPTEMBER 2017', title: 'Global International Waters Assessment: Sulu-Celebes...', agency: 'UNDP Indonesia' },
  { id: 7, image: '/images/doc-cover-ocean.png', date: 'OCTOBER 2017', title: 'Global International Waters Assessment: Indonesian Sea...', agency: 'UNEP' },
  { id: 8, image: '/images/doc-cover-children.png', date: 'DECEMBER 2014', title: 'Sustainable Use of Natural Resources in the Context of...', agency: 'UNEP' },
  { id: 9, image: '/images/doc-cover-ocean.png', date: 'JANUARY 2022', title: 'Three South Java Villages Getting Tsunami Ready -...', agency: 'UNESCO' }
];

// SDG list with icons (same as FilterSidebar)
const sdgList = [
  { id: 'g1', key: 'g1', number: 1, name: 'No Poverty', icon: '/images/SDG-logos/SDG-1_no-poverty.png', fullName: 'Goal 1: No Poverty' },
  { id: 'g2', key: 'g2', number: 2, name: 'Zero Hunger', icon: '/images/SDG-logos/SDG-2_zero-hunger.png', fullName: 'Goal 2: Zero Hunger' },
  { id: 'g3', key: 'g3', number: 3, name: 'Good Health', icon: '/images/SDG-logos/SDG-3_good-health-and-well-being.png', fullName: 'Goal 3: Good Health and Well-being' },
  { id: 'g4', key: 'g4', number: 4, name: 'Quality Education', icon: '/images/SDG-logos/SDG-4_quality-education.png', fullName: 'Goal 4: Quality Education' },
  { id: 'g5', key: 'g5', number: 5, name: 'Gender Equality', icon: '/images/SDG-logos/SDG-5_gender-equality.png', fullName: 'Goal 5: Gender Equality' },
  { id: 'g6', key: 'g6', number: 6, name: 'Clean Water', icon: '/images/SDG-logos/SDG-6_clean-water-and-sanitation.png', fullName: 'Goal 6: Clean Water and Sanitation' },
  { id: 'g7', key: 'g7', number: 7, name: 'Affordable Clean Energy', icon: '/images/SDG-logos/SDG-7_affordable-and-clean-energy.png', fullName: 'Goal 7: Affordable and Clean Energy' },
  { id: 'g8', key: 'g8', number: 8, name: 'Decent Work', icon: '/images/SDG-logos/SDG-8_decent-work-and-economic-growth.png', fullName: 'Goal 8: Decent Work and Economic Growth' },
  { id: 'g9', key: 'g9', number: 9, name: 'Industry Innovation', icon: '/images/SDG-logos/SDG-9_industry-innovation-and-infrastructure.png', fullName: 'Goal 9: Industry, Innovation and Infrastructure' },
  { id: 'g10', key: 'g10', number: 10, name: 'Reduced Inequalities', icon: '/images/SDG-logos/SDG-10_reduced-inequalities.png', fullName: 'Goal 10: Reduced Inequalities' },
  { id: 'g11', key: 'g11', number: 11, name: 'Sustainable Cities', icon: '/images/SDG-logos/SDG-11_sustainable-cities-and-communities.png', fullName: 'Goal 11: Sustainable Cities and Communities' },
  { id: 'g12', key: 'g12', number: 12, name: 'Responsible Consumption', icon: '/images/SDG-logos/SDG-12_responsible-consumption-and-production.png', fullName: 'Goal 12: Responsible Consumption and Production' },
  { id: 'g13', key: 'g13', number: 13, name: 'Climate Action', icon: '/images/SDG-logos/SDG-13_climate-action.png', fullName: 'Goal 13: Climate Action' },
  { id: 'g14', key: 'g14', number: 14, name: 'Life Below Water', icon: '/images/SDG-logos/SDG-14_life-below-water.png', fullName: 'Goal 14: Life Below Water' },
  { id: 'g15', key: 'g15', number: 15, name: 'Life on Land', icon: '/images/SDG-logos/SDG-15_life-on-land.png', fullName: 'Goal 15: Life on Land' },
  { id: 'g16', key: 'g16', number: 16, name: 'Peace & Justice', icon: '/images/SDG-logos/SDG-16_peace-justice-and-strong-institutions.png', fullName: 'Goal 16: Peace, Justice and Strong Institutions' },
  { id: 'g17', key: 'g17', number: 17, name: 'Partnerships', icon: '/images/SDG-logos/SDG-17_partnership-for-the-goals.png', fullName: 'Goal 17: Partnerships for the Goals' },
];

// Function to get SDG data from goal string (e.g. "GOAL 1" → sdg object)
const getSdgData = (goalStr) => {
  const num = parseInt(goalStr.replace('GOAL ', ''));
  return sdgList.find(s => s.number === num);
};

// Map SDG names to specific colors to make them look nice and vibrant
const getSdgClass = (goal) => {
  const goalNum = parseInt(goal.replace('GOAL ', ''));
  switch(goalNum) {
    case 1: return 'sdg-g1'; // red
    case 2: return 'sdg-g2'; // orange
    case 3: return 'sdg-g3'; // green
    case 4: return 'sdg-g4'; // red-dark
    case 5: return 'sdg-g5'; // orange-red
    case 7: return 'sdg-g7'; // gold
    case 8: return 'sdg-g8'; // dark-red
    case 10: return 'sdg-g10'; // pink
    case 11: return 'sdg-g11'; // orange-yellow
    case 12: return 'sdg-g12'; // dark-yellow
    case 13: return 'sdg-g13'; // dark-green
    case 14: return 'sdg-g14'; // blue
    case 15: return 'sdg-g15'; // light-green
    case 17: return 'sdg-g17'; // dark-blue
    default: return 'sdg-g14';
  }
};

export default function DocumentDetail({ id }) {
  const doc = documentDetails[id] || defaultDoc;

  return (
    <div className="detail-page-wrapper">
      <Navbar />

      <main className="detail-main-content">
        {/* Navigation Bar / Breadcrumbs */}
        <div className="detail-navigation-bar">
          <div className="breadcrumbs">
            <a href="/">Home</a>
            <span className="separator">&gt;</span>
            <span className="active-breadcrumb">Document Detail</span>
            <span className="separator">&gt;</span>
            <span className="active-breadcrumb code-breadcrumb">{doc.code}</span>
          </div>
          <a href="/" className="btn-back-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Search Results
          </a>
        </div>

        {/* Content Layout */}
        <div className="detail-columns">
          {/* Left Column: Cover & Action buttons */}
          <div className="detail-left-col">
            <div className="detail-cover-card">
              {/* Cover cover with overlay text resembling the seaweed chain document cover */}
              {doc.code === 'UNIDO-2015-001' ? (
                <div className="seaweed-mock-cover">
                  <div className="seaweed-mock-header">
                    <img src="/images/un-logo.png" alt="UN logo" className="mock-logo" />
                    <span>A Diagnostic analysis of Seaweed value chains in Sumenep Regency (Madura), East Java, Indonesia</span>
                  </div>
                  <div className="seaweed-mock-body">
                    <img src="/images/doc-cover-ocean.png" alt="Seaweed cover preview" />
                  </div>
                  <div className="seaweed-mock-footer">
                    <span>Safe for Work</span>
                  </div>
                </div>
              ) : (
                <img src={doc.image} alt={doc.title} className="detail-cover-img" />
              )}
            </div>

            <button className="btn-detail-download">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '10px'}}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              DOWNLOAD PDF
            </button>

            <button className="btn-detail-report">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '10px', verticalAlign: 'middle'}}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              REPORT BROKEN LINK
            </button>
          </div>

          {/* Right Column: Metadata & Description */}
          <div className="detail-right-col">
            <div className="detail-tags-top">
              <span className="tag-top">{doc.agency}</span>
              <span className="tag-top">{doc.year}</span>
            </div>

            <h1 className="detail-title">{doc.title}</h1>

            {/* Metadata Grid */}
            <div className="detail-meta-grid">
              <div className="meta-grid-box">
                <span className="meta-box-label">LANGUAGE</span>
                <span className="meta-box-value">{doc.language}</span>
              </div>
              <div className="meta-grid-box">
                <span className="meta-box-label">FILE SIZE</span>
                <span className="meta-box-value">{doc.fileSize}</span>
              </div>
              <div className="meta-grid-box">
                <span className="meta-box-label">ADDED</span>
                <span className="meta-box-value">{doc.added}</span>
              </div>
              <div className="meta-grid-box">
                <span className="meta-box-label">TYPE</span>
                <span className="meta-box-value">{doc.type}</span>
              </div>
            </div>

            {/* Abstract */}
            <div className="detail-section">
              <h2 className="detail-section-title">Abstract</h2>
              {doc.abstract.map((p, index) => (
                <p key={index} className="detail-paragraph">{p}</p>
              ))}
            </div>

            {/* Summary Document Box */}
            <div className="detail-summary-box">
              <div className="summary-box-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div className="summary-box-content">
                <h3>Summary Document</h3>
                <p>{doc.summary}</p>
                <a href="#" className="summary-read-more">
                  Read More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '4px'}}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </a>
              </div>
            </div>

            {/* Related SDGs */}
            <div className="detail-section">
              <h3 className="detail-sub-title">RELATED SDGS</h3>
              <div className="detail-sdg-grid">
                {doc.sdgs.map((goal, i) => {
                  const sdg = getSdgData(goal);
                  return sdg ? (
                    <div key={i} className="sdg-icon-wrapper detail-sdg-icon">
                      <img 
                        src={sdg.icon} 
                        alt={sdg.fullName} 
                        className="sdg-icon-detail" 
                      />
                      <span className="sdg-tooltip">{sdg.fullName}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Thematic Areas */}
            <div className="detail-section">
              <h3 className="detail-sub-title">THEMATIC AREAS</h3>
              <div className="detail-pills-row">
                {doc.themes.map((theme, i) => (
                  <span key={i} className="detail-pill-badge">{theme}</span>
                ))}
              </div>
            </div>

            {/* Sectors */}
            <div className="detail-section">
              <h3 className="detail-sub-title">SECTORS</h3>
              <div className="detail-pills-row">
                {doc.sectors.map((sector, i) => (
                  <span key={i} className="detail-pill-badge sector-badge">{sector}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Document Section at bottom */}
        <section className="detail-related-section">
          <h2>Related Document</h2>
          <div className="related-docs-grid">
            {relatedDocs.map((item) => (
              <article key={item.id} className="related-doc-card" onClick={() => window.location.href = `/document/detail/${item.id}`}>
                <div className="related-doc-card-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="related-doc-card-content">
                  <span className="related-card-date">{item.date}</span>
                  <h4 className="related-card-title">{item.title}</h4>
                  <div className="related-card-footer">
                    <span className="related-card-agency">{item.agency}</span>
                    <a href={`/document/detail/${item.id}`} className="related-card-link">View Details</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}