const mongoose = require("mongoose");

const eventRatingSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: "Rating must be an integer from 1 to 5",
      },
    },
    comment: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["visible", "hidden"],
      default: "visible",
      index: true,
    },
    hiddenReason: {
      type: String,
      enum: ["spam", "offensive", "advertisement", "other", null],
      default: null,
    },
    hiddenNote: {
      type: String,
      default: null,
      trim: true,
      maxlength: 500,
    },
    hiddenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    hiddenAt: {
      type: Date,
      default: null,
    },
    restoredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    restoredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "event_ratings",
  }
);

eventRatingSchema.index({ eventId: 1, userId: 1 }, { unique: true });
eventRatingSchema.index({ eventId: 1, status: 1, createdAt: -1 });
eventRatingSchema.index({ status: 1, rating: 1, createdAt: -1 });

module.exports = mongoose.model("EventRating", eventRatingSchema);
