const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllRead,
} = require("../controllers/notificationController");

// Tất cả route đều yêu cầu đăng nhập
router.use(auth);

router.get("/", getNotifications);
router.get("/unread-count", getUnreadCount);
router.patch("/read-all", markAllRead);
router.patch("/:id/read", markAsRead);

module.exports = router;
