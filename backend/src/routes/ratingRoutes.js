const express = require("express");
const router = express.Router();
const { submitRating, getMyRating, getAllRatings } = require("../controllers/ratingController");
const auth = require("../middleware/auth");

// Gửi đánh giá (Private — cần đăng nhập)
router.post("/", auth, submitRating);

// Lấy đánh giá của tài khoản hiện tại (Private)
router.get("/me", auth, getMyRating);

// Lấy toàn bộ đánh giá — Admin only (Private + Admin)
router.get("/", auth, auth.isAdmin, getAllRatings);

module.exports = router;
