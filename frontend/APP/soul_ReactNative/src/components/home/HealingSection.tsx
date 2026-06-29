import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";
import { router } from "expo-router";

const healingFeatures = [
  {
    id: "ai",
    title: "AI Companion",
    sub: "Tâm sự 24/7",
    icon: "robot-outline",
    gradient: ["#E0E7FF", "#C7D2FE"],
    iconColor: "#4F46E5",
    route: "/ai-chat",
  },
  {
    id: "diary",
    title: "Nhật ký",
    sub: "Theo dõi cảm xúc",
    icon: "notebook-outline",
    gradient: ["#FCE7F3", "#FBCFE8"],
    iconColor: "#DB2777",
    route: "/diary",
  },
  {
    id: "test",
    title: "Bài test",
    sub: "Đánh giá tâm lý",
    icon: "clipboard-text-outline",
    gradient: ["#FEF3C7", "#FDE68A"],
    iconColor: "#D97706",
    route: "/emotional-test",
  },
  {
    id: "events",
    title: "Sự kiện",
    sub: "Kết nối cộng đồng",
    icon: "calendar-star",
    gradient: ["#CCFBF1", "#99F6E4"],
    iconColor: "#0D9488",
    route: "/user-events",
  },
];

export function HealingSection() {
  return (
    <View>
      <Text style={styles.sectionTitle}>Bắt đầu chữa lành chỉ trong 4 bước</Text>
      <Text style={styles.sectionSub}>Khám phá các công cụ hỗ trợ sức khỏe tinh thần dành riêng cho bạn.</Text>

      <View style={styles.healingGrid}>
        {healingFeatures.map((feat) => (
          <View key={feat.id} style={styles.healingCardWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push(feat.route as any)}
            >
              <LinearGradient
                colors={feat.gradient as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.healingCard}
              >
                <View style={styles.healingIconWrap}>
                  <MaterialCommunityIcons name={feat.icon as any} size={24} color={feat.iconColor} />
                </View>
                <View>
                  <Text style={styles.healingTitle}>{feat.title}</Text>
                  <Text style={styles.healingSub}>{feat.sub}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
