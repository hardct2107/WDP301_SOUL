import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import {
  adminRatingService,
  EventRating,
  RatingSort,
  RatingStatus,
} from "@/api/ratingApi";
import { StarRating } from "@/components/ratings/StarRating";

type Stats = {
  average: number;
  total: number;
  ratedEvents: number;
  hiddenTotal: number;
  distribution: Record<number, number>;
};

type ToastState = {
  message: string;
  type: "success" | "error";
} | null;

const EMPTY_STATS: Stats = {
  average: 0,
  total: 0,
  ratedEvents: 0,
  hiddenTotal: 0,
  distribution: {},
};

const SOUL_PURPLE = "#7C3AED";
const SOUL_PURPLE_SOFT = "#EDE9FE";
const STAR = "#F59E0B";

const reasons = [
  ["spam", "Spam"],
  ["offensive", "Nội dung xúc phạm"],
  ["advertisement", "Quảng cáo"],
  ["other", "Khác"],
];

const sortOptions: { value: RatingSort; label: string }[] = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "highest", label: "Cao nhất" },
  { value: "lowest", label: "Thấp nhất" },
];

const statusOptions: { value: "all" | RatingStatus; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "visible", label: "Hiển thị" },
  { value: "hidden", label: "Đã ẩn" },
];

const initials = (name?: string) =>
  (name || "SOUL User")
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

export default function AdminRatingsScreen() {
  const { eventId: routeEventId } = useLocalSearchParams<{
    eventId?: string | string[];
  }>();
  const { width } = useWindowDimensions();
  const compact = width < 760;
  const initialEventId = Array.isArray(routeEventId)
    ? routeEventId[0]
    : routeEventId;
  const [eventFilter, setEventFilter] = useState(
    initialEventId && /^[0-9a-fA-F]{24}$/.test(initialEventId)
      ? initialEventId
      : undefined
  );

  const [ratings, setRatings] = useState<EventRating[]>([]);
  const [stats, setStats] = useState<Stats>(EMPTY_STATS);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | RatingStatus>("all");
  const [stars, setStars] = useState<number | undefined>();
  const [sort, setSort] = useState<RatingSort>("newest");
  const [selected, setSelected] = useState<EventRating | null>(null);
  const [hideTarget, setHideTarget] = useState<EventRating | null>(null);
  const [hideReason, setHideReason] = useState("spam");
  const [hideNote, setHideNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput.trim()), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [list, summary] = await Promise.all([
        adminRatingService.getRatings({
          search: search || undefined,
          status,
          rating: stars,
          sort,
          eventId: eventFilter,
          limit: 100,
        }),
        adminRatingService.getStatistics(eventFilter),
      ]);
      const listData = list.data as
        | EventRating[]
        | { ratings?: EventRating[] }
        | undefined;
      setRatings(
        Array.isArray(listData)
          ? listData
          : Array.isArray(listData?.ratings)
            ? listData.ratings
            : []
      );
      setStats(summary.data || EMPTY_STATS);
    } catch (error: any) {
      showToast(
        error.response?.data?.message || error.message || "Không thể tải đánh giá",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [eventFilter, search, showToast, sort, stars, status]);

  useFocusEffect(useCallback(() => {
    load();
  }, [load]));

  const qualityBadge = useMemo(() => {
    if (!stats.total) return { label: "Chưa có dữ liệu", color: "#64748B", bg: "#F1F5F9" };
    if (stats.average >= 4.5) return { label: "↑ Xuất sắc", color: "#15803D", bg: "#DCFCE7" };
    if (stats.average >= 4) return { label: "Tốt", color: "#047857", bg: "#D1FAE5" };
    if (stats.average >= 3) return { label: "Ổn định", color: "#B45309", bg: "#FEF3C7" };
    return { label: "Cần cải thiện", color: "#B91C1C", bg: "#FEE2E2" };
  }, [stats.average, stats.total]);

  const confirmHide = async () => {
    if (!hideTarget) return;
    if (hideReason === "other" && !hideNote.trim()) {
      showToast("Vui lòng mô tả lý do khác.", "error");
      return;
    }

    setSaving(true);
    try {
      await adminRatingService.hide(hideTarget._id, hideReason, hideNote.trim());
      setHideTarget(null);
      setHideNote("");
      showToast("Đã ẩn đánh giá.", "success");
      await load();
    } catch (error: any) {
      showToast(error.response?.data?.message || error.message || "Không thể ẩn đánh giá", "error");
    } finally {
      setSaving(false);
    }
  };

  const restore = async (item: EventRating) => {
    try {
      await adminRatingService.restore(item._id);
      showToast("Đã khôi phục đánh giá.", "success");
      await load();
    } catch (error: any) {
      showToast(error.response?.data?.message || error.message || "Không thể khôi phục", "error");
    }
  };

  const exportCsv = async () => {
    try {
      const csv = await adminRatingService.exportCsv();
      if (Platform.OS === "web" && typeof document !== "undefined") {
        const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = `event-ratings-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
        showToast("Đã xuất báo cáo CSV.", "success");
      } else {
        Alert.alert("Xuất CSV", "Tải file CSV hiện được hỗ trợ trên phiên bản web.");
      }
    } catch (error: any) {
      showToast(error.response?.data?.message || error.message || "Không thể xuất CSV", "error");
    }
  };

  const renderRating = ({ item }: { item: EventRating }) => {
    const user = typeof item.userId === "string" ? null : item.userId;
    const event = typeof item.eventId === "string" ? null : item.eventId;
    const hidden = item.status === "hidden";
    const expanded = Boolean(expandedReviews[item._id]);
    const canExpand = Boolean(item.comment && item.comment.length > 150);

    return (
      <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials(user?.fullName)}</Text>
          </View>
          <View style={styles.reviewIdentity}>
            <Text style={styles.userName}>{user?.fullName || "Người dùng SOUL"}</Text>
            <Text style={styles.eventName} numberOfLines={1}>
              {event?.title || "Sự kiện SOUL"}
            </Text>
          </View>
          <View style={[styles.statusBadge, hidden ? styles.hiddenBadge : styles.visibleBadge]}>
            <Text style={[styles.statusBadgeText, hidden ? styles.hiddenText : styles.visibleText]}>
              {hidden ? "Đã ẩn" : "Hiển thị"}
            </Text>
          </View>
        </View>

        <View style={styles.reviewMetaRow}>
          <StarRating value={item.rating} size={18} disabled />
          <View style={styles.metaDot} />
          <MaterialCommunityIcons name="clock-outline" size={15} color="#94A3B8" />
          <Text style={styles.reviewDate}>
            {new Date(item.createdAt).toLocaleDateString("vi-VN")}
          </Text>
        </View>

        {item.comment ? (
          <View>
            <Text style={styles.reviewComment} numberOfLines={expanded ? undefined : 3}>
              “{item.comment}”
            </Text>
            {canExpand && (
              <TouchableOpacity
                style={styles.readMoreButton}
                onPress={() => setExpandedReviews((current) => ({
                  ...current,
                  [item._id]: !expanded,
                }))}
              >
                <Text style={styles.readMoreText}>{expanded ? "Thu gọn" : "Đọc thêm"}</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <Text style={styles.noComment}>Không có nhận xét bằng văn bản.</Text>
        )}

        <View style={styles.reviewActions}>
          <TouchableOpacity style={styles.detailButton} onPress={() => setSelected(item)}>
            <MaterialCommunityIcons name="open-in-new" size={16} color="#475569" />
            <Text style={styles.detailButtonText}>Xem chi tiết</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.moderationButton, hidden && styles.restoreButton]}
            onPress={() => hidden ? restore(item) : setHideTarget(item)}
          >
            <MaterialCommunityIcons
              name={hidden ? "eye-outline" : "eye-off-outline"}
              size={16}
              color={hidden ? "#047857" : "#B91C1C"}
            />
            <Text style={[styles.moderationButtonText, hidden && styles.restoreButtonText]}>
              {hidden ? "Hiện đánh giá" : "Ẩn đánh giá"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {toast && (
        <View style={[styles.toast, toast.type === "success" ? styles.toastSuccess : styles.toastError]}>
          <MaterialCommunityIcons
            name={toast.type === "success" ? "check-circle" : "alert-circle"}
            size={18}
            color="#FFFFFF"
          />
          <Text style={styles.toastText}>{toast.message}</Text>
        </View>
      )}

      <LinearGradient
        colors={["#D97706", "#F59E0B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerShell}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerCopy}>
            <Text style={[styles.headerTitle, { color: "#fff" }]}>Quản lý đánh giá</Text>
            <Text style={[styles.headerSubtitle, { color: "rgba(255,255,255,0.9)" }]}>Phản hồi từ người tham dự sự kiện</Text>
          </View>
          <TouchableOpacity style={[styles.exportButton, { backgroundColor: "rgba(255,255,255,0.2)", borderColor: "transparent" }]} onPress={exportCsv}>
            <MaterialCommunityIcons name="download-outline" size={18} color="#fff" />
            {!compact && <Text style={[styles.exportText, { color: "#fff" }]}>Xuất CSV</Text>}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <FlatList
        data={ratings}
        renderItem={renderRating}
        keyExtractor={(item) => item._id}
        refreshing={loading}
        onRefresh={load}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.statsGrid}>
              <StatCard
                icon="star-outline"
                iconColor={STAR}
                iconBg="#FFFBEB"
                value={loading ? "—" : stats.average.toFixed(1)}
                label="Điểm trung bình"
                context={qualityBadge.label}
                contextColor={qualityBadge.color}
                contextBg={qualityBadge.bg}
                compact={compact}
              />
              <StatCard
                icon="message-text-outline"
                iconColor={SOUL_PURPLE}
                iconBg={SOUL_PURPLE_SOFT}
                value={loading ? "—" : stats.total}
                label="Tổng đánh giá"
                compact={compact}
              />
              <StatCard
                icon="calendar-check-outline"
                iconColor="#2563EB"
                iconBg="#DBEAFE"
                value={loading ? "—" : stats.ratedEvents}
                label="Sự kiện có đánh giá"
                compact={compact}
              />
              <StatCard
                icon="eye-off-outline"
                iconColor="#64748B"
                iconBg="#F1F5F9"
                value={loading ? "—" : stats.hiddenTotal}
                label="Đã ẩn"
                compact={compact}
              />
            </View>

            <View style={[styles.overviewCard, compact && styles.overviewCardCompact]}>
              <Text style={styles.sectionEyebrow}>TỔNG QUAN ĐIỂM</Text>
              <View style={[styles.overviewBody, compact && styles.overviewBodyCompact]}>
                <View style={[styles.averageBlock, compact && styles.averageBlockCompact]}>
                  <Text style={styles.overviewAverage}>{stats.average.toFixed(1)}</Text>
                  <StarRating value={Math.round(stats.average)} size={20} disabled />
                  <Text style={styles.overviewCount}>{stats.total} đánh giá</Text>
                </View>
                <View style={[styles.distributionList, compact && styles.distributionListCompact]}>
                  {[5, 4, 3, 2, 1].map((value) => {
                    const count = stats.distribution?.[value] || 0;
                    const percentage = stats.total ? Math.round((count / stats.total) * 100) : 0;
                    return (
                      <View key={value} style={styles.distributionRow}>
                        <Text style={styles.distributionLabel}>☆ {value}</Text>
                        <View style={styles.progressTrack}>
                          <View style={[styles.progressFill, { width: `${percentage}%` as any }]} />
                        </View>
                        <Text style={styles.distributionCount}>{count}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>

            <View style={styles.listHeadingRow}>
              <View>
                <Text style={styles.listHeading}>Danh sách đánh giá</Text>
                <Text style={styles.resultCount}>{ratings.length} kết quả phù hợp</Text>
              </View>
            </View>

            {eventFilter && (
              <View style={styles.eventFilterRow}>
                <View style={styles.eventFilterChip}>
                  <MaterialCommunityIcons name="calendar-filter" size={16} color={SOUL_PURPLE} />
                  <Text style={styles.eventFilterText}>
                    Đang lọc theo sự kiện · {eventFilter.slice(-6)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setEventFilter(undefined)}
                    accessibilityRole="button"
                    accessibilityLabel="Xóa bộ lọc sự kiện"
                  >
                    <MaterialCommunityIcons name="close" size={17} color={SOUL_PURPLE} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.eventFilterHint}>Xóa bộ lọc để xem đánh giá của mọi sự kiện.</Text>
              </View>
            )}

            <View style={styles.toolbar}>
              <View style={styles.searchBox}>
                <MaterialCommunityIcons name="magnify" size={19} color="#94A3B8" />
                <TextInput
                  value={searchInput}
                  onChangeText={setSearchInput}
                  placeholder="Tìm user, sự kiện hoặc nội dung..."
                  placeholderTextColor="#94A3B8"
                  style={styles.searchInput}
                />
                {searchInput.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchInput("")}>
                    <MaterialCommunityIcons name="close-circle" size={18} color="#CBD5E1" />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.statusFilters}>
                {statusOptions.map((item) => (
                  <FilterButton
                    key={item.value}
                    label={item.label}
                    active={status === item.value}
                    onPress={() => setStatus(item.value)}
                  />
                ))}
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.secondaryFilters}
            >
              {sortOptions.map((item) => (
                <FilterButton
                  key={item.value}
                  label={item.label}
                  active={sort === item.value}
                  onPress={() => setSort(item.value)}
                />
              ))}
              {[5, 4, 3, 2, 1].map((value) => (
                <FilterButton
                  key={value}
                  label={`${value}★`}
                  active={stars === value}
                  onPress={() => setStars(stars === value ? undefined : value)}
                />
              ))}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <View style={styles.skeletonList}>
              {[1, 2, 3].map((item) => <ReviewSkeleton key={item} />)}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <MaterialCommunityIcons name="message-star-outline" size={34} color={SOUL_PURPLE} />
              </View>
              <Text style={styles.emptyTitle}>Không có đánh giá phù hợp</Text>
              <Text style={styles.emptyText}>Thử thay đổi từ khóa hoặc bộ lọc để xem thêm kết quả.</Text>
              <TouchableOpacity
                style={styles.clearFiltersButton}
                onPress={() => {
                  setSearchInput("");
                  setStatus("all");
                  setStars(undefined);
                  setSort("newest");
                  setEventFilter(undefined);
                }}
              >
                <Text style={styles.clearFiltersText}>Xóa bộ lọc</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />

      <Modal visible={Boolean(hideTarget)} transparent animationType="fade" onRequestClose={() => setHideTarget(null)}>
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setHideTarget(null)} />
          <View style={styles.actionModal}>
            <Text style={styles.modalTitle}>Ẩn đánh giá</Text>
            <Text style={styles.modalSubtitle}>Chọn lý do để lưu lịch sử kiểm duyệt.</Text>
            {reasons.map(([value, label]) => (
              <TouchableOpacity key={value} style={styles.reasonRow} onPress={() => setHideReason(value)}>
                <MaterialCommunityIcons
                  name={hideReason === value ? "radiobox-marked" : "radiobox-blank"}
                  size={21}
                  color={SOUL_PURPLE}
                />
                <Text style={styles.reasonText}>{label}</Text>
              </TouchableOpacity>
            ))}
            <TextInput
              value={hideNote}
              onChangeText={setHideNote}
              placeholder="Ghi chú kiểm duyệt"
              placeholderTextColor="#94A3B8"
              multiline
              maxLength={500}
              style={styles.noteInput}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setHideTarget(null)}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmHide} disabled={saving}>
                {saving && <ActivityIndicator size="small" color="#FFFFFF" />}
                <Text style={styles.confirmButtonText}>{saving ? "Đang lưu..." : "Xác nhận ẩn"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={Boolean(selected)} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setSelected(null)} />
          <View style={styles.actionModal}>
            <View style={styles.detailModalHeader}>
              <Text style={styles.modalTitle}>Chi tiết đánh giá</Text>
              <TouchableOpacity onPress={() => setSelected(null)}>
                <MaterialCommunityIcons name="close" size={21} color="#64748B" />
              </TouchableOpacity>
            </View>
            {selected && (
              <>
                <Detail label="Người dùng" value={typeof selected.userId === "string" ? selected.userId : `${selected.userId.fullName} (${selected.userId.email || "không có email"})`} />
                <Detail label="Sự kiện" value={typeof selected.eventId === "string" ? selected.eventId : selected.eventId.title} />
                <StarRating value={selected.rating} disabled />
                <Detail label="Nhận xét" value={selected.comment || "Không có nhận xét"} />
                <Detail label="Trạng thái" value={selected.status === "visible" ? "Hiển thị" : "Đã ẩn"} />
                {selected.hiddenReason ? <Detail label="Lý do ẩn" value={`${selected.hiddenReason}${selected.hiddenNote ? ` – ${selected.hiddenNote}` : ""}`} /> : null}
                <Detail label="Ngày tạo" value={new Date(selected.createdAt).toLocaleString("vi-VN")} />
              </>
            )}
            <TouchableOpacity style={styles.confirmButton} onPress={() => setSelected(null)}>
              <Text style={styles.confirmButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function StatCard({
  icon,
  iconColor,
  iconBg,
  value,
  label,
  context,
  contextColor,
  contextBg,
  compact,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  iconBg: string;
  value: string | number;
  label: string;
  context?: string;
  contextColor?: string;
  contextBg?: string;
  compact: boolean;
}) {
  return (
    <View style={[styles.statCard, compact && styles.statCardCompact]}>
      <View style={[styles.statIcon, { backgroundColor: iconBg }]}>
        <MaterialCommunityIcons name={icon} size={21} color={iconColor} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      {context && (
        <View style={[styles.contextBadge, { backgroundColor: contextBg }]}>
          <Text style={[styles.contextText, { color: contextColor }]}>{context}</Text>
        </View>
      )}
    </View>
  );
}

function FilterButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.filterButton, active && styles.activeFilterButton]} onPress={onPress}>
      <Text style={[styles.filterButtonText, active && styles.activeFilterButtonText]}>{label}</Text>
    </TouchableOpacity>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function ReviewSkeleton() {
  return (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonHeader}>
        <View style={[styles.skeleton, styles.skeletonAvatar]} />
        <View style={{ flex: 1, gap: 8 }}>
          <View style={[styles.skeleton, { width: "36%", height: 14 }]} />
          <View style={[styles.skeleton, { width: "55%", height: 11 }]} />
        </View>
      </View>
      <View style={[styles.skeleton, { width: "24%", height: 13 }]} />
      <View style={[styles.skeleton, { width: "90%", height: 12 }]} />
      <View style={[styles.skeleton, { width: "70%", height: 12 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  headerShell: { backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
  headerContent: { width: "100%", maxWidth: 1280, alignSelf: "center", minHeight: 74, flexDirection: "row", alignItems: "center", paddingHorizontal: 22, gap: 12 },
  backButton: { width: 42, height: 34, borderRadius: 8, borderWidth: 1, borderColor: "#CBD5E1", alignItems: "center", justifyContent: "center" },
  headerCopy: { flex: 1 },
  headerTitle: { fontSize: 20, lineHeight: 25, fontWeight: "900", color: "#0F172A" },
  headerSubtitle: { marginTop: 2, fontSize: 12, color: "#64748B" },
  exportButton: { minHeight: 40, paddingHorizontal: 15, borderRadius: 9, borderWidth: 1, borderColor: "#CBD5E1", backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7 },
  exportText: { color: "#0F172A", fontWeight: "800", fontSize: 13 },
  content: { width: "100%", maxWidth: 1280, alignSelf: "center", paddingHorizontal: 22, paddingTop: 22, paddingBottom: 48 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 20 },
  statCard: { flexGrow: 1, flexBasis: 220, minHeight: 134, backgroundColor: "#FFFFFF", borderRadius: 16, padding: 18, borderWidth: 1, borderColor: "#E2E8F0", shadowColor: "#0F172A", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 1 },
  statCardCompact: { flexBasis: "46%", minHeight: 128, padding: 15 },
  statIcon: { width: 34, height: 34, borderRadius: 9, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  statValue: { color: "#0F172A", fontWeight: "500", fontSize: 29, lineHeight: 33 },
  statLabel: { color: "#64748B", fontSize: 12, marginTop: 2 },
  contextBadge: { alignSelf: "flex-start", marginTop: 7, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 999 },
  contextText: { fontSize: 10, fontWeight: "800" },
  overviewCard: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 20, borderWidth: 1, borderColor: "#E2E8F0", marginBottom: 26 },
  overviewCardCompact: { padding: 18 },
  sectionEyebrow: { color: "#334155", fontSize: 12, fontWeight: "900", letterSpacing: 0.4, marginBottom: 18 },
  overviewBody: { flexDirection: "row", gap: 24, alignItems: "flex-start" },
  overviewBodyCompact: { flexDirection: "column", gap: 18 },
  averageBlock: { width: 130 },
  averageBlockCompact: { width: "100%" },
  overviewAverage: { fontSize: 44, lineHeight: 50, color: "#0F172A", fontWeight: "500" },
  overviewCount: { color: "#64748B", fontSize: 12, marginTop: 8 },
  distributionList: { flex: 1, gap: 10, paddingTop: 5 },
  distributionListCompact: { width: "100%", alignSelf: "stretch" },
  distributionRow: { flexDirection: "row", alignItems: "center", gap: 9 },
  distributionLabel: { width: 28, color: STAR, fontSize: 12, fontWeight: "700" },
  progressTrack: { flex: 1, height: 7, borderRadius: 999, backgroundColor: "#F1F5F9", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 999, backgroundColor: STAR },
  distributionCount: { width: 24, textAlign: "right", color: "#64748B", fontSize: 12 },
  listHeadingRow: { marginBottom: 12 },
  listHeading: { color: "#0F172A", fontSize: 17, fontWeight: "900" },
  resultCount: { color: "#64748B", fontSize: 12, marginTop: 3 },
  eventFilterRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 12 },
  eventFilterChip: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 11,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#C4B5FD",
    backgroundColor: "#F5F3FF",
  },
  eventFilterText: { color: "#5B21B6", fontSize: 12, fontWeight: "700" },
  eventFilterHint: { color: "#64748B", fontSize: 12 },
  toolbar: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 10 },
  searchBox: { flexGrow: 1, flexBasis: 320, minHeight: 44, flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#FFFFFF", borderRadius: 9, borderWidth: 1, borderColor: "#E2E8F0", paddingHorizontal: 12 },
  searchInput: { flex: 1, color: "#0F172A", fontSize: 13, paddingVertical: 0 },
  statusFilters: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  secondaryFilters: { flexDirection: "row", gap: 6, paddingBottom: 14 },
  filterButton: { minHeight: 36, paddingHorizontal: 13, borderRadius: 8, borderWidth: 1, borderColor: "#CBD5E1", backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
  activeFilterButton: { borderColor: SOUL_PURPLE, backgroundColor: SOUL_PURPLE_SOFT },
  filterButtonText: { color: "#334155", fontSize: 12, fontWeight: "700" },
  activeFilterButtonText: { color: "#5B21B6" },
  reviewCard: { backgroundColor: "#FFFFFF", borderRadius: 14, padding: 17, marginBottom: 12, borderWidth: 1, borderColor: "#E2E8F0", shadowColor: "#0F172A", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.035, shadowRadius: 9, elevation: 1 },
  reviewHeader: { flexDirection: "row", alignItems: "flex-start", gap: 11 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: "#DDD6FE", alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#6D28D9", fontSize: 12, fontWeight: "900" },
  reviewIdentity: { flex: 1, minWidth: 0 },
  userName: { color: "#0F172A", fontSize: 14, fontWeight: "900" },
  eventName: { color: "#2563EB", fontSize: 12, marginTop: 3, fontWeight: "700" },
  statusBadge: { borderRadius: 999, paddingHorizontal: 9, paddingVertical: 5 },
  visibleBadge: { backgroundColor: "#DCFCE7" },
  hiddenBadge: { backgroundColor: "#FEE2E2" },
  statusBadgeText: { fontSize: 10, fontWeight: "900" },
  visibleText: { color: "#15803D" },
  hiddenText: { color: "#B91C1C" },
  reviewMetaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 12 },
  metaDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: "#CBD5E1" },
  reviewDate: { color: "#64748B", fontSize: 11 },
  reviewComment: { color: "#334155", fontSize: 14, lineHeight: 21, marginTop: 11 },
  noComment: { color: "#94A3B8", fontSize: 13, fontStyle: "italic", marginTop: 11 },
  readMoreButton: { alignSelf: "flex-start", marginTop: 4 },
  readMoreText: { color: SOUL_PURPLE, fontSize: 12, fontWeight: "800" },
  reviewActions: { flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-end", gap: 8, marginTop: 14, paddingTop: 13, borderTopWidth: 1, borderTopColor: "#F1F5F9" },
  detailButton: { minHeight: 36, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 11, borderRadius: 8, borderWidth: 1, borderColor: "#CBD5E1", backgroundColor: "#FFFFFF" },
  detailButtonText: { color: "#475569", fontSize: 12, fontWeight: "800" },
  moderationButton: { minHeight: 36, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 11, borderRadius: 8, borderWidth: 1, borderColor: "#FECACA", backgroundColor: "#FFFFFF" },
  restoreButton: { borderColor: "#A7F3D0" },
  moderationButtonText: { color: "#B91C1C", fontSize: 12, fontWeight: "800" },
  restoreButtonText: { color: "#047857" },
  skeletonList: { gap: 12 },
  skeletonCard: { backgroundColor: "#FFFFFF", borderRadius: 14, padding: 17, gap: 12, borderWidth: 1, borderColor: "#E2E8F0" },
  skeletonHeader: { flexDirection: "row", alignItems: "center", gap: 11 },
  skeleton: { backgroundColor: "#E2E8F0", borderRadius: 999 },
  skeletonAvatar: { width: 42, height: 42 },
  emptyState: { backgroundColor: "#FFFFFF", borderRadius: 16, borderWidth: 1, borderColor: "#E2E8F0", alignItems: "center", paddingVertical: 42, paddingHorizontal: 20 },
  emptyIcon: { width: 62, height: 62, borderRadius: 20, backgroundColor: SOUL_PURPLE_SOFT, alignItems: "center", justifyContent: "center" },
  emptyTitle: { color: "#0F172A", fontSize: 16, fontWeight: "900", marginTop: 14 },
  emptyText: { color: "#64748B", fontSize: 13, textAlign: "center", marginTop: 5 },
  clearFiltersButton: { marginTop: 16, minHeight: 38, paddingHorizontal: 14, borderRadius: 8, backgroundColor: SOUL_PURPLE, justifyContent: "center" },
  clearFiltersText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  toast: { position: "absolute", zIndex: 20, top: 16, alignSelf: "center", maxWidth: 460, minHeight: 44, marginHorizontal: 16, paddingHorizontal: 14, borderRadius: 10, flexDirection: "row", alignItems: "center", gap: 8, shadowColor: "#000000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.16, shadowRadius: 12, elevation: 8 },
  toastSuccess: { backgroundColor: "#047857" },
  toastError: { backgroundColor: "#B91C1C" },
  toastText: { flex: 1, color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(15, 23, 42, 0.38)", alignItems: "center", justifyContent: "center", padding: 20 },
  modalBackdrop: { ...StyleSheet.absoluteFillObject },
  actionModal: { width: "100%", maxWidth: 520, backgroundColor: "#FFFFFF", borderRadius: 18, padding: 22, gap: 12, shadowColor: "#000000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.18, shadowRadius: 22, elevation: 10 },
  modalTitle: { color: "#0F172A", fontSize: 20, fontWeight: "900" },
  modalSubtitle: { color: "#64748B", fontSize: 13 },
  reasonRow: { flexDirection: "row", alignItems: "center", gap: 9, paddingVertical: 5 },
  reasonText: { color: "#334155", fontSize: 13 },
  noteInput: { minHeight: 86, borderWidth: 1, borderColor: "#CBD5E1", borderRadius: 10, padding: 11, textAlignVertical: "top", color: "#0F172A" },
  modalActions: { flexDirection: "row", gap: 10, marginTop: 5 },
  cancelButton: { flex: 1, minHeight: 44, borderRadius: 9, borderWidth: 1, borderColor: "#CBD5E1", alignItems: "center", justifyContent: "center" },
  cancelButtonText: { color: "#334155", fontWeight: "800" },
  confirmButton: { flex: 1, minHeight: 44, borderRadius: 9, backgroundColor: SOUL_PURPLE, flexDirection: "row", gap: 7, alignItems: "center", justifyContent: "center", paddingHorizontal: 13 },
  confirmButtonText: { color: "#FFFFFF", fontWeight: "800" },
  detailModalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  detailRow: { gap: 3, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  detailLabel: { color: "#64748B", fontSize: 11, fontWeight: "800", textTransform: "uppercase" },
  detailValue: { color: "#0F172A", lineHeight: 20, fontSize: 13 },
});
