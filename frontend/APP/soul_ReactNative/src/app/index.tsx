import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type NavTarget = {
  label: string;
  y: number;
};

type Feature = {
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  tone: string;
  surface: string;
  variant: "wide" | "tall" | "small" | "medium";
};

const navItems: NavTarget[] = [
  { label: "Trang chủ", y: 0 },
  { label: "Kiến thức", y: 800 },
  { label: "Cộng đồng", y: 1600 },
  { label: "Khoa học", y: 2200 },
  { label: "Sự kiện", y: 3100 },
];

const stats = [
  { number: "500K+", label: "lượt tải về và sử dụng" },
  { number: "200+", label: "bài thiền và âm thanh" },
  { number: "98%", label: "hiệu quả cải thiện tâm trạng" },
  { number: "24/7", label: "luôn sẵn sàng lắng nghe" },
];

const features: Feature[] = [
  {
    title: "Trợ lý Trí tuệ Nhân tạo (AI)",
    description:
      "Trò chuyện và nhận chia sẻ bất kỳ lúc nào. AI học hỏi và đưa ra lời khuyên chuyên sâu để giúp bạn ổn định tâm lý.",
    icon: "robot-outline",
    tone: "#7C3AED",
    surface: "#F3E8FF",
    variant: "wide",
  },
  {
    title: "Cộng đồng SOUL",
    description:
      "Tham gia các hội nhóm chia sẻ, tìm kiếm sự thấu hiểu từ những người có cùng trải nghiệm và lan tỏa năng lượng tích cực.",
    icon: "account-group-outline",
    tone: "#FD79A8",
    surface: "#FFF0F5",
    variant: "tall",
  },
  {
    title: "Thư viện Thiền định",
    description:
      "Hàng trăm bài tập thiền, nhạc sóng não, âm thanh thiên nhiên giúp thư giãn sâu và ngủ ngon hơn.",
    icon: "spa-outline",
    tone: "#00CEC9",
    surface: "#E0FDFB",
    variant: "small",
  },
  {
    title: "Nhật ký Cảm xúc",
    description:
      "Theo dõi tâm trạng hàng ngày, vẽ biểu đồ cảm xúc của bạn qua từng tuần, từng tháng để hiểu rõ bản thân hơn.",
    icon: "book-open-variant-outline",
    tone: "#FDCB6E",
    surface: "#FFFDF0",
    variant: "medium",
  },
];

const steps = [
  {
    title: "Hiểu bản thân",
    text: "Làm bài kiểm tra tâm lý ngắn để xác định tình trạng sức khỏe tinh thần hiện tại.",
  },
  {
    title: "Nhận lộ trình",
    text: "Hệ thống tự động đề xuất lộ trình thiền định và bài tập thở phù hợp cá nhân.",
  },
  {
    title: "Phát triển mỗi ngày",
    text: "Dành 10-15 phút mỗi ngày rèn luyện thói quen và cảm nhận sự bình yên.",
  },
];

const experts = [
  {
    name: "Lê Minh Anh",
    role: "Chuyên gia Tham vấn",
    desc: "Thạc sĩ Tâm lý học lâm sàng với 8 năm kinh nghiệm hỗ trợ vượt qua khủng hoảng và trầm cảm nhẹ.",
    icon: "face-woman-outline",
    bg: "rgba(108, 92, 231, 0.15)",
  },
  {
    name: "Trần Quốc Sơn",
    role: "Tiến sĩ Trị liệu",
    desc: "Hơn 12 năm nghiên cứu về Liệu pháp Nhận thức Hành vi (CBT) và phát triển tư duy tích cực.",
    icon: "face-man-outline",
    bg: "rgba(253, 121, 168, 0.15)",
  },
  {
    name: "Đàm Thanh Thủy",
    role: "Chuyên gia Thiền định",
    desc: "Nhà đào tạo Mindfulness (Chánh niệm) được chứng nhận quốc tế, giúp giải tỏa stress sâu sắc.",
    icon: "face-woman-profile",
    bg: "rgba(0, 206, 201, 0.15)",
  },
  {
    name: "Nguyễn Hoàng Sơn",
    role: "Bác sĩ Tâm thần",
    desc: "Chuyên gia tư vấn về rối loạn giấc ngủ, lo âu và cân bằng hóa sinh não bộ không dùng thuốc.",
    icon: "face-man-profile",
    bg: "rgba(253, 203, 110, 0.15)",
  },
];

const events = [
  {
    title: "Thiền âm thanh & Thả lỏng tâm trí",
    date: "15/07/2026",
    time: "19:30 - 21:00",
    location: "Trực tuyến qua Zoom",
    icon: "microphone-variant",
  },
  {
    title: "Kỹ năng Quản lý Stress tại Công sở",
    date: "22/07/2026",
    time: "14:00 - 16:30",
    location: "Văn phòng SOUL Space",
    icon: "briefcase-outline",
  },
];

const testimonials = [
  {
    name: "Nguyễn Hữu Trung",
    role: "Lập trình viên",
    avatar: "NT",
    color: "#6C5CE7",
    text: "Nhờ các bài thở của SOUL, tôi đã vượt qua được những cơn hoảng loạn khi làm việc căng thẳng. Trợ lý AI đưa ra lời khuyên rất thực tế.",
  },
  {
    name: "Trần Mai Hoa",
    role: "Designer tự do",
    avatar: "LH",
    color: "#FD79A8",
    text: "Giao diện đẹp mắt, âm thanh tiếng mưa và sóng biển rất chân thực. Nhật ký cảm xúc giúp tôi nhận ra các mô thức tâm trạng của mình.",
  },
  {
    name: "Quốc Đạt",
    role: "Sinh viên Đại học",
    avatar: "QD",
    color: "#00CEC9",
    text: "Một ứng dụng tuyệt vời về chăm sóc sức khỏe tinh thần. Cộng đồng rất văn minh, cùng nhau chia sẻ những bài học bổ ích mỗi ngày.",
  },
];

const faqs = [
  {
    question: "Dữ liệu của tôi có được bảo mật không?",
    answer:
      "Tất cả thông tin cá nhân, cuộc trò chuyện với AI và ghi chép nhật ký cảm xúc của bạn đều được mã hóa đầu cuối và cam kết bảo mật tuyệt đối, không chia sẻ với bên thứ ba dưới bất kỳ hình thức nào.",
  },
  {
    question: "Làm sao để liên hệ với bác sĩ chuyên khoa?",
    answer:
      "Bạn có thể sử dụng chức năng \"Tư vấn chuyên gia\" trên app để đặt lịch hẹn trực tuyến với đội ngũ chuyên gia tâm lý và bác sĩ của chúng tôi. Lịch hẹn sẽ được đồng bộ hóa và diễn ra trực tiếp qua cuộc gọi video tích hợp sẵn.",
  },
  {
    question: "SOUL có dành cho trẻ em không?",
    answer:
      "SOUL có các bài tập thiền và âm thanh thiên nhiên phù hợp cho trẻ em từ 6 tuổi trở lên dưới sự giám sát của phụ huynh. Tuy nhiên, tính năng trợ lý ảo AI và các bài test tâm lý sâu được thiết kế tối ưu nhất cho người dùng từ 16 tuổi trở lên.",
  },
];

export default function LandingPage() {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === "web" && width >= 1024;
  const isTablet = Platform.OS === "web" && width >= 760 && width < 1024;
  const scrollRef = useRef<ScrollView>(null);
  const floatAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -14,
          duration: 2600,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2600,
          useNativeDriver: true,
        }),
      ])
    );

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    floatLoop.start();
    glowLoop.start();

    return () => {
      floatLoop.stop();
      glowLoop.stop();
    };
  }, [floatAnim, glowAnim]);

  const scrollTo = (y: number) => {
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  const glowScale = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        ref={scrollRef}
        style={styles.page}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Header isDesktop={isDesktop} onNavigate={scrollTo} />

          {/* HERO SECTION */}
          <View style={[styles.hero, isDesktop ? styles.heroDesktop : styles.heroStack]}>
            <View style={[styles.heroContent, !isDesktop && styles.centerContent]}>
              <View style={styles.heroBadge}>
                <View style={styles.badgeDot} />
                <Text style={styles.heroBadgeText}>ỨNG DỤNG TRỊ LIỆU TÂM LÝ</Text>
              </View>

              <Text style={[styles.heroTitle, !isDesktop && styles.heroTitleMobile]}>
                Tìm thấy <Text style={styles.purpleText}>Bình yên</Text> trong từng <Text style={styles.pinkText}>Nhịp thở</Text>.
              </Text>

              <Text style={[styles.heroDescription, !isDesktop && styles.centerText]}>
                Hành trình chữa lành và chăm sóc sức khỏe tinh thần được cá nhân hóa thông qua các bài tập thiền định, nhật ký cảm xúc và công nghệ AI hiện đại hàng ngày.
              </Text>

              <View style={[styles.heroActions, !isDesktop && styles.centerRow]}>
                <TouchableOpacity activeOpacity={0.86} onPress={() => router.push("/(auth)/register" as never)}>
                  <LinearGradient
                    colors={["#6C5CE7", "#4F46E5"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.primaryButton}
                  >
                    <Text style={styles.primaryButtonText}>Bắt đầu ngay</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.78}
                  style={styles.outlineButton}
                  onPress={() => alert("Video giới thiệu SOUL đang được phát triển. Hãy đón chờ phiên bản đầy đủ nhé!")}
                >
                  <MaterialCommunityIcons name="play" size={20} color="#6C5CE7" style={{ marginRight: 6 }} />
                  <Text style={styles.outlineButtonText}>Xem giới thiệu</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.heroVisual, isTablet && styles.heroVisualTablet]}>
              <Animated.View style={[styles.heroGlow, { transform: [{ scale: glowScale }] }]} />
              <Animated.View style={[styles.heroImageCard, { transform: [{ translateY: floatAnim }] }]}>
                <Image
                  source={require("../../assets/images/hero_meditation.png")}
                  style={styles.heroImage}
                  resizeMode="contain"
                />
              </Animated.View>
            </View>
          </View>

          {/* STATS SECTION */}
          <View style={styles.statsSection}>
            <View style={styles.statsContainer}>
              {stats.map((stat, idx) => (
                <View key={idx} style={styles.statCard}>
                  <Text style={styles.statNumber}>{stat.number}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* FEATURES SECTION */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Công cụ cho sự An yên</Text>
            <Text style={styles.sectionSubtitle}>
              Loạt tính năng hỗ trợ sức khỏe tinh thần được thiết kế tối ưu nhất cho bạn
            </Text>
          </View>

          <View style={styles.bentoGrid}>
            {features.map((feature) => (
              <View
                key={feature.title}
                style={[
                  styles.bentoCard,
                  isDesktop && feature.variant === "wide" && styles.bentoWide,
                  isDesktop && feature.variant === "tall" && styles.bentoTall,
                ]}
              >
                <View style={[styles.bentoIcon, { backgroundColor: feature.surface }]}>
                  <MaterialCommunityIcons name={feature.icon} size={28} color={feature.tone} />
                </View>
                <Text style={styles.bentoTitle}>{feature.title}</Text>
                <Text style={styles.bentoDescription}>{feature.description}</Text>
                {feature.title.includes("Trí tuệ Nhân tạo") ? <ChatPreview /> : null}
                {feature.title.includes("Cộng đồng") ? <CommunityIllustration /> : null}
                {feature.title.includes("Nhật ký") ? <MoodChart /> : null}
              </View>
            ))}
          </View>

          {/* THREE STEPS SECTION */}
          <View style={styles.stepsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Bắt đầu Hành trình trong 3 bước</Text>
            </View>
            <View style={styles.stepsGrid}>
              {steps.map((step, index) => (
                <View key={step.title} style={styles.stepCard}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepText}>{step.text}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* MOBILE APP PROMO SECTION */}
          <View style={[styles.promoSection, isDesktop ? styles.promoDesktop : styles.promoStack]}>
            <View style={styles.promoCopy}>
              <Text style={styles.promoTitle}>Mang cả Trái tim trong túi áo</Text>
              <Text style={styles.promoText}>
                Tải ứng dụng SOUL để bắt đầu hành trình cải thiện sức khỏe tinh thần của bạn mọi lúc, mọi nơi. Lộ trình cá nhân hóa nằm gọn trong lòng bàn tay bạn.
              </Text>
              <View style={styles.downloadButtons}>
                <TouchableOpacity
                  style={styles.downloadBtn}
                  onPress={() => alert("Ứng dụng SOUL Beta đang được tải lên Store. Bạn vui lòng đăng ký thông tin trải nghiệm sớm nhé!")}
                >
                  <MaterialCommunityIcons name="apple" size={28} color="#2D235C" />
                  <View style={styles.btnText}>
                    <Text style={styles.btnSubtext}>Tải từ</Text>
                    <Text style={styles.btnMaintext}>App Store</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.downloadBtn}
                  onPress={() => alert("Ứng dụng SOUL Beta đang được tải lên Store. Bạn vui lòng đăng ký thông tin trải nghiệm sớm nhé!")}
                >
                  <MaterialCommunityIcons name="google-play" size={26} color="#2D235C" />
                  <View style={styles.btnText}>
                    <Text style={styles.btnSubtext}>Tải từ</Text>
                    <Text style={styles.btnMaintext}>Google Play</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.promoImageWrapper}>
              <Image
                source={require("../../assets/images/phone_mockup.png")}
                style={styles.phoneMockupImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* EXPERT TEAM SECTION */}
          <View style={styles.expertsSection}>
            <View style={[styles.sectionHeader, styles.flexHeader]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Đội ngũ Chuyên gia tận tâm</Text>
                <Text style={styles.sectionSubtitle}>
                  Những chuyên gia tâm lý học, tâm thần học hàng đầu với hơn 10 năm kinh nghiệm
                </Text>
              </View>
            </View>

            <View style={styles.expertsGrid}>
              {experts.map((expert, index) => (
                <View key={index} style={styles.expertCard}>
                  <View style={[styles.expertImageContainer, { backgroundColor: expert.bg }]}>
                    <MaterialCommunityIcons name={expert.icon as any} size={64} color="#6C5CE7" />
                  </View>
                  <View style={styles.expertInfo}>
                    <Text style={styles.expertRole}>{expert.role}</Text>
                    <Text style={styles.expertName}>{expert.name}</Text>
                    <Text style={styles.expertDesc}>{expert.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* EVENTS SECTION */}
          <View style={styles.eventsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sự kiện & Hội thảo sắp tới</Text>
              <Text style={styles.sectionSubtitle}>Kết nối và lắng nghe chia sẻ thực tế từ các chuyên gia hàng đầu</Text>
            </View>

            <View style={styles.eventsList}>
              {events.map((event, index) => (
                <View key={index} style={styles.eventItem}>
                  <View style={styles.eventIcon}>
                    <MaterialCommunityIcons name={event.icon as any} size={28} color="#6C5CE7" />
                  </View>
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventName}>{event.title}</Text>
                    <View style={styles.eventMeta}>
                      <View style={styles.metaItem}>
                        <MaterialCommunityIcons name="calendar-outline" size={16} color="#6C668A" />
                        <Text style={styles.metaText}>{event.date}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <MaterialCommunityIcons name="clock-outline" size={16} color="#6C668A" />
                        <Text style={styles.metaText}>{event.time}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <MaterialCommunityIcons name="map-marker-outline" size={16} color="#6C668A" />
                        <Text style={styles.metaText}>{event.location}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.eventBtn}
                    onPress={() => alert(`Đăng ký thành công tham gia sự kiện: ${event.title}`)}
                  >
                    <Text style={styles.eventBtnText}>Đăng ký ngay</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* TESTIMONIALS SECTION */}
          <View style={styles.testimonialsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Câu chuyện từ Người dùng</Text>
            </View>

            <View style={styles.testimonialsGrid}>
              {testimonials.map((test, index) => (
                <View key={index} style={styles.testimonialCard}>
                  <View style={styles.ratingStars}>
                    {[...Array(5)].map((_, i) => (
                      <MaterialCommunityIcons key={i} name="star" size={16} color="#FDCB6E" />
                    ))}
                  </View>
                  <Text style={styles.reviewText}>“{test.text}”</Text>
                  <View style={styles.userProfile}>
                    <View style={[styles.userAvatar, { backgroundColor: test.color }]}>
                      <Text style={styles.avatarText}>{test.avatar}</Text>
                    </View>
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>{test.name}</Text>
                      <Text style={styles.userRole}>{test.role}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* FAQ SECTION */}
          <View style={styles.faqSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Câu hỏi thường gặp</Text>
            </View>

            <View style={styles.faqList}>
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <View key={index} style={styles.faqItem}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.faqQuestion}
                      onPress={() => setActiveFaq(isOpen ? null : index)}
                    >
                      <Text style={styles.faqQuestionText}>{faq.question}</Text>
                      <MaterialCommunityIcons
                        name={isOpen ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#6C5CE7"
                      />
                    </TouchableOpacity>
                    {isOpen && (
                      <View style={styles.faqAnswer}>
                        <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <View style={[styles.footerContainer, isDesktop ? styles.footerDesktop : styles.footerStack]}>
              <View style={styles.footerBrand}>
                <View style={styles.logoWrap}>
                  <Text style={styles.logo}>SOUL</Text>
                  <View style={styles.logoDot} />
                </View>
                <Text style={styles.brandDescription}>
                  Người bạn đồng hành tin cậy trên hành trình thấu hiểu và chăm sóc sức khỏe tinh thần của bạn mỗi ngày.
                </Text>
                <View style={styles.socialLinks}>
                  <TouchableOpacity style={styles.socialLink}>
                    <MaterialCommunityIcons name="facebook" size={20} color="#6C5CE7" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialLink}>
                    <MaterialCommunityIcons name="instagram" size={20} color="#6C5CE7" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialLink}>
                    <MaterialCommunityIcons name="youtube" size={20} color="#6C5CE7" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.footerLinksGroup}>
                <View style={styles.footerCol}>
                  <Text style={styles.footerColTitle}>Về chúng tôi</Text>
                  <Text style={styles.footerColLink}>Giới thiệu</Text>
                  <Text style={styles.footerColLink}>Đội ngũ</Text>
                  <Text style={styles.footerColLink}>Tuyển dụng</Text>
                  <Text style={styles.footerColLink}>Blog</Text>
                </View>
                <View style={styles.footerCol}>
                  <Text style={styles.footerColTitle}>Hỗ trợ</Text>
                  <Text style={styles.footerColLink}>Trung tâm trợ giúp</Text>
                  <Text style={styles.footerColLink}>Liên hệ</Text>
                  <Text style={styles.footerColLink}>Điều khoản sử dụng</Text>
                </View>
                <View style={styles.footerCol}>
                  <Text style={styles.footerColTitle}>Pháp lý</Text>
                  <Text style={styles.footerColLink}>Chính sách bảo mật</Text>
                  <Text style={styles.footerColLink}>Chính sách cookies</Text>
                  <Text style={styles.footerColLink}>Bản quyền thương hiệu</Text>
                </View>
              </View>
            </View>

            <View style={styles.copyrightContainer}>
              <Text style={styles.copyrightText}>&copy; 2026 SOUL App. Tất cả các quyền được bảo lưu.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Header({
  isDesktop,
  onNavigate,
}: {
  isDesktop: boolean;
  onNavigate: (y: number) => void;
}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.75} onPress={() => onNavigate(0)} style={styles.logoWrap}>
        <Text style={styles.logo}>SOUL</Text>
        <View style={styles.logoDot} />
      </TouchableOpacity>

      {isDesktop ? (
        <View style={styles.nav}>
          {navItems.map((item) => (
            <TouchableOpacity key={item.label} activeOpacity={0.7} onPress={() => onNavigate(item.y)}>
              <Text style={styles.navText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}

      <View style={styles.headerActions}>
        {isDesktop ? (
          <TouchableOpacity activeOpacity={0.75} onPress={() => router.push("/(auth)/login" as never)}>
            <Text style={styles.loginLink}>Đăng nhập</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity activeOpacity={0.86} onPress={() => router.push("/(auth)/register" as never)}>
          <LinearGradient
            colors={["#6C5CE7", "#4F46E5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>Thử miễn phí</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ChatPreview() {
  return (
    <View style={styles.chatPreview}>
      <View style={styles.userBubble}>
        <Text style={styles.userBubbleText}>Tôi cảm thấy áp lực công việc quá...</Text>
      </View>
      <View style={styles.aiBubble}>
        <View style={styles.aiDotSmall} />
        <Text style={styles.aiBubbleText}>
          Tôi hiểu cảm giác đó. Hãy cùng thực hiện một bài thở 4-7-8 ngắn để lấy lại cân bằng nhé...
        </Text>
      </View>
    </View>
  );
}

function CommunityIllustration() {
  return (
    <View style={styles.commIllust}>
      <View style={styles.avatarStack}>
        <View style={[styles.avatarStackCircle, { backgroundColor: "#a29bfe", zIndex: 4 }]}>
          <Text style={styles.avatarStackText}>A</Text>
        </View>
        <View style={[styles.avatarStackCircle, { backgroundColor: "#ff7675", marginLeft: -12, zIndex: 3 }]}>
          <Text style={styles.avatarStackText}>B</Text>
        </View>
        <View style={[styles.avatarStackCircle, { backgroundColor: "#74b9ff", marginLeft: -12, zIndex: 2 }]}>
          <Text style={styles.avatarStackText}>C</Text>
        </View>
        <View style={[styles.avatarStackCircle, { backgroundColor: "#ECE9FF", marginLeft: -12, zIndex: 1 }]}>
          <Text style={[styles.avatarStackText, { color: "#6C5CE7", fontSize: 10 }]}>+99</Text>
        </View>
      </View>
      <View style={styles.commTags}>
        <View style={styles.commTag}>
          <Text style={styles.commTagText}>#ChữaLành</Text>
        </View>
        <View style={styles.commTag}>
          <Text style={styles.commTagText}>#ThấuHiểu</Text>
        </View>
      </View>
    </View>
  );
}

function MoodChart() {
  return (
    <View style={styles.chartPreview}>
      {[40, 70, 50, 30].map((height, index) => (
        <View key={index} style={styles.chartItem}>
          <View style={[styles.chartBar, { height }]} />
          <Text style={styles.chartLabel}>
            {["Vui", "Bình yên", "Hào hứng", "Mệt mỏi"][index]}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF8FF",
  },
  page: {
    flex: 1,
    backgroundColor: "#FAF8FF",
  },
  scrollContent: {
    paddingBottom: 0,
  },
  container: {
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
    paddingHorizontal: 26,
  },
  header: {
    minHeight: 84,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(108, 92, 231, 0.15)",
  },
  logoWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    color: "#2D235C",
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  logoDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#6C5CE7",
    marginLeft: 4,
    marginTop: 10,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
  },
  navText: {
    color: "#6C668A",
    fontSize: 15,
    fontWeight: "600",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  loginLink: {
    color: "#6C5CE7",
    fontSize: 15,
    fontWeight: "900",
  },
  headerButton: {
    minHeight: 44,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
  hero: {
    paddingTop: 100,
    paddingBottom: 80,
    gap: 48,
  },
  heroDesktop: {
    minHeight: 620,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroStack: {
    alignItems: "center",
  },
  heroContent: {
    flex: 1,
    maxWidth: 590,
    gap: 24,
  },
  centerContent: {
    alignItems: "center",
  },
  heroBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#ECE9FF",
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#6C5CE7",
  },
  heroBadgeText: {
    color: "#6C5CE7",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1,
  },
  heroTitle: {
    color: "#2D235C",
    fontSize: 56,
    lineHeight: 64,
    fontWeight: "800",
    letterSpacing: -1,
  },
  heroTitleMobile: {
    fontSize: 36,
    lineHeight: 44,
    textAlign: "center",
  },
  purpleText: {
    color: "#6C5CE7",
  },
  pinkText: {
    color: "#FD79A8",
  },
  heroDescription: {
    maxWidth: 540,
    color: "#6C668A",
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "500",
  },
  centerText: {
    textAlign: "center",
  },
  heroActions: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    paddingTop: 8,
  },
  centerRow: {
    justifyContent: "center",
  },
  primaryButton: {
    minHeight: 58,
    paddingHorizontal: 36,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6C5CE7",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  outlineButton: {
    minHeight: 58,
    paddingHorizontal: 36,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#6C5CE7",
    backgroundColor: "transparent",
  },
  outlineButtonText: {
    color: "#6C5CE7",
    fontSize: 16,
    fontWeight: "900",
  },
  heroVisual: {
    flex: 1,
    minHeight: 440,
    alignItems: "center",
    justifyContent: "center",
  },
  heroGlow: {
    position: "absolute",
    width: 480,
    height: 480,
    borderRadius: 999,
    backgroundColor: "rgba(108, 92, 231, 0.15)",
  },
  heroImageCard: {
    width: 420,
    height: 420,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    width: 420,
    height: 420,
  },
  heroVisualTablet: {
    width: "100%",
  },
  statsSection: {
    paddingVertical: 40,
    backgroundColor: "#F3EFFF",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(108, 92, 231, 0.15)",
    marginHorizontal: -26,
    paddingHorizontal: 26,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 20,
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  statCard: {
    alignItems: "center",
    flexGrow: 1,
    flexBasis: 180,
    padding: 16,
  },
  statNumber: {
    fontSize: 44,
    fontWeight: "800",
    color: "#6C5CE7",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 15,
    color: "#6C668A",
    fontWeight: "500",
    textAlign: "center",
  },
  sectionHeader: {
    alignItems: "center",
    gap: 12,
    paddingTop: 100,
    paddingBottom: 60,
  },
  flexHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  sectionTitle: {
    textAlign: "center",
    color: "#2D235C",
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    maxWidth: 650,
    textAlign: "center",
    color: "#6C668A",
    fontSize: 17,
    lineHeight: 26,
    fontWeight: "500",
    marginTop: 4,
  },
  bentoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },
  bentoCard: {
    flexGrow: 1,
    flexBasis: 280,
    minHeight: 280,
    padding: 36,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(108, 92, 231, 0.15)",
    shadowColor: "#6C5CE7",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  bentoWide: {
    flexBasis: 560,
  },
  bentoTall: {
    minHeight: 360,
    justifyContent: "space-between",
  },
  bentoIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  bentoTitle: {
    color: "#2D235C",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 12,
  },
  bentoDescription: {
    color: "#6C668A",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    maxWidth: 480,
  },
  chatPreview: {
    gap: 12,
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FAF8FF",
  },
  userBubble: {
    alignSelf: "flex-end",
    maxWidth: "85%",
    padding: 12,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    backgroundColor: "#6C5CE7",
  },
  userBubbleText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  aiBubble: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    maxWidth: "85%",
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  aiDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#00CEC9",
    marginTop: 8,
  },
  aiBubbleText: {
    flex: 1,
    color: "#2D235C",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  commIllust: {
    marginTop: 24,
    gap: 16,
  },
  avatarStack: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
  },
  avatarStackCircle: {
    width: 44,
    height: 44,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatarStackText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  commTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  commTag: {
    alignSelf: "flex-start",
    backgroundColor: "#ECE9FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    shadowColor: "#6C5CE7",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  commTagText: {
    color: "#6C5CE7",
    fontSize: 13,
    fontWeight: "600",
  },
  chartPreview: {
    height: 126,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    gap: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FAF8FF",
  },
  chartItem: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  chartBar: {
    width: 16,
    borderRadius: 8,
    backgroundColor: "#6C5CE7",
  },
  chartLabel: {
    color: "#6C668A",
    fontSize: 11,
    fontWeight: "700",
  },
  stepsSection: {
    paddingVertical: 100,
    backgroundColor: "rgba(108, 92, 231, 0.02)",
    marginHorizontal: -26,
    paddingHorizontal: 26,
  },
  stepsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  stepCard: {
    flexGrow: 1,
    flexBasis: 300,
    minHeight: 190,
    padding: 36,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(108, 92, 231, 0.15)",
    alignItems: "center",
    textAlign: "center",
  },
  stepNumber: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: "#ECE9FF",
    backgroundColor: "#FFFFFF",
    color: "#6C5CE7",
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 58,
    marginBottom: 24,
    shadowColor: "#6C5CE7",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  stepTitle: {
    color: "#2D235C",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },
  stepText: {
    color: "#6C668A",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
    textAlign: "center",
  },
  promoSection: {
    marginVertical: 100,
    borderRadius: 32,
    padding: 60,
    gap: 48,
    backgroundColor: "#6C5CE7",
    shadowColor: "#6C5CE7",
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 20 },
    elevation: 8,
  },
  promoDesktop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  promoStack: {
    alignItems: "stretch",
  },
  promoCopy: {
    flex: 1.1,
    gap: 20,
  },
  promoTitle: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "800",
    lineHeight: 56,
  },
  promoText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 17,
    lineHeight: 28,
    fontWeight: "500",
    maxWidth: 500,
  },
  downloadButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 20,
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  btnText: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  btnSubtext: {
    fontSize: 11,
    color: "#6C668A",
    fontWeight: "500",
  },
  btnMaintext: {
    fontSize: 16,
    color: "#2D235C",
    fontWeight: "700",
  },
  promoImageWrapper: {
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  phoneMockupImage: {
    maxWidth: 320,
    height: 480,
  },
  expertsSection: {
    paddingVertical: 100,
  },
  expertsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },
  expertCard: {
    flexGrow: 1,
    flexBasis: 260,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(108, 92, 231, 0.15)",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#6C5CE7",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  expertImageContainer: {
    width: "100%",
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  expertInfo: {
    padding: 24,
  },
  expertRole: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6C5CE7",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  expertName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2D235C",
    marginBottom: 12,
  },
  expertDesc: {
    fontSize: 14,
    color: "#6C668A",
    lineHeight: 22,
    fontWeight: "500",
  },
  eventsSection: {
    paddingVertical: 100,
    backgroundColor: "#F3EFFF",
    marginHorizontal: -26,
    paddingHorizontal: 26,
  },
  eventsList: {
    maxWidth: 900,
    width: "100%",
    alignSelf: "center",
    gap: 20,
  },
  eventItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 36,
    paddingVertical: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 24,
    shadowColor: "#6C5CE7",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  eventIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ECE9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  eventDetails: {
    flex: 1,
    minWidth: 260,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2D235C",
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: "#6C668A",
    fontWeight: "500",
  },
  eventBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#6C5CE7",
    backgroundColor: "transparent",
  },
  eventBtnText: {
    color: "#6C5CE7",
    fontSize: 14,
    fontWeight: "700",
  },
  testimonialsSection: {
    paddingVertical: 100,
  },
  testimonialsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },
  testimonialCard: {
    flexGrow: 1,
    flexBasis: 300,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(108, 92, 231, 0.15)",
    borderRadius: 24,
    padding: 36,
    justifyContent: "space-between",
    shadowColor: "#6C5CE7",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  ratingStars: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 20,
  },
  reviewText: {
    fontStyle: "italic",
    color: "#6C668A",
    fontSize: 16,
    lineHeight: 26,
    fontWeight: "500",
    marginBottom: 32,
  },
  userProfile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  userInfo: {
    flexDirection: "column",
  },
  userName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2D235C",
  },
  userRole: {
    fontSize: 13,
    color: "#6C668A",
    fontWeight: "500",
  },
  faqSection: {
    paddingVertical: 100,
    backgroundColor: "rgba(108, 92, 231, 0.01)",
  },
  faqList: {
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
    gap: 16,
  },
  faqItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(108, 92, 231, 0.15)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  faqQuestion: {
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  faqQuestionText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D235C",
    flex: 1,
  },
  faqAnswer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(108, 92, 231, 0.08)",
    padding: 24,
    backgroundColor: "#FAF9FF",
  },
  faqAnswerText: {
    fontSize: 15,
    color: "#6C668A",
    lineHeight: 24,
    fontWeight: "500",
  },
  footer: {
    backgroundColor: "#FAF8FF",
    borderTopWidth: 1,
    borderTopColor: "rgba(108, 92, 231, 0.15)",
    paddingTop: 80,
    paddingBottom: 30,
    marginHorizontal: -26,
    paddingHorizontal: 26,
  },
  footerContainer: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
    gap: 64,
  },
  footerDesktop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerStack: {
    flexDirection: "column",
  },
  footerBrand: {
    flex: 1.2,
    gap: 20,
  },
  brandDescription: {
    color: "#6C668A",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "500",
    maxWidth: 320,
  },
  socialLinks: {
    flexDirection: "row",
    gap: 12,
  },
  socialLink: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ECE9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  footerLinksGroup: {
    flex: 1.8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 32,
    justifyContent: "space-between",
  },
  footerCol: {
    minWidth: 140,
    gap: 14,
  },
  footerColTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2D235C",
    marginBottom: 10,
  },
  footerColLink: {
    fontSize: 15,
    color: "#6C668A",
    fontWeight: "500",
  },
  copyrightContainer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(108, 92, 231, 0.15)",
    paddingTop: 30,
    marginTop: 60,
    alignItems: "center",
  },
  copyrightText: {
    fontSize: 14,
    color: "#6C668A",
    fontWeight: "500",
  },
});
