import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getUnreadCount } from "@/api/notificationApi";
import { useAuthStore } from "@/store";
import { styles } from "@/styles/home.styles";
import { NotificationDropdown } from "./NotificationDropdown";
import { ProfileModals } from "./ProfileModals";

type Props = {
  showSidebar: boolean;
  onToggleSidebar: () => void;
  webMode?: boolean;
};

const POLL_INTERVAL = 30_000;

const webNavItems = [
  { label: "SOUL AI", route: "/ai-chat" },
  { label: "Nhật ký", route: "/diary" },
  { label: "Bài test", route: "/emotional-test" },
  { label: "Sự kiện", route: "/user-events" },
  { label: "Cộng đồng", route: "/(tabs)/forum" },
];

export function HomeHeader({ showSidebar, onToggleSidebar, webMode = false }: Props) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showMyProfile, setShowMyProfile] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { user, logout } = useAuthStore();

  const fetchUnread = useCallback(async () => {
    try {
      const count = await getUnreadCount();
      setUnreadCount(count);
    } catch {
      // Notification count is non-blocking for the home experience.
    }
  }, []);

  useEffect(() => {
    fetchUnread();
    const interval = setInterval(fetchUnread, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchUnread]);

  const handleCloseNotifications = () => {
    setShowNotifications(false);
    fetchUnread();
  };

  const handleActionPress = (text: string) => {
    if (text === "Log out") {
      logout();
      router.replace("/(auth)/login");
    } else if (text === "My Profile") {
      setShowMyProfile(true);
    } else if (text === "Edit Profile") {
      setShowEditProfile(true);
    }
    setShowProfileMenu(false);
  };

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        {!webMode && (
          <TouchableOpacity onPress={onToggleSidebar} activeOpacity={0.8}>
            {showSidebar ? (
              <MaterialCommunityIcons name="close" size={28} color="#1E293B" />
            ) : (
              <MaterialCommunityIcons name="menu" size={28} color="#1E293B" />
            )}
          </TouchableOpacity>
        )}
        <Text style={styles.logoText}>SOUL</Text>
      </View>

      {webMode && (
        <View style={styles.webHeaderNav}>
          {webNavItems.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.78}
              onPress={() => router.push(item.route as any)}
              style={[
                styles.webHeaderNavItem,
                index === 0 && styles.webHeaderNavItemActive,
              ]}
            >
              <Text
                style={[
                  styles.webHeaderNavText,
                  index === 0 && styles.webHeaderNavTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.bellWrap}
          onPress={() => setShowNotifications(!showNotifications)}
          activeOpacity={0.75}
        >
          <MaterialCommunityIcons
            name={showNotifications ? "bell" : "bell-outline"}
            size={22}
            color={showNotifications ? "#7C3AED" : "#475569"}
          />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadCount > 99 ? "99+" : unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>

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
              <View style={styles.profileTop}>
                <Image
                  source={{ uri: user?.avatarUrl || "https://i.pravatar.cc/150?img=47" }}
                  style={styles.profileImg}
                />
                <View>
                  <Text style={styles.profileName}>{user?.fullName || "SOUL user"}</Text>
                  <Text style={styles.profileSub}>
                    {user?.bio || "Take care of your mind 🌱"}
                  </Text>
                </View>
              </View>

              {[
                ["account-outline", "My Profile"],
                ["pencil-outline", "Edit Profile"],
                ["star-outline", "App Rating"],
                ["bell-outline", "Reminders"],
                ["logout", "Log out"],
              ].map(([icon, text], index) => (
                <TouchableOpacity
                  key={text}
                  onPress={() => handleActionPress(text)}
                  style={[
                    styles.profileAction,
                    index === 4 && styles.profileLogout,
                  ]}
                >
                  <MaterialCommunityIcons
                    name={icon as any}
                    size={22}
                    color={index === 4 ? "#EF4444" : "#7C3AED"}
                  />
                  <Text style={styles.profileActionText}>{text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Pressable>
      </View>

      <NotificationDropdown
        visible={showNotifications}
        onClose={handleCloseNotifications}
      />

      <ProfileModals
        showMyProfile={showMyProfile}
        onCloseMyProfile={() => setShowMyProfile(false)}
        showEditProfile={showEditProfile}
        onCloseEditProfile={() => setShowEditProfile(false)}
        onOpenEditProfile={() => setShowEditProfile(true)}
      />
    </View>
  );
}
