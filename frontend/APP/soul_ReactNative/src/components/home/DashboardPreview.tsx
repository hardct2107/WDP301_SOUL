import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { styles } from "@/styles/home.styles";

const weekData = [
  { day: "Mon", height: 40, emoji: "😐" },
  { day: "Tue", height: 60, emoji: "🙂" },
  { day: "Wed", height: 30, emoji: "😔" },
  { day: "Thu", height: 80, emoji: "😊" },
  { day: "Fri", height: 100, emoji: "🤩" },
  { day: "Sat", height: 70, emoji: "😌" },
  { day: "Sun", height: 50, emoji: "🤔" },
];

export function DashboardPreview() {
  return (
    <View style={styles.dashCard}>
      <View style={styles.dashHeader}>
        <Text style={styles.dashTitle}>Theo dõi cảm xúc</Text>
        <TouchableOpacity onPress={() => router.push("/diary")}>
          <Text style={styles.dashLink}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartRow}>
        {weekData.map((item, idx) => (
          <View key={idx} style={styles.chartItem}>
            <Text style={styles.chartEmoji}>{item.emoji}</Text>
            <View style={[styles.chartBar, { height: item.height }]} />
            <Text style={styles.chartDay}>{item.day}</Text>
          </View>
        ))}
      </View>

      <View style={styles.insightBox}>
        <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="#F59E0B" />
        <Text style={styles.insightText}>
          Dữ liệu minh họa: SOUL giúp bạn nhìn lại mood score và ghi chú cảm xúc qua nhật ký cá nhân.
        </Text>
      </View>
    </View>
  );
}
