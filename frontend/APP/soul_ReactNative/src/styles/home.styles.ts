import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bg,         // #F5F3FF — light purple page bg
  },

  main: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 36,
  },

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
    backgroundColor: colors.surface,    // #FFFFFF
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    elevation: 3,
  },

  menuButtonActive: {
    backgroundColor: colors.surfaceAlt, // #EEE8FF — soft purple active
  },

  greetingBox: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.textStrong,           // #1D233B
  },

  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textLight,            // #878CB4
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    position: "relative",
    zIndex: 999,
  },

  bellWrap: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.accentPink, // #EF84B0 — notification badge
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: colors.surface,              // #FFFFFF
    fontSize: 10,
    fontWeight: "900",
  },

  profileWrapper: {
    position: "relative",
    zIndex: 9999,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: colors.primary,        // #9B67CC — purple avatar ring
  },

  profileMenu: {
    position: "absolute",
    top: 58,
    right: 0,
    width: 280,
    borderRadius: 22,
    padding: 18,
    backgroundColor: colors.surface,   // #FFFFFF
    elevation: 30,
    zIndex: 99999,
  },

  profileTop: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,   // #C8CDEB
  },

  profileImg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },

  profileName: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.textStrong,           // #1D233B
  },

  profileSub: {
    marginTop: 4,
    color: colors.textMuted,            // #475079
    fontSize: 12,
    fontWeight: "600",
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
    borderTopColor: colors.border,      // #C8CDEB
    paddingTop: 14,
  },

  profileActionText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textStrong,           // #1D233B
  },

  heroCard: {
    minHeight: 280,
    borderRadius: 28,
    backgroundColor: colors.primary,   // #9B67CC — purple hero
    padding: 24,
    marginBottom: 18,
    overflow: "hidden",
    position: "relative",
  },

  heroBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginBottom: 18,
  },

  heroBadgeText: {
    color: colors.surface,              // #FFFFFF
    fontWeight: "800",
    fontSize: 13,
  },

  heroTitle: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "900",
    color: colors.surface,              // #FFFFFF
  },

  heroDescription: {
    marginTop: 14,
    fontSize: 16,
    color: "#EDE9FF",                   // very light lavender on dark purple
    lineHeight: 24,
  },

  heroButton: {
    marginTop: 24,
    width: 210,
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.surface,   // #FFFFFF
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  heroButtonText: {
    color: colors.primary,              // #9B67CC — purple text on white btn
    fontWeight: "900",
    fontSize: 14,
  },

  heroDecor: {
    position: "absolute",
    right: -36,
    bottom: -10,
  },

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
  },

  featureIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surface,   // #FFFFFF
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.textStrong,           // #1D233B
  },

  featureSub: {
    marginTop: 8,
    color: colors.textMuted,            // #475079
    fontSize: 12,
    fontWeight: "600",
  },

  arrowCircle: {
    marginTop: "auto",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,   // #FFFFFF
    alignItems: "center",
    justifyContent: "center",
  },

  row: {
    flexDirection: "column",
    gap: 16,
    marginBottom: 16,
  },

  panel: {
    width: "100%",
    minHeight: 260,
    backgroundColor: colors.surface,   // #FFFFFF
    borderRadius: 24,
    padding: 20,
    elevation: 3,
  },

  panelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  panelTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.textStrong,           // #1D233B
  },

  panelLink: {
    color: colors.primary,              // #9B67CC
    fontWeight: "800",
    fontSize: 13,
  },

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
    backgroundColor: colors.primaryMid, // #A0A8F3 — chart bar in purple
  },

  day: {
    marginTop: 8,
    color: colors.textMuted,            // #475079
    fontWeight: "700",
    fontSize: 11,
  },

  noteBox: {
    marginTop: 20,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt, // #EEE8FF — soft purple note bg
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  noteText: {
    flex: 1,
    color: colors.textMuted,            // #475079
    lineHeight: 20,
    fontSize: 13,
    fontWeight: "600",
  },

  centerBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },

  suggestionText: {
    marginTop: 8,
    textAlign: "center",
    color: colors.textStrong,           // #1D233B
    fontWeight: "800",
    lineHeight: 23,
    fontSize: 15,
  },

  startButton: {
    marginTop: 16,
    backgroundColor: colors.primary,   // #9B67CC
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 14,
  },

  startButtonText: {
    color: colors.surface,              // #FFFFFF
    fontWeight: "900",
  },

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
  },

  userName: {
    fontWeight: "900",
    color: colors.textStrong,           // #1D233B
    fontSize: 15,
  },

  newTag: {
    fontSize: 11,
    color: colors.primary,              // #9B67CC
  },

  time: {
    color: colors.textLight,            // #878CB4
    marginTop: 3,
    fontSize: 12,
  },

  postText: {
    marginTop: 16,
    color: colors.textMain,             // #0B0F1A
    lineHeight: 22,
    fontSize: 14,
  },

  illustrationBox: {
    width: "100%",
    height: 130,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt, // #EEE8FF — soft purple placeholder
    alignItems: "center",
    justifyContent: "center",
  },

  reactRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 24,
  },

  reactText: {
    color: colors.textMuted,            // #475079
    fontWeight: "800",
  },

  eventTitle: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "900",
    color: colors.textStrong,           // #1D233B
  },

  eventMeta: {
    marginTop: 10,
    color: colors.textMuted,            // #475079
    fontWeight: "700",
    fontSize: 13,
  },

  eventImage: {
    width: "100%",
    height: 130,
    borderRadius: 22,
    backgroundColor: "#FFF1D8",         // warm yellow placeholder (accent)
    alignItems: "center",
    justifyContent: "center",
  },

  joinButton: {
    marginTop: 18,
    alignSelf: "flex-start",
    backgroundColor: colors.accentWarm, // #F9D75C — yellow accent CTA
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 14,
  },

  joinText: {
    color: colors.textStrong,           // #1D233B — readable on yellow
    fontWeight: "900",
  },

  footer: {
    height: 82,
    borderRadius: 28,
    backgroundColor: colors.surface,   // #FFFFFF
    marginTop: 8,
    marginBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 6,
  },

  footerItem: {
    alignItems: "center",
  },

  footerText: {
    marginTop: 4,
    color: colors.textLight,            // #878CB4
    fontWeight: "700",
    fontSize: 11,
  },

  footerPlus: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,   // #9B67CC — FAB purple
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
    elevation: 8,
  },

  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: colors.surface,   // #FFFFFF
    padding: 24,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    elevation: 10,
    zIndex: 99999,
  },

  logoBox: {
    alignItems: "center",
    marginBottom: 28,
  },

  logoText: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: "900",
    color: colors.primary,              // #9B67CC — brand purple
  },

  sideItem: {
    height: 52,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 8,
  },

  sideItemActive: {
    backgroundColor: colors.surfaceAlt, // #EEE8FF — soft purple active bg
  },

  sideText: {
    marginLeft: 12,
    fontSize: 14,
    color: colors.textLight,            // #878CB4
    fontWeight: "700",
  },

  sideTextActive: {
    color: colors.primary,              // #9B67CC — purple active text
    fontWeight: "900",
  },

  reminderCard: {
    marginTop: "auto",
    padding: 16,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt, // #EEE8FF
  },

  reminderTitle: {
    marginTop: 10,
    color: colors.primary,              // #9B67CC
    fontWeight: "900",
  },

  reminderText: {
    marginTop: 8,
    color: colors.textMuted,            // #475079
    lineHeight: 20,
    fontSize: 13,
  },
});