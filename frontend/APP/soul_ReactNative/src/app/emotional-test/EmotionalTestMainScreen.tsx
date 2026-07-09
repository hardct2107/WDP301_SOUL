import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import { TestType } from "../../api/emotionalTestApi";
import TestOptionCard from "../../components/emotional-test/TestOptionCard";

type Props = {
  navigation?: any;
};

const moodOptions = [
  { icon: "😄", label: "Great" },
  { icon: "🙂", label: "Good" },
  { icon: "😐", label: "Okay" },
  { icon: "😟", label: "Bad" },
  { icon: "😣", label: "Awful" },
];

export default function EmotionalTestMainScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const isWebDesktop = Platform.OS === "web" && width >= 900;

  const goToAssessment = (testType: TestType) => {
    router.push({
      pathname: "/emotional-test/assessment" as any,
      params: { testType },
    });
  };

  return (
    <LinearGradient colors={["#F8F5FF", "#FFFFFF", "#F0FDFA"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backHomeButton}
              onPress={() => router.replace("/(tabs)" as any)}
              activeOpacity={0.85}
            >
              <Text style={styles.backHomeText}>‹</Text>
            </TouchableOpacity>

            <View style={styles.headerTextBox}>
              <Text style={styles.hello}>Mental Clarity Center</Text>
              <Text style={styles.subHello}>
                Bài test ngắn giúp bạn hiểu rõ hơn trạng thái cảm xúc hiện tại.
              </Text>
            </View>

            <TouchableOpacity style={styles.bell} activeOpacity={0.85}>
              <Text style={styles.bellText}>🔔</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.heroGrid, !isWebDesktop && styles.heroGridMobile]}>
            <View style={styles.heroCopy}>
              <Text style={styles.heroEyebrow}>KHOA HỌC TÂM LÝ</Text>
              <Text style={styles.heroTitle}>
                Hiểu cảm xúc của bạn bằng các bài test chuẩn hóa.
              </Text>
              <Text style={styles.heroDescription}>
                Làm bài nhanh, xem kết quả trực quan và nhận gợi ý phù hợp từ SOUL AI.
              </Text>

              <TouchableOpacity
                style={styles.heroButton}
                onPress={() => goToAssessment("WHO5")}
                activeOpacity={0.88}
              >
                <Text style={styles.heroButtonText}>Bắt đầu bài gợi ý</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.checkInCard}>
              <View>
                <Text style={styles.checkTitle}>Daily check-in</Text>
                <Text style={styles.checkSub}>Bạn đang cảm thấy thế nào?</Text>
              </View>

              <View style={styles.moodRow}>
                {moodOptions.map((item) => (
                  <View key={item.label} style={styles.moodItem}>
                    <Text style={styles.moodIcon}>{item.icon}</Text>
                    <Text style={styles.moodLabel}>{item.label}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.resultPreview}>
                <Text style={styles.resultLabel}>Latest Result</Text>
                <Text style={styles.resultScore}>12</Text>
                <Text style={styles.resultText}>Moderate Risk</Text>
                <View style={styles.resultBar}>
                  <View style={styles.resultBarFill} />
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.featureCard, !isWebDesktop && styles.featureCardMobile]}>
            <View style={styles.featureLeft}>
              <Text style={styles.featureKicker}>Recommended for You</Text>
              <Text style={styles.featureTitle}>WHO-5 Well-being Check</Text>
              <Text style={styles.featureDescription}>
                Đánh giá nhanh mức độ well-being và trạng thái cảm xúc gần đây.
              </Text>

              <View style={styles.featureInfoRow}>
                <Text style={styles.featureInfo}>⏱ 5–7 phút</Text>
                <Text style={styles.featureInfo}>✓ 5 câu hỏi</Text>
              </View>
            </View>

            <View style={styles.featureRight}>
              <Text style={styles.featureIllustration}>💜</Text>
              <TouchableOpacity
                style={styles.featureButton}
                onPress={() => goToAssessment("WHO5")}
                activeOpacity={0.85}
              >
                <Text style={styles.featureButtonText}>Start Test</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Assessments</Text>

            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>⌕</Text>
              <TextInput
                placeholder="Search test, topic, keyword..."
                placeholderTextColor="#9CA3AF"
                style={styles.searchInput}
              />
            </View>

            <TouchableOpacity style={styles.filterButton} activeOpacity={0.85}>
              <Text style={styles.filterText}>☷</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.testGrid}>
            <View style={[styles.testCardWrap, isWebDesktop && styles.testCardWrapWeb]}>
              <TestOptionCard
                icon="🌿"
                title="WHO-5 Well-being Check"
                description="Đánh giá nhanh mức độ well-being và trạng thái cảm xúc gần đây."
                duration="5-7m"
                onPress={() => goToAssessment("WHO5")}
              />
            </View>

            <View style={[styles.testCardWrap, isWebDesktop && styles.testCardWrapWeb]}>
              <TestOptionCard
                icon="📘"
                title="PSS-10 Student Stress Check"
                description="Tự nhìn lại mức độ căng thẳng trong học tập và cuộc sống."
                duration="5-10m"
                onPress={() => goToAssessment("PSS10")}
              />
            </View>

            <View style={[styles.testCardWrap, isWebDesktop && styles.testCardWrapWeb]}>
              <TestOptionCard
                icon="☁️"
                title="Anxiety Reflection"
                description="Tự nhìn lại các dấu hiệu lo lắng và căng thẳng cảm xúc."
                duration="3-4m"
                disabled
              />
            </View>

            <View style={[styles.testCardWrap, isWebDesktop && styles.testCardWrapWeb]}>
              <TestOptionCard
                icon="🔥"
                title="Burnout Reflection"
                description="Nhận diện dấu hiệu kiệt sức học tập và mệt mỏi kéo dài."
                duration="5-10m"
                disabled
              />
            </View>
          </View>

          <View style={{ height: 72 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const webShadow = Platform.select({
  web: { boxShadow: "0 18px 48px rgba(88, 28, 135, 0.10)" },
  ios: { shadowColor: "#7C3AED", shadowOpacity: 0.1, shadowRadius: 18, shadowOffset: { width: 0, height: 8 } },
  android: { elevation: 4 },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  scrollContent: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "web" ? 28 : 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 22,
  },
  backHomeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDE9FE",
  },
  backHomeText: {
    fontSize: 34,
    lineHeight: 36,
    color: "#7C3AED",
    fontWeight: "900",
  },
  headerTextBox: {
    flex: 1,
  },
  hello: {
    fontSize: Platform.OS === "web" ? 30 : 22,
    fontWeight: "900",
    color: "#20123A",
    letterSpacing: -0.5,
  },
  subHello: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    lineHeight: 20,
  },
  bell: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDE9FE",
  },
  bellText: {
    fontSize: 18,
  },
  heroGrid: {
    minHeight: 286,
    borderRadius: 34,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    padding: 28,
    flexDirection: "row",
    alignItems: "stretch",
    gap: 24,
    ...webShadow,
  },
  heroGridMobile: {
    flexDirection: "column",
    padding: 20,
    borderRadius: 28,
  },
  heroCopy: {
    flex: 1.35,
    justifyContent: "center",
  },
  heroEyebrow: {
    color: "#7C3AED",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 12,
  },
  heroTitle: {
    color: "#1E1538",
    fontSize: Platform.OS === "web" ? 42 : 28,
    lineHeight: Platform.OS === "web" ? 50 : 34,
    fontWeight: "900",
    letterSpacing: -1,
    maxWidth: 620,
  },
  heroDescription: {
    color: "#6B7280",
    fontSize: 15,
    lineHeight: 24,
    marginTop: 14,
    maxWidth: 560,
  },
  heroButton: {
    marginTop: 24,
    height: 48,
    alignSelf: "flex-start",
    paddingHorizontal: 24,
    borderRadius: 999,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: { boxShadow: "0 12px 28px rgba(124, 58, 237, 0.28)" },
      android: { elevation: 4 },
    }),
  },
  heroButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
  checkInCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 22,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  checkTitle: {
    fontWeight: "900",
    color: "#1D1B38",
    fontSize: 16,
  },
  checkSub: {
    fontSize: 13,
    color: "#7C3AED",
    marginTop: 4,
    fontWeight: "700",
  },
  moodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 18,
  },
  moodItem: {
    alignItems: "center",
    backgroundColor: "#F8F5FF",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  moodIcon: {
    fontSize: 22,
  },
  moodLabel: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 3,
    fontWeight: "700",
  },
  resultPreview: {
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    padding: 16,
  },
  resultLabel: {
    color: "#7C3AED",
    fontSize: 12,
    fontWeight: "900",
  },
  resultScore: {
    color: "#7C3AED",
    fontSize: 42,
    fontWeight: "900",
    marginTop: 4,
  },
  resultText: {
    color: "#0F766E",
    fontSize: 13,
    fontWeight: "800",
  },
  resultBar: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#EDE9FE",
    marginTop: 12,
    overflow: "hidden",
  },
  resultBarFill: {
    width: "62%",
    height: "100%",
    backgroundColor: "#7C3AED",
    borderRadius: 999,
  },
  featureCard: {
    marginTop: 22,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 22,
    flexDirection: "row",
    minHeight: 156,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    ...webShadow,
  },
  featureCardMobile: {
    flexDirection: "column",
    gap: 18,
  },
  featureLeft: {
    flex: 1,
  },
  featureKicker: {
    color: "#7C3AED",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 10,
  },
  featureTitle: {
    color: "#1D1B38",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 10,
  },
  featureDescription: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 560,
  },
  featureInfoRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
    flexWrap: "wrap",
  },
  featureInfo: {
    color: "#1D1B38",
    fontSize: 13,
    fontWeight: "800",
    backgroundColor: "#F8F5FF",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  featureRight: {
    width: Platform.OS === "web" ? 180 : "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  featureIllustration: {
    fontSize: 58,
  },
  featureButton: {
    backgroundColor: "#7C3AED",
    borderRadius: 22,
    paddingHorizontal: 28,
    paddingVertical: 11,
  },
  featureButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 13,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#262346",
    marginRight: "auto",
  },
  searchBox: {
    minWidth: Platform.OS === "web" ? 320 : 0,
    flex: Platform.OS === "web" ? 0 : 1,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#EDE9FE",
  },
  searchIcon: {
    color: "#7C3AED",
    fontSize: 16,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    color: "#1F2937",
    fontSize: 13,
    outlineStyle: "none" as any,
  },
  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDE9FE",
  },
  filterText: {
    color: "#7C3AED",
    fontSize: 18,
  },
  testGrid: {
    flexDirection: Platform.OS === "web" ? "row" : "column",
    flexWrap: "wrap",
    gap: 16,
  },
  testCardWrap: {
    width: "100%",
  },
  testCardWrapWeb: {
    flexBasis: "48%",
    flexGrow: 1,
  },
});
