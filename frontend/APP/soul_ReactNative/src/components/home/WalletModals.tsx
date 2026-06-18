import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useAuthStore } from "@/store";
import { colors } from "@/constants/colors";

// ─── Danh sách mệnh giá nạp tiền nhanh ───────────────────────────────────────
const QUICK_AMOUNTS = [
  { label: "20.000đ",  value: 20_000 },
  { label: "50.000đ",  value: 50_000 },
  { label: "100.000đ", value: 100_000 },
  { label: "200.000đ", value: 200_000 },
  { label: "500.000đ", value: 500_000 },
  { label: "1.000.000đ", value: 1_000_000 },
];

// ─── Lịch sử giao dịch mẫu (mock) ────────────────────────────────────────────
const MOCK_TRANSACTIONS = [
  { id: "1", type: "topup",  label: "Nạp tiền", amount: 100_000, date: "17/06/2026" },
  { id: "2", type: "spend",  label: "Tham gia sự kiện",  amount: -50_000,  date: "15/06/2026" },
  { id: "3", type: "topup",  label: "Nạp tiền", amount: 200_000, date: "10/06/2026" },
  { id: "4", type: "spend",  label: "Premium plan", amount: -99_000, date: "08/06/2026" },
];

// ─── Helper: Định dạng số tiền ────────────────────────────────────────────────
function formatVND(amount: number) {
  return amount.toLocaleString("vi-VN") + "đ";
}

// ─── Props ────────────────────────────────────────────────────────────────────
type WalletModalsProps = {
  showWallet:   boolean;
  onCloseWallet: () => void;
  showTopUp:    boolean;
  onCloseTopUp: () => void;
  onOpenTopUp:  () => void;
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export function WalletModals({
  showWallet,
  onCloseWallet,
  showTopUp,
  onCloseTopUp,
  onOpenTopUp,
}: WalletModalsProps) {
  const { user, topUp } = useAuthStore();
  const balance = user?.balance ?? 0;

  // ── Nạp tiền state ──────────────────────────────────────────────────────────
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount]     = useState("");
  const [loading, setLoading]               = useState(false);

  const handleTopUp = () => {
    const amount = selectedAmount ?? parseInt(customAmount.replace(/\D/g, ""), 10);
    if (!amount || amount < 10_000) {
      Alert.alert("Thông báo", "Vui lòng chọn hoặc nhập số tiền tối thiểu 10.000đ.");
      return;
    }
    setLoading(true);
    // Giả lập delay thanh toán 1.2s
    setTimeout(() => {
      topUp(amount);
      setLoading(false);
      setSelectedAmount(null);
      setCustomAmount("");
      onCloseTopUp();
      Alert.alert("✅ Nạp tiền thành công!", `Số dư của bạn đã tăng thêm ${formatVND(amount)}.`);
    }, 1200);
  };

  // ── Mở TopUp từ màn hình Wallet (đóng Wallet trước) ─────────────────────────
  const handleGoTopUp = () => {
    onCloseWallet();
    setTimeout(() => onOpenTopUp(), 300);
  };

  return (
    <>
      {/* ══════════ MODAL: SỐ DƯ VÍ ══════════ */}
      <Modal
        visible={showWallet}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onCloseWallet}
      >
        <SafeAreaView style={s.container}>
          {/* Header */}
          <View style={s.header}>
            <TouchableOpacity onPress={onCloseWallet} style={s.headerBtn}>
              <MaterialCommunityIcons name="arrow-left" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={s.headerTitle}>Ví của tôi</Text>
            <View style={s.headerBtn} />
          </View>

          <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
            {/* ── Thẻ số dư chính ─────────────────────────────────── */}
            <View style={s.balanceCard}>
              {/* Vòng trang trí */}
              <View style={s.balanceDecorCircle1} />
              <View style={s.balanceDecorCircle2} />

              <View style={s.balanceTop}>
                <MaterialCommunityIcons name="wallet-outline" size={28} color="#FFFFFF" />
                <Text style={s.balanceLabel}>Số dư hiện tại</Text>
              </View>

              <Text style={s.balanceAmount}>{formatVND(balance)}</Text>

              <TouchableOpacity style={s.topUpCardBtn} onPress={handleGoTopUp}>
                <MaterialCommunityIcons name="plus-circle-outline" size={18} color={colors.primary} />
                <Text style={s.topUpCardBtnText}>Nạp thêm</Text>
              </TouchableOpacity>
            </View>

            {/* ── Thống kê nhanh ──────────────────────────────────── */}
            <View style={s.statsRow}>
              <View style={s.statBox}>
                <MaterialCommunityIcons name="arrow-down-circle-outline" size={26} color={colors.primary} />
                <Text style={s.statLabel}>Đã nạp</Text>
                <Text style={s.statValue}>{formatVND(300_000)}</Text>
              </View>
              <View style={s.statDivider} />
              <View style={s.statBox}>
                <MaterialCommunityIcons name="arrow-up-circle-outline" size={26} color={colors.accentPink} />
                <Text style={s.statLabel}>Đã dùng</Text>
                <Text style={s.statValue}>{formatVND(149_000)}</Text>
              </View>
            </View>

            {/* ── Lịch sử giao dịch ───────────────────────────────── */}
            <Text style={s.sectionTitle}>Lịch sử giao dịch</Text>
            {MOCK_TRANSACTIONS.map((tx) => (
              <View key={tx.id} style={s.txRow}>
                <View
                  style={[
                    s.txIconWrap,
                    tx.type === "topup" ? s.txIconTopUp : s.txIconSpend,
                  ]}
                >
                  <MaterialCommunityIcons
                    name={tx.type === "topup" ? "plus" : "minus"}
                    size={18}
                    color={tx.type === "topup" ? colors.primary : colors.accentPink}
                  />
                </View>
                <View style={s.txInfo}>
                  <Text style={s.txLabel}>{tx.label}</Text>
                  <Text style={s.txDate}>{tx.date}</Text>
                </View>
                <Text
                  style={[
                    s.txAmount,
                    tx.amount > 0 ? s.txAmountPositive : s.txAmountNegative,
                  ]}
                >
                  {tx.amount > 0 ? "+" : ""}{formatVND(tx.amount)}
                </Text>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ══════════ MODAL: NẠP TIỀN ══════════ */}
      <Modal
        visible={showTopUp}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onCloseTopUp}
      >
        <SafeAreaView style={s.container}>
          {/* Header */}
          <View style={s.header}>
            <TouchableOpacity onPress={onCloseTopUp} style={s.headerBtn}>
              <MaterialCommunityIcons name="arrow-left" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={s.headerTitle}>Nạp tiền</Text>
            <View style={s.headerBtn} />
          </View>

          <ScrollView
            contentContainerStyle={s.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* ── Số dư hiện tại nhỏ ─────────────────────────────── */}
            <View style={s.currentBalanceRow}>
              <MaterialCommunityIcons name="wallet-outline" size={20} color={colors.primary} />
              <Text style={s.currentBalanceText}>
                Số dư hiện tại:{" "}
                <Text style={s.currentBalanceValue}>{formatVND(balance)}</Text>
              </Text>
            </View>

            {/* ── Chọn mệnh giá nhanh ─────────────────────────────── */}
            <Text style={s.sectionTitle}>Chọn mệnh giá</Text>
            <View style={s.amountGrid}>
              {QUICK_AMOUNTS.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    s.amountChip,
                    selectedAmount === item.value && s.amountChipActive,
                  ]}
                  onPress={() => {
                    setSelectedAmount(item.value);
                    setCustomAmount("");
                  }}
                >
                  <Text
                    style={[
                      s.amountChipText,
                      selectedAmount === item.value && s.amountChipTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ── Nhập tùy chỉnh ──────────────────────────────────── */}
            <Text style={s.sectionTitle}>Hoặc nhập số tiền khác</Text>
            <View style={s.customInputRow}>
              <MaterialCommunityIcons
                name="cash-multiple"
                size={22}
                color={colors.primary}
                style={{ marginRight: 10 }}
              />
              <TextInput
                style={s.customInput}
                value={customAmount}
                onChangeText={(v) => {
                  setCustomAmount(v);
                  setSelectedAmount(null);
                }}
                placeholder="Nhập số tiền (VNĐ)"
                placeholderTextColor={colors.textLight}
                keyboardType="numeric"
              />
            </View>

            {/* ── Phương thức thanh toán (UI tĩnh / mock) ─────────── */}
            <Text style={s.sectionTitle}>Phương thức thanh toán</Text>
            {[
              { icon: "bank-outline",      label: "Chuyển khoản ngân hàng" },
              { icon: "credit-card-outline", label: "Thẻ ATM / Visa / Mastercard" },
              { icon: "qrcode-scan",       label: "QR Code" },
            ].map((m) => (
              <View key={m.label} style={s.methodRow}>
                <View style={s.methodIcon}>
                  <MaterialCommunityIcons name={m.icon as any} size={22} color={colors.primary} />
                </View>
                <Text style={s.methodLabel}>{m.label}</Text>
                <MaterialCommunityIcons name="check-circle" size={20} color={colors.primary} />
              </View>
            ))}

            {/* ── Nút nạp tiền ────────────────────────────────────── */}
            <TouchableOpacity
              style={[s.confirmBtn, loading && s.confirmBtnLoading]}
              onPress={handleTopUp}
              disabled={loading}
            >
              {loading ? (
                <Text style={s.confirmBtnText}>Đang xử lý...</Text>
              ) : (
                <>
                  <MaterialCommunityIcons name="lightning-bolt" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                  <Text style={s.confirmBtnText}>
                    Nạp{" "}
                    {selectedAmount
                      ? formatVND(selectedAmount)
                      : customAmount
                      ? formatVND(parseInt(customAmount.replace(/\D/g, ""), 10) || 0)
                      : "tiền"}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={s.disclaimer}>
              * Số dư trong ứng dụng chỉ dùng để thanh toán dịch vụ SOUL. Không hỗ trợ rút tiền.
            </Text>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerBtn: { padding: 6, width: 36 },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textStrong,
  },
  scroll: { padding: 20, paddingBottom: 40 },

  // ── Thẻ số dư ────────────────────────────────────────────
  balanceCard: {
    borderRadius: 28,
    backgroundColor: colors.primary,
    padding: 28,
    marginBottom: 20,
    overflow: "hidden",
    position: "relative",
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  balanceDecorCircle1: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.08)",
    top: -50,
    right: -40,
  },
  balanceDecorCircle2: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.06)",
    bottom: -30,
    left: 20,
  },
  balanceTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  balanceLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 15,
    fontWeight: "600",
  },
  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 22,
  },
  topUpCardBtn: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  topUpCardBtnText: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 14,
  },

  // ── Thống kê ─────────────────────────────────────────────
  statsRow: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  statBox: { flex: 1, alignItems: "center", gap: 6 },
  statDivider: { width: 1, backgroundColor: colors.border },
  statLabel: { color: colors.textLight, fontSize: 12, fontWeight: "600" },
  statValue: { color: colors.textStrong, fontSize: 16, fontWeight: "900" },

  // ── Section title ─────────────────────────────────────────
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.textStrong,
    marginBottom: 12,
    marginTop: 4,
  },

  // ── Lịch sử giao dịch ────────────────────────────────────
  txRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  txIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  txIconTopUp: { backgroundColor: colors.surfaceAlt },
  txIconSpend: { backgroundColor: "#FFF0F6" },
  txInfo: { flex: 1 },
  txLabel: { fontSize: 14, fontWeight: "700", color: colors.textStrong },
  txDate:  { fontSize: 12, color: colors.textLight, marginTop: 2 },
  txAmount: { fontSize: 15, fontWeight: "900" },
  txAmountPositive: { color: colors.primary },
  txAmountNegative: { color: colors.accentPink },

  // ── Số dư hiện tại (nhỏ, trong TopUp) ────────────────────
  currentBalanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  currentBalanceText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: "600",
  },
  currentBalanceValue: {
    color: colors.primary,
    fontWeight: "900",
  },

  // ── Lưới mệnh giá ────────────────────────────────────────
  amountGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  amountChip: {
    width: "30.5%",
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    backgroundColor: colors.surface,
  },
  amountChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceAlt,
  },
  amountChipText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textMuted,
  },
  amountChipTextActive: {
    color: colors.primary,
    fontWeight: "900",
  },

  // ── Nhập tuỳ chỉnh ────────────────────────────────────────
  customInputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 24,
  },
  customInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 12,
    color: colors.textMain,
  },

  // ── Phương thức thanh toán ────────────────────────────────
  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.primaryPale,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  methodLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: colors.textStrong,
  },

  // ── Nút xác nhận nạp ─────────────────────────────────────
  confirmBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 20,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  confirmBtnLoading: { opacity: 0.7 },
  confirmBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  disclaimer: {
    textAlign: "center",
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 18,
    paddingHorizontal: 10,
  },
});
