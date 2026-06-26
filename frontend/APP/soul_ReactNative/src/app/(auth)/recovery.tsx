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

export default function RecoveryPasswordScreen() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureNewText, setSecureNewText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);
  const [loading, setLoading] = useState(false);

  const resetPassAction = useAuthStore((state) => state.resetPass);

  // Xử lý lưu mật khẩu mới khi nhấn nút "Save"
  const handleSave = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Thông báo", "Vui lòng nhập mật khẩu mới và xác nhận mật khẩu.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Xác nhận mật khẩu không khớp. Vui lòng nhập lại.");
      return;
    }

    setLoading(true);
    const result = await resetPassAction(newPassword);
    setLoading(false);

    if (result.success) {
      router.push("/(auth)/congrats");
    } else {
      Alert.alert("Lỗi đặt lại mật khẩu", result.message);
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
          <View style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: 75, backgroundColor: "rgba(255,255,255,0.07)" }} />
          <View style={{ position: "absolute", bottom: -20, left: -20, width: 120, height: 120, borderRadius: 60, backgroundColor: "rgba(255,255,255,0.06)" }} />
          <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <View style={{ width: 78, height: 78, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: 12, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.3)" }}>
              <MaterialCommunityIcons name="shield-lock-outline" size={40} color="#FFFFFF" />
            </View>
            <Text style={{ fontSize: 26, fontWeight: "800", color: "#FFFFFF", letterSpacing: 1, fontFamily: Platform.select({ web: "'Lexend','Inter',system-ui", default: undefined }) }}>
              New Password
            </Text>
            <Text style={{ marginTop: 6, fontSize: 13, color: "rgba(255,255,255,0.8)", fontFamily: Platform.select({ web: "'Inter',system-ui", default: undefined }) }}>
              Create a strong password for your account
            </Text>
          </View>
        </LinearGradient>

        {/* Card chứa form điền mật khẩu mới */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Create new password</Text>
          <Text style={styles.subText}>
            Please enter your new strong password below to recover your forgotten account
          </Text>

          {/* Ô nhập mật khẩu mới */}
          <Text style={styles.forgotText}>New password</Text>
          <View style={[styles.inputGroup, { marginTop: 8 }]}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={22}
              color="#8193A5"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#A0AEC0"
              secureTextEntry={secureNewText}
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setSecureNewText(!secureNewText)}>
              <MaterialCommunityIcons
                name={secureNewText ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#8193A5"
              />
            </TouchableOpacity>
          </View>

          {/* Ô xác nhận mật khẩu mới */}
          <Text style={styles.forgotText}>Confirm password</Text>
          <View style={[styles.inputGroup, { marginTop: 8 }]}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={22}
              color="#8193A5"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#A0AEC0"
              secureTextEntry={secureConfirmText}
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setSecureConfirmText(!secureConfirmText)}>
              <MaterialCommunityIcons
                name={secureConfirmText ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#8193A5"
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }} />

          {/* Gradient Save button */}
          <TouchableOpacity
            onPress={handleSave}
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
                <Text style={styles.buttonLargeText}>Save Password →</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
