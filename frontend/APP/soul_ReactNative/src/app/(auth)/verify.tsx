import { useState, useRef } from "react";
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
import { colors } from "@/constants/colors";

export default function VerificationScreen() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const email = useAuthStore((state) => state.forgotEmail);
  const verifyOtpAction = useAuthStore((state) => state.verifyOtp);
  const requestOtpAction = useAuthStore((state) => state.requestOtp);

  // Tạo các Ref cho các ô nhập để tự động dịch chuyển con trỏ chuột (focus)
  const inputRef1 = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);
  const inputRef4 = useRef<TextInput>(null);

  const refs = [inputRef1, inputRef2, inputRef3, inputRef4];

  // Xử lý thay đổi ký tự trong từng ô nhập
  const handleChangeText = (text: string, index: number) => {
    const cleanText = text.replace(/[^0-9]/g, "");
    const newCode = [...code];
    newCode[index] = cleanText;
    setCode(newCode);

    if (cleanText && index < 3) {
      refs[index + 1].current?.focus();
    }
  };

  // Xử lý khi nhấn nút xóa (BackSpace) trên bàn phím
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  // Xác thực mã OTP khi nhấn nút "Verify"
  const handleVerify = async () => {
    const fullCode = code.join("");
    if (fullCode.length < 4) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ mã xác thực 4 chữ số.");
      return;
    }

    setLoading(true);
    const result = await verifyOtpAction(fullCode);
    setLoading(false);

    if (result.success) {
      router.push("/(auth)/recovery");
    } else {
      Alert.alert("Lỗi xác minh", result.message);
    }
  };

  // Gửi lại mã OTP
  const handleResend = async () => {
    if (!email) return;
    setLoading(true);
    const result = await requestOtpAction(email);
    setLoading(false);
    if (result.success) {
      Alert.alert("Gửi lại mã", `Mã xác thực mới (MOCK): ${result.code}`);
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
          colors={["#7C3AED", "#6366F1", "#14B8A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.illustrationContainer}
        >
          {/* Decorative blobs */}
          <View style={{ position: "absolute", top: -30, left: -30, width: 150, height: 150, borderRadius: 75, backgroundColor: "rgba(255,255,255,0.07)" }} />
          <View style={{ position: "absolute", bottom: -20, right: -20, width: 120, height: 120, borderRadius: 60, backgroundColor: "rgba(255,255,255,0.06)" }} />
          <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <View style={{ width: 78, height: 78, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: 12, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.3)" }}>
              <MaterialCommunityIcons name="shield-check-outline" size={40} color="#FFFFFF" />
            </View>
            <Text style={{ fontSize: 26, fontWeight: "800", color: "#FFFFFF", letterSpacing: 1, fontFamily: Platform.select({ web: "'Lexend','Inter',system-ui", default: undefined }) }}>
              Verification
            </Text>
            <Text style={{ marginTop: 6, fontSize: 13, color: "rgba(255,255,255,0.8)", fontFamily: Platform.select({ web: "'Inter',system-ui", default: undefined }) }}>
              Check your email for the code
            </Text>
          </View>
        </LinearGradient>

        {/* Card chứa form xác nhận OTP */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Verify your email</Text>
          <Text style={styles.subText}>
            Please enter 4 verification codes that we have sent to your email:{"\n"}
            <Text style={{ fontWeight: "bold", color: colors.dark }}>{email || "email của bạn"}</Text>
          </Text>

          {/* Hàng chứa 4 ô nhập OTP */}
          <View style={styles.otpRow}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={refs[index]}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                style={[styles.otpInput, digit ? { borderColor: colors.primary, borderWidth: 2 } : {}]}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Gửi lại mã */}
          <View style={styles.centerLinkContainer}>
            <Text style={styles.forgotText}>{"Don't receive code?"}</Text>
            <TouchableOpacity onPress={handleResend} style={{ marginTop: 6 }}>
              <Text style={[styles.forgotText, styles.linkText]}>Resend code</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }} />

          {/* Gradient Verify button */}
          <TouchableOpacity
            onPress={handleVerify}
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
                <Text style={styles.buttonLargeText}>Verify →</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
