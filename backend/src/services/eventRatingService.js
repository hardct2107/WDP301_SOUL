const mongoose = require("mongoose");
const EventRating = require("../models/EventRating");

const EMPTY_DISTRIBUTION = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

const emptySummary = () => ({
  average: 0,
  total: 0,
  distribution: { ...EMPTY_DISTRIBUTION },
});

const buildSummary = (rows = []) => {
  const summary = emptySummary();

  rows.forEach((row) => {
    const rating = Number(row._id);
    const count = Number(row.count) || 0;

    if (rating >= 1 && rating <= 5) {
      summary.distribution[rating] = count;
      summary.total += count;
      summary.average += rating * count;
    }
  });

  summary.average = summary.total
    ? Number((summary.average / summary.total).toFixed(1))
    : 0;

  return summary;
};

const getRatingSummary = async (eventId) => {
  const rows = await EventRating.aggregate([
    {
      $match: {
        eventId: new mongoose.Types.ObjectId(eventId.toString()),
        status: "visible",
      },
    },
    { $group: { _id: "$rating", count: { $sum: 1 } } },
  ]);

  return buildSummary(rows);
};

const getRatingSummaries = async (eventIds) => {
  if (!eventIds.length) return new Map();

  const objectIds = eventIds.map(
    (id) => new mongoose.Types.ObjectId(id.toString())
  );
  const rows = await EventRating.aggregate([
    { $match: { eventId: { $in: objectIds }, status: "visible" } },
    {
      $group: {
        _id: { eventId: "$eventId", rating: "$rating" },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.eventId",
        ratings: {
          $push: { _id: "$_id.rating", count: "$count" },
        },
      },
    },
  ]);

  return new Map(
    rows.map((row) => [row._id.toString(), buildSummary(row.ratings)])
  );
};

module.exports = {
  emptySummary,
  getRatingSummary,
  getRatingSummaries,
};
