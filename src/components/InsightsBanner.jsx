import React, { useState, useEffect } from 'react';
import { getStats } from '../utils/api.js';

export default function InsightsBanner() {
  const [statsData, setStatsData] = useState({
    total_documents: 1796,
    total_agencies: 24,
    total_partners: 35,
    total_sdg_goals: 17
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await getStats();
        if (res.success && res.data) {
          setStatsData(res.data);
        }
      } catch (err) {
        console.error('Failed to load public stats from server:', err);
      }
    }
    loadStats();
  }, []);

  const stats = [
    { number: Number(statsData.total_documents).toLocaleString('id-ID'), label: 'Documents' },
    { number: String(statsData.total_agencies), label: 'Agencies' },
    { number: `${statsData.total_partners}+`, label: 'Partners' },
    { number: String(statsData.total_sdg_goals), label: 'SDG Goals' },
  ];

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
          <button 
            className="insights-cta"
            onClick={() => { window.location.href = '/analytics'; }}
          >
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
