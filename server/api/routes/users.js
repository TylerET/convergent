const express = require("express");
const {
  getUserOrCreate,
  updateUserEvents,
} = require("../controllers/userController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: UserController
 *     description: User endpoints
 *   - name: EventController
 *     description: Event endpoints
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - UserController
 *     summary: Get or create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               auth0Id:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               picture:
 *                 type: string
 *             required:
 *               - auth0Id
 *               - name
 *               - email
 *               - picture
 *     responses:
 *       200:
 *         description: User retrieved or created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", getUserOrCreate);

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     tags:
 *       - UserController
 *     summary: Update an event by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The event ID to update
 *         schema:
 *           type: string
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
 *                 format: date
 *               location:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *               attendees:
 *                 type: integer
 *             required:
 *               - title
 *               - description
 *               - date
 *               - location
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.put("/:userId", updateUserEvents);

module.exports = router;
