import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { styles } from "@/styles/home.styles";

export function MiniArticle() {
  return (
    <View style={styles.articleCard}>
      <View style={styles.articleImgMock}>
        <MaterialCommunityIcons name="flower-outline" size={48} color="#F59E0B" />
      </View>
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle}>Dành 5 phút mỗi ngày cho bản thân</Text>
        <Text style={styles.articleDesc}>
          Khoảng dừng nhỏ giữa ngày giúp tâm trí lấy lại sự minh mẫn. Đừng quên bạn cũng cần được chăm sóc như cách bạn quan tâm người khác.
        </Text>

        <View style={styles.tipRow}>
          <View style={styles.tipIcon}>
            <MaterialCommunityIcons name="check" size={14} color="#7C3AED" />
          </View>
          <Text style={styles.tipText}>Hít thở sâu 3 lần</Text>
        </View>
        <View style={styles.tipRow}>
          <View style={styles.tipIcon}>
            <MaterialCommunityIcons name="check" size={14} color="#7C3AED" />
          </View>
          <Text style={styles.tipText}>Uống một ngụm nước ấm</Text>
        </View>
        <View style={styles.tipRow}>
          <View style={styles.tipIcon}>
            <MaterialCommunityIcons name="check" size={14} color="#7C3AED" />
          </View>
          <Text style={styles.tipText}>Thả lỏng cơ vai</Text>
        </View>
      </View>
    </View>
  );
}
