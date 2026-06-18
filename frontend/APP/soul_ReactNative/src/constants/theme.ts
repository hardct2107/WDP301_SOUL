/**
 * SOUL Design System — Theme Tokens
 * Light mode using purple-primary palette.
 */

import { Platform } from 'react-native';
import { primary, neutral } from './colors';

// Primary tint for interactive elements
const tintColorLight = primary[600]; // #9B67CC
const tintColorDark  = neutral[50];  // #FFFFFF

export const Colors = {
  light: {
    text:             neutral[500],   // #0B0F1A
    background:       '#F5F3FF',      // very light purple tint page bg
    tint:             tintColorLight, // #9B67CC
    icon:             neutral[300],   // #475079
    tabIconDefault:   neutral[200],   // #878CB4
    tabIconSelected:  tintColorLight, // #9B67CC
  },
  dark: {
    text:             neutral[50],    // #FFFFFF
    background:       neutral[500],   // #0B0F1A
    tint:             tintColorDark,
    icon:             neutral[200],   // #878CB4
    tabIconDefault:   neutral[200],
    tabIconSelected:  primary[300],   // #BB9DF7
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
