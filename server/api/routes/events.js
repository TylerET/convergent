const express = require("express");
const {
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  createEvent,
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
 * /api/events:
 *   get:
 *    tags:
 *     - EventController
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
router.put("/:id", updateEvent);

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

module.exports = router;
