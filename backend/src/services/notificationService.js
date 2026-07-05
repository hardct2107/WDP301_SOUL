const Notification = require("../models/Notification");

/**
 * Tạo một thông báo cho user.
 * @param {string|ObjectId} userId
 * @param {string} type  — phải nằm trong enum của Notification model
 * @param {string} title
 * @param {string} content
 * @param {{ type: string, id: ObjectId }|null} related
 * @returns {Promise<Notification>}
 */
async function createNotification(userId, type, title, content, related = null) {
  try {
    const doc = await Notification.create({
      userId,
      type,
      title,
      content,
      related: related || { type: null, id: null },
    });
    return doc;
  } catch (err) {
    // Không để lỗi notification làm crash luồng chính
    console.error("[NotificationService] Failed to create notification:", err.message);
    return null;
  }
}

module.exports = { createNotification };
