const User = require("../models/userModel");
const Event = require("../models/eventModel");

const getEventsByUserId = async (userId) => {
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error(`user with Id ${userId} not found`);
    }
    if (!user.events || user.events.length === 0) {
      return [];
    }
    const events = await Event.find({ eventId: { $in: user.events } });

    return events;
  } catch (error) {
    throw new Error(`Error finding user events: ${error.messsage}`);
  }
};

module.exports = { getEventsByUserId };
