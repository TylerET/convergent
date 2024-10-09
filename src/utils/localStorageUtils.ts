import mockEventData from "../mocks/mockEvents";

export const getLocalStorageItem = (key: string) => {
  const value = localStorage.getItem(key);
  const parsedValue = value ? JSON.parse(value) : [];
  return parsedValue;
};

export function saveEventIdToLocalStorage(eventId: string) {
  const storedEventIds = localStorage.getItem("MyEvents");
  const eventIdsArray = storedEventIds ? JSON.parse(storedEventIds) : [];
  if (!eventIdsArray.includes(eventId)) {
    eventIdsArray.push(eventId);
  }
  localStorage.setItem("MyEvents", JSON.stringify(eventIdsArray));
}

export function removeEventIdFromLocalStorage(eventId: string) {
  let storedEventIds = localStorage.getItem("MyEvents");
  let eventIdsArray = storedEventIds ? JSON.parse(storedEventIds) : [];
  eventIdsArray = eventIdsArray.filter((id: string) => id !== eventId);
  localStorage.setItem("MyEvents", JSON.stringify(eventIdsArray));
}

export const getUserEvents = () => {
  const myEvents = getLocalStorageItem("MyEvents");
  const filteredEvents =
    myEvents.length > 0
      ? mockEventData.filter((event) => myEvents.includes(event?.eventId))
      : [];
  return filteredEvents;
};

export const saveAccessToken = (tokenData: { name: string; email: string }) => {
  localStorage.setItem("access-token", JSON.stringify(tokenData));
};

export const getAccessToken = () => {
  const token = localStorage.getItem("access-token");
  return token ? JSON.parse(token) : null;
};

export const removeAccessToken = () => {
  localStorage.removeItem("access-token");
};
