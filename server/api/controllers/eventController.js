const Event = require("../models/eventModel");
const { getEventsByUserId } = require("../services/eventService");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

const waitForEventId = async (eventId, retries = 5, delay = 200) => {
  for (let i = 0; i < retries; i++) {
    const event = await Event.findById(eventId);
    if (event && event.eventId) {
      return event;
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  throw new Error("eventId not generated after retries");
};

const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();

    const updatedEvent = await waitForEventId(savedEvent._id);

    const eventId = updatedEvent.eventId;
    const eventDescription = updatedEvent.description;
    const image = {
      src: `https://picsum.photos/id/${eventId}`,
      alt: eventDescription,
    };

    const updatedEventImage = await Event.findByIdAndUpdate(
      savedEvent._id,
      { image },
      { new: true }
    );

    res.status(201).json(updatedEventImage);
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ message: "Failed to create event" });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ eventId: id });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error.message);
    res.status(500).json({ message: "Failed to fetch event" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).json({ message: "Failed to update event" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findOneAndDelete({ eventId: id });
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).json({ message: "Failed to delete event" });
  }
};

const updateEventAttendees = async (req, res) => {
  const { attendees = [] } = req.body;
  const { id } = req.params;

  try {
    let event = await Event.findOne({ eventId: Number(id) });
    if (!event) {
      return res.status(404).json({ message: "event not found" });
    }
    event.attendees = attendees;
    await event.save();

    res.status(200).json({ message: "attendees updated successfully", event });
  } catch (error) {
    console.error("Error updating event attendees:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update attendees", error: error.message });
  }
};

const getAllEventByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await getEventsByUserId(userId);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getEventsByLocation = async (req, res) => {
  const { location } = req.params;

  try {
    const events = await Event.find({
      location: { $regex: new RegExp(location, "i") },
    });

    if (events.length === 0) {
      return res.status(404).json([]);
    }

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events by location:", error.message);
    res.status(500).json({ message: "Failed to fetch events by location" });
  }
};

const getEventsByHostedById = async (req, res) => {
  const { hostedById } = req.params;

  try {
    const events = await Event.find({
      hostedById,
    });

    if (events.length === 0) {
      return res.status(404).json([]);
    }

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events by hosted id:", error.message);
    res.status(500).json({ message: "Failed to fetch events by hosted id" });
  }
};

module.exports = {
  getAllEventByUserId,
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  updateEventAttendees,
  getEventsByLocation,
  getEventsByHostedById,
};
