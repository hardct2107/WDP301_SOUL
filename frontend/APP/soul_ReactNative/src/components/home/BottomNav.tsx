import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";

const navItems = [
  { icon: "home", label: "Home", route: "/", active: true },
  { icon: "chart-line", label: "Track", route: null, active: false },
  { icon: "plus", label: "", route: "/forum", active: false },
  { icon: "account-group-outline", label: "Community", route: "/forum", active: false },
  { icon: "account-outline", label: "Profile", route: null, active: false },
];

export function BottomNav() {
  const handlePress = (route: string | null) => {
    if (route) {
      router.push(route as any);
    }
  };

  return (
    <View style={styles.footer}>
      {navItems.map((item, index) => {
        if (index === 2) {
          // Center FAB with gradient
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(item.route)}
              activeOpacity={0.75}
              style={{ marginTop: -30 }}
            >
              <LinearGradient
                colors={["#7C3AED", "#14B8A6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.footerPlus}
              >
                <MaterialCommunityIcons name="plus" size={36} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity
            key={index}
            style={styles.footerItem}
            onPress={() => handlePress(item.route)}
            activeOpacity={0.75}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={26}
              color={item.active ? "#7C3AED" : "#94A3B8"}
            />
            {!!item.label && (
              <Text style={[styles.footerText, item.active && { color: "#7C3AED" }]}>
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}