import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "@/constants/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const webFont = Platform.select({ web: "'Inter', system-ui, sans-serif", default: undefined });
const displayFont = Platform.select({ web: "'Lexend', 'Inter', system-ui", default: undefined });

export const authStyles = StyleSheet.create({
  // ── Container ─────────────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── Back Button ───────────────────────────────────────────────────────────
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    zIndex: 10,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 3 },
      web: { boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
      default: { elevation: 3 },
    }),
  },

  // ── Header (forgot/verify screens) ────────────────────────────────────────
  headerTitleContainer: {
    paddingTop: 58,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    fontFamily: displayFont,
    letterSpacing: 0.5,
  },

  // ── Illustration ──────────────────────────────────────────────────────────
  illustrationContainer: {
    height: SCREEN_HEIGHT * 0.28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg,
    paddingTop: 30,
  },

  illustration: {
    width: "100%",
    height: "90%",
    resizeMode: "contain",
  },

  // ── Form Card ─────────────────────────────────────────────────────────────
  formCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 24,
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.1, shadowRadius: 20, shadowOffset: { width: 0, height: -4 } },
      android: { elevation: 10 },
      web: { boxShadow: "0 -8px 32px rgba(124, 58, 237, 0.08)" },
      default: { elevation: 10 },
    }),
  },

  // ── Form Title ────────────────────────────────────────────────────────────
  formTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 24,
    fontFamily: displayFont,
    letterSpacing: 0.3,
  },

  // ── Input Group ───────────────────────────────────────────────────────────
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 18,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  inputGroupFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryBg,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    height: "100%",
    fontFamily: webFont,
  },

  // ── Login Row (forgot + login btn) ────────────────────────────────────────
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 24,
  },

  forgotText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "600",
    fontFamily: webFont,
  },

  // ── Login Button (small, inline) ──────────────────────────────────────────
  loginBtnSmall: {
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 20,
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.35, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 5 },
      web: { boxShadow: "0 4px 16px rgba(124, 58, 237, 0.4)" },
      default: { elevation: 5 },
    }),
  },

  loginBtnSmallText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
    fontFamily: webFont,
  },

  // ── Large Button (Create account / Send / Verify) ─────────────────────────
  buttonLarge: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 24,
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.4, shadowRadius: 16, shadowOffset: { width: 0, height: 6 } },
      android: { elevation: 6 },
      web: { boxShadow: "0 6px 24px rgba(124, 58, 237, 0.45)" },
      default: { elevation: 6 },
    }),
  },

  buttonLargeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: webFont,
    letterSpacing: 0.4,
  },

  // ── Divider ───────────────────────────────────────────────────────────────
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },

  dividerText: {
    marginHorizontal: 12,
    color: colors.textMuted,
    fontSize: 13,
    fontFamily: webFont,
  },

  // ── Social Buttons ────────────────────────────────────────────────────────
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginTop: 10,
  },

  socialButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 3 },
      web: { boxShadow: "0 2px 12px rgba(0,0,0,0.08)" },
      default: { elevation: 3 },
    }),
  },

  // ── Sub-screens (forgot / verify) ─────────────────────────────────────────
  subText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 10,
    fontFamily: webFont,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
    marginTop: 10,
    fontFamily: webFont,
  },

  linkText: {
    color: colors.primary,
    fontWeight: "700",
  },

  centerLinkContainer: {
    alignItems: "center",
    marginTop: 15,
  },

  // ── Error States ──────────────────────────────────────────────────────────
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: -10,
    marginBottom: 8,
    marginLeft: 6,
    fontWeight: "500",
    fontFamily: webFont,
  },

  serverErrorBox: {
    backgroundColor: colors.errorBg,
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  serverErrorText: {
    color: "#DC2626",
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
    fontFamily: webFont,
  },

  // ── OTP Input ─────────────────────────────────────────────────────────────
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 30,
  },

  otpInput: {
    width: 60,
    height: 64,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 2 },
      web: { boxShadow: "0 2px 8px rgba(124, 58, 237, 0.08)" },
      default: { elevation: 2 },
    }),
  },

  // ── Congrats Screen ───────────────────────────────────────────────────────
  congratsContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  congratsCard: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 32,
    padding: 32,
    alignItems: "center",
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.12, shadowRadius: 28, shadowOffset: { width: 0, height: 10 } },
      android: { elevation: 10 },
      web: { boxShadow: "0 16px 48px rgba(124, 58, 237, 0.15)" },
      default: { elevation: 10 },
    }),
    borderWidth: 1,
    borderColor: colors.borderPrimary,
  },

  congratsIllustration: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 30,
  },

  congratsTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 12,
    fontFamily: displayFont,
    textAlign: "center",
  },

  congratsSubText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
    fontFamily: webFont,
  },

  // ── Custom Alert Modal ────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 28,
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.2, shadowRadius: 28, shadowOffset: { width: 0, height: 10 } },
      android: { elevation: 12 },
      web: { boxShadow: "0 20px 60px rgba(124, 58, 237, 0.2)" },
      default: { elevation: 12 },
    }),
    borderWidth: 1,
    borderColor: colors.borderPrimary,
  },

  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitleText: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: displayFont,
  },

  modalDescText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 24,
    fontFamily: webFont,
  },

  modalConfirmButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.35, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 5 },
      web: { boxShadow: "0 4px 16px rgba(124, 58, 237, 0.4)" },
      default: { elevation: 5 },
    }),
  },

  modalConfirmButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    fontFamily: webFont,
  },
});
