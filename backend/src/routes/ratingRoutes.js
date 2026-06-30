const express = require("express");
const router = express.Router();
const { submitRating, getMyRating, getAllRatings } = require("../controllers/ratingController");
const { getMyRatings } = require("../controllers/eventRatingController");
const auth = require("../middleware/auth");

// Gửi đánh giá App (Private — cần đăng nhập)
router.post("/", auth, submitRating);

// Lấy đánh giá của tài khoản hiện tại (Private)
// Cả App Rating và Event Rating đều dùng endpoint /me, phân biệt qua query
router.get("/me", auth, (req, res, next) => {
  if (req.query.eventId || req.query.limit) {
    return getMyRatings(req, res, next);
  }
  return getMyRating(req, res, next);
});

// Lấy toàn bộ đánh giá App — Admin only (Private + Admin)
router.get("/", auth, auth.isAdmin, getAllRatings);

module.exports = router;
