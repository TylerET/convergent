import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StyledDiv } from "./EventDetails.styles";
import mockEventData from "../../mocks/mockEvents";
import { EventCardProps } from "../../components/common/EventCard/typings/EventCardProps";
import EventPageHeader from "../../components/common/EventPageHeader/EventPageHeader";
import { ChevronRightIcon } from "@chakra-ui/icons";

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
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Event Details</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <EventPageHeader event={selectedEvent as EventCardProps} />
          <StyledDiv>{`Event: ${selectedEvent?.eventId}`}</StyledDiv>
        </>
      )}
    </Skeleton>
  );
};

export default EventDetails;
