import React, { useState } from 'react';
import DocumentCard from './DocumentCard';

const documents = [
  {
    id: 1,
    image: '/images/doc-cover-sdg.png',
    tags: [
      { label: 'SDG', type: 'sdg' },
      { label: 'UNDP', type: 'agency' },
      { label: 'OCT 2023', type: 'date' },
    ],
    title: 'Annual Progress Report: Sustainable Development Goals in Indonesia 2023',
    description: 'This comprehensive report outlines the milestones achieved in the past fiscal year, focusing on the impact of global initiatives on sustainable development goals across multiple governance levels...',
    agency: 'UNDP, Indonesia',
    pages: 'PDF, 134 pages',
  },
  {
    id: 2,
    image: '/images/doc-cover-ocean.png',
    tags: [
      { label: 'SDG', type: 'sdg' },
      { label: 'WHO', type: 'agency' },
      { label: 'AUG 2022', type: 'date' },
    ],
    title: 'Climate Action Framework: Maritime Biodiversity in the Archipelago',
    description: 'A strategic roadmap for protecting marine and coastal habitats in the Indonesian archipelago through sustainable fishing practices and community-led conservation efforts...',
    agency: 'UNDP, Indonesia',
    pages: 'PDF, 78 pages',
  },
  {
    id: 3,
    image: '/images/doc-cover-children.png',
    tags: [
      { label: 'SDG', type: 'sdg' },
      { label: 'UNICEF', type: 'agency' },
      { label: 'JUL 2023', type: 'date' },
    ],
    title: 'Children in Focus: Socio-Economic Protection Systems',
    description: 'Analyzing the efficacy of social safety nets for vulnerable families across the outer islands of Indonesia, with policy recommendations for enhanced coverage and efficiency...',
    agency: 'UNICEF',
    pages: 'PDF, 92 pages',
  },
  {
    id: 4,
    image: '/images/doc-cover-sdg.png',
    tags: [
      { label: 'Goal 5', type: 'sdg' },
      { label: 'UN Women', type: 'agency' },
      { label: 'MAY 2023', type: 'date' },
    ],
    title: 'Gender Equality in the Workplace: Progress and Challenges',
    description: 'A national survey on female labor force participation, wage gaps, and policy interventions needed to foster inclusive economic growth and empower women in rural and urban areas...',
    agency: 'UN Women Indonesia',
    pages: 'PDF, 45 pages',
  },
  {
    id: 5,
    image: '/images/doc-cover-ocean.png',
    tags: [
      { label: 'Goal 2', type: 'sdg' },
      { label: 'FAO', type: 'agency' },
      { label: 'JUN 2023', type: 'date' },
    ],
    title: 'Sustainable Agriculture and Food Security Resilience',
    description: 'Examining the impact of climate smart agriculture practices on crop yields and food security for smallholder farmers amidst changing weather patterns in Southeast Asia...',
    agency: 'FAO Indonesia',
    pages: 'PDF, 64 pages',
  },
  {
    id: 6,
    image: '/images/doc-cover-sdg.png',
    tags: [
      { label: 'SDG', type: 'sdg' },
      { label: 'UNEP', type: 'agency' },
      { label: 'SEP 2023', type: 'date' },
    ],
    title: 'Global International Waters Assessment: Sulu-Celebes...',
    description: 'A comprehensive assessment of the Sulu-Celebes Sea large marine ecosystem, covering biodiversity, pollution, and transboundary governance issues...',
    agency: 'UNEP Indonesia',
    pages: 'PDF, 88 pages',
  },
  {
    id: 7,
    image: '/images/doc-cover-ocean.png',
    tags: [
      { label: 'Goal 14', type: 'sdg' },
      { label: 'UNEP', type: 'agency' },
      { label: 'OCT 2023', type: 'date' },
    ],
    title: 'Global International Waters Assessment: Indonesian Sea...',
    description: 'Assessment of Indonesian sea territories examining marine resource management, sustainable fisheries, and ocean governance frameworks...',
    agency: 'UNEP',
    pages: 'PDF, 72 pages',
  },
  {
    id: 8,
    image: '/images/doc-cover-children.png',
    tags: [
      { label: 'Goal 11', type: 'sdg' },
      { label: 'UNEP', type: 'agency' },
      { label: 'DEC 2022', type: 'date' },
    ],
    title: 'Sustainable Use of Natural Resources in the Context of...',
    description: 'Exploring sustainable resource utilization practices across Indonesian provinces with focus on community-based natural resource management...',
    agency: 'UNEP',
    pages: 'PDF, 56 pages',
  },
  {
    id: 9,
    image: '/images/doc-cover-sdg.png',
    tags: [
      { label: 'SDG', type: 'sdg' },
      { label: 'UNDP', type: 'agency' },
      { label: 'NOV 2023', type: 'date' },
    ],
    title: 'Sustainable Development Report: Eastern Indonesia Region',
    description: 'Regional analysis of sustainable development progress across eastern Indonesian provinces with policy recommendations...',
    agency: 'UNDP Indonesia',
    pages: 'PDF, 110 pages',
  },
  {
    id: 10,
    image: '/images/doc-cover-ocean.png',
    tags: [
      { label: 'Goal 14', type: 'sdg' },
      { label: 'FAO', type: 'agency' },
      { label: 'JAN 2024', type: 'date' },
    ],
    title: 'Marine Conservation Strategy: Coral Triangle Initiative',
    description: 'Strategic framework for protecting the Coral Triangle marine biodiversity through cross-border collaboration and sustainable fishing practices...',
    agency: 'FAO Indonesia',
    pages: 'PDF, 96 pages',
  },
  {
    id: 11,
    image: '/images/doc-cover-children.png',
    tags: [
      { label: 'Goal 4', type: 'sdg' },
      { label: 'UNICEF', type: 'agency' },
      { label: 'FEB 2024', type: 'date' },
    ],
    title: 'Education For All: Remote Learning Accessibility Report',
    description: 'Assessment of digital learning infrastructure in remote areas of Papua and West Papua, with recommendations to bridge the educational divide...',
    agency: 'UNICEF Indonesia',
    pages: 'PDF, 84 pages',
  },
  {
    id: 12,
    image: '/images/doc-cover-sdg.png',
    tags: [
      { label: 'Goal 13', type: 'sdg' },
      { label: 'UNEP', type: 'agency' },
      { label: 'MAR 2024', type: 'date' },
    ],
    title: 'Climate Change Adaptation: National Action Plan 2024',
    description: 'Comprehensive national strategy to address climate change impacts, focusing on disaster risk reduction and low-carbon development pathways...',
    agency: 'UNEP Indonesia',
    pages: 'PDF, 142 pages',
  },
];

const climateChangeDocuments = [
  { id: 101, image: '/images/climate_cover_1_1781002343125.png', tags: [{ label: 'Goal 13', type: 'sdg' }, { label: 'UNEP', type: 'agency' }, { label: 'JAN 2024', type: 'date' }], title: 'National Climate Change Action Plan 2024', description: 'A comprehensive framework for reducing greenhouse gas emissions and enhancing resilience against climate change across all major economic sectors in Indonesia. This document outlines the critical timeline for achieving net-zero by 2060, detailing the financial requirements, sector-specific targets, and the integration of sustainable practices to tackle climate change.', agency: 'UNEP Indonesia', pages: 'PDF, 150 pages' },
  { id: 102, image: '/images/climate_cover_2_1781002356072.png', tags: [{ label: 'Goal 14', type: 'sdg' }, { label: 'UNDP', type: 'agency' }, { label: 'FEB 2024', type: 'date' }], title: 'Climate Change Impact of Rising Sea Levels on Coastal Communities', description: 'Assessing the vulnerability of coastal populations to rising sea levels and proposing adaptive infrastructure solutions for regions affected by climate change. The report includes case studies from the northern coast of Java, emphasizing the socioeconomic impact on local fishermen and recommending seawalls to mitigate climate change induced flooding.', agency: 'UNDP Indonesia', pages: 'PDF, 85 pages' },
  { id: 103, image: '/images/climate_cover_3_1781002369050.png', tags: [{ label: 'Goal 7', type: 'sdg' }, { label: 'World Bank', type: 'agency' }, { label: 'MAR 2024', type: 'date' }], title: 'Renewable Energy Transition Strategies for Climate Change', description: 'Strategic pathways for accelerating the adoption of solar, wind, and geothermal energy to replace fossil fuel dependency and combat climate change in Southeast Asia. This comprehensive study analyzes the current grid infrastructure limitations and offers actionable policy mechanisms to incentivize green energy production to address climate change.', agency: 'World Bank', pages: 'PDF, 112 pages' },
  { id: 104, image: '/images/climate_cover_4_1781002382557.png', tags: [{ label: 'Goal 13', type: 'sdg' }, { label: 'FAO', type: 'agency' }, { label: 'APR 2024', type: 'date' }], title: 'Climate Change Resilience in Agriculture', description: 'Evaluating the effectiveness of climate-smart agricultural practices in safeguarding food security and improving livelihoods for smallholder farmers affected by climate change. Drawing on extensive field research, the document explores how changing rainfall patterns and extreme droughts caused by climate change are threatening staple crop yields.', agency: 'FAO Indonesia', pages: 'PDF, 94 pages' },
  { id: 105, image: '/images/climate_cover_1_1781002343125.png', tags: [{ label: 'Goal 15', type: 'sdg' }, { label: 'UNEP', type: 'agency' }, { label: 'MAY 2024', type: 'date' }], title: 'Deforestation and Carbon Sink Management for Climate Change', description: 'Analysis of forest conservation efforts and their critical role as carbon sinks in mitigating global climate change impacts. This paper critically reviews the progress of anti-deforestation moratoriums across Sumatra and Kalimantan, underscoring the urgency of enforcing stricter logging regulations to fight climate change.', agency: 'UNEP', pages: 'PDF, 76 pages' },
  { id: 106, image: '/images/climate_cover_2_1781002356072.png', tags: [{ label: 'Goal 11', type: 'sdg' }, { label: 'UN-Habitat', type: 'agency' }, { label: 'JUN 2024', type: 'date' }], title: 'Urban Heat Island Effect and Climate Change in Jakarta', description: 'Investigating temperature anomalies in metropolitan areas and proposing green infrastructure interventions to cool urban environments exacerbated by climate change. As rapid urbanization replaces green spaces, the report highlights the public health risks associated with extreme heatwaves and advocates for resilient cities against climate change.', agency: 'UN-Habitat', pages: 'PDF, 68 pages' },
  { id: 107, image: '/images/climate_cover_3_1781002369050.png', tags: [{ label: 'Goal 13', type: 'sdg' }, { label: 'IMF', type: 'agency' }, { label: 'JUL 2024', type: 'date' }], title: 'Carbon Pricing Systems to Mitigate Climate Change', description: 'Economic models and policy guidelines for implementing effective carbon taxes and cap-and-trade mechanisms to mitigate climate change in developing nations. The analysis provides a comparative look at successful carbon markets globally and evaluates how pricing carbon can reduce overall industrial emissions linked to climate change.', agency: 'IMF', pages: 'PDF, 105 pages' },
  { id: 108, image: '/images/climate_cover_4_1781002382557.png', tags: [{ label: 'Goal 9', type: 'sdg' }, { label: 'UNIDO', type: 'agency' }, { label: 'AUG 2024', type: 'date' }], title: 'Sustainable Transportation Policies for Climate Change', description: 'Review of electric vehicle adoption rates and public transit expansion to reduce transport-sector carbon emissions and fight climate change in urban centers. This document assesses the challenges in expanding EV charging networks and highlights the importance of integrating non-motorized transport options to tackle climate change.', agency: 'UNIDO', pages: 'PDF, 82 pages' },
  { id: 109, image: '/images/climate_cover_1_1781002343125.png', tags: [{ label: 'Goal 13', type: 'sdg' }, { label: 'UNEP', type: 'agency' }, { label: 'SEP 2024', type: 'date' }], title: 'Green Finance and Climate Change Investment Opportunities', description: 'Exploring the role of green bonds and sustainable finance in funding large-scale climate change adaptation and mitigation projects. The report breaks down the mechanisms of blended finance and serves as a comprehensive guide for financial institutions looking to support the global transition to a low-carbon economy to fight climate change.', agency: 'UNEP FI', pages: 'PDF, 120 pages' },
  { id: 110, image: '/images/climate_cover_2_1781002356072.png', tags: [{ label: 'Goal 15', type: 'sdg' }, { label: 'UNESCO', type: 'agency' }, { label: 'OCT 2024', type: 'date' }], title: 'Biodiversity Loss and Climate Change in Tropical Ecosystems', description: 'A comprehensive study on the correlation between shifting climate change patterns and the accelerating rate of species extinction in tropical rainforests. Highlighting key biodiversity hotspots, the document details how climate change is disrupting delicate ecological balances and calls for the establishment of interconnected protected areas.', agency: 'UNESCO', pages: 'PDF, 140 pages' },
  { id: 111, image: '/images/climate_cover_3_1781002369050.png', tags: [{ label: 'Goal 12', type: 'sdg' }, { label: 'ILO', type: 'agency' }, { label: 'NOV 2024', type: 'date' }], title: 'Corporate Sustainability and Climate Change Reporting Standards', description: 'Guidelines for integrating environmental impact assessments into corporate financial reporting to ensure transparency regarding climate change. This framework outlines standardized metrics for measuring a company’s carbon footprint, resource efficiency, and overall adherence to international climate change protocols.', agency: 'ILO', pages: 'PDF, 90 pages' },
  { id: 112, image: '/images/climate_cover_4_1781002382557.png', tags: [{ label: 'Goal 13', type: 'sdg' }, { label: 'UNICEF', type: 'agency' }, { label: 'DEC 2024', type: 'date' }], title: 'Youth Engagement in Climate Change Advocacy', description: 'Highlighting the impact of youth-led movements in driving climate change policy changes and raising public awareness on environmental issues. The report showcases inspiring case studies of young activists utilizing digital platforms to demand stronger climate change action from world leaders and policymakers.', agency: 'UNICEF', pages: 'PDF, 55 pages' },
];

export default function DocumentList({ searchQuery }) {
  const [viewMode, setViewMode] = useState('list');
  
  const isClimateSearch = searchQuery && searchQuery.toLowerCase().includes('climate');
  const displayDocuments = isClimateSearch ? climateChangeDocuments : documents;

  return (
    <div className="document-list-area" id="document-list">
      <div className="document-list-header">
        <div className="document-list-header-left">
          <h2 className="document-list-title">
            {searchQuery ? `Search Results` : 'Latest Document'}
          </h2>
          <span className="document-list-count">
            Showing 1-12 of {isClimateSearch ? '1,257' : '1,257'} documents
          </span>
        </div>
        <div className="view-toggle" id="view-toggle">
          <button
            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
            title="Grid view"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm10 10h-8v8h8v-8z"/>
            </svg>
          </button>
          <button
            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
            title="List view"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 5h2v2H3V5zm4 0h14v2H7V5zM3 11h2v2H3v-2zm4 0h14v2H7v-2zm-4 6h2v2H3v-2zm4 0h14v2H7v-2z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={viewMode === 'grid' ? 'document-grid' : 'document-list'}>
        {displayDocuments.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} viewMode={viewMode} searchQuery={searchQuery} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination" id="pagination">
        <button className="nav-btn" aria-label="Previous">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>...</button>
        <button>25</button>
        <button className="nav-btn" aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}