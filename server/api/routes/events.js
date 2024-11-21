const express = require("express");
const Event = require("../models/eventModel");
const {
  getAllEvents,
  getEventById,
  updateEventAttendees,
  deleteEvent,
  createEvent,
  getAllEventByUserId,
  getEventsByLocation,
} = require("../controllers/eventController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *  - EventController
 *  description: Event endpoints
 */

/**
 * @swagger
 * /api/events/search:
 *   get:
 *     tags:
 *       - EventController
 *     summary: Search for events by query
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search term to filter events by title, hostedBy, or tags
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of results to return
 *     responses:
 *       200:
 *         description: Filtered list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       400:
 *         description: Missing query parameter
 *       500:
 *         description: Internal server error
 */

router.get("/search", async (req, res) => {
  const { query, limit = 10 } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const searchRegex = new RegExp(query, "i"); // Case-insensitive regex for matching
    const events = await Event.find({
      $or: [
        { title: { $regex: searchRegex } },
        { hostedBy: { $regex: searchRegex } },
        { tags: { $elemMatch: { $regex: searchRegex } } },
      ],
    })
      .limit(Number(limit))
      .exec();

    console.log(events);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/events:
 *   get:
 *     tags:
 *       - EventController
 *     summary: Get a list of all events
 *     responses:
 *       200:
 *         description: A list of events
 */
router.get("/", getAllEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     tags:
 *     - EventController
 *     summary: Get a specific event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       200:
 *         description: A single event
 *       404:
 *         description: Event not found
 */
router.get("/:id", getEventById);

/**
 * @swagger
 * /api/events:
 *   post:
 *     tags:
 *     - EventController
 *     summary: Create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created
 */
router.post("/", createEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     tags:
 *     - EventController
 *     summary: Update an event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated
 */
router.put("/:id", updateEventAttendees);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     tags:
 *     - EventController
 *     summary: Delete an event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event deleted
 */
router.delete("/:id", deleteEvent);

/**
 * @swagger
 * /api/events/user/{userId}:
 *   get:
 *     tags:
 *       - EventController
 *     summary: Get a list of all events by user id
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *         description: The event ID
 *     responses:
 *       200:
 *         description: A list of events by user id
 */
router.get("/user/:userId", getAllEventByUserId);

/**
 * @swagger
 * /api/events/location/{location}:
 *   get:
 *     tags:
 *       - EventController
 *     summary: Get events by location
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *         description: The location to filter events by
 *     responses:
 *       200:
 *         description: List of events matching the location
 *       404:
 *         description: No events found for the location
 *       500:
 *         description: Internal server error
 */
router.get("/location/:location", getEventsByLocation);

module.exports = router;
