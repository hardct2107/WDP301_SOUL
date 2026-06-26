import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";
import { forumStyles as s } from "@/styles/forum.styles";
import { colors } from "@/constants/colors";

type Props = {
  mode: "community" | "mine";
  onCommunityPress: () => void;
  onMinePress: () => void;
};

export function ForumBottomSwitcher({
  mode,
  onCommunityPress,
  onMinePress,
}: Props) {
  return (
    <View style={s.bottomSwitcher}>
      {/* Community tab */}
      {mode === "community" ? (
        <LinearGradient
          colors={["#7C3AED", "#14B8A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[s.bottomTab, s.bottomTabActive]}
        >
          <Pressable
            style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1, justifyContent: "center" }}
            onPress={onCommunityPress}
          >
            <MaterialCommunityIcons name="account-group-outline" size={22} color="#FFFFFF" />
            <Text style={s.bottomTabTextActive}>Community</Text>
          </Pressable>
        </LinearGradient>
      ) : (
        <Pressable style={s.bottomTab} onPress={onCommunityPress}>
          <MaterialCommunityIcons name="account-group-outline" size={22} color={colors.textSecondary} />
          <Text style={s.bottomTabText}>Community</Text>
        </Pressable>
      )}

      {/* Mine tab */}
      {mode === "mine" ? (
        <LinearGradient
          colors={["#7C3AED", "#14B8A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[s.bottomTab, s.bottomTabActive]}
        >
          <Pressable
            style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1, justifyContent: "center" }}
            onPress={onMinePress}
          >
            <MaterialCommunityIcons name="account-outline" size={22} color="#FFFFFF" />
            <Text style={s.bottomTabTextActive}>My Posts</Text>
          </Pressable>
        </LinearGradient>
      ) : (
        <Pressable style={s.bottomTab} onPress={onMinePress}>
          <MaterialCommunityIcons name="account-outline" size={22} color={colors.textSecondary} />
          <Text style={s.bottomTabText}>My Posts</Text>
        </Pressable>
      )}
    </View>
  );
}