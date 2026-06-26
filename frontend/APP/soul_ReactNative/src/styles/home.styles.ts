import { StyleSheet, Platform } from "react-native";
import { colors } from "@/constants/colors";

const webFont = Platform.select({ web: "'Inter', system-ui, sans-serif", default: undefined });
const displayFont = Platform.select({ web: "'Lexend', 'Inter', system-ui", default: undefined });

const cardShadow = Platform.select({
  ios: { shadowColor: colors.primary, shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: 4 } },
  android: { elevation: 4 },
  web: { boxShadow: "0 4px 20px rgba(124, 58, 237, 0.1)" },
  default: { elevation: 4 },
});

export const styles = StyleSheet.create({
  // ── Page ──────────────────────────────────────────────────────────────────
  page: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  main: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 36,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
    position: "relative",
    zIndex: 999,
  },

  menuButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 3 },
      web: { boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
      default: { elevation: 3 },
    }),
  },

  menuButtonActive: {
    backgroundColor: colors.primaryBg,
    borderColor: colors.borderPrimary,
  },

  greetingBox: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textPrimary,
    fontFamily: displayFont,
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 13,
    color: colors.textSecondary,
    fontFamily: webFont,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    position: "relative",
    zIndex: 999,
  },

  bellWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },

  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  profileWrapper: {
    position: "relative",
    zIndex: 9999,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2.5,
    borderColor: colors.primary,
  },

  // ── Profile Dropdown ──────────────────────────────────────────────────────
  profileMenu: {
    position: "absolute",
    top: 58,
    right: 0,
    width: 290,
    borderRadius: 24,
    padding: 18,
    backgroundColor: colors.glassBg,
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 24, shadowOffset: { width: 0, height: 10 } },
      android: { elevation: 20 },
      web: { boxShadow: "0 16px 48px rgba(124, 58, 237, 0.18)", backdropFilter: "blur(20px)" },
      default: { elevation: 20 },
    }),
    zIndex: 99999,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },

  profileTop: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  profileImg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
    borderWidth: 2,
    borderColor: colors.borderPrimary,
  },

  profileName: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.textPrimary,
    fontFamily: displayFont,
  },

  profileSub: {
    marginTop: 3,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: webFont,
  },

  profileAction: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },

  profileLogout: {
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 14,
  },

  profileActionText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    fontFamily: webFont,
  },

  // ── Hero Card ─────────────────────────────────────────────────────────────
  heroCard: {
    minHeight: 280,
    borderRadius: 28,
    backgroundColor: colors.primary,
    padding: 24,
    marginBottom: 18,
    overflow: "hidden",
    position: "relative",
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.4, shadowRadius: 24, shadowOffset: { width: 0, height: 10 } },
      android: { elevation: 10 },
      web: { boxShadow: "0 12px 40px rgba(124, 58, 237, 0.45)" },
      default: { elevation: 10 },
    }),
  },

  heroBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  heroBadgeText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
    fontFamily: webFont,
    letterSpacing: 0.5,
  },

  heroTitle: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
    color: "#FFFFFF",
    fontFamily: displayFont,
  },

  heroDescription: {
    marginTop: 12,
    fontSize: 15,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 23,
    fontFamily: webFont,
  },

  heroButton: {
    marginTop: 24,
    width: 210,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
      android: { elevation: 4 },
      web: { boxShadow: "0 4px 16px rgba(0,0,0,0.15)" },
      default: { elevation: 4 },
    }),
  },

  heroButtonText: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 14,
    fontFamily: displayFont,
  },

  heroDecor: {
    position: "absolute",
    right: -36,
    bottom: -10,
  },

  // ── Feature Grid (Quick Actions) ──────────────────────────────────────────
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 18,
  },

  featureCard: {
    width: "48%",
    minHeight: 170,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    ...cardShadow,
  },

  featureIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  featureTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.textPrimary,
    fontFamily: displayFont,
  },

  featureSub: {
    marginTop: 6,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: webFont,
  },

  arrowCircle: {
    marginTop: "auto" as any,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Row / Panel ───────────────────────────────────────────────────────────
  row: {
    flexDirection: "column",
    gap: 16,
    marginBottom: 16,
  },

  panel: {
    width: "100%",
    minHeight: 260,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    ...cardShadow,
  },

  panelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  panelTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.textPrimary,
    fontFamily: displayFont,
  },

  panelLink: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 13,
    fontFamily: webFont,
  },

  // ── Chart (Mood Analytics) ────────────────────────────────────────────────
  chartRow: {
    height: 150,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  chartItem: {
    alignItems: "center",
  },

  emoji: {
    marginBottom: 6,
    fontSize: 18,
  },

  chartBar: {
    width: 22,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
  },

  day: {
    marginTop: 8,
    color: colors.textSecondary,
    fontWeight: "700",
    fontSize: 11,
    fontFamily: webFont,
  },

  // ── Note Box (Weekly Insight) ─────────────────────────────────────────────
  noteBox: {
    marginTop: 20,
    borderRadius: 18,
    backgroundColor: colors.primaryBg,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
  },

  noteText: {
    flex: 1,
    color: colors.primary,
    lineHeight: 20,
    fontSize: 13,
    fontWeight: "600",
    fontFamily: webFont,
  },

  // ── Center Box ────────────────────────────────────────────────────────────
  centerBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },

  suggestionText: {
    marginTop: 8,
    textAlign: "center",
    color: colors.textPrimary,
    fontWeight: "700",
    lineHeight: 23,
    fontSize: 15,
    fontFamily: webFont,
  },

  startButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 5 },
      web: { boxShadow: "0 4px 16px rgba(124, 58, 237, 0.4)" },
      default: { elevation: 5 },
    }),
  },

  startButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontFamily: webFont,
  },

  // ── Community ─────────────────────────────────────────────────────────────
  communityWrap: {
    flexDirection: "column",
    gap: 16,
    marginTop: 18,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  smallAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.borderPrimary,
  },

  userName: {
    fontWeight: "800",
    color: colors.textPrimary,
    fontSize: 15,
    fontFamily: displayFont,
  },

  newTag: {
    fontSize: 11,
    color: colors.teal,
    fontWeight: "700",
  },

  time: {
    color: colors.textMuted,
    marginTop: 3,
    fontSize: 12,
    fontFamily: webFont,
  },

  postText: {
    marginTop: 14,
    color: colors.textPrimary,
    lineHeight: 22,
    fontSize: 14,
    fontFamily: webFont,
  },

  illustrationBox: {
    width: "100%",
    height: 130,
    borderRadius: 20,
    backgroundColor: colors.accentBg,
    alignItems: "center",
    justifyContent: "center",
  },

  reactRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 20,
  },

  reactText: {
    color: colors.textSecondary,
    fontWeight: "700",
    fontFamily: webFont,
  },

  // ── Event Card ────────────────────────────────────────────────────────────
  eventTitle: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "800",
    color: colors.textPrimary,
    fontFamily: displayFont,
  },

  eventMeta: {
    marginTop: 10,
    color: colors.textSecondary,
    fontWeight: "600",
    fontSize: 13,
    fontFamily: webFont,
  },

  eventImage: {
    width: "100%",
    height: 130,
    borderRadius: 20,
    backgroundColor: colors.accentBg,
    alignItems: "center",
    justifyContent: "center",
  },

  joinButton: {
    marginTop: 18,
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
    ...Platform.select({
      ios: { shadowColor: colors.accent, shadowOpacity: 0.35, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
      android: { elevation: 4 },
      web: { boxShadow: "0 4px 12px rgba(245, 158, 11, 0.4)" },
      default: { elevation: 4 },
    }),
  },

  joinText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontFamily: webFont,
  },

  // ── Bottom Nav ────────────────────────────────────────────────────────────
  footer: {
    height: 82,
    borderRadius: 28,
    backgroundColor: colors.surface,
    marginTop: 8,
    marginBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.12, shadowRadius: 20, shadowOffset: { width: 0, height: -4 } },
      android: { elevation: 8 },
      web: { boxShadow: "0 -4px 24px rgba(124, 58, 237, 0.1)" },
      default: { elevation: 8 },
    }),
  },

  footerItem: {
    alignItems: "center",
  },

  footerText: {
    marginTop: 4,
    color: colors.textSecondary,
    fontWeight: "700",
    fontSize: 11,
    fontFamily: webFont,
  },

  footerPlus: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.5, shadowRadius: 16, shadowOffset: { width: 0, height: 6 } },
      android: { elevation: 10 },
      web: { boxShadow: "0 8px 24px rgba(124, 58, 237, 0.5)" },
      default: { elevation: 10 },
    }),
  },

  // ── Sidebar ───────────────────────────────────────────────────────────────
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 260,
    backgroundColor: colors.glassBg,
    padding: 24,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    borderRightWidth: 1,
    borderColor: colors.glassBorder,
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.2, shadowRadius: 32, shadowOffset: { width: 8, height: 0 } },
      android: { elevation: 16 },
      web: { boxShadow: "8px 0 48px rgba(124, 58, 237, 0.18)", backdropFilter: "blur(20px)" },
      default: { elevation: 16 },
    }),
    zIndex: 99999,
  },

  logoBox: {
    alignItems: "center",
    marginBottom: 28,
  },

  logoText: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: "800",
    color: colors.primary,
    fontFamily: displayFont,
    letterSpacing: 2,
  },

  sideItem: {
    height: 52,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 6,
  },

  sideItemActive: {
    backgroundColor: colors.primaryBg,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
  },

  sideText: {
    marginLeft: 12,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "600",
    fontFamily: webFont,
  },

  sideTextActive: {
    color: colors.primary,
    fontWeight: "800",
  },

  // ── Reminder Card (bottom of sidebar) ────────────────────────────────────
  reminderCard: {
    marginTop: "auto" as any,
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.primaryBg,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
  },

  reminderTitle: {
    marginTop: 10,
    color: colors.primary,
    fontWeight: "800",
    fontFamily: displayFont,
  },

  reminderText: {
    marginTop: 8,
    color: colors.textSecondary,
    lineHeight: 20,
    fontSize: 13,
    fontFamily: webFont,
  },
});