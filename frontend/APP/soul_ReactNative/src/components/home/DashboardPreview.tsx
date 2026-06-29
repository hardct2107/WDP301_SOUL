import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "@/styles/home.styles";
import { router } from "expo-router";

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
        <Text style={styles.dashTitle}>Mood Tracking</Text>
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
          Tuần này bạn có xu hướng vui vẻ hơn vào cuối tuần. Hãy duy trì thói quen viết nhật ký nhé!
        </Text>
      </View>
    </View>
  );
}
