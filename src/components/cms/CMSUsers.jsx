import React, { useState } from 'react';
import CMSLayout from './CMSLayout.jsx';

export default function CMSUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'Admin',
      lastName: 'User',
      position: 'System Administrator',
      organization: 'rco',
      phone: '+62 811 1111 1111',
      email: 'admin@un.org',
      role: 'Administrator',
      status: 'Active'
    },
    {
      id: 2,
      firstName: 'Budi',
      lastName: 'Santoso',
      position: 'Project Manager',
      organization: 'undp',
      phone: '+62 812 3456 7890',
      email: 'b.santoso@undp.org',
      role: 'Editor',
      status: 'Active'
    },
    {
      id: 3,
      firstName: 'Sarah',
      lastName: 'Jenkins',
      position: 'Data Analyst',
      organization: 'worldbank',
      phone: '+62 813 9876 5432',
      email: 's.jenkins@worldbank.org',
      role: 'Viewer',
      status: 'Inactive'
    },
    {
      id: 4,
      firstName: 'Ahmad',
      lastName: 'Faisal',
      position: 'Communication Officer',
      organization: 'unicef',
      phone: '+62 814 5555 4444',
      email: 'a.faisal@unicef.org',
      role: 'Editor',
      status: 'Active'
    }
  ]);

  const [notification, setNotification] = useState(null);

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  // Form State
  const initialFormState = {
    id: null,
    firstName: '',
    lastName: '',
    position: '',
    organization: '',
    phone: '',
    email: '',
    role: 'Viewer',
    status: 'Active',
    password: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  const orgOptions = [
    { value: "", label: "Other Organization" },
    { value: "fao", label: "FAO - Food and Agriculture Organization" },
    { value: "globalpulse", label: "Global Pulse/ PLJ" },
    { value: "ifad", label: "IFAD - International Fund for Agricultural Development" },
    { value: "ilo", label: "ILO - International Labour Organization" },
    { value: "imf", label: "IMF - International Monetary Fund" },
    { value: "iom", label: "IOM - International Organization for Migration" },
    { value: "itu", label: "ITU - International Telecommunication Union" },
    { value: "rco", label: "RCO - Resident Coordinator's Office" },
    { value: "unaids", label: "UNAIDS - Joint United Nations Programme on HIV/AIDS" },
    { value: "unwomen", label: "UN Women - United Nations Entity for Gender Equality" },
    { value: "undp", label: "UNDP - United Nations Development Programme" },
    { value: "unep", label: "UNEP - United Nations Environment Programme" },
    { value: "unesco", label: "UNESCO - United Nations Educational, Scientific and Cultural Organization" },
    { value: "unfpa", label: "UNFPA - United Nations Population Fund" },
    { value: "unhabitat", label: "UN-HABITAT - United Nations Human Settlements Programme" },
    { value: "unhcr", label: "UNHCR - United Nations Refugee Agency" },
    { value: "unicef", label: "UNICEF - United Nations Children's Fund" },
    { value: "unido", label: "UNIDO - United Nations Industrial Development Organization" },
    { value: "unocha", label: "UNOCHA - UN Office for the Coordination of Humanitarian Affairs" },
    { value: "unodc", label: "UNODC - United Nations Office on Drugs and Crime" },
    { value: "unops", label: "UNOPS - United Nations Office for Project Services" },
    { value: "wfp", label: "WFP - World Food Programme" },
    { value: "who", label: "WHO - World Health Organization" },
    { value: "worldbank", label: "World Bank" }
  ];

  const handleOpenModal = (mode, user = null) => {
    setModalMode(mode);
    if (mode === 'edit' && user) {
      setFormData({ ...user, password: '' });
    } else {
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const newUser = {
        ...formData,
        id: Date.now() // generate dummy ID
      };
      setUsers([...users, newUser]);
      showNotification(`User ${newUser.firstName} ${newUser.lastName} successfully created!`);
    } else if (modalMode === 'edit') {
      const updatedUsers = users.map(u => u.id === formData.id ? { ...formData } : u);
      setUsers(updatedUsers);
      showNotification(`User ${formData.firstName} ${formData.lastName} successfully updated!`);
    }
    handleCloseModal();
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setIsDeleteModalOpen(false);
      showNotification(`User ${userToDelete.firstName} ${userToDelete.lastName} has been deleted.`);
      setUserToDelete(null);
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  return (
    <CMSLayout>
      <main className="cms-main">
        {notification && (
          <div className="cms-notification-success" style={{ marginBottom: '20px' }}>
            <div className="cms-notification-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="cms-notification-content">
              {notification}
            </div>
            <button className="cms-notification-close" onClick={() => setNotification(null)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}

        <header className="cms-submissions-header">
          <div className="cms-header-left">
            <h1>User Management</h1>
            <p>Manage access, roles, and status of platform users.</p>
          </div>
          <button 
            className="cms-btn-primary cms-new-doc-btn" 
            onClick={() => handleOpenModal('create')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: '8px'}}>
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New User
          </button>
        </header>

        <div className="cms-table-container">
          <div className="cms-table-filter-bar">
            <div className="cms-search-input-wrapper">
              <svg className="cms-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="Search users by name, email, or org..." />
            </div>
          </div>

          <table className="cms-table">
            <thead>
              <tr>
                <th style={{width: '20%'}}>NAME</th>
                <th style={{width: '20%'}}>CONTACT INFO</th>
                <th style={{width: '25%'}}>ORGANIZATION & POSITION</th>
                <th style={{width: '10%'}}>ROLE</th>
                <th style={{width: '10%'}}>STATUS</th>
                <th style={{width: '15%', textAlign: 'center'}}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const orgLabel = orgOptions.find(o => o.value === user.organization)?.label || 'Other Organization';
                return (
                <tr key={user.id} className="cms-table-row-hover">
                  <td className="cms-col-title">
                    <span style={{ fontWeight: '500', color: '#0f172a' }}>{user.firstName} {user.lastName}</span>
                  </td>
                  <td style={{ color: '#475569', fontSize: '13px' }}>
                    <div style={{ marginBottom: '2px' }}>{user.email}</div>
                    <div style={{ color: '#64748b' }}>{user.phone}</div>
                  </td>
                  <td style={{ color: '#475569', fontSize: '13px' }}>
                    <div style={{ fontWeight: '500', color: '#334155', marginBottom: '2px' }}>{orgLabel}</div>
                    <div style={{ color: '#64748b' }}>{user.position}</div>
                  </td>
                  <td>
                    <span style={{ 
                      background: '#f1f5f9', 
                      color: '#475569', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '12px', 
                      fontWeight: '600' 
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td className="cms-col-status">
                    <span className={`cms-status-badge ${user.status.toLowerCase()}`} style={{ 
                      background: user.status === 'Active' ? '#dcfce7' : '#fee2e2',
                      color: user.status === 'Active' ? '#16a34a' : '#dc2626'
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{textAlign: 'center'}}>
                    <div className="cms-actions-group" style={{justifyContent: 'center'}}>
                      <button 
                        className="cms-action-btn-icon" 
                        aria-label="Edit User"
                        onClick={() => handleOpenModal('edit', user)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </button>
                      <button 
                        className="cms-action-btn-icon cms-delete" 
                        aria-label="Delete User"
                        onClick={() => confirmDelete(user)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="cms-table-footer">
            <span className="cms-entries-info">Showing {users.length} entries</span>
          </div>
        </div>
      </main>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '600px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>
                {modalMode === 'create' ? 'Add New User' : 'Edit User'}
              </h2>
              <button 
                onClick={handleCloseModal}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleFormChange}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} 
                    placeholder="John" 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleFormChange}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} 
                    placeholder="Doe" 
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Organization</label>
                <select 
                  name="organization"
                  value={formData.organization}
                  onChange={handleFormChange}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', background: '#fff' }}
                >
                  {orgOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Position</label>
                <input 
                  type="text" 
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleFormChange}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} 
                  placeholder="Your position" 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} 
                    placeholder="+62 812 xxx xxxx" 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} 
                    placeholder="name@un.org" 
                  />
                </div>
              </div>

              {modalMode === 'create' && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Password</label>
                  <input 
                    type="password" 
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleFormChange}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} 
                    placeholder="••••••••" 
                  />
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>System Role</label>
                  <select 
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', background: '#fff' }}
                  >
                    <option value="Administrator">Administrator</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Account Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', background: '#fff' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  style={{ padding: '10px 20px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{ padding: '10px 20px', background: 'var(--un-primary, #006699)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                >
                  {modalMode === 'create' ? 'Create User' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', color: '#0f172a' }}>Delete User</h2>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
              Are you sure you want to delete the user <strong>{userToDelete?.firstName} {userToDelete?.lastName}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                onClick={() => { setIsDeleteModalOpen(false); setUserToDelete(null); }}
                style={{ padding: '10px 20px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                style={{ padding: '10px 20px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

    </CMSLayout>
  );
}
