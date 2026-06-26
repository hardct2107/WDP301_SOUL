/**
 * SOUL Design System — Theme Constants
 * Premium SaaS: spacing, shadows, borderRadius, typography
 */

import { Platform } from "react-native";

// ── Spacing ───────────────────────────────────────────────────────────────
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  "2xl": 28,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 64,
};

// ── Border Radius ─────────────────────────────────────────────────────────
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 32,
  full: 999,
};

// ── Shadows — cross-platform ──────────────────────────────────────────────
export const shadows = {
  sm: Platform.select({
    ios: { shadowColor: "#7C3AED", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
    android: { elevation: 2 },
    web: { boxShadow: "0 1px 8px rgba(124, 58, 237, 0.08)" },
    default: { elevation: 2 },
  }),
  md: Platform.select({
    ios: { shadowColor: "#7C3AED", shadowOpacity: 0.1, shadowRadius: 16, shadowOffset: { width: 0, height: 4 } },
    android: { elevation: 4 },
    web: { boxShadow: "0 4px 16px rgba(124, 58, 237, 0.12)" },
    default: { elevation: 4 },
  }),
  lg: Platform.select({
    ios: { shadowColor: "#7C3AED", shadowOpacity: 0.15, shadowRadius: 24, shadowOffset: { width: 0, height: 8 } },
    android: { elevation: 8 },
    web: { boxShadow: "0 8px 32px rgba(124, 58, 237, 0.18)" },
    default: { elevation: 8 },
  }),
  xl: Platform.select({
    ios: { shadowColor: "#7C3AED", shadowOpacity: 0.2, shadowRadius: 32, shadowOffset: { width: 0, height: 12 } },
    android: { elevation: 12 },
    web: { boxShadow: "0 12px 48px rgba(124, 58, 237, 0.22)" },
    default: { elevation: 12 },
  }),
};

// ── Typography ────────────────────────────────────────────────────────────
export const Fonts = Platform.select({
  web: {
    sans: "'Inter', 'Lexend', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: "'Lexend', 'Inter', system-ui, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  ios: {
    sans: "system-ui",
    display: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    display: "normal",
    mono: "monospace",
  },
});

export const fontSizes = {
  xs: 11,
  sm: 12,
  base: 14,
  md: 15,
  lg: 16,
  xl: 18,
  "2xl": 20,
  "3xl": 24,
  "4xl": 28,
  "5xl": 32,
  "6xl": 36,
};

export const fontWeights = {
  normal: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extrabold: "800" as const,
  black: "900" as const,
};

// ── Colors legacy export for backward compat ──────────────────────────────
export const Colors = {
  light: {
    text: "#1E293B",
    background: "#F8FAFC",
    tint: "#7C3AED",
    icon: "#64748B",
    tabIconDefault: "#94A3B8",
    tabIconSelected: "#7C3AED",
  },
  dark: {
    text: "#F1F5F9",
    background: "#0F172A",
    tint: "#A78BFA",
    icon: "#94A3B8",
    tabIconDefault: "#64748B",
    tabIconSelected: "#A78BFA",
  },
};
