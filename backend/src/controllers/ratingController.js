const Rating = require("../models/Rating");

/**
 * @desc    Gửi đánh giá ứng dụng (mỗi tài khoản chỉ 1 lần)
 * @route   POST /api/ratings
 * @access  Private (Cần Token)
 */
const submitRating = async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    const userId = req.user._id;

    // 1. Kiểm tra đầu vào
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Điểm đánh giá phải là số từ 1 đến 5.",
      });
    }

    // 2. Kiểm tra tài khoản đã đánh giá chưa
    const existing = await Rating.findOne({ userId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Bạn đã đánh giá ứng dụng rồi. Mỗi tài khoản chỉ được đánh giá một lần.",
        alreadyRated: true,
      });
    }

    // 3. Lưu đánh giá mới
    const newRating = await Rating.create({
      userId,
      rating,
      feedback: feedback?.trim() || null,
    });

    return res.status(201).json({
      success: true,
      message: "Cảm ơn bạn đã đánh giá ứng dụng!",
      data: { rating: newRating },
    });
  } catch (error) {
    // Duplicate key error từ MongoDB (unique index)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Bạn đã đánh giá ứng dụng rồi. Mỗi tài khoản chỉ được đánh giá một lần.",
        alreadyRated: true,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Lỗi hệ thống khi lưu đánh giá: " + error.message,
    });
  }
};

/**
 * @desc    Lấy đánh giá của người dùng hiện tại (kiểm tra đã đánh giá chưa)
 * @route   GET /api/ratings/me
 * @access  Private (Cần Token)
 */
const getMyRating = async (req, res) => {
  try {
    const userId = req.user._id;
    const rating = await Rating.findOne({ userId });

    return res.status(200).json({
      success: true,
      data: {
        hasRated: !!rating,
        rating: rating || null,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi hệ thống: " + error.message,
    });
  }
};

/**
 * @desc    Lấy toàn bộ đánh giá (Admin only)
 * @route   GET /api/ratings
 * @access  Private (Admin)
 */
const getAllRatings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [ratings, total] = await Promise.all([
      Rating.find()
        .populate("userId", "fullName email avatarUrl")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Rating.countDocuments(),
    ]);

    // Tính điểm trung bình
    const avgResult = await Rating.aggregate([
      { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);
    const avgRating = avgResult[0]?.avg?.toFixed(1) || "0.0";

    return res.status(200).json({
      success: true,
      data: {
        ratings,
        pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
        stats: { avgRating: parseFloat(avgRating), totalRatings: total },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi hệ thống: " + error.message,
    });
  }
};

module.exports = { submitRating, getMyRating, getAllRatings };
