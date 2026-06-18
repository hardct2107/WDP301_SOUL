// ============================================================
// SOUL Design System — Color Tokens
// ============================================================

// --- Primary (Purple) ---
export const primary = {
  600: "#9B67CC", // Main CTA, key interactive elements
  500: "#9C8BFE", // Primary buttons, active states
  400: "#A0A8F3", // Hover state, secondary highlights
  300: "#BB9DF7", // Light primary, icon backgrounds
  200: "#CDB6FE", // Subtle backgrounds, secondary buttons
  100: "#A5C0F7", // Very light primary tint
} as const;

// --- Neutral ---
export const neutral = {
  50:  "#FFFFFF", // Background, cards
  100: "#C8CDEB", // Borders, dividers
  200: "#878CB4", // Secondary text, placeholder
  300: "#475079", // Subdued text
  400: "#1D233B", // Primary text
  500: "#0B0F1A", // Darkest text
} as const;

// --- Yellow / Accent ---
export const accent = {
  100: "#FFFFDB", // Very light highlight
  200: "#FDEB97", // Soft highlight
  300: "#F9D75C", // Warning badge, tag highlight
  400: "#F2AB7F", // Warm accent
  500: "#EF84B0", // Decorative / soft pink
} as const;

// ============================================================
// Semantic / Contextual Aliases
// ============================================================
export const colors = {
  // Legacy aliases (kept for backward-compat, maps to new palette)
  primary:     primary[600],   // #9B67CC — main CTA
  primarySoft: primary[500],   // #9C8BFE — alt primary
  primaryMid:  primary[400],   // #A0A8F3 — hover / secondary
  primaryLight:primary[300],   // #BB9DF7 — light tint
  primaryPale: primary[200],   // #CDB6FE — subtle bg, secondary btn border
  primaryFaint:primary[100],   // #A5C0F7 — faintest tint

  // Backgrounds
  bg:        "#F5F3FF",        // Page background (very light purple tint)
  surface:   neutral[50],      // Cards, modals, panels
  surfaceAlt:"#EEE8FF",        // Alternative surface (soft purple)

  // Text
  textMain:  neutral[500],     // #0B0F1A — body text
  textStrong:neutral[400],     // #1D233B — headings
  textMuted: neutral[300],     // #475079 — secondary text
  textLight: neutral[200],     // #878CB4 — placeholder, captions

  // Borders
  border:    neutral[100],     // #C8CDEB — default border
  borderFocus:primary[600],    // #9B67CC — focused input border

  // Semantic states (error, warning kept as-is for legibility)
  error:     "#EF4444",
  errorLight:"#FEF2F2",
  errorBorder:"#FCA5A5",

  // Accent / Yellow
  accentWarm: accent[300],     // #F9D75C — tags, badges
  accentPink: accent[500],     // #EF84B0 — notification badge

  // Legacy compat (previously teal-based — now mapped to purple)
  dark:      neutral[400],     // #1D233B (was #1D233B)
  darkTeal:  primary[600],     // #9B67CC (was #9B67CC)
  softMint:  primary[200],     // #CDB6FE (was #D9FBEF)
} as const;