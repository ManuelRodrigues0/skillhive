import api from './api';

export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (email, password) => api.post('/auth/login', { email, password }),
  logout: () => {
    localStorage.removeItem('token');
  },
  getCurrentUser: () => api.get('/auth/me'),
};

export const userService = {
  getUserProfile: (userId) => api.get(`/users/${userId}`),
  updateProfile: (userId, data) => api.put(`/users/${userId}`, data),
  getCredits: (userId) => api.get(`/users/${userId}/credits`),
};

export const skillService = {
  addSkill: (skillData) => api.post('/skills', skillData),
  getUserSkills: (userId) => api.get(`/skills/user/${userId}`),
  getAllSkills: () => api.get('/skills'),
  updateSkill: (skillId, data) => api.put(`/skills/${skillId}`, data),
  deleteSkill: (skillId) => api.delete(`/skills/${skillId}`),
};

export const requestService = {
  createRequest: (requestData) => api.post('/requests', requestData),
  getRequests: (filters) => api.get('/requests', { params: filters }),
  getRequestById: (requestId) => api.get(`/requests/${requestId}`),
  acceptRequest: (requestId, mentorId) => api.post(`/requests/${requestId}/accept`, { mentorId }),
  updateRequestStatus: (requestId, status) => api.put(`/requests/${requestId}`, { status }),
};

export const sessionService = {
  createSession: (sessionData) => api.post('/sessions', sessionData),
  getSessions: (filters) => api.get('/sessions', { params: filters }),
  updateSessionStatus: (sessionId, status) => api.put(`/sessions/${sessionId}`, { status }),
  rateSession: (sessionId, rating, feedback) => api.post(`/sessions/${sessionId}/rate`, { rating, feedback }),
};

export const creditService = {
  getTransactions: (userId) => api.get(`/credits/${userId}/transactions`),
  transferCredits: (toUserId, amount) => api.post('/credits/transfer', { toUserId, amount }),
};
