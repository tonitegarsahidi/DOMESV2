import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

// Detailed document data map or fallback
const digitalEconomyDoc = {
  code: 'UNDP-2024-001',
  agency: 'UNDP',
  year: '2024',
  title: 'Digital Economy and Financial Inclusion in Rural Indonesia',
  language: 'English, Bahasa Indonesia',
  fileSize: '4.2 MB',
  added: '15/05/2024',
  type: 'Report',
  image: '/images/report_cover.png',
  totalPages: 120,
  pubStatus: 'Published',
  focalPoint: {
    name: 'Budi Santoso',
    email: 'b.santoso@undp.org',
    phone: '+62 812 3456 7890',
    dept: 'Inclusive Growth Unit'
  },
  classification: {
    leadAgency: 'UNDP',
    otherAgencies: ['World Bank'],
    jointProgramme: 'Yes',
    geographicScope: 'National (Indonesia)',
    nonUnPartners: [
      { type: 'Government', name: 'Ministry of Villages' },
      { type: 'Consulting Firm', name: 'GoTo Group' }
    ],
    thematicAreas: ['Inclusive Economic Transformation'],
    lnobGroups: ['Women and Girls', 'Rural populations'],
    sectors: ['Economic Development', 'Innovation and Technology', 'Rural and Regional Development']
  },
  abstract: [
    "This comprehensive report analyzes the rapid expansion of digital financial services across rural Indonesia. It highlights the profound impact of mobile banking and fintech solutions on local micro-economies, emphasizing significant improvements in women's financial independence and empowerment."
  ],
  summary: "<b>Executive Overview</b><br><br>This extensive report provides an in-depth analysis of the digital economy's penetration into rural areas of Indonesia, focusing on the critical role of financial inclusion in driving sustainable economic development. As digital infrastructure expands across the archipelago, unprecedented opportunities are emerging for smallholder farmers, micro, small, and medium enterprises (MSMEs), and previously unbanked populations.<br><br><b>Key Findings:</b><ul><li><b>Technological Adoption:</b> Mobile internet penetration in rural regions has surged by 45% over the past three years, laying the groundwork for digital financial services (DFS) adoption.</li><li><b>Economic Impact:</b> Access to digital credit and savings platforms has enabled rural MSMEs to increase their average revenue by approximately 22%, fostering local economic resilience.</li><li><b>Gender Equality:</b> Digital financial inclusion has disproportionately benefited rural women. Female-led enterprises represent 60% of new digital banking accounts, providing them with unprecedented control over household finances and business capital.</li><li><b>Agricultural Supply Chains:</b> Agritech platforms integrated with digital payment systems have reduced middleman dependencies, increasing farmers' profit margins by up to 15%.</li></ul><br><b>Challenges Identified</b><br><br>Despite significant progress, substantial barriers remain. The report identifies three primary challenges hindering universal financial inclusion in rural Indonesia: persistent gaps in digital literacy, inadequate telecommunications infrastructure in the most remote areas (the 3T regions: frontier, outermost, and underdeveloped), and limited trust in formal financial institutions among older demographics. Cybersecurity concerns and the risk of predatory digital lending practices also require urgent regulatory attention.<br><br><b>Strategic Recommendations</b><br><br>To accelerate progress towards the Sustainable Development Goals (SDGs), particularly Goal 1 (No Poverty) and Goal 5 (Gender Equality), the report outlines a multi-stakeholder action plan. We recommend enhanced public-private partnerships to subsidize rural broadband infrastructure. Furthermore, targeted digital literacy campaigns, tailored to local languages and cultural contexts, are essential. Regulatory frameworks must be strengthened to protect vulnerable new consumers while simultaneously fostering fintech innovation. By addressing these critical areas, Indonesia can ensure that the digital revolution serves as an inclusive engine for equitable prosperity across its vast rural landscape, leaving no one behind in the transition to a modern digital economy.",
  sdgs: ['GOAL 1', 'GOAL 5', 'GOAL 8', 'GOAL 10'],
  tags: ['digital economy', 'financial inclusion', 'fintech', 'women empowerment', 'rural development']
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
  const doc = digitalEconomyDoc; // Ignore ID, always show dummy data

  return (
    <div className="detail-page-wrapper">
      <Navbar />

      {/* Premium Stylish Document Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--un-secondary) 0%, var(--un-primary-dark) 100%)', 
        padding: '40px 20px 140px', 
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle watermark logo */}
        <div style={{ position: 'absolute', right: '-2%', top: '-20%', opacity: '0.05', width: '500px', pointerEvents: 'none' }}>
          <img src="/images/UN Logo_Horizontal_White_English.png" alt="" style={{ width: '100%' }} />
        </div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '13px', color: '#b3e5fc', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              <a href="/" style={{ color: '#b3e5fc', textDecoration: 'none' }}>Home</a> 
              <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span> 
              <a href="#" style={{ color: '#b3e5fc', textDecoration: 'none', cursor: 'default' }}>Document Details</a>
              <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span> 
              <span style={{ color: '#ffffff' }}>{doc.code}</span>
            </div>
            <a href="/search-results" style={{ display: 'flex', alignItems: 'center', color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: '500', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '20px', backdropFilter: 'blur(4px)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background='rgba(255,255,255,0.2)'} onMouseOut={(e) => e.currentTarget.style.background='rgba(255,255,255,0.1)'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back
            </a>
          </div>
        </div>
      </div>

      <main className="detail-main-content" style={{ paddingTop: 0 }}>
        {/* Content Layout */}
        <div className="detail-columns" style={{ marginTop: '-80px', position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '-80px auto 60px auto' }}>
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
                <img src={doc.image} alt={doc.title} className="detail-cover-img" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.25)', border: '6px solid white', borderRadius: '12px' }} />
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
          <div className="detail-right-col" style={{ background: '#ffffff', borderRadius: '16px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <div className="detail-tags-top" style={{ marginBottom: '16px' }}>
              <span className="tag-top" style={{ background: '#e0f2fe', color: '#0369a1', padding: '6px 12px', borderRadius: '4px', fontWeight: '600', fontSize: '13px', marginRight: '12px' }}>{doc.agency}</span>
              <span className="tag-top" style={{ background: '#f1f5f9', color: '#475569', padding: '6px 12px', borderRadius: '4px', fontWeight: '600', fontSize: '13px' }}>{doc.year}</span>
            </div>

            <h1 className="detail-title" style={{ fontSize: '32px', marginBottom: '24px', color: '#0f172a', lineHeight: '1.2' }}>{doc.title}</h1>

            {/* Abstract */}
            <div className="detail-section" style={{ marginBottom: '32px' }}>
              <h2 className="detail-section-title" style={{ fontSize: '18px', marginBottom: '12px', color: '#334155', fontWeight: '700' }}>Abstract (Short Summary)</h2>
              {doc.abstract.map((p, index) => (
                <p key={index} className="detail-paragraph" style={{ fontSize: '16px', color: '#475569', lineHeight: '1.6', margin: 0 }}>{p}</p>
              ))}
            </div>

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
                <span className="meta-box-label">TOTAL PAGES</span>
                <span className="meta-box-value">{doc.totalPages} Pages</span>
              </div>
              <div className="meta-grid-box">
                <span className="meta-box-label">ADDED</span>
                <span className="meta-box-value">{doc.added}</span>
              </div>
              <div className="meta-grid-box">
                <span className="meta-box-label">TYPE</span>
                <span className="meta-box-value">{doc.type}</span>
              </div>
              <div className="meta-grid-box">
                <span className="meta-box-label">STATUS</span>
                <span className="meta-box-value" style={{ color: '#16a34a', fontWeight: '600' }}>{doc.pubStatus}</span>
              </div>
            </div>

            {/* Tags Grid (from keywords) */}
            <div className="detail-section">
              <div className="detail-pills-row" style={{ marginTop: '16px', marginBottom: '24px' }}>
                {doc.tags.map((tag, i) => (
                  <span key={i} className="detail-pill-badge" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', textTransform: 'none' }}>#{tag}</span>
                ))}
              </div>
            </div>

            {/* Summary Document Box */}
            <div className="detail-summary-box" style={{ flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div className="summary-box-icon" style={{ marginRight: '16px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>Detailed Summary</h3>
              </div>
              <div className="summary-box-content" style={{ paddingLeft: '0' }}>
                <div 
                  className="wysiwyg-content" 
                  style={{ lineHeight: '1.7', color: '#334155', fontSize: '15px' }}
                  dangerouslySetInnerHTML={{ __html: doc.summary }}
                />
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

            {/* Classification & Metadata Row */}
            <div className="detail-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div>
                <h3 className="detail-sub-title">THEMATIC AREAS</h3>
                <div className="detail-pills-row">
                  {doc.classification.thematicAreas.map((theme, i) => (
                    <span key={i} className="detail-pill-badge">{theme}</span>
                  ))}
                </div>

                <h3 className="detail-sub-title" style={{ marginTop: '24px' }}>SECTORS</h3>
                <div className="detail-pills-row">
                  {doc.classification.sectors.map((sector, i) => (
                    <span key={i} className="detail-pill-badge sector-badge">{sector}</span>
                  ))}
                </div>

                <h3 className="detail-sub-title" style={{ marginTop: '24px' }}>LEAVE NO ONE BEHIND (LNOB)</h3>
                <div className="detail-pills-row">
                  {doc.classification.lnobGroups.map((group, i) => (
                    <span key={i} className="detail-pill-badge" style={{ background: '#fce7f3', color: '#be185d', borderColor: '#fbcfe8' }}>{group}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="detail-sub-title">CLASSIFICATION DETAILS</h3>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>LEAD AGENCY</span>
                    <span style={{ fontSize: '14px', color: '#0f172a', fontWeight: '500' }}>{doc.classification.leadAgency}</span>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>OTHER AGENCIES</span>
                    <span style={{ fontSize: '14px', color: '#0f172a' }}>{doc.classification.otherAgencies.join(', ')}</span>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>JOINT PROGRAMME</span>
                    <span style={{ fontSize: '14px', color: '#0f172a' }}>{doc.classification.jointProgramme}</span>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>GEOGRAPHIC SCOPE</span>
                    <span style={{ fontSize: '14px', color: '#0f172a' }}>{doc.classification.geographicScope}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>NON-UN PARTNERS</span>
                    {doc.classification.nonUnPartners.map((p, idx) => (
                      <div key={idx} style={{ fontSize: '13px', color: '#334155', marginBottom: '2px' }}>
                        • <strong>{p.name}</strong> ({p.type})
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="detail-sub-title" style={{ marginTop: '24px' }}>FOCAL POINT</h3>
                <div style={{ background: '#f0fdfa', padding: '16px', borderRadius: '8px', border: '1px solid #ccfbf1' }}>
                  <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#0f766e' }}>{doc.focalPoint.name}</p>
                  <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#0f766e' }}>{doc.focalPoint.dept}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', fontSize: '13px', color: '#0f766e' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    {doc.focalPoint.email}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '13px', color: '#0f766e' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    {doc.focalPoint.phone}
                  </div>
                </div>
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