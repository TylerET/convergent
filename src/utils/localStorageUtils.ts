import { EventCardProps } from "../components/common/EventCard/typings/EventCardProps";
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
  const hostedEvents = getHostedEvents();
  const allUserEvents = [...hostedEvents, ...filteredEvents];
  return allUserEvents;
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

export const saveHostedEvent = (eventData: EventCardProps) => {
  const storedHostedEvents = localStorage.getItem("hosted-events");
  const hostedEventsArray = storedHostedEvents
    ? JSON.parse(storedHostedEvents)
    : [];
  hostedEventsArray.push(eventData);

  localStorage.setItem("hosted-events", JSON.stringify(hostedEventsArray));
};

export const getHostedEvents = () => {
  const storedHostedEvents = localStorage.getItem("hosted-events");
  const hostedEventsArray = storedHostedEvents
    ? JSON.parse(storedHostedEvents)
    : [];
  const formattedDatesHostedEventsArray = hostedEventsArray.map(
    (event: any) => ({
      ...event,
      date: new Date(event.date),
    })
  );
  return formattedDatesHostedEventsArray;
};

export const getNextEventId = () => {
  let nextEventId = 0;
  const storedHostedEvents = localStorage.getItem("hosted-events");
  const hostedEventsArray = storedHostedEvents
    ? JSON.parse(storedHostedEvents)
    : [];
  hostedEventsArray.forEach(
    (event: any) =>
      (nextEventId = Math.max(nextEventId, Number(event?.eventId)))
  );
  mockEventData.forEach(
    (event) => (nextEventId = Math.max(nextEventId, Number(event?.eventId)))
  );
  return ++nextEventId;
};

export const deleteHostedEvent = (eventId: string) => {
  const storedHostedEvents = localStorage.getItem("hosted-events");
  let hostedEventsArray = storedHostedEvents
    ? JSON.parse(storedHostedEvents)
    : [];

  hostedEventsArray = hostedEventsArray.filter(
    (event: { eventId: string }) => event.eventId !== eventId
  );

  localStorage.setItem("hosted-events", JSON.stringify(hostedEventsArray));
};
