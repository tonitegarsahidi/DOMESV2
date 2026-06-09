import React, { useEffect, useState } from 'react';
import MUIProvider from './MUIProvider';
import Navbar from './Navbar';
import FilterSidebar from './FilterSidebar';
import DocumentList from './DocumentList';
import Footer from './Footer';

export default function SearchResultsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      setSearchQuery(decodeURIComponent(query));
    }
  }, []);

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
            <div className="results-header" style={{ marginBottom: '30px' }}>
              <h1 style={{ 
                fontSize: '28px', 
                fontWeight: '700', 
                color: '#1e293b', 
                marginBottom: '8px' 
              }}>
                Search Results
              </h1>
              <p style={{ color: '#64748b', fontSize: '14px' }}>
                {searchQuery ? `Showing results for: "${searchQuery}"` : 'Showing all documents'}
              </p>
            </div>
            
            <DocumentList searchQuery={searchQuery} />
          </div>
        </div>
      </div>
      <Footer />
    </MUIProvider>
  );
}