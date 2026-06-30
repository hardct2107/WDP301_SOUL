const mongoose = require("mongoose");

const eventAttendanceAuditSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    registrationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventRegistration",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fromStatus: {
      type: String,
      enum: ["not_checked_in", "attended", "absent"],
      required: true,
    },
    toStatus: {
      type: String,
      enum: ["not_checked_in", "attended", "absent"],
      required: true,
    },
    reason: { type: String, trim: true, maxlength: 500, default: "" },
  },
  { timestamps: true, collection: "event_attendance_audits" }
);

eventAttendanceAuditSchema.index({ eventId: 1, createdAt: -1 });

module.exports = mongoose.model("EventAttendanceAudit", eventAttendanceAuditSchema);
