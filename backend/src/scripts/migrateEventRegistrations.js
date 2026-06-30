require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const mongoose = require("mongoose");
const Event = require("../models/Event");
const EventRegistration = require("../models/EventRegistration");

const normalizeLegacyStatus = (status) => {
  if (status === "attended") {
    return { registrationStatus: "registered", attendanceStatus: "attended" };
  }
  if (status === "cancelled") {
    return { registrationStatus: "cancelled", attendanceStatus: "not_checked_in" };
  }
  return { registrationStatus: "registered", attendanceStatus: "not_checked_in" };
};

const migrate = async () => {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");
  await mongoose.connect(process.env.MONGODB_URI);

  const conflicts = [];
  let created = 0;
  let normalized = 0;

  const legacyRows = await mongoose.connection
    .collection("event_registrations")
    .find({ registrationStatus: { $exists: false } })
    .toArray();

  for (const row of legacyRows) {
    const mapped = normalizeLegacyStatus(row.status);
    await mongoose.connection.collection("event_registrations").updateOne(
      { _id: row._id },
      {
        $set: {
          ...mapped,
          checkedInAt: mapped.attendanceStatus === "attended"
            ? row.updatedAt || row.registeredAt || new Date()
            : null,
          attendanceUpdatedAt: row.updatedAt || null,
          cancelledAt: mapped.registrationStatus === "cancelled"
            ? row.cancelledAt || row.updatedAt || new Date()
            : null,
          updatedAt: row.updatedAt || new Date(),
          createdAt: row.createdAt || row.registeredAt || new Date(),
        },
        $unset: { status: "" },
      }
    );
    normalized += 1;
  }

  const events = await mongoose.connection
    .collection("events")
    .find({ "participants.0": { $exists: true } })
    .project({ participants: 1 })
    .toArray();

  for (const event of events) {
    for (const participant of event.participants) {
      const existing = await EventRegistration.findOne({
        eventId: event._id,
        userId: participant.userId,
      }).lean();
      const mapped = normalizeLegacyStatus(participant.status);

      if (existing) {
        if (
          existing.registrationStatus !== mapped.registrationStatus ||
          existing.attendanceStatus !== mapped.attendanceStatus
        ) {
          conflicts.push({
            eventId: event._id.toString(),
            userId: participant.userId.toString(),
            collection: {
              registrationStatus: existing.registrationStatus,
              attendanceStatus: existing.attendanceStatus,
            },
            embedded: mapped,
          });
        }
        continue;
      }

      await EventRegistration.create({
        eventId: event._id,
        userId: participant.userId,
        ...mapped,
        registeredAt: participant.registeredAt || new Date(),
        cancelledAt: participant.cancelledAt || null,
        checkedInAt: mapped.attendanceStatus === "attended"
          ? participant.registeredAt || new Date()
          : null,
      });
      created += 1;
    }
  }

  const activeCounts = await EventRegistration.aggregate([
    { $match: { registrationStatus: "registered" } },
    { $group: { _id: "$eventId", count: { $sum: 1 } } },
  ]);
  const countMap = new Map(activeCounts.map((item) => [item._id.toString(), item.count]));
  const allEvents = await Event.find({}).select("_id");
  for (const event of allEvents) {
    await Event.updateOne(
      { _id: event._id },
      { $set: { registeredCount: countMap.get(event._id.toString()) || 0 } }
    );
  }

  console.log(JSON.stringify({ normalized, created, conflicts }, null, 2));
  await mongoose.disconnect();
  if (conflicts.length) process.exitCode = 2;
};

migrate().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
