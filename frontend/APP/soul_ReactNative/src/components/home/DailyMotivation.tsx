import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";

export function DailyMotivation() {
  return (
    <LinearGradient
      colors={["#7C3AED", "#3B82F6", "#14B8A6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.motivationCard}
    >
      <View style={styles.motivationTextWrap}>
        <Text style={styles.motivationTitle}>
          You're stronger{"\n"}than you think.
        </Text>
        <TouchableOpacity style={styles.motivationBtn} activeOpacity={0.8}>
          <Text style={styles.motivationBtnText}>Start breathing</Text>
        </TouchableOpacity>
      </View>
      
      <MaterialCommunityIcons
        name="weather-windy"
        size={80}
        color="rgba(255,255,255,0.2)"
        style={{ marginRight: -10 }}
      />
    </LinearGradient>
  );
}
