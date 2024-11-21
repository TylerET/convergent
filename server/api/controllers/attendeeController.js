const {
  addUserToEvent,
  removeUserFromEvent,
  getUsersByEventId,
} = require("../services/attendeeService");

/**
 * @swagger
 * /api/attendee/add:
 *   post:
 *     tags:
 *       - AttendeeController
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
 *       - AttendeeController
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

/**
 * @swagger
 * /api/attendees/event/{eventId}:
 *   get:
 *     tags:
 *       - AttendeeController
 *     summary: Get all attendees for an event
 *     description: Retrieve a list of users attending a specific event based on the event ID.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the event to fetch attendees for.
 *     responses:
 *       200:
 *         description: A list of users attending the event.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Event not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event with ID 4 not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch users for event
 */

const getAttendeesByEventId = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await getUsersByEventId(eventId);
    res.status(200).json(event);
  } catch (error) {
    console.error("Error getting attendees:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addUserEvent, removeUserEvent, getAttendeesByEventId };
