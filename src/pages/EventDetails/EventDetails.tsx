import { Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StyledDiv } from "./EventDetails.styles";
import mockEventData from "../../mocks/mockEvents";
import { EventCardProps } from "../../components/common/EventCard/typings/EventCardProps";
import EventPageHeader from "../../components/common/EventPageHeader/EventPageHeader";

const EventDetails = () => {
  const { eventId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventCardProps | null>(
    null
  );

  useEffect(() => {
    const filteredSelectedEvent = mockEventData.find(
      (event) => event.eventId === eventId
    );
    if (filteredSelectedEvent) {
      setSelectedEvent(filteredSelectedEvent);
      setIsLoading(false);
    }
  }, [eventId]);

  return (
    <Skeleton isLoaded={!isLoading}>
      {selectedEvent && (
        <>
          <EventPageHeader event={selectedEvent as EventCardProps} />
          <StyledDiv>{`Event: ${selectedEvent?.eventId}`}</StyledDiv>
        </>
      )}
    </Skeleton>
  );
};

export default EventDetails;
