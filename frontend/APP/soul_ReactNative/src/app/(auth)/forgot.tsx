import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuthStore } from "@/store";
import { authStyles as styles } from "@/styles/auth.styles";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const requestOtpAction = useAuthStore((state) => state.requestOtp);

  // Xử lý gửi yêu cầu quên mật khẩu lên backend
  const handleSend = async () => {
    if (!email) {
      Alert.alert("Thông báo", "Vui lòng nhập địa chỉ email của bạn.");
      return;
    }

    setLoading(true);
    const result = await requestOtpAction(email);
    setLoading(false);

    if (result.success) {
      Alert.alert(
        "Mã xác thực",
        `Mã khôi phục đã được tạo (MOCK): ${result.code}\nVui lòng nhập mã này ở bước tiếp theo.`,
        [{ text: "Tiếp tục", onPress: () => router.push("/(auth)/verify") }]
      );
    } else {
      Alert.alert("Lỗi", result.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Nút quay lại */}
      <TouchableOpacity style={[styles.backButton, { zIndex: 10 }]} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        {/* ── Gradient Top Section ── */}
        <LinearGradient
          colors={["#14B8A6", "#6366F1", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.illustrationContainer}
        >
          {/* Decorative blobs */}
          <View style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: 75, backgroundColor: "rgba(255,255,255,0.07)" }} />
          <View style={{ position: "absolute", bottom: -20, left: -20, width: 120, height: 120, borderRadius: 60, backgroundColor: "rgba(255,255,255,0.06)" }} />
          <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <View style={{ width: 78, height: 78, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: 12, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.3)" }}>
              <MaterialCommunityIcons name="lock-reset" size={40} color="#FFFFFF" />
            </View>
            <Text style={{ fontSize: 26, fontWeight: "800", color: "#FFFFFF", letterSpacing: 1, fontFamily: Platform.select({ web: "'Lexend','Inter',system-ui", default: undefined }) }}>
              Forgot Password?
            </Text>
            <Text style={{ marginTop: 6, fontSize: 13, color: "rgba(255,255,255,0.8)", fontFamily: Platform.select({ web: "'Inter',system-ui", default: undefined }) }}>
              We'll help you reset it
            </Text>
          </View>
        </LinearGradient>

        {/* Card nhập Email */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Find your account</Text>
          <Text style={styles.subText}>
            Please enter your email address to recover your forgotten password
          </Text>

          {/* Ô nhập Email */}
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color="#8193A5"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="soul.user@gmail.com"
              placeholderTextColor="#A0AEC0"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Thử cách khác */}
          <TouchableOpacity style={styles.centerLinkContainer}>
            <Text style={[styles.forgotText, styles.linkText]}>Try another way</Text>
          </TouchableOpacity>

          <View style={{ flex: 1 }} />

          {/* Gradient Send button */}
          <TouchableOpacity
            onPress={handleSend}
            disabled={loading}
            style={{ borderRadius: 18, overflow: "hidden", marginTop: 10, marginBottom: 24 }}
          >
            <LinearGradient
              colors={["#7C3AED", "#14B8A6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.buttonLarge, { marginTop: 0, marginBottom: 0 }]}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.buttonLargeText}>Send →</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
