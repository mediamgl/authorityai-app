import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API functions
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
}

// Viral Velocity API functions
export const viralVelocityAPI = {
  getTopics: (filters = {}) => api.get('/viral-velocity/topics', { params: filters }),
  synthesizeTopics: (topicIds) => api.post('/viral-velocity/synthesis', { topicIds }),
  refreshTopics: () => api.post('/viral-velocity/refresh'),
}

// Interview API functions
export const interviewAPI = {
  startSession: (data) => api.post('/interview/start', data),
  submitResponse: (sessionId, response) => api.post(`/interview/${sessionId}/respond`, { response }),
  getSession: (sessionId) => api.get(`/interview/${sessionId}`),
  completeSession: (sessionId) => api.post(`/interview/${sessionId}/complete`),
}

// Content API functions
export const contentAPI = {
  generate: (sessionId) => api.post('/content/generate', { sessionId }),
  getContent: (contentId) => api.get(`/content/${contentId}`),
  updateContent: (contentId, updates) => api.put(`/content/${contentId}`, updates),
  deleteContent: (contentId) => api.delete(`/content/${contentId}`),
  getUserContent: (filters = {}) => api.get('/content', { params: filters }),
  publishContent: (contentId) => api.post(`/content/${contentId}/publish`),
}

// Analytics API functions
export const analyticsAPI = {
  getDashboardStats: () => api.get('/analytics/dashboard'),
  getContentAnalytics: (contentId) => api.get(`/analytics/content/${contentId}`),
  getAuthorityScore: () => api.get('/analytics/authority-score'),
  getEngagementMetrics: (timeframe = '30d') => api.get('/analytics/engagement', { params: { timeframe } }),
}

// User API functions
export const userAPI = {
  updateSettings: (settings) => api.put('/user/settings', settings),
  updateAPIKeys: (keys) => api.put('/user/api-keys', keys),
  getUsage: () => api.get('/user/usage'),
  getBilling: () => api.get('/user/billing'),
}

// Utility functions
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || 'An error occurred'
    return { success: false, error: message }
  } else if (error.request) {
    // Request made but no response received
    return { success: false, error: 'Network error. Please check your connection.' }
  } else {
    // Something else happened
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export const uploadFile = async (file, endpoint) => {
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const response = await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return { success: true, data: response.data }
  } catch (error) {
    return handleAPIError(error)
  }
}

export default api

