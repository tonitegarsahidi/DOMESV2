import React, { useState, useEffect } from 'react';
import DocumentCard from './DocumentCard';
import { getDocuments } from '../utils/api.js';

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
  const [displayDocuments, setDisplayDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortBy, setSortBy] = useState('newest');

  const normalizeDoc = (item) => {
    const tags = [];
    if (item.sdgs) {
      const sdgList = Array.isArray(item.sdgs) ? item.sdgs : [];
      sdgList.forEach(s => {
        const code = typeof s === 'object' ? s.code : s;
        tags.push({ label: code, type: 'sdg' });
      });
    }
    tags.push({ label: item.agency || 'UN', type: 'agency' });
    if (item.year) {
      tags.push({ label: String(item.year), type: 'date' });
    }
    
    return {
      id: item.id,
      image: item.cover_image || '/images/doc-cover-sdg.png',
      tags: tags,
      title: item.title,
      description: item.description || item.abstract || '',
      agency: item.agency,
      pages: `PDF, ${item.total_pages || 0} pages`,
      file_url: item.file_url || '#'
    };
  };

  const getFallbackDocs = (params) => {
    const q = params.q ? params.q.toLowerCase() : '';
    let list = q.includes('climate') ? climateChangeDocuments : documents;
    
    // Fallback search
    if (q && !q.includes('climate')) {
      list = documents.filter(d => 
        d.title.toLowerCase().includes(q) || 
        d.description.toLowerCase().includes(q)
      );
    }

    // Fallback agency filtering
    if (params.agencies) {
      const selectedAgencies = params.agencies.split(',');
      list = list.filter(d => 
        selectedAgencies.some(slug => {
          const matchAgency = d.tags.find(t => t.type === 'agency');
          return matchAgency && matchAgency.label.toLowerCase().replace(/[^a-z0-9]+/g, '') === slug;
        })
      );
    }

    // Fallback SDG filtering
    if (params.sdgs) {
      const selectedSdgs = params.sdgs.split(',');
      list = list.filter(d => 
        selectedSdgs.some(sdgCode => {
          const matchSdg = d.tags.find(t => t.type === 'sdg');
          if (!matchSdg) return false;
          const match = sdgCode.match(/\d+/);
          const goalNum = match ? match[0] : '';
          return matchSdg.label.toLowerCase().includes(goalNum) || matchSdg.label.toLowerCase() === 'sdg';
        })
      );
    }

    // Fallback sort
    if (params.sort === 'oldest') {
      list = [...list].sort((a, b) => a.id - b.id);
    } else if (params.sort === 'newest') {
      list = [...list].sort((a, b) => b.id - a.id);
    }

    const pageNum = parseInt(params.page) || 1;
    const limitNum = parseInt(params.limit) || 12;
    const start = (pageNum - 1) * limitNum;
    const items = list.slice(start, start + limitNum);

    return {
      items: items.map(d => normalizeDoc({
        id: String(d.id),
        title: d.title,
        description: d.description,
        agency: d.agency,
        total_pages: parseInt(d.pages.replace(/[^0-9]/g, '')) || 100,
        cover_image: d.image,
        year: d.tags.find(t => t.type === 'date')?.label.includes('2023') ? 2023 : 2024,
        sdgs: d.tags.filter(t => t.type === 'sdg').map(t => t.label)
      })),
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalItems: list.length,
        totalPages: Math.max(1, Math.ceil(list.length / limitNum))
      }
    };
  };

  const loadDocuments = async () => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const queryParams = {};
    params.forEach((value, key) => {
      queryParams[key] = value;
    });

    setPage(parseInt(queryParams.page) || 1);
    setLimit(parseInt(queryParams.limit) || 12);
    setSortBy(queryParams.sort || 'newest');

    try {
      const res = await getDocuments(queryParams);
      if (res && res.success && res.data) {
        const normalized = (res.data.items || []).map(item => normalizeDoc(item));
        setDisplayDocuments(normalized);
        if (res.data.pagination) {
          setPage(res.data.pagination.page || 1);
          setLimit(res.data.pagination.limit || 12);
          setTotalPages(res.data.pagination.totalPages || 1);
          setTotalItems(res.data.pagination.totalItems || 0);
        }
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      console.warn('Backend offline, using fallback static simulation:', err.message);
      const fallback = getFallbackDocs(queryParams);
      setDisplayDocuments(fallback.items);
      setPage(fallback.pagination.page);
      setLimit(fallback.pagination.limit);
      setTotalPages(fallback.pagination.totalPages);
      setTotalItems(fallback.pagination.totalItems);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
    window.addEventListener('urlchange', loadDocuments);
    window.addEventListener('popstate', loadDocuments);
    return () => {
      window.removeEventListener('urlchange', loadDocuments);
      window.removeEventListener('popstate', loadDocuments);
    };
  }, []);

  const updateUrlParam = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') {
      params.delete('page');
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
    window.dispatchEvent(new Event('urlchange'));
  };

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      updateUrlParam('page', pageNum);
    }
  };

  const handleLimitChange = (limitNum) => {
    updateUrlParam('limit', limitNum);
  };

  const handleSortChange = (sortVal) => {
    updateUrlParam('sort', sortVal);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisible = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      buttons.push(
        <button key={1} className={page === 1 ? 'active' : ''} onClick={() => handlePageChange(1)}>1</button>
      );
      if (start > 2) {
        buttons.push(<span key="dots-start" style={{ padding: '0 8px', color: '#64748b' }}>...</span>);
      }
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button key={i} className={page === i ? 'active' : ''} onClick={() => handlePageChange(i)}>{i}</button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        buttons.push(<span key="dots-end" style={{ padding: '0 8px', color: '#64748b' }}>...</span>);
      }
      buttons.push(
        <button key={totalPages} className={page === totalPages ? 'active' : ''} onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
      );
    }

    return buttons;
  };

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalItems);

  return (
    <div className="document-list-area" id="document-list" style={{ position: 'relative' }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.7)',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '12px',
          backdropFilter: 'blur(1px)'
        }}>
          <div className="spinner" style={{
            width: '40px',
            height: '40px',
            border: '3px solid #eff6ff',
            borderTop: '3px solid #3366cc',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      <div className="document-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div className="document-list-header-left">
          <h2 className="document-list-title">
            {searchQuery ? `Search Results` : 'Latest Document'}
          </h2>
          <span className="document-list-count">
            Showing {totalItems > 0 ? `${startItem}-${endItem} of ${totalItems}` : '0'} documents
          </span>
        </div>
        
        <div className="view-toggle" id="view-toggle" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              style={{ 
                padding: '6px 12px', 
                borderRadius: '6px', 
                border: '1px solid #cbd5e1', 
                color: '#334155',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                background: 'white'
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="views">Most Views</option>
              <option value="downloads">Most Downloads</option>
            </select>
          </div>

          {/* Grid/List Toggles */}
          <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
            <button
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              title="Grid view"
              style={{ border: 'none', borderRadius: 0, padding: '6px 8px' }}
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
              style={{ border: 'none', borderRadius: 0, padding: '6px 8px', borderLeft: '1px solid #cbd5e1' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 5h2v2H3V5zm4 0h14v2H7V5zM3 11h2v2H3v-2zm4 0h14v2H7v-2zm-4 6h2v2H3v-2zm4 0h14v2H7v-2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {displayDocuments.length > 0 ? (
        <>
          <div className={viewMode === 'grid' ? 'document-grid' : 'document-list'}>
            {displayDocuments.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} viewMode={viewMode} searchQuery={searchQuery} />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ fontSize: '14px', color: '#64748b' }}>
              Items per page: 
              <select 
                value={limit}
                onChange={(e) => handleLimitChange(Number(e.target.value))}
                style={{ marginLeft: '8px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', outline: 'none', cursor: 'pointer', background: 'white' }}
              >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
              </select>
            </div>
            {/* Pagination */}
            <div className="pagination" id="pagination" style={{ marginTop: 0 }}>
              <button 
                className="nav-btn" 
                aria-label="Previous" 
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              
              {renderPaginationButtons()}
              
              <button 
                className="nav-btn" 
                aria-label="Next" 
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Empty State */
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 20px',
          background: 'white',
          borderRadius: '12px',
          border: '1px dashed #cbd5e1',
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <img src="/images/empty_state.png" alt="No results found" style={{ width: '160px', marginBottom: '24px', opacity: 0.8 }} />
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>We couldn't find anything matching your search</h3>
          <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '400px', marginBottom: '24px' }}>
            Try adjusting your keywords, checking for typos, or clearing some filters to see more results.
          </p>
          <button 
            onClick={() => {
              window.history.pushState({}, '', window.location.pathname);
              window.dispatchEvent(new Event('urlchange'));
            }}
            style={{
              background: '#eff6ff',
              color: '#3366cc',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              border: '1px solid #bfdbfe',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#dbeafe'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#eff6ff'; }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}