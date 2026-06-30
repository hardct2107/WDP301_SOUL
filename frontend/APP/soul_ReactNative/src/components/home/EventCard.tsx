import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";
import { router } from "expo-router";

export function EventCard() {
  return (
    <View style={styles.eventCard}>
      <View style={styles.eventImg}>
        <MaterialCommunityIcons name="calendar-heart" size={64} color="#0F766E" />
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>Workshop: Quản lý căng thẳng & Burnout</Text>
        <Text style={styles.eventMeta}>20:00 - Thứ Bảy, 15/10 • Online qua Zoom</Text>
        
        <TouchableOpacity
          style={styles.joinButton}
          activeOpacity={0.8}
          onPress={() => router.push("/user-events")}
        >
          <Text style={styles.joinText}>Reserve Spot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
