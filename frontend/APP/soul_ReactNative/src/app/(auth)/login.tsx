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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  // States inline validation
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  // States phục vụ WebView đăng nhập Google
  const [showGoogleAuth, setShowGoogleAuth] = useState(false);
  const [googleAuthUrl, setGoogleAuthUrl] = useState("");

  const loginAction = useAuthStore((state) => state.login);
  const setSession = useAuthStore((state) => state.setSession);

  // ── Validate helpers ──────────────────────────────────────────
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
    } else {
      setPasswordError("");
    }
  };

  // ── onChangeText handlers ─────────────────────────────────────
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

  // ── Submit ────────────────────────────────────────────────────
  const handleLogin = async () => {
    validateEmail(email);
    validatePassword(password);

    if (!email.trim() || !emailRegex.test(email) || !password) {
      return;
    }

    setServerError("");
    setLoading(true);
    const result = await loginAction(email, password);
    setLoading(false);

    if (result.success) {
      // Kiểm tra vai trò của người dùng để điều hướng tương ứng
      const currentUser = useAuthStore.getState().user;
      if (currentUser && currentUser.role === "admin") {
        router.replace("/(admin)");
      } else {
        router.replace("/(tabs)");
      }
    } else {
      setServerError(result.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  // ── Google Auth ───────────────────────────────────────────────
  const handleGoogleLogin = () => {
    const authUrl = `${API_BASE_URL}/auth/google`;
    console.log("[Google Auth WebView] Khởi động, load URL:", authUrl);
    setGoogleAuthUrl(authUrl);
    setShowGoogleAuth(true);
  };

  const handleGoogleNavigation = async (navState: any) => {
    const urlStr = navState.url;
    console.log("[Google Auth WebView] Lắng nghe chuyển hướng URL:", urlStr);

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

            // Điều hướng dựa trên vai trò (role) của người dùng
            if (userObj && userObj.role === "admin") {
              router.replace("/(admin)");
            } else {
              router.replace("/(tabs)");
            }
          } else {
            Alert.alert("Lỗi đăng nhập", "Không trích xuất được thông tin người dùng Google.");
          }
        } else {
          Alert.alert("Lỗi đăng nhập", "Không trích xuất được Token xác thực từ Google.");
        }
      } catch (error: any) {
        console.error("[Google Auth WebView Error]:", error);
        Alert.alert("Lỗi đăng nhập", "Lỗi xử lý xác thực: " + error.message);
      }
    } else if (urlStr.includes("error=")) {
      setShowGoogleAuth(false);
      Alert.alert("Đăng nhập thất bại", "Quyền truy cập tài khoản Google bị từ chối hoặc lỗi.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        {/* ── Gradient Top Section ── */}
        <LinearGradient
          colors={["#7C3AED", "#6366F1", "#14B8A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.illustrationContainer}
        >
          {/* Decorative blobs */}
          <View style={{
            position: "absolute", top: -40, right: -40,
            width: 180, height: 180, borderRadius: 90,
            backgroundColor: "rgba(255,255,255,0.08)"
          }} />
          <View style={{
            position: "absolute", bottom: -20, left: -30,
            width: 140, height: 140, borderRadius: 70,
            backgroundColor: "rgba(255,255,255,0.06)"
          }} />

          {/* Brand mark */}
          <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <View style={{
              width: 88, height: 88, borderRadius: 28,
              backgroundColor: "rgba(255,255,255,0.18)",
              alignItems: "center", justifyContent: "center",
              marginBottom: 14,
              borderWidth: 1.5,
              borderColor: "rgba(255,255,255,0.3)",
            }}>
              <MaterialCommunityIcons name="leaf" size={46} color="#FFFFFF" />
            </View>
            <Text style={{
              fontSize: 34, fontWeight: "800", color: "#FFFFFF",
              letterSpacing: 4,
              fontFamily: Platform.select({ web: "'Lexend','Inter',system-ui", default: undefined }),
            }}>SOUL</Text>
            <Text style={{
              marginTop: 6, fontSize: 14, color: "rgba(255,255,255,0.8)",
              fontFamily: Platform.select({ web: "'Inter',system-ui", default: undefined }),
            }}>Your mental wellness companion</Text>
          </View>
        </LinearGradient>

        {/* ── White Form Card ── */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Welcome Back 👋</Text>

          {/* Server error box */}
          {serverError ? (
            <View style={styles.serverErrorBox}>
              <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#DC2626" />
              <Text style={styles.serverErrorText}>{serverError}</Text>
            </View>
          ) : null}

          {/* Email input */}
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color={colors.primary}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="soul.user@gmail.com"
              placeholderTextColor="#A0AEC0"
              style={styles.input}
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {emailError ? <Text style={styles.errorText}>⚠ {emailError}</Text> : null}

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
                color="#94A3B8"
              />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorText}>⚠ {passwordError}</Text> : null}

          {/* Forgot + Login row */}
          <View style={styles.loginRow}>
            <TouchableOpacity onPress={() => router.push("/(auth)/forgot")}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Gradient Login button */}
            <TouchableOpacity onPress={handleLogin} disabled={loading} style={{ borderRadius: 20, overflow: "hidden" }}>
              <LinearGradient
                colors={["#7C3AED", "#14B8A6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginBtnSmall}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.loginBtnSmallText}>Login →</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or login with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
              <MaterialCommunityIcons name="google" size={24} color="#EA4335" />
            </TouchableOpacity>
          </View>

          {/* Sign up link */}
          <View style={styles.centerLinkContainer}>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text style={styles.forgotText}>
                {"Don't have an account? "}
                <Text style={styles.linkText}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Google WebView Modal */}
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
              borderBottomColor: colors.border,
            }}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: colors.textPrimary }}>Đăng nhập bằng Google</Text>
              <TouchableOpacity onPress={() => setShowGoogleAuth(false)}>
                <Text style={{ fontSize: 16, color: colors.error, fontWeight: "700" }}>HỦY</Text>
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
    </KeyboardAvoidingView>
  );
}
