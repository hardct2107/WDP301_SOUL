import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/home.styles";

export function Pricing() {
  return (
    <View>
      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Bắt đầu với các tính năng đang có</Text>
      <Text style={styles.sectionSub}>
        SOUL hiện tập trung vào trải nghiệm miễn phí trong dự án: AI, nhật ký, bài test, sự kiện và cộng đồng.
      </Text>

      <View style={styles.pricingRow}>
        <View style={styles.priceCard}>
          <Text style={styles.priceTitle}>Tài khoản SOUL</Text>
          <Text style={styles.priceAmount}>0đ</Text>
          <Text style={styles.priceSub}>trong phạm vi dự án</Text>
          <TouchableOpacity style={styles.priceBtn}>
            <Text style={styles.priceBtnText}>Bắt đầu miễn phí</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.priceCardPro}>
          <View style={styles.priceBadge}>
            <Text style={styles.priceBadgeText}>MODULE HIỆN CÓ</Text>
          </View>
          <Text style={styles.priceTitlePro}>Wellness toolkit</Text>
          <Text style={styles.priceAmountPro}>5</Text>
          <Text style={styles.priceSub}>nhóm tính năng chính</Text>
          <TouchableOpacity style={styles.priceBtnPro}>
            <Text style={styles.priceBtnTextPro}>Khám phá SOUL</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={{ alignSelf: "center", marginBottom: 32 }}>
        <Text style={{ fontSize: 14, color: "#64748B", textDecorationLine: "underline" }}>
          Phiên bản hiện tại chưa triển khai gói trả phí
        </Text>
      </TouchableOpacity>
    </View>
  );
}
