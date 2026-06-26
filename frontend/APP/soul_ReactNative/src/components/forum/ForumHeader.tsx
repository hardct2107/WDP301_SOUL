import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { forumStyles as s } from "@/styles/forum.styles";
import { colors } from "@/constants/colors";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  filters: string[];
  onCreatePress: () => void;
  onReportsPress?: () => void;
  onBackPress?: () => void;
};

export function ForumHeader({
  search,
  setSearch,
  filter,
  setFilter,
  filters,
  onCreatePress,
  onReportsPress,
  onBackPress,
}: Props) {
  return (
    <LinearGradient
      colors={["#7C3AED", "#6366F1", "#14B8A6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[s.header, { borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }]}
    >
      {onBackPress ? (
        <Pressable
          style={[s.backButton, { backgroundColor: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.3)" }]}
          onPress={onBackPress}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </Pressable>
      ) : null}

      <View style={s.headerTop}>
        <View style={s.headerTitleWrap}>
          <Text style={[s.title, { color: "#FFFFFF" }]}>Healing Forum</Text>
          <Text style={[s.subtitle, { color: "rgba(255,255,255,0.82)" }]}>
            A safe space to share, support and grow together 🌿
          </Text>
        </View>

        <View style={s.headerActions}>
          <Pressable
            style={[s.bellButton, { backgroundColor: "rgba(255,255,255,0.18)", borderColor: "rgba(255,255,255,0.3)" }]}
            onPress={onReportsPress}
          >
            <MaterialCommunityIcons name="flag-outline" size={24} color="#FFFFFF" />
          </Pressable>

          <Pressable
            style={[s.plusButton, { backgroundColor: "rgba(255,255,255,0.22)", borderColor: "rgba(255,255,255,0.35)" }]}
            onPress={onCreatePress}
          >
            <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      {/* Search box — white on gradient */}
      <View style={[s.searchBox, { backgroundColor: "rgba(255,255,255,0.18)", borderColor: "rgba(255,255,255,0.3)" }]}>
        <MaterialCommunityIcons name="magnify" size={22} color="rgba(255,255,255,0.8)" />
        <TextInput
          style={[s.searchInput, { color: "#FFFFFF" }]}
          placeholder="Search stories, feelings, hashtags..."
          placeholderTextColor="rgba(255,255,255,0.55)"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filter chips — glassmorphism on gradient */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filterRow}
      >
        {filters.map((item) => {
          const active = item === filter;
          return (
            <Pressable
              key={item}
              style={[
                s.filterChip,
                {
                  backgroundColor: active ? "#FFFFFF" : "rgba(255,255,255,0.18)",
                  borderColor: active ? "#FFFFFF" : "rgba(255,255,255,0.35)",
                },
              ]}
              onPress={() => setFilter(item)}
            >
              <Text
                style={[
                  s.filterText,
                  { color: active ? colors.primary : "rgba(255,255,255,0.9)" },
                ]}
              >
                {item === "all" ? "✦ All" : `#${item}`}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
}