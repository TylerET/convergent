import React from "react";
import { EventCardContainerProps } from "./typings/EventCardContainerProps";
import { ResponsiveGridContainer } from "./EventCardContainer.styles";
import EventCard from "../EventCard/EventCard";
import { Flex, Link, Stack, Text } from "@chakra-ui/react";
import { useCustomer } from "../../../contexts/CustomerContext/CustomerContext";

const EventCardContainer = ({
  title,
  linkText,
  linkAction,
  eventCards,
  showLocation,
}: EventCardContainerProps) => {
  const { selectedLocation } = useCustomer();
  return (
    <Stack>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        {title && (
          <Flex>
            <Text fontSize={"4xl"} fontWeight={"bold"} mr={2}>
              {title}
            </Text>
            {selectedLocation && showLocation && (
              <Flex
                cursor={"pointer"}
                _hover={{ textDecoration: "underline" }}
                color="teal"
              >
                <Text fontSize={"4xl"} fontWeight={"bold"} color="teal">
                  {selectedLocation}
                </Text>
              </Flex>
            )}
          </Flex>
        )}
        <Link
          fontSize={"1xl"}
          color={"teal"}
          fontWeight={"bold"}
          onClick={linkAction}
          verticalAlign={"center"}
          textDecoration={"underline"}
        >
          {linkText}
        </Link>
      </Flex>
      <ResponsiveGridContainer>
        {eventCards.map((event) => (
          <EventCard key={event?.eventId} {...event} />
        ))}
      </ResponsiveGridContainer>
    </Stack>
  );
};

export default EventCardContainer;
