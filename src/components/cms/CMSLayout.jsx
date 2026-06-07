import React from 'react';
import CMSNavbar from './CMSNavbar.jsx';
import CMSFooter from './CMSFooter.jsx';

export default function CMSLayout({ children }) {
  return (
    <div className="cms-body">
      <CMSNavbar />
      {children}
      <CMSFooter />
    </div>
  );
}
