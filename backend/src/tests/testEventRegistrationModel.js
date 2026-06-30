const assert = require("assert");
const mongoose = require("mongoose");
const EventRegistration = require("../models/EventRegistration");
const { getEffectiveEventStatus } = require("../utils/eventLifecycle");

const objectId = () => new mongoose.Types.ObjectId();

const run = async () => {
  const valid = new EventRegistration({
    eventId: objectId(),
    userId: objectId(),
    registrationStatus: "registered",
    attendanceStatus: "not_checked_in",
  });
  assert.equal(valid.validateSync(), undefined);

  const invalidAttendance = new EventRegistration({
    eventId: objectId(),
    userId: objectId(),
    registrationStatus: "registered",
    attendanceStatus: "unknown",
  });
  assert.ok(invalidAttendance.validateSync());

  const now = new Date("2026-06-28T12:00:00.000Z");
  assert.equal(getEffectiveEventStatus({
    status: "upcoming",
    startDateTime: "2026-06-28T13:00:00.000Z",
    endDateTime: "2026-06-28T14:00:00.000Z",
  }, now), "upcoming");
  assert.equal(getEffectiveEventStatus({
    status: "upcoming",
    startDateTime: "2026-06-28T11:00:00.000Z",
    endDateTime: "2026-06-28T13:00:00.000Z",
  }, now), "ongoing");
  assert.equal(getEffectiveEventStatus({
    status: "upcoming",
    startDateTime: "2026-06-28T10:00:00.000Z",
    endDateTime: "2026-06-28T11:00:00.000Z",
  }, now), "completed");
  assert.equal(getEffectiveEventStatus({ status: "cancelled" }, now), "cancelled");

  console.log("Event registration model tests passed.");
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
