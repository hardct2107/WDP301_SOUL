import { useEffect, useRef } from "react";
import { View, Text, ActivityIndicator, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { onboardingStyles as styles } from "@/styles/onboarding.styles";

export default function SplashScreen() {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulse animation for the logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <LinearGradient
      colors={["#7C3AED", "#6366F1", "#14B8A6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.splashContainer]}
    >
      <Animated.Image
        source={require("../../assets/images/logo.png")}
        style={[styles.splashLogo, { transform: [{ scale: pulseAnim }] }]}
      />
      <Text style={[styles.logoText, { color: "#FFFFFF" }]}>SOUL</Text>

      {/* Loading spinner */}
      <ActivityIndicator size="large" color="rgba(255,255,255,0.85)" style={styles.spinner} />
    </LinearGradient>
  );
}
