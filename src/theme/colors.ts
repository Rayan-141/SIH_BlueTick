// ─────────────────────────────────────────────────────────────
// BlueTick Color Palette
// Ported 1:1 from Flutter AppColors
// ─────────────────────────────────────────────────────────────

export const Colors = {
  // ── Brand ─────────────────────────────────────────────────
  primary: '#004D40',
  primaryLight: '#00796B',
  primaryDark: '#00251A',

  accent: '#FF6D00',
  accentLight: '#FF9E40',
  accentDark: '#C43E00',

  // ── Semantic ──────────────────────────────────────────────
  success: '#00796B',
  successLight: '#B2DFDB',
  warning: '#FF8F00',
  warningLight: '#FFE082',
  error: '#D32F2F',
  errorLight: '#FFCDD2',
  info: '#0288D1',
  infoLight: '#B3E5FC',

  // ── Compliance Status ─────────────────────────────────────
  compliant: '#004D40',
  nonCompliant: '#D32F2F',
  needsReview: '#FF6D00',
  inProgress: '#FFB300',
  unknown: '#CFD8DC',

  // ── Neutrals (Light Theme) ─────────────────────────────────
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceVariant: '#F0F4F8',
  surfaceElevated: '#FFFFFF',
  cardBackground: '#FFFFFF',

  border: '#E0E0E0',
  borderLight: '#EEEEEE',
  divider: '#E0E0E0',

  // ── Text ─────────────────────────────────────────────────
  textPrimary: '#1E293B',
  textSecondary: '#475569',
  textTertiary: '#94A3B8',
  textDisabled: '#CBD5E1',
  textInverse: '#FFFFFF',

  // ── Glassmorphism ─────────────────────────────────────────
  glassBackground: 'rgba(255,255,255,0.6)',
  glassBorder: 'rgba(0,0,0,0.2)',

  // ── Shadows ───────────────────────────────────────────────
  shadowDark: 'rgba(0,0,0,0.1)',
  shadowPrimary: 'rgba(0,77,64,0.2)',
} as const;
