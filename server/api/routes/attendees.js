const express = require("express");
const {
  addUserEvent,
  removeUserEvent,
  getAttendeesByEventId,
} = require("../controllers/attendeeController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: AttendeeController
 *     description: Manage user attendance at events
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         auth0Id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         picture:
 *           type: string
 *         events:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         userId:
 *           type: number
 *     Event:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         hostedBy:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         startTime:
 *           type: string
 *         endTime:
 *           type: string
 *         attendees:
 *           type: array
 *           items:
 *             type: string
 *         admission:
 *           type: string
 *         eventId:
 *           type: number
 *         imageSrc:
 *           type: string
 *         imageAlt:
 *           type: string
 *         description:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         location:
 *           type: string
 */

/**
 * @swagger
 * /api/attendees/add:
 *   put:
 *     tags:
 *       - AttendeeController
 *     summary: Add a user to an event and update event attendees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               eventId:
 *                 type: number
 *             required:
 *               - userId
 *               - eventId
 *     responses:
 *       200:
 *         description: User successfully added to event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *       404:
 *         description: User or Event not found
 *       500:
 *         description: Internal server error
 */
router.put("/add", addUserEvent);

/**
 * @swagger
 * /api/attendees/remove:
 *   put:
 *     tags:
 *       - AttendeeController
 *     summary: Remove a user to an event and update event attendees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               eventId:
 *                 type: number
 *             required:
 *               - userId
 *               - eventId
 *     responses:
 *       200:
 *         description: User successfully added to event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *       404:
 *         description: User or Event not found
 *       500:
 *         description: Internal server error
 */
router.put("/remove", removeUserEvent);

/**
 * @swagger
 * /api/attendees/event/{eventId}:
 *   get:
 *     tags:
 *       - AttendeeController
 *     summary: Get all users from an event's attendees
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: number
 *         description: The event ID
 *     responses:
 *       200:
 *         description: A list of users attending the event
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.get("/event/:eventId", getAttendeesByEventId);

module.exports = router;
