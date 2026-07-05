const Notification = require("../models/Notification");

/**
 * GET /api/notifications
 * Lấy danh sách thông báo của user hiện tại (mới nhất trước)
 */
const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const skip = (page - 1) * limit;

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Notification.countDocuments({ userId }),
      Notification.countDocuments({ userId, isRead: false }),
    ]);

    return res.json({
      success: true,
      data: notifications,
      unreadCount,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("getNotifications error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * GET /api/notifications/unread-count
 * Số thông báo chưa đọc của user
 */
const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.user._id,
      isRead: false,
    });
    return res.json({ success: true, count });
  } catch (err) {
    console.error("getUnreadCount error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * PATCH /api/notifications/:id/read
 * Đánh dấu 1 thông báo đã đọc
 */
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: { isRead: true, readAt: new Date() } },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }
    return res.json({ success: true, data: notification });
  } catch (err) {
    console.error("markAsRead error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * PATCH /api/notifications/read-all
 * Đánh dấu tất cả thông báo của user đã đọc
 */
const markAllRead = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { userId: req.user._id, isRead: false },
      { $set: { isRead: true, readAt: new Date() } }
    );
    return res.json({
      success: true,
      message: `Đã đánh dấu ${result.modifiedCount} thông báo đã đọc`,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("markAllRead error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getNotifications, getUnreadCount, markAsRead, markAllRead };
