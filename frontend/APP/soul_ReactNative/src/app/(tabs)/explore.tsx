import { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";

import { BottomNav } from "@/components/home/BottomNav";
import { CommunityPreview } from "@/components/home/CommunityPreview";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { EventCard } from "@/components/home/EventCard";
import { HealingSection } from "@/components/home/HealingSection";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Sidebar } from "@/components/home/Sidebar";
import { styles as homeStyles } from "@/styles/home.styles";

export default function ExploreScreen() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <View style={homeStyles.page}>
      {showSidebar ? <Sidebar /> : null}

      <ScrollView
        style={homeStyles.main}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          showSidebar={showSidebar}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
        />

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>KHÁM PHÁ SOUL</Text>
          <Text style={styles.title}>Tất cả công cụ chăm sóc tinh thần ở một nơi.</Text>
          <Text style={styles.description}>
            Xem nhanh bài tập thở, mood tracking, sự kiện wellness và cộng đồng an toàn.
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.wideCard}>
            <HealingSection />
          </View>

          <View style={styles.wideCard}>
            <DashboardPreview />
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.equalCard}>
            <EventCard />
          </View>

          <View style={styles.equalCard}>
            <CommunityPreview />
          </View>
        </View>

        <BottomNav />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    maxWidth: Platform.OS === "web" ? 1180 : undefined,
    alignSelf: "center",
    paddingHorizontal: Platform.OS === "web" ? 28 : 0,
    paddingBottom: 90,
  },
  hero: {
    marginTop: Platform.OS === "web" ? 24 : 12,
    marginHorizontal: Platform.OS === "web" ? 0 : 16,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    padding: Platform.OS === "web" ? 34 : 24,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    ...Platform.select({
      web: { boxShadow: "0 18px 48px rgba(15, 23, 42, 0.07)" },
      android: { elevation: 3 },
    }),
  },
  eyebrow: {
    color: "#7C3AED",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },
  title: {
    marginTop: 10,
    color: "#1E1538",
    fontSize: Platform.OS === "web" ? 40 : 28,
    lineHeight: Platform.OS === "web" ? 48 : 34,
    fontWeight: "900",
    maxWidth: 720,
  },
  description: {
    marginTop: 12,
    color: "#6B7280",
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 620,
  },
  grid: {
    marginTop: Platform.OS === "web" ? 22 : 16,
    flexDirection: Platform.OS === "web" ? "row" : "column",
    gap: Platform.OS === "web" ? 18 : 0,
  },
  wideCard: {
    flex: 1,
  },
  equalCard: {
    flex: 1,
  },
});
