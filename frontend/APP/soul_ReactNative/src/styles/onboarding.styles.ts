import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "@/constants/colors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const shadow = Platform.select({
  ios: { shadowColor: "#7C3AED", shadowOpacity: 0.12, shadowRadius: 20, shadowOffset: { width: 0, height: 8 } },
  android: { elevation: 6 },
  web: { boxShadow: "0 8px 32px rgba(124, 58, 237, 0.15)" },
  default: { elevation: 6 },
});

export const onboardingStyles = StyleSheet.create({
  // ── Splash Screen ─────────────────────────────────────────────────────────
  splashContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  splashLogo: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 44,
    fontWeight: "800",
    color: colors.primary,
    fontFamily: Platform.select({ web: "'Lexend', 'Inter', system-ui", default: undefined }),
    letterSpacing: 3,
    marginBottom: 40,
  },
  spinner: {
    marginTop: 20,
  },

  // ── Onboarding Screen ─────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 16,
    overflow: "hidden" as const,
  },

  headerText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
    fontFamily: Platform.select({ web: "'Lexend', 'Inter', system-ui", default: undefined }),
    letterSpacing: 6,
  },

  pager: {
    flex: 1,
  },

  slide: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
  },

  imageContainer: {
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.38,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },

  illustration: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  // ── Cards row ─────────────────────────────────────────────────────────────
  cardsRow: {
    height: 150,
    width: SCREEN_WIDTH,
    marginVertical: 10,
  },

  cardsScrollContent: {
    alignItems: "center",
    paddingHorizontal: (SCREEN_WIDTH - 180) / 2,
  },

  card: {
    borderRadius: 24,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },

  activeCard: {
    width: 180,
    height: 130,
    backgroundColor: colors.surface,
    ...shadow,
    zIndex: 2,
    opacity: 1,
  },

  inactiveCard: {
    width: 180,
    height: 110,
    backgroundColor: colors.glassBg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    zIndex: 1,
    opacity: 0.55,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  activeIconBg: {
    backgroundColor: colors.primaryBg,
  },

  inactiveIconBg: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 18,
    fontFamily: Platform.select({ web: "'Inter', system-ui", default: undefined }),
  },

  activeCardTitle: {
    color: colors.textPrimary,
  },

  inactiveCardTitle: {
    color: colors.textMuted,
    fontSize: 12,
  },

  // ── Page Indicators ───────────────────────────────────────────────────────
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },

  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },

  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },

  inactiveDot: {
    width: 6,
    backgroundColor: colors.border,
  },

  // ── Swipe to Start Slider ─────────────────────────────────────────────────
  sliderTrack: {
    width: SCREEN_WIDTH * 0.85,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryBg,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    alignSelf: "center",
    marginBottom: 35,
    position: "relative",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.borderPrimary,
  },

  sliderText: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    zIndex: 1,
    fontFamily: Platform.select({ web: "'Inter', system-ui", default: undefined }),
  },

  sliderHandle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});
