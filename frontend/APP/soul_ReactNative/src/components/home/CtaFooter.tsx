import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";

export function CtaFooter() {
  return (
    <View>
      <LinearGradient
        colors={["#7C3AED", "#A855F7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.ctaSection}
      >
        <Text style={styles.ctaTitle}>Bắt đầu chăm sóc{"\n"}cảm xúc theo cách nhẹ nhàng</Text>
        <Text style={styles.ctaSub}>
          Tạo tài khoản để dùng SOUL AI, nhật ký cảm xúc, bài test tự đánh giá, sự kiện và cộng đồng an toàn.
        </Text>

        <View style={styles.ctaInputWrap}>
          <TextInput
            placeholder="Nhập email của bạn..."
            placeholderTextColor="rgba(255,255,255,0.6)"
            style={styles.ctaInput}
          />
          <TouchableOpacity style={styles.ctaBtn}>
            <Text style={styles.ctaBtnText}>Bắt đầu</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.footerWrap}>
        <Text style={styles.footerLogo}>SOUL</Text>

        <View style={styles.footerLinks}>
          <TouchableOpacity><Text style={styles.footerLink}>SOUL AI</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.footerLink}>Nhật ký</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.footerLink}>Bài test</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.footerLink}>Cộng đồng</Text></TouchableOpacity>
        </View>

        <Text style={styles.footerCopy}>© 2026 SOUL. Nền tảng hỗ trợ sức khỏe tinh thần, không thay thế tư vấn y khoa.</Text>
      </View>
    </View>
  );
}
