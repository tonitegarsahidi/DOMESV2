const API_BASE = 'http://localhost:8080';

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
