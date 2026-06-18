import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/constants/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const authStyles = StyleSheet.create({
  // Vùng chứa chính của màn hình
  container: {
    flex: 1,
    backgroundColor: colors.bg,        // #F5F3FF — very light purple tint
  },
  // Nút quay lại ở góc trên bên trái
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 10,
  },
  // Tiêu đề của thanh header (ở màn hình quên mật khẩu/xác minh)
  headerTitleContainer: {
    paddingTop: 58,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textStrong,           // #1D233B
    fontFamily: "Georgia",
  },

  // Khu vực hiển thị ảnh minh họa phía trên
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

  // Form chứa nội dung chính (Màu trắng, bo góc tròn phía trên)
  formCard: {
    flex: 1,
    backgroundColor: colors.surface,   // #FFFFFF
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 20,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  // Tiêu đề lớn (Login / Sign Up)
  formTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.textStrong,           // #1D233B
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "Georgia",
  },

  // Khung nhập liệu (Input field wrapper)
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0EEFF",         // very light purple tint
    borderWidth: 1,
    borderColor: colors.border,         // #C8CDEB
    borderRadius: 18,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: colors.textMain,             // #0B0F1A
    fontSize: 16,
    height: "100%",
  },

  // Liên kết "Quên mật khẩu?" và nút Login bên cạnh
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
    color: colors.textMuted,            // #475079
    fontWeight: "600",
  },
  loginBtnSmall: {
    backgroundColor: colors.primary,    // #9B67CC
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 20,
    elevation: 3,
  },
  loginBtnSmallText: {
    color: colors.surface,              // #FFFFFF
    fontWeight: "bold",
    fontSize: 15,
  },

  // Nút bấm lớn (Create account, Send, Verify, Save)
  buttonLarge: {
    backgroundColor: colors.primary,    // #9B67CC — main CTA
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonLargeText: {
    color: colors.surface,              // #FFFFFF
    fontSize: 16,
    fontWeight: "bold",
  },

  // Đường gạch ngang "Or sign up with"
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,    // #C8CDEB
  },
  dividerText: {
    marginHorizontal: 12,
    color: colors.textLight,            // #878CB4
    fontSize: 13,
  },

  // Khu vực các nút đăng nhập MXH
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 10,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,         // #C8CDEB
    alignItems: "center",
    justifyContent: "center",
  },

  // Màn hình quên mật khẩu & xác minh
  subText: {
    fontSize: 15,
    color: colors.textMuted,            // #475079
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textStrong,           // #1D233B
    marginBottom: 8,
    marginTop: 10,
  },
  linkText: {
    color: colors.primary,              // #9B67CC
    fontWeight: "bold",
  },
  centerLinkContainer: {
    alignItems: "center",
    marginTop: 15,
  },

  // Inline error text dưới ô nhập liệu
  errorText: {
    color: colors.error,                // #EF4444
    fontSize: 12,
    marginTop: -10,
    marginBottom: 8,
    marginLeft: 6,
    fontWeight: "500",
  },

  // Server error text hiển thị dưới form
  serverErrorBox: {
    backgroundColor: colors.errorLight, // #FEF2F2
    borderWidth: 1,
    borderColor: colors.errorBorder,    // #FCA5A5
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  serverErrorText: {
    color: "#DC2626",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },

  // Nhập mã OTP 4 số
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 30,
  },
  otpInput: {
    width: 60,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.surface,   // #FFFFFF
    borderWidth: 1,
    borderColor: colors.border,         // #C8CDEB
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textStrong,           // #1D233B
    textAlign: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  // Màn hình Chúc mừng (Congratulations)
  congratsContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  congratsCard: {
    width: "100%",
    backgroundColor: colors.surface,   // #FFFFFF
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  congratsIllustration: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 30,
  },
  congratsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textStrong,           // #1D233B
    marginBottom: 12,
    fontFamily: "Georgia",
  },
  congratsSubText: {
    fontSize: 14,
    color: colors.textMuted,            // #475079
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 30,
  },
  // Custom Alert Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(11, 15, 26, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: colors.surface,   // #FFFFFF
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.primaryPale,   // #CDB6FE
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceAlt, // #EEE8FF
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitleText: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textStrong,           // #1D233B
    textAlign: "center",
    marginBottom: 10,
  },
  modalDescText: {
    fontSize: 14,
    color: colors.textMuted,            // #475079
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  modalConfirmButton: {
    backgroundColor: colors.primary,   // #9B67CC
    borderRadius: 16,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  modalConfirmButtonText: {
    color: colors.surface,              // #FFFFFF
    fontSize: 15,
    fontWeight: "700",
  },
});
