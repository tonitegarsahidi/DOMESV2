import React, { useEffect, useRef } from 'react';

export default function HeroSection() {
  const quickTags = ['COVID 19', 'Climate Change', 'Gender Equality', 'Economic Recovery'];
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const logo = document.querySelector('.un-logo-background');
      if (logo) {
        const scrollY = window.scrollY;
        // Parallax effect: logo bergerak 0.3x dari kecepatan scroll
        logo.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    const searchQuery = searchInputRef.current?.value || '';
    // Navigate to search results page with query parameter
    window.location.href = `/search-results?q=${encodeURIComponent(searchQuery)}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="hero-section" id="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          DOMES — <span>Document Repository</span>
        </h1>
        <p className="hero-subtitle">
          The central ecosystem for UN Indonesia publications, policy reports, and data
          snapshots. Empowering research and evidence-based decision making.
        </p>

        <div className="hero-search" id="hero-search">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search by title, agency or keywords..."
            onKeyPress={handleKeyPress}
          />
          <button className="hero-search-button" onClick={handleSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            Search Repository
          </button>
        </div>

        <div className="hero-tags">
          <span className="hero-tags-label">Quick Tags:</span>
          {quickTags.map((tag) => (
            <span key={tag} className="hero-tag">{tag}</span>
          ))}
          <span className="hero-tag advanced">Advanced Filters</span>
        </div>
      </div>
      <div className="un-logo-background">
         <img src="/images/UN Logo_Horizontal_White_English.png" alt="UN Logo Background" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
       </div>
    </section>
  );
}