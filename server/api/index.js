const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./utils/connectDB");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON
app.use(express.json());

// MongoDB Connection
connectDB();

// Define a Mongoose Schema for the comments collection
const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  movie_id: mongoose.Schema.Types.ObjectId,
  text: String,
  date: Date,
});

// Create a model for the comments collection
const Comment = mongoose.model("comment", commentSchema, "comments");

// Fetch comments from the collection and log to console
const fetchComments = async () => {
  try {
    console.log("Connecting to MongoDB...");
    const comments = await Comment.find().limit(10);
    console.log("Comments fetched:", comments);
  } catch (err) {
    console.error("Error fetching comments:", err.message);
  }
};

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB(); // Connect to MongoDB
  await fetchComments(); // Fetch and log comments
});

module.exports = app;
