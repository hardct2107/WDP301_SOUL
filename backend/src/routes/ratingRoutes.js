const express = require("express");
const auth = require("../middleware/auth");
const { getMyRatings } = require("../controllers/eventRatingController");

const router = express.Router();

router.get("/me", auth, getMyRatings);

module.exports = router;
