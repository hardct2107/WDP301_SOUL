import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { styles } from "@/styles/home.styles";

export function MiniArticle() {
  return (
    <View style={styles.articleCard}>
      <View style={styles.articleImgMock}>
        <MaterialCommunityIcons name="head-heart-outline" size={48} color="#F59E0B" />
      </View>
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle}>SOUL không thay thế chuyên gia y tế</Text>
        <Text style={styles.articleDesc}>
          SOUL là nền tảng hỗ trợ tự quan sát cảm xúc. Phản hồi AI và bài test không phải
          chẩn đoán y khoa hoặc điều trị tâm lý.
        </Text>

        <View style={styles.tipRow}>
          <View style={styles.tipIcon}>
            <MaterialCommunityIcons name="check" size={14} color="#7C3AED" />
          </View>
          <Text style={styles.tipText}>SOUL AI là AI Emotional Companion</Text>
        </View>
        <View style={styles.tipRow}>
          <View style={styles.tipIcon}>
            <MaterialCommunityIcons name="check" size={14} color="#7C3AED" />
          </View>
          <Text style={styles.tipText}>WHO-5/PSS-10 là bài tự đánh giá</Text>
        </View>
        <View style={styles.tipRow}>
          <View style={styles.tipIcon}>
            <MaterialCommunityIcons name="check" size={14} color="#7C3AED" />
          </View>
          <Text style={styles.tipText}>Khi khẩn cấp, hãy liên hệ hỗ trợ trực tiếp</Text>
        </View>
      </View>
    </View>
  );
}
