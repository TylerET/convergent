const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  hostedBy: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  attendees: [{ type: Number }],
  admission: { type: String, required: true },
  eventId: { type: Number, required: false, unique: true },
  image: {
    src: { type: String, required: false },
    alt: { type: String, required: false },
  },
  description: { type: String, required: true },
  tags: [{ type: String }],
  location: { type: String, required: false },
  hostedById: { type: Number, required: false },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
