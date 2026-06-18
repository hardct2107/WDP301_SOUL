import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,         // #F5F3FF — light purple page bg
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: colors.surface,    // #FFFFFF
    borderBottomWidth: 1,
    borderBottomColor: colors.border,   // #C8CDEB
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textStrong,           // #1D233B
    fontFamily: "Georgia",
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  addButton: {
    backgroundColor: colors.primary,   // #9B67CC — purple CTA
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  addButtonText: {
    color: colors.surface,              // #FFFFFF
    fontWeight: "600",
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  eventCard: {
    backgroundColor: colors.surface,   // #FFFFFF
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textStrong,           // #1D233B
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  // Status colors use accent/neutral tones for clear semantic meaning
  statusUpcoming: {
    backgroundColor: colors.accentWarm + "44", // yellow-300 tinted
    color: "#92620A",
  },
  statusOngoing: {
    backgroundColor: colors.primaryPale,        // #CDB6FE
    color: colors.primary,                      // #9B67CC
  },
  statusCompleted: {
    backgroundColor: colors.border,             // #C8CDEB
    color: colors.textMuted,                    // #475079
  },
  statusCancelled: {
    backgroundColor: "#FEE2E2",
    color: "#DC2626",
  },
  eventInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  eventInfoText: {
    fontSize: 14,
    color: colors.textLight,            // #878CB4
    flex: 1,
  },
  eventStatsGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  eventStatBox: {
    flex: 1,
    minHeight: 66,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt, // #EEE8FF — soft purple stat bg
    borderWidth: 1,
    borderColor: colors.primaryPale,    // #CDB6FE
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  eventStatValue: {
    color: colors.textStrong,           // #1D233B
    fontSize: 17,
    fontWeight: "800",
  },
  eventStatLabel: {
    marginTop: 3,
    color: colors.textMuted,            // #475079
    fontSize: 11,
    fontWeight: "700",
  },
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
    color: colors.textMuted,            // #475079
    fontSize: 12,
    fontWeight: "700",
  },
  eventProgressPercent: {
    color: colors.primary,              // #9B67CC
    fontSize: 12,
    fontWeight: "800",
  },
  eventProgressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.primaryPale, // #CDB6FE — track bg
    overflow: "hidden",
  },
  eventProgressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.primary,   // #9B67CC — progress fill
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textLight,            // #878CB4
    fontWeight: "500",
  },
  // Form Styles
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textStrong,           // #1D233B
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,   // #FFFFFF
    borderWidth: 1,
    borderColor: colors.border,         // #C8CDEB
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textMain,             // #0B0F1A
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: colors.primary,   // #9B67CC — purple submit
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  submitButtonText: {
    color: colors.surface,              // #FFFFFF
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: colors.error,                // #EF4444
    fontSize: 12,
    marginTop: 4,
  },
  // Detail Styles
  detailSection: {
    backgroundColor: colors.surface,   // #FFFFFF
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textStrong,           // #1D233B
    marginBottom: 16,
  },
  descText: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textMuted,            // #475079
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.surfaceAlt, // #EEE8FF — purple stats bg
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statNum: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,              // #9B67CC
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,            // #878CB4
    marginTop: 4,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  editBtn: {
    flex: 1,
    backgroundColor: colors.primarySoft, // #9C8BFE — soft purple edit
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: colors.error,     // #EF4444 — danger stays red
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  registrationManageBtn: {
    backgroundColor: colors.surface,   // #FFFFFF
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.primaryPale,   // #CDB6FE
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  registrationManageIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: colors.surfaceAlt, // #EEE8FF
    alignItems: "center",
    justifyContent: "center",
  },
  registrationManageTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textStrong,           // #1D233B
  },
  registrationManageSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textLight,            // #878CB4
    lineHeight: 17,
  },
  btnText: {
    color: colors.surface,              // #FFFFFF
    fontWeight: "bold",
    fontSize: 15,
  },
});
