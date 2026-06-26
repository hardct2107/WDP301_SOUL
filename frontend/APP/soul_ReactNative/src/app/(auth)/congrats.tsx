import { View, Text, TouchableOpacity, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { authStyles as styles } from "@/styles/auth.styles";

export default function CongratulationsScreen() {

  // Điều hướng quay lại màn hình Login khi nhấn "Start now"
  const handleStartNow = () => {
    router.replace("/(auth)/login");
  };

  return (
    <LinearGradient
      colors={["#7C3AED", "#6366F1", "#14B8A6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.congratsContainer, { padding: 0 }]}
    >
      {/* Decorative blobs */}
      <View style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: 110, backgroundColor: "rgba(255,255,255,0.08)" }} />
      <View style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: 90, backgroundColor: "rgba(255,255,255,0.07)" }} />

      <View style={[styles.congratsCard, { marginHorizontal: 24 }]}>
        {/* Gradient circle icon */}
        <LinearGradient
          colors={["#EDE9FE", "#CCFBF1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
            borderWidth: 2,
            borderColor: "#C4B5FD",
          }}
        >
          <MaterialCommunityIcons name="check-decagram" size={80} color="#7C3AED" />
        </LinearGradient>

        {/* Tiêu đề Chúc mừng */}
        <Text style={styles.congratsTitle}>Congratulations! 🎉</Text>

        {/* Chú thích hướng dẫn */}
        <Text style={styles.congratsSubText}>
          Your password has been changed successfully. Please log in again with your new password.
        </Text>

        {/* Gradient Button */}
        <TouchableOpacity
          style={{ borderRadius: 18, overflow: "hidden", width: "100%", marginTop: 0 }}
          onPress={handleStartNow}
        >
          <LinearGradient
            colors={["#7C3AED", "#14B8A6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.buttonLarge, { marginTop: 0, marginBottom: 0 }]}
          >
            <Text style={styles.buttonLargeText}>Start now →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
