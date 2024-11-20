const {
  addUserToEvent,
  removeUserFromEvent,
} = require("../services/attendeeService");

/**
 * @swagger
 * /api/attendee/add:
 *   post:
 *     tags:
 *       - Attendee
 *     summary: Link a user with an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               eventId:
 *                 type: string
 *             required:
 *               - userId
 *               - eventId
 *     responses:
 *       200:
 *         description: User and event updated successfully
 *       404:
 *         description: User or event not found
 *       500:
 *         description: Internal server error
 */
const addUserEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const { user, event } = await addUserToEvent(userId, eventId);
    res.status(200).json({
      message: "User and event updated successfully",
      user,
      event,
    });
  } catch (error) {
    console.error("Error linking user and event:", error.message);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/attendee/remove:
 *   post:
 *     tags:
 *       - Attendee
 *     summary: Remvoe a user from an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               eventId:
 *                 type: string
 *             required:
 *               - userId
 *               - eventId
 *     responses:
 *       200:
 *         description: User and event updated successfully
 *       404:
 *         description: User or event not found
 *       500:
 *         description: Internal server error
 */

const removeUserEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const { user, event } = await removeUserFromEvent(userId, eventId);
    res.status(200).json({
      message: "User and event updated successfully",
      user,
      event,
    });
  } catch (error) {
    console.error("Error linking user and event:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addUserEvent, removeUserEvent };
