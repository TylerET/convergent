const User = require("../models/userModel");
const Event = require("../models/eventModel");

const addUserToEvent = async (userId, eventId) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const event = await Event.findOne({ eventId });

    if (!event) {
      throw new Error(`Event with ID ${eventId} not found`);
    }

    if (!user.events) {
      user.events = [];
    }

    if (!user.events.includes(eventId)) {
      user.events.push(Number(eventId));
      await user.save();
    }

    if (!event.attendees) {
      event.attendees = [];
    }

    if (!event.attendees.includes(userId)) {
      event.attendees.push(Number(userId));
      await event.save();
    }

    return { user, event };
  } catch (error) {
    console.error(`Error updating user and event: ${error.message}`);
    throw new Error(`Error updating user and event: ${error.message}`);
  }
};

const removeUserFromEvent = async (userId, eventId) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error(`user with Id ${userId} not found`);
    }

    const event = await Event.findOne({ eventId });
    if (!event) {
      throw new Error(`Event with ID ${eventId} not found`);
    }

    if (user.events.includes(eventId)) {
      user.events = user.events.filter((event) => event != eventId);
      await user.save();
    }

    if (event.attendees.includes(userId)) {
      event.attendees = event.attendees.filter(
        (attendee) => attendee != userId
      );
      await event.save();
    }
    return { user, event };
  } catch (error) {
    throw new Error(`Error updating user and event: ${error.messsage}`);
  }
};

const getUsersByEventId = async (eventId) => {
  const event = await Event.findOne({ eventId });
  if (!event) throw new Error(`Event with ID ${eventId} not found`);

  const users = await User.find({ userId: { $in: event.attendees } });
  return users;
};

module.exports = { addUserToEvent, removeUserFromEvent, getUsersByEventId };
