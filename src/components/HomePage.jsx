import React from 'react';
import MUIProvider from './MUIProvider';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FilterSidebar from './FilterSidebar';
import DocumentList from './DocumentList';
import InsightsBanner from './InsightsBanner';
import Footer from './Footer';

export default function HomePage() {
  return (
    <MUIProvider>
      <Navbar />
      <HeroSection />
      <div className="main-content">
        <FilterSidebar />
        <DocumentList />
      </div>
      <InsightsBanner />
      <Footer />
    </MUIProvider>
  );
}
