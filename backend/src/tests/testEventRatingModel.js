const assert = require("assert");
const EventRating = require("../models/EventRating");

const validData = {
  eventId: "665000000000000000000001",
  userId: "665000000000000000000002",
  rating: 5,
  comment: "A useful and supportive event.",
};

const expectValidationError = async (overrides) => {
  const rating = new EventRating({ ...validData, ...overrides });
  let rejected = false;

  try {
    await rating.validate();
  } catch (_error) {
    rejected = true;
  }

  assert.equal(rejected, true);
};

const run = async () => {
  await new EventRating(validData).validate();
  await expectValidationError({ rating: 0 });
  await expectValidationError({ rating: 6 });
  await expectValidationError({ rating: 2.5 });
  await expectValidationError({ comment: "x".repeat(501) });

  const hasUniqueUserEventIndex = EventRating.schema.indexes().some(
    ([fields, options]) =>
      fields.eventId === 1 && fields.userId === 1 && options.unique === true
  );
  assert.equal(hasUniqueUserEventIndex, true);

  console.log("EventRating model validation tests passed.");
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
