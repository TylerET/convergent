import {
  Image,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Skeleton,
  Text,
  Tag,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StyledDiv } from "./EventDetails.styles";
import mockEventData from "../../mocks/mockEvents";
import { EventCardProps } from "../../components/common/EventCard/typings/EventCardProps";
import EventPageHeader from "../../components/common/EventPageHeader/EventPageHeader";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Attendees from "../../components/common/Attendees/Attendees";
import { getUserEvents } from "../../utils/localStorageUtils";

const EventDetails = () => {
  const { eventId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventCardProps | null>(
    null
  );

  useEffect(() => {
    const allEvents = [...getUserEvents(), ...mockEventData];
    const filteredAllEvents = allEvents.find(
      (event) => event.eventId === eventId
    );
    if (filteredAllEvents) {
      setSelectedEvent(filteredAllEvents);
      setIsLoading(false);
    }
  }, [eventId]);

  const navigation = useNavigate();

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
          <StyledDiv>
            <Grid>
              <GridItem>
                <Image
                  src={`${selectedEvent?.imageSrc}/700/400`}
                  alt={selectedEvent?.imageAlt ?? "Event Image"}
                  borderRadius={"lg"}
                  fallbackStrategy="beforeLoadOrError"
                  fallback={<Skeleton width={"700px"} height={"400px"} />}
                />
              </GridItem>
              <GridItem>
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  Detail
                </Text>
                <Text>{selectedEvent?.description}</Text>
              </GridItem>
              <GridItem>
                {selectedEvent?.tags?.map((tag) => (
                  <Tag
                    onClick={() =>
                      navigation(
                        `/events/search?query=${encodeURIComponent(tag)}`
                      )
                    }
                    cursor={"pointer"}
                    size="lg"
                    key={tag}
                    colorScheme="teal"
                    color="teal"
                    mx={2}
                  >
                    {tag}
                  </Tag>
                ))}
              </GridItem>
              <GridItem>
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  Attendees ({selectedEvent?.attendees})
                </Text>
                <Attendees
                  numberOfAttendees={selectedEvent?.attendees as number}
                />
              </GridItem>
            </Grid>
          </StyledDiv>
        </>
      )}
    </Skeleton>
  );
};

export default EventDetails;
