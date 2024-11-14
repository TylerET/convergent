const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  hostedBy: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  attendees: { type: Number, default: 0 },
  admission: { type: String, default: "Free" },
  eventId: { type: String, required: true, unique: true },
  imageSrc: { type: String, required: true },
  imageAlt: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  location: { type: String, required: true },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
