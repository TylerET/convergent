const User = require("../models/userModel");
const Event = require("../models/eventModel");

const getEventsByUserId = async (userId) => {
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const userEvents = user.events || [];
    const attendingEvents =
      userEvents.length > 0
        ? await Event.find({ eventId: { $in: userEvents } })
        : [];

    const hostedEvents = await Event.find({ hostedById: userId });

    const allEvents = [...attendingEvents, ...hostedEvents];

    return allEvents;
  } catch (error) {
    throw new Error(
      `Error finding events for user ${userId}: ${error.message}`
    );
  }
};

module.exports = { getEventsByUserId };
