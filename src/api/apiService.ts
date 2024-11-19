import { Auth0User } from "../models/models";

const basePath =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://convergent.onrender.com/api";

export const updateUser = async (userId: string, eventArray: string[]) => {
  const apiUrl = `${basePath}/users/${userId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ events: eventArray }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const user = await response.json();
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
