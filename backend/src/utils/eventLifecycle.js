const getEffectiveEventStatus = (event, now = new Date()) => {
  if (event.status === "cancelled") return "cancelled";

  const nowTime = now.getTime();
  const startTime = event.startDateTime
    ? new Date(event.startDateTime).getTime()
    : Number.NaN;
  const endTime = event.endDateTime
    ? new Date(event.endDateTime).getTime()
    : Number.NaN;

  if (!Number.isNaN(endTime) && nowTime > endTime) return "completed";
  if (!Number.isNaN(startTime) && nowTime < startTime) return "upcoming";

  if (Number.isNaN(endTime) && event.status === "completed") return "completed";
  return "ongoing";
};

const buildEventStatusQuery = (status, now = new Date()) => {
  if (!status || status === "all") return {};
  if (status === "cancelled") return { status: "cancelled" };
  if (status === "upcoming") {
    return { status: { $ne: "cancelled" }, startDateTime: { $gt: now } };
  }
  if (status === "ongoing") {
    return {
      status: { $ne: "cancelled" },
      startDateTime: { $lte: now },
      $or: [
        { endDateTime: { $gte: now } },
        { endDateTime: null, status: { $ne: "completed" } },
      ],
    };
  }
  if (status === "completed") {
    return {
      status: { $ne: "cancelled" },
      $or: [
        { endDateTime: { $lt: now } },
        { endDateTime: null, status: "completed" },
      ],
    };
  }
  return {};
};

module.exports = { buildEventStatusQuery, getEffectiveEventStatus };
