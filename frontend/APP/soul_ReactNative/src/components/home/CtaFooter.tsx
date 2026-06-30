import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";

export function CtaFooter() {
  return (
    <View>
      {/* CTA Section */}
      <LinearGradient
        colors={["#7C3AED", "#A855F7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.ctaSection}
      >
        <Text style={styles.ctaTitle}>Bắt đầu hành trình{"\n"}chữa lành ngay hôm nay</Text>
        <Text style={styles.ctaSub}>Đăng ký nhận cẩm nang chăm sóc sức khỏe tinh thần miễn phí mỗi tuần.</Text>

        <View style={styles.ctaInputWrap}>
          <TextInput
            placeholder="Nhập email của bạn..."
            placeholderTextColor="rgba(255,255,255,0.6)"
            style={styles.ctaInput}
          />
          <TouchableOpacity style={styles.ctaBtn}>
            <Text style={styles.ctaBtnText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Footer Section */}
      <View style={styles.footerWrap}>
        <Text style={styles.footerLogo}>SOUL</Text>
        
        <View style={styles.footerLinks}>
          <TouchableOpacity><Text style={styles.footerLink}>Về chúng tôi</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.footerLink}>Điều khoản</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.footerLink}>Bảo mật</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.footerLink}>Liên hệ</Text></TouchableOpacity>
        </View>

        <Text style={styles.footerCopy}>© 2026 SOUL AI. All rights reserved.</Text>
      </View>
    </View>
  );
}
