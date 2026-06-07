import React, { useState } from 'react';

const agencies = [
  { name: 'UNDP', count: 12, checked: true },
  { name: 'UNICEF', count: 10, checked: false },
  { name: 'WHO', count: 8, checked: false },
  { name: 'FAO', count: 7, checked: false },
];

const sdgGoals = [
  { name: 'Goal 13: Climate Action', color: '#3f7e44', checked: true },
  { name: 'Goal 14: Life Below Water', color: '#0a97d9', checked: true },
  { name: 'Goal 5: Gender Equality', color: '#ff3a21', checked: false },
  { name: 'Goal 11: Sustainable Cities', color: '#fd9d24', checked: false },
];

const languages = [
  { name: 'Bahasa Indonesia', checked: true },
  { name: 'English', checked: true },
  { name: 'Others', checked: false },
];

export default function FilterSidebar() {
  const [yearValue, setYearValue] = useState(2024);

  return (
    <aside className="filter-sidebar" id="filter-sidebar">
      {/* Agencies */}
      <div className="filter-section">
        <h3 className="filter-section-title">Agencies</h3>
        <div className="filter-checkbox-group">
          {agencies.map((agency) => (
            <label key={agency.name} className="filter-checkbox">
              <input type="checkbox" defaultChecked={agency.checked} />
              <span>{agency.name}</span>
              <span className="count">({agency.count})</span>
            </label>
          ))}
        </div>
        <span className="filter-show-more">Show more (5)</span>
      </div>

      {/* SDG Goals */}
      <div className="filter-section">
        <h3 className="filter-section-title">SDG Goals</h3>
        <div className="filter-checkbox-group">
          {sdgGoals.map((goal) => (
            <label key={goal.name} className="filter-checkbox">
              <input type="checkbox" defaultChecked={goal.checked} />
              <span className="sdg-dot" style={{ backgroundColor: goal.color }}></span>
              <span>{goal.name}</span>
            </label>
          ))}
        </div>
        <span className="filter-show-more">Show more (13)</span>
      </div>

      {/* Publication Year */}
      <div className="filter-section">
        <h3 className="filter-section-title">Publication Year</h3>
        <div className="filter-year-range">
          <div className="filter-year-labels">
            <span>2014</span>
            <span>2024</span>
          </div>
          <input
            type="range"
            className="filter-year-slider"
            min="2014"
            max="2024"
            value={yearValue}
            onChange={(e) => setYearValue(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Language */}
      <div className="filter-section">
        <h3 className="filter-section-title">Language</h3>
        <div className="filter-checkbox-group">
          {languages.map((lang) => (
            <label key={lang.name} className="filter-checkbox">
              <input type="checkbox" defaultChecked={lang.checked} />
              <span>{lang.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sectoral Analysis */}
      <div className="filter-section">
        <h3 className="filter-section-title">Sectoral Analysis</h3>
      </div>
    </aside>
  );
}
