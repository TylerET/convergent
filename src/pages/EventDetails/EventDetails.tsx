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
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StyledDiv } from "./EventDetails.styles";
import { EventCardProps } from "../../components/common/EventCard/typings/EventCardProps";
import EventPageHeader from "../../components/common/EventPageHeader/EventPageHeader";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Attendees from "../../components/common/Attendees/Attendees";
import { getEventByEventId } from "../../api/apiService";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventCardProps | null>(
    null
  );

  useEffect(() => {
    if (eventId) {
      getEventByEventId(Number(eventId))
        .then((response) => {
          if (response) {
            setSelectedEvent(response);
            setIsLoading(false);
          } else {
            navigation("/");
          }
        })
        .catch((error: any) => {
          console.error(error.message);
          navigation("/");
        });
    } else {
      navigation("/");
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
          <StyledDiv>
            <Grid templateColumns="2fr 1fr" gap={8}>
              <GridItem>
                <Image
                  src={`${selectedEvent?.image?.src}/700/400`}
                  alt={selectedEvent?.image?.alt ?? "Event Image"}
                  borderRadius={"lg"}
                  fallbackStrategy="beforeLoadOrError"
                  fallback={<Skeleton width={"700px"} height={"400px"} />}
                />
                <Text fontSize={"2xl"} fontWeight={"bold"} mt={4}>
                  Details
                </Text>
                <Text>{selectedEvent?.description}</Text>
                <Box mt={4}>
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
                      mx={1}
                    >
                      {tag}
                    </Tag>
                  ))}
                </Box>
                <Text fontSize={"2xl"} fontWeight={"bold"} mt={8}>
                  Attendees ({selectedEvent?.attendees?.length ?? 1})
                </Text>
                <Attendees
                  eventId={selectedEvent?.eventId}
                  hostedById={selectedEvent?.hostedById}
                />
              </GridItem>

              <GridItem>
                <Text fontSize={"2xl"} fontWeight={"bold"} mb={4}>
                  Event Information
                </Text>
                <Box mb={2}>
                  <Text fontWeight="bold">Hosted By:</Text>
                  <Text>{selectedEvent?.hostedBy}</Text>
                </Box>
                <Box mb={2}>
                  <Text fontWeight="bold">Date:</Text>
                  <Text>
                    {new Date(selectedEvent?.date).toLocaleDateString()}
                  </Text>
                </Box>
                <Box mb={2}>
                  <Text fontWeight="bold">Time:</Text>
                  <Text>
                    {selectedEvent?.startTime} - {selectedEvent?.endTime}
                  </Text>
                </Box>
                <Box mb={2}>
                  <Text fontWeight="bold">Location:</Text>
                  <Text>{selectedEvent?.location}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Admission:</Text>
                  <Text>{selectedEvent?.admission}</Text>
                </Box>
              </GridItem>
            </Grid>
          </StyledDiv>
        </>
      )}
    </Skeleton>
  );
};

export default EventDetails;
