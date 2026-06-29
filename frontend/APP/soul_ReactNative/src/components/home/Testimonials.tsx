import { ScrollView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "@/styles/home.styles";

const testimonials = [
  {
    id: 1,
    name: "Hải Yến",
    role: "Sinh viên",
    feedback: "Từ ngày dùng SOUL, mình học được cách làm bạn với cảm xúc của chính mình. Ứng dụng như một góc nhỏ bình yên mỗi tối.",
  },
  {
    id: 2,
    name: "Minh Khoa",
    role: "Nhân viên văn phòng",
    feedback: "Tính năng trò chuyện với AI thực sự ấn tượng, đôi khi chỉ cần một người lắng nghe không phán xét là đủ để thấy nhẹ nhõm.",
  },
  {
    id: 3,
    name: "Lan Anh",
    role: "Freelancer",
    feedback: "Bài test tâm lý rất chuẩn, giúp mình nhận ra bản thân đang quá tải để kịp thời điều chỉnh lại công việc.",
  },
];

export function Testimonials() {
  return (
    <View>
      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Hàng ngàn người đã thay đổi</Text>
      <Text style={styles.sectionSub}>Cùng lắng nghe chia sẻ từ cộng đồng SOUL</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.testiScroll}
      >
        {testimonials.map((t) => (
          <View key={t.id} style={styles.testiCard}>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <MaterialCommunityIcons key={i} name="star" size={16} color="#F59E0B" />
              ))}
            </View>
            <Text style={styles.testiText}>"{t.feedback}"</Text>
            
            <View style={styles.testiUserRow}>
              <View style={styles.testiAvatar}>
                <MaterialCommunityIcons name="account" size={24} color="#94A3B8" style={{ alignSelf: "center", marginTop: 8 }} />
              </View>
              <View>
                <Text style={styles.testiName}>{t.name}</Text>
                <Text style={styles.testiRole}>{t.role}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
