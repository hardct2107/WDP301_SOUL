import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { styles as homeStyles } from "@/styles/home.styles";
import {
  createChatSession,
  sendMessageToSession,
  type ChatMessage,
} from "@/services/aiApi";

const webFont = Platform.select({
  web: "'Inter', system-ui, sans-serif",
  default: undefined,
});
const displayFont = Platform.select({
  web: "'Lexend', 'Inter', system-ui",
  default: undefined,
});

export function ChatDemo() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  // Khởi tạo session khi component mount
  useEffect(() => {
    (async () => {
      try {
        setSessionLoading(true);
        const session = await createChatSession();
        setSessionId(session._id);
        // Tin nhắn chào mặc định từ AI
        setMessages([
          {
            _id: "welcome",
            sessionId: session._id,
            role: "assistant",
            content:
              "Chào bạn 👋 Mình là SOUL AI — người bạn đồng hành chăm sóc sức khỏe tâm thần. Dạo này bạn cảm thấy thế nào? Có điều gì muốn kể cho mình nghe không?",
            createdAt: new Date().toISOString(),
          },
        ]);
      } catch (e: any) {
        setError("Không thể kết nối AI. Vui lòng đăng nhập để trò chuyện.");
      } finally {
        setSessionLoading(false);
      }
    })();
  }, []);

  // Auto scroll khi có tin nhắn mới
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !sessionId || loading) return;

    const userText = input.trim();
    setInput("");
    setLoading(true);

    // Thêm tin nhắn user ngay lập tức (optimistic UI)
    const tempUserMsg: ChatMessage = {
      _id: `temp-user-${Date.now()}`,
      sessionId,
      role: "user",
      content: userText,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const result = await sendMessageToSession(sessionId, userText);
      // Thay temp message bằng response thật
      setMessages((prev) => {
        const filtered = prev.filter((m) => m._id !== tempUserMsg._id);
        return [
          ...filtered,
          result.userMessage as ChatMessage,
          result.assistantMessage as ChatMessage,
        ];
      });
    } catch (e: any) {
      setMessages((prev) => prev.filter((m) => m._id !== tempUserMsg._id));
      setError("Gửi tin nhắn thất bại. Thử lại nhé!");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={homeStyles.chatDemoCard}>
      {/* Header */}
      <LinearGradient
        colors={["#7C3AED", "#6366F1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={homeStyles.chatDemoHeader}
      >
        <View style={homeStyles.chatDemoAvatar}>
          <MaterialCommunityIcons
            name="robot-outline"
            size={24}
            color="#FFFFFF"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={homeStyles.chatDemoTitle}>SOUL AI</Text>
          <Text style={homeStyles.chatDemoStatus}>
            {sessionLoading ? "⏳ Đang kết nối..." : "● Đang hoạt động"}
          </Text>
        </View>
        {/* Chip nhỏ */}
        <View style={localStyles.chip}>
          <MaterialCommunityIcons name="shield-check" size={12} color="#C4B5FD" />
          <Text style={localStyles.chipText}>Bảo mật</Text>
        </View>
      </LinearGradient>

      {/* Body – messages */}
      <ScrollView
        ref={scrollRef}
        style={localStyles.body}
        contentContainerStyle={localStyles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {sessionLoading ? (
          <View style={localStyles.centered}>
            <ActivityIndicator color="#7C3AED" />
            <Text style={localStyles.loadingText}>Đang khởi động AI...</Text>
          </View>
        ) : (
          <>
            {messages.map((msg) => {
              const isAi = msg.role === "assistant";
              return isAi ? (
                <View key={msg._id} style={localStyles.aiRow}>
                  <View style={localStyles.aiIcon}>
                    <MaterialCommunityIcons
                      name="robot-outline"
                      size={14}
                      color="#7C3AED"
                    />
                  </View>
                  <View style={homeStyles.chatBubbleAi}>
                    <Text style={homeStyles.chatTextAi}>{msg.content}</Text>
                  </View>
                </View>
              ) : (
                <LinearGradient
                  key={msg._id}
                  colors={["#A855F7", "#7C3AED"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={homeStyles.chatBubbleUser}
                >
                  <Text style={homeStyles.chatTextUser}>{msg.content}</Text>
                </LinearGradient>
              );
            })}

            {/* Typing indicator */}
            {loading && (
              <View style={localStyles.aiRow}>
                <View style={localStyles.aiIcon}>
                  <MaterialCommunityIcons
                    name="robot-outline"
                    size={14}
                    color="#7C3AED"
                  />
                </View>
                <View style={homeStyles.chatTyping}>
                  <View style={[homeStyles.typingDot, localStyles.dotAnim1]} />
                  <View style={[homeStyles.typingDot, localStyles.dotAnim2]} />
                  <View style={[homeStyles.typingDot, localStyles.dotAnim3]} />
                </View>
              </View>
            )}

            {/* Error toast */}
            {error && (
              <View style={localStyles.errorToast}>
                <MaterialCommunityIcons
                  name="alert-circle-outline"
                  size={16}
                  color="#EF4444"
                />
                <Text style={localStyles.errorText}>{error}</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Footer – input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={homeStyles.chatDemoFooter}>
          <TextInput
            style={localStyles.input}
            placeholder="Nhập tin nhắn..."
            placeholderTextColor="#94A3B8"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            returnKeyType="send"
            editable={!sessionLoading && !!sessionId}
            multiline={false}
          />
          <TouchableOpacity
            style={[
              homeStyles.chatDemoSend,
              (!input.trim() || loading || !sessionId) &&
                localStyles.sendDisabled,
            ]}
            onPress={handleSend}
            activeOpacity={0.8}
            disabled={!input.trim() || loading || !sessionId}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <MaterialCommunityIcons name="send" size={18} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  body: {
    maxHeight: 320,
    backgroundColor: "#FAFAFC",
  },
  bodyContent: {
    padding: 16,
    gap: 8,
    paddingBottom: 8,
  },
  centered: {
    alignItems: "center",
    paddingVertical: 32,
    gap: 12,
  },
  loadingText: {
    color: "#94A3B8",
    fontSize: 13,
    fontFamily: webFont,
  },
  aiRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginBottom: 4,
    alignSelf: "flex-start",
    maxWidth: "90%",
  },
  aiIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  chipText: {
    color: "#E9D5FF",
    fontSize: 11,
    fontWeight: "600",
    fontFamily: webFont,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 12,
    color: "#1E293B",
    fontSize: 14,
    fontFamily: webFont,
    ...Platform.select({
      web: { outlineStyle: "none" } as any,
      default: {},
    }),
  },
  sendDisabled: {
    opacity: 0.5,
  },
  errorToast: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
    marginTop: 4,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 13,
    flex: 1,
    fontFamily: webFont,
  },
  dotAnim1: { opacity: 1 },
  dotAnim2: { opacity: 0.7 },
  dotAnim3: { opacity: 0.4 },
});
