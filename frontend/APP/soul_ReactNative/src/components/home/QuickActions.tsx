import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";

// Feature cards with violet-teal gradient palette
const features = [
  {
    icon: "brain",
    title: "AI Companion",
    sub: "Emotion-aware chat",
    gradientColors: ["#7C3AED", "#6366F1"] as const,
    route: "/ai-chat",
  },
  {
    icon: "book-outline",
    title: "Diary",
    sub: "Private reflection",
    gradientColors: ["#14B8A6", "#0F766E"] as const,
    route: "/diary",
  },
  {
    icon: "head-heart-outline",
    title: "Emotional Test",
    sub: "Check your state",
    gradientColors: ["#6366F1", "#7C3AED"] as const,
    route: "/emotional-test",
  },
  {
    icon: "calendar-month-outline",
    title: "Events",
    sub: "Healing workshop",
    gradientColors: ["#F59E0B", "#D97706"] as const,
    route: "/user-events",
  },
];

export function QuickActions() {
  return (
    <View style={styles.featureGrid}>
      {features.map((feature) => (
        <TouchableOpacity
          key={feature.title}
          style={[styles.featureCard, { backgroundColor: "transparent", borderWidth: 0, overflow: "hidden" as const, padding: 0 }]}
          onPress={() => feature.route && router.push(feature.route as any)}
          activeOpacity={0.78}
        >
          <LinearGradient
            colors={feature.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, borderRadius: 24, padding: 18, minHeight: 170 }}
          >
            {/* Icon in glass circle */}
            <View style={[styles.featureIcon, { backgroundColor: "rgba(255,255,255,0.22)" }]}>
              <MaterialCommunityIcons
                name={feature.icon as any}
                size={32}
                color="#FFFFFF"
              />
            </View>

            <Text style={[styles.featureTitle, { color: "#FFFFFF" }]}>{feature.title}</Text>
            <Text style={[styles.featureSub, { color: "rgba(255,255,255,0.8)" }]}>{feature.sub}</Text>

            <View style={[styles.arrowCircle, { backgroundColor: "rgba(255,255,255,0.22)" }]}>
              <MaterialCommunityIcons
                name="arrow-right"
                size={22}
                color="#FFFFFF"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
}
