import { Auth0User } from "../models/models";

export const updateUser = async (userId: string, eventArray: string[]) => {
  const apiUrl = `http://localhost:5000/api/event/${userId}`;
};

export const getUserOrCreate = async (userData: Auth0User) => {
  const apiUrl = "http://localhost:5000/api/users";
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
