import { Platform, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

const webFont = Platform.select({ web: "'Inter', system-ui, sans-serif", default: undefined });
const displayFont = Platform.select({ web: "'Lexend', 'Inter', system-ui", default: undefined });

const cardShadow = Platform.select({
  web: { boxShadow: "0 4px 20px rgba(124, 58, 237, 0.09)" },
  ios: { shadowColor: colors.primary, shadowOpacity: 0.08, shadowRadius: 14, shadowOffset: { width: 0, height: 4 } },
  android: { elevation: 3 },
  default: { elevation: 3 },
});

export const adminForumStyles = StyleSheet.create({
  // ── Page ──────────────────────────────────────────────────────────────────
  page: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: colors.primaryBg,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    borderBottomWidth: 1,
    borderColor: colors.borderPrimary,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 5 },
      web: { boxShadow: "0 4px 14px rgba(124, 58, 237, 0.4)" },
      default: { elevation: 5 },
    }),
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.primary,
    fontFamily: displayFont,
  },

  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 18,
    fontFamily: webFont,
  },

  // ── Stats Row ─────────────────────────────────────────────────────────────
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    ...cardShadow,
  },

  statValue: {
    fontSize: 21,
    fontWeight: "800",
    color: colors.primary,
    fontFamily: displayFont,
  },

  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: "center",
    fontFamily: webFont,
  },

  // ── Search ────────────────────────────────────────────────────────────────
  searchBox: {
    height: 52,
    borderRadius: 18,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      web: { boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
      ios: { shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 2 },
      default: { elevation: 2 },
    }),
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    paddingHorizontal: 10,
    fontFamily: webFont,
    // @ts-ignore
    // outlineStyle: "none",
  },

  // ── Filter Chips ──────────────────────────────────────────────────────────
  filterRow: {
    gap: 10,
    paddingRight: 20,
  },

  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  filterText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
    fontFamily: webFont,
  },

  filterTextActive: {
    color: "#FFFFFF",
  },

  // ── Post List ─────────────────────────────────────────────────────────────
  list: {
    padding: 20,
    paddingBottom: 40,
  },

  // ── Post Card ─────────────────────────────────────────────────────────────
  postCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...cardShadow,
  },

  postTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  authorBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 2,
    borderColor: colors.borderPrimary,
  },

  authorInfo: {
    flex: 1,
  },

  authorName: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.textPrimary,
    fontFamily: displayFont,
  },

  postDate: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
    fontFamily: webFont,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "800",
    fontFamily: webFont,
  },

  postTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 8,
    fontFamily: displayFont,
  },

  postContent: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    fontFamily: webFont,
  },

  postMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  metaText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "600",
    fontFamily: webFont,
  },

  // ── Action Buttons ────────────────────────────────────────────────────────
  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
  },

  viewButton: {
    backgroundColor: colors.infoBg,
  },

  approveButton: {
    backgroundColor: colors.successBg,
  },

  hideButton: {
    backgroundColor: colors.warningBg,
  },

  deleteButton: {
    backgroundColor: colors.errorBg,
  },

  actionText: {
    fontSize: 13,
    fontWeight: "700",
    fontFamily: webFont,
  },

  // ── Empty State ───────────────────────────────────────────────────────────
  emptyBox: {
    alignItems: "center",
    paddingVertical: 70,
    paddingHorizontal: 24,
  },

  emptyIcon: {
    fontSize: 52,
    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    fontFamily: displayFont,
  },

  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 21,
    fontFamily: webFont,
  },
});