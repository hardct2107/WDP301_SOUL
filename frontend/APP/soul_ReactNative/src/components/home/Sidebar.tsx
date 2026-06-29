import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";
import { colors } from "@/constants/colors";
import { RatingModal } from "@/components/home/RatingModal";

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

const isWeb = Platform.OS === "web";

export function Sidebar() {
  const [showRating, setShowRating] = useState(false);

  const content = (
    <>
      {/* Logo */}
      <View style={[styles.logoBox, { marginBottom: 20 }]}>
        <LinearGradient
          colors={["#7C3AED", "#6366F1", "#14B8A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 56, height: 56, borderRadius: 18, alignItems: "center", justifyContent: "center" }}
        >
          <MaterialCommunityIcons name="leaf" size={30} color="#FFFFFF" />
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
            size={20}
            color={index === 0 ? colors.primary : colors.textSecondary}
          />
          <Text style={[styles.sideText, index === 0 && styles.sideTextActive]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Nút Đánh giá */}
      <TouchableOpacity
        onPress={() => setShowRating(true)}
        activeOpacity={0.78}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 4,
          marginHorizontal: 4,
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 14,
          backgroundColor: "rgba(245, 158, 11, 0.10)",
          borderWidth: 1.5,
          borderColor: "rgba(245, 158, 11, 0.28)",
        }}
      >
        <MaterialCommunityIcons name="star-outline" size={20} color="#F59E0B" />
        <Text style={{ fontSize: 13, fontWeight: "600", color: "#F59E0B" }}>
          Đánh giá ứng dụng
        </Text>
      </TouchableOpacity>

      {/* Reminder Card */}
      <LinearGradient
        colors={["#EDE9FE", "#CCFBF1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.reminderCard, { borderColor: colors.borderPrimary, marginTop: 12 }]}
      >
        <LinearGradient
          colors={["#7C3AED", "#14B8A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" }}
        >
          <MaterialCommunityIcons name="sprout" size={24} color="#FFFFFF" />
        </LinearGradient>
        <Text style={styles.reminderTitle}>Daily reminder</Text>
        <Text style={styles.reminderText}>
          Take a deep breath. You are doing great.
        </Text>
      </LinearGradient>

      {/* Rating Modal */}
      <RatingModal
        forceVisible={showRating}
        onForceClose={() => setShowRating(false)}
      />
    </>
  );

  // Web: nằm trong cột flex, không cần position absolute
  if (isWeb) {
    return (
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16, paddingTop: 24 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32, flexGrow: 1 }}
      >
        {content}
      </ScrollView>
    );
  }

  // Mobile: position absolute overlay
  return (
    <View style={styles.sidebar}>
      {content}
    </View>
  );
}
