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
    image: '/images/doc-cover-children.png',
    tags: [
      { label: 'Goal 5', type: 'sdg' },
      { label: 'UNFCF', type: 'agency' },
      { label: 'JUL 2023', type: 'date' },
    ],
    title: 'Children in Focus: Socio-Economic Protection Systems',
    description: 'Analyzing the efficacy of social safety nets for vulnerable families across the outer islands of Indonesia, with policy recommendations for enhanced coverage and efficiency...',
    agency: 'Indonesia',
    pages: 'PDF, Chosen',
  },
  {
    id: 5,
    image: '/images/doc-cover-ocean.png',
    tags: [
      { label: 'Goal 14', type: 'sdg' },
      { label: 'FAO', type: 'agency' },
      { label: 'JUL 2023', type: 'date' },
    ],
    title: 'Children in Focus: Socio-Economic Protection Systems',
    description: 'Analyzing the efficacy of social safety nets for vulnerable families across the outer islands of Indonesia, with policy recommendations for enhanced coverage and efficiency...',
    agency: 'Indonesia',
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
];

export default function DocumentList() {
  const [viewMode, setViewMode] = useState('list');

  return (
    <div className="document-list-area" id="document-list">
      <div className="document-list-header">
        <div className="document-list-header-left">
          <h2 className="document-list-title">Latest Document</h2>
          <span className="document-list-count">
            Showing 1-{viewMode === 'list' ? 5 : 9} of 1,246 documents
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
        {(viewMode === 'list' ? documents.slice(0, 5) : documents).map((doc) => (
          <DocumentCard key={doc.id} doc={doc} viewMode={viewMode} />
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
