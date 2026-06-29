import { useState } from "react";
import { Platform, ScrollView, View, SafeAreaView } from "react-native";
import { styles, webStyles } from "@/styles/home.styles";

import { HomeHeader } from "@/components/home/HomeHeader";
import { HeroCard } from "@/components/home/HeroCard";
import { ChatDemo } from "@/components/home/ChatDemo";
import { StatsSection } from "@/components/home/StatsSection";
import { DailyMotivation } from "@/components/home/DailyMotivation";
import { MiniArticle } from "@/components/home/MiniArticle";
import { HealingSection } from "@/components/home/HealingSection";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { CommunityPreview } from "@/components/home/CommunityPreview";
import { EventCard } from "@/components/home/EventCard";
import { Testimonials } from "@/components/home/Testimonials";
import { Pricing } from "@/components/home/Pricing";
import { CtaFooter } from "@/components/home/CtaFooter";
import { BottomNav } from "@/components/home/BottomNav";
import { Sidebar } from "@/components/home/Sidebar";
import { RatingModal } from "@/components/home/RatingModal";

const isWeb = Platform.OS === "web";

export default function HomeScreen() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRating, setShowRating] = useState(false);

  if (isWeb) {
    // ── Web Dashboard Layout ──────────────────────────────────────────────
    return (
      <View style={webStyles.root}>
        {/* Sidebar cố định bên trái */}
        <View style={webStyles.sidebarCol}>
          <Sidebar />
        </View>

        {/* Main content area */}
        <ScrollView
          style={webStyles.contentArea}
          contentContainerStyle={{ paddingBottom: 48 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Topbar */}
          <HomeHeader
            showSidebar={false}
            onToggleSidebar={() => {}}
            webMode
          />

          <View style={{ maxWidth: 900, alignSelf: "center", width: "100%", paddingTop: 20 }}>
            {/* Assembly of components */}
            <HeroCard />
            <ChatDemo />
            <StatsSection />
            <DailyMotivation />
            <MiniArticle />
            <HealingSection />
            <DashboardPreview />
            <CommunityPreview />
            <EventCard />
            <Testimonials />
            <Pricing />
            <CtaFooter />
          </View>
        </ScrollView>

        {/* Rating popup */}
        <RatingModal
          forceVisible={showRating}
          onForceClose={() => setShowRating(false)}
        />
      </View>
    );
  }

  // ── Mobile Layout ────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.page}>
      {showSidebar && <Sidebar />}

      <HomeHeader
        showSidebar={showSidebar}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
      />

      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <HeroCard />
        <ChatDemo />
        <StatsSection />
        <DailyMotivation />
        <MiniArticle />
        <HealingSection />
        <DashboardPreview />
        <CommunityPreview />
        <EventCard />
        <Testimonials />
        <Pricing />
        <CtaFooter />
        <BottomNav onRatingPress={() => setShowRating(true)} />
      </ScrollView>

      <RatingModal
        forceVisible={showRating}
        onForceClose={() => setShowRating(false)}
      />
    </SafeAreaView>
  );
}
