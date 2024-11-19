const User = require("../models/userModel");

const getUserOrCreate = async (req, res) => {
  const { auth0Id, firstName, lastName, email, picture } = req.body;

  try {
    let user = await User.findOne({ auth0Id });

    if (!user) {
      user = new User({
        auth0Id,
        firstName,
        lastName,
        email,
        picture,
        events: [],
      });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error handling user data:", error.message);
    res.status(500).json({ message: "Failed to handle user data" });
  }
};

const updateUserEvents = async (req, res) => {
  const { events = [] } = req.body;
  const { userId } = req.params;

  try {
    let user = await User.findOne({ userId: Number(userId) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.events = events;
    await user.save();

    res.status(200).json({ message: "Events updated successfully", user });
  } catch (error) {
    console.error("Error updating user events:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update events", error: error.message });
  }
};

module.exports = { getUserOrCreate, updateUserEvents };
