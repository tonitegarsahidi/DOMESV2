import React, { useEffect, useState } from 'react';
import MUIProvider from './MUIProvider';
import Navbar from './Navbar';
import FilterSidebar from './FilterSidebar';
import DocumentList from './DocumentList';
import Footer from './Footer';

export default function SearchResultsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  const parseFilters = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    setSearchQuery(query ? decodeURIComponent(query) : '');

    const filters = [];
    ['agencies', 'sdgs', 'sectors', 'langs'].forEach(param => {
      const val = urlParams.get(param);
      if (val) {
        val.split(',').forEach(v => {
          filters.push({ type: param, value: v });
        });
      }
    });
    setActiveFilters(filters);
  };

  useEffect(() => {
    parseFilters();
    window.addEventListener('urlchange', parseFilters);
    window.addEventListener('popstate', parseFilters);
    return () => {
      window.removeEventListener('urlchange', parseFilters);
      window.removeEventListener('popstate', parseFilters);
    }
  }, []);

  const removeFilter = (type, value) => {
    const urlParams = new URLSearchParams(window.location.search);
    const current = urlParams.get(type);
    if (current) {
      const updated = current.split(',').filter(v => v !== value);
      if (updated.length > 0) {
        urlParams.set(type, updated.join(','));
      } else {
        urlParams.delete(type);
      }
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.pushState({}, '', newUrl);
      window.dispatchEvent(new Event('urlchange'));
      // In a real app we might also need to notify FilterSidebar to uncheck the box. 
      // To simulate, we could reload, but for now just updating the URL and pill is fine.
    }
  };

  return (
    <MUIProvider>
      <Navbar />
      <div className="search-results-container" style={{ paddingTop: '80px', background: '#f8fafc', minHeight: '100vh' }}>
        <div className="page-container" style={{ 
          display: 'flex', 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '30px 20px', 
          gap: '40px' 
        }}>
          <FilterSidebar />
          
          <div className="results-content" style={{ flex: 1 }}>
            <div className="results-header" style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h1 style={{ 
                    fontSize: '28px', 
                    fontWeight: '700', 
                    color: '#1e293b', 
                    marginBottom: '8px' 
                  }}>
                    Search Results
                  </h1>
                  <p style={{ color: '#64748b', fontSize: '15px' }}>
                    {searchQuery ? `Showing results for: "${searchQuery}"` : 'Showing all documents'}
                  </p>
                </div>
                
                {/* Create Alert Button */}
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'white',
                  border: '1px solid #cbd5e1',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  color: '#3366cc',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#3366cc'; e.currentTarget.style.background = '#f8fafc'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = 'white'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  Create Alert
                </button>
              </div>

              {/* Related Searches */}
              {searchQuery && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Related:</span>
                  {['Green Economy', 'Carbon Emission', 'SDGs', 'Paris Agreement'].map((term, i) => (
                    <a key={i} href={`/search-results?q=${encodeURIComponent(term)}`} style={{
                      fontSize: '13px',
                      color: '#3366cc',
                      background: '#eff6ff',
                      padding: '4px 10px',
                      borderRadius: '16px',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}>
                      {term}
                    </a>
                  ))}
                </div>
              )}

              {/* Active Filter Pills */}
              {activeFilters.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', marginRight: '4px' }}>Active Filters:</span>
                  {activeFilters.map((filter, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      padding: '4px 10px',
                      borderRadius: '16px',
                      fontSize: '13px',
                      color: '#334155',
                      fontWeight: '500'
                    }}>
                      <span style={{ color: '#94a3b8', textTransform: 'capitalize' }}>{filter.type}:</span> 
                      {filter.value.toUpperCase()}
                      <button 
                        onClick={() => removeFilter(filter.type, filter.value)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0, display: 'flex' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                  <a href="/search-results" style={{ fontSize: '13px', color: '#3366cc', marginLeft: '8px', textDecoration: 'none' }}>Clear all</a>
                </div>
              )}
            </div>
            
            <DocumentList searchQuery={searchQuery} />
          </div>
        </div>
      </div>
      <Footer />
    </MUIProvider>
  );
}