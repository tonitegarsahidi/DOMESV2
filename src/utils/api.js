const API_BASE = import.meta.env.PUBLIC_BASE_URL || 
                 (import.meta.env.BASE_URL && import.meta.env.BASE_URL !== '/' ? import.meta.env.BASE_URL : null) || 
                 import.meta.env.PUBLIC_API_URL || 
                 import.meta.env.API_URL || 
                 'http://localhost:8080';

export function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('cms_auth_token') : null;
}

export function setToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cms_auth_token', token);
  }
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cms_auth_token');
    localStorage.removeItem('cms_user');
  }
}

export async function fetchAPI(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const result = await response.json().catch(() => ({
    success: false,
    message: 'Failed to parse JSON response from server.',
  }));

  if (!response.ok) {
    throw new Error(result.message || `HTTP error! status: ${response.status}`);
  }

  return result;
}

// Auth API Calls
export async function login(email, password, captcha = '') {
  const res = await fetchAPI('/api/v2/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, captcha }),
  });
  if (res.success && res.data?.token) {
    setToken(res.data.token);
    localStorage.setItem('cms_user', JSON.stringify(res.data.user));
    // Set role to administrator if role is administrator
    const userRole = res.data.user?.role === 'administrator' ? 'Administrator' : 'Editor';
    localStorage.setItem('cms_simulated_role', userRole);
  }
  return res;
}

// Master References API Calls
export async function getMasterList(type) {
  return fetchAPI(`/api/v2/cms/master/${type}`);
}

export async function createMasterItem(type, item) {
  return fetchAPI(`/api/v2/cms/master/${type}`, {
    method: 'POST',
    body: JSON.stringify(item),
  });
}

export async function updateMasterItem(type, code, item) {
  return fetchAPI(`/api/v2/cms/master/${type}/${code}`, {
    method: 'PUT',
    body: JSON.stringify(item),
  });
}

export async function deleteMasterItem(type, code) {
  return fetchAPI(`/api/v2/cms/master/${type}/${code}`, {
    method: 'DELETE',
  });
}

// Public Master Data
export async function getPublicMasterList(type) {
  return fetchAPI(`/api/v2/master/${type}`);
}

// Public Documents & Stats
export async function getDocuments(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });
  const queryString = query.toString();
  const endpoint = params.q ? '/api/v2/documents/search' : '/api/v2/documents';
  return fetchAPI(`${endpoint}${queryString ? `?${queryString}` : ''}`);
}

export async function getDocumentDetail(id) {
  return fetchAPI(`/api/v2/documents/${id}`);
}

export async function getRelatedDocuments(id) {
  return fetchAPI(`/api/v2/documents/${id}/related`);
}

export async function getDocumentDownload(id) {
  return fetchAPI(`/api/v2/documents/${id}/download`);
}

export async function getStats() {
  return fetchAPI('/api/v2/stats');
}

export async function submitReport(reportData) {
  return fetchAPI('/api/v2/reports', {
    method: 'POST',
    body: JSON.stringify(reportData),
  });
}

// Public Analytics
export async function getAnalyticsOverview() {
  return fetchAPI('/api/v2/analytics/overview');
}

export async function getAnalyticsUploadsOverTime() {
  return fetchAPI('/api/v2/analytics/uploads-over-time');
}

export async function getAnalyticsBySdg() {
  return fetchAPI('/api/v2/analytics/by-sdg');
}

export async function getAnalyticsByAgency() {
  return fetchAPI('/api/v2/analytics/by-agency');
}

export async function getAnalyticsBySector() {
  return fetchAPI('/api/v2/analytics/by-sector');
}

export async function getAnalyticsByLanguage() {
  return fetchAPI('/api/v2/analytics/by-language');
}

// CMS Analytics (Auth Required)
export async function getCMSAnalyticsSummary(period = '30d') {
  return fetchAPI(`/api/v2/analytics/summary?period=${period}`);
}

export async function getCMSTopDownloads() {
  return fetchAPI('/api/v2/analytics/top-downloads');
}

export async function getCMSTopViews() {
  return fetchAPI('/api/v2/analytics/top-views');
}

// CMS Dashboard & Activity (Auth Required)
export async function getCMSDashboardStats() {
  return fetchAPI('/api/v2/cms/dashboard');
}

export async function getCMSActivity(limit = 10) {
  return fetchAPI(`/api/v2/cms/activity?limit=${limit}`);
}

// CMS Submissions (Auth Required)
export async function getSubmissions(status = 'all', search = '', page = 1, limit = 20) {
  const query = new URLSearchParams({ status, search, page: String(page), limit: String(limit) });
  return fetchAPI(`/api/v2/submissions?${query.toString()}`);
}

export async function createSubmission(payload) {
  return fetchAPI('/api/v2/submissions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function saveDraft(id, step, data, isActive = true) {
  return fetchAPI(`/api/v2/submissions/${id}/draft`, {
    method: 'POST',
    body: JSON.stringify({ step, data, is_active: isActive }),
  });
}

export async function deleteSubmission(id) {
  return fetchAPI(`/api/v2/submissions/${id}`, {
    method: 'DELETE',
  });
}

export async function publishSubmission(id) {
  return fetchAPI(`/api/v2/submissions/${id}/publish`, {
    method: 'PUT',
  });
}

export async function unpublishSubmission(id) {
  return fetchAPI(`/api/v2/submissions/${id}/unpublish`, {
    method: 'PUT',
  });
}

// CMS Users Management (Auth Required - Admin Only)
export async function getUsers(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });
  const queryString = query.toString();
  return fetchAPI(`/api/v2/users${queryString ? `?${queryString}` : ''}`);
}

export async function createUser(userData) {
  return fetchAPI('/api/v2/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function updateUser(id, userData) {
  return fetchAPI(`/api/v2/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
}

export async function deleteUser(id) {
  return fetchAPI(`/api/v2/users/${id}`, {
    method: 'DELETE',
  });
}

// CMS Settings (Auth Required)
export async function getUserProfile() {
  return fetchAPI('/api/v2/user/me');
}

export async function updateUserProfile(profileData) {
  return fetchAPI('/api/v2/user/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
}

export async function updateUserPassword(passwordData) {
  return fetchAPI('/api/v2/user/password', {
    method: 'PUT',
    body: JSON.stringify(passwordData),
  });
}

export async function getNotificationPreferences() {
  return fetchAPI('/api/v2/user/notifications');
}

export async function updateNotificationPreferences(preferences) {
  return fetchAPI('/api/v2/user/notifications', {
    method: 'PUT',
    body: JSON.stringify(preferences),
  });
}

// Admin Emails Whitelist (Auth Required - Admin Only)
export async function getAdminEmails() {
  return fetchAPI('/api/v2/admin/emails');
}

export async function addAdminEmail(email) {
  return fetchAPI('/api/v2/admin/emails', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function deleteAdminEmail(email) {
  return fetchAPI(`/api/v2/admin/emails/${email}`, {
    method: 'DELETE',
  });
}

// CMS Reports Management (Auth Required)
export async function getReports() {
  return fetchAPI('/api/v2/reports');
}

export async function updateReportStatus(id, status) {
  return fetchAPI(`/api/v2/reports/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}
