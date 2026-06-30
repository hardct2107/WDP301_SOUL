const express = require("express");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const controller = require("../controllers/eventRatingController");

const router = express.Router();

router.use(auth, adminOnly);
router.get("/statistics", controller.getAdminStatistics);
router.get("/export.csv", controller.exportRatingsCsv);
router.get("/", controller.getAdminRatings);
router.get("/:id", controller.getAdminRatingDetail);
router.patch("/:id/hide", controller.hideRating);
router.patch("/:id/restore", controller.restoreRating);

module.exports = router;
