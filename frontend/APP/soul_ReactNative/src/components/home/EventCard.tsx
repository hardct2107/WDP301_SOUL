import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import { styles } from "@/styles/home.styles";

export function EventCard() {
  return (
    <View style={styles.eventCard}>
      <View style={styles.eventImg}>
        <MaterialCommunityIcons name="calendar-heart" size={64} color="#0F766E" />
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>Sự kiện wellness trong SOUL</Text>
        <Text style={styles.eventMeta}>Workshop, talkshow, webinar hoặc community event</Text>

        <TouchableOpacity
          style={styles.joinButton}
          activeOpacity={0.8}
          onPress={() => router.push("/user-events")}
        >
          <Text style={styles.joinText}>Xem sự kiện</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
