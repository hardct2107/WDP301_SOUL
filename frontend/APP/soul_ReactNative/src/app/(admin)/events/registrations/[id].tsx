import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { colors } from "@/constants/colors";
import { eventAdminService } from "@/services/eventApi";
import {
  attendanceMeta,
  AttendanceStatus,
  EventStatus,
  normalizeEventRegistration,
  registrationMeta,
  RegistrationStatus,
  reviewMeta,
  ReviewStatus,
} from "@/utils/eventRegistration";

type ParticipantFilter =
  | "all"
  | RegistrationStatus
  | AttendanceStatus;

type RegistrationUser = {
  _id?: string;
  fullName?: string;
  email?: string;
  phone?: string | null;
};

type EventRegistration = {
  _id: string;
  userId: RegistrationUser | string;
  registrationStatus: RegistrationStatus;
  attendanceStatus: AttendanceStatus;
  reviewStatus: ReviewStatus;
  registeredAt?: string;
  cancelledAt?: string | null;
  checkedInAt?: string | null;
};

type AttendanceChange = {
  registration: EventRegistration;
  nextStatus: AttendanceStatus;
} | null;

const filters: { label: string; value: ParticipantFilter }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Đã đăng ký", value: "registered" },
  { label: "Đã hủy", value: "cancelled" },
  { label: "Chưa điểm danh", value: "not_checked_in" },
  { label: "Đã tham dự", value: "attended" },
  { label: "Vắng mặt", value: "absent" },
];

const getUserId = (registration: EventRegistration) =>
  typeof registration.userId === "string"
    ? registration.userId
    : registration.userId._id || "";

const getUserInfo = (registration: EventRegistration) => {
  if (typeof registration.userId === "string") {
    return { name: "Người dùng", email: "Không có email", phone: "" };
  }
  return {
    name: registration.userId.fullName || "Người dùng",
    email: registration.userId.email || "Không có email",
    phone: registration.userId.phone || "",
  };
};

const formatDateTime = (value?: string | null) =>
  value
    ? new Date(value).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Chưa cập nhật";

export default function AdminEventRegistrations() {
  const params = useLocalSearchParams();
  const eventId = Array.isArray(params.id) ? params.id[0] : String(params.id || "");
  const [eventTitle, setEventTitle] = useState("");
  const [eventStatus, setEventStatus] = useState<EventStatus>("upcoming");
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [filter, setFilter] = useState<ParticipantFilter>("all");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState<AttendanceChange>(null);
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchRegistrations = useCallback(async () => {
    if (!eventId) return;
    setLoading(true);
    try {
      const response = await eventAdminService.getEventRegistrations(eventId, "all");
      if (response.success && response.data) {
        setEventTitle(response.data.event?.title || "");
        setEventStatus(response.data.event?.status || "upcoming");
        setRegistrations((response.data.registrations || []).map((item: EventRegistration) => ({
          ...item,
          ...(normalizeEventRegistration(item) || {}),
          reviewStatus: item.reviewStatus === "reviewed" ? "reviewed" : "not_reviewed",
        })));
      }
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useFocusEffect(useCallback(() => void fetchRegistrations(), [fetchRegistrations]));

  const counts = useMemo(() => ({
    all: registrations.length,
    registered: registrations.filter((item) => item.registrationStatus === "registered").length,
    cancelled: registrations.filter((item) => item.registrationStatus === "cancelled").length,
    not_checked_in: registrations.filter((item) => item.attendanceStatus === "not_checked_in").length,
    attended: registrations.filter((item) => item.attendanceStatus === "attended").length,
    absent: registrations.filter((item) => item.attendanceStatus === "absent").length,
  }), [registrations]);

  const filteredRegistrations = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();
    return registrations.filter((registration) => {
      const user = getUserInfo(registration);
      const matchesState = filter === "all" ||
        registration.registrationStatus === filter ||
        registration.attendanceStatus === filter;
      const matchesSearch = !keyword ||
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.phone.toLowerCase().includes(keyword);
      return matchesState && matchesSearch;
    });
  }, [filter, registrations, searchText]);

  const requestChange = (
    registration: EventRegistration,
    nextStatus: AttendanceStatus
  ) => {
    if (eventStatus === "upcoming" || registration.registrationStatus === "cancelled") return;
    setReason("");
    setChange({ registration, nextStatus });
  };

  const confirmChange = async () => {
    if (!change) return;
    if (eventStatus === "completed" && !reason.trim()) return;
    const userId = getUserId(change.registration);
    if (!userId) return;

    setSaving(true);
    try {
      await eventAdminService.updateAttendance(
        eventId,
        userId,
        change.nextStatus,
        reason.trim()
      );
      setChange(null);
      await fetchRegistrations();
    } finally {
      setSaving(false);
    }
  };

  const renderRegistration = ({ item }: { item: EventRegistration }) => {
    const user = getUserInfo(item);
    const registration = registrationMeta[item.registrationStatus] || registrationMeta.registered;
    const attendance = attendanceMeta[item.attendanceStatus] || attendanceMeta.not_checked_in;
    const review = reviewMeta[item.reviewStatus] || reviewMeta.not_reviewed;
    const actionsVisible =
      item.registrationStatus === "registered" &&
      (eventStatus === "ongoing" || eventStatus === "completed");

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.avatar}><MaterialCommunityIcons name="account" size={22} color={colors.primary} /></View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.meta}>{user.email}</Text>
            {!!user.phone && <Text style={styles.meta}>{user.phone}</Text>}
          </View>
        </View>

        <View style={styles.badges}>
          <Badge label={`Đăng ký: ${registration.label}`} bg={registration.bg} color={registration.color} />
          <Badge label={`Tham dự: ${attendance.label}`} bg={attendance.bg} color={attendance.color} />
          <Badge label={`Đánh giá: ${review.label}`} bg={review.bg} color={review.color} />
        </View>

        <View style={styles.timeGrid}>
          <Text style={styles.timeText}>Đăng ký: {formatDateTime(item.registeredAt)}</Text>
          <Text style={styles.timeText}>Check-in: {formatDateTime(item.checkedInAt)}</Text>
        </View>

        {actionsVisible && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.attendedButton]}
              onPress={() => requestChange(item, "attended")}
              disabled={item.attendanceStatus === "attended"}
            >
              <Text style={styles.attendedButtonText}>
                {eventStatus === "completed" ? "Sửa: Đã tham dự" : "Xác nhận tham dự"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.absentButton]}
              onPress={() => requestChange(item, "absent")}
              disabled={item.attendanceStatus === "absent"}
            >
              <Text style={styles.absentButtonText}>
                {eventStatus === "completed" ? "Sửa: Vắng mặt" : "Đánh dấu vắng"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.dark} />
        </TouchableOpacity>
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Người tham gia</Text>
          <Text style={styles.headerSubtitle}>{eventTitle} · {eventStatus}</Text>
        </View>
      </View>

      <FlatList
        data={filteredRegistrations}
        keyExtractor={(item) => item._id || getUserId(item)}
        renderItem={renderRegistration}
        refreshing={loading}
        onRefresh={fetchRegistrations}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            {eventStatus === "upcoming" && (
              <View style={styles.notice}>
                <MaterialCommunityIcons name="lock-clock" size={19} color="#92400E" />
                <Text style={styles.noticeText}>Điểm danh sẽ mở khi sự kiện bắt đầu.</Text>
              </View>
            )}
            <View style={styles.searchBox}>
              <MaterialCommunityIcons name="magnify" size={20} color="#64748B" />
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Tìm theo tên, email, số điện thoại"
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
              />
            </View>
            <View style={styles.filters}>
              {filters.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[styles.filter, filter === item.value && styles.activeFilter]}
                  onPress={() => setFilter(item.value)}
                >
                  <Text style={[styles.filterText, filter === item.value && styles.activeFilterText]}>
                    {item.label} ({counts[item.value]})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }
        ListEmptyComponent={loading ? <ActivityIndicator color={colors.primary} /> : <Text style={styles.empty}>Không có người tham gia phù hợp.</Text>}
      />

      <Modal visible={!!change} transparent animationType="fade" onRequestClose={() => !saving && setChange(null)}>
        <View style={styles.modalOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => !saving && setChange(null)} />
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              Xác nhận {change?.nextStatus === "absent" ? "vắng mặt" : "tham dự"}
            </Text>
            <Text style={styles.modalText}>
              {eventStatus === "completed"
                ? "Sự kiện đã kết thúc. Vui lòng nhập lý do để lưu audit."
                : "Hãy kiểm tra lại trước khi cập nhật attendance."}
            </Text>
            <TextInput
              value={reason}
              onChangeText={setReason}
              placeholder={eventStatus === "completed" ? "Lý do chỉnh sửa (bắt buộc)" : "Ghi chú (tùy chọn)"}
              multiline
              maxLength={500}
              style={styles.reasonInput}
            />
            {eventStatus === "completed" && !reason.trim() && (
              <Text style={styles.requiredText}>Cần nhập lý do để tiếp tục.</Text>
            )}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setChange(null)} disabled={saving}>
                <Text style={styles.cancelText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmButton, eventStatus === "completed" && !reason.trim() && styles.disabled]}
                onPress={confirmChange}
                disabled={saving || (eventStatus === "completed" && !reason.trim())}
              >
                {saving ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.confirmText}>Xác nhận</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Badge({ label, bg, color }: { label: string; bg: string; color: string }) {
  return <View style={[styles.badge, { backgroundColor: bg }]}><Text style={[styles.badgeText, { color }]}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  header: { minHeight: 68, paddingHorizontal: 18, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
  iconButton: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerCopy: { flex: 1 },
  headerTitle: { color: colors.dark, fontSize: 19, fontWeight: "900" },
  headerSubtitle: { color: "#64748B", fontSize: 12, marginTop: 2, textTransform: "capitalize" },
  content: { padding: 16, paddingBottom: 40 },
  notice: { flexDirection: "row", gap: 8, backgroundColor: "#FEF3C7", borderRadius: 10, padding: 12, marginBottom: 12 },
  noticeText: { flex: 1, color: "#92400E", fontWeight: "700", fontSize: 13 },
  searchBox: { minHeight: 44, flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 10, paddingHorizontal: 12 },
  searchInput: { flex: 1, color: colors.dark },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 7, marginVertical: 12 },
  filter: { minHeight: 34, justifyContent: "center", paddingHorizontal: 11, borderRadius: 999, backgroundColor: "#F1F5F9" },
  activeFilter: { backgroundColor: "#CCFBF1", borderWidth: 1, borderColor: colors.primary },
  filterText: { color: "#64748B", fontSize: 12, fontWeight: "700" },
  activeFilterText: { color: colors.primary },
  card: { backgroundColor: "#FFFFFF", borderRadius: 14, borderWidth: 1, borderColor: "#E2E8F0", padding: 15, marginBottom: 11 },
  cardHeader: { flexDirection: "row", alignItems: "flex-start", gap: 11 },
  avatar: { width: 42, height: 42, borderRadius: 13, backgroundColor: "#E5FBF4", alignItems: "center", justifyContent: "center" },
  userInfo: { flex: 1 },
  name: { color: colors.dark, fontWeight: "900", fontSize: 15 },
  meta: { color: "#64748B", fontSize: 12, marginTop: 3 },
  badges: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 13 },
  badge: { borderRadius: 999, paddingHorizontal: 9, paddingVertical: 5 },
  badgeText: { fontSize: 10, fontWeight: "800" },
  timeGrid: { gap: 5, marginTop: 12, paddingTop: 11, borderTopWidth: 1, borderTopColor: "#F1F5F9" },
  timeText: { color: "#64748B", fontSize: 12 },
  actions: { flexDirection: "row", gap: 8, marginTop: 13 },
  actionButton: { flex: 1, minHeight: 39, alignItems: "center", justifyContent: "center", borderRadius: 9, borderWidth: 1 },
  attendedButton: { borderColor: "#86EFAC", backgroundColor: "#F0FDF4" },
  absentButton: { borderColor: "#FCD34D", backgroundColor: "#FFFBEB" },
  attendedButtonText: { color: "#15803D", fontWeight: "800", fontSize: 12 },
  absentButtonText: { color: "#B45309", fontWeight: "800", fontSize: 12 },
  empty: { color: "#94A3B8", textAlign: "center", marginTop: 40 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(15,23,42,0.38)", alignItems: "center", justifyContent: "center", padding: 20 },
  modalCard: { width: "100%", maxWidth: 480, backgroundColor: "#FFFFFF", borderRadius: 16, padding: 20 },
  modalTitle: { color: colors.dark, fontSize: 19, fontWeight: "900" },
  modalText: { color: "#64748B", lineHeight: 20, marginTop: 7 },
  reasonInput: { minHeight: 90, borderWidth: 1, borderColor: "#CBD5E1", borderRadius: 10, padding: 11, marginTop: 14, textAlignVertical: "top", color: colors.dark },
  requiredText: { color: "#B91C1C", fontSize: 11, marginTop: 5 },
  modalActions: { flexDirection: "row", gap: 9, marginTop: 15 },
  cancelButton: { flex: 1, minHeight: 43, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#CBD5E1", borderRadius: 9 },
  cancelText: { color: "#475569", fontWeight: "800" },
  confirmButton: { flex: 1, minHeight: 43, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary, borderRadius: 9 },
  confirmText: { color: "#FFFFFF", fontWeight: "800" },
  disabled: { opacity: 0.45 },
});
