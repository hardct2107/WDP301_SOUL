import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { colors } from "@/constants/colors";
import { eventUserService } from "@/services/eventApi";
import { RatingSummary } from "@/api/ratingApi";
import {
  attendanceMeta,
  eventStatusMeta,
  EventRegistration,
  EventStatus,
  getComputedEventStatus,
  normalizeEventRegistration,
  registrationMeta,
  reviewMeta,
} from "@/utils/eventRegistration";

type RegistrationFilter = "all" | "registered" | "cancelled" | "attended" | "absent";

type RegisteredEvent = {
  _id: string;
  title: string;
  description?: string | null;
  eventType?: string | null;
  startDateTime: string;
  location?: string | null;
  meetingLink?: string | null;
  registeredCount?: number;
  status: EventStatus;
  registration?: EventRegistration;
  ratingSummary?: RatingSummary;
};

const filters: { label: string; value: RegistrationFilter }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Đã đăng ký", value: "registered" },
  { label: "Đã hủy", value: "cancelled" },
  { label: "Đã tham dự", value: "attended" },
  { label: "Vắng mặt", value: "absent" },
];

const formatDateTime = (value?: string | null) => {
  if (!value) return "Not updated";

  return new Date(value).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function RegisteredEventsScreen() {
  const { width } = useWindowDimensions();
  const desktop = Platform.OS === "web" && width >= 980;
  const [events, setEvents] = useState<RegisteredEvent[]>([]);
  const [filter, setFilter] = useState<RegistrationFilter>("all");
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const loadRegisteredEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await eventUserService.getRegisteredEvents(
        "all",
        1,
        100,
        searchQuery
      );

      if (response.success) {
        setEvents((response.data || []).map((item: RegisteredEvent) => ({
          ...item,
          registration: normalizeEventRegistration(item.registration) || undefined,
        })));
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message || "Unable to load registered events"
      );
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchText.trim()), 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  useFocusEffect(
    useCallback(() => {
      loadRegisteredEvents();
    }, [loadRegisteredEvents])
  );

  const counts = useMemo(() => {
    const registered = events.filter(
      (event) => event.registration?.registrationStatus === "registered"
    ).length;
    const cancelled = events.filter(
      (event) => event.registration?.registrationStatus === "cancelled"
    ).length;
    const attended = events.filter(
      (event) => event.registration?.attendanceStatus === "attended"
    ).length;
    const absent = events.filter(
      (event) => event.registration?.attendanceStatus === "absent"
    ).length;

    return {
      all: events.length,
      registered,
      cancelled,
      attended,
      absent,
    };
  }, [events]);

  const filteredEvents = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    return events.filter((event) => {
      const registrationStatus = event.registration?.registrationStatus;
      const attendanceStatus = event.registration?.attendanceStatus;
      const searchableText = [
        event.title,
        event.description,
        event.location,
        event.meetingLink,
        event.eventType,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        (filter === "all" || registrationStatus === filter || attendanceStatus === filter) &&
        (!keyword || searchableText.includes(keyword))
      );
    });
  }, [events, filter, searchText]);

  const renderEvent = ({ item }: { item: RegisteredEvent }) => {
    const registrationStatus = item.registration?.registrationStatus || "registered";
    const registration = registrationMeta[registrationStatus];
    const attendance = attendanceMeta[item.registration?.attendanceStatus || "not_checked_in"];
    const review = reviewMeta[item.registration?.reviewStatus || "not_reviewed"];
    const eventStatus =
      eventStatusMeta[getComputedEventStatus(item)] || eventStatusMeta.upcoming;

    return (
      <TouchableOpacity
        style={screenStyles.eventCard}
        activeOpacity={0.86}
        onPress={() =>
          router.push({
            pathname: "/user-events/[id]",
            params: { id: item._id },
          })
        }
      >
        <View style={screenStyles.cardTop}>
          <View style={screenStyles.eventIcon}>
            <MaterialCommunityIcons name="calendar-check" size={23} color="#0F766E" />
          </View>

          <View style={screenStyles.cardTitleWrap}>
            <Text style={screenStyles.eventTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={screenStyles.eventStatus}>{eventStatus.label}</Text>
          </View>

          <View style={[screenStyles.statusPill, { backgroundColor: registration.bg }]}>
            <Text style={[screenStyles.statusText, { color: registration.color }]}>
              {registration.label}
            </Text>
          </View>
        </View>

        <View style={screenStyles.infoGrid}>
          <InfoRow icon="clock-outline" text={formatDateTime(item.startDateTime)} />
          <InfoRow
            icon="bookmark-check-outline"
            text={`Registered at: ${formatDateTime(item.registration?.registeredAt)}`}
          />

          {registrationStatus === "cancelled" && (
            <InfoRow
              icon="calendar-remove-outline"
              text={`Cancelled at: ${formatDateTime(item.registration?.cancelledAt)}`}
              danger
            />
          )}

          <InfoRow
            icon="map-marker-outline"
            text={item.location || item.meetingLink || "Location not updated"}
          />
        </View>

        <View style={screenStyles.ratingRow}>
          <MaterialCommunityIcons name="star" size={17} color="#F59E0B" />
          <Text style={screenStyles.ratingValue}>
            {(item.ratingSummary?.average || 0).toFixed(1)}
          </Text>
          <Text style={screenStyles.ratingCount}>
            ({item.ratingSummary?.total || 0} đánh giá)
          </Text>
        </View>
        <View style={screenStyles.stateRow}>
          <View style={[screenStyles.stateBadge, { backgroundColor: attendance.bg }]}>
            <Text style={[screenStyles.stateBadgeText, { color: attendance.color }]}>Tham dự: {attendance.label}</Text>
          </View>
          <View style={[screenStyles.stateBadge, { backgroundColor: review.bg }]}>
            <Text style={[screenStyles.stateBadgeText, { color: review.color }]}>Đánh giá: {review.label}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <View style={screenStyles.header}>
        <TouchableOpacity style={screenStyles.iconButton} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.dark} />
        </TouchableOpacity>

        <View style={screenStyles.headerTextWrap}>
          <Text style={screenStyles.headerTitle}>Sự kiện của tôi</Text>
          <Text style={screenStyles.headerSubtitle}>
            Theo dõi đăng ký, tham dự và đánh giá
          </Text>
        </View>
      </View>

      <FlatList
        data={filteredEvents}
        key={desktop ? "desktop-registered-events" : "mobile-registered-events"}
        numColumns={desktop ? 2 : 1}
        columnWrapperStyle={desktop ? screenStyles.webColumnWrapper : undefined}
        keyExtractor={(item) => item._id}
        renderItem={renderEvent}
        refreshing={loading}
        onRefresh={loadRegisteredEvents}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[screenStyles.listContent, desktop && screenStyles.webListContent]}
        ListHeaderComponent={
          <View>
            <View style={screenStyles.summaryCard}>
              <SummaryItem label="Tổng sự kiện" value={counts.all} />
              <View style={screenStyles.summaryDivider} />
              <SummaryItem label="Đã đăng ký" value={counts.registered} />
              <View style={screenStyles.summaryDivider} />
              <SummaryItem label="Đã hủy" value={counts.cancelled} />
            </View>

            <View style={screenStyles.searchBox}>
              <MaterialCommunityIcons name="magnify" size={20} color="#64748B" />
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Tìm sự kiện hoặc địa điểm"
                placeholderTextColor="#94A3B8"
                style={screenStyles.searchInput}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText("")}>
                  <MaterialCommunityIcons name="close-circle" size={18} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            <View style={screenStyles.filterRow}>
              {filters.map((item) => {
                const active = filter === item.value;
                const count = counts[item.value];

                return (
                  <TouchableOpacity
                    key={item.value}
                    style={[screenStyles.filterButton, active && screenStyles.activeFilter]}
                    onPress={() => setFilter(item.value)}
                  >
                    <Text
                      style={[
                        screenStyles.filterText,
                        active && screenStyles.activeFilterText,
                      ]}
                    >
                      {item.label} ({count})
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color={colors.primary} style={screenStyles.loader} />
          ) : (
            <View style={screenStyles.emptyState}>
              <MaterialCommunityIcons name="calendar-heart" size={62} color="#B7C8C2" />
              <Text style={screenStyles.emptyTitle}>Bạn chưa đăng ký sự kiện nào</Text>
              <Text style={screenStyles.emptyText}>
                Hãy khám phá lịch hoạt động của SOUL và chọn sự kiện phù hợp.
              </Text>
              <TouchableOpacity
                style={screenStyles.emptyButton}
                onPress={() => router.push("/user-events")}
              >
                <Text style={screenStyles.emptyButtonText}>Khám phá sự kiện</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

function SummaryItem({ label, value }: { label: string; value: number }) {
  return (
    <View style={screenStyles.summaryItem}>
      <Text style={screenStyles.summaryLabel}>{label}</Text>
      <Text style={screenStyles.summaryValue}>{value}</Text>
    </View>
  );
}

function InfoRow({
  icon,
  text,
  danger,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  text: string;
  danger?: boolean;
}) {
  return (
    <View style={screenStyles.infoRow}>
      <MaterialCommunityIcons
        name={icon}
        size={18}
        color={danger ? "#EF4444" : "#0F766E"}
      />
      <Text style={screenStyles.infoText}>{text}</Text>
    </View>
  );
}

const screenStyles = StyleSheet.create({
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 10 },
  ratingValue: { color: "#92400E", fontWeight: "800" },
  ratingCount: { color: "#64748B", fontSize: 12 },
  stateRow: { flexDirection: "row", flexWrap: "wrap", gap: 7, marginTop: 10 },
  stateBadge: { borderRadius: 999, paddingHorizontal: 9, paddingVertical: 5 },
  stateBadgeText: { fontSize: 10, fontWeight: "800" },
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5F3EF",
  },
  iconButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#F2FFFB",
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.dark,
    fontFamily: "Georgia",
  },
  headerSubtitle: {
    marginTop: 3,
    color: "#70869E",
    fontSize: 12,
    fontWeight: "700",
  },
  listContent: {
    padding: 16,
    paddingBottom: 36,
  },
  webListContent: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    paddingHorizontal: 28,
    paddingTop: 22,
    paddingBottom: 64,
  },
  webColumnWrapper: {
    gap: 18,
  },
  summaryCard: {
    minHeight: 110,
    marginBottom: 16,
    padding: 20,
    borderRadius: 26,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: { boxShadow: "0 20px 50px rgba(124, 58, 237, 0.16)" },
      default: {},
    }),
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryLabel: {
    color: "#D7FFF6",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  summaryValue: {
    marginTop: 5,
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
  },
  summaryDivider: {
    width: 1,
    height: 46,
    backgroundColor: "rgba(255,255,255,0.22)",
  },
  searchBox: {
    minHeight: 46,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EDE9FE",
    paddingHorizontal: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    minHeight: 44,
    fontSize: 14,
    color: "#111827",
    paddingVertical: 0,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  filterButton: {
    minHeight: 38,
    paddingHorizontal: 13,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: "#F5F3FF",
    borderWidth: 1,
    borderColor: "transparent",
  },
  activeFilter: {
    backgroundColor: "#FFFFFF",
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#64748B",
  },
  activeFilterText: {
    color: colors.dark,
  },
  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    ...Platform.select({
      web: {
        flex: 1,
        minHeight: 250,
        boxShadow: "0 14px 34px rgba(15, 23, 42, 0.05)",
      },
      default: {},
    }),
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  eventIcon: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#EDE9FE",
  },
  cardTitleWrap: {
    flex: 1,
    minWidth: 0,
  },
  eventTitle: {
    color: colors.dark,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "900",
  },
  eventStatus: {
    marginTop: 4,
    color: "#70869E",
    fontSize: 12,
    fontWeight: "800",
  },
  statusPill: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "900",
  },
  infoGrid: {
    marginTop: 14,
    gap: 9,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    flex: 1,
    color: "#31576C",
    fontSize: 13,
    fontWeight: "700",
  },
  loader: {
    marginTop: 42,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 56,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "900",
    color: colors.dark,
  },
  emptyText: {
    marginTop: 7,
    maxWidth: 320,
    textAlign: "center",
    color: "#70869E",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 20,
  },
  emptyButton: {
    minHeight: 42,
    marginTop: 16,
    paddingHorizontal: 17,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
});
