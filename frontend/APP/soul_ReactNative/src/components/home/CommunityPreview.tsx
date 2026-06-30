import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";
import { router } from "expo-router";

export function CommunityPreview() {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push("/(tabs)/forum")}
      style={styles.communityCard}
    >
      <View style={styles.dashHeader}>
        <Text style={styles.dashTitle}>Cộng đồng SOUL</Text>
        <Text style={styles.dashLink}>Tham gia ngay</Text>
      </View>

      <View style={styles.userRow}>
        <View style={styles.smallAvatar} />
        <View>
          <Text style={styles.userName}>Minh Nhật</Text>
          <Text style={styles.time}>2 giờ trước</Text>
        </View>
      </View>

      <Text style={styles.postText}>
        Hôm nay mình đã thử bài tập hít thở 5 phút trên SOUL. Thực sự cảm thấy nhẹ nhõm hơn rất nhiều sau một ngày dài làm việc căng thẳng. Cảm ơn mọi người đã chia sẻ tips này! 🌿
      </Text>

      <View style={styles.reactRow}>
        <View style={styles.reactItem}>
          <MaterialCommunityIcons name="heart-outline" size={16} color="#EF4444" />
          <Text style={styles.reactText}>24</Text>
        </View>
        <View style={styles.reactItem}>
          <MaterialCommunityIcons name="comment-outline" size={16} color="#64748B" />
          <Text style={styles.reactText}>5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}