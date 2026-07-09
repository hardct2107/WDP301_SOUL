import { ScrollView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "@/styles/home.styles";

const testimonials = [
  {
    id: 1,
    name: "Người dùng SOUL",
    role: "Nhật ký cảm xúc",
    feedback: "Tôi có thể ghi lại mood, điểm cảm xúc và xem lại các ghi chú của mình theo thời gian.",
  },
  {
    id: 2,
    name: "Thành viên cộng đồng",
    role: "Forum ẩn danh",
    feedback: "Tôi có thể chia sẻ ẩn danh, nhận reaction hỗ trợ và report nội dung chưa phù hợp.",
  },
  {
    id: 3,
    name: "Người tham gia sự kiện",
    role: "Rating sau điểm danh",
    feedback: "Sau khi được xác nhận tham dự, tôi có thể gửi đánh giá sao và bình luận cho sự kiện.",
  },
];

export function Testimonials() {
  return (
    <View>
      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Các trải nghiệm chính trong SOUL</Text>
      <Text style={styles.sectionSub}>
        Nội dung minh họa dựa trên chức năng thật của dự án, không phải số liệu tác động lâm sàng.
      </Text>

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
            <Text style={styles.testiText}>{t.feedback}</Text>

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
