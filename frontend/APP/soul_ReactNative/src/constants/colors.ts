// ─── SOUL Design System — Color Tokens ────────────────────────────────────
// Premium SaaS palette: Violet-Teal gradient system

export const colors = {
  // ── Primary ───────────────────────────────────────────────────────────────
  primary: "#7C3AED",        // Violet 600
  primaryLight: "#A78BFA",   // Violet 400
  primaryDark: "#5B21B6",    // Violet 800
  primaryBg: "#EDE9FE",      // Violet 100 (tinted bg)

  // ── Teal / Secondary ──────────────────────────────────────────────────────
  teal: "#14B8A6",           // Teal 500
  tealLight: "#5EEAD4",      // Teal 300
  tealDark: "#0F766E",       // Teal 700
  tealBg: "#CCFBF1",         // Teal 100

  // ── Accent ────────────────────────────────────────────────────────────────
  accent: "#F59E0B",         // Amber 500
  accentLight: "#FCD34D",    // Amber 300
  accentBg: "#FEF3C7",       // Amber 100

  // ── Gradient endpoints ────────────────────────────────────────────────────
  gradientStart: "#7C3AED",
  gradientEnd: "#14B8A6",
  gradientMid: "#6366F1",    // Indigo midpoint

  // ── Backgrounds ───────────────────────────────────────────────────────────
  bg: "#F8FAFC",             // Slate 50 — main app background
  bgAlt: "#F1F5F9",          // Slate 100
  surface: "#FFFFFF",        // Card surfaces
  surfaceAlt: "#F8FAFC",     // Slightly off-white surfaces
  glassBg: "rgba(255, 255, 255, 0.75)",   // Glassmorphism
  glassBorder: "rgba(255, 255, 255, 0.4)",

  // ── Text ──────────────────────────────────────────────────────────────────
  dark: "#0F172A",           // Slate 900 — primary text
  textPrimary: "#1E293B",    // Slate 800
  textSecondary: "#64748B",  // Slate 500
  textMuted: "#94A3B8",      // Slate 400
  textLight: "#CBD5E1",      // Slate 300

  // ── Borders ───────────────────────────────────────────────────────────────
  border: "#E2E8F0",         // Slate 200
  borderStrong: "#CBD5E1",   // Slate 300
  borderPrimary: "#C4B5FD",  // Violet 300

  // ── Semantic ──────────────────────────────────────────────────────────────
  success: "#10B981",
  successBg: "#D1FAE5",
  warning: "#F59E0B",
  warningBg: "#FEF3C7",
  error: "#EF4444",
  errorBg: "#FEE2E2",
  info: "#3B82F6",
  infoBg: "#DBEAFE",

  // ── Dark mode ready ───────────────────────────────────────────────────────
  darkBg: "#0F172A",
  darkSurface: "#1E293B",
  darkBorder: "#334155",

  // ── Legacy aliases (backward compat) ─────────────────────────────────────
  darkTeal: "#0F766E",
  softMint: "#CCFBF1",
};

// ── Gradient arrays for LinearGradient ────────────────────────────────────
export const gradients = {
  primary: ["#7C3AED", "#14B8A6"] as const,
  primaryReverse: ["#14B8A6", "#7C3AED"] as const,
  soft: ["#EDE9FE", "#CCFBF1"] as const,
  hero: ["#7C3AED", "#6366F1", "#14B8A6"] as const,
  card: ["#7C3AED", "#A78BFA"] as const,
  accent: ["#F59E0B", "#EF4444"] as const,
  dark: ["#0F172A", "#1E293B"] as const,
};