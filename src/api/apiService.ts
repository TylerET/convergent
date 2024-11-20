import { Auth0User } from "../models/models";

const basePath =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://convergent.onrender.com/api";

export const getAllEvents = async () => {
  const apiUrl = `${basePath}/events`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const events = await response.json();
    return events;
  } catch (error: any) {
    console.error("Error in get all events API call:", error.message);
  }
};

export const getAllEventsByUserId = async (userId: number) => {
  const apiUrl = `${basePath}/events/user/${userId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const events = await response.json();
    return events;
  } catch (error: any) {
    console.error("Error in get all events API call:", error.message);
  }
};

export const getEventsByQuery = async (query: string, limit: number) => {
  const apiUrl = `${basePath}/events/search?query=${encodeURIComponent(query)}${
    limit ? `&limit=${limit}` : ""
  }`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const events = await response.json();
    return events;
  } catch (error: any) {
    console.error("Error in get all events API call:", error.message);
  }
};

export const getEventByEventId = async (eventId: number) => {
  const apiUrl = `${basePath}/events/${eventId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const events = await response.json();
    return events;
  } catch (error: any) {
    console.error("Error in get all events API call:", error.message);
  }
};

export const getEventsByLocation = async (location: string) => {
  const apiUrl = `${basePath}/events/location/${location}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const events = await response.json();
    return events;
  } catch (error: any) {
    console.error("Error in get all events API call:", error.message);
  }
};

export const addUserEvent = async (userId: number, eventId: number) => {
  const apiUrl = `${basePath}/attendees/add`;
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, eventId }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const { user } = await response.json();
    return user;
  } catch (error: any) {
    console.error("Error in user update API call:", error.message);
  }
};

export const removeUserEvent = async (userId: number, eventId: number) => {
  const apiUrl = `${basePath}/attendees/remove`;
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, eventId }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const { user } = await response.json();
    return user;
  } catch (error: any) {
    console.error("Error in user update API call:", error.message);
  }
};

export const getUserOrCreate = async (userData: Auth0User) => {
  const apiUrl = `${basePath}/users`;
  const formattedUserData = {
    ...userData,
    auth0Id: userData.sub,
    firstName: userData.given_name,
    lastName: userData.family_name,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedUserData),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const user = await response.json();
    return user;
  } catch (error: any) {
    console.error("Error in user API call:", error.message);
  }
};
