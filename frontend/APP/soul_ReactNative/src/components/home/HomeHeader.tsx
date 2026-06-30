import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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

type Props = {
  showSidebar: boolean;
  onToggleSidebar: () => void;
  webMode?: boolean;
};

export function HomeHeader({ showSidebar, onToggleSidebar, webMode = false }: Props) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuthStore();

  const [showMyProfile, setShowMyProfile] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

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
      {/* Left side: Hamburger (if not web) + Logo */}
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

      {/* Right side: Notification & Avatar */}
      <View style={styles.headerRight}>
        <View style={styles.bellWrap}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={22}
            color="#475569"
          />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </View>

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
                  <Text style={styles.profileName}>{user?.fullName || "Vy Nguyễn"}</Text>
                  <Text style={styles.profileSub}>
                    {user?.bio || "Take care of your mind 🌱"}
                  </Text>
                </View>
              </View>

              {[
                ["account-outline", "My Profile"],
                ["pencil-outline", "Edit Profile"],
                ["trophy-outline", "Achievements"],
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