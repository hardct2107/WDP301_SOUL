import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import { styles } from "@/styles/home.styles";

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
          <Text style={styles.userName}>Ẩn danh</Text>
          <Text style={styles.time}>Bài viết minh họa</Text>
        </View>
      </View>

      <Text style={styles.postText}>
        Cộng đồng SOUL cho phép chia sẻ ẩn danh tùy chọn, gắn hashtag, bình luận,
        reaction và report nội dung chưa phù hợp.
      </Text>

      <View style={styles.reactRow}>
        <View style={styles.reactItem}>
          <MaterialCommunityIcons name="heart-outline" size={16} color="#EF4444" />
          <Text style={styles.reactText}>Support</Text>
        </View>
        <View style={styles.reactItem}>
          <MaterialCommunityIcons name="comment-outline" size={16} color="#64748B" />
          <Text style={styles.reactText}>Bình luận</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
