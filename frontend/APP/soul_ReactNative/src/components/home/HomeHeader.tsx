import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/store";
import { styles } from "@/styles/home.styles";
import { ProfileModals } from "./ProfileModals";
import { WalletModals } from "./WalletModals";
import { colors } from "@/constants/colors";

type Props = {
  showSidebar: boolean;
  onToggleSidebar: () => void;
};

// Định nghĩa các mục trong menu profile
const MENU_ITEMS = [
  { icon: "account-outline",     text: "My Profile",  action: "My Profile" },
  { icon: "pencil-outline",      text: "Chỉnh sửa hồ sơ", action: "Edit Profile" },
  { icon: "wallet-outline",      text: "Số dư",        action: "Wallet" },
  { icon: "lightning-bolt",      text: "Nạp tiền",     action: "TopUp" },
  { icon: "trophy-outline",      text: "Achievements", action: "Achievements" },
  { icon: "bell-outline",        text: "Reminders",    action: "Reminders" },
  { icon: "logout",              text: "Đăng xuất",    action: "Log out" },
];

export function HomeHeader({ showSidebar, onToggleSidebar }: Props) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuthStore();
  const balance = user?.balance ?? 0;

  // States quản lý hiển thị Modals xem và sửa thông tin cá nhân
  const [showMyProfile, setShowMyProfile]     = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // States quản lý Wallet modals
  const [showWallet, setShowWallet] = useState(false);
  const [showTopUp, setShowTopUp]   = useState(false);

  // Lấy tên gọi thân mật (từ đầu tiên của họ tên, mặc định là Vy)
  const greetingName = user ? user.fullName.split(" ")[0] : "Vy";

  // Helper định dạng tiền
  const formatBalance = (amount: number) => amount.toLocaleString("vi-VN") + "đ";

  // Xử lý sự kiện từ menu Avatar
  const handleActionPress = (action: string) => {
    setShowProfileMenu(false);
    switch (action) {
      case "Log out":
        logout();
        router.replace("/(auth)/login");
        break;
      case "My Profile":
        setShowMyProfile(true);
        break;
      case "Edit Profile":
        setShowEditProfile(true);
        break;
      case "Wallet":
        setShowWallet(true);
        break;
      case "TopUp":
        setShowTopUp(true);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.header}>
      {/* Nút mở Sidebar trái */}
      <TouchableOpacity
        style={[styles.menuButton, showSidebar && styles.menuButtonActive]}
        onPress={onToggleSidebar}
      >
        <MaterialCommunityIcons
          name={showSidebar ? "close" : "menu"}
          size={36}
          color={colors.primary}
        />
      </TouchableOpacity>

      {/* Lời chào mừng */}
      <View style={styles.greetingBox}>
        <Text style={styles.headerTitle}>Hi, {greetingName} 👋</Text>
        <Text style={styles.headerSubtitle}>
          Welcome back to your safe space
        </Text>
      </View>

      {/* Thông báo & Avatar */}
      <View style={styles.headerRight}>
        <View style={styles.bellWrap}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={32}
            color={colors.primary}
          />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </View>

        {/* Bấm Avatar hiển thị popover menu */}
        <Pressable
          style={styles.profileWrapper}
          onPress={() => setShowProfileMenu(!showProfileMenu)}
        >
          <Image
            source={{ uri: user?.avatarUrl || "https://i.pravatar.cc/150?img=47" }}
            style={styles.avatar}
          />

          {showProfileMenu && (
            <View style={styles.profileMenu}>
              {/* Phần header thông tin user */}
              <View style={styles.profileTop}>
                <Image
                  source={{ uri: user?.avatarUrl || "https://i.pravatar.cc/150?img=47" }}
                  style={styles.profileImg}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.profileName}>{user?.fullName || "Vy Nguyễn"}</Text>
                  <Text style={styles.profileSub}>
                    {user?.bio || "Take care of your mind 🌱"}
                  </Text>
                </View>
              </View>

              {/* Chip hiển thị số dư ngay trong menu */}
              <View style={menuStyles.balanceChip}>
                <MaterialCommunityIcons
                  name="wallet-outline"
                  size={16}
                  color={colors.primary}
                />
                <Text style={menuStyles.balanceChipText}>
                  Số dư: <Text style={menuStyles.balanceChipValue}>{formatBalance(balance)}</Text>
                </Text>
              </View>

              {/* Danh sách mục menu */}
              {MENU_ITEMS.map(({ icon, text, action }, index) => {
                const isLogout = action === "Log out";
                const isWallet = action === "Wallet";
                const isTopUp  = action === "TopUp";

                return (
                  <TouchableOpacity
                    key={action}
                    onPress={() => handleActionPress(action)}
                    style={[
                      styles.profileAction,
                      isLogout && styles.profileLogout,
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={icon as any}
                      size={22}
                      color={
                        isLogout  ? "#FF6B6B" :
                        isWallet || isTopUp ? colors.primary :
                        colors.textMuted
                      }
                    />
                    <Text
                      style={[
                        styles.profileActionText,
                        (isWallet || isTopUp) && menuStyles.walletText,
                        isLogout && menuStyles.logoutText,
                      ]}
                    >
                      {text}
                    </Text>

                    {/* Badge số dư nhỏ bên cạnh "Số dư" */}
                    {isWallet && (
                      <View style={menuStyles.inlineBadge}>
                        <Text style={menuStyles.inlineBadgeText}>
                          {formatBalance(balance)}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </Pressable>
      </View>

      {/* ── Nhúng các Modal Profile ── */}
      <ProfileModals
        showMyProfile={showMyProfile}
        onCloseMyProfile={() => setShowMyProfile(false)}
        showEditProfile={showEditProfile}
        onCloseEditProfile={() => setShowEditProfile(false)}
        onOpenEditProfile={() => setShowEditProfile(true)}
      />

      {/* ── Nhúng các Modal Wallet / Nạp tiền ── */}
      <WalletModals
        showWallet={showWallet}
        onCloseWallet={() => setShowWallet(false)}
        showTopUp={showTopUp}
        onCloseTopUp={() => setShowTopUp(false)}
        onOpenTopUp={() => setShowTopUp(true)}
      />
    </View>
  );
}

// Styles riêng cho phần menu (không xung đột home.styles)
import { StyleSheet } from "react-native";

const menuStyles = StyleSheet.create({
  balanceChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  balanceChipText: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: "600",
  },
  balanceChipValue: {
    color: colors.primary,
    fontWeight: "900",
  },
  walletText: {
    color: colors.primary,
    fontWeight: "800",
  },
  logoutText: {
    color: "#FF6B6B",
  },
  inlineBadge: {
    marginLeft: "auto",
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  inlineBadgeText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "800",
  },
});