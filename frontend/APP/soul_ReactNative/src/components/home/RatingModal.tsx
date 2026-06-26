import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Hiện sau 5 phút (300,000ms) kể từ khi component mount
const DELAY_MS = 5 * 60 * 1000;

const STARS = [1, 2, 3, 4, 5];

const EMOJIS: Record<number, { icon: string; label: string; color: string }> = {
  1: { icon: "😢", label: "Very Poor", color: "#EF4444" },
  2: { icon: "😟", label: "Poor", color: "#F97316" },
  3: { icon: "😐", label: "Okay", color: "#F59E0B" },
  4: { icon: "😊", label: "Good", color: "#14B8A6" },
  5: { icon: "🤩", label: "Excellent!", color: "#7C3AED" },
};

export function RatingModal() {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Animation values
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const starScale = useRef(STARS.map(() => new Animated.Value(1))).current;

  // Mở modal sau 5 phút
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Animation khi modal mở
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // Bounce animation khi chọn sao
  const animateStar = (index: number) => {
    Animated.sequence([
      Animated.timing(starScale[index], {
        toValue: 1.4,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(starScale[index], {
        toValue: 1,
        tension: 80,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleStarPress = (star: number) => {
    setRating(star);
    animateStar(star - 1);
    // Animate all previous stars too
    for (let i = 0; i < star; i++) {
      setTimeout(() => animateStar(i), i * 60);
    }
  };

  const handleSubmit = () => {
    if (rating === 0) return;
    // Ở đây có thể gửi API nếu cần
    console.log("Rating submitted:", { rating, feedback });
    setSubmitted(true);
    setTimeout(() => {
      setVisible(false);
    }, 2500);
  };

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(false));
  };

  const activeMood = EMOJIS[hoveredStar || rating];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      {/* Backdrop */}
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(15, 10, 40, 0.65)",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
        onPress={handleClose}
      >
        {/* Card — ngăn sự kiện nổi lên backdrop */}
        <Pressable onPress={(e) => e.stopPropagation()}>
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
              width: Platform.OS === "web" ? Math.min(440, 600) : "100%",
              borderRadius: 32,
              overflow: "hidden",
              shadowColor: "#7C3AED",
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.35,
              shadowRadius: 30,
              elevation: 20,
            }}
          >
            {submitted ? (
              /* ── Màn hình cảm ơn ── */
              <LinearGradient
                colors={["#7C3AED", "#6366F1", "#14B8A6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 48, alignItems: "center" }}
              >
                <Text style={{ fontSize: 64, marginBottom: 16 }}>🎉</Text>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "800",
                    color: "#FFFFFF",
                    textAlign: "center",
                    letterSpacing: 0.5,
                    fontFamily: Platform.select({ web: "'Lexend','Inter',system-ui", default: undefined }),
                  }}
                >
                  Thank you!
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 15,
                    color: "rgba(255,255,255,0.85)",
                    textAlign: "center",
                    fontFamily: Platform.select({ web: "'Inter',system-ui", default: undefined }),
                  }}
                >
                  Your feedback helps us improve SOUL for everyone 💜
                </Text>
              </LinearGradient>
            ) : (
              /* ── Nội dung đánh giá ── */
              <View style={{ backgroundColor: "#FFFFFF" }}>
                {/* Header gradient */}
                <LinearGradient
                  colors={["#7C3AED", "#6366F1", "#14B8A6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ padding: 28, paddingBottom: 36, position: "relative" }}
                >
                  {/* Decorative blobs */}
                  <View style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: 60, backgroundColor: "rgba(255,255,255,0.07)" }} />
                  <View style={{ position: "absolute", bottom: -15, left: -15, width: 90, height: 90, borderRadius: 45, backgroundColor: "rgba(255,255,255,0.06)" }} />

                  {/* Close button */}
                  <TouchableOpacity
                    onPress={handleClose}
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      width: 34,
                      height: 34,
                      borderRadius: 17,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                    }}
                  >
                    <MaterialCommunityIcons name="close" size={18} color="#FFFFFF" />
                  </TouchableOpacity>

                  {/* Icon */}
                  <View
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: 20,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 14,
                      borderWidth: 1.5,
                      borderColor: "rgba(255,255,255,0.3)",
                    }}
                  >
                    <MaterialCommunityIcons name="star-circle-outline" size={34} color="#FFFFFF" />
                  </View>

                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "800",
                      color: "#FFFFFF",
                      letterSpacing: 0.3,
                      fontFamily: Platform.select({ web: "'Lexend','Inter',system-ui", default: undefined }),
                    }}
                  >
                    How's your experience?
                  </Text>
                  <Text
                    style={{
                      marginTop: 6,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.82)",
                      fontFamily: Platform.select({ web: "'Inter',system-ui", default: undefined }),
                    }}
                  >
                    A quick rating helps us make SOUL better for you 🌿
                  </Text>
                </LinearGradient>

                {/* Body */}
                <View style={{ padding: 28, paddingTop: 24 }}>
                  {/* Mood emoji indicator */}
                  {(hoveredStar > 0 || rating > 0) && activeMood && (
                    <Animated.View
                      style={{
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <Text style={{ fontSize: 44 }}>{activeMood.icon}</Text>
                      <Text
                        style={{
                          marginTop: 4,
                          fontSize: 14,
                          fontWeight: "700",
                          color: activeMood.color,
                          fontFamily: Platform.select({ web: "'Inter',system-ui", default: undefined }),
                        }}
                      >
                        {activeMood.label}
                      </Text>
                    </Animated.View>
                  )}

                  {/* Star row */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 12,
                      marginBottom: 24,
                    }}
                  >
                    {STARS.map((star) => {
                      const filled = star <= (hoveredStar || rating);
                      return (
                        <Animated.View
                          key={star}
                          style={{ transform: [{ scale: starScale[star - 1] }] }}
                        >
                          <TouchableOpacity
                            onPress={() => handleStarPress(star)}
                            onPressIn={() => setHoveredStar(star)}
                            onPressOut={() => setHoveredStar(0)}
                            activeOpacity={0.8}
                            style={{ padding: 4 }}
                          >
                            <MaterialCommunityIcons
                              name={filled ? "star" : "star-outline"}
                              size={44}
                              color={filled ? "#F59E0B" : "#CBD5E1"}
                            />
                          </TouchableOpacity>
                        </Animated.View>
                      );
                    })}
                  </View>

                  {/* Feedback text input */}
                  <View
                    style={{
                      backgroundColor: "#F8FAFF",
                      borderRadius: 16,
                      borderWidth: 1.5,
                      borderColor: rating > 0 ? "#C4B5FD" : "#E2E8F0",
                      padding: 14,
                      marginBottom: 20,
                    }}
                  >
                    <TextInput
                      value={feedback}
                      onChangeText={setFeedback}
                      placeholder="Share more details... (optional)"
                      placeholderTextColor="#94A3B8"
                      multiline
                      numberOfLines={3}
                      maxLength={300}
                      style={{
                        fontSize: 14,
                        color: "#1E293B",
                        minHeight: 72,
                        textAlignVertical: "top",
                        fontFamily: Platform.select({ web: "'Inter',system-ui", default: undefined }),
                        outlineStyle: "none",
                      } as any}
                    />
                    <Text
                      style={{
                        textAlign: "right",
                        fontSize: 11,
                        color: "#94A3B8",
                        marginTop: 4,
                        fontFamily: Platform.select({ web: "'Inter',system-ui", default: undefined }),
                      }}
                    >
                      {feedback.length}/300
                    </Text>
                  </View>

                  {/* Submit button */}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={rating === 0}
                    style={{ borderRadius: 18, overflow: "hidden", opacity: rating === 0 ? 0.45 : 1 }}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={["#7C3AED", "#14B8A6"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        paddingVertical: 16,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        gap: 8,
                      }}
                    >
                      <MaterialCommunityIcons name="send-outline" size={20} color="#FFFFFF" />
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "700",
                          color: "#FFFFFF",
                          letterSpacing: 0.3,
                          fontFamily: Platform.select({ web: "'Lexend','Inter',system-ui", default: undefined }),
                        }}
                      >
                        Submit Review
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* Skip */}
                  <TouchableOpacity onPress={handleClose} style={{ alignItems: "center", marginTop: 14 }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#94A3B8",
                        fontFamily: Platform.select({ web: "'Inter',system-ui", default: undefined }),
                      }}
                    >
                      Maybe later
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
