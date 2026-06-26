import { StyleSheet, Platform } from "react-native";
import { colors } from "../constants/colors";

const webFont = Platform.select({ web: "'Inter', system-ui, sans-serif", default: undefined });
const displayFont = Platform.select({ web: "'Lexend', 'Inter', system-ui", default: undefined });

const cardShadow = Platform.select({
  web: { boxShadow: "0 4px 20px rgba(124, 58, 237, 0.09)" },
  ios: { shadowColor: colors.primary, shadowOpacity: 0.08, shadowRadius: 14, shadowOffset: { width: 0, height: 4 } },
  android: { elevation: 3 },
  default: { elevation: 3 },
});

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...Platform.select({
      web: { boxShadow: "0 1px 8px rgba(124, 58, 237, 0.06)" },
      ios: { shadowColor: colors.primary, shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 2 },
      default: { elevation: 2 },
    }),
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
    fontFamily: displayFont,
  },

  backButton: {
    padding: 8,
    marginLeft: -8,
  },

  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    ...Platform.select({
      web: { boxShadow: "0 4px 14px rgba(124, 58, 237, 0.38)" },
      ios: { shadowColor: colors.primary, shadowOpacity: 0.38, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 5 },
      default: { elevation: 5 },
    }),
  },

  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
    fontFamily: webFont,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  // ── Event Card ─────────────────────────────────────────────────────────────
  eventCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...cardShadow,
  },

  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  eventTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.textPrimary,
    flex: 1,
    marginRight: 12,
    fontFamily: displayFont,
  },

  // ── Status Badges ──────────────────────────────────────────────────────────
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    fontFamily: webFont,
  },

  statusUpcoming: {
    backgroundColor: colors.warningBg,
    color: "#D97706",
  },

  statusOngoing: {
    backgroundColor: colors.successBg,
    color: "#059669",
  },

  statusCompleted: {
    backgroundColor: colors.border,
    color: colors.textSecondary,
  },

  statusCancelled: {
    backgroundColor: colors.errorBg,
    color: colors.error,
  },

  // ── Event Info ─────────────────────────────────────────────────────────────
  eventInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },

  eventInfoText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
    fontFamily: webFont,
  },

  // ── Stats Grid ─────────────────────────────────────────────────────────────
  eventStatsGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  eventStatBox: {
    flex: 1,
    minHeight: 66,
    borderRadius: 14,
    backgroundColor: colors.primaryBg,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  eventStatValue: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "800",
    fontFamily: displayFont,
  },

  eventStatLabel: {
    marginTop: 3,
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: "600",
    fontFamily: webFont,
  },

  // ── Progress Bar ───────────────────────────────────────────────────────────
  eventProgressBlock: {
    marginTop: 12,
  },

  eventProgressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  eventProgressText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "700",
    fontFamily: webFont,
  },

  eventProgressPercent: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    fontFamily: webFont,
  },

  eventProgressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.border,
    overflow: "hidden",
  },

  eventProgressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.primary,
  },

  // ── Empty State ─────────────────────────────────────────────────────────────
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textMuted,
    fontWeight: "500",
    fontFamily: webFont,
  },

  // ── Form ────────────────────────────────────────────────────────────────────
  formContainer: {
    padding: 20,
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
    fontFamily: webFont,
  },

  input: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: colors.textPrimary,
    fontFamily: webFont,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
    ...Platform.select({
      web: { boxShadow: "0 6px 22px rgba(124, 58, 237, 0.42)" },
      ios: { shadowColor: colors.primary, shadowOpacity: 0.42, shadowRadius: 14, shadowOffset: { width: 0, height: 5 } },
      android: { elevation: 7 },
      default: { elevation: 7 },
    }),
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: webFont,
  },

  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    fontFamily: webFont,
  },

  // ── Detail Styles ──────────────────────────────────────────────────────────
  detailSection: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...cardShadow,
  },

  detailTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 16,
    fontFamily: displayFont,
  },

  descText: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSecondary,
    fontFamily: webFont,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primaryBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
  },

  statBox: {
    alignItems: "center",
    flex: 1,
  },

  statNum: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primary,
    fontFamily: displayFont,
  },

  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    fontFamily: webFont,
  },

  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  editBtn: {
    flex: 1,
    backgroundColor: colors.info,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    ...Platform.select({
      web: { boxShadow: "0 4px 14px rgba(59, 130, 246, 0.35)" },
      ios: { shadowColor: colors.info, shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 5 },
      default: { elevation: 5 },
    }),
  },

  deleteBtn: {
    flex: 1,
    backgroundColor: colors.error,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    ...Platform.select({
      web: { boxShadow: "0 4px 14px rgba(239, 68, 68, 0.35)" },
      ios: { shadowColor: colors.error, shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 5 },
      default: { elevation: 5 },
    }),
  },

  registrationManageBtn: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    ...cardShadow,
  },

  registrationManageIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.borderPrimary,
  },

  registrationManageTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    fontFamily: displayFont,
  },

  registrationManageSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
    fontFamily: webFont,
  },

  btnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
    fontFamily: webFont,
  },
});
