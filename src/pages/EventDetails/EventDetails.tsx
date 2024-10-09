import React from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { eventId } = useParams();
  console.log(eventId);
  return <div>{`Event: ${eventId}`}</div>;
};

export default EventDetails;
