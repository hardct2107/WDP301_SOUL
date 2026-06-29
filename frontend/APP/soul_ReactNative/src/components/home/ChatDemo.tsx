import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "@/styles/home.styles";

export function ChatDemo() {
  return (
    <View style={styles.chatDemoCard}>
      {/* Header */}
      <LinearGradient
        colors={["#7C3AED", "#6366F1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.chatDemoHeader}
      >
        <View style={styles.chatDemoAvatar}>
          <MaterialCommunityIcons name="robot-outline" size={24} color="#FFFFFF" />
        </View>
        <View>
          <Text style={styles.chatDemoTitle}>SOUL AI</Text>
          <Text style={styles.chatDemoStatus}>● Đang hoạt động</Text>
        </View>
      </LinearGradient>

      {/* Body */}
      <View style={styles.chatDemoBody}>
        <View style={styles.chatBubbleAi}>
          <Text style={styles.chatTextAi}>
            Chào bạn, dạo này bạn cảm thấy thế nào? Có chuyện gì muốn kể cho mình nghe không?
          </Text>
        </View>

        <LinearGradient
          colors={["#A855F7", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.chatBubbleUser}
        >
          <Text style={styles.chatTextUser}>
            Hôm nay công việc hơi áp lực, mình cảm thấy khá mệt mỏi...
          </Text>
        </LinearGradient>

        <View style={styles.chatTyping}>
          <View style={styles.typingDot} />
          <View style={[styles.typingDot, { opacity: 0.7 }]} />
          <View style={[styles.typingDot, { opacity: 0.4 }]} />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.chatDemoFooter}>
        <View style={styles.chatDemoInput}>
          <Text style={[styles.chatDemoInputText, { marginTop: 10 }]}>Nhập tin nhắn...</Text>
        </View>
        <TouchableOpacity style={styles.chatDemoSend} activeOpacity={0.8}>
          <MaterialCommunityIcons name="send" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
