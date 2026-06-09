import React, { useState } from 'react';
import { 
  AreaChart, Area, 
  BarChart, Bar, 
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function AnalyticsDashboard() {
  const [showUploadData, setShowUploadData] = useState(false);
  const [showSdgData, setShowSdgData] = useState(false);
  const [showAgencyData, setShowAgencyData] = useState(false);
  const [showSectorData, setShowSectorData] = useState(false);
  const [showLanguageData, setShowLanguageData] = useState(false);

  // Simulated Data Sets
  const uploadData = [
    { year: '2014', uploads: 240 },
    { year: '2015', uploads: 350 },
    { year: '2016', uploads: 480 },
    { year: '2017', uploads: 620 },
    { year: '2018', uploads: 750 },
    { year: '2019', uploads: 910 },
    { year: '2020', uploads: 1100 },
    { year: '2021', uploads: 1450 },
    { year: '2022', uploads: 1800 },
    { year: '2023', uploads: 2150 },
    { year: '2024', uploads: 2567 },
  ];

  const sdgData = [
    { name: 'SDG 13: Climate', value: 850 },
    { name: 'SDG 4: Education', value: 620 },
    { name: 'SDG 5: Gender', value: 540 },
    { name: 'SDG 3: Health', value: 480 },
    { name: 'SDG 1: Poverty', value: 410 },
    { name: 'SDG 8: Econ Growth', value: 380 },
    { name: 'SDG 16: Peace', value: 310 },
    { name: 'SDG 10: Inequality', value: 290 },
  ];

  const agencyData = [
    { name: 'UNDP', docs: 3400 },
    { name: 'UNICEF', docs: 2800 },
    { name: 'WHO', docs: 1900 },
    { name: 'FAO', docs: 1200 },
    { name: 'UNESCO', docs: 950 },
    { name: 'World Bank', docs: 820 },
    { name: 'ILO', docs: 750 },
    { name: 'UNEP', docs: 637 },
  ];

  const sectorData = [
    { name: 'Environmental', value: 45 },
    { name: 'Social Development', value: 25 },
    { name: 'Economic', value: 20 },
    { name: 'Governance', value: 10 },
  ];

  const languageData = [
    { name: 'English', value: 65 },
    { name: 'Bahasa Indonesia', value: 30 },
    { name: 'Local Dialects', value: 5 },
  ];

  // Colors
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#64748b', '#14b8a6'];
  const PIE_COLORS = ['#3366cc', '#10b981', '#f59e0b', '#6366f1'];

  // Custom Tooltip formatter
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'white', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#1e293b' }}>{label}</p>
          <p style={{ margin: 0, color: '#3b82f6', fontWeight: '500' }}>
            {payload[0].value} {payload[0].name === 'uploads' || payload[0].name === 'docs' ? 'Documents' : (payload[0].unit || '')}
          </p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'white', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: '#1e293b' }}>{payload[0].name}</p>
          <p style={{ margin: 0, color: payload[0].payload.fill, fontWeight: '500' }}>
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Reusable Data Table Component
  const DataTable = ({ data, columns }) => (
    <div style={{ marginTop: '16px', overflowX: 'auto', animation: 'fadeIn 0.3s ease-in-out' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
            {columns.map((col, i) => (
              <th key={i} style={{ padding: '10px 12px', color: '#475569', textAlign: col.align || 'left', fontWeight: '600' }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
              {columns.map((col, j) => (
                <td key={j} style={{ padding: '10px 12px', color: '#1e293b', textAlign: col.align || 'left' }}>
                  {row[col.key]} {col.suffix || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ToggleButton = ({ show, onClick }) => (
    <div style={{ marginTop: '16px', textAlign: 'right', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
      <button 
        onClick={onClick}
        style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '6px', color: '#334155', fontWeight: '600', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto', transition: 'all 0.2s' }}
        onMouseOver={(e) => { e.currentTarget.style.background = '#e2e8f0'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
        {show ? 'Hide Data' : 'See Data'}
      </button>
    </div>
  );

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>Repository Analytics</h1>
        <p style={{ color: '#64748b', fontSize: '16px' }}>Real-time, interactive insights and distribution of documents across the DOMES platform.</p>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>Total Documents</p>
          <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>12,457</h2>
          <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '500', background: '#d1fae5', padding: '2px 8px', borderRadius: '12px' }}>+12% vs last year</span>
        </div>
        
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>Active Agencies</p>
          <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>24</h2>
          <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '500', background: '#d1fae5', padding: '2px 8px', borderRadius: '12px' }}>Fully Integrated</span>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <p style={{ color: '#64748b', fontSize: '14px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>Monthly Downloads</p>
          <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>84.2K</h2>
          <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '500', background: '#d1fae5', padding: '2px 8px', borderRadius: '12px' }}>+24% vs last month</span>
        </div>
      </div>

      {/* Main Charts: Uploads & SDGs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px', marginBottom: '30px' }}>
        {/* Uploads Over Time */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>Document Uploads Over Time</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer>
              <AreaChart data={uploadData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="uploads" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUploads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <ToggleButton show={showUploadData} onClick={() => setShowUploadData(!showUploadData)} />
          {showUploadData && <DataTable data={uploadData} columns={[{ label: 'Year', key: 'year' }, { label: 'Total Uploads', key: 'uploads', align: 'right' }]} />}
        </div>

        {/* SDG Distribution */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>Top Documents by SDG</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={sdgData} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} width={120} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20}>
                  {sdgData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ToggleButton show={showSdgData} onClick={() => setShowSdgData(!showSdgData)} />
          {showSdgData && <DataTable data={sdgData} columns={[{ label: 'SDG Goal', key: 'name' }, { label: 'Documents', key: 'value', align: 'right' }]} />}
        </div>
      </div>

      {/* Secondary Charts: Agencies, Sectors, Languages */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        {/* Agencies Contribution */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>Contributions by Agency</h3>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={agencyData} margin={{ top: 10, right: 0, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} angle={-45} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="docs" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ToggleButton show={showAgencyData} onClick={() => setShowAgencyData(!showAgencyData)} />
          {showAgencyData && <DataTable data={agencyData} columns={[{ label: 'Agency Name', key: 'name' }, { label: 'Total Documents', key: 'docs', align: 'right' }]} />}
        </div>

        {/* Sectors Focus */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>Sector Focus Distribution</h3>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={sectorData} cx="50%" cy="45%" innerRadius={0} outerRadius={90} paddingAngle={2} dataKey="value" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ToggleButton show={showSectorData} onClick={() => setShowSectorData(!showSectorData)} />
          {showSectorData && <DataTable data={sectorData} columns={[{ label: 'Sector Name', key: 'name' }, { label: 'Percentage', key: 'value', align: 'right', suffix: '%' }]} />}
        </div>

        {/* Languages Breakdown */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>Documents by Language</h3>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={languageData} cx="50%" cy="45%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#6366f1', '#06b6d4', '#94a3b8'][index]} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ToggleButton show={showLanguageData} onClick={() => setShowLanguageData(!showLanguageData)} />
          {showLanguageData && <DataTable data={languageData} columns={[{ label: 'Language', key: 'name' }, { label: 'Percentage', key: 'value', align: 'right', suffix: '%' }]} />}
        </div>

      </div>
    </div>
  );
}
