const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  hostedBy: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  attendees: [{ type: Number }],
  admission: { type: String, required: true },
  eventId: { type: Number, required: true, unique: true },
  image: {
    src: { type: String, required: true },
    alt: { type: String, required: true },
  },
  description: { type: String, required: true },
  tags: [{ type: String }],
  location: {
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
