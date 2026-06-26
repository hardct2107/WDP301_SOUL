import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuthStore } from "@/store";
import { authStyles as styles } from "@/styles/auth.styles";
import { WebView } from "react-native-webview";
import { API_BASE_URL } from "@/api/config";
import { colors } from "@/constants/colors";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  // States inline validation
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // States phục vụ WebView đăng nhập/đăng ký Google
  const [showGoogleAuth, setShowGoogleAuth] = useState(false);
  const [googleAuthUrl, setGoogleAuthUrl] = useState("");

  const registerAction = useAuthStore((state) => state.register);
  const setSession = useAuthStore((state) => state.setSession);

  // ── Validate helpers ──────────────────────────────────────────
  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError("Vui lòng nhập họ tên");
    } else {
      setNameError("");
    }
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      setEmailError("Vui lòng nhập email");
    } else if (!emailRegex.test(value)) {
      setEmailError("Email không hợp lệ (vd: example@gmail.com)");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("Vui lòng nhập mật khẩu");
    } else if (value.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
    } else {
      setPasswordError("");
    }
  };

  // ── onChangeText handlers ─────────────────────────────────────
  const handleNameChange = (value: string) => {
    setFullName(value);
    setServerError("");
    validateName(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setServerError("");
    validateEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setServerError("");
    validatePassword(value);
  };

  // ── Google Auth ───────────────────────────────────────────────
  const handleGoogleSignUp = () => {
    const authUrl = `${API_BASE_URL}/auth/google`;
    console.log("[Google SignUp WebView] Khởi động, load URL:", authUrl);
    setGoogleAuthUrl(authUrl);
    setShowGoogleAuth(true);
  };

  const handleGoogleNavigation = async (navState: any) => {
    const urlStr = navState.url;
    console.log("[Google SignUp WebView] Lắng nghe chuyển hướng URL:", urlStr);

    const hasToken = urlStr.includes("token=");

    if (hasToken) {
      setShowGoogleAuth(false);

      try {
        const tokenMatch = urlStr.match(/token=([^&]+)/);
        const userMatch = urlStr.match(/user=([^&]+)/);

        if (tokenMatch && tokenMatch[1]) {
          const token = tokenMatch[1];
          const userJsonEncoded = userMatch ? userMatch[1] : "";

          if (userJsonEncoded) {
            const userDecoded = decodeURIComponent(userJsonEncoded);
            const userObj = JSON.parse(userDecoded);
            setSession(token, userObj);
            router.replace("/(tabs)");
          } else {
            Alert.alert("Lỗi đăng ký", "Không trích xuất được thông tin người dùng Google.");
          }
        } else {
          Alert.alert("Lỗi đăng ký", "Không trích xuất được Token xác thực từ Google.");
        }
      } catch (error: any) {
        console.error("[Google SignUp WebView Error]:", error);
        Alert.alert("Lỗi đăng ký", "Lỗi xử lý xác thực: " + error.message);
      }
    } else if (urlStr.includes("error=")) {
      setShowGoogleAuth(false);
      Alert.alert("Đăng nhập thất bại", "Quyền truy cập tài khoản Google bị từ chối hoặc lỗi.");
    }
  };

  // ── Submit ────────────────────────────────────────────────────
  const handleRegister = async () => {
    // Validate tất cả fields trước khi gọi API
    validateName(fullName);
    validateEmail(email);
    validatePassword(password);

    if (!fullName.trim() || !emailRegex.test(email) || password.length < 6) {
      return;
    }

    setServerError("");
    setLoading(true);
    const result = await registerAction({ fullName, email, password });
    setLoading(false);

    if (result.success) {
      setShowSuccessModal(true);
    } else {
      setServerError(result.message || "Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.primary} />
      </TouchableOpacity>

        {/* ── Gradient Top Section ── */}
        <LinearGradient
          colors={["#14B8A6", "#6366F1", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.illustrationContainer}
        >
          <View style={{ position: "absolute", top: -30, left: -30, width: 150, height: 150, borderRadius: 75, backgroundColor: "rgba(255,255,255,0.07)" }} />
          <View style={{ position: "absolute", bottom: -20, right: -20, width: 120, height: 120, borderRadius: 60, backgroundColor: "rgba(255,255,255,0.06)" }} />
          <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <View style={{ width: 78, height: 78, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: 12, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.3)" }}>
              <MaterialCommunityIcons name="account-plus-outline" size={40} color="#FFFFFF" />
            </View>
            <Text style={{ fontSize: 28, fontWeight: "800", color: "#FFFFFF", letterSpacing: 2, fontFamily: Platform.select({ web: "'Lexend','Inter',system-ui", default: undefined }) }}>Join SOUL</Text>
            <Text style={{ marginTop: 6, fontSize: 13, color: "rgba(255,255,255,0.8)", fontFamily: Platform.select({ web: "'Inter',system-ui", default: undefined }) }}>Start your wellness journey today</Text>
          </View>
        </LinearGradient>

        {/* Thẻ chứa form đăng ký */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Sign Up</Text>

          {/* Server error box */}
          {serverError ? (
            <View style={styles.serverErrorBox}>
              <Text style={styles.serverErrorText}>{serverError}</Text>
            </View>
          ) : null}

          {/* Fullname input */}
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons
              name="account-outline"
              size={22}
              color={colors.primary}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="yourusername"
              placeholderTextColor="#A0AEC0"
              style={styles.input}
              value={fullName}
              onChangeText={handleNameChange}
              autoCapitalize="words"
            />
          </View>
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          {/* Email input */}
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color={colors.primary}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="emailaddress@gmail.com"
              placeholderTextColor="#A0AEC0"
              style={styles.input}
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          {/* Password input */}
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={22}
              color={colors.primary}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#A0AEC0"
              secureTextEntry={secureText}
              style={styles.input}
              value={password}
              onChangeText={handlePasswordChange}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <MaterialCommunityIcons
                name={secureText ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#8193A5"
              />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          {/* Gradient Create account button */}
          <TouchableOpacity onPress={handleRegister} disabled={loading} style={{ borderRadius: 18, overflow: "hidden", marginTop: 10, marginBottom: 24 }}>
            <LinearGradient
              colors={["#7C3AED", "#14B8A6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.buttonLarge, { marginTop: 0, marginBottom: 0 }]}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.buttonLargeText}>Create account ✨</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Đường ngăn cách */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or sign up with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Nút Đăng nhập Google */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignUp}>
              <MaterialCommunityIcons name="google" size={24} color="#EA4335" />
            </TouchableOpacity>
          </View>

          {/* Chuyển về màn Đăng nhập */}
          <View style={styles.centerLinkContainer}>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.forgotText}>
                Already have an account? <Text style={styles.linkText}>Log In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal chứa WebView hiển thị Google Login thật */}
      {Platform.OS !== "web" && (
        <Modal
          visible={showGoogleAuth}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowGoogleAuth(false)}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#E2E8F0"
            }}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#1E293B" }}>Đăng nhập bằng Google</Text>
              <TouchableOpacity onPress={() => setShowGoogleAuth(false)}>
                <Text style={{ fontSize: 16, color: "#EF4444", fontWeight: "700" }}>HỦY</Text>
              </TouchableOpacity>
            </View>
            {googleAuthUrl ? (
              <WebView
                source={{ uri: googleAuthUrl }}
                userAgent="Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
                onNavigationStateChange={handleGoogleNavigation}
                startInLoadingState={true}
                domStorageEnabled={true}
                javaScriptEnabled={true}
              />
            ) : null}
          </SafeAreaView>
        </Modal>
      )}

      {/* Custom Success Popup Modal */}
      <Modal
        transparent={true}
        visible={showSuccessModal}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header Icon */}
            <View style={styles.successIconCircle}>
              <MaterialCommunityIcons name="party-popper" size={44} color={colors.primary} />
            </View>
            
            {/* Title */}
            <Text style={styles.modalTitleText}>Đăng ký thành công!</Text>
            
            {/* Description */}
            <Text style={styles.modalDescText}>
              Chào mừng bạn đến với SOUL. Hãy đăng nhập để bắt đầu.
            </Text>
            
            {/* Gradient Confirm Button */}
            <TouchableOpacity
              style={{ borderRadius: 18, overflow: "hidden", width: "100%" }}
              onPress={() => {
                setShowSuccessModal(false);
                router.push("/(auth)/login");
              }}
            >
              <LinearGradient
                colors={["#7C3AED", "#14B8A6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.modalConfirmButton, { width: "100%" }]}
              >
                <Text style={styles.modalConfirmButtonText}>ĐĂNG NHẬP NGAY →</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
