const mongoose = require("mongoose");

const eventRegistrationMutexSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    lockOwner: { type: String, default: null },
    lockedUntil: { type: Date, default: null, index: true },
  },
  { timestamps: true, collection: "event_registration_mutexes" }
);

module.exports = mongoose.model(
  "EventRegistrationMutex",
  eventRegistrationMutexSchema
);
