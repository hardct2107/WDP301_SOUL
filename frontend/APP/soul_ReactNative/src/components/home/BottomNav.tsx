import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";

type Props = {
  onRatingPress?: () => void;
};

const navItems = [
  { icon: "home-variant", label: "Home", route: "/", active: true },
  { icon: "compass-outline", label: "Explore", route: "/explore", active: false },
  { icon: "flower-tulip", label: "", route: "/diary", active: false }, // FAB center
  { icon: "account-group-outline", label: "Community", route: "/(tabs)/forum", active: false },
  { icon: "account-outline", label: "Profile", route: null, active: false }, 
];

export function BottomNav({ onRatingPress }: Props) {
  const handlePress = (route: string | null, index: number) => {
    // Nếu bấm Profile (index 4), ta có thể kích hoạt menu profile trên Header, 
    // hoặc trigger modal đánh giá nếu chưa có trang profile riêng
    if (index === 4) {
      onRatingPress?.();
      return;
    }
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
              onPress={() => handlePress(item.route, index)}
              activeOpacity={0.8}
              style={{ marginTop: -30 }}
            >
              <LinearGradient
                colors={["#7C3AED", "#A855F7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.footerPlus}
              >
                <MaterialCommunityIcons name={item.icon as any} size={28} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={index}
            style={styles.footerItem}
            onPress={() => handlePress(item.route, index)}
            activeOpacity={0.7}
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