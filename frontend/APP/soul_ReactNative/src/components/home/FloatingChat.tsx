import { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

// ─── Web-only injected CSS for animations ────────────────────────────────────
if (Platform.OS === "web" && typeof document !== "undefined") {
  const styleId = "soul-floating-chat-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
    @keyframes soul-fade-in {
      from { opacity: 0; transform: scale(0.92) translateY(16px); }
      to   { opacity: 1; transform: scale(1)    translateY(0); }
    }
    @keyframes soul-dot-bounce {
      0%, 80%, 100% { transform: translateY(0); }
      40%            { transform: translateY(-6px); }
    }
    .soul-chat-window {
      animation: soul-fade-in 0.22s cubic-bezier(0.16,1,0.3,1) both;
    }
    .soul-dot-1 { animation: soul-dot-bounce 1.2s infinite 0.0s; }
    .soul-dot-2 { animation: soul-dot-bounce 1.2s infinite 0.2s; }
    .soul-dot-3 { animation: soul-dot-bounce 1.2s infinite 0.4s; }
    .soul-fab:hover { transform: scale(1.08); }
    .soul-fab { transition: transform 0.18s ease; }
  `;
    document.head.appendChild(style);
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface FloatingChatProps {
  /** Nhận từ ngoài để biết user đã login chưa (tùy chọn) */
  isLoggedIn?: boolean;
  /** Trigger mở chat từ bên ngoài (ví dụ: HeroCard button) */
  defaultOpen?: boolean;
  /** Callback khi chat đóng lại */
  onOpenChange?: (open: boolean) => void;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function FloatingChat({ isLoggedIn = true, defaultOpen = false, onOpenChange }: FloatingChatProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Sync với defaultOpen từ parent (khi HeroCard bấm "Bắt đầu")
  useEffect(() => {
    if (defaultOpen && !open) {
      handleOpen();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultOpen]);

  // Khởi tạo chat session lần đầu mở
  const initSession = async () => {
    if (sessionId) return;
    try {
      setSessionLoading(true);
      const session = await createChatSession();
      setSessionId(session._id);
      setMessages([
        {
          _id: "welcome",
          sessionId: session._id,
          role: "assistant",
          content:
            "Xin chào! Mình là SOUL AI 👋\nMình ở đây để lắng nghe và đồng hành cùng bạn. Bạn đang cảm thấy thế nào hôm nay?",
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch {
      setError("Không thể kết nối. Vui lòng đăng nhập.");
    } finally {
      setSessionLoading(false);
    }
  };

  const handleOpen = () => {
    // FAB press animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.88,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    setOpen(true);
    setHasUnread(false);
    initSession();
  };

  const handleClose = () => setOpen(false);

  // Auto scroll
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !sessionId || loading) return;

    const userText = input.trim();
    setInput("");
    setLoading(true);

    const tempId = `temp-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        _id: tempId,
        sessionId: sessionId!,
        role: "user",
        content: userText,
        createdAt: new Date().toISOString(),
      },
    ]);

    try {
      const result = await sendMessageToSession(sessionId!, userText);
      setMessages((prev) => {
        const filtered = prev.filter((m) => m._id !== tempId);
        return [
          ...filtered,
          result.userMessage as ChatMessage,
          result.assistantMessage as ChatMessage,
        ];
      });
    } catch {
      setMessages((prev) => prev.filter((m) => m._id !== tempId));
      setError("Gửi thất bại. Thử lại nhé!");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  // ─── Web: render fixed overlay (no Modal needed) ─────────────────────────
  if (Platform.OS === "web") {
    return (
      <>
        {/* Overlay backdrop */}
        {open && (
          <Pressable
            onPress={handleClose}
            style={webStyles.backdrop as any}
          />
        )}

        {/* Chat Window */}
        {open && (
          <View
            style={webStyles.chatWindow as any}
            // @ts-ignore
            className="soul-chat-window"
          >
            {/* Header */}
            <LinearGradient
              colors={["#7C3AED", "#6366F1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={s.header}
            >
              <View style={s.headerLeft}>
                <View style={s.aiAvatar}>
                  <MaterialCommunityIcons
                    name="robot-outline"
                    size={20}
                    color="#fff"
                  />
                </View>
                <View>
                  <Text style={s.headerTitle}>SOUL AI</Text>
                  <Text style={s.headerSub}>
                    {sessionLoading ? "⏳ Đang kết nối..." : "● Đang hoạt động"}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleClose} style={s.closeBtn}>
                <MaterialCommunityIcons name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>

            {/* Messages */}
            <ScrollView
              ref={scrollRef}
              style={s.msgList}
              contentContainerStyle={s.msgContent}
              showsVerticalScrollIndicator={false}
            >
              {sessionLoading ? (
                <View style={s.centered}>
                  <ActivityIndicator color="#7C3AED" />
                  <Text style={s.loadText}>Đang khởi động AI...</Text>
                </View>
              ) : (
                <>
                  {messages.map((msg) =>
                    msg.role === "assistant" ? (
                      <View key={msg._id} style={s.aiRow}>
                        <View style={s.aiDot}>
                          <MaterialCommunityIcons
                            name="robot-outline"
                            size={12}
                            color="#7C3AED"
                          />
                        </View>
                        <View style={s.aiBubble}>
                          <Text style={s.aiText}>{msg.content}</Text>
                        </View>
                      </View>
                    ) : (
                      <View key={msg._id} style={s.userRow}>
                        <LinearGradient
                          colors={["#A855F7", "#7C3AED"]}
                          style={s.userBubble}
                        >
                          <Text style={s.userText}>{msg.content}</Text>
                        </LinearGradient>
                      </View>
                    )
                  )}

                  {/* Typing dots */}
                  {loading && (
                    <View style={s.aiRow}>
                      <View style={s.aiDot}>
                        <MaterialCommunityIcons
                          name="robot-outline"
                          size={12}
                          color="#7C3AED"
                        />
                      </View>
                      <View style={s.typingBubble}>
                        {/* @ts-ignore */}
                        <span className="soul-dot-1" style={dotStyle} />
                        {/* @ts-ignore */}
                        <span className="soul-dot-2" style={dotStyle} />
                        {/* @ts-ignore */}
                        <span className="soul-dot-3" style={dotStyle} />
                      </View>
                    </View>
                  )}

                  {error && (
                    <View style={s.errorToast}>
                      <MaterialCommunityIcons
                        name="alert-circle-outline"
                        size={14}
                        color="#EF4444"
                      />
                      <Text style={s.errorText}>{error}</Text>
                    </View>
                  )}
                </>
              )}
            </ScrollView>

            {/* Input */}
            <View style={s.inputRow}>
              <TextInput
                style={s.textInput as any}
                placeholder="Nhập tin nhắn..."
                placeholderTextColor="#94A3B8"
                value={input}
                onChangeText={setInput}
                onSubmitEditing={handleSend}
                returnKeyType="send"
                editable={!sessionLoading && !!sessionId}
              />
              <TouchableOpacity
                style={[s.sendBtn, (!input.trim() || loading) && s.sendDisabled]}
                onPress={handleSend}
                disabled={!input.trim() || loading || !sessionId}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <MaterialCommunityIcons name="send" size={16} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* FAB Button */}
        <TouchableOpacity
          // @ts-ignore
          className="soul-fab"
          style={webStyles.fab as any}
          onPress={open ? handleClose : handleOpen}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={["#7C3AED", "#A855F7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.fabInner}
          >
            <MaterialCommunityIcons
              name={open ? "close" : "robot-outline"}
              size={26}
              color="#fff"
            />
          </LinearGradient>
          {hasUnread && !open && <View style={s.unreadDot} />}
          {!open && (
            <View style={s.fabLabel}>
              <Text style={s.fabLabelText}>SOUL AI</Text>
            </View>
          )}
        </TouchableOpacity>
      </>
    );
  }

  // ─── Mobile: use Modal ────────────────────────────────────────────────────
  return (
    <>
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <Pressable style={s.mobileBackdrop} onPress={handleClose} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={s.mobileWindowWrap}
          pointerEvents="box-none"
        >
          <View style={s.mobileWindow}>
            {/* Header */}
            <LinearGradient
              colors={["#7C3AED", "#6366F1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={s.header}
            >
              <View style={s.headerLeft}>
                <View style={s.aiAvatar}>
                  <MaterialCommunityIcons
                    name="robot-outline"
                    size={20}
                    color="#fff"
                  />
                </View>
                <View>
                  <Text style={s.headerTitle}>SOUL AI</Text>
                  <Text style={s.headerSub}>
                    {sessionLoading ? "⏳ Đang kết nối..." : "● Đang hoạt động"}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleClose} style={s.closeBtn}>
                <MaterialCommunityIcons name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>

            {/* Messages */}
            <ScrollView
              ref={scrollRef}
              style={s.msgList}
              contentContainerStyle={s.msgContent}
              showsVerticalScrollIndicator={false}
            >
              {sessionLoading ? (
                <View style={s.centered}>
                  <ActivityIndicator color="#7C3AED" />
                  <Text style={s.loadText}>Đang khởi động AI...</Text>
                </View>
              ) : (
                <>
                  {messages.map((msg) =>
                    msg.role === "assistant" ? (
                      <View key={msg._id} style={s.aiRow}>
                        <View style={s.aiDot}>
                          <MaterialCommunityIcons
                            name="robot-outline"
                            size={12}
                            color="#7C3AED"
                          />
                        </View>
                        <View style={s.aiBubble}>
                          <Text style={s.aiText}>{msg.content}</Text>
                        </View>
                      </View>
                    ) : (
                      <View key={msg._id} style={s.userRow}>
                        <LinearGradient
                          colors={["#A855F7", "#7C3AED"]}
                          style={s.userBubble}
                        >
                          <Text style={s.userText}>{msg.content}</Text>
                        </LinearGradient>
                      </View>
                    )
                  )}
                  {loading && (
                    <View style={s.aiRow}>
                      <View style={s.aiDot}>
                        <MaterialCommunityIcons
                          name="robot-outline"
                          size={12}
                          color="#7C3AED"
                        />
                      </View>
                      <View style={s.typingBubble}>
                        <View style={[s.dot, { opacity: 1 }]} />
                        <View style={[s.dot, { opacity: 0.65 }]} />
                        <View style={[s.dot, { opacity: 0.35 }]} />
                      </View>
                    </View>
                  )}
                  {error && (
                    <View style={s.errorToast}>
                      <MaterialCommunityIcons
                        name="alert-circle-outline"
                        size={14}
                        color="#EF4444"
                      />
                      <Text style={s.errorText}>{error}</Text>
                    </View>
                  )}
                </>
              )}
            </ScrollView>

            {/* Input */}
            <View style={s.inputRow}>
              <TextInput
                style={s.textInput}
                placeholder="Nhập tin nhắn..."
                placeholderTextColor="#94A3B8"
                value={input}
                onChangeText={setInput}
                onSubmitEditing={handleSend}
                returnKeyType="send"
                editable={!sessionLoading && !!sessionId}
              />
              <TouchableOpacity
                style={[s.sendBtn, (!input.trim() || loading) && s.sendDisabled]}
                onPress={handleSend}
                disabled={!input.trim() || loading || !sessionId}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <MaterialCommunityIcons name="send" size={16} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* FAB */}
      <Animated.View style={[s.mobileFab, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity onPress={open ? handleClose : handleOpen} activeOpacity={0.85}>
          <LinearGradient
            colors={["#7C3AED", "#A855F7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.fabInner}
          >
            <MaterialCommunityIcons
              name={open ? "close" : "robot-outline"}
              size={26}
              color="#fff"
            />
          </LinearGradient>
          {hasUnread && !open && <View style={s.unreadDot} />}
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

// ─── Web-specific position styles (fixed) ─────────────────────────────────────
const webStyles = {
  fab: {
    position: "fixed" as any,
    bottom: 32,
    right: 32,
    zIndex: 9999,
    flexDirection: "row" as any,
    alignItems: "center" as any,
    gap: 8,
    cursor: "pointer",
  },
  backdrop: {
    position: "fixed" as any,
    inset: 0,
    backgroundColor: "rgba(15, 10, 30, 0.45)",
    backdropFilter: "blur(4px)",
    zIndex: 9997,
  },
  chatWindow: {
    position: "fixed" as any,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)" as any,
    width: 460,
    maxWidth: "calc(100vw - 48px)",
    height: 580,
    maxHeight: "calc(100vh - 80px)",
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    boxShadow: "0 32px 80px rgba(124,58,237,0.25), 0 0 0 1px rgba(124,58,237,0.08)",
    zIndex: 9998,
    display: "flex",
    flexDirection: "column" as any,
  },
};

const dotStyle: React.CSSProperties = {
  display: "inline-block",
  width: 7,
  height: 7,
  borderRadius: "50%",
  backgroundColor: "#C4B5FD",
  margin: "0 2px",
};

// ─── Shared StyleSheet ────────────────────────────────────────────────────────
const s = StyleSheet.create({
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
    fontFamily: displayFont,
  },
  headerSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 11,
    marginTop: 1,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  // Messages
  msgList: {
    flex: 1,
    backgroundColor: "#F8F7FF",
  },
  msgContent: {
    padding: 16,
    paddingBottom: 8,
    gap: 8,
  },
  centered: {
    alignItems: "center",
    paddingVertical: 40,
    gap: 12,
  },
  loadText: {
    color: "#94A3B8",
    fontSize: 13,
    fontFamily: webFont,
  },
  aiRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    alignSelf: "flex-start",
    maxWidth: "88%",
    marginBottom: 2,
    // Đảm bảo không vượt container
    flexShrink: 1,
  },
  aiDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  aiBubble: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    // Cho phép bubble co lại và xuống dòng
    flexShrink: 1,
    flexWrap: "wrap",
    ...Platform.select({
      web: { boxShadow: "0 2px 8px rgba(0,0,0,0.05)" } as any,
      ios: { shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 1 },
      default: {},
    }),
  },
  aiText: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 21,
    fontFamily: webFont,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  userRow: {
    alignSelf: "flex-end",
    maxWidth: "80%",
    marginBottom: 2,
    flexShrink: 1,
  },
  userBubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    borderBottomRightRadius: 4,
    flexShrink: 1,
  },
  userText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 21,
    fontFamily: webFont,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  typingBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    gap: 4,
    ...Platform.select({
      web: { boxShadow: "0 2px 8px rgba(0,0,0,0.05)" } as any,
      default: {},
    }),
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#C4B5FD",
  },
  errorToast: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FEF2F2",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    flex: 1,
    fontFamily: webFont,
  },

  // Input bar
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.04)",
    gap: 10,
  },
  textInput: {
    flex: 1,
    height: 42,
    backgroundColor: "#F1F5F9",
    borderRadius: 21,
    paddingHorizontal: 16,
    color: "#1E293B",
    fontSize: 14,
    fontFamily: webFont,
    ...Platform.select({
      web: { outlineStyle: "none" } as any,
      default: {},
    }),
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: { boxShadow: "0 4px 12px rgba(124,58,237,0.35)" } as any,
      default: {},
    }),
  },
  sendDisabled: {
    opacity: 0.45,
  },

  // FAB
  fabInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: { boxShadow: "0 8px 28px rgba(124,58,237,0.45)" } as any,
      ios: { shadowColor: "#7C3AED", shadowOpacity: 0.45, shadowRadius: 16, shadowOffset: { width: 0, height: 8 } },
      android: { elevation: 12 },
      default: {},
    }),
  },
  fabLabel: {
    backgroundColor: "#7C3AED",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    ...Platform.select({
      web: { boxShadow: "0 4px 16px rgba(124,58,237,0.35)" } as any,
      default: {},
    }),
  },
  fabLabelText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: displayFont,
  },
  unreadDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#EF4444",
    borderWidth: 2,
    borderColor: "#fff",
  },

  // Mobile
  mobileFab: {
    position: "absolute",
    bottom: 100,
    right: 20,
    zIndex: 9999,
  },
  mobileBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,10,30,0.45)",
  },
  mobileWindowWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  mobileWindow: {
    width: "100%",
    maxWidth: 440,
    height: 520,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#fff",
    ...Platform.select({
      ios: { shadowColor: "#7C3AED", shadowOpacity: 0.2, shadowRadius: 32, shadowOffset: { width: 0, height: 16 } },
      android: { elevation: 20 },
      default: {},
    }),
  },
});
