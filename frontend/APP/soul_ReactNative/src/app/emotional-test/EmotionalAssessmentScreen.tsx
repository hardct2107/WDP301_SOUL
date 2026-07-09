import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

import {
  AnswerOption,
  EmotionalAnswer,
  EmotionalQuestion,
  getEmotionalTestQuestions,
  submitEmotionalTest,
  TestType,
} from "../../api/emotionalTestApi";

type Props = {
  route?: {
    params?: {
      testType?: TestType;
    };
  };
  navigation?: any;
};

export default function EmotionalAssessmentScreen({ navigation }: Props) {
  const params = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const isWebDesktop = Platform.OS === "web" && width >= 900;

  const testType = Array.isArray(params.testType)
    ? (params.testType[0] as TestType)
    : ((params.testType as TestType) || "WHO5");

  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [questions, setQuestions] = useState<EmotionalQuestion[]>([]);
  const [answerOptions, setAnswerOptions] = useState<AnswerOption[]>([]);
  const [description, setDescription] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const totalAnswered = useMemo(() => Object.keys(answers).length, [answers]);
  const progress = questions.length ? totalAnswered / questions.length : 0;

  useEffect(() => {
    loadQuestions();
  }, [testType]);

  async function loadQuestions() {
    try {
      setLoading(true);
      setAnswers({});

      const data = await getEmotionalTestQuestions(testType);

      setTitle(data.title);
      setSource(data.source);
      setQuestions(data.questions);
      setAnswerOptions(data.answerOptions);
      setDescription(data.description);
      setDisclaimer(data.disclaimer);
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Không thể tải câu hỏi.");
    } finally {
      setLoading(false);
    }
  }

  function selectAnswer(questionId: number, score: number) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: score,
    }));
  }

  async function handleSubmit() {
    if (totalAnswered !== questions.length) {
      Alert.alert("Chưa hoàn thành", "Bạn vui lòng trả lời đủ tất cả câu hỏi.");
      return;
    }

    try {
      setSubmitting(true);

      const payload: EmotionalAnswer[] = questions.map((question) => ({
        questionId: question.id,
        score: answers[question.id],
      }));

      const result = await submitEmotionalTest(testType, payload);

      router.push({
        pathname: "/emotional-test/result" as any,
        params: {
          result: JSON.stringify(result),
        },
      });
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Không thể nộp bài kiểm tra.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <LinearGradient colors={["#F8F5FF", "#FFFFFF", "#F0FDFA"]} style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={styles.loadingText}>Đang tải câu hỏi...</Text>
      </LinearGradient>
    );
  }

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

            <View style={styles.topTitleWrap}>
              <Text style={styles.title}>{title || "Emotional Assessment"}</Text>
              <Text style={styles.subtitle}>
                {totalAnswered}/{questions.length} câu đã trả lời
              </Text>
            </View>

            <View style={styles.progressPill}>
              <Text style={styles.progressPillText}>{Math.round(progress * 100)}%</Text>
            </View>
          </View>

          <View style={[styles.assessmentGrid, !isWebDesktop && styles.assessmentGridMobile]}>
            <View style={styles.sidebar}>
              <Text style={styles.heroIcon}>{testType === "WHO5" ? "🧘‍♀️" : "📘"}</Text>
              <Text style={styles.infoTitle}>Hướng dẫn</Text>
              <Text style={styles.infoText}>{description}</Text>
              <Text style={styles.sourceText}>{source}</Text>
              <Text style={styles.disclaimer}>{disclaimer}</Text>

              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
              </View>
            </View>

            <View style={styles.questionList}>
              {questions.map((question, index) => (
                <View key={question.id} style={styles.questionCard}>
                  <View style={styles.questionHeader}>
                    <View style={styles.numberBox}>
                      <Text style={styles.numberText}>{index + 1}</Text>
                    </View>

                    <Text style={styles.questionText}>{question.text}</Text>
                  </View>

                  {question.reverseScore ? (
                    <Text style={styles.reverseNote}>
                      Câu này được đảo điểm khi tính kết quả.
                    </Text>
                  ) : null}

                  <View style={styles.optionsBox}>
                    {answerOptions.map((option) => {
                      const selected = answers[question.id] === option.value;

                      return (
                        <TouchableOpacity
                          key={option.value}
                          style={[styles.optionRow, selected && styles.optionRowSelected]}
                          onPress={() => selectAnswer(question.id, option.value)}
                          activeOpacity={0.86}
                        >
                          <View style={[styles.radio, selected && styles.radioSelected]}>
                            {selected ? <View style={styles.radioDot} /> : null}
                          </View>

                          <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  totalAnswered !== questions.length && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={submitting}
                activeOpacity={0.85}
              >
                {submitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitText}>
                    Xem kết quả ({totalAnswered}/{questions.length})
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 70 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const softShadow = Platform.select({
  web: { boxShadow: "0 18px 48px rgba(15, 23, 42, 0.07)" },
  ios: { shadowColor: "#7C3AED", shadowOpacity: 0.09, shadowRadius: 18, shadowOffset: { width: 0, height: 8 } },
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
    maxWidth: 1180,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "web" ? 28 : 12,
  },
  loadingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#4B4774",
    fontWeight: "800",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 22,
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
  topTitleWrap: {
    flex: 1,
  },
  title: {
    color: "#1E1538",
    fontSize: Platform.OS === "web" ? 28 : 20,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 3,
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "700",
  },
  progressPill: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "#EDE9FE",
  },
  progressPillText: {
    color: "#7C3AED",
    fontSize: 13,
    fontWeight: "900",
  },
  assessmentGrid: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 22,
  },
  assessmentGridMobile: {
    flexDirection: "column",
  },
  sidebar: {
    width: Platform.OS === "web" ? 330 : "100%",
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    padding: 24,
    ...softShadow,
    ...Platform.select({
      web: {
        position: "sticky" as any,
        top: 18,
      },
    }),
  },
  heroIcon: {
    fontSize: 70,
    marginBottom: 14,
  },
  infoTitle: {
    color: "#1D1B38",
    fontSize: 18,
    fontWeight: "900",
  },
  infoText: {
    marginTop: 10,
    color: "#4B5563",
    fontSize: 14,
    lineHeight: 22,
  },
  sourceText: {
    marginTop: 14,
    color: "#7C3AED",
    fontSize: 12,
    fontWeight: "900",
  },
  disclaimer: {
    marginTop: 12,
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 18,
  },
  progressTrack: {
    marginTop: 22,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#EDE9FE",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#7C3AED",
  },
  questionList: {
    flex: 1,
    width: "100%",
  },
  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    ...softShadow,
  },
  questionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 14,
  },
  numberBox: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 13,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "900",
    color: "#1D1B38",
    lineHeight: 23,
  },
  reverseNote: {
    marginBottom: 12,
    fontSize: 12,
    color: "#7C3AED",
    fontWeight: "800",
  },
  optionsBox: {
    gap: 10,
  },
  optionRow: {
    minHeight: 46,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  optionRowSelected: {
    backgroundColor: "#F5F3FF",
    borderColor: "#7C3AED",
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#C4B5FD",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: "#7C3AED",
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#7C3AED",
  },
  optionText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
    lineHeight: 20,
  },
  optionTextSelected: {
    color: "#5B21B6",
    fontWeight: "900",
  },
  submitButton: {
    marginTop: 8,
    height: 56,
    borderRadius: 999,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      web: { boxShadow: "0 14px 32px rgba(124, 58, 237, 0.28)" },
      android: { elevation: 4 },
    }),
  },
  submitButtonDisabled: {
    backgroundColor: "#C4B5FD",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
});
