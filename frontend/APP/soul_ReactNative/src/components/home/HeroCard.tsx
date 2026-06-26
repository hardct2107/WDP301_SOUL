import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";
import { colors } from "@/constants/colors";

export function HeroCard() {
  return (
    <LinearGradient
      colors={["#7C3AED", "#6366F1", "#14B8A6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.heroCard}
    >
      <View style={styles.heroBadge}>
        <Text style={styles.heroBadgeText}>✨ Daily Insight</Text>
      </View>

      <Text style={styles.heroTitle}>
        You're stronger{"\n"}than you think 💜
      </Text>

      <Text style={styles.heroDescription}>
        Small steps today,{"\n"}big change tomorrow.
      </Text>

      <TouchableOpacity style={styles.heroButton}>
        <Text style={styles.heroButtonText}>Start your journey</Text>

        <MaterialCommunityIcons
          name="arrow-right"
          size={22}
          color={colors.primary}
        />
      </TouchableOpacity>

      {/* Decorative floating element */}
      <MaterialCommunityIcons
        name="flower-tulip-outline"
        size={230}
        color="rgba(255,255,255,0.18)"
        style={styles.heroDecor}
      />
    </LinearGradient>
  );
}