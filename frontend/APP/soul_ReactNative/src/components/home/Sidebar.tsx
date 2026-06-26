import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";
import { colors } from "@/constants/colors";

const menuItems = [
  { icon: "home", label: "Home", route: "/" },
  { icon: "brain", label: "AI Companion" },
  { icon: "book-outline", label: "Diary", route: "/diary" },
  { icon: "heart-pulse", label: "Emotional Test", route: "/emotional-test" },
  { icon: "calendar-month-outline", label: "Events", route: "/user-events" },
  { icon: "chart-line", label: "Insights" },
  { icon: "emoticon-happy-outline", label: "Mood Tracker" },
  { icon: "account-group-outline", label: "Community", route: "/forum" },
  { icon: "cog-outline", label: "Settings" },
  { icon: "help-circle-outline", label: "Help & Support" },
];

export function Sidebar() {
  return (
    <View style={styles.sidebar}>
      {/* Logo with gradient */}
      <View style={styles.logoBox}>
        <LinearGradient
          colors={["#7C3AED", "#6366F1", "#14B8A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 64,
            height: 64,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons name="leaf" size={36} color="#FFFFFF" />
        </LinearGradient>
        <Text style={styles.logoText}>SOUL</Text>
      </View>

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={item.label}
          style={[styles.sideItem, index === 0 && styles.sideItemActive]}
          onPress={() => item.route && router.push(item.route as any)}
          activeOpacity={0.78}
        >
          <MaterialCommunityIcons
            name={item.icon as any}
            size={22}
            color={index === 0 ? colors.primary : colors.textSecondary}
          />

          <Text style={[styles.sideText, index === 0 && styles.sideTextActive]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Reminder Card with gradient accent */}
      <LinearGradient
        colors={["#EDE9FE", "#CCFBF1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.reminderCard, { borderColor: colors.borderPrimary }]}
      >
        <LinearGradient
          colors={["#7C3AED", "#14B8A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 48, height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center" }}
        >
          <MaterialCommunityIcons name="sprout" size={28} color="#FFFFFF" />
        </LinearGradient>

        <Text style={styles.reminderTitle}>Daily reminder</Text>

        <Text style={styles.reminderText}>
          Take a deep breath. You are doing great.
        </Text>
      </LinearGradient>
    </View>
  );
}
