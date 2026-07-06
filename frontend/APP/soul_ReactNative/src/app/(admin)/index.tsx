import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  StatusBar,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useAuthStore } from "@/store";
import { colors } from "@/constants/colors";
import { eventAdminService } from "@/services/eventApi";

type EventDashboardStats = {
  registeredCount: number;
  cancelledCount: number;
  attendedCount: number;
  absentCount: number;
  attendanceRate: number;
  reviewRate: number;
  averageRating: number;
};

const EMPTY_EVENT_STATS: EventDashboardStats = {
  registeredCount: 0,
  cancelledCount: 0,
  attendedCount: 0,
  absentCount: 0,
  attendanceRate: 0,
  reviewRate: 0,
  averageRating: 0,
};

export default function AdminDashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [eventStats, setEventStats] = useState(EMPTY_EVENT_STATS);

  useEffect(() => {
    eventAdminService
      .getDashboardStatistics()
      .then((response) => {
        if (response.success) setEventStats(response.data || EMPTY_EVENT_STATS);
      })
      .catch(() => setEventStats(EMPTY_EVENT_STATS));
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất khỏi tài khoản Quản trị viên?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Đăng xuất",
          style: "destructive",
          onPress: () => {
            logout();
            router.replace("/(auth)/login");
          },
        },
      ]
    );
  };

  const stats = [
    {
      label: "Registered",
      value: String(eventStats.registeredCount),
      icon: "account-check",
      color: "#14B8A6",
      grad: ["#F0FDFA", "#CCFBF1"],
    },
    {
      label: "Cancelled",
      value: String(eventStats.cancelledCount),
      icon: "account-cancel",
      color: "#EF4444",
      grad: ["#FEF2F2", "#FEE2E2"],
    },
    {
      label: "Attended/Absent",
      value: `${eventStats.attendedCount} / ${eventStats.absentCount}`,
      icon: "account-star",
      color: "#F59E0B",
      grad: ["#FFFBEB", "#FEF3C7"],
    },
    {
      label: "Attendance rate",
      value: `${eventStats.attendanceRate}%`,
      icon: "chart-donut",
      color: "#3B82F6",
      grad: ["#EFF6FF", "#DBEAFE"],
    },
    {
      label: "Review rate",
      value: `${eventStats.reviewRate}%`,
      icon: "message-star-outline",
      color: "#8B5CF6",
      grad: ["#F5F3FF", "#EDE9FE"],
    },
    {
      label: "Average rating",
      value: eventStats.averageRating.toFixed(1),
      icon: "star",
      color: "#F59E0B",
      grad: ["#FFFBEB", "#FEF3C7"],
    },
  ];

  const adminActions = [
    {
      title: "Quản lý Người dùng",
      description: "Xem, chặn, phân quyền tài khoản người dùng",
      icon: "account-cog",
      color: colors.dark,
      grad: ["#F8FAFC", "#E2E8F0"],
      route: "/(admin)/users",
    },
    {
      title: "Quản lý Forum",
      description: "Kiểm duyệt bài viết, xử lý báo cáo và ẩn nội dung vi phạm",
      icon: "forum-outline",
      color: "#0D9488",
      grad: ["#F0FDFA", "#CCFBF1"],
      route: "/(admin)/forum",
    },
    {
      title: "Xem Báo cáo Nội dung",
      description: "Xét duyệt và xử lý các bài đăng bị báo cáo vi phạm",
      icon: "shield-alert",
      color: "#E11D48",
      grad: ["#FFF1F2", "#FFE4E6"],
      route: "/(admin)/forum",
    },
    {
      title: "Sự kiện & Hoạt động",
      description: "Tạo và điều phối các workshop/talkshow tâm lý",
      icon: "calendar-star",
      color: colors.darkTeal,
      grad: ["#E6FFFA", "#B2F5EA"],
      route: "/(admin)/events",
    },
    {
      title: "Đánh giá sự kiện",
      description: "Xem thống kê, kiểm duyệt và xuất phản hồi người tham dự",
      icon: "message-star-outline",
      color: "#D97706",
      grad: ["#FFFBEB", "#FEF3C7"],
      route: "/(admin)/ratings",
    },
    {
      title: "Cấu hình Hệ thống AI",
      description: "Tùy chỉnh mô hình LLM và độ nhạy an toàn",
      icon: "cog",
      color: "#475569",
      grad: ["#F8FAFC", "#F1F5F9"],
      onPress: () =>
        Alert.alert("Thông báo", "Tính năng đang được hoàn thiện."),
    },
  ];

  const handleActionPress = (action: any) => {
    if (action.route) {
      router.push(action.route as any);
      return;
    }

    if (action.onPress) {
      action.onPress();
      return;
    }

    Alert.alert("Thông báo", `Tính năng "${action.title}" đang được hoàn thiện.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Xin chào,</Text>
          <Text style={styles.adminName}>
            {user?.fullName || "Quản trị viên"}
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={["#8B5CF6", "#3B82F6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.bannerInfo}>
            <Text style={styles.bannerTitle}>Hệ Thống Quản Trị SOUL</Text>
            <Text style={styles.bannerSub}>
              Theo dõi sức khỏe tinh thần cộng đồng & giám sát an toàn nội dung.
            </Text>
          </View>

          <MaterialCommunityIcons
            name="shield-crown"
            size={60}
            color="rgba(255,255,255,0.9)"
          />
        </LinearGradient>

        <Text style={styles.sectionTitle}>Chỉ số Hệ thống</Text>

        <View style={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <View key={idx} style={styles.statCard}>
              <LinearGradient
                colors={stat.grad as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statIconContainer}
              >
                <MaterialCommunityIcons
                  name={stat.icon as any}
                  size={24}
                  color={stat.color}
                />
              </LinearGradient>

              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Chức năng Quản lý</Text>

        {adminActions.map((action, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.actionCard}
            activeOpacity={0.8}
            onPress={() => handleActionPress(action)}
          >
            <LinearGradient
              colors={action.grad as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.actionIconContainer}
            >
              <MaterialCommunityIcons
                name={action.icon as any}
                size={26}
                color={action.color}
              />
            </LinearGradient>

            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionDescription}>
                {action.description}
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            SOUL Admin Panel • Phiên bản 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },

  welcomeText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "500",
    fontFamily: Platform.select({ web: "'Inter', system-ui", default: undefined }),
  },

  adminName: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    fontFamily: Platform.select({ web: "'Lexend', 'Inter', system-ui", default: undefined }),
  },

  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 3 },
      web: { boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
      default: { elevation: 3 },
    }),
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  banner: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 24,
    overflow: "hidden",
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.45, shadowRadius: 20, shadowOffset: { width: 0, height: 8 } },
      android: { elevation: 10 },
      web: { boxShadow: "0 10px 36px rgba(124, 58, 237, 0.45)" },
      default: { elevation: 10 },
    }),
  },

  bannerInfo: {
    flex: 1,
    paddingRight: 12,
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
    fontFamily: Platform.select({ web: "'Lexend', 'Inter', system-ui", default: undefined }),
  },

  bannerSub: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 13,
    lineHeight: 19,
    fontFamily: Platform.select({ web: "'Inter', system-ui", default: undefined }),
  },

  bannerIcon: {
    opacity: 0.9,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 16,
    letterSpacing: 0.3,
    fontFamily: Platform.select({ web: "'Lexend', 'Inter', system-ui", default: undefined }),
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    width: "48%",
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 3 } },
      android: { elevation: 3 },
      web: { boxShadow: "0 3px 12px rgba(124, 58, 237, 0.07)" },
      default: { elevation: 3 },
    }),
  },

  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 4,
    fontFamily: Platform.select({ web: "'Lexend', 'Inter', system-ui", default: undefined }),
  },

  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500",
    fontFamily: Platform.select({ web: "'Inter', system-ui", default: undefined }),
  },

  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 3 } },
      android: { elevation: 2 },
      web: { boxShadow: "0 3px 12px rgba(124, 58, 237, 0.07)" },
      default: { elevation: 2 },
    }),
  },

  actionIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  actionInfo: {
    flex: 1,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
    fontFamily: Platform.select({ web: "'Inter', system-ui", default: undefined }),
  },

  actionDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
    fontFamily: Platform.select({ web: "'Inter', system-ui", default: undefined }),
  },

  footer: {
    alignItems: "center",
    marginTop: 20,
  },

  footerText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: "500",
    fontFamily: Platform.select({ web: "'Inter', system-ui", default: undefined }),
  },
});
