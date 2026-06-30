const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    registrationStatus: {
      type: String,
      enum: ["registered", "cancelled"],
      default: "registered",
      required: true,
    },
    attendanceStatus: {
      type: String,
      enum: ["not_checked_in", "attended", "absent"],
      default: "not_checked_in",
      required: true,
    },
    registeredAt: { type: Date, default: Date.now, required: true },
    cancelledAt: { type: Date, default: null },
    checkedInAt: { type: Date, default: null },
    attendanceUpdatedAt: { type: Date, default: null },
    attendanceUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "event_registrations",
  }
);

eventRegistrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });
eventRegistrationSchema.index({
  eventId: 1,
  registrationStatus: 1,
  attendanceStatus: 1,
});
eventRegistrationSchema.index({ userId: 1, registrationStatus: 1 });

module.exports = mongoose.model("EventRegistration", eventRegistrationSchema);
