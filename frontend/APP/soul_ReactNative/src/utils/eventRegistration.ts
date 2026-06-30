export type EventStatus = "upcoming" | "ongoing" | "completed" | "cancelled";
export type RegistrationStatus = "registered" | "cancelled";
export type AttendanceStatus = "not_checked_in" | "attended" | "absent";
export type ReviewStatus = "not_reviewed" | "reviewed";

export type EventRegistration = {
  registrationStatus: RegistrationStatus;
  attendanceStatus: AttendanceStatus;
  reviewStatus?: ReviewStatus;
  registeredAt?: string;
  cancelledAt?: string | null;
  checkedInAt?: string | null;
};

export type EventRegistrationMap = Record<string, EventRegistration>;

export const normalizeEventRegistration = (value: any): EventRegistration | null => {
  if (!value) return null;

  const legacyStatus = value.status;
  const registrationStatus: RegistrationStatus =
    value.registrationStatus === "cancelled" || legacyStatus === "cancelled"
      ? "cancelled"
      : "registered";
  const attendanceStatus: AttendanceStatus =
    value.attendanceStatus === "attended" || legacyStatus === "attended"
      ? "attended"
      : value.attendanceStatus === "absent"
        ? "absent"
        : "not_checked_in";
  const reviewStatus: ReviewStatus = value.reviewStatus === "reviewed"
    ? "reviewed"
    : "not_reviewed";

  return {
    ...value,
    registrationStatus,
    attendanceStatus,
    reviewStatus,
  };
};

export const eventStatusMeta: Record<
  EventStatus,
  { label: string; bg: string; color: string }
> = {
  upcoming: { label: "Sắp diễn ra", bg: "#D1FAE5", color: "#047857" },
  ongoing: { label: "Đang diễn ra", bg: "#DBEAFE", color: "#2563EB" },
  completed: { label: "Đã kết thúc", bg: "#E5E7EB", color: "#4B5563" },
  cancelled: { label: "Đã hủy", bg: "#FEE2E2", color: "#DC2626" },
};

export const registrationMeta: Record<
  RegistrationStatus,
  { label: string; bg: string; color: string }
> = {
  registered: { label: "Đã đăng ký", bg: "#D1FAE5", color: "#047857" },
  cancelled: { label: "Đã hủy đăng ký", bg: "#FEE2E2", color: "#DC2626" },
};

export const attendanceMeta: Record<
  AttendanceStatus,
  { label: string; bg: string; color: string }
> = {
  not_checked_in: { label: "Chưa điểm danh", bg: "#F1F5F9", color: "#64748B" },
  attended: { label: "Đã tham dự", bg: "#DBEAFE", color: "#2563EB" },
  absent: { label: "Vắng mặt", bg: "#FEF3C7", color: "#B45309" },
};

export const reviewMeta: Record<ReviewStatus, { label: string; bg: string; color: string }> = {
  not_reviewed: { label: "Chưa đánh giá", bg: "#F1F5F9", color: "#64748B" },
  reviewed: { label: "Đã đánh giá", bg: "#EDE9FE", color: "#6D28D9" },
};

export const buildRegistrationMap = <
  T extends { _id: string; registration?: EventRegistration }
>(
  events: T[]
): EventRegistrationMap =>
  events.reduce<EventRegistrationMap>((map, event) => {
    const registration = normalizeEventRegistration(event.registration);
    if (registration) {
      map[event._id] = registration;
    }

    return map;
  }, {});

export const getRemainingSlots = (
  capacity?: number | null,
  registeredCount = 0
) => {
  if (capacity === null || capacity === undefined) {
    return null;
  }

  return Math.max(capacity - registeredCount, 0);
};

export const getFillRate = (
  capacity?: number | null,
  registeredCount = 0
) => {
  if (!capacity || capacity <= 0) {
    return 0;
  }

  return Math.min(Math.round((registeredCount / capacity) * 100), 100);
};

export const getComputedEventStatus = (event: {
  status?: EventStatus;
  startDateTime?: string | Date | null;
  endDateTime?: string | Date | null;
}): EventStatus => {
  if (event.status === "cancelled") {
    return "cancelled";
  }

  const now = Date.now();
  const startTime = event.startDateTime
    ? new Date(event.startDateTime).getTime()
    : NaN;
  const endTime = event.endDateTime
    ? new Date(event.endDateTime).getTime()
    : NaN;

  if (!Number.isNaN(endTime) && now > endTime) {
    return "completed";
  }

  if (!Number.isNaN(startTime) && now < startTime) {
    return "upcoming";
  }

  return "ongoing";
};

export const isEventFull = (
  capacity?: number | null,
  registeredCount = 0
) => {
  const remainingSlots = getRemainingSlots(capacity, registeredCount);
  return remainingSlots !== null && remainingSlots <= 0;
};
