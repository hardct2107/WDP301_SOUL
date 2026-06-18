import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

export const forumStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bg,         // #F5F3FF — light purple page bg
  },

  header: {
    backgroundColor: colors.surfaceAlt, // #EEE8FF — soft purple header
    paddingTop: 48,
    paddingHorizontal: 18,
    paddingBottom: 14,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,    // #FFFFFF
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
  },

  headerTitleWrap: {
    flex: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.textStrong,           // #1D233B
  },

  subtitle: {
    marginTop: 6,
    color: colors.textMuted,            // #475079
    fontSize: 14,
    lineHeight: 20,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,    // #FFFFFF
    alignItems: "center",
    justifyContent: "center",
  },

  plusButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,   // #9B67CC — purple create button
    alignItems: "center",
    justifyContent: "center",
  },

  searchBox: {
    marginTop: 22,
    height: 54,
    borderRadius: 28,
    backgroundColor: colors.surface,   // #FFFFFF
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  searchInput: {
    flex: 1,
    color: colors.textMain,             // #0B0F1A
    fontSize: 15,
  },

  filterRow: {
    paddingTop: 16,
    paddingBottom: 2,
    gap: 10,
  },

  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.primaryPale, // #CDB6FE — light purple chip bg
  },

  filterChipActive: {
    backgroundColor: colors.primary,   // #9B67CC — solid purple active
  },

  filterText: {
    color: colors.textStrong,           // #1D233B
    fontSize: 14,
    fontWeight: "800",
  },

  filterTextActive: {
    color: colors.surface,              // #FFFFFF
  },

  list: {
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 130,
  },

  postCard: {
    backgroundColor: colors.surface,   // #FFFFFF
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,         // #C8CDEB
  },

  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },

  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },

  authorInfo: {
    flex: 1,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryPale, // #CDB6FE — purple avatar bg
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flexWrap: "wrap",
  },

  authorName: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.textStrong,           // #1D233B
  },

  postMeta: {
    color: colors.textLight,            // #878CB4
    marginTop: 3,
    fontSize: 13,
    fontWeight: "600",
  },

  mineActions: {
    alignItems: "flex-end",
    gap: 8,
  },

  ownerActions: {
    flexDirection: "row",
    gap: 12,
  },

  statusBadge: {
    backgroundColor: colors.accentWarm + "33", // yellow-300 with opacity
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  statusText: {
    color: "#A16207",
    fontWeight: "800",
    fontSize: 11,
    textTransform: "capitalize",
  },

  postContent: {
    marginTop: 14,
    color: colors.textMain,             // #0B0F1A
    fontSize: 16,
    lineHeight: 24,
  },

  tagRow: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    backgroundColor: colors.surfaceAlt, // #EEE8FF — purple tag bg
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  tagText: {
    color: colors.primary,              // #9B67CC — purple tag text
    fontSize: 12,
    fontWeight: "800",
  },

  postImage: {
    marginTop: 16,
    height: 270,
    width: "100%",
    borderRadius: 16,
    backgroundColor: colors.primaryPale, // #CDB6FE — purple placeholder
  },

  actionRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    rowGap: 10,
  },

  webPreview: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.border,    // #C8CDEB
    marginTop: 12,
  },

  mediaPlaceholder: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surfaceAlt, // #EEE8FF
    borderRadius: 16,
    marginTop: 12,
  },

  mediaPlaceholderText: {
    marginTop: 8,
    color: colors.textLight,            // #878CB4
    fontSize: 14,
  },

  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minWidth: 48,
  },

  actionEmoji: {
    fontSize: 20,
  },

  actionText: {
    color: colors.textMuted,            // #475079
    fontSize: 14,
    fontWeight: "800",
  },

  emptyBox: {
    alignItems: "center",
    paddingVertical: 70,
    paddingHorizontal: 20,
  },

  emptyIcon: {
    fontSize: 52,
  },

  emptyTitle: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "900",
    color: colors.textStrong,           // #1D233B
    textAlign: "center",
  },

  emptyText: {
    marginTop: 6,
    color: colors.textLight,            // #878CB4
    fontSize: 15,
    textAlign: "center",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(11, 15, 26, 0.5)",
    justifyContent: "flex-end",
  },

  createModal: {
    maxHeight: "92%",
    backgroundColor: colors.surface,   // #FFFFFF
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
  },

  modalHandle: {
    alignSelf: "center",
    width: 55,
    height: 6,
    borderRadius: 99,
    backgroundColor: colors.border,    // #C8CDEB
    marginBottom: 20,
  },

  closeButton: {
    position: "absolute",
    right: 20,
    top: 28,
    zIndex: 5,
  },

  modalTitle: {
    textAlign: "center",
    color: colors.textStrong,           // #1D233B
    fontSize: 24,
    fontWeight: "900",
  },

  modalSub: {
    textAlign: "center",
    marginTop: 8,
    color: colors.textMuted,            // #475079
    fontSize: 15,
  },

  bigInputWrap: {
    marginTop: 22,
    height: 150,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,         // #C8CDEB
    padding: 14,
  },

  bigInput: {
    flex: 1,
    textAlignVertical: "top",
    color: colors.textMain,             // #0B0F1A
    fontSize: 16,
  },

  counter: {
    textAlign: "right",
    color: colors.textLight,            // #878CB4
    fontSize: 12,
  },

  formInput: {
    marginTop: 14,
    minHeight: 58,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,         // #C8CDEB
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  formTextInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textMain,             // #0B0F1A
  },

  hashIcon: {
    fontSize: 30,
    color: colors.textLight,            // #878CB4
    fontWeight: "500",
  },

  feelingLabel: {
    marginTop: 20,
    color: colors.textStrong,           // #1D233B
    fontSize: 15,
    fontWeight: "800",
  },

  emotionGrid: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  emotionCard: {
    width: "31%",
    height: 78,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,         // #C8CDEB
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,   // #FFFFFF
  },

  emotionCardActive: {
    borderColor: colors.primary,        // #9B67CC — purple focus ring
    borderWidth: 2,
    backgroundColor: colors.surfaceAlt, // #EEE8FF
  },

  emotionEmoji: {
    fontSize: 26,
  },

  emotionName: {
    marginTop: 5,
    fontSize: 11,
    color: colors.textStrong,           // #1D233B
    fontWeight: "700",
  },

  anonymousRow: {
    marginTop: 16,
    minHeight: 58,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,         // #C8CDEB
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  anonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },

  anonText: {
    fontSize: 15,
    color: colors.textStrong,           // #1D233B
    fontWeight: "700",
  },

  submitButton: {
    marginTop: 20,
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: colors.primary,   // #9B67CC — purple submit CTA
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 16,
  },

  submitText: {
    color: colors.surface,              // #FFFFFF
    fontSize: 17,
    fontWeight: "900",
  },

  cancelText: {
    marginTop: 18,
    textAlign: "center",
    color: colors.textMuted,            // #475079
    fontSize: 16,
    fontWeight: "700",
  },

  bottomSwitcher: {
    position: "absolute",
    bottom: 22,
    left: 16,
    right: 16,
    height: 68,
    backgroundColor: colors.surface,   // #FFFFFF
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    elevation: 10,
  },

  bottomTab: {
    flex: 1,
    height: 52,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  bottomTabActive: {
    backgroundColor: colors.primary,   // #9B67CC — purple active tab
  },

  bottomTabText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.textLight,            // #878CB4
  },

  bottomTabTextActive: {
    color: colors.surface,              // #FFFFFF
  },

  inlineCommentBox: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,      // #C8CDEB
  },

  commentThread: {
    marginBottom: 10,
  },

  inlineCommentCard: {
    backgroundColor: colors.surfaceAlt, // #EEE8FF — soft purple comment bg
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },

  inlineCommentAuthor: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.textStrong,           // #1D233B
    flex: 1,
  },

  inlineCommentText: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textMain,             // #0B0F1A
    lineHeight: 20,
  },

  commentActionRow: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 14,
    rowGap: 8,
  },

  commentActionText: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.primary,              // #9B67CC — purple action links
  },

  commentTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  commentMenuButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  commentMenu: {
    marginTop: 10,
    alignSelf: "flex-end",
    width: 138,
    backgroundColor: colors.surface,   // #FFFFFF
    borderRadius: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,         // #C8CDEB
    elevation: 8,
    shadowColor: colors.primary,
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  commentMenuItem: {
    minHeight: 38,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  commentMenuText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.textStrong,           // #1D233B
  },

  commentMenuDeleteText: {
    color: colors.error,                // #EF4444
  },

  replyList: {
    marginLeft: 22,
    marginTop: 4,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: colors.primaryPale, // #CDB6FE — purple reply line
  },

  replyCard: {
    backgroundColor: colors.surface,   // #FFFFFF
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },

  inlineCommentInputRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  inlineCommentInput: {
    flex: 1,
    height: 46,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt, // #EEE8FF
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.textMain,             // #0B0F1A
  },

  inlineCommentSend: {
    width: 46,
    height: 46,
    borderRadius: 999,
    backgroundColor: colors.primary,   // #9B67CC
    alignItems: "center",
    justifyContent: "center",
  },

  replyInputRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  replyInput: {
    flex: 1,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.surface,   // #FFFFFF
    paddingHorizontal: 14,
    fontSize: 13,
    color: colors.textMain,             // #0B0F1A
  },

  replySend: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.primary,   // #9B67CC
    alignItems: "center",
    justifyContent: "center",
  },

  replySendCancel: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.error,     // #EF4444
    alignItems: "center",
    justifyContent: "center",
  },

  reportBackdrop: {
    flex: 1,
    backgroundColor: "rgba(11, 15, 26, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  reportModal: {
    width: "100%",
    maxWidth: 390,
    backgroundColor: colors.surface,   // #FFFFFF
    borderRadius: 24,
    padding: 22,
    maxHeight: "84%",
  },

  reportTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.textStrong,           // #1D233B
    textAlign: "center",
  },

  reportSub: {
    marginTop: 8,
    color: colors.textMuted,            // #475079
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
  },

  reasonList: {
    marginTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  reasonChip: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: colors.primaryPale, // #CDB6FE — light purple chip
  },

  reasonChipActive: {
    backgroundColor: colors.primary,   // #9B67CC — solid purple active
  },

  reasonText: {
    color: colors.textStrong,           // #1D233B
    fontWeight: "800",
    fontSize: 12,
    textTransform: "capitalize",
  },

  reasonTextActive: {
    color: colors.surface,              // #FFFFFF
  },

  reportInput: {
    marginTop: 16,
    minHeight: 100,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,         // #C8CDEB
    padding: 14,
    textAlignVertical: "top",
    color: colors.textMain,             // #0B0F1A
    fontSize: 14,
    backgroundColor: colors.surface,   // #FFFFFF
  },

  myReportList: {
    marginTop: 16,
    maxHeight: 360,
  },

  myReportCard: {
    backgroundColor: colors.surfaceAlt, // #EEE8FF — purple report card bg
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },

  myReportReason: {
    color: colors.textStrong,           // #1D233B
    fontWeight: "900",
    fontSize: 15,
    textTransform: "capitalize",
  },

  myReportMeta: {
    marginTop: 6,
    color: colors.textMuted,            // #475079
    fontWeight: "700",
    fontSize: 13,
  },

  myReportDescription: {
    marginTop: 8,
    color: colors.textMain,             // #0B0F1A
    lineHeight: 20,
  },

  emptyReportText: {
    textAlign: "center",
    color: colors.textMuted,            // #475079
    paddingVertical: 30,
  },

  confirmBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  confirmBox: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: colors.surface,   // #FFFFFF
    borderRadius: 24,
    padding: 22,
  },

  confirmTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.textStrong,           // #1D233B
    textAlign: "center",
  },

  confirmText: {
    marginTop: 12,
    textAlign: "center",
    color: colors.textMuted,            // #475079
    fontSize: 15,
    lineHeight: 22,
  },

  confirmActions: {
    marginTop: 22,
    flexDirection: "row",
    gap: 12,
  },

  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt, // #EEE8FF — soft purple cancel
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.error,     // #EF4444 — danger stays red
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    color: colors.primary,              // #9B67CC — purple cancel text
    fontWeight: "800",
    fontSize: 15,
  },

  deleteButtonText: {
    color: colors.surface,              // #FFFFFF
    fontWeight: "900",
    fontSize: 15,
  },
});