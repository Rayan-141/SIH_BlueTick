// ─────────────────────────────────────────────────────────────
// API Endpoints — Ported from Flutter ApiEndpoints
// ─────────────────────────────────────────────────────────────

export const API_BASE_URL = 'https://api.complyai.example.com';

export const Endpoints = {
  // ── Auth
  login: '/api/v1/auth/login',
  register: '/api/v1/auth/register',
  refreshToken: '/api/v1/auth/refresh',
  logout: '/api/v1/auth/logout',
  profile: '/api/v1/auth/profile',

  // ── Product Analysis
  analyzeProduct: '/api/v1/products/analyze',
  getAnalysisResult: (id: string) => `/api/v1/products/${id}`,
  getAnalysisHistory: '/api/v1/products/history',

  // ── Compliance
  getComplianceDetail: (analysisId: string) => `/api/v1/compliance/${analysisId}`,
  getComplianceRules: '/api/v1/compliance/rules',

  // ── Indian Standards
  searchStandards: '/api/v1/standards/search',
  getStandard: (id: string) => `/api/v1/standards/${id}`,
  getRecommendedStandards: (analysisId: string) => `/api/v1/standards/recommend/${analysisId}`,

  // ── BIS Assistant
  chatMessage: '/api/v1/assistant/chat',
  getChatHistory: '/api/v1/assistant/history',
  clearChatHistory: '/api/v1/assistant/clear',

  // ── Reports
  generateReport: '/api/v1/reports/generate',
  getReport: (id: string) => `/api/v1/reports/${id}`,
  getReports: '/api/v1/reports',
  deleteReport: (id: string) => `/api/v1/reports/${id}`,
  downloadReport: (id: string) => `/api/v1/reports/${id}/download`,

  // ── Health
  health: '/api/v1/health',
} as const;
