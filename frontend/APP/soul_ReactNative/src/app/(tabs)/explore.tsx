import { useState } from "react";
import { ScrollView, View } from "react-native";
import { styles } from "@/styles/home.styles";

import { HomeHeader } from "@/components/home/HomeHeader";
import { Sidebar } from "@/components/home/Sidebar";
import { HeroCard } from "@/components/home/HeroCard";
import { HealingSection } from "@/components/home/HealingSection";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { CommunityPreview } from "@/components/home/CommunityPreview";
import { EventCard } from "@/components/home/EventCard";
import { BottomNav } from "@/components/home/BottomNav";

export default function ExploreScreen() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <View style={styles.page}>
      {showSidebar && <Sidebar />}

      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <HomeHeader
          showSidebar={showSidebar}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
        />

        <HeroCard />
        <HealingSection />
        <DashboardPreview />
        <CommunityPreview />
        <EventCard />

        <BottomNav />
      </ScrollView>
    </View>
  );
}
