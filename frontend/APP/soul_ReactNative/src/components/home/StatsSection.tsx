import { Text, View } from "react-native";
import { styles } from "@/styles/home.styles";

export function StatsSection() {
  return (
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>50K+</Text>
        <Text style={styles.statLabel}>Người dùng</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>98%</Text>
        <Text style={styles.statLabel}>Hài lòng</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>24/7</Text>
        <Text style={styles.statLabel}>Lắng nghe</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>4.9★</Text>
        <Text style={styles.statLabel}>Đánh giá</Text>
      </View>
    </View>
  );
}
