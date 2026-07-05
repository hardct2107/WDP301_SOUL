import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
          <Text style={styles.heroBadgeText}>✨ AI đồng hành sức khỏe tinh thần 24/7</Text>
        </View>

        <Text style={styles.heroTitle}>
          Tâm trí bình an —{"\n"}
          <Text style={{ color: "#D946EF" }}>bắt đầu từ một cuộc trò chuyện</Text>
        </Text>

        <Text style={styles.heroDescription}>
          SOUL là người bạn AI lắng nghe, thấu hiểu và đồng hành cùng bạn trên hành trình chăm sóc sức khỏe tinh thần mỗi ngày.
        </Text>

        <View style={styles.heroButtons}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.8} onPress={onStartChat}>
            <LinearGradient
              colors={["#7C3AED", "#A855F7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.heroButtonPrimary}
            >
              <Text style={styles.heroButtonPrimaryText}>Bắt đầu trò chuyện</Text>
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