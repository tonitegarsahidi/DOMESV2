import React from 'react';

const stats = [
  { number: '1,796', label: 'Documents' },
  { number: '24', label: 'Agencies' },
  { number: '35+', label: 'Partners' },
  { number: '17', label: 'SDG Goals' },
];

export default function InsightsBanner() {
  return (
    <section className="insights-banner" id="insights-banner">
      <div className="insights-inner">
        <div className="insights-text">
          <h2>Insights at your fingertips</h2>
          <p>
            Monitor progress across SDG goals and visualize the
            impact of UN Indonesia's collaborative work through our
            interactive data dashboards.
          </p>
          <button className="insights-cta">
            View Analytics Dashboard
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>
        <div className="insights-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
