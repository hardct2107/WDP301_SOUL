import { useState } from "react";
import { Platform, ScrollView, View, SafeAreaView, StyleSheet } from "react-native";
import { styles, webStyles } from "@/styles/home.styles";

import { HomeHeader } from "@/components/home/HomeHeader";
import { HeroCard } from "@/components/home/HeroCard";
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
import { RatingModal } from "@/components/home/RatingModal";
import { FloatingChat } from "@/components/home/FloatingChat";

const isWeb = Platform.OS === "web";

export default function HomeScreen() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  if (isWeb) {
    // ── Web Layout ─────────────────────────────────────────────────────────
    return (
      <View style={webStyles.root}>
        <ScrollView
          style={webStyles.contentArea}
          contentContainerStyle={{ paddingBottom: 64 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Topbar */}
          <HomeHeader
            showSidebar={false}
            onToggleSidebar={() => {}}
            webMode
          />

          <View style={localWebStyles.pageWrapper}>
            <HeroCard onStartChat={() => setChatOpen(true)} />
            <StatsSection />
            <DailyMotivation />
            <DashboardPreview />
            <EventCard />
            <MiniArticle />
            <CommunityPreview />
            <HealingSection />
            <Testimonials />
            <Pricing />
            <CtaFooter />
          </View>
        </ScrollView>

        {/* Floating Chat Widget — cố định góc phải dưới */}
        <FloatingChat
          defaultOpen={chatOpen}
          onOpenChange={(o) => { if (!o) setChatOpen(false); }}
        />

        {/* Rating popup */}
        <RatingModal
          forceVisible={showRating}
          onForceClose={() => setShowRating(false)}
        />
      </View>
    );
  }

  // ── Mobile Layout ──────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.page}>
      <HomeHeader
        showSidebar={showSidebar}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
      />

      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <HeroCard />
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

      {/* FAB chat nằm trên BottomNav */}
      <FloatingChat
        defaultOpen={chatOpen}
        onOpenChange={(o) => { if (!o) setChatOpen(false); }}
      />

      <RatingModal
        forceVisible={showRating}
        onForceClose={() => setShowRating(false)}
      />
    </SafeAreaView>
  );
}

const localWebStyles = StyleSheet.create({
  pageWrapper: {
    maxWidth: 1400,
    alignSelf: "center",
    width: "100%",
    paddingTop: 16,
  },
});
