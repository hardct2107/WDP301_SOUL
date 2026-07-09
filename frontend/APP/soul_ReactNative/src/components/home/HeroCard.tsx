import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";

type Props = {
  onStartChat?: () => void;
};

export function HeroCard({ onStartChat }: Props) {
  return (
    <View style={styles.heroContainer}>
      <LinearGradient
        colors={["#faf5ff", "#ede9fe", "#fce7f3"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>SOUL AI đồng hành cảm xúc bằng tiếng Việt</Text>
        </View>

        <Text style={styles.heroTitle}>
          Tâm trí bình an{"\n"}
          <Text style={{ color: "#D946EF" }}>bắt đầu từ một cuộc trò chuyện</Text>
        </Text>

        <Text style={styles.heroDescription}>
          SOUL hỗ trợ bạn lắng nghe cảm xúc, viết nhật ký, làm bài test tự đánh giá,
          tham gia sự kiện wellness và kết nối trong cộng đồng an toàn.
        </Text>

        <View style={styles.heroButtons}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.8} onPress={onStartChat}>
            <LinearGradient
              colors={["#7C3AED", "#A855F7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.heroButtonPrimary}
            >
              <Text style={styles.heroButtonPrimaryText}>Bắt đầu miễn phí</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.heroButtonSecondary} activeOpacity={0.8}>
            <Text style={styles.heroButtonSecondaryText}>Tìm hiểu thêm</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}
