import { Text, View } from "react-native";
import { styles } from "@/styles/home.styles";

export function StatsSection() {
  return (
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>AI</Text>
        <Text style={styles.statLabel}>Đồng hành cảm xúc</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>2</Text>
        <Text style={styles.statLabel}>Bài test tự đánh giá</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>5★</Text>
        <Text style={styles.statLabel}>Đánh giá sự kiện</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>Report</Text>
        <Text style={styles.statLabel}>Cộng đồng an toàn</Text>
      </View>
    </View>
  );
}
