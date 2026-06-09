import React from 'react';

export default function AboutContent() {
  const agencies = [
    'FAO', 'UNDP', 'UNEP', 'UNESCO', 'UNICEF', 'WHO', 'World Bank', 'ILO', 'IMF', 'UN-Habitat'
  ];

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Hero Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '60px', marginBottom: '80px' }}>
        <div style={{ flex: '1 1 500px' }}>
          <span style={{ color: '#3366cc', fontWeight: '600', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>About The Platform</span>
          <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#1e293b', marginTop: '16px', marginBottom: '24px', lineHeight: 1.2 }}>
            Centralizing Knowledge for a Sustainable Future
          </h1>
          <p style={{ color: '#475569', fontSize: '18px', lineHeight: 1.6, marginBottom: '24px' }}>
            The Document Management System (DOMES) is a unified platform designed to seamlessly aggregate, organize, and distribute critical research, policy briefs, and operational reports across all United Nations agencies in Indonesia.
          </p>
          <p style={{ color: '#475569', fontSize: '18px', lineHeight: 1.6 }}>
            Our mission is to break down informational silos, foster cross-agency collaboration, and ensure that vital data is accessible to policymakers and the public to accelerate progress toward the Sustainable Development Goals (SDGs).
          </p>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <img src="/images/about_illustration.png" alt="About DOMES" style={{ width: '100%', maxWidth: '500px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
        </div>
      </div>

      {/* Agencies Grid */}
      <div style={{ textAlign: 'center', padding: '60px 0', borderTop: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Participating Agencies</h2>
        <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          DOMES is proudly supported by and integrates data from the following United Nations organizations.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {agencies.map((agency, i) => (
            <div key={i} style={{ 
              background: 'white', 
              padding: '16px 32px', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0',
              fontWeight: '600',
              color: '#334155',
              fontSize: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              {agency}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
