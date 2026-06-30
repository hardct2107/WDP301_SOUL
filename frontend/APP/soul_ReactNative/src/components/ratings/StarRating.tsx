import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  disabled?: boolean;
};

export function StarRating({ value, onChange, size = 24, disabled = false }: Props) {
  return (
    <View style={styles.row} accessibilityRole="adjustable">
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          activeOpacity={disabled ? 1 : 0.65}
          disabled={disabled}
          onPress={() => onChange?.(star)}
          accessibilityRole="button"
          accessibilityLabel={`${star} sao`}
          style={styles.starButton}
        >
          <MaterialCommunityIcons
            name={star <= value ? "star" : "star-outline"}
            size={size}
            color={star <= value ? "#F59E0B" : "#CBD5E1"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  starButton: { paddingVertical: 3, paddingRight: 3 },
});
