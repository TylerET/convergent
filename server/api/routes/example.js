const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Returns an example response
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Example endpoint"
 */
router.get("/", (req, res) => {
  res.json({ message: "Example endpoint" });
});

module.exports = router;
