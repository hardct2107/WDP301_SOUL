import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  EventRating,
  RatingSort,
  RatingSummary,
  ratingService,
} from "@/api/ratingApi";
import { StarRating } from "./StarRating";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/store";

type Props = {
  eventId: string;
  eventTitle: string;
  completed: boolean;
  registrationStatus?: "registered" | "cancelled";
  attendanceStatus?: "not_checked_in" | "attended" | "absent";
  initialSummary?: RatingSummary;
  hideActionCard?: boolean;
};

export type EventRatingSectionHandle = {
  openModal: () => void;
};

type LoadMode = "initial" | "refresh";
type ModalPhase = "form" | "success";

type PromptPreference = {
  never?: boolean;
  snoozedUntil?: number;
};

const EMPTY_SUMMARY: RatingSummary = {
  average: 0,
  total: 0,
  distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
};

const SNOOZE_DURATION_MS = 24 * 60 * 60 * 1000;

const getErrorMessage = (reason: unknown, fallback: string) => {
  if (reason instanceof Error && reason.message) return reason.message;
  return fallback;
};

export const EventRatingSection = forwardRef<EventRatingSectionHandle, Props>(
  function EventRatingSection(
    {
      eventId,
      eventTitle,
      completed,
      registrationStatus,
      attendanceStatus,
      initialSummary = EMPTY_SUMMARY,
      hideActionCard = false,
    },
    ref
  ) {
  const userId = useAuthStore((state) => state.user?._id);
  const [summary, setSummary] = useState(initialSummary);
  const [ratings, setRatings] = useState<EventRating[]>([]);
  const [myRating, setMyRating] = useState<EventRating | null>(null);
  const [myRatingLoaded, setMyRatingLoaded] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");
  const [filter, setFilter] = useState<number | undefined>();
  const [sort, setSort] = useState<RatingSort>("newest");
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPhase, setModalPhase] = useState<ModalPhase>("form");
  const [formError, setFormError] = useState<string | null>(null);
  const [refreshError, setRefreshError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const autoPromptCheckedRef = useRef<string | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const promptStorageKey = `event-rating-prompt:${userId || "guest"}:${eventId}`;
  const canRate =
    completed &&
    registrationStatus === "registered" &&
    attendanceStatus === "attended";

  const load = useCallback(async (mode: LoadMode = "initial") => {
    if (mode === "initial") setInitialLoading(true);
    else setRefreshing(true);

    setLoadError(null);
    const errors: string[] = [];

    try {
      const [publicResult, myResult] = await Promise.allSettled([
        ratingService.getEventRatings(eventId, { rating: filter, sort, limit: 50 }),
        ratingService.getMyRating(eventId),
      ]);

      if (publicResult.status === "fulfilled" && publicResult.value.success) {
        setRatings(publicResult.value.data.ratings || []);
        setSummary(publicResult.value.data.summary || EMPTY_SUMMARY);
      } else {
        errors.push(
          publicResult.status === "rejected"
            ? getErrorMessage(publicResult.reason, "Không thể tải danh sách đánh giá.")
            : "Không thể tải danh sách đánh giá."
        );
      }

      if (myResult.status === "fulfilled" && myResult.value.success) {
        const mine = myResult.value.data?.[0] || null;
        setMyRating(mine);
        setMyRatingLoaded(true);
        if (mine) {
          setSelectedRating(mine.rating);
          setComment(mine.comment || "");
        }
      } else {
        setMyRatingLoaded(false);
        errors.push(
          myResult.status === "rejected"
            ? getErrorMessage(myResult.reason, "Không thể tải đánh giá của bạn.")
            : "Không thể tải đánh giá của bạn."
        );
      }

      if (errors.length) {
        setLoadError(errors.join(" "));
        return false;
      }

      return true;
    } finally {
      setInitialLoading(false);
      setRefreshing(false);
    }
  }, [eventId, filter, sort]);

  useEffect(() => {
    setMyRatingLoaded(false);
    autoPromptCheckedRef.current = null;
    load("initial");
  }, [load, eventId, userId]);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  const prepareForm = useCallback(() => {
    setModalPhase("form");
    setFormError(null);
    setRefreshError(null);
    setSelectedRating(myRating?.rating || 0);
    setComment(myRating?.comment || "");
  }, [myRating]);

  const openModal = useCallback(() => {
    prepareForm();
    setModalVisible(true);
  }, [prepareForm]);

  useImperativeHandle(ref, () => ({ openModal }), [openModal]);

  useEffect(() => {
    if (!canRate || initialLoading || !myRatingLoaded || myRating) return;
    if (autoPromptCheckedRef.current === promptStorageKey) return;

    autoPromptCheckedRef.current = promptStorageKey;
    let active = true;

    const checkPromptPreference = async () => {
      try {
        const rawPreference = await AsyncStorage.getItem(promptStorageKey);
        const preference: PromptPreference = rawPreference
          ? JSON.parse(rawPreference)
          : {};

        const snoozed = Boolean(
          preference.snoozedUntil && preference.snoozedUntil > Date.now()
        );

        if (active && !preference.never && !snoozed) openModal();
      } catch {
        if (active) openModal();
      }
    };

    checkPromptPreference();
    return () => {
      active = false;
    };
  }, [canRate, initialLoading, myRating, myRatingLoaded, openModal, promptStorageKey]);

  const closeModal = () => {
    if (saving) return;
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    setModalVisible(false);
    setFormError(null);
    setRefreshError(null);
  };

  const snoozePrompt = async () => {
    await AsyncStorage.setItem(
      promptStorageKey,
      JSON.stringify({ snoozedUntil: Date.now() + SNOOZE_DURATION_MS })
    );
    closeModal();
  };

  const disableAutoPrompt = async () => {
    await AsyncStorage.setItem(promptStorageKey, JSON.stringify({ never: true }));
    closeModal();
  };

  const closeAfterSuccess = () => {
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    successTimerRef.current = setTimeout(() => {
      setModalVisible(false);
    }, 1100);
  };

  const retryRefresh = async () => {
    setRefreshError(null);
    const refreshed = await load("refresh");
    if (refreshed) closeAfterSuccess();
    else setRefreshError("Đánh giá đã lưu nhưng dữ liệu chưa tải lại được. Vui lòng thử lại.");
  };

  const save = async () => {
    setFormError(null);

    if (!selectedRating) {
      setFormError("Vui lòng chọn từ 1 đến 5 sao.");
      return;
    }

    const cleanComment = comment.trim();
    if (cleanComment && (cleanComment.length < 10 || cleanComment.length > 500)) {
      setFormError("Nhận xét phải từ 10 đến 500 ký tự hoặc để trống.");
      return;
    }

    setSaving(true);
    const wasEditing = Boolean(myRating);

    try {
      const response = wasEditing
        ? await ratingService.update(eventId, selectedRating, cleanComment)
        : await ratingService.submit(eventId, selectedRating, cleanComment);

      setMyRating(response.data || myRating);
      setSuccessMessage(
        wasEditing
          ? "Đánh giá của bạn đã được cập nhật."
          : "Cảm ơn bạn đã chia sẻ trải nghiệm!"
      );
      setModalPhase("success");
      setRefreshError(null);
      await AsyncStorage.setItem(promptStorageKey, JSON.stringify({ never: true }));

      const refreshed = await load("refresh");
      if (refreshed) closeAfterSuccess();
      else setRefreshError("Đánh giá đã lưu nhưng dữ liệu chưa tải lại được. Vui lòng thử lại.");
    } catch (error: unknown) {
      setFormError(getErrorMessage(error, "Không thể lưu đánh giá. Vui lòng thử lại."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>Đánh giá sự kiện</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryScore}>
            <Text style={styles.average}>{summary.average.toFixed(1)}</Text>
            <StarRating value={Math.round(summary.average)} size={20} disabled />
            <Text style={styles.muted}>{summary.total} lượt đánh giá</Text>
          </View>
          <View style={styles.distribution}>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = summary.distribution[star as 1 | 2 | 3 | 4 | 5] || 0;
              const width = summary.total ? `${(count / summary.total) * 100}%` : "0%";
              return (
                <View key={star} style={styles.distributionRow}>
                  <Text style={styles.distributionLabel}>{star}★</Text>
                  <View style={styles.track}>
                    <View style={[styles.fill, { width: width as any }]} />
                  </View>
                  <Text style={styles.count}>{count}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {canRate && !hideActionCard ? (
        <View style={styles.callToActionCard}>
          <View style={styles.callToActionIcon}>
            <MaterialCommunityIcons name="message-star-outline" size={25} color={colors.primary} />
          </View>
          <View style={styles.callToActionContent}>
            <Text style={styles.callToActionTitle}>
              {myRating ? "Đánh giá của bạn" : "Bạn thấy sự kiện thế nào?"}
            </Text>
            <Text style={styles.callToActionText}>
              {myRating
                ? "Bạn có thể chỉnh sửa số sao và nhận xét đã gửi."
                : "Chia sẻ cảm nhận để SOUL cải thiện các sự kiện tiếp theo."}
            </Text>
          </View>
          <TouchableOpacity style={styles.openButton} onPress={openModal}>
            <Text style={styles.openButtonText}>
              {myRating ? "Chỉnh sửa" : "Đánh giá"}
            </Text>
          </TouchableOpacity>
          {myRating?.status === "hidden" && (
            <View style={styles.warning}>
              <MaterialCommunityIcons name="eye-off-outline" size={18} color="#B45309" />
              <Text style={styles.warningText}>
                Đánh giá này đang được admin ẩn. Nội dung chỉnh sửa vẫn cần admin khôi phục.
              </Text>
            </View>
          )}
        </View>
      ) : !canRate && completed ? (
        <View style={styles.notice}>
          <MaterialCommunityIcons name="information-outline" size={20} color="#0F766E" />
          <Text style={styles.noticeText}>
            {attendanceStatus === "absent"
              ? "Bạn được ghi nhận là không tham dự sự kiện này."
              : "Admin cần xác nhận bạn đã tham dự trước khi đánh giá."}
          </Text>
        </View>
      ) : null}

      <View style={styles.card}>
        <View style={styles.reviewTitleRow}>
          <Text style={styles.title}>Nhận xét từ người tham dự</Text>
          {refreshing && <ActivityIndicator size="small" color={colors.primary} />}
        </View>

        {loadError && (
          <View style={styles.sectionError}>
            <MaterialCommunityIcons name="alert-circle-outline" size={19} color="#B91C1C" />
            <Text style={styles.sectionErrorText}>{loadError}</Text>
            <TouchableOpacity onPress={() => load("refresh")}>
              <Text style={styles.retryText}>Thử lại</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.controls}>
          {[undefined, 5, 4, 3, 2, 1].map((value) => (
            <TouchableOpacity
              key={value || "all"}
              style={[styles.chip, filter === value && styles.activeChip]}
              onPress={() => setFilter(value)}
            >
              <Text style={[styles.chipText, filter === value && styles.activeChipText]}>
                {value ? `${value}★` : "Tất cả"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.sortRow}>
          {(["newest", "oldest", "highest", "lowest"] as RatingSort[]).map((value) => (
            <TouchableOpacity key={value} onPress={() => setSort(value)}>
              <Text style={[styles.sortText, sort === value && styles.activeSort]}>
                {value === "newest"
                  ? "Mới nhất"
                  : value === "oldest"
                    ? "Cũ nhất"
                    : value === "highest"
                      ? "Cao nhất"
                      : "Thấp nhất"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {initialLoading ? (
          <ActivityIndicator color={colors.primary} style={{ marginVertical: 20 }} />
        ) : ratings.length === 0 ? (
          <Text style={styles.empty}>Chưa có đánh giá phù hợp.</Text>
        ) : (
          ratings.map((item) => {
            const author = typeof item.userId === "string" ? null : item.userId;
            return (
              <View key={item._id} style={styles.review}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.author}>{author?.fullName || "Người dùng SOUL"}</Text>
                  <Text style={styles.date}>
                    {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                  </Text>
                </View>
                <StarRating value={item.rating} size={17} disabled />
                {item.comment ? <Text style={styles.comment}>{item.comment}</Text> : null}
              </View>
            );
          })
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={closeModal} />
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeModal}
              disabled={saving}
              accessibilityLabel="Đóng popup đánh giá"
            >
              <MaterialCommunityIcons name="close" size={21} color="#64748B" />
            </TouchableOpacity>

            {modalPhase === "success" ? (
              <View style={styles.successContent}>
                <View style={styles.successIcon}>
                  <MaterialCommunityIcons name="check" size={38} color="#FFFFFF" />
                </View>
                <Text style={styles.successTitle}>Đã ghi nhận đánh giá</Text>
                <Text style={styles.successText}>{successMessage}</Text>
                {refreshing && <ActivityIndicator color={colors.primary} />}
                {refreshError && (
                  <View style={styles.refreshErrorBox}>
                    <Text style={styles.refreshErrorText}>{refreshError}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={retryRefresh}>
                      <Text style={styles.retryButtonText}>Tải lại dữ liệu</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              <ScrollView
                contentContainerStyle={styles.modalScrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.modalIcon}>
                  <MaterialCommunityIcons name="message-outline" size={29} color={colors.primary} />
                </View>
                <Text style={styles.modalTitle}>
                  Bạn cảm thấy thế nào về {eventTitle}?
                </Text>
                <Text style={styles.modalSubtitle}>
                  Đánh giá của bạn giúp SOUL cải thiện trải nghiệm cho cộng đồng.
                </Text>

                <View style={styles.modalStars}>
                  <StarRating value={selectedRating} onChange={setSelectedRating} size={38} />
                </View>

                <Text style={styles.inputLabel}>Bình luận của bạn (không bắt buộc)</Text>
                <TextInput
                  value={comment}
                  onChangeText={(value) => {
                    setComment(value);
                    if (formError) setFormError(null);
                  }}
                  placeholder="Hãy chia sẻ trải nghiệm hoặc góp ý của bạn..."
                  placeholderTextColor="#94A3B8"
                  multiline
                  maxLength={500}
                  style={styles.input}
                />
                <Text style={styles.counter}>{comment.trim().length}/500</Text>

                {formError && (
                  <View style={styles.formErrorBox}>
                    <MaterialCommunityIcons name="alert-circle" size={18} color="#B91C1C" />
                    <Text style={styles.formErrorText}>{formError}</Text>
                  </View>
                )}

                <TouchableOpacity
                  style={[styles.submit, saving && styles.disabledSubmit]}
                  onPress={save}
                  disabled={saving}
                >
                  {saving ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <MaterialCommunityIcons name="send" size={18} color="#FFFFFF" />
                  )}
                  <Text style={styles.submitText}>
                    {saving
                      ? "Đang gửi..."
                      : myRating
                        ? "Cập nhật đánh giá"
                        : "Gửi đánh giá"}
                  </Text>
                </TouchableOpacity>

                {!myRating ? (
                  <View style={styles.promptActions}>
                    <TouchableOpacity style={styles.promptButton} onPress={disableAutoPrompt}>
                      <Text style={styles.promptButtonText}>Không nhắc lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.promptButton} onPress={snoozePrompt}>
                      <Text style={styles.promptButtonText}>Để sau</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.cancelEditButton} onPress={closeModal}>
                    <Text style={styles.cancelEditText}>Đóng</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: { gap: 14 },
  card: { width: "100%", minWidth: 0, overflow: "hidden", backgroundColor: "#FFFFFF", borderRadius: 18, padding: 18, gap: 12 },
  title: { fontSize: 18, fontWeight: "800", color: colors.dark },
  summaryRow: { width: "100%", minWidth: 0, flexDirection: "row", gap: 18, alignItems: "flex-start" },
  summaryScore: { width: 96, flexShrink: 0 },
  average: { fontSize: 38, fontWeight: "900", color: colors.dark },
  muted: { color: "#64748B", marginTop: 4 },
  distribution: { flex: 1, minWidth: 0, gap: 5 },
  distributionRow: { flexDirection: "row", alignItems: "center", gap: 7 },
  distributionLabel: { width: 26, fontSize: 12, color: "#64748B" },
  track: { height: 7, flex: 1, backgroundColor: "#E2E8F0", borderRadius: 8, overflow: "hidden" },
  fill: { height: "100%", backgroundColor: "#F59E0B" },
  count: { width: 24, fontSize: 12, color: "#64748B", textAlign: "right" },
  callToActionCard: { backgroundColor: "#FFFFFF", borderRadius: 18, padding: 16, flexDirection: "row", alignItems: "center", gap: 12, flexWrap: "wrap" },
  callToActionIcon: { width: 46, height: 46, borderRadius: 14, backgroundColor: "#CCFBF1", alignItems: "center", justifyContent: "center" },
  callToActionContent: { flex: 1, minWidth: 150 },
  callToActionTitle: { color: colors.dark, fontWeight: "800", fontSize: 15 },
  callToActionText: { color: "#64748B", lineHeight: 19, marginTop: 3, fontSize: 13 },
  openButton: { backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 14, minHeight: 40, justifyContent: "center" },
  openButtonText: { color: "#FFFFFF", fontWeight: "800" },
  warning: { width: "100%", flexDirection: "row", gap: 8, padding: 10, borderRadius: 10, backgroundColor: "#FEF3C7" },
  warningText: { flex: 1, color: "#92400E", lineHeight: 19 },
  notice: { flexDirection: "row", gap: 8, backgroundColor: "#CCFBF1", padding: 14, borderRadius: 14 },
  noticeText: { flex: 1, color: "#115E59", lineHeight: 20 },
  reviewTitleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sectionError: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#FEF2F2", borderRadius: 10, padding: 10 },
  sectionErrorText: { color: "#991B1B", flex: 1, fontSize: 13 },
  retryText: { color: "#B91C1C", fontWeight: "800" },
  controls: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  chip: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999, backgroundColor: "#F1F5F9" },
  activeChip: { backgroundColor: colors.primary },
  chipText: { color: "#475569", fontWeight: "700", fontSize: 12 },
  activeChipText: { color: "#FFFFFF" },
  sortRow: { flexDirection: "row", flexWrap: "wrap", gap: 18 },
  sortText: { color: "#64748B", fontSize: 13 },
  activeSort: { color: colors.primary, fontWeight: "800" },
  empty: { color: "#64748B", textAlign: "center", paddingVertical: 18 },
  review: { borderTopWidth: 1, borderTopColor: "#E2E8F0", paddingTop: 12, gap: 5 },
  reviewHeader: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  author: { color: colors.dark, fontWeight: "800", flex: 1 },
  date: { color: "#94A3B8", fontSize: 12 },
  comment: { color: "#475569", lineHeight: 20 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(15, 23, 42, 0.58)", alignItems: "center", justifyContent: "center", padding: 18 },
  modalBackdrop: { ...StyleSheet.absoluteFillObject },
  modalCard: { width: "100%", maxWidth: 500, maxHeight: "92%", backgroundColor: "#FFFFFF", borderRadius: 22, padding: 22, shadowColor: "#000000", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.22, shadowRadius: 28, elevation: 12 },
  closeButton: { position: "absolute", right: 12, top: 12, zIndex: 2, width: 36, height: 36, alignItems: "center", justifyContent: "center", borderRadius: 18, backgroundColor: "#F8FAFC" },
  modalScrollContent: { alignItems: "stretch", paddingTop: 8 },
  modalIcon: { width: 56, height: 56, alignSelf: "center", alignItems: "center", justifyContent: "center", backgroundColor: "#CCFBF1", borderRadius: 18, marginBottom: 14 },
  modalTitle: { color: colors.dark, fontWeight: "900", fontSize: 20, textAlign: "center", paddingHorizontal: 25 },
  modalSubtitle: { color: "#64748B", lineHeight: 20, textAlign: "center", marginTop: 8, paddingHorizontal: 18 },
  modalStars: { alignItems: "center", marginVertical: 22 },
  inputLabel: { color: colors.dark, fontWeight: "800", fontSize: 13, marginBottom: 8 },
  input: { minHeight: 105, borderWidth: 1, borderColor: "#CBD5E1", borderRadius: 12, padding: 12, color: colors.dark, textAlignVertical: "top", backgroundColor: "#FFFFFF" },
  counter: { color: "#94A3B8", textAlign: "right", fontSize: 12, marginTop: 5 },
  formErrorBox: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#FEF2F2", borderRadius: 10, padding: 10, marginTop: 8 },
  formErrorText: { color: "#991B1B", flex: 1, lineHeight: 18, fontSize: 13 },
  submit: { backgroundColor: colors.primary, borderRadius: 12, minHeight: 48, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 14 },
  disabledSubmit: { opacity: 0.7 },
  submitText: { color: "#FFFFFF", fontWeight: "800" },
  promptActions: { flexDirection: "row", gap: 10, marginTop: 10 },
  promptButton: { flex: 1, minHeight: 42, borderRadius: 10, borderWidth: 1, borderColor: "#E2E8F0", alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
  promptButtonText: { color: "#475569", fontWeight: "700", fontSize: 13 },
  cancelEditButton: { alignSelf: "center", paddingHorizontal: 18, paddingVertical: 10, marginTop: 8 },
  cancelEditText: { color: "#64748B", fontWeight: "700" },
  successContent: { alignItems: "center", paddingVertical: 30, paddingHorizontal: 10, gap: 12 },
  successIcon: { width: 70, height: 70, borderRadius: 35, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  successTitle: { color: colors.dark, fontWeight: "900", fontSize: 21, textAlign: "center" },
  successText: { color: "#64748B", lineHeight: 20, textAlign: "center" },
  refreshErrorBox: { width: "100%", backgroundColor: "#FFF7ED", borderRadius: 12, padding: 12, gap: 10 },
  refreshErrorText: { color: "#9A3412", lineHeight: 19, textAlign: "center" },
  retryButton: { alignSelf: "center", backgroundColor: "#FFFFFF", borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8 },
  retryButtonText: { color: "#C2410C", fontWeight: "800" },
});
