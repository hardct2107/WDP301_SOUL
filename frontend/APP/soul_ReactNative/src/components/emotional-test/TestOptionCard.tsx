import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  Platform,
} from "react-native";

type Props = {
  icon: string;
  title: string;
  description: string;
  duration: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

export default function TestOptionCard({
  icon,
  title,
  description,
  duration,
  onPress,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, disabled && styles.disabledCard]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled}
    >
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.duration}>⏱ {duration}</Text>
        <View style={[styles.startButton, disabled && styles.disabledButton]}>
          <Text style={styles.startText}>{disabled ? "Soon" : "Start"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 86,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginBottom: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#9B8AFB",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 2,
    ...Platform.select({
      web: {
        minHeight: 136,
        marginBottom: 0,
        padding: 18,
        borderRadius: 26,
        boxShadow: "0 14px 36px rgba(15, 23, 42, 0.06)",
      },
    }),
  },
  disabledCard: {
    opacity: 0.65,
  },
  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    ...Platform.select({
      web: {
        width: 64,
        height: 64,
        borderRadius: 20,
        marginRight: 16,
      },
    }),
  },
  icon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1D1B38",
    marginBottom: 6,
    ...Platform.select({
      web: {
        fontSize: 16,
        fontWeight: "900",
      },
    }),
  },
  description: {
    fontSize: 11,
    color: "#7D7A9E",
    lineHeight: 15,
    ...Platform.select({
      web: {
        fontSize: 13,
        lineHeight: 19,
      },
    }),
  },
  right: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 58,
  },
  duration: {
    fontSize: 11,
    color: "#7D7A9E",
  },
  startButton: {
    backgroundColor: "#7C3AED",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 18,
  },
  disabledButton: {
    backgroundColor: "#CFC7E8",
  },
  startText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
