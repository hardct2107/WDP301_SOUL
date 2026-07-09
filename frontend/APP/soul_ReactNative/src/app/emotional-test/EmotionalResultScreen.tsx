import React, { useMemo } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";

import { EmotionalTestResult } from "../../api/emotionalTestApi";

function getEmoji(result?: EmotionalTestResult) {
  if (!result) return "🌿";

  if (result.testType === "PSS10") {
    if (result.level === "low_stress") return "🌱";
    if (result.level === "moderate_stress") return "🌤️";
    return "🌧️";
  }

  if (result.level === "good") return "🌞";
  if (result.level === "moderate") return "🌤️";
  return "🌧️";
}

function getResultMessage(result?: EmotionalTestResult) {
  if (!result) {
    return "Kết quả giúp bạn tự nhìn lại trạng thái cảm xúc hiện tại.";
  }

  if (result.testType === "PSS10") {
    if (result.level === "low_stress") {
      return "Mức căng thẳng của bạn hiện đang tương đối thấp.";
    }

    if (result.level === "moderate_stress") {
      return "Bạn có thể đang gặp một mức căng thẳng nhất định trong học tập hoặc cuộc sống.";
    }

    return "Bạn có thể đang chịu khá nhiều áp lực và nên quan tâm hơn đến việc nghỉ ngơi, giảm tải.";
  }

  if (result.level === "good") {
    return "Gần đây bạn đang có trạng thái cảm xúc khá tích cực.";
  }

  if (result.level === "moderate") {
    return "Bạn có thể đang có một vài dấu hiệu mệt mỏi hoặc căng thẳng.";
  }

  return "Bạn có thể đang cần quan tâm hơn đến cảm xúc và sức khỏe tinh thần của mình.";
}

function getScoreLabel(result?: EmotionalTestResult) {
  if (!result) return "Score";

  if (result.testType === "PSS10") {
    return `${result.rawScore}/40`;
  }

  return `${result.percentageScore}/100`;
}

function parseResultParam(resultParam: string | string[] | undefined) {
  try {
    if (!resultParam) return undefined;

    const value = Array.isArray(resultParam) ? resultParam[0] : resultParam;
    if (!value) return undefined;

    return JSON.parse(value) as EmotionalTestResult;
  } catch (error) {
    console.log("Cannot parse emotional test result:", error);
    return undefined;
  }
}

export default function EmotionalResultScreen() {
  const params = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const isWebDesktop = Platform.OS === "web" && width >= 900;

  const result = useMemo(() => {
    return parseResultParam(params.result);
  }, [params.result]);

  return (
    <LinearGradient colors={["#F8F5FF", "#FFFFFF", "#F0FDFA"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.replace("/emotional-test" as any)}
              activeOpacity={0.85}
            >
              <Text style={styles.backText}>‹</Text>
            </TouchableOpacity>

            <View style={styles.titleWrap}>
              <Text style={styles.title}>Kết quả bài test</Text>
              <Text style={styles.subtitle}>Một góc nhìn nhẹ nhàng để bạn hiểu mình hơn.</Text>
            </View>
          </View>

          <View style={[styles.resultGrid, !isWebDesktop && styles.resultGridMobile]}>
            <View style={styles.resultCard}>
              <Text style={styles.emoji}>{getEmoji(result)}</Text>

              <Text style={styles.testTitle}>{result?.testTitle || "Emotional Check"}</Text>
              <Text style={styles.score}>{getScoreLabel(result)}</Text>
              <Text style={styles.levelLabel}>{result?.levelLabel || "Emotional well-being"}</Text>
              <Text style={styles.message}>{getResultMessage(result)}</Text>

              <View style={styles.scoreBar}>
                <View style={styles.scoreBarFill} />
              </View>
            </View>

            <View style={styles.sideStack}>
              <View style={styles.suggestionCard}>
                <Text style={styles.cardTitle}>Gợi ý cho bạn</Text>
                <Text style={styles.cardText}>
                  {result?.suggestion ||
                    "Hãy dành một chút thời gian nghỉ ngơi, hít thở sâu hoặc viết nhật ký cảm xúc."}
                </Text>
              </View>

              <View style={styles.warningCard}>
                <Text style={styles.warningTitle}>Lưu ý an toàn</Text>
                <Text style={styles.warningText}>
                  {result?.disclaimer ||
                    "Kết quả này chỉ nhằm hỗ trợ bạn tự nhìn lại trạng thái cảm xúc, không phải chẩn đoán y khoa hoặc thay thế chuyên gia tâm lý."}
                </Text>
              </View>

              <View style={styles.actionCard}>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => router.push("/ai-chat" as any)}
                  activeOpacity={0.88}
                >
                  <Text style={styles.primaryButtonText}>Trò chuyện với SOUL AI</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => router.push("/diary" as any)}
                  activeOpacity={0.88}
                >
                  <Text style={styles.secondaryButtonText}>Viết nhật ký cảm xúc</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.homeButton}
                  onPress={() => router.push("/emotional-test" as any)}
                  activeOpacity={0.88}
                >
                  <Text style={styles.homeButtonText}>Quay lại danh sách bài test</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ height: 80 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const softShadow = Platform.select({
  web: { boxShadow: "0 18px 48px rgba(15, 23, 42, 0.07)" },
  ios: { shadowColor: "#7C3AED", shadowOpacity: 0.1, shadowRadius: 18, shadowOffset: { width: 0, height: 8 } },
  android: { elevation: 3 },
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
    maxWidth: 1120,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "web" ? 28 : 12,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDE9FE",
  },
  backText: {
    fontSize: 34,
    lineHeight: 36,
    color: "#7C3AED",
    fontWeight: "900",
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    color: "#1E1538",
    fontSize: Platform.OS === "web" ? 32 : 22,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 4,
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 20,
  },
  resultGrid: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 22,
  },
  resultGridMobile: {
    flexDirection: "column",
  },
  resultCard: {
    flex: 1.2,
    minHeight: 480,
    backgroundColor: "#FFFFFF",
    borderRadius: 34,
    padding: 34,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    ...softShadow,
  },
  emoji: {
    fontSize: 86,
    marginBottom: 14,
  },
  testTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#1D1B38",
    textAlign: "center",
    marginBottom: 10,
  },
  score: {
    fontSize: Platform.OS === "web" ? 64 : 48,
    fontWeight: "900",
    color: "#7C3AED",
    letterSpacing: -1.5,
  },
  levelLabel: {
    marginTop: 6,
    fontSize: 22,
    fontWeight: "900",
    color: "#1D1B38",
    textAlign: "center",
  },
  message: {
    marginTop: 14,
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 23,
    maxWidth: 520,
  },
  scoreBar: {
    width: "100%",
    maxWidth: 420,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#EDE9FE",
    marginTop: 28,
    overflow: "hidden",
  },
  scoreBarFill: {
    width: "68%",
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#7C3AED",
  },
  sideStack: {
    width: Platform.OS === "web" ? 360 : "100%",
    gap: 16,
  },
  suggestionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    ...softShadow,
  },
  warningCard: {
    backgroundColor: "#FFFBEB",
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    ...softShadow,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#1D1B38",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 22,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#92400E",
    marginBottom: 10,
  },
  warningText: {
    fontSize: 13,
    color: "#78350F",
    lineHeight: 20,
  },
  primaryButton: {
    height: 52,
    borderRadius: 999,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      web: { boxShadow: "0 14px 30px rgba(124, 58, 237, 0.28)" },
      android: { elevation: 4 },
    }),
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
  secondaryButton: {
    marginTop: 12,
    height: 52,
    borderRadius: 999,
    backgroundColor: "#F5F3FF",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#7C3AED",
    fontSize: 14,
    fontWeight: "900",
  },
  homeButton: {
    marginTop: 10,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  homeButtonText: {
    color: "#4B5563",
    fontSize: 13,
    fontWeight: "800",
  },
});
