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
    ['agencies', 'sdgs', 'sectors', 'langs', 'jointProgrammes', 'lnobs', 'nonUnPartners'].forEach(param => {
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
      <div className="search-results-container" style={{ background: '#f8fafc', minHeight: '100vh' }}>
        
        {/* Premium Stylish Search Header */}
        <div className="search-header-banner" style={{ 
          background: 'linear-gradient(135deg, var(--un-secondary) 0%, var(--un-primary-dark) 100%)', 
          padding: '60px 20px 75px', 
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle watermark logo */}
          <div style={{ position: 'absolute', right: '-2%', top: '-10%', opacity: '0.05', width: '400px', pointerEvents: 'none' }}>
            <img src="/images/UN Logo_Horizontal_White_English.png" alt="" style={{ width: '100%' }} />
          </div>
          
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ fontSize: '12px', color: '#b3e5fc', marginBottom: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
                <a href="/" style={{ color: '#b3e5fc', textDecoration: 'none' }}>Home</a> <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span> Search Results
              </div>
              <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px' }}>
                {searchQuery ? `Results for "${searchQuery}"` : 'Document Repository'}
              </h1>
              
              {/* Active Filter Pills moved to Header */}
              {activeFilters.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginTop: '16px' }}>
                  <span style={{ fontSize: '13px', color: '#b3e5fc', fontWeight: '600', marginRight: '4px' }}>Active Filters:</span>
                  {activeFilters.map((filter, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontSize: '13px',
                      color: '#ffffff',
                      fontWeight: '500',
                      backdropFilter: 'blur(4px)'
                    }}>
                      <span style={{ color: '#e0f5ff' }}>
                        {filter.type === 'jointProgrammes' ? 'Joint Programme' : 
                         filter.type === 'lnobs' ? 'LNOB' : 
                         filter.type === 'nonUnPartners' ? 'Non-UN Partner' : 
                         filter.type.charAt(0).toUpperCase() + filter.type.slice(1)}:
                      </span> 
                      {filter.value.toUpperCase()}
                      <button 
                        onClick={() => removeFilter(filter.type, filter.value)}
                        style={{ background: 'rgba(255, 255, 255, 0.2)', border: 'none', cursor: 'pointer', color: '#ffffff', padding: '2px', display: 'flex', borderRadius: '50%', marginLeft: '4px', transition: 'background 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                  <a href="/search-results" style={{ fontSize: '13px', color: '#e0f5ff', marginLeft: '8px', textDecoration: 'underline' }}>Clear all</a>
                </div>
              )}
            </div>
            
          </div>
        </div>

        <div className="page-container" style={{ 
          display: 'flex', 
          maxWidth: '1400px', 
          margin: '-50px auto 0', 
          padding: '0 20px 60px', 
          gap: '40px',
          position: 'relative',
          zIndex: 10
        }}>
          <FilterSidebar />
          
          <div className="results-content" style={{ flex: 1 }}>
            <div className="results-header" style={{ marginBottom: '24px' }}>

              {/* Related Searches */}
              {searchQuery && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '13px', color: '#e0f5ff', fontWeight: '600' }}>Related:</span>
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


            </div>
            
            <DocumentList searchQuery={searchQuery} />
          </div>
        </div>
      </div>
      <Footer />
    </MUIProvider>
  );
}