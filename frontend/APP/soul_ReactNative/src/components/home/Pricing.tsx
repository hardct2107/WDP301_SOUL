import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";

export function Pricing() {
  return (
    <View>
      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Đầu tư cho sức khỏe tinh thần</Text>
      <Text style={styles.sectionSub}>Chọn gói phù hợp với hành trình của bạn</Text>

      <View style={styles.pricingRow}>
        <View style={styles.priceCard}>
          <Text style={styles.priceTitle}>Miễn phí</Text>
          <Text style={styles.priceAmount}>0đ</Text>
          <Text style={styles.priceSub}>/mãi mãi</Text>
          <TouchableOpacity style={styles.priceBtn}>
            <Text style={styles.priceBtnText}>Đang dùng</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.priceCardPro}>
          <View style={styles.priceBadge}>
            <Text style={styles.priceBadgeText}>✨ PHỔ BIẾN NHẤT</Text>
          </View>
          <Text style={styles.priceTitlePro}>SOUL PRO</Text>
          <Text style={styles.priceAmountPro}>149K</Text>
          <Text style={styles.priceSub}>/tháng</Text>
          <TouchableOpacity style={styles.priceBtnPro}>
            <Text style={styles.priceBtnTextPro}>Nâng cấp ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity style={{ alignSelf: "center", marginBottom: 32 }}>
        <Text style={{ fontSize: 14, color: "#64748B", textDecorationLine: "underline" }}>
          Bạn là doanh nghiệp? Liên hệ với chúng tôi
        </Text>
      </TouchableOpacity>
    </View>
  );
}
