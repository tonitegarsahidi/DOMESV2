import React, { useState, useEffect } from 'react';
import CMSLayout from './CMSLayout.jsx';

// Initial Mock Data
const defaultRefData = {
  sdgs: [
    { id: 1, number: 1, name: 'No Poverty', color: '#E5243B', icon: '/images/SDG-logos/SDG-1_no-poverty.png', status: 'Published' },
    { id: 2, number: 2, name: 'Zero Hunger', color: '#DDA63A', icon: '/images/SDG-logos/SDG-2_zero-hunger.png', status: 'Published' },
    { id: 3, number: 3, name: 'Good Health', color: '#4C9F38', icon: '/images/SDG-logos/SDG-3_good-health-and-well-being.png', status: 'Published' },
    { id: 4, number: 4, name: 'Quality Education', color: '#C5192D', icon: '/images/SDG-logos/SDG-4_quality-education.png', status: 'Published' },
    { id: 5, number: 5, name: 'Gender Equality', color: '#FF3A21', icon: '/images/SDG-logos/SDG-5_gender-equality.png', status: 'Published' },
    { id: 6, number: 6, name: 'Clean Water', color: '#26BDE2', icon: '/images/SDG-logos/SDG-6_clean-water-and-sanitation.png', status: 'Published' },
    { id: 7, number: 7, name: 'Affordable Clean Energy', color: '#FCC30B', icon: '/images/SDG-logos/SDG-7_affordable-and-clean-energy.png', status: 'Published' },
    { id: 8, number: 8, name: 'Decent Work', color: '#A21942', icon: '/images/SDG-logos/SDG-8_decent-work-and-economic-growth.png', status: 'Published' },
    { id: 9, number: 9, name: 'Industry Innovation', color: '#FD6925', icon: '/images/SDG-logos/SDG-9_industry-innovation-and-infrastructure.png', status: 'Published' },
    { id: 10, number: 10, name: 'Reduced Inequalities', color: '#DD1367', icon: '/images/SDG-logos/SDG-10_reduced-inequalities.png', status: 'Published' },
    { id: 11, number: 11, name: 'Sustainable Cities', color: '#FD9D24', icon: '/images/SDG-logos/SDG-11_sustainable-cities-and-communities.png', status: 'Published' },
    { id: 12, number: 12, name: 'Responsible Consumption', color: '#BF8B2E', icon: '/images/SDG-logos/SDG-12_responsible-consumption-and-production.png', status: 'Published' },
    { id: 13, number: 13, name: 'Climate Action', color: '#3F7E44', icon: '/images/SDG-logos/SDG-13_climate-action.png', status: 'Published' },
    { id: 14, number: 14, name: 'Life Below Water', color: '#0A97D9', icon: '/images/SDG-logos/SDG-14_life-below-water.png', status: 'Published' },
    { id: 15, number: 15, name: 'Life on Land', color: '#56C02B', icon: '/images/SDG-logos/SDG-15_life-on-land.png', status: 'Published' },
    { id: 16, number: 16, name: 'Peace & Justice', color: '#00689D', icon: '/images/SDG-logos/SDG-16_peace-justice-and-strong-institutions.png', status: 'Published' },
    { id: 17, number: 17, name: 'Partnerships', color: '#19486A', icon: '/images/SDG-logos/SDG-17_partnership-for-the-goals.png', status: 'Published' }
  ],
  agencies: [
    { id: 1, name: 'FAO', status: 'Published' },
    { id: 2, name: 'Global Pulse/ PLJ', status: 'Published' },
    { id: 3, name: 'IFAD', status: 'Published' },
    { id: 4, name: 'ILO', status: 'Published' },
    { id: 5, name: 'IMF', status: 'Published' },
    { id: 6, name: 'IOM', status: 'Published' },
    { id: 7, name: 'ITU', status: 'Published' },
    { id: 8, name: 'RCO', status: 'Published' },
    { id: 9, name: 'UNAIDS', status: 'Published' },
    { id: 10, name: 'UN Women', status: 'Published' },
    { id: 11, name: 'UNDP', status: 'Published' },
    { id: 12, name: 'UNEP', status: 'Published' },
    { id: 13, name: 'UNESCO', status: 'Published' },
    { id: 14, name: 'UNFPA', status: 'Published' },
    { id: 15, name: 'UN-HABITAT', status: 'Published' },
    { id: 16, name: 'UNHCR', status: 'Published' },
    { id: 17, name: 'UNICEF', status: 'Published' },
    { id: 18, name: 'UNIDO', status: 'Published' },
    { id: 19, name: 'UNOCHA', status: 'Published' },
    { id: 20, name: 'UNODC', status: 'Published' },
    { id: 21, name: 'UNOPS', status: 'Published' },
    { id: 22, name: 'WFP', status: 'Published' },
    { id: 23, name: 'WHO', status: 'Published' },
    { id: 24, name: 'World Bank', status: 'Published' }
  ],
  lnobs: [
    { id: 1, name: 'Women and Girls', status: 'Published' },
    { id: 2, name: 'Youth and Children', status: 'Published' },
    { id: 3, name: 'Persons with Disabilities', status: 'Published' }
  ],
  languages: [
    { id: 1, name: 'English', code: 'en', status: 'Published' },
    { id: 2, name: 'Bahasa Indonesia', code: 'id', status: 'Published' },
    { id: 3, name: 'Others', code: 'other', status: 'Published' }
  ],
  partners: [
    { id: 1, name: 'Government', status: 'Published' },
    { id: 2, name: 'Universities', status: 'Published' },
    { id: 3, name: 'Bilateral Agency', status: 'Published' },
    { id: 4, name: 'Consulting Firm', status: 'Published' },
    { id: 5, name: 'Think Tank / Research Institute', status: 'Published' },
    { id: 6, name: 'International NGO', status: 'Published' },
    { id: 7, name: 'Local NGO', status: 'Published' },
    { id: 8, name: 'Others', status: 'Published' }
  ],
  organizations: [
    { id: 1, code: 'fao', name: 'FAO - Food and Agriculture Organization', status: 'Published' },
    { id: 2, code: 'globalpulse', name: 'Global Pulse/ PLJ', status: 'Published' },
    { id: 3, code: 'ifad', name: 'IFAD - International Fund for Agricultural Development', status: 'Published' },
    { id: 4, code: 'ilo', name: 'ILO - International Labour Organization', status: 'Published' },
    { id: 5, code: 'imf', name: 'IMF - International Monetary Fund', status: 'Published' },
    { id: 6, code: 'iom', name: 'IOM - International Organization for Migration', status: 'Published' },
    { id: 7, code: 'itu', name: 'ITU - International Telecommunication Union', status: 'Published' },
    { id: 8, code: 'rco', name: 'RCO - Resident Coordinator\'s Office', status: 'Published' },
    { id: 9, code: 'unaids', name: 'UNAIDS - Joint United Nations Programme on HIV/AIDS', status: 'Published' },
    { id: 10, code: 'unwomen', name: 'UN Women - United Nations Entity for Gender Equality', status: 'Published' },
    { id: 11, code: 'undp', name: 'UNDP - United Nations Development Programme', status: 'Published' },
    { id: 12, code: 'unep', name: 'UNEP - United Nations Environment Programme', status: 'Published' },
    { id: 13, code: 'unesco', name: 'UNESCO - United Nations Educational, Scientific and Cultural Organization', status: 'Published' },
    { id: 14, code: 'unfpa', name: 'UNFPA - United Nations Population Fund', status: 'Published' },
    { id: 15, code: 'unhabitat', name: 'UN-HABITAT - United Nations Human Settlements Programme', status: 'Published' },
    { id: 16, code: 'unhcr', name: 'UNHCR - United Nations Refugee Agency', status: 'Published' },
    { id: 17, code: 'unicef', name: 'UNICEF - United Nations Children\'s Fund', status: 'Published' },
    { id: 18, code: 'unido', name: 'UNIDO - United Nations Industrial Development Organization', status: 'Published' },
    { id: 19, code: 'unocha', name: 'UNOCHA - UN Office for the Coordination of Humanitarian Affairs', status: 'Published' },
    { id: 20, code: 'unodc', name: 'UNODC - United Nations Office on Drugs and Crime', status: 'Published' },
    { id: 21, code: 'unops', name: 'UNOPS - United Nations Office for Project Services', status: 'Published' },
    { id: 22, code: 'wfp', name: 'WFP - World Food Programme', status: 'Published' },
    { id: 23, code: 'who', name: 'WHO - World Health Organization', status: 'Published' },
    { id: 24, code: 'worldbank', name: 'World Bank', status: 'Published' }
  ],
  jointprogrammes: [
    { id: 1, name: "Advancing Indonesia’s Lighting Market to High Efficient Technologies (ADLIGHT)", status: 'Published' },
    { id: 2, name: "Better Reproductive Health and Rights for All in Indonesia (BERANI)", status: 'Published' },
    { id: 3, name: "Better Sexual and Reproductive Rights for All in Indonesia (BERANI II)", status: 'Published' },
    { id: 4, name: "Building a safer South-East Asia by preventing chemical terrorism", status: 'Published' },
    { id: 5, name: "Climate Village Project (PROKLIM)", status: 'Published' },
    { id: 6, name: "Driving Public and Private Capital Towards Green (ASSIST)", status: 'Published' },
    { id: 7, name: "EmPower: Women for Climate-Resilient Societies", status: 'Published' },
    { id: 8, name: "Employment and Livelihood: An Inclusive Approach to Economic Empowerment (ELJP)", status: 'Published' },
    { id: 9, name: "Food Systems, Land Use and Restoration (FOLUR) Impact Program", status: 'Published' },
    { id: 10, name: "HIV/AIDS Joint Programme", status: 'Published' }
  ],
  sectors: [
    { id: 1, name: 'Agriculture and Food', status: 'Published' },
    { id: 2, name: 'Business and Investment', status: 'Published' },
    { id: 3, name: 'Conflict, Violence, and Radicalism', status: 'Published' },
    { id: 4, name: 'COVID-19', status: 'Published' },
    { id: 5, name: 'Disability and Vulnerability and Social Welfare', status: 'Published' },
    { id: 6, name: 'Disaster and Emergency', status: 'Published' },
    { id: 7, name: 'Economic Development', status: 'Published' },
    { id: 8, name: 'Education and Culture', status: 'Published' },
    { id: 9, name: 'Energy and Natural Resources', status: 'Published' },
    { id: 10, name: 'Environment and Climate Change', status: 'Published' }
  ],
  thematics: [
    { id: 1, name: 'Social Cohesion & Peacebuilding', status: 'Published' },
    { id: 2, name: 'Inclusive Economic Transformation', status: 'Published' },
    { id: 3, name: 'Climate Resilience & Green Energy', status: 'Published' }
  ]
};

const referenceTypes = [
  { key: 'sdgs', label: 'SDGs', desc: 'Sustainable Development Goals used in Step-3 of submissions.' },
  { key: 'agencies', label: 'UN Agencies', desc: 'United Nations specialized agencies contributing to programs.' },
  { key: 'lnobs', label: 'LNOB', desc: 'Leaving No One Behind focus groups used to align vulnerability.' },
  { key: 'languages', label: 'Language', desc: 'Languages available for document uploads and translations.' },
  { key: 'partners', label: 'Non UN Partners', desc: 'Partner organizations outside the UN structure.' },
  { key: 'organizations', label: 'Organization', desc: 'Default list of organizations for user registration options.' },
  { key: 'jointprogrammes', label: 'Joint Programme', desc: 'Jointly administered programs across multiple UN agencies.' },
  { key: 'sectors', label: 'Sectors', desc: 'Sectors/Thematic categories of development work.' },
  { key: 'thematics', label: 'Thematic Area UNSDCF', desc: 'UNSDCF (UN Sustainable Development Cooperation Framework) strategic pillars.' }
];

export default function CMSMasterReference({ activeRef = 'sdgs' }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('Administrator'); // Simulated role: Administrator or Editor

  // Search, Filter & Paging States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [editingItem, setEditingItem] = useState(null);
  
  // Notification states
  const [notification, setNotification] = useState(null);

  // Form input states
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formNumber, setFormNumber] = useState('');
  const [formColor, setFormColor] = useState('');
  const [formIcon, setFormIcon] = useState('');
  const [formStatus, setFormStatus] = useState('Published');

  // Load from localStorage or initialize
  useEffect(() => {
    const savedRole = localStorage.getItem('cms_simulated_role') || 'Administrator';
    setRole(savedRole);

    const savedData = localStorage.getItem('cms_master_references');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        setData(defaultRefData);
      }
    } else {
      setData(defaultRefData);
      localStorage.setItem('cms_master_references', JSON.stringify(defaultRefData));
    }
    setLoading(false);
  }, []);

  const saveReferences = (newData) => {
    setData(newData);
    localStorage.setItem('cms_master_references', JSON.stringify(newData));
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    localStorage.setItem('cms_simulated_role', newRole);
    triggerNotification(`Simulated role switched to ${newRole}`);
  };

  const triggerNotification = (message, type = 'success') => {
    setNotification({ text: message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // CRUD handlers
  const handleOpenCreateModal = () => {
    if (role !== 'Administrator') return;
    setModalMode('create');
    setEditingItem(null);
    setFormName('');
    setFormCode('');
    setFormNumber('');
    setFormColor('#009EDB');
    setFormIcon('');
    setFormStatus('Published');
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    if (role !== 'Administrator') return;
    setModalMode('edit');
    setEditingItem(item);
    setFormName(item.name || '');
    setFormCode(item.code || '');
    setFormNumber(item.number || '');
    setFormColor(item.color || '#009EDB');
    setFormIcon(item.icon || '');
    setFormStatus(item.status || 'Published');
    setIsFormModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (role !== 'Administrator') return;

    const activeList = data[activeRef] || [];
    let updatedList;

    if (modalMode === 'create') {
      const newId = activeList.length > 0 ? Math.max(...activeList.map(i => i.id)) + 1 : 1;
      const newItem = {
        id: newId,
        name: formName,
        status: formStatus,
        ...(activeRef === 'sdgs' && { number: parseInt(formNumber) || 1, color: formColor, icon: formIcon || `/images/SDG-logos/SDG-${formNumber || 1}_custom.png` }),
        ...(activeRef === 'languages' && { code: formCode }),
        ...(activeRef === 'organizations' && { code: formCode })
      };
      updatedList = [...activeList, newItem];
      triggerNotification(`New item "${formName}" created successfully.`);
    } else {
      updatedList = activeList.map(item => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            name: formName,
            status: formStatus,
            ...(activeRef === 'sdgs' && { number: parseInt(formNumber) || item.number, color: formColor, icon: formIcon }),
            ...(activeRef === 'languages' && { code: formCode }),
            ...(activeRef === 'organizations' && { code: formCode })
          };
        }
        return item;
      });
      triggerNotification(`Item "${formName}" updated successfully.`);
    }

    const updatedData = { ...data, [activeRef]: updatedList };
    saveReferences(updatedData);
    setIsFormModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (role !== 'Administrator') return;
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      const activeList = data[activeRef] || [];
      const updatedList = activeList.filter(item => item.id !== id);
      const updatedData = { ...data, [activeRef]: updatedList };
      saveReferences(updatedData);
      triggerNotification(`Item "${name}" has been deleted.`);
    }
  };

  const handleToggleStatus = (item) => {
    if (role !== 'Administrator') return;
    const activeList = data[activeRef] || [];
    const newStatus = item.status === 'Published' ? 'Unpublished' : 'Published';
    const updatedList = activeList.map(i => i.id === item.id ? { ...i, status: newStatus } : i);
    const updatedData = { ...data, [activeRef]: updatedList };
    saveReferences(updatedData);
    triggerNotification(`"${item.name}" status updated to ${newStatus}.`);
  };

  // Filter & Search computation
  const activeList = data[activeRef] || [];
  const filteredList = activeList.filter(item => {
    const matchesSearch = (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.code || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.number ? String(item.number) === searchTerm : false);
    const matchesStatus = statusFilter === 'All' ? true : item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination computation
  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  const activeMeta = referenceTypes.find(r => r.key === activeRef) || referenceTypes[0];

  return (
    <CMSLayout>
      <main className="cms-main">
        {/* Header */}
        <header className="cms-settings-header" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div>
              <h1>Master Reference Management</h1>
              <p>Configure input options and parameters referenced across the portal.</p>
            </div>
            
            {/* Simulated Access Switcher */}
            <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Access Mode:</span>
              <button 
                onClick={() => handleRoleChange('Administrator')}
                style={{ 
                  padding: '4px 10px', 
                  fontSize: '12px', 
                  borderRadius: '4px', 
                  fontWeight: '600',
                  border: '1px solid ' + (role === 'Administrator' ? '#009EDB' : '#cbd5e1'),
                  background: role === 'Administrator' ? '#e0f5ff' : 'white',
                  color: role === 'Administrator' ? '#007cb3' : '#64748b',
                  cursor: 'pointer' 
                }}
              >
                Admin
              </button>
              <button 
                onClick={() => handleRoleChange('Editor')}
                style={{ 
                  padding: '4px 10px', 
                  fontSize: '12px', 
                  borderRadius: '4px', 
                  fontWeight: '600',
                  border: '1px solid ' + (role === 'Editor' ? '#ef4444' : '#cbd5e1'),
                  background: role === 'Editor' ? '#fef2f2' : 'white',
                  color: role === 'Editor' ? '#ef4444' : '#64748b',
                  cursor: 'pointer' 
                }}
              >
                Non-Admin
              </button>
            </div>
          </div>
        </header>

        {/* ROLE ALERT BANNER */}
        {role === 'Administrator' ? (
          <div className="cms-notification-success" style={{ marginBottom: '24px', background: '#ecfdf5', borderColor: '#10b981', display: 'flex', color: '#065f46' }}>
            <div style={{ marginRight: '12px', display: 'flex', alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div style={{ flex: 1, fontSize: '14px', lineHeight: '1.5' }}>
              <strong>Admin Mode Enabled:</strong> You have full write and modification privileges. You can edit references, publish toggles, and add new master values.
            </div>
          </div>
        ) : (
          <div className="cms-notification-success" style={{ marginBottom: '24px', background: '#fef2f2', borderColor: '#f87171', display: 'flex', color: '#991b1b' }}>
            <div style={{ marginRight: '12px', display: 'flex', alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div style={{ flex: 1, fontSize: '14px', lineHeight: '1.5' }}>
              <strong>Read-Only Mode (Restricted):</strong> Your simulated role does not grant system administrator permission to this page. Modification buttons are disabled. Click the "Admin" button above to grant permission.
            </div>
          </div>
        )}

        {/* Global Notification Toast */}
        {notification && (
          <div className="cms-notification-success" style={{ marginBottom: '20px' }}>
            <div className="cms-notification-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="cms-notification-content">{notification.text}</div>
          </div>
        )}

        {/* Settings Content Grid */}
        <div className="cms-settings-grid">
          
          {/* Sidebar Tabs */}
          <aside className="cms-settings-sidebar">
            <div style={{ padding: '8px 16px', fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Reference List
            </div>
            {referenceTypes.map((ref) => (
              <a 
                key={ref.key}
                href={`/cms/masterreference/${ref.key}`} 
                className={`cms-settings-tab ${activeRef === ref.key ? 'active' : ''}`}
                style={{ padding: '12px 16px', fontSize: '13px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '12px'}}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v8M8 12h8"></path>
                </svg>
                {ref.label}
              </a>
            ))}
          </aside>

          {/* Form Content Area */}
          <section className="cms-settings-content">
            <div className="cms-settings-card">
              
              <div className="cms-settings-card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2>{activeMeta.label}</h2>
                  <p style={{ margin: '4px 0 0 0', fontWeight: 'normal', fontSize: '13px', color: '#64748b' }}>
                    {activeMeta.desc}
                  </p>
                </div>
                
                <button 
                  onClick={handleOpenCreateModal}
                  disabled={role !== 'Administrator'}
                  className="cms-btn-primary" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    cursor: role === 'Administrator' ? 'pointer' : 'not-allowed',
                    opacity: role === 'Administrator' ? 1 : 0.55
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  New Data
                </button>
              </div>

              <div className="cms-settings-card-body" style={{ padding: 0 }}>
                {loading ? (
                  <div style={{ padding: '40px', textAlignment: 'center', color: '#64748b' }}>Loading records...</div>
                ) : (
                  <div className="cms-table-container" style={{ border: 'none', boxShadow: 'none', margin: 0 }}>
                    
                    {/* Filter / Search Bar */}
                    <div className="cms-table-filter-bar" style={{ padding: '16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <div className="cms-search-input-wrapper" style={{ maxWidth: '300px' }}>
                        <svg className="cms-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input 
                          type="text" 
                          placeholder="Search reference data..." 
                          value={searchTerm}
                          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>Status:</span>
                        <select 
                          value={statusFilter} 
                          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                          style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', cursor: 'pointer', background: 'white' }}
                        >
                          <option value="All">All Status</option>
                          <option value="Published">Published</option>
                          <option value="Unpublished">Unpublished</option>
                        </select>
                      </div>
                    </div>

                    {/* Table element */}
                    <table className="cms-table">
                      <thead>
                        <tr>
                          <th style={{ width: '8%', textAlign: 'center' }}>#</th>
                          {activeRef === 'sdgs' && (
                            <>
                              <th style={{ width: '12%', textAlign: 'center' }}>GOAL NO.</th>
                              <th style={{ width: '15%', textAlign: 'center' }}>COLOR</th>
                              <th style={{ width: '35%' }}>GOAL NAME</th>
                            </>
                          )}
                          {activeRef === 'languages' && (
                            <>
                              <th style={{ width: '20%' }}>CODE (ISO)</th>
                              <th style={{ width: '42%' }}>LANGUAGE NAME</th>
                            </>
                          )}
                          {activeRef === 'organizations' && (
                            <>
                              <th style={{ width: '20%' }}>CODE</th>
                              <th style={{ width: '42%' }}>ORGANIZATION NAME</th>
                            </>
                          )}
                          {activeRef !== 'sdgs' && activeRef !== 'languages' && activeRef !== 'organizations' && (
                            <th style={{ width: '62%' }}>NAME</th>
                          )}
                          <th style={{ width: '15%', textAlign: 'center' }}>STATUS</th>
                          <th style={{ width: '15%', textAlign: 'center' }}>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((item, index) => (
                          <tr key={item.id} className={item.status !== 'Published' ? 'cms-row-draft' : ''}>
                            <td style={{ textAlign: 'center', color: '#64748b', fontWeight: '500' }}>
                              {indexOfFirstItem + index + 1}
                            </td>
                            {activeRef === 'sdgs' && (
                              <>
                                <td style={{ textAlign: 'center', fontWeight: '700' }}>{item.number}</td>
                                <td style={{ textAlign: 'center' }}>
                                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ display: 'inline-block', width: '16px', height: '16px', borderRadius: '4px', background: item.color, border: '1px solid #cbd5e1' }} />
                                    <code style={{ fontSize: '11px' }}>{item.color}</code>
                                  </div>
                                </td>
                                <td>
                                  <span style={{ fontWeight: '500', color: '#1e293b' }}>{item.name}</span>
                                </td>
                              </>
                            )}
                            {activeRef === 'languages' && (
                              <>
                                <td><code style={{ fontSize: '12px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{item.code}</code></td>
                                <td><span style={{ fontWeight: '500', color: '#1e293b' }}>{item.name}</span></td>
                              </>
                            )}
                            {activeRef === 'organizations' && (
                              <>
                                <td><code style={{ fontSize: '12px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{item.code}</code></td>
                                <td><span style={{ fontWeight: '500', color: '#1e293b' }}>{item.name}</span></td>
                              </>
                            )}
                            {activeRef !== 'sdgs' && activeRef !== 'languages' && activeRef !== 'organizations' && (
                              <td><span style={{ fontWeight: '500', color: '#1e293b' }}>{item.name}</span></td>
                            )}
                            <td style={{ textAlign: 'center' }}>
                              <button 
                                disabled={role !== 'Administrator'}
                                onClick={() => handleToggleStatus(item)}
                                style={{
                                  background: item.status === 'Published' ? '#dcfce7' : '#f1f5f9',
                                  color: item.status === 'Published' ? '#15803d' : '#475569',
                                  border: 'none',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  fontSize: '11px',
                                  fontWeight: '600',
                                  cursor: role === 'Administrator' ? 'pointer' : 'not-allowed',
                                  opacity: role === 'Administrator' ? 1 : 0.8
                                }}
                              >
                                {item.status}
                              </button>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <div className="cms-actions-group" style={{ justifyContent: 'center', gap: '8px' }}>
                                <button 
                                  onClick={() => handleOpenEditModal(item)}
                                  disabled={role !== 'Administrator'}
                                  className="cms-action-btn-icon" 
                                  aria-label="Edit"
                                  style={{
                                    cursor: role === 'Administrator' ? 'pointer' : 'not-allowed',
                                    opacity: role === 'Administrator' ? 1 : 0.4
                                  }}
                                >
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                  </svg>
                                </button>
                                <button 
                                  onClick={() => handleDelete(item.id, item.name)}
                                  disabled={role !== 'Administrator'}
                                  className="cms-action-btn-icon cms-delete" 
                                  aria-label="Delete"
                                  style={{
                                    cursor: role === 'Administrator' ? 'pointer' : 'not-allowed',
                                    opacity: role === 'Administrator' ? 1 : 0.4
                                  }}
                                >
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {currentItems.length === 0 && (
                          <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                              No master references found matching your search.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {/* Footer / Pagination */}
                    <div className="cms-table-footer" style={{ padding: '16px', borderTop: '1px solid #e2e8f0' }}>
                      <span className="cms-entries-info">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
                      </span>
                      <div className="cms-table-pagination">
                        <button 
                          className="cms-pag-nav" 
                          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
                          disabled={currentPage === 1}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <button 
                            key={i} 
                            className={`cms-pag-num ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button 
                          className="cms-pag-nav" 
                          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
                          disabled={currentPage === totalPages}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>

            </div>
          </section>

        </div>

      </main>

      {/* CREATE & EDIT FORM MODAL */}
      {isFormModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', color: '#0f172a', fontWeight: '700', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
              {modalMode === 'create' ? `Create New ${activeMeta.label}` : `Edit ${activeMeta.label}`}
            </h2>
            
            <form onSubmit={handleSave} className="cms-settings-form">
              {activeRef === 'sdgs' && (
                <div className="cms-form-row" style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <div className="cms-form-group" style={{ flex: '1' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Goal Number</label>
                    <input 
                      type="number" 
                      required 
                      value={formNumber} 
                      onChange={(e) => setFormNumber(e.target.value)} 
                      placeholder="e.g. 18"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                    />
                  </div>
                  <div className="cms-form-group" style={{ flex: '2' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Accent Color</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="color" 
                        value={formColor} 
                        onChange={(e) => setFormColor(e.target.value)} 
                        style={{ width: '40px', height: '36px', padding: '2px', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text" 
                        required 
                        value={formColor} 
                        onChange={(e) => setFormColor(e.target.value)} 
                        placeholder="#HEX"
                        style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {((activeRef === 'languages') || (activeRef === 'organizations')) && (
                <div className="cms-form-row" style={{ marginBottom: '16px' }}>
                  <div className="cms-form-group">
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                      {activeRef === 'languages' ? 'Language ISO Code' : 'Organization Short Code'}
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={formCode} 
                      onChange={(e) => setFormCode(e.target.value)} 
                      placeholder={activeRef === 'languages' ? 'e.g. es, fr' : 'e.g. unesco, who'}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                    />
                  </div>
                </div>
              )}

              <div className="cms-form-row" style={{ marginBottom: '16px' }}>
                <div className="cms-form-group">
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                    {activeMeta.label} Name / Description
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={formName} 
                    onChange={(e) => setFormName(e.target.value)} 
                    placeholder={`Enter ${activeMeta.label.toLowerCase()} name`}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>
              </div>

              {activeRef === 'sdgs' && (
                <div className="cms-form-row" style={{ marginBottom: '16px' }}>
                  <div className="cms-form-group">
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Icon Asset Path</label>
                    <input 
                      type="text" 
                      value={formIcon} 
                      onChange={(e) => setFormIcon(e.target.value)} 
                      placeholder="e.g. /images/SDG-logos/SDG-1_custom.png"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                    />
                  </div>
                </div>
              )}

              <div className="cms-form-row" style={{ marginBottom: '24px' }}>
                <div className="cms-form-group">
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Default Publish Status</label>
                  <select 
                    value={formStatus} 
                    onChange={(e) => setFormStatus(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', background: 'white' }}
                  >
                    <option value="Published">Published</option>
                    <option value="Unpublished">Unpublished</option>
                  </select>
                </div>
              </div>

              <div className="cms-form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsFormModalOpen(false)}
                  className="cms-btn-secondary"
                  style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="cms-btn-primary"
                  style={{ padding: '8px 20px', borderRadius: '6px', background: '#009EDB', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CMSLayout>
  );
}
